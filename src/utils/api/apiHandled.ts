import apiEndpoints from "./apiEndpoints";
import { setAlert } from "../alert";

import { setToken } from "../redux/tokenSlice";
import { setUser, setUserNames } from "../redux/userSlice";
import { setAccounts } from "../redux/accountsSlice";
import { setTransactions, updateTransaction as actionUpdateTransaction } from "../redux/transactionsSlice";
import { setCategories } from "../redux/categoriesSlice";

import { AppDispatch } from "../redux/store";
import { NavigateFunction } from "react-router-dom";

const formatErrorMessage = (message: string) => message.replace(/^Error: /g, "");

const classicErrorHandler = (error: { message: string; status?: number }, dispatch: AppDispatch, logout: Function) => {
  if (error?.status === 401) {
    dispatch(setAlert("Session expired.", "warning"));
    logout();
    return;
  }
  if (error?.status === 500) return dispatch(setAlert("Internal server error.", "danger"));
  dispatch(setAlert(formatErrorMessage(error.message), "warning"));
};

const login =
  (email: string, password: string) => async (dispatch: AppDispatch, navigate: NavigateFunction, logout: Function) => {
    const { data, error } = await apiEndpoints.login(email, password);
    (() => {
      if (error) return classicErrorHandler(error, dispatch, logout);
      if (data?.body?.token) {
        localStorage.setItem("token", data.body.token);
        dispatch(setToken(data.body.token));
        navigate("/profile");
      }
    })();
    return { data, error };
  };

const getUserProfile =
  (token: string) => async (dispatch: AppDispatch, navigate: NavigateFunction, logout: Function) => {
    const { data, error } = await apiEndpoints.getUserProfile(token);
    (() => {
      if (error) return classicErrorHandler(error, dispatch, logout);
      if (data?.body) dispatch(setUser(data.body));
    })();
    return { data, error };
  };

const updateUserProfile =
  (token: string, firstName: string, lastName: string) =>
  async (dispatch: AppDispatch, navigate: NavigateFunction, logout: Function) => {
    const { data, error } = await apiEndpoints.updateUserProfile(token, firstName, lastName);
    (() => {
      if (error) return classicErrorHandler(error, dispatch, logout);
      if (data?.body) dispatch(setUserNames({ firstName: data.body.firstName, lastName: data.body.lastName }));
    })();
    return { data, error };
  };

const getAccounts = (token: string) => async (dispatch: AppDispatch, navigate: NavigateFunction, logout: Function) => {
  const { data, error } = await apiEndpoints.getAccounts(token);
  (() => {
    if (error) return classicErrorHandler(error, dispatch, logout);
    if (data?.body) dispatch(setAccounts(data.body));
  })();
  return { data, error };
};

const getTransactions =
  (token: string, accountId: string, queryPage: string) =>
  async (dispatch: AppDispatch, navigate: NavigateFunction, logout: Function) => {
    const { data, error } = await apiEndpoints.getTransactions(token, accountId, queryPage);
    (() => {
      if (error) return classicErrorHandler(error, dispatch, logout);
      if (data?.body) dispatch(setTransactions(data.body));
    })();
    return { data, error };
  };

const updateTransaction =
  (token: string, accountId: string, transationId: string, update: { categoryId?: string; note: string }) =>
  async (dispatch: AppDispatch, navigate: NavigateFunction, logout: Function) => {
    const { data, error } = await apiEndpoints.updateTransaction(token, accountId, transationId, update);
    (() => {
      if (error) return classicErrorHandler(error, dispatch, logout);
      if (data?.body) dispatch(actionUpdateTransaction(data.body));
    })();
    return { data, error };
  };

const getCategories = () => async (dispatch: AppDispatch, navigate: NavigateFunction, logout: Function) => {
  const { data, error } = await apiEndpoints.getCategories();
  (() => {
    if (error) return classicErrorHandler(error, dispatch, logout);
    if (data?.body) dispatch(setCategories(data.body));
  })();
  return { data, error };
};
export { login, getUserProfile, updateUserProfile, getAccounts, getTransactions, updateTransaction, getCategories };
