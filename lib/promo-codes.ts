// Códigos de promoción válidos y su descuento (0.1 = 10%).
// Se usa tanto en el carrito (cliente) como en la creación de la sesión
// de pago (servidor), para que ambos lados apliquen exactamente la misma
// regla — el servidor nunca confía en un descuento que le mande el cliente.
export const PROMO_CODES: Record<string, number> = {
  welcome10: 0.1,
}

export function getDiscountPercent(code: string | null | undefined): number {
  if (!code) return 0
  return PROMO_CODES[code.trim().toLowerCase()] || 0
}
