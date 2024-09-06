import express, { Express } from "express";
import cors from "cors";

import { AppDataSource } from "./data-source";
import config from "./config/config";
import initRoutes from "./routes";

const PORT: number = config.get("port");
const app: Express = express();

// Setup express json
app.use(express.json());

// Setup cors
app.use(cors());

initRoutes(app);


// Initialize database connection
const connectDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit the process with failure code
  }
};

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
