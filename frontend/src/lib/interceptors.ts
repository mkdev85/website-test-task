import type {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const handleResponse = (response: AxiosResponse) => {
  return response;
};

export const handleResponseError = (error: AxiosError) => {
  if (error.response) {
    console.log("HTTP Error:", error.response.status);
  } else if (error.request) {
    console.log("Network Error", error.request);
  } else {
    console.log(error.message);
  }

  return Promise.reject(error);
};

export const handleRequest = (config: InternalAxiosRequestConfig) => {
  return config;
};

export const handleRequestError = (error: AxiosError) => {
  return Promise.reject(error);
};
