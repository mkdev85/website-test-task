import Bull from 'bull';
import config from './config/config';

const redisHost = config.get('redis.host');
const redisPort = config.get('redis.port');

const redisConfig = {
  redis: {
    host: redisHost,
    port: redisPort,
  }
};

export const websiteMonitorQueue = new Bull('website-monitoring', redisConfig);
export const randomWebsiteUpdateQueue = new Bull('random-website-update', redisConfig);
