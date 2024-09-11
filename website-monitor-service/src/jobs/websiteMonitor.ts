import clc from 'cli-color';
import config from '../config/config';
import { websiteMonitorQueue } from '../queue';
import { QUEUE_NAMES } from '../constant';

export const enqueueWebsiteMonitoringJob = async () => {
  const interval = config.get('monitorInterval');
  await websiteMonitorQueue.add(QUEUE_NAMES.WEBSITE_MONITOR, {}, {
    repeat: { every: interval }
  });
  console.log(clc.green('Enqueued monitoring job'));
};

