// Los precios del catálogo ya son el precio final en euros: no se aplica
// ninguna conversión. (Antes había una tasa ×0.85 de ejemplo que hacía que
// el mismo producto mostrara un precio distinto según la pantalla.)
export function formatPrice(price: number, _language?: string): string {
  // Formatear con símbolo de euro y coma decimal (formato europeo)
  return `${price.toFixed(2).replace(".", ",")} €`
}
