// a function to format all curencies to 2 decimal places and converting cents to dollars
export function formatCurrency(currency){
  return (Math.round(currency) / 100).toFixed(2);
}