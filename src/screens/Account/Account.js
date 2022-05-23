import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setAccounts } from "../../utils/redux/accountsSlice";
import { setTransactions } from "../../utils/redux/transactionsSlice";
import { setAlert } from "../../utils/alert";
import api from "../../utils/api";
import formatAmount from "../../utils/formatAmount";
import "./Account.css";
import TransactionLine from "../../components/TransactionLine";

export default function Account() {
  const { accountId } = useParams();
  const account = useSelector((state) => state.accounts.find((account) => account.id === accountId));
  const transactions = useSelector((state) => state.transactions);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTransactions([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!token) return;
    // Get accounts
    (async () => {
      const { data, error } = await api.getAccounts(token);
      if (error?.status === 400) return dispatch(setAlert("Invalid token.", "warning"));
      if (error?.status === 500) return dispatch(setAlert("Internal server error.", "danger"));
      if (error) return dispatch(setAlert("Something went wrong.", "warning"));
      if (data?.body) dispatch(setAccounts(data.body));
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!account || !token) return;
    // Get account transactions
    (async () => {
      const { data, error } = await api.getTransactions(token, account.id);
      if (error?.status === 400) return dispatch(setAlert("Account not found.", "warning"));
      if (error?.status === 500) return dispatch(setAlert("Internal server error.", "danger"));
      if (error) return dispatch(setAlert("Something went wrong.", "warning"));
      if (data?.body) dispatch(setTransactions(data.body));
    })();

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
