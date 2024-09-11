import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

import api from '@/lib/api';
import type { ReactQueryMutateOptions } from '@/lib/react-query';

import { getGetWebsitesQuery } from './useGetWebsitesQuery';
import { ErrorResponse } from '@/hoc/CustomQueryClientProvider';

type MutateOptions = ReactQueryMutateOptions<
  DeleteWebsiteBackendResponse,
  unknown,
  DeleteWebsiteMutationInput
>;

export interface DeleteWebsiteMutationInput {
  id: string;
}

export interface DeleteWebsiteBackendResponse {
  // TODO: define the response interface here
}

export function useDeleteWebsiteMutation(options?: MutateOptions) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { queryKey: getWebsitesQueryKey } = getGetWebsitesQuery();

  return useMutation<DeleteWebsiteBackendResponse, unknown, DeleteWebsiteMutationInput>({
    mutationKey: ['delete-website'],
    mutationFn: async input => {
      const { id } = input;
      const response = await api.delete(`/websites/${id}`);

      if (!response.data) {
        return Promise.reject(response);
      }
      return response.data as DeleteWebsiteBackendResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getWebsitesQueryKey });

      enqueueSnackbar({
        message: 'Succesfully Removed Website',
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
