"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/lib/currency"
import { CreditCard, CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react"
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

type PaymentInfo = {
  cardName: string
  cardNumber: string
  expiry: string
  cvc: string
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

const emptyPaymentInfo: PaymentInfo = {
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
}

export default function CheckoutPage() {
  const { items, subtotal, discount, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(emptyShippingInfo)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(emptyPaymentInfo)
  const shippingFormRef = useRef<HTMLFormElement>(null)
  const paymentFormRef = useRef<HTMLFormElement>(null)

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
  const tax = discountedSubtotal * 0.08 // 8% tax — placeholder, no confirmado (ver nota para Gustavo)
  const total = discountedSubtotal + shippingCost + tax

  const updateShippingField = (field: keyof ShippingInfo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setShippingInfo((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const updatePaymentField = (field: keyof PaymentInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: e.target.value }))
  }

  // Avanzar de paso solo si el formulario cumple con la validación nativa
  // del navegador (campos requeridos, formato de email, etc.). Antes los
  // botones llamaban a setStep directamente sin validar nada.
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (shippingFormRef.current?.reportValidity()) {
      setStep(2)
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (paymentFormRef.current?.reportValidity()) {
      setStep(3)
    }
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true)
      clearCart()
    }, 1500)
  }

  const cardLast4 = paymentInfo.cardNumber.replace(/\s/g, "").slice(-4)

  // If no items in cart, redirect to cart page
  if (items.length === 0 && !orderComplete) {
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

  // Order complete screen
  if (orderComplete) {
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
            Vielen Dank für deinen Einkauf. Wir haben deine Bestellung erhalten und bearbeiten sie umgehend. Du
            erhältst in Kürze eine Bestätigungs-E-Mail.
          </p>

          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="font-medium mb-2">Bestellung #LEGRINO-{Math.floor(Math.random() * 10000)}</h2>
            <p className="text-sm text-gray-500">Voraussichtliche Lieferung: 3-5 Werktage</p>
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
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-black" : "bg-gray-200"}`}></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-black text-white" : "bg-gray-200"}`}
          >
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>Versand</span>
          <span>Zahlung</span>
          <span>Überprüfung</span>
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
                <form className="space-y-4" ref={shippingFormRef} onSubmit={handleShippingSubmit} noValidate={false}>
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
                      Weiter zur Zahlung
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Zahlungsinformationen</h2>
                <form className="space-y-4" ref={paymentFormRef} onSubmit={handlePaymentSubmit}>
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                      Name auf der Karte
                    </label>
                    <Input id="cardName" required value={paymentInfo.cardName} onChange={updatePaymentField("cardName")} />
                  </div>

                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                      Kartennummer
                    </label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        value={paymentInfo.cardNumber}
                        onChange={updatePaymentField("cardNumber")}
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                        Ablaufdatum
                      </label>
                      <Input id="expiry" placeholder="MM/JJ" required value={paymentInfo.expiry} onChange={updatePaymentField("expiry")} />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium mb-1">
                        CVC
                      </label>
                      <Input id="cvc" placeholder="123" required value={paymentInfo.cvc} onChange={updatePaymentField("cvc")} />
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <ShieldCheck className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">Deine Zahlungsinformationen sind sicher und verschlüsselt</span>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" type="button" onClick={() => setStep(1)}>
                      Zurück
                    </Button>
                    <Button type="submit" className="flex items-center">
                      Bestellung überprüfen
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
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
                  <h3 className="font-medium mb-3">Zahlungsmethode</h3>
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                    <span>{cardLast4 ? `Kreditkarte endet auf ${cardLast4}` : "Kreditkarte"}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmitOrder}>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep(2)} type="button">
                      Zurück
                    </Button>
                    <Button type="submit" className="flex items-center">
                      Bestellung aufgeben
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </form>
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

              <div className="flex justify-between">
                <span className="text-gray-600">MwSt.</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <div className="flex justify-between pt-4 border-t font-medium text-lg">
                <span>Gesamt</span>
                <span>{formatPrice(total)}</span>
              </div>

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
