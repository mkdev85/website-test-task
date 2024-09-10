import clc from 'cli-color';
import config from '../config/config';
import { randomWebsiteUpdateQueue } from '../queue';

export const enqueueRandomWebsiteUpdateJob = async () => {
  const interval = config.get('randomWebsiteUpdateInterval') 
  await randomWebsiteUpdateQueue.add('random-website-update', {}, {
    repeat: { every: interval },
  });
  console.log(clc.green('Enqueued job to update 10 random websites every minute'));
};



