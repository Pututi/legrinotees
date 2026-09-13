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

// Catálogo 2026: diseños propios, alojados en /public en vez de Cloudinary
const products = [
  {
    id: 1,
    name: "Pray More Worry Less",
    price: 34.99,
    image: "/images/products/pray-more-worry-less-flat.png",
    category: "women",
  },
  {
    id: 2,
    name: "Chosen Loved Redeemed",
    price: 34.99,
    image: "/images/products/chosen-loved-redeemed.png",
    category: "women",
  },
  {
    id: 3,
    name: "Strength and Dignity",
    price: 34.99,
    image: "/images/products/strength-and-dignity.png",
    category: "women",
  },
  {
    id: 4,
    name: "Wildflower Warrior",
    price: 32.99,
    image: "/images/products/wildflower-warrior.png",
    category: "women",
  },
  {
    id: 5,
    name: "I Came I Saw I Went Home",
    price: 32.99,
    image: "/images/products/moth-i-came-i-saw.png",
    category: "women",
  },
  {
    id: 6,
    name: "Beach Please",
    price: 29.99,
    image: "/images/products/beach-please.png",
    category: "women",
  },
  {
    id: 7,
    name: "Happily Unavailable",
    price: 29.99,
    image: "/images/products/happily-unavailable.png",
    category: "women",
  },
  {
    id: 8,
    name: "World in His Hands",
    price: 34.99,
    image: "/images/products/world-in-his-hands.png",
    category: "limited",
  },
  {
    id: 9,
    name: "Read Dream Bloom",
    price: 32.99,
    image: "/images/products/read-dream-bloom.png",
    category: "women",
  },
  {
    id: 10,
    name: "Born With Rhythm",
    price: 34.99,
    image: "/images/products/born-with-rhythm-sun.png",
    category: "limited",
  },
  {
    id: 11,
    name: "Solitude is my Superpower",
    price: 32.99,
    image: "/images/products/solitude-superpower.png",
    category: "women",
  },
  {
    id: 12,
    name: "Alone in Space",
    price: 32.99,
    image: "/images/products/alone-in-space.png",
    category: "limited",
  },
  {
    id: 13,
    name: "Moon Dancer",
    price: 34.99,
    image: "/images/products/moon-dancer.png",
    category: "women",
  },
  {
    id: 14,
    name: "Busy Do Not Disturb",
    price: 29.99,
    image: "/images/products/busy-do-not-disturb.png",
    category: "women",
  },
  {
    id: 15,
    name: "Bold Soul",
    price: 34.99,
    image: "/images/products/bold-soul.png",
    category: "men",
  },
  {
    id: 16,
    name: "Dream Loud",
    price: 34.99,
    image: "/images/products/dream-loud.png",
    category: "men",
  },
  {
    id: 17,
    name: "Inner Force",
    price: 34.99,
    image: "/images/products/inner-force.png",
    category: "men",
  },
  {
    id: 18,
    name: "No Limits",
    price: 34.99,
    image: "/images/products/no-limits.png",
    category: "men",
  },
  {
    id: 19,
    name: "Silent Power",
    price: 34.99,
    image: "/images/products/silent-power.png",
    category: "limited",
  },
  {
    id: 20,
    name: "Rhythm",
    price: 34.99,
    image: "/images/products/rhythm.png",
    category: "men",
  },
  {
    id: 21,
    name: "Mix Tape",
    price: 34.99,
    image: "/images/products/mix-tape-black.png",
    category: "men",
  },
  {
    id: 22,
    name: "Protect Your Peace",
    price: 32.99,
    image: "/images/products/protect-your-peace-1.png",
    category: "men",
  },
  {
    id: 23,
    name: "Gorilla Ballerina",
    price: 32.99,
    image: "/images/products/gorilla-ballerina-white.png",
    category: "men",
  },
  {
    id: 24,
    name: "Tokyo Land of the Rhythm",
    price: 34.99,
    image: "/images/products/tokyo-rhythm-1.png",
    category: "men",
  },
  {
    id: 25,
    name: "Rhythm Squad",
    price: 29.99,
    image: "/images/products/rhythm-squad-1.png",
    category: "men",
  },
  {
    id: 26,
    name: "I Am Watching You Dance",
    price: 32.99,
    image: "/images/products/watching-you-dance-1.png",
    category: "men",
  },
  {
    id: 27,
    name: "Life's Better by the Sea",
    price: 29.99,
    image: "/images/products/better-by-the-sea-1.png",
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
