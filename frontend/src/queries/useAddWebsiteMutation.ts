import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

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

  const { queryKey: getWebsitesQueryKey } = getGetWebsitesQuery();

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
