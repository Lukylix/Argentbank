import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setTransactions } from "../../utils/redux/transactionsSlice";
import formatAmount from "../../utils/formatAmount";
import useApi from "../../hooks/useApi";
import { getAccounts, getTransactions } from "../../utils/api";

import TransactionLine from "../../components/TransactionLine";

import "./Account.css";
export default function Account() {
  const { accountId } = useParams();
  const account = useSelector((state) => state.accounts.find((account) => account.id === accountId));
  const { transactions } = useSelector((state) => state.transactions);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [getAccountsRequest] = useApi(getAccounts);
  const [getTransactionsRequest] = useApi(getTransactions);

  useEffect(() => {
    dispatch(setTransactions([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!token) return;
    getAccountsRequest(token);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!account || !token) return;
    getTransactionsRequest(token, account.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, token]);

  return (
    <main className="main bg-dark">
      <header className="accountInfo">
        <h1 className="accountInfo-title">{`Argent Bank ${account?.type} (x${account?.transactions})`}</h1>
        <p>
          <span className="accountInfo-Amount">${formatAmount(account?.amount)}</span>
          <br />
          <span className="accountInfo-Description">
            {account?.type === "Credit Card" ? "Current Balance" : "Available Balance"}
          </span>
        </p>
      </header>
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
            date={transaction.createdAt}
            amount={transaction.amount}
            description={transaction.description}
            type={transaction.type}
            category={transaction.categoryId.name}
            note={transaction.note}
            balance={transaction.balance}
          />
        ))}
      </section>
    </main>
  );
}
