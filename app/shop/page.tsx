"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/context/language-context"
import { formatPrice } from "@/lib/currency"
import { products } from "@/lib/products"
import MenPromoSection from "@/components/shop/men-promo-section"
import WomenPromoSection from "@/components/shop/women-promo-section"
import MenFeaturedCollections from "@/components/shop/men-featured-collections"
import MenNewArrivals from "@/components/shop/men-new-arrivals"
import WomenFeaturedCollections from "@/components/shop/women-featured-collections"
import WomenNewArrivals from "@/components/shop/women-new-arrivals"
import LimitedPromoSection from "@/components/shop/limited-promo-section"
import { useHero } from "@/context/hero-context"

export default function Shop() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const [activeCategory, setActiveCategory] = useState("all")
  const { addItem } = useCart()

  const { t, language } = useLanguage()
  const { setHasHero } = useHero()

  // Set active category based on URL parameter
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])

  // Las pestañas Herren/Damen/Limitierte Edition tienen banner: el header empieza transparente
  useEffect(() => {
    setHasHero(activeCategory !== "all")
    return () => setHasHero(false)
  }, [activeCategory, setHasHero])

  const filteredProducts =
    activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory)

  const handleQuickAdd = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: "M", // Default size
      quantity: 1,
    })
  }

  return (
    <div>
      {/* Banner a pantalla completa, pegado arriba, según la categoría */}
      {activeCategory === "men" && <MenPromoSection />}
      {activeCategory === "women" && <WomenPromoSection />}
      {activeCategory === "limited" && <LimitedPromoSection />}

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("shop.title") || "Shop Our Collection"}
          </motion.h1>

          <Tabs value={activeCategory} className="mb-12">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
              <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
                {t("shop.all") || "All"}
              </TabsTrigger>
              <TabsTrigger value="men" onClick={() => setActiveCategory("men")}>
                {t("shop.men") || "Men"}
              </TabsTrigger>
              <TabsTrigger value="women" onClick={() => setActiveCategory("women")}>
                {t("shop.women") || "Women"}
              </TabsTrigger>
              <TabsTrigger value="limited" onClick={() => setActiveCategory("limited")}>
                {t("shop.limited") || "Limited"}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Secciones adicionales según la categoría */}
          {activeCategory === "men" && (
            <>
              <MenFeaturedCollections />
              <MenNewArrivals />
            </>
          )}

          {activeCategory === "women" && (
            <>
              <WomenFeaturedCollections />
              <WomenNewArrivals />
            </>
          )}

          {/* Productos filtrados */}
          <div className="mt-16">
          <motion.h2
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeCategory === "all"
              ? language === "de"
                ? "Alle Produkte"
                : "All Products"
              : activeCategory === "men"
                ? language === "de"
                  ? "Herren T-Shirts"
                  : "Men's T-Shirts"
                : activeCategory === "women"
                  ? language === "de"
                    ? "Damen T-Shirts"
                    : "Women's T-Shirts"
                  : language === "de"
                    ? "Limitierte Auflage"
                    : "Limited Edition"}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onQuickAdd={handleQuickAdd} language={language} />
            ))}
          </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// La función ProductCard permanece igual
function ProductCard({ product, onQuickAdd, language }) {
  const [isHovered, setIsHovered] = useState(false)
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-0 shadow-sm">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Link href={`/shop/${product.id}`}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Quick add button */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-white p-3 transform transition-transform duration-300 ${
              isHovered ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <Button className="w-full" onClick={() => onQuickAdd(product)}>
              {t("shop.quickAdd")}
            </Button>
          </div>
        </div>
        <CardContent className="pt-4">
          <Link href={`/shop/${product.id}`}>
            <h3 className="font-medium hover:underline">{product.name}</h3>
          </Link>
          <p className="text-gray-600 mt-1">{formatPrice(product.price, language)}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
