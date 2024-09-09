import { randomWebsiteUpdateQueue } from "../queue";
import { getRandomWebsiteData } from "../services/website/getRandomWebsiteData";
import { AppDataSource } from "../data-source";

const updateWebsiteStatus = async (id: string, currentStatus: string) => {
  const newStatus = currentStatus === 'online' ? 'offline' : 'online';

  try {
    await AppDataSource
      .createQueryBuilder()
      .update('websites')
      .set({ status: newStatus })
      .where('id = :id', { id })
      .execute();

    console.log(`Successfully updated website ID: ${id} to status: ${newStatus}`);
  } catch (error) {
    console.error(`Error updating status for website ID: ${id}`, error);
  }
};

randomWebsiteUpdateQueue.process("random-website-update", async () => {
  const startTime = Date.now();
  console.log(`Job started at: ${new Date(startTime).toISOString()}`);

  try {
    const websites = await getRandomWebsiteData();

    // Log the number of websites to be monitored
    console.log(`Found ${websites.length} websites to update.`);

    await Promise.all(websites.map(async (website: any) => {
        const recordStartTime = Date.now();

        try {
          console.log(
            `Checking status for website ID: ${website.id} at ${new Date(
              recordStartTime
            ).toISOString()}`
          );

          await updateWebsiteStatus(website.id, website.status);

          const recordEndTime = Date.now();
          console.log(
            `Completed status check for website ID: ${website.id} at ${new Date(
              recordEndTime
            ).toISOString()} | Duration: ${recordEndTime - recordStartTime}ms`
          );
        } catch (error) {
          console.error(`Error processing website ID: ${website.id}`, error);
        }
      })
    );

    const endTime = Date.now();
    console.log(
      `Job completed at: ${new Date(endTime).toISOString()} | Duration: ${
        endTime - startTime
      }ms`
    );
  } catch (error) {
    console.error("Error monitoring websites:", error);
  }
});


