import { AppDataSource } from "./data-source";
import "./workers/websiteMonitor";
import "./workers/updateWebsitesStatus";

import { enqueueWebsiteMonitoringJob } from "./jobs/websiteMonitor";
import { enqueueRandomWebsiteUpdateJob } from "./jobs/randomWebsiteUpdate";

export const connectDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

const initializeApp = async () => {
  await connectDatabase();
  enqueueWebsiteMonitoringJob();
  enqueueRandomWebsiteUpdateJob();
};

initializeApp();
