// Envío gratis a partir de 50€ (umbral típico para tiendas de streetwear
// pequeñas en Alemania, y el mismo que ya se anuncia en el footer, la ficha
// de producto, /shipping y /faq). 5,99€ es el costo ya anunciado ahí mismo.
// El umbral se evalúa sobre el subtotal ANTES del descuento — ver nota en
// app/checkout/page.tsx.
export const FREE_SHIPPING_THRESHOLD = 50
export const SHIPPING_COST = 5.99

export function getShippingCost(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
}
