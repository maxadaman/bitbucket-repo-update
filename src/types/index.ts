import { APIErrorT } from 'domain/errors';

export type Nullable<T> = T | null;
export type Undefined<T> = T | undefined;
export type NotUndefined<T> = T extends undefined ? never : T;

// Errors

export type APIValidationErrorBodyModel = {
  field: string;
  message: string;
};

export type ApiErrorsBodyModel = {
  key: string;
  message: string;
  validation_errors: APIValidationErrorBodyModel[];
};

export type ApiErrorBody = {
  code: string;
  message: string;
};

export type ApiErrorsBody = ApiErrorBody[];

export type ApiResponse<T = undefined> = {
  isSuccess: boolean;
  data: T extends undefined ? undefined : T;
  error: APIErrorT | undefined;
};

export type Response<T = undefined> = ApiResponse<T>;
