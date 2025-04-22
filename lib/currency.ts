// Tasa de conversión de USD a EUR (ejemplo: 1 USD = 0.85 EUR)
export const USD_TO_EUR_RATE = 0.85

// Función para convertir precios según el idioma
export function formatPrice(price: number, language: string): string {
  if (language === "de") {
    // Convertir a EUR para alemán
    const eurPrice = price * USD_TO_EUR_RATE
    // Formatear con símbolo de euro y coma decimal (formato europeo)
    return `${eurPrice.toFixed(2).replace(".", ",")} €`
  } else {
    // Mantener en USD para inglés y otros idiomas
    return `$${price.toFixed(2)}`
  }
}
