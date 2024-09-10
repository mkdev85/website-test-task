import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import api from '@/lib/api';
import type { ReactQueryMutateOptions } from '@/lib/react-query';

type MutateOptions = ReactQueryMutateOptions<BackendResponse, unknown, MutationInput>;

export interface MutationInput {}

export interface BackendResponse {
  // TODO: define the response interface here
}

export function useAddWebsiteMutation(options?: MutateOptions) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

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
      console.log('success');
      queryClient.invalidateQueries();

      enqueueSnackbar({
        message: 'Succesfully Added Website',
        variant: 'success',
        preventDuplicate: true,
      });
    },
    ...options,
  });
}
