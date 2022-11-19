import axios, { AxiosError, AxiosResponse } from "axios";

const host = import.meta.env.VITE_APP_API_HOST || "localhost";
const port = import.meta.env.VITE_APP_API_PORT || 3001;

const client = axios.create({
  baseURL: `http://${host}:${port}/api/v1`,
});

const createApiCall =
  (func: Function) =>
  async (...args: any[]): Promise<EndPointResponse> => {
    try {
      const res = await func(...args);
      return { data: res.data, error: null };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ErrorResponse>;
        return {
          data: null,
          error: { message: err?.response?.data?.message || err.message, status: err?.response?.status },
        };
      }
      if (error instanceof Error) return { data: null, error: { message: error.message } };
      return { data: null, error: { message: "Something went wrong." } };
    }
  };

const login = async (email: string, password: string): Promise<AxiosResponse<LoginResponse>> =>
  await client.post(`/user/login`, {
    password,
    email,
  });

const getUserProfile = async (token: string): Promise<AxiosResponse<GetUserProfileResponse>> =>
  await client.post(
    `/user/profile`,
    {},
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );

const updateUserProfile = async (
  token: string,
  firstName: string,
  lastName: string
): Promise<AxiosResponse<UpdateUserProfileResponse>> =>
  await client.put(
    `/user/profile`,
    {
      firstName,
      lastName,
    },
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );

const getAccounts = async (token: string): Promise<AxiosResponse<Account[]>> =>
  await client.get(`/user/accounts`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });

const getTransactions = async (
  token: string,
  accountId: string,
  querryPage = 1
): Promise<AxiosResponse<GetTransactionsResponse>> => {
  if (querryPage < 1) querryPage = 1;
  return await client.get(`/user/accounts/${accountId}/transactions?page=${querryPage}`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

const updateTransaction = async (
  token: string,
  accountId: string,
  transactionId: string,
  update: { categoryId?: string; note?: string }
): Promise<AxiosResponse<UpdateTransactionResponse>> =>
  await client.put(`/user/accounts/${accountId}/transactions/${transactionId}`, update, {
    headers: {
      authorization: "Bearer " + token,
    },
  });

const getCategories = async (): Promise<AxiosResponse<Category[]>> => await client.get(`/categories`);

const api = {
  login: createApiCall(login),
  getUserProfile: createApiCall(getUserProfile),
  updateUserProfile: createApiCall(updateUserProfile),
  getAccounts: createApiCall(getAccounts),
  getTransactions: createApiCall(getTransactions),
  updateTransaction: createApiCall(updateTransaction),
  getCategories: createApiCall(getCategories),
};

export default api;
