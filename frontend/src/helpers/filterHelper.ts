import { WebsiteStatusFilter } from '@/constants/enums';

export function isWebsiteStatusFilterEnum(value: string): value is WebsiteStatusFilter {
  return Object.values(WebsiteStatusFilter).includes(value as WebsiteStatusFilter);
}

export function validWebsiteStatusFilter(filterValue: string): WebsiteStatusFilter {
  // Check if the value is a valid enum member
  if (isWebsiteStatusFilterEnum(filterValue)) {
    return filterValue;
  } else {
    // Return the default value if it's not in the enum
    return WebsiteStatusFilter.all;
  }
}
