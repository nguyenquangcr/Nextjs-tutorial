export default function FormatCurrency(currency) {
  return currency.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}
