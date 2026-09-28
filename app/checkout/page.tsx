"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/lib/currency"
import { ChevronRight, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

const emptyShippingInfo: ShippingInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  notes: "",
}

export default function CheckoutPage() {
  const { items, subtotal, discount, promoCode } = useCart()
  const [step, setStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(emptyShippingInfo)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [payError, setPayError] = useState("")
  const shippingFormRef = useRef<HTMLFormElement>(null)

  // Envío gratis a partir de 50€ (umbral típico para tiendas de streetwear
  // pequeñas en Alemania, y el mismo que ya se anuncia en el footer).
  // 5,99€ es el costo ya anunciado en /shipping y /faq.
  // Nota para Gustavo: el umbral se evalúa sobre el subtotal ANTES del
  // descuento. Si preferís que se evalúe después del descuento, avisame —
  // no lo cambio sin confirmación (ver informe de auditoría).
  const FREE_SHIPPING_THRESHOLD = 50
  const SHIPPING_COST = 5.99
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const discountedSubtotal = subtotal - discount
  // Sin impuesto agregado en el checkout: los precios del catálogo se tratan
  // como precio final (práctica habitual B2C en Alemania). En cuanto Gustavo
  // confirme régimen fiscal (19% estándar vs. pequeño empresario §19 UStG),
  // se ajusta cómo se muestra — no se inventa una tasa mientras tanto.
  const total = discountedSubtotal + shippingCost

  const updateShippingField =
    (field: keyof ShippingInfo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setShippingInfo((prev) => ({ ...prev, [field]: e.target.value }))
    }

  // Avanzar de paso solo si el formulario cumple con la validación nativa
  // del navegador (campos requeridos, formato de email, etc.).
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (shippingFormRef.current?.reportValidity()) {
      setStep(2)
    }
  }

  // Crea una sesión de pago real en Stripe (el servidor recalcula todo
  // desde el catálogo) y redirige a la página segura de Stripe para pagar
  // con tarjeta, PayPal, etc. Nada se confirma ni se vacía el carrito acá:
  // eso pasa recién en /checkout/success, después de que Stripe confirme
  // el pago de verdad.
  const handlePayNow = async () => {
    setIsRedirecting(true)
    setPayError("")
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({ id: item.id, size: item.size, color: item.color, quantity: item.quantity })),
          promoCode,
          shippingInfo,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Zahlung konnte nicht gestartet werden.")
      }
      window.location.href = data.url
    } catch (err) {
      setPayError(err instanceof Error ? err.message : "Zahlung konnte nicht gestartet werden.")
      setIsRedirecting(false)
    }
  }

  // If no items in cart, redirect to cart page
  if (items.length === 0) {
    return (
      <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Dein Warenkorb ist leer</h1>
        <p className="mb-8">Du musst zuerst Artikel zu deinem Warenkorb hinzufügen, bevor du zur Kasse gehst.</p>
        <Link href="/shop">
          <Button>Weiter einkaufen</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Kasse
      </motion.h1>

      {/* Checkout steps */}
      <div className="mb-8">
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-black text-white" : "bg-gray-200"}`}
          >
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-black" : "bg-gray-200"}`}></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-black text-white" : "bg-gray-200"}`}
          >
            2
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>Versand</span>
          <span>Überprüfung &amp; Zahlung</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout form */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Versandinformationen</h2>
                <form className="space-y-4" ref={shippingFormRef} onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        Vorname
                      </label>
                      <Input id="firstName" required value={shippingInfo.firstName} onChange={updateShippingField("firstName")} />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Nachname
                      </label>
                      <Input id="lastName" required value={shippingInfo.lastName} onChange={updateShippingField("lastName")} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      E-Mail
                    </label>
                    <Input id="email" type="email" required value={shippingInfo.email} onChange={updateShippingField("email")} />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Telefon
                    </label>
                    <Input id="phone" type="tel" required value={shippingInfo.phone} onChange={updateShippingField("phone")} />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Adresse
                    </label>
                    <Input id="address" required value={shippingInfo.address} onChange={updateShippingField("address")} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        Stadt
                      </label>
                      <Input id="city" required value={shippingInfo.city} onChange={updateShippingField("city")} />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        Bundesland
                      </label>
                      <Input id="state" required value={shippingInfo.state} onChange={updateShippingField("state")} />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium mb-1">
                        Postleitzahl
                      </label>
                      <Input id="zip" required value={shippingInfo.zip} onChange={updateShippingField("zip")} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium mb-1">
                      Anmerkungen zur Bestellung (Optional)
                    </label>
                    <Textarea id="notes" rows={3} value={shippingInfo.notes} onChange={updateShippingField("notes")} />
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button type="submit" className="flex items-center">
                      Weiter zur Überprüfung
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Review + real payment */}
            {step === 2 && (
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Überprüfe deine Bestellung</h2>

                <div className="space-y-4 mb-6">
                  <h3 className="font-medium">Bestellte Artikel</h3>
                  <ul className="divide-y">
                    {items.map((item, index) => (
                      <li key={index} className="py-4 flex">
                        <div className="w-16 h-16 relative flex-shrink-0 mr-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">
                            Größe: {item.size}
                            {item.color ? ` · Farbe: ${item.color}` : ""}
                          </p>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm">Menge: {item.quantity}</span>
                            <span>{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4 mb-6">
                  <h3 className="font-medium mb-3">Lieferadresse</h3>
                  <p className="text-gray-600">
                    {shippingInfo.firstName} {shippingInfo.lastName}
                    <br />
                    {shippingInfo.address}
                    <br />
                    {shippingInfo.zip} {shippingInfo.city}
                    {shippingInfo.state ? `, ${shippingInfo.state}` : ""}
                    <br />
                    Deutschland
                  </p>
                </div>

                <div className="border-t pt-4 mb-6">
                  <h3 className="font-medium mb-3">Zahlung</h3>
                  <p className="text-sm text-gray-600">
                    Du zahlst sicher über Stripe — mit Kreditkarte, PayPal und weiteren Methoden. Die Zahlungsdaten
                    gibst du erst auf der nächsten, gesicherten Seite ein.
                  </p>
                </div>

                {payError && <p className="text-sm text-red-500 mb-4">{payError}</p>}

                <div className="flex justify-between mt-6">
                  <Button variant="outline" type="button" onClick={() => setStep(1)} disabled={isRedirecting}>
                    Zurück
                  </Button>
                  <Button type="button" className="flex items-center" onClick={handlePayNow} disabled={isRedirecting}>
                    {isRedirecting ? (
                      "Weiterleiten…"
                    ) : (
                      <>
                        <Lock className="mr-2 w-4 h-4" />
                        Sicher bezahlen mit Stripe
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
            <div className="p-6 border-b">
              <h2 className="text-xl font-medium">Bestellübersicht</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Zwischensumme</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Rabatt</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Versand</span>
                <span>
                  {shippingCost === 0 ? <span className="text-green-600">Kostenlos</span> : formatPrice(shippingCost)}
                </span>
              </div>

              <div className="flex justify-between pt-4 border-t font-medium text-lg">
                <span>Gesamt</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-gray-400">inkl. MwSt., sofern anwendbar</p>

              {shippingCost === 0 && (
                <div className="text-sm text-green-600 mt-2">Du hast dir kostenlosen Versand gesichert!</div>
              )}

              {shippingCost > 0 && (
                <div className="text-sm text-gray-500 mt-2">
                  Noch {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} bis zum kostenlosen Versand
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
