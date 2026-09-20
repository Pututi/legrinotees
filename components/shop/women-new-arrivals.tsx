"use client"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatPrice } from "@/lib/currency"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { ShoppingBag } from "lucide-react"
import { products, colorMap, getQuickAddVariant } from "@/lib/products"

export default function WomenNewArrivals() {
  const { language } = useLanguage()
  const { addItem } = useCart()
  const router = useRouter()

  // Los diseños más recientes (mayor id) de la categoría mujeres
  const newArrivals = [...products]
    .filter((p) => p.gender === "women")
    .sort((a, b) => b.id - a.id)
    .slice(0, 4)

  const handleQuickAdd = (product) => {
    const variant = getQuickAddVariant(product)
    if (!variant) {
      router.push(`/shop/${product.id}`)
      return
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: variant.size,
      color: variant.color,
      quantity: 1,
    })
  }

  return (
    <div className="w-full my-16 bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            className="text-3xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {language === "de" ? "Neue Ankünfte für Frauen" : "Women's New Arrivals"}
          </motion.h2>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/shop?category=women">
              <Button variant="outline">{language === "de" ? "Alle anzeigen" : "View all"}</Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/shop/${product.id}`}>
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/shop/${product.id}`}>
                  <h3 className="font-medium mb-1 group-hover:underline">{product.name}</h3>
                </Link>
                <p className="text-gray-600 mb-3">{formatPrice(product.price, language)}</p>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: colorMap[color] || color.toLowerCase() }}
                      ></div>
                    ))}
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => handleQuickAdd(product)}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {language === "de" ? "Hinzufügen" : "Add"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
