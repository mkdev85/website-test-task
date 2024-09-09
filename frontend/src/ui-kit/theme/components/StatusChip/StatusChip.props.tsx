import { Website } from '@/components/HomePage/WebsitesList/WebsitesList';

export interface StatusChipProps {
  className?: string;
  status: Website['status'];
  children: React.ReactNode;
}
