"use client"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"

export default function MenFeaturedCollections() {
  const { language } = useLanguage()

  const collections = [
    {
      id: 1,
      name: language === "de" ? "Urbaner Minimalismus" : "Urban Minimalism",
      description:
        language === "de"
          ? "Unsere urbane Kollektion für den modernen Mann"
          : "Our urban collection for the modern man",
      image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207240/master2.png",
    },
    {
      id: 2,
      name: language === "de" ? "Kunst & Ausdruck" : "Art & Expression",
      description:
        language === "de"
          ? "Ausdrucksstarke Designs für einzigartige Persönlichkeiten"
          : "Expressive designs for unique personalities",
      image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207239/elfumador.png",
    },
    {
      id: 3,
      name: language === "de" ? "Essenzielle Basics" : "Essential Basics",
      description: language === "de" ? "Zeitlose Klassiker für jeden Tag" : "Timeless classics for everyday wear",
      image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492224/lapalma.png",
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
          {language === "de" ? "Herren Kollektionen" : "Men's Collections"}
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
