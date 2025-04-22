"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { Info } from "lucide-react"

export default function OutfitSuggestionsMen() {
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
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744207240/master2.png"
                alt="RnB Hamster Tee"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744644007/JeansNegros.png"
                alt="Jeans negro"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744644007/BomberjackeBeige.png"
                alt="Bombajacket Beige"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744644008/ZapatillasNegras.png"
                alt="Zapatillas negras"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-sm font-medium">Look urbano con RnB Hamster Tee</p>
        </div>

        {/* Outfit 2 */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744207236/elfumador3.png"
                alt="El Fumador Tee"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744664240/PantalonesChinos.png"
                alt="Pantalones chinos"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744664237/CamisaAbierta.png"
                alt="Camisa abierta"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744664236/BotasMarrones.png"
                alt="Botas marrones"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-sm font-medium">Look casual con El Fumador Tee</p>
        </div>

        {/* Outfit 3 */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744264807/djlama.png"
                alt="DJ Lama Tee"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744492222/joggers-men.jpg"
                alt="Joggers negros"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744492222/hoodie-men.jpg"
                alt="Sudadera con capucha"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square bg-white rounded-md overflow-hidden border border-gray-100">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744492222/sneakers2-men.jpg"
                alt="Zapatillas deportivas"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-sm font-medium">Look deportivo con DJ Lama Tee</p>
        </div>
      </div>
    </motion.div>
  )
}
