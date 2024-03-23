import { AxiosError } from 'axios';

import { APIError, APIErrorT } from 'domain/errors';

import { CRITICAL_ERROR_BODY } from 'subsidiaryBinders/constants/errors';

import { APIErrorsStatusCodesEnum } from 'subsidiaryBinders/enums/errors';
import { Undefined, ApiResponse, ApiErrorsBodyModel, ApiErrorBody, ApiErrorsBody } from 'types/index';

// TODO: Investigate into Bitbucket errors structure and modify ApiErrorsBodyModel for complete correct working
export const entityErrorParser = (error: ApiErrorsBodyModel): ApiErrorsBody => [
  { code: error.key, message: error.message }
];

// TODO: Investigate into Bitbucket validation errors structure and modify APIValidationErrorBodyModel for complete correct working
export const validationErrorParser = (error: ApiErrorsBodyModel): ApiErrorsBody =>
  error.validation_errors.map(({ field, message }) => ({ code: field, message }));

export const APIErrorHandler = (error: AxiosError): ApiResponse => {
  const errorStatusCode = error.response?.status || 400;
  const errorData: ApiErrorsBodyModel = error.response?.data as ApiErrorsBodyModel;

  const simpleErrors = [
    APIErrorsStatusCodesEnum.BAD_REQUEST,
    APIErrorsStatusCodesEnum.NOT_FOUND,
    APIErrorsStatusCodesEnum.UNPROCESSABLE_ENTITY
  ];
  const criticalErrors = [APIErrorsStatusCodesEnum.SERVICE_UNAVAILABLE, APIErrorsStatusCodesEnum.INTERNAL_SERVER_ERROR];
  const permissionErrors = [APIErrorsStatusCodesEnum.FORBIDDEN];

  const apiError = new APIError('API error', errorStatusCode);

  if (errorStatusCode === APIErrorsStatusCodesEnum.UNAUTHORIZED)
    apiError.setContent({ body: CRITICAL_ERROR_BODY, isAuth: true });

  if (criticalErrors.includes(errorStatusCode)) {
    apiError.setContent({ body: CRITICAL_ERROR_BODY, isCritical: true });
  }

  if (permissionErrors.includes(errorStatusCode))
    apiError.setContent({ body: entityErrorParser(errorData), isPermission: true });

  if (simpleErrors.includes(errorStatusCode))
    if (errorData.validation_errors) apiError.setContent({ body: validationErrorParser(errorData) });
    else apiError.setContent({ body: entityErrorParser(errorData) });

  return { isSuccess: false, error: apiError, data: undefined };
};

export const getEntityApiError = (error: APIErrorT, entityError: string): Undefined<ApiErrorBody> =>
  error.body.find(err => err.code === entityError);
