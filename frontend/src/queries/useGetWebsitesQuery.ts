import { useQuery } from '@tanstack/react-query';

import { WebsiteStatus, WebsiteStatusFilter } from '@/constants/enums';
import api from '@/lib/api';
import type { ReactQueryOptions } from '@/lib/react-query';

interface GetWebsitesQueryParams {
  page: number;
  rowsPerPage: number;
  searchText: string;
  statusFilter: WebsiteStatusFilter;
}

export interface Website {
  id: string;
  name: string;
  url: string;
  status: WebsiteStatus;
  createdAt: string;
  updatedAt: string;
}

interface GetWebsitesData {
  page: number;
  pageSize: number;
  totalCount: number;
  websites: Website[];
}

interface BackendResponse {
  data?: GetWebsitesData;
}

export function getGetWebsitesQuery(
  params: GetWebsitesQueryParams = {
    page: 1,
    rowsPerPage: 10,
    searchText: '',
    statusFilter: WebsiteStatusFilter.all,
  },
) {
  const transformedParms = {
    page: params.page,
    page_size: params.rowsPerPage,
    search_by_website_keyword: params.searchText,
    status: params.statusFilter,
  };

  const queryKey = ['get-websites', params];
  const queryFn = async () => {
    const response = await api.get('/websites/', { params: transformedParms });

    if (!response.data) {
      return Promise.reject(response);
    }
    return response.data as BackendResponse;
  };

  return {
    queryKey,
    queryFn,
  };
}

export function useGetWebsitesQuery(
  params: GetWebsitesQueryParams = {
    page: 1,
    rowsPerPage: 10,
    searchText: '',
    statusFilter: WebsiteStatusFilter.all,
  },
  options: ReactQueryOptions<BackendResponse> = {},
) {
  const { queryKey, queryFn } = getGetWebsitesQuery(params);

  const query = useQuery({
    queryKey,
    queryFn,
    ...options,
  });

  return query;
}
