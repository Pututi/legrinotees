"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

type SessionResult = {
  status: "paid" | "unpaid" | "not_found" | "error"
  orderId?: string
  amountTotal?: number
  customerEmail?: string
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 px-4 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  )
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { clearCart } = useCart()
  const [result, setResult] = useState<SessionResult | null>(null)

  useEffect(() => {
    if (!sessionId) {
      setResult({ status: "not_found" })
      return
    }
    fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data)
        // El carrito solo se vacía después de confirmar un pago REAL contra
        // Stripe, nunca por un temporizador local.
        if (data.status === "paid") clearCart()
      })
      .catch(() => setResult({ status: "error" }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  if (!result) {
    return (
      <div className="py-24 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  if (result.status !== "paid") {
    return (
      <motion.div
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Zahlung nicht bestätigt</h1>
          <p className="text-gray-600 mb-8">
            Wir konnten diese Zahlung nicht bestätigen. Falls Geld abgebucht wurde, hat sich noch keine Bestellung
            gebildet — bitte kontaktiere uns, bevor du es erneut versuchst.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/cart">
              <Button variant="outline">Zurück zum Warenkorb</Button>
            </Link>
            <Link href="/contact">
              <Button>Kontakt aufnehmen</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </motion.div>

        <h1 className="text-3xl font-bold mb-4">Bestellung bestätigt!</h1>
        <p className="text-gray-600 mb-8">
          Vielen Dank für deinen Einkauf. Deine Zahlung wurde bestätigt
          {result.customerEmail ? ` und eine Bestätigung wird an ${result.customerEmail} gesendet` : ""}.
        </p>

        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-medium mb-2">Bestellung #{result.orderId}</h2>
          {typeof result.amountTotal === "number" && (
            <p className="text-sm text-gray-500">
              Bezahlter Betrag: {(result.amountTotal / 100).toFixed(2).replace(".", ",")} €
            </p>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <Link href="/">
            <Button variant="outline">Zur Startseite</Button>
          </Link>
          <Link href="/shop">
            <Button>Weiter einkaufen</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
