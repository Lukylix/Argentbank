import apiEndpoints from "./apiEndpoints";
import { setAlert } from "../alert";

import { setToken } from "../redux/tokenSlice";
import { setUser, setUserNames } from "../redux/userSlice";

const login = (email, password) => async (dispatch, navigate) => {
  const { data, error } = await apiEndpoints.login(email, password);
  (() => {
    if (error?.status === 400) return dispatch(setAlert("Invalid credentials.", "warning"));
    if (error?.status === 500) return dispatch(setAlert("Internal server error.", "danger"));
    if (error) return dispatch(setAlert("Something went wrong.", "warning"));
    if (data?.body?.token) {
      localStorage.setItem("token", data.body.token);
      dispatch(setToken(data.body.token));
      navigate("/profile");
    }
  })();
  return { data, error };
};

const getUserProfile = (token) => async (dispatch, navigate, logout) => {
  const { data, error } = await apiEndpoints.getUserProfile(token);
  (() => {
    if (error?.status === 400 || error?.status === 401) {
      dispatch(setAlert("Session expired.", "warning"));
      logout();
      return;
    }
    if (error?.status === 500) return dispatch(setAlert("Internal server error.", "danger"));
    if (error) return dispatch(setAlert("Something went wrong.", "warning"));
    if (data?.body) dispatch(setUser(data.body));
  })();
  return { data, error };
};

const updateUserProfile = (token, firstName, lastName) => async (dispatch, navigate, logout) => {
  const { data, error } = await apiEndpoints.updateUserProfile(token, firstName, lastName);
  (() => {
    if (error?.status === 400 || error?.status === 401) {
      dispatch(setAlert("Session expired.", "warning"));
      logout();
      navigate("/");
      return;
    }
    if (error?.status === 500) return dispatch(setAlert("Internal server error.", "danger"));
    if (error) return dispatch(setAlert("Something went wrong.", "warning"));
    if (data?.body) dispatch(setUserNames({ firstName: data.body.firstName, lastName: data.body.lastName }));
  })();
  return { data, error };
};

export { login, getUserProfile, updateUserProfile };
