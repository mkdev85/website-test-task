import React, { useState } from "react";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSnackbar } from "notistack";
import axios, { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

export const CustomQueryClientProvider: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const { children } = props;
  const { enqueueSnackbar } = useSnackbar();

  //Checking for Axios error
  const isAxiosError = (error: unknown): error is AxiosError<ErrorResponse> =>
    axios.isAxiosError(error);

  //Error handling logic
  const handleError = (error: unknown, defaultErrorMessage: string) => {
    let message = defaultErrorMessage;

    // Handle AxiosError
    if (isAxiosError(error) && error.response) {
      message = error.response?.data?.message || defaultErrorMessage;
    } else if (error instanceof Error) {
      // Fallback for non-Axios errors
      message = error.message || defaultErrorMessage;
    }

    enqueueSnackbar({
      message,
      variant: "error",
      preventDuplicate: true,
    });
  };

  //Creating react query client
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
            const {
              defaultErrorMessage = "Something went wrong",
              actionOnError,
            } = query.meta ?? {};

            handleError(error, defaultErrorMessage);

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
