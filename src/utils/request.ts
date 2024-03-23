import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';

import { BITBUCKET_REPOSITORY_ACCESS_TOKEN, BITBUCKET_CLOUD_API_URL } from 'config/index';

import { APIErrorT } from 'domain/errors';

import { APIErrorHandler } from './errorHandlers';

import { Undefined, ApiResponse } from 'types/index';

declare module 'axios' {
  export interface AxiosResponse {
    isSuccess: boolean;
    error: Undefined<APIErrorT>;
  }
}

const request = (): AxiosInstance => {
  const defaultOptions: AxiosRequestConfig = {
    baseURL: `${BITBUCKET_CLOUD_API_URL}/`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${BITBUCKET_REPOSITORY_ACCESS_TOKEN}`,
      'Content-Type': 'application/json; application/ld+json; text/html; charset=utf-8'
    }
  };

  const instance: AxiosInstance = axios.create(defaultOptions);

  instance.interceptors.response.use(
    async (response: AxiosResponse): Promise<AxiosResponse> => {
      // Success response
      response.isSuccess = true;
      response.error = undefined;
      return response;
    },
    (error: AxiosError): Promise<ApiResponse> => {
      // Error response
      return Promise.reject(APIErrorHandler(error));
    }
  );

  return instance;
};

export default request();
