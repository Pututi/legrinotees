// Tasa de conversión de USD a EUR (ejemplo: 1 USD = 0.85 EUR)
export const USD_TO_EUR_RATE = 0.85

// Función para formatear precios siempre en euros
export function formatPrice(price: number, _language?: string): string {
  const eurPrice = price * USD_TO_EUR_RATE
  // Formatear con símbolo de euro y coma decimal (formato europeo)
  return `${eurPrice.toFixed(2).replace(".", ",")} €`
}
