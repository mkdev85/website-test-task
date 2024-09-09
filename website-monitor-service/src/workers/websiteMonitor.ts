import { websiteMonitorQueue } from '../queue';
import axios from 'axios';
import { AppDataSource } from '../data-source'; 
import { getAllWebsites } from '../services/website/getAllWebsites'; 

// Function to check website status
const checkWebsiteStatus = async (id: string, url: string) => {
  try {
    await axios.get(url);
    await AppDataSource
      .createQueryBuilder()
      .update('website')
      .set({ status: 'online' })
      .where('id = :id', { id })
      .execute();
  } catch {
    await AppDataSource
      .createQueryBuilder()
      .update('website')
      .set({ status: 'offline' })
      .where('id = :id', { id })
      .execute();
  }
};

// Process jobs from the queue
websiteMonitorQueue.process('monitor', async () => {
  const startTime = Date.now();
  console.log(`Job started at: ${new Date(startTime).toISOString()}`);
  
  try {
    const websites = await getAllWebsites();

    // Log the number of websites to be monitored
    console.log(`Found ${websites.length} websites to monitor.`);

    await Promise.all(websites.map(async (website: any) => {
      const recordStartTime = Date.now();

      try {
        console.log(`Checking status for website ID: ${website.id} at ${new Date(recordStartTime).toISOString()}`);

        await checkWebsiteStatus(website.id, website.url);
        
        const recordEndTime = Date.now();
        console.log(`Completed status check for website ID: ${website.id} at ${new Date(recordEndTime).toISOString()} | Duration: ${recordEndTime - recordStartTime}ms`);
      } catch (error) {
        console.error(`Error processing website ID: ${website.id}`, error);
      }
    }));

    const endTime = Date.now();
    console.log(`Job completed at: ${new Date(endTime).toISOString()} | Duration: ${endTime - startTime}ms`);
  } catch (error) {
    console.error('Error monitoring websites:', error);
  }
});
