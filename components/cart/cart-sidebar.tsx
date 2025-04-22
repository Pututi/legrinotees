"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { formatPrice } from "@/lib/currency"
import Image from "next/image"
import Link from "next/link"

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, subtotal, totalItems } = useCart()
  const { t, language } = useLanguage()

  // Close cart when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCartOpen(false)
      }
    }

    if (isCartOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isCartOpen, setIsCartOpen])

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isCartOpen])

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Cart sidebar */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                <h2 className="text-lg font-medium">
                  {t("cart.title")} ({totalItems})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto py-4 px-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">{t("cart.empty")}</h3>
                  <p className="text-gray-500 mb-6">{t("cart.emptyMessage")}</p>
                  <Button onClick={() => setIsCartOpen(false)}>{t("cart.continueShopping")}</Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item, index) => (
                    <motion.li
                      key={`${item.id}-${item.size}-${index}`}
                      className="flex border rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {/* Product image */}
                      <div className="w-24 h-24 relative flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      {/* Product details */}
                      <div className="flex-1 p-3">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="font-medium">{formatPrice(item.price, language)}</p>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">Size: {item.size}</p>
                        {item.color && <p className="text-sm text-gray-500 mb-2">Color: {item.color}</p>}

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1, item.color)}
                              className="p-1 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                              aria-label={t("product.decrease")}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-2 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1, item.color)}
                              className="p-1 hover:bg-gray-100"
                              aria-label={t("product.increase")}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.size, item.color)}
                            className="text-gray-500 hover:text-red-500"
                            aria-label={t("product.remove")}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between font-medium">
                  <span>{t("cart.subtotal")}</span>
                  <span>{formatPrice(subtotal, language)}</span>
                </div>
                <p className="text-sm text-gray-500">{t("cart.shippingTaxes")}</p>
                <div className="space-y-2">
                  <Link href="/cart" onClick={() => setIsCartOpen(false)} className="w-full">
                    <Button className="w-full">{t("cart.viewCart")}</Button>
                  </Link>
                  <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full">
                    <Button className="w-full" variant="outline">
                      {t("cart.checkout")}
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
