import axios, { AxiosError, AxiosResponse } from "axios";

const baseUrl = import.meta.env.VITE_APP_API_BASEURL || "http://localhost:3000";

const client = axios.create({
  baseURL: `${baseUrl}/api/v1`,
});

const createApiCall =
  (func: (...args: any[]) => Promise<AxiosResponse>) =>
  async (...args: any[]) => {
    try {
      const res = await func(...args);
      return { data: res.data, error: null };
    } catch (error) {
      if (!(error instanceof Error))
        return { data: null, error: { message: "Something went wrong.", status: undefined } };
      let axiosError;
      if (axios.isAxiosError(error)) axiosError = error as AxiosError<IErrorResponse>;
      return {
        data: null,
        error: { message: axiosError?.response?.data?.message || error.message, status: axiosError?.response?.status },
      };
    }
  };

const login = async (email: string, password: string): Promise<AxiosResponse<IApiResponse<{ token: string }>>> =>
  await client.post(`/user/login`, {
    password,
    email,
  });

const getUserProfile = async (token: string): Promise<AxiosResponse<IApiResponse<IUserProfile>>> =>
  await client.get(`/user/profile`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });

const updateUserProfile = async (
  token: string,
  firstName: string,
  lastName: string
): Promise<AxiosResponse<IApiResponse<IUserProfile>>> =>
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

const getAccounts = async (token: string): Promise<AxiosResponse<IApiResponse<IAccount[]>>> =>
  await client.get(`/user/accounts`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });

const getTransactions = async (
  token: string,
  accountId: string,
  querryPage = 1
): Promise<AxiosResponse<IApiResponse<ITransactionBody>>> => {
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
): Promise<AxiosResponse<IApiResponse<ITransactionBody>>> =>
  await client.put(`/user/accounts/${accountId}/transactions/${transactionId}`, update, {
    headers: {
      authorization: "Bearer " + token,
    },
  });

const getCategories = async (): Promise<AxiosResponse<IApiResponse<ICategory[]>>> => await client.get(`/categories`);

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
