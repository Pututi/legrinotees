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
import MenPromoSection from "@/components/shop/men-promo-section"
import WomenPromoSection from "@/components/shop/women-promo-section"
import MenFeaturedCollections from "@/components/shop/men-featured-collections"
import MenNewArrivals from "@/components/shop/men-new-arrivals"
import WomenFeaturedCollections from "@/components/shop/women-featured-collections"
import WomenNewArrivals from "@/components/shop/women-new-arrivals"
import OutfitSuggestionsWomen from "@/components/shop/outfit-suggestions-women-alt"
import OutfitSuggestionsMen from "@/components/shop/outfit-suggestions-men-alt"

// Array de productos (ya existente, se mantiene igual)
const products = [
  {
    id: 1,
    name: "RnB Hamster",
    price: 29.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207241/master.png",
    category: "men",
  },
  {
    id: 2,
    name: "Rabbit Yow",
    price: 29.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207241/rabbito.png",
    category: "men",
  },
  {
    id: 3,
    name: "Chicken Legs",
    price: 34.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207231/Chickenleg.png",
    category: "men",
  },
  {
    id: 4,
    name: "DJ Lama",
    price: 34.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744264807/djlama.png",
    category: "men",
  },
  {
    id: 5,
    name: "Bad Dog",
    price: 29.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744309704/eldoggy5.png",
    category: "women",
  },
  {
    id: 6,
    name: "El Pez Tee",
    price: 34.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492218/elpeznegro.png",
    category: "women",
  },
  {
    id: 7,
    name: "The Big Mouth",
    price: 29.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207227/elbocudo2.png",
    category: "women",
  },
  {
    id: 8,
    name: "The Minimalist Cat",
    price: 34.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744315789/elgato.png",
    category: "women",
  },
  {
    id: 9,
    name: "La Hoja",
    price: 49.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744318764/lahoja.png",
    category: "limited",
  },
  {
    id: 10,
    name: "El Gato Tee",
    price: 49.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744315786/elgato2.png",
    category: "limited",
  },
  // Nuevos productos con URLs directas a las imágenes
  {
    id: 11,
    name: "Sostenibileza Tee",
    price: 39.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lamata-FOLzmGGmjpgGK7mQ3kexacQsT4dgpe.png",
    category: "women",
  },
  {
    id: 12,
    name: "Romanticas Art Tee",
    price: 39.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laromanticas-72DDvrXN7VB3W9cMhPDfLrSPXP1W0l.png",
    category: "women",
  },
  {
    id: 13,
    name: "Mariposa Mini",
    price: 34.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lamariposa-11tv3w2YbEFxiWVMaOLQ5pfyXss2Ro.png",
    category: "women",
  },
  {
    id: 14,
    name: "Mariposa Grande",
    price: 34.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lamariposa2-hPvGwGXcUb1b2Or6lQ7z5xvxc8DIie.png",
    category: "women",
  },
  {
    id: 15,
    name: "Mariposa Back Print",
    price: 39.99,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mariposon-fXDYPmW7KvQnso3DHdP6qZNsP4tUaK.png",
    category: "men",
  },
  // Nuevos productos con URLs de Cloudinary
  {
    id: 16,
    name: "Abstract Art Tee",
    price: 39.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207237/elactracto2.png",
    category: "women",
  },
  {
    id: 17,
    name: "New York Edition",
    price: 44.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207237/elny.png",
    category: "women",
  },
  {
    id: 18,
    name: "The Eyes are the Window",
    price: 39.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744922048/ElOjo3.png",
    category: "women",
  },
  {
    id: 19,
    name: "El Fumador Black",
    price: 39.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207235/elfumador2.png",
    category: "men",
  },
  {
    id: 20,
    name: "Life is Like a Mirror",
    price: 39.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744922050/NegroSol.png",
    category: "men",
  },
  {
    id: 21,
    name: "LG Classic",
    price: 34.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207236/ellg.png",
    category: "limited",
  },
  {
    id: 22,
    name: "La Belleza",
    price: 44.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744210993/labelleza.png",
    category: "women",
  },
  {
    id: 23,
    name: "Mariposa Deluxe",
    price: 49.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744210993/lamariposa2.png",
    category: "women",
  },
  {
    id: 24,
    name: "DJ Llama Tee",
    price: 39.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744264807/djlama.png",
    category: "limited",
  },
  {
    id: 25,
    name: "La Palma",
    price: 39.99,
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492224/lapalma.png",
    category: "men",
  },
]

export default function Shop() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const [activeCategory, setActiveCategory] = useState("all")
  const { addItem } = useCart()

  const { t, language } = useLanguage()

  // Set active category based on URL parameter
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])

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

        {/* Secciones promocionales y adicionales según la categoría */}
        {activeCategory === "men" && (
          <>
            <MenPromoSection />
            <MenFeaturedCollections />
            <MenNewArrivals />
          </>
        )}

        {activeCategory === "women" && (
          <>
            <WomenPromoSection />
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

        {/* Mostrar las secciones de outfits según la categoría */}
        {activeCategory === "women" && <OutfitSuggestionsWomen />}
        {activeCategory === "men" && <OutfitSuggestionsMen />}
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
