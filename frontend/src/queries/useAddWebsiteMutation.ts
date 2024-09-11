import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

import { useRouter } from 'next/router';

import { WebsiteStatusFilter } from '@/constants/enums';
import { ErrorResponse } from '@/hoc/CustomQueryClientProvider';
import api from '@/lib/api';
import type { ReactQueryMutateOptions } from '@/lib/react-query';

import { getGetWebsitesQuery } from './useGetWebsitesQuery';

type MutateOptions = ReactQueryMutateOptions<BackendResponse, unknown, MutationInput>;

export interface MutationInput {}

export interface BackendResponse {
  // TODO: define the response interface here
}

export function useAddWebsiteMutation(options?: MutateOptions) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const {
    page = 1,
    search = '',
    filter = WebsiteStatusFilter.all,
    rowsPerPage = 10,
  } = router.query;

  const { queryKey: getWebsitesQueryKey } = getGetWebsitesQuery({
    page: parseInt(page as string),
    rowsPerPage: parseInt(rowsPerPage as string),
    searchText: search as string,
    statusFilter: filter as WebsiteStatusFilter,
  });
  return useMutation<BackendResponse, unknown, MutationInput>({
    mutationKey: ['add-website'],
    mutationFn: async input => {
      // TODO: set your endpoint here
      const response = await api.post('/websites', input);

      if (!response.data) {
        return Promise.reject(response);
      }
      return response.data as BackendResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getWebsitesQueryKey });

      enqueueSnackbar({
        message: 'Website Added Succesfully  ',
        variant: 'success',
        preventDuplicate: true,
      });
    },
    onError: error => {
      enqueueSnackbar({
        message:
          (error as AxiosError<ErrorResponse>)?.response?.data?.message || 'Something went wrong!!',
        variant: 'error',
      });
    },
    ...options,
  });
}
