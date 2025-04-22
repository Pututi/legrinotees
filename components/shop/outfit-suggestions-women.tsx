"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { Info } from "lucide-react"

export default function OutfitSuggestionsWomen() {
  const { language } = useLanguage()

  // Traducción del título y descripción según el idioma
  const title = language === "de" ? "Dein neuer Look" : "Tu Nuevo Look"
  const description =
    language === "de"
      ? "Wähle einen Artikel, den du gekauft hast, und entdecke Outfit-Vorschläge."
      : "Selecciona una prenda que hayas comprado y descubre sugerencias de outfits."

  return (
    <motion.div
      className="w-full mt-16 mb-12 bg-gray-50 p-6 md:p-8 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Info className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Outfit 1 */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744210993/labelleza.png"
                alt="Camiseta La Belleza"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744575738/Jeans_Azul_Claro.png"
                alt="Jeans azul claro"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744575739/Chaqueta_Azul.png"
                alt="Chaqueta denim"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744575736/zapatillas_Blancas2.png"
                alt="Zapatillas blancas"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-sm font-medium">Look casual con La Belleza Tee</p>
        </div>

        {/* Outfit 2 */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744210993/lamariposa2.png"
                alt="Camiseta Mariposa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744578579/FaldaNegra.png"
                alt="Falda negra"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744578577/BlaserBeige.png"
                alt="Blazer beige"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744578575/ZapatoTacones.png"
                alt="Zapatos de tacón"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-sm font-medium">Look elegante con Mariposa Tee</p>
        </div>

        {/* Outfit 3 */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744207237/elny.png"
                alt="Camiseta New York"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744492222/leggings-women.jpg"
                alt="Leggings negros"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744492222/cardigan-women.jpg"
                alt="Cardigan gris"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744492222/boots-women.jpg"
                alt="Botas negras"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-sm font-medium">Look urbano con NY Edition Tee</p>
        </div>
      </div>
    </motion.div>
  )
}
