import axios from "axios";

const host = import.meta.env.VITE_APP_API_HOST || "localhost";
const port = import.meta.env.VITE_APP_API_PORT || 3001;

const client = axios.create({
  baseURL: `http://${host}:${port}/api/v1`,
});

const createApiCall = (func) => {
  return async (...args) => {
    try {
      const res = await func(...args);
      return { data: res.data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: error?.response?.data?.message || error.message, status: error?.response?.status },
      };
    }
  };
};

const login = async (email, password) =>
  await client.post(`/user/login`, {
    password,
    email,
  });

const getUserProfile = async (token) =>
  await client.post(
    `/user/profile`,
    {},
    {
      headers: {
        authorization: "Bearer " + token,
      },
    }
  );

const updateUserProfile = async (token, firstName, lastName) =>
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

const getAccounts = async (token) =>
  await client.get(`/user/accounts`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });

const getTransactions = async (token, accountId, querryPage = 1) => {
  if (querryPage < 1) querryPage = 1;
  return await client.get(`/user/accounts/${accountId}/transactions?page=${querryPage}`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

const updateTransaction = async (token, accountId, transactionId, update) =>
  await client.put(`/user/accounts/${accountId}/transactions/${transactionId}`, update, {
    headers: {
      authorization: "Bearer " + token,
    },
  });

const getCategories = async () => await client.get(`/categories`);

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
