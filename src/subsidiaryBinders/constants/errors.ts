import { GeneralApiErrorCodesEnum } from 'subsidiaryBinders/enums/errors';

import { APIError } from 'domain/errors';

import { ApiResponse, ApiErrorsBody } from 'types/index';

export const DEFAULT_API_ERROR_RESPONSE: ApiResponse = {
  isSuccess: false,
  data: undefined,
  error: new APIError('Default api error', 400)
};

export const CRITICAL_ERROR_BODY: ApiErrorsBody = [
  { code: GeneralApiErrorCodesEnum.CRITICAL_ERROR, message: 'Something went wrong' }
];
