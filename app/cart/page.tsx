"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { formatPrice } from "@/lib/currency"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const { t, language } = useLanguage()

  // Handle promo code application
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setDiscount(subtotal * 0.1)
      setPromoApplied(true)
    } else {
      setDiscount(0)
      setPromoApplied(false)
      alert("Invalid promo code")
    }
  }

  // Calculate final total
  const total = subtotal - discount

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("cart.title")}
      </motion.h1>

      {items.length === 0 ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-medium mb-4">{t("cart.empty")}</h2>
          <p className="text-gray-500 mb-8">{t("cart.emptyMessage")}</p>
          <Link href="/shop">
            <Button size="lg">{t("cart.continueShopping")}</Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-medium">
                  {t("cart.cartItems")} ({totalItems})
                </h2>
              </div>

              <ul className="divide-y">
                {items.map((item, index) => (
                  <motion.li
                    key={`${item.id}-${item.size}-${index}`}
                    className="p-6 flex flex-col sm:flex-row"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                  >
                    {/* Product image */}
                    <div className="w-full sm:w-24 h-32 sm:h-24 relative mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    {/* Product details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="font-medium">{formatPrice(item.price, language)}</p>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">Size: {item.size}</p>
                      {item.color && <p className="text-sm text-gray-500 mb-4">Color: {item.color}</p>}

                      {/* Quantity controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                            aria-label={t("product.decrease")}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100"
                            aria-label={t("product.increase")}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-gray-500 hover:text-red-500 flex items-center"
                          aria-label={t("product.remove")}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          <span className="text-sm">{t("cart.remove")}</span>
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="p-6 border-t">
                <Link href="/shop">
                  <Button variant="outline" className="w-full sm:w-auto">
                    {t("cart.continueShopping")}
                  </Button>
                </Link>
              </div>
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
                <h2 className="text-xl font-medium">{t("cart.orderSummary")}</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t("cart.subtotal")}</span>
                  <span>{formatPrice(subtotal, language)}</span>
                </div>

                {/* Promo code section */}
                <div className="pt-2 pb-4 border-b">
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder={t("cart.promoCode")}
                      className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button onClick={applyPromoCode} variant="outline" disabled={promoApplied || !promoCode}>
                      {t("cart.apply")}
                    </Button>
                  </div>
                  {promoApplied && <div className="text-sm text-green-600">{t("cart.promoApplied")}</div>}
                  <div className="text-xs text-gray-500 mt-1">{t("cart.promoTry")}</div>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>{t("cart.discount")}</span>
                    <span>-{formatPrice(discount, language)}</span>
                  </div>
                )}

                <div className="flex justify-between pt-2 border-t font-medium text-lg">
                  <span>{t("cart.total")}</span>
                  <span>{formatPrice(total, language)}</span>
                </div>

                <p className="text-sm text-gray-500">{t("cart.shippingTaxes")}</p>

                <Link href="/checkout">
                  <Button className="w-full flex items-center justify-center">{t("cart.proceedToCheckout")}</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
