import { useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setTransactions } from "../../utils/redux/transactionsSlice";

import useApi from "../../hooks/useApi";
import { getAccounts, getTransactions, getCategories } from "../../utils/api";

import { RootSate } from "../../utils/redux/store";

export default function useAccountLogic() {
  const dispatch = useDispatch();

  const accountLoading = loadAccounts();
  const transactionsLoading = loadTransactions();

  const [getCategoriesRequest] = useApi(getCategories);

  redirectOnExcedingPageQuerry();

  useEffect(() => {
    dispatch(setTransactions({ transactions: [] }));
    getCategoriesRequest();
  }, []);

  return { accountLoading, transactionsLoading };
}

function useQuerryPage() {
  const location = useLocation();
  return useMemo(() => parseInt(new URLSearchParams(location.search).get("page") || "1") || 1, [location]);
}

function loadTransactions() {
  const { accountId } = useParams();
  const querryPage = useQuerryPage();
  const account = useSelector((state: RootSate) => state.accounts.find((account) => account.id === accountId));

  const token = useSelector((state: RootSate) => state.token);
  const [getTransactionsRequest, transactionsLoading] = useApi(getTransactions);

  useEffect(() => {
    if (!account?.id || !token) return;
    getTransactionsRequest(token, account.id, querryPage);
  }, [account, token, querryPage]);

  return transactionsLoading;
}

function loadAccounts(): boolean {
  const token = useSelector((state: RootSate) => state.token);
  const [getAccountsRequest, accountLoading] = useApi(getAccounts);

  useEffect(() => {
    if (!token) return;
    getAccountsRequest(token);
  }, [token]);

  return accountLoading;
}

function redirectOnExcedingPageQuerry() {
  const { accountId } = useParams();
  const baseUrlAccount = useMemo(() => `/account/${accountId}?page=`, [accountId]);

  const { totalPage } = useSelector((state: RootSate) => state.transactions);
  const querryPage = useQuerryPage();

  const navigate = useNavigate();

  useEffect(() => {
    if (!querryPage || !totalPage) return;
    if (querryPage > totalPage) navigate(`${baseUrlAccount}${totalPage}`);
  }, [totalPage, querryPage]);
}
