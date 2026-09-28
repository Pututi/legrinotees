import { NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"

// Confirma contra Stripe (no contra lo que diga la URL) si una sesión de
// pago realmente se completó. Esto es lo que decide si se muestra la
// pantalla de éxito y se vacía el carrito — nunca un temporizador local.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.json({ status: "not_found" }, { status: 400 })
  }

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === "paid") {
      return NextResponse.json({
        status: "paid",
        orderId: session.id.replace("cs_", "").slice(0, 10).toUpperCase(),
        amountTotal: session.amount_total,
        customerEmail: session.customer_details?.email || session.customer_email || null,
      })
    }

    return NextResponse.json({ status: "unpaid" })
  } catch (error) {
    console.error("Fehler beim Abrufen der Stripe-Sitzung:", error)
    return NextResponse.json({ status: "error" }, { status: 500 })
  }
}
