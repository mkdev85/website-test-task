import axios from "axios";
import { WebsiteStatus } from "../models/Website";

export const checkWebsiteStatus = async (
  url: string
): Promise<WebsiteStatus> => {
  // Create a timeout promise that rejects after 3 seconds
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), 3000)
  );

  try {
    // Race the Axios request against the timeout
    await Promise.race([axios.get(url), timeout]);

    // If the request succeeds, return ONLINE status
    return WebsiteStatus.ONLINE;
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

    // If the request fails or times out, return OFFLINE status
    return WebsiteStatus.OFFLINE;
  }
};
