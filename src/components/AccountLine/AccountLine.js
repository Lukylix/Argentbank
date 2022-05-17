import "./AccountLine.css";

export default function AccountLine({ title, amount, description }) {
  // Format the amount to have 2 decimal and a comma every 3 digits
  const amountFormated = amount
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">Argent Bank {title}</h3>
        <p className="account-amount">${amountFormated}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}
