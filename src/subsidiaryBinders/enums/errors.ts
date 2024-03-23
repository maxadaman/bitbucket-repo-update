export enum APIErrorsStatusCodesEnum {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVICE_UNAVAILABLE = 503,
  INTERNAL_SERVER_ERROR = 500,
  UNPROCESSABLE_ENTITY = 422
}

export enum GeneralApiErrorCodesEnum {
  CRITICAL_ERROR = 'critical_error'
}

export enum ResponseAuthErrorsEnum {
  INVALID_CREDENTIALS = 'auth/invalid-credential'
  // TODO: Add all error type
}

// TODO: Add enums for different entities (for dependency separation)
