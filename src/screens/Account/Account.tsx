import useAccountLogic from "./hooks/useAccountLogic";
import useAccountData from "./hooks/useAccountData";

import addCommaEvery3Digits from "../../utils/formatAmount";

import { TransactionLine, Pagination, Spinner } from "../../components";

import "./Account.css";

export default function Account() {
  const { accountLoading, transactionsLoading, categoriesLoading } = useAccountLogic();
  const { account, transactions, page, totalPage } = useAccountData();

  return (
    <main className="main bg-dark">
      <header className="accountInfo">
        {accountLoading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="accountInfo-title">{`Argent Bank ${account?.type || ""} (x${
              account?.transactions || ""
            })`}</h1>
            <p>
              <span className="accountInfo-Amount">${addCommaEvery3Digits(account?.amount)}</span>
              <br />
              <span className="accountInfo-Description">
                {account?.type === "Credit Card" ? "Current Balance" : "Available Balance"}
              </span>
            </p>
          </>
        )}
      </header>
      {transactionsLoading || categoriesLoading ? (
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
            />
          ))}
        </section>
      )}
      <Pagination page={page} totalPage={totalPage} />
    </main>
  );
}
