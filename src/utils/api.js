import axios from "axios";

const host = process.env.REACT_APP_API_HOST || "localhost";
const port = process.env.REACT_APP_API_PORT || 3001;

async function login(email, password) {
  try {
    const res = await axios.post(`http://${host}:${port}/api/v1/user/login`, {
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
    const res = await axios.post(
      `http://${host}:${port}/api/v1/user/profile`,
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

const api = { login, getUserProfile };
export default api;
