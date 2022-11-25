// Format the amount to have 2 decimal and a comma every 3 digits
export default function addCommaEvery3Digits(amount: number | undefined) {
  return amount?.toFixed(2).replace(/(?=(\d{3})+(?!\d))/g, ",");
}
