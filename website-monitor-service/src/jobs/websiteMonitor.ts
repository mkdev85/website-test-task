import { websiteMonitorQueue } from '../queue';

export const enqueueWebsiteMonitoringJob = async () => {
  console.log('Enqueuing website monitoring jobs...');
  
  await websiteMonitorQueue.add('monitor', {}, {
    repeat: { every: 60 * 1000 }
  });
  console.log('Enqueued monitoring job');
};

