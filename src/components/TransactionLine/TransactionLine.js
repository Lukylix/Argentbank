import formatAmount from "../../utils/formatAmount";

import "./TransactionLine.css";

export default function TransactionLine({ date, id, description, amount, balance, type, category, note }) {
  const formatDate = (date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const monthIndex = dateObject.getMonth();
    const year = dateObject.getFullYear();
    return `${monthNames[monthIndex]} ${day}th, ${year}`;
  };
  return (
    <details className="transaction">
      <summary>
        <i className="fa fa-chevron-down" />
        <span>{formatDate(date)}</span>
        <span>{description}</span>
        <span style={{ color: amount > 0 ? "#5BA095" : "inherit" }}>{`${amount > 0 ? "+" : "-"}$${formatAmount(
          Math.abs(amount)
        )}`}</span>
        <span>{`${balance > 0 ? "+" : "-"}$${formatAmount(Math.abs(balance))}`}</span>
      </summary>
      <div className="transaction-detail">
        <p>Transaction Type: {type}</p>
        <p>
          Category: {category} <i className="fa fa-pencil" />
        </p>
        <p>
          Note: {note}
          <i className="fa fa-pencil" />
        </p>
      </div>
    </details>
  );
}
