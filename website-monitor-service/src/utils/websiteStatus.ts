import axios from "axios";
import { AppDataSource } from "../data-source";

export enum WebsiteStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}

const updateWebsiteStatus = async (id: string, status: WebsiteStatus) => {
  await AppDataSource.createQueryBuilder()
    .update("websites")
    .set({ status })
    .where("id = :id", { id })
    .execute();
};

export const checkWebsiteStatus = async (
  id: string,
  url: string
): Promise<void> => {
  // Create a timeout promise that rejects after 3 seconds
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), 3000)
  );

  try {
    // Race the Axios request against the timeout
    await Promise.race([axios.get(url), timeout]);

    // If the request succeeds, update to ONLINE status
    await updateWebsiteStatus(id, WebsiteStatus.ONLINE);
  } catch (error) {
    // Improved error handling
    if (axios.isAxiosError(error)) {
      // Handle Axios errors
      console.log("Axios error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config,
      });
    } else {
      // Handle non-Axios errors
      console.log("Non-Axios error details:", error);
    }

    // If the request fails or times out, update to OFFLINE status
    await updateWebsiteStatus(id, WebsiteStatus.OFFLINE);
  }
};
