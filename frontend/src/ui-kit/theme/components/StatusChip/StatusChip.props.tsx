import { Website } from '@/queries/useGetWebsitesQuery';

export interface StatusChipProps {
  className?: string;
  status: Website['status'];
  children: React.ReactNode;
}
