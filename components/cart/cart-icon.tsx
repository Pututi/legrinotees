"use client"

import { ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/context/cart-context"

export default function CartIcon() {
  const { setIsCartOpen, totalItems } = useCart()

  return (
    <button
      className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
      onClick={() => setIsCartOpen(true)}
      aria-label="Open cart"
    >
      <ShoppingBag className="w-5 h-5" />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            key="cart-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
          >
            {totalItems > 9 ? "9+" : totalItems}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
