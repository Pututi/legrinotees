"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { formatPrice } from "@/lib/currency"
import Link from "next/link"

// Import AnimatePresence from framer-motion
import { AnimatePresence } from "framer-motion"

// Cambiar la línea 20 para usar URLs absolutas
const popularProducts = [
  {
    id: 1,
    name: "Classic Black Tee",
    price: 29.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207231/Chickenleg.png",
  },
  {
    id: 2,
    name: "White Minimalist",
    price: 29.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207236/elfumador3.png",
  },
  {
    id: 3,
    name: "Gray Essential",
    price: 34.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207237/elny.png",
  },
]

export default function QuickPurchase() {
  const { t, language } = useLanguage()
  const { addItem } = useCart()
  const [selectedProduct, setSelectedProduct] = useState(popularProducts[0])
  const [selectedSize, setSelectedSize] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  // Actualizar la función handleAddToCart para asegurarnos de que las imágenes se pasen correctamente
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert(language === "de" ? "Bitte wähle eine Größe" : "Please select a size")
      return
    }

    addItem({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image, // Asegurarnos de que esta URL sea absoluta
      size: selectedSize,
      color: selectedProduct.colors ? selectedProduct.colors[0] : undefined,
      quantity: 1,
    })

    // Reset and close
    setSelectedSize("")
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Floating button */}
      <motion.button
        className="bg-black text-white rounded-full p-4 shadow-lg flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">
          {isOpen ? (language === "de" ? "Schließen" : "Close") : language === "de" ? "Schnellkauf" : "Quick Purchase"}
        </span>
      </motion.button>

      {/* Quick purchase panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b">
              <h3 className="font-bold text-lg">{language === "de" ? "Schnellkauf" : "Quick Purchase"}</h3>
              <p className="text-sm text-gray-500">
                {language === "de"
                  ? "Wählen Sie ein Produkt und eine Größe für einen schnellen Kauf"
                  : "Select a product and size for a quick purchase"}
              </p>
            </div>

            <div className="p-4">
              {/* Product selection */}
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2">{language === "de" ? "Beliebte Artikel" : "Popular Items"}</h4>
                <div className="flex space-x-2">
                  {popularProducts.map((product) => (
                    <button
                      key={product.id}
                      className={`relative w-16 h-16 rounded-md overflow-hidden border-2 ${
                        selectedProduct.id === product.id ? "border-black" : "border-transparent"
                      }`}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error(`Error loading image: ${product.image}`)
                          e.currentTarget.src = "/plain-cotton-tee.png"
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected product */}
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-md overflow-hidden mr-3">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Error loading image: ${selectedProduct.image}`)
                      e.currentTarget.src = "/plain-cotton-tee.png"
                    }}
                  />
                </div>

                <div>
                  <h4 className="font-medium">{selectedProduct.name}</h4>
                  <p className="text-gray-600">{formatPrice(selectedProduct.price, language)}</p>
                </div>
              </div>

              {/* Size selection */}
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2">{language === "de" ? "Größe wählen" : "Select Size"}</h4>
                <div className="grid grid-cols-5 gap-1">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className={`py-1 border rounded-md text-sm font-medium ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-900 border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2">
                <Button onClick={handleAddToCart}>{language === "de" ? "In den Warenkorb" : "Add to Cart"}</Button>
                <Link href="/shop" className="text-center text-sm text-gray-500 hover:text-black">
                  {language === "de" ? "Alle Produkte anzeigen" : "View All Products"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
