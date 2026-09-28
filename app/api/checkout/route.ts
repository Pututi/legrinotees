import { NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { products } from "@/lib/products"
import { getDiscountPercent } from "@/lib/promo-codes"
import { getShippingCost } from "@/lib/shipping"

type CheckoutItemInput = {
  id: number
  size: string
  color?: string
  quantity: number
}

type ShippingInfo = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  notes: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const items: CheckoutItemInput[] = Array.isArray(body?.items) ? body.items : []
    const promoCode: string | null = typeof body?.promoCode === "string" ? body.promoCode : null
    const shippingInfo: ShippingInfo = body?.shippingInfo || {}

    if (items.length === 0) {
      return NextResponse.json({ error: "Der Warenkorb ist leer." }, { status: 400 })
    }

    // El precio, el nombre y la imagen de cada línea se toman SIEMPRE del
    // catálogo del servidor — nunca de lo que mande el navegador. Así un
    // cliente no puede manipular localStorage para pagar menos.
    let subtotal = 0
    const lineItems: {
      price_data: {
        currency: string
        product_data: { name: string; description?: string; images?: string[] }
        unit_amount: number
      }
      quantity: number
    }[] = []

    for (const item of items) {
      const product = products.find((p) => p.id === item.id)
      if (!product) {
        return NextResponse.json({ error: `Produkt ${item.id} nicht gefunden.` }, { status: 400 })
      }
      if (!product.sizes.includes(item.size)) {
        return NextResponse.json({ error: `Ungültige Größe für ${product.name}.` }, { status: 400 })
      }
      const quantity = Math.max(1, Math.min(20, Math.floor(item.quantity) || 1))
      const unitAmount = Math.round(product.price * 100) // en centavos
      subtotal += product.price * quantity

      const descriptionParts = [`Größe: ${item.size}`]
      if (item.color) descriptionParts.push(`Farbe: ${item.color}`)

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
            description: descriptionParts.join(" · "),
            images: product.image ? [`${getSiteUrl()}${product.image}`] : undefined,
          },
          unit_amount: unitAmount,
        },
        quantity,
      })
    }

    const discountPercent = getDiscountPercent(promoCode)
    const shippingCost = getShippingCost(subtotal)

    const stripe = getStripe()
    const siteUrl = getSiteUrl()

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Sin especificar payment_method_types, Stripe Checkout muestra
      // automáticamente todos los métodos habilitados en el Dashboard
      // (tarjeta, PayPal, etc.) — no hace falta listarlos a mano acá.
      line_items: lineItems,
      discounts: discountPercent > 0 ? [{ coupon: await getOrCreateCoupon(stripe, discountPercent) }] : undefined,
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: Math.round(shippingCost * 100), currency: "eur" },
            display_name: shippingCost === 0 ? "Kostenloser Versand" : "Standardversand",
          },
        },
      ],
      customer_email: shippingInfo.email || undefined,
      metadata: {
        firstName: shippingInfo.firstName || "",
        lastName: shippingInfo.lastName || "",
        phone: shippingInfo.phone || "",
        address: shippingInfo.address || "",
        city: shippingInfo.city || "",
        state: shippingInfo.state || "",
        zip: shippingInfo.zip || "",
        notes: shippingInfo.notes || "",
        promoCode: promoCode || "",
      },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Fehler beim Erstellen der Stripe-Sitzung:", error)
    const message = error instanceof Error ? error.message : "Unbekannter Fehler"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3412"
}

// Stripe no acepta un "% de descuento" suelto en una sesión: hace falta un
// Coupon. Se busca uno ya creado con ese mismo porcentaje antes de crear uno
// nuevo, para no acumular cupones duplicados en la cuenta de Stripe.
async function getOrCreateCoupon(stripe: ReturnType<typeof getStripe>, percentOff: number) {
  const id = `welcome-${Math.round(percentOff * 100)}`
  try {
    const existing = await stripe.coupons.retrieve(id)
    if (existing && !existing.deleted) return existing.id
  } catch {
    // No existe todavía: se crea a continuación.
  }
  const coupon = await stripe.coupons.create({
    id,
    percent_off: percentOff * 100,
    duration: "once",
  })
  return coupon.id
}
