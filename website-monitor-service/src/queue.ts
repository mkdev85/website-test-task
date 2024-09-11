import Bull from "bull";
import config from "./config/config";
import { QUEUE_NAMES } from "./constant";

const redisHost = config.get("redis.host");
const redisPort = config.get("redis.port");

const redisConfig = {
  redis: {
    host: redisHost,
    port: redisPort,
    maxRetriesPerRequest: 1,
  },
};

export const websiteMonitorQueue = new Bull(
  QUEUE_NAMES.WEBSITE_MONITOR,
  redisConfig
);
export const randomWebsiteUpdateQueue = new Bull(
  QUEUE_NAMES.RANDOM_WEBSITE_UPDATE,
  redisConfig
);
