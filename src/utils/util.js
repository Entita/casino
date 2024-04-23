export const amountFormatter = (amount) =>
  Number(amount).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,')
