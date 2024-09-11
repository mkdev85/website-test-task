import { randomWebsiteUpdateQueue } from "../queue";
import { getRandomWebsiteData } from "../services/website/getRandomWebsiteData";
import { AppDataSource } from "../data-source";
import clc from 'cli-color';
import { QUEUE_NAMES } from "../constant";

const updateWebsiteStatus = async (id: string, currentStatus: string) => {
  const newStatus = currentStatus === 'online' ? 'offline' : 'online';

  try {
    await AppDataSource
      .createQueryBuilder()
      .update('websites')
      .set({ status: newStatus })
      .where('id = :id', { id })
      .execute();

    console.log(clc.green(`Successfully updated website ID: ${id} to status: ${newStatus}`));
  } catch (error) {
    console.error(clc.red(`Error updating status for website ID: ${id}`), error);
  }
};

randomWebsiteUpdateQueue.process(QUEUE_NAMES.RANDOM_WEBSITE_UPDATE, async () => {
  const startTime = Date.now();
  console.log(clc.blue(`Job started at: ${new Date(startTime).toISOString()}`));

  try {
    const websites = await getRandomWebsiteData();

    console.log(clc.yellow(`Found ${websites.length} websites to update.`));

    await Promise.all(websites.map(async (website: any) => {
      const recordStartTime = Date.now();

      try {
        console.log(clc.cyan(`Checking status for website ID: ${website.id} at ${new Date(recordStartTime).toISOString()}`));

        await updateWebsiteStatus(website.id, website.status);

        const recordEndTime = Date.now();
        console.log(clc.green(`Completed status check for website ID: ${website.id} at ${new Date(recordEndTime).toISOString()} | Duration: ${recordEndTime - recordStartTime}ms`));
      } catch (error) {
        console.error(clc.red(`Error processing website ID: ${website.id}`), error);
      }
    }));

    const endTime = Date.now();
    console.log(clc.blue(`Job completed at: ${new Date(endTime).toISOString()} | Duration: ${endTime - startTime}ms`));
  } catch (error) {
    console.error(clc.red("Error monitoring websites:"), error);
  }
});
