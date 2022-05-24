import axios from "axios";

const host = process.env.REACT_APP_API_HOST || "localhost";
const port = process.env.REACT_APP_API_PORT || 3001;

const client = axios.create({
  baseURL: `http://${host}:${port}/api/v1`,
});

async function login(email, password) {
  try {
    const res = await client.post(`/user/login`, {
      password,
      email,
    });
    return { data: res.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: { message: error?.response?.data?.message || error.message, status: error?.response?.status },
    };
  }
}

async function getUserProfile(token) {
  try {
    const res = await client.post(
      `/user/profile`,
      {},
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    return { data: res.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: { message: error?.response?.data?.message || error.message, status: error?.response?.status },
    };
  }
}

async function updateUserProfile(token, firstName, lastName) {
  try {
    const res = await client.put(
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
    return { data: res.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: { message: error?.response?.data?.message || error.message, status: error?.response?.status },
    };
  }
}

const getAccounts = async (token) => {
  try {
    const res = await client.get(`/user/accounts`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return { data: res.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: { message: error?.response?.data?.message || error.message, status: error?.response?.status },
    };
  }
};

const getTransactions = async (token, accountId) => {
  try {
    const res = await client.get(`/user/accounts/${accountId}/transactions`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return { data: res.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: { message: error?.response?.data?.message || error.message, status: error?.response?.status },
    };
  }
};

export { login, getUserProfile, updateUserProfile, getAccounts, getTransactions };
const api = { login, getUserProfile, updateUserProfile, getAccounts, getTransactions };

export default api;
