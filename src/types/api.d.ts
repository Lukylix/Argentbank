interface IErrorResponse {
  message?: string;
}

interface IEndPointResponse<T = any> {
  data: T | null;
  error: null | { message: string; status?: number };
}

interface IApiResponse<T = any> {
  message: string;
  status: number;
  body: T;
}

type ApiDataResponse =
  | IApiResponse<IUserProfile>
  | IApiResponse<{ token: string }>
  | IApiResponse<IAccount[]>
  | IApiResponse<ITransactionBody>
  | IApiResponse<ICategory[]>;
