import "./AccountLine.css";

export default function AccountLine({ type, amount, transactions }) {
  // Format the amount to have 2 decimal and a comma every 3 digits
  const amountFormated = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{`Argent Bank ${type} (x${transactions})`}</h3>
        <p className="account-amount">${amountFormated}</p>
        <p className="account-amount-description">{type === "Credit Card" ? "Current Balance" : "Available Balance"}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}
