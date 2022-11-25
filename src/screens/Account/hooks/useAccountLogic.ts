import { useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setTransactions } from "../../../utils/redux/transactionsSlice";

import useApi from "../../../hooks/useApi";
import { getAccounts, getTransactions, getCategories } from "../../../utils/api";

import { RootSate } from "../../../utils/redux/store";
import { addAlert } from "../../../utils/redux/alertSlice";

export default function useAccountLogic() {
  useRemoveTransactionsOnMount();

  const categoriesLoading = useLoadCategories();
  const accountLoading = useLoadAccounts();
  const transactionsLoading = useLoadTransactions();

  useRedirectOnExcedingPageQuerry();

  return { accountLoading, transactionsLoading, categoriesLoading };
}

function useRemoveTransactionsOnMount() {
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      if (!dispatch) return;
      dispatch(setTransactions({ transactions: [] }));
    })();
  }, [dispatch]);
}

function useLoadCategories() {
  const [getCategoriesRequest, categoriesLoading] = useApi(getCategories);
  useEffect(() => {
    (() => {
      if (!getCategoriesRequest) return;
      getCategoriesRequest();
    })();
  }, [getCategoriesRequest]);

  return categoriesLoading;
}

function useLoadAccounts(): boolean {
  const token = useSelector((state: RootSate) => state.token);
  const [getAccountsRequest, accountLoading] = useApi(getAccounts);

  useEffect(() => {
    (() => {
      if (!token || !getAccountsRequest) return;
      getAccountsRequest(token);
    })();
  }, [token, getAccountsRequest]);

  return accountLoading;
}

function useQuerryPage() {
  const location = useLocation();
  return useMemo(() => parseInt(new URLSearchParams(location.search).get("page") || "1") || 1, [location]);
}

function useLoadTransactions() {
  const { accountId } = useParams();
  const querryPage = useQuerryPage();
  const accounts = useSelector((state: RootSate) => state.accounts);
  const account = useMemo(() => accounts.find((account) => account.id === accountId), [accounts, accountId]);

  const token = useSelector((state: RootSate) => state.token);
  const [getTransactionsRequest, transactionsLoading] = useApi(getTransactions);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (!(accounts.length > 0) || !token || !querryPage || !getTransactionsRequest || !dispatch || !navigate) return;
      if (!account?.id) {
        dispatch(
          addAlert({
            message: "Account not found. You have been redirected to your profile page.",
            type: "warning",
            duration: 6000,
          })
        );
        navigate("/profile");
        return;
      }
      getTransactionsRequest(token, account?.id, querryPage);
    })();
  }, [accounts, account?.id, token, querryPage, getTransactionsRequest, dispatch, navigate]);

  return transactionsLoading;
}

function useRedirectOnExcedingPageQuerry() {
  const { accountId } = useParams();
  const baseUrlAccount = useMemo(() => `/account/${accountId}?page=`, [accountId]);

  const { totalPage } = useSelector((state: RootSate) => state.transactions);
  const querryPage = useQuerryPage();

  const navigate = useNavigate();

  useEffect(() => {
    (() => {
      if (!querryPage || !totalPage || !baseUrlAccount || !navigate) return;
      if (querryPage > totalPage) navigate(`${baseUrlAccount}${totalPage}`);
    })();
  }, [totalPage, querryPage, baseUrlAccount, navigate]);
}
