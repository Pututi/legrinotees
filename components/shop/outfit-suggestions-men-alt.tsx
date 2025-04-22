"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { Info, Eye } from "lucide-react"
import OutfitModal from "./outfit-modal"

// Datos de los outfits completos con mejores imágenes
const outfitsData = [
  {
    id: "urban",
    title: "Look urbano con RnB Hamster Tee",
    description:
      "Un look urbano y moderno, combinando la camiseta RnB Hamster con jeans negros, una chaqueta negra y zapatillas negras. Perfecto para un estilo contemporáneo con actitud.",
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744645747/NegroElegantes.png",
  },
  {
    id: "casual",
    title: "Look casual con El Fumador Tee",
    description:
      "Un look casual perfecto para el día a día, combinando la camiseta El Fumador con pantalones chinos, una camisa abierta y botas marrones. Ideal para un estilo relajado pero con personalidad.",
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744664239/CamisaDenimCasua.png",
  },
  {
    id: "sport",
    title: "Look deportivo con DJ Lama Tee",
    description:
      "Un look deportivo y cómodo, combinando la camiseta DJ Lama con joggers negros, una sudadera con capucha y zapatillas deportivas. Perfecto para un estilo activo y dinámico.",
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744816446/Combinacio%CC%81nModa.png",
  },
]

export default function OutfitSuggestionsMenAlt() {
  const { language } = useLanguage()
  const [selectedOutfit, setSelectedOutfit] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Traducción del título y descripción según el idioma
  const title = language === "de" ? "Dein neuer Look" : "Tu Nuevo Look"
  const description =
    language === "de"
      ? "Wähle einen Artikel, den du gekauft hast, und entdecke Outfit-Vorschläge."
      : "Selecciona una prenda que hayas comprado y descubre sugerencias de outfits."

  const openOutfitModal = (outfitId) => {
    const outfit = outfitsData.find((o) => o.id === outfitId)
    if (outfit) {
      setSelectedOutfit(outfit)
      setIsModalOpen(true)
    }
  }

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Outfit 1 */}
        <div
          className="cursor-pointer transition-all hover:shadow-lg rounded-lg overflow-hidden group"
          onClick={() => openOutfitModal("urban")}
        >
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
            {/* Primera fila */}
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744207240/master2.png"
                alt="RnB Hamster Tee"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744644007/JeansNegros.png"
                alt="Jeans negro"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Jeans negro</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            {/* Segunda fila */}
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744644007/BomberjackeBeige.png"
                alt="BombaJacke Beige"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Chaqueta negra</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744644008/ZapatillasNegras.png"
                alt="Zapatillas negras"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Zapatillas negras</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
          </div>
          <div className="p-4 bg-white border-t">
            <p className="font-medium">Look urbano con RnB Hamster Tee</p>
            <div className="flex items-center text-blue-600 mt-2 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              <span>Ver look completo</span>
            </div>
          </div>
        </div>

        {/* Outfit 2 */}
        <div
          className="cursor-pointer transition-all hover:shadow-lg rounded-lg overflow-hidden group"
          onClick={() => openOutfitModal("casual")}
        >
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
            {/* Primera fila */}
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744207236/elfumador3.png"
                alt="El Fumador Tee"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744664240/PantalonesChinos.png"
                alt="Pantalones chinos"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Pantalones chinos</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            {/* Segunda fila */}
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744664237/CamisaAbierta.png"
                alt="Camisa abierta"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Camisa abierta</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744664236/BotasMarrones.png"
                alt="Botas marrones"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Botas marrones</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
          </div>
          <div className="p-4 bg-white border-t">
            <p className="font-medium">Look casual con El Fumador Tee</p>
            <div className="flex items-center text-blue-600 mt-2 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              <span>Ver look completo</span>
            </div>
          </div>
        </div>

        {/* Outfit 3 */}
        <div
          className="cursor-pointer transition-all hover:shadow-lg rounded-lg overflow-hidden group"
          onClick={() => openOutfitModal("sport")}
        >
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
            {/* Primera fila */}
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744264807/djlama.png"
                alt="DJ Lama Tee"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744816448/JoggersNegros.png"
                alt="Joggers negros"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Joggers negros</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            {/* Segunda fila */}
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744816447/CamisaHombre.png"
                alt="Camisa Hombre"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Sudadera con capucha</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744816446/ZapatillasOliva.png"
                alt="Zapatillas deportivas"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Zapatillas deportivas</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
          </div>
          <div className="p-4 bg-white border-t">
            <p className="font-medium">Look deportivo con DJ Lama Tee</p>
            <div className="flex items-center text-blue-600 mt-2 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              <span>Ver look completo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para mostrar el outfit completo */}
      {selectedOutfit && (
        <OutfitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} outfit={selectedOutfit} />
      )}
    </motion.div>
  )
}
