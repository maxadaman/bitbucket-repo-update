import { Nullable, ApiErrorsBody } from 'types/index';

type ErrorContent = {
  body: ApiErrorsBody;
  isAuth?: boolean;
  isCritical?: boolean;
  isPermission?: boolean;
  isNotFound?: boolean;
};

interface APIErrorInterface {
  name: string;
  statusCode: Nullable<number>;
  body: ApiErrorsBody;
  isAuth: boolean;
  isCritical: boolean;
  isPermission: boolean;
  isNotFound: boolean;
  setContent: (content: ErrorContent) => void;
}

export class APIError extends Error implements APIErrorInterface {
  name = '';
  statusCode: Nullable<number> = null;
  body: ApiErrorsBody = [];
  isAuth = false;
  isCritical = false;
  isPermission = false;
  isNotFound = false;

  constructor(name: string, statusCode: number) {
    super();

    this.name = name;
    this.statusCode = statusCode;
  }

  setContent({
    body,
    isCritical = false,
    isPermission = false,
    isAuth = false,
    isNotFound = false
  }: ErrorContent): void {
    this.body = body;
    this.isCritical = isCritical;
    this.isPermission = isPermission;
    this.isAuth = isAuth;
    this.isNotFound = isNotFound;
  }
}

export type APIErrorT = InstanceType<typeof APIError>;
