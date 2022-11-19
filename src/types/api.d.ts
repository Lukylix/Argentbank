interface ErrorResponse {
  message?: string;
}

interface EndPointResponse {
  data: any | null;
  error: null | { message: string; status?: number };
}

interface ApiReponse<T = any> {
  message: string;
  status: number;
  body: T;
}

interface LoginResponse extends ApiReponse<{ token: string }> {}

interface GetUserProfileResponse extends ApiReponse<UserProfile> {}
interface UpdateUserProfileResponse extends GetUserProfileResponse {}

interface GetTransactionsResponse extends ApiReponse<TransactionBody> {}
interface UpdateTransactionResponse extends GetTransactionsResponse {}
