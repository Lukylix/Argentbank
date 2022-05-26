import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { setTransactions } from "../../utils/redux/transactionsSlice";
import formatAmount from "../../utils/formatAmount";
import useApi from "../../hooks/useApi";
import { getAccounts, getTransactions, getCategories } from "../../utils/api";

import TransactionLine from "../../components/TransactionLine";

import "./Account.css";
import Pagination from "../../components/Pagination";
import Spinner from "../../components/Spinner";
export default function Account() {
  const location = useLocation();
  const navigate = useNavigate();
  const querryPage = new URLSearchParams(location.search).get("page");
  const { accountId } = useParams();
  const account = useSelector((state) => state.accounts.find((account) => account.id === accountId));
  const { transactions, page, totalPage } = useSelector((state) => state.transactions);
  const token = useSelector((state) => state.token);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [getAccountsRequest, accountLoading] = useApi(getAccounts);
  const [getTransactionsRequest, transactionsLoading] = useApi(getTransactions);
  const [getCategoriesRequest] = useApi(getCategories);
  const baseUrlAccount = `/account/${accountId}?page=`;

  useEffect(() => {
    dispatch(setTransactions({ transactions: [] }));
    getCategoriesRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!token) return;
    getAccountsRequest(token);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!account || !token) return;
    getTransactionsRequest(token, account.id, querryPage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, token, querryPage]);

  useEffect(() => {
    if (!querryPage || !totalPage) return;
    if (querryPage > totalPage) navigate(`${baseUrlAccount}${totalPage}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPage, querryPage]);

  return (
    <main className="main bg-dark">
      <header className="accountInfo">
        {accountLoading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="accountInfo-title">{`Argent Bank ${account?.type} (x${account?.transactions})`}</h1>
            <p>
              <span className="accountInfo-Amount">${formatAmount(account?.amount)}</span>
              <br />
              <span className="accountInfo-Description">
                {account?.type === "Credit Card" ? "Current Balance" : "Available Balance"}
              </span>
            </p>
          </>
        )}
      </header>
      {transactionsLoading ? (
        <Spinner />
      ) : (
        <section id="transactions">
          <div className="columnInfos">
            <p className="columnInfos-title">Date</p>
            <p className="columnInfos-title">Description</p>
            <p className="columnInfos-title">Amount</p>
            <p className="columnInfos-title">Balance</p>
          </div>
          {transactions?.map((transaction) => (
            <TransactionLine
              key={transaction.id}
              id={transaction.id}
              date={transaction.createdAt}
              amount={transaction.amount}
              description={transaction.description}
              type={transaction.type}
              category={transaction.categoryId}
              note={transaction.note}
              balance={transaction.balance}
              categories={categories}
            />
          ))}
        </section>
      )}
      <Pagination baseUrl={baseUrlAccount} page={page} totalPage={totalPage} />
    </main>
  );
}
