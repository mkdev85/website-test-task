import { WebsiteStatusFilter } from '@/constants/enums';

export interface WebsiteFilterProps {
  // TODO: define component props here
  className?: string;
  value: string;
  onChange: (value: WebsiteStatusFilter) => void;
}
