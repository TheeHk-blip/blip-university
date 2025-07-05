
export const formatCurrency = (amount: string | number) => {
  return Number(amount).toLocaleString("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0
  })
}