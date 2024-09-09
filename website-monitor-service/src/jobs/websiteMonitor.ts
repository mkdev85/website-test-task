import clc from 'cli-color';
import config from '../config/config';
import { websiteMonitorQueue } from '../queue';

export const enqueueWebsiteMonitoringJob = async () => {
  const interval = config.get('monitorInterval');
  await websiteMonitorQueue.add('website-monitoring', {}, {
    repeat: { every: interval}
  });
  console.log(clc.green('Enqueued monitoring job'));
};

