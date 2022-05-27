// Format the amount to have 2 decimal and a comma every 3 digits
export default function formatAmount(amount) {
  return amount?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
