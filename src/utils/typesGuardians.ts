import { ApiResponse } from 'types/index';

export const isApiResponse = (response: any): response is ApiResponse => {
  return typeof response.isSuccess === 'boolean';
};
