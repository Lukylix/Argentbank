import { Link } from "react-router-dom";

import formatAmount from "../../utils/formatAmount";

import "./AccountLine.css";

export default function AccountLine({ id, type, amount, transactions }: IAccountLineProps) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{`Argent Bank ${type} (x${transactions})`}</h3>
        <p className="account-amount">${formatAmount(amount)}</p>
        <p className="account-amount-description">{type === "Credit Card" ? "Current Balance" : "Available Balance"}</p>
      </div>
      <div className="account-content-wrapper cta">
        <Link to={`/account/${id}`} className="transaction-button">
          View transactions
        </Link>
      </div>
    </section>
  );
}
