import clc from 'cli-color';
import config from '../config/config';
import { randomWebsiteUpdateQueue } from '../queue';
import { QUEUE_NAMES } from '../constant';

export const enqueueRandomWebsiteUpdateJob = async () => {
  const interval = config.get('randomWebsiteUpdateInterval') 
  await randomWebsiteUpdateQueue.add(QUEUE_NAMES.RANDOM_WEBSITE_UPDATE, {}, {
    repeat: { every: interval },
  });
  console.log(clc.green('Enqueued job to update 10 random websites every minute'));
};



