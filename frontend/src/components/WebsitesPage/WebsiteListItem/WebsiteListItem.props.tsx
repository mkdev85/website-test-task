import { WebsiteStatus } from '@/constants/enums';

export interface WebsiteListItemProps {
  // TODO: define component props here
  className?: string;
  id: string;
  name: string;
  url: string;
  status: WebsiteStatus;
}
