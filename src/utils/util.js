export const amountFormatter = (amount) =>
  Number(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
