import React, { useState } from "react";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSnackbar } from "notistack";

export const CustomQueryClientProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const { children } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [reactQueryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            staleTime: 60 * 1000,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            const { defaultErrorMessage, actionOnError } = query.meta ?? {};

            if (defaultErrorMessage) {
              enqueueSnackbar({
                message:
                  (error as any)?.response?.data?.message ||
                  defaultErrorMessage,
                variant: "error",
              });
              return;
            }

            if (actionOnError) {
              actionOnError();
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={reactQueryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
