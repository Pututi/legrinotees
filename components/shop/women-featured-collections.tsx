"use client"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"

export default function WomenFeaturedCollections() {
  const { language } = useLanguage()

  const collections = [
    {
      id: 1,
      name: language === "de" ? "Minimalistische Eleganz" : "Minimalist Elegance",
      description:
        language === "de"
          ? "Elegante, minimalistische Designs für die moderne Frau"
          : "Elegant, minimalist designs for the modern woman",
      image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744210993/labelleza.png",
    },
    {
      id: 2,
      name: language === "de" ? "Künstlerische Ausdrücke" : "Artistic Expressions",
      description:
        language === "de"
          ? "Einzigartige künstlerische Designs für kreative Geister"
          : "Unique artistic designs for creative spirits",
      image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744922048/ElOjo3.png",
    },
    {
      id: 3,
      name: language === "de" ? "Urbane Kollektion" : "Urban Collection",
      description: language === "de" ? "Urbane Styles für das Stadtleben" : "Urban styles for city living",
      image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207237/elny.png",
    },
  ]

  return (
    <div className="w-full my-16">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {language === "de" ? "Damen Kollektionen" : "Women's Collections"}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="group relative overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{collection.name}</h3>
                <p className="text-white/80 max-w-xs">{collection.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
