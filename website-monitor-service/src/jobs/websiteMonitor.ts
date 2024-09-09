import { websiteMonitorQueue } from '../queue';

export const enqueueWebsiteMonitoringJob = async () => {
  console.log('Enqueuing website monitoring jobs...');
  
  await websiteMonitorQueue.add('website-monitoring', {}, {
    repeat: { every: 120 * 1000 }
  });
  console.log('Enqueued monitoring job');
};

