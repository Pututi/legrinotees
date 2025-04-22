"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import { Info, Eye } from "lucide-react"
import OutfitModal from "./outfit-modal"

// Datos de los outfits completos con mejores imágenes
const outfitsData = [
  {
    id: "casual",
    title: "Look casual con La Belleza Tee",
    description:
      "Un look casual perfecto para el día a día, combinando la camiseta La Belleza con jeans azul claro, una chaqueta denim y zapatillas blancas. Ideal para paseos por la ciudad o encuentros informales con amigos.",
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744582051/CalzadosCombinacio%CC%81nPerfecta.png",
  },
  {
    id: "elegant",
    title: "Look elegante con Mariposa Tee",
    description:
      "Un look elegante para ocasiones especiales, combinando la camiseta Mariposa con una falda negra, un blazer beige y zapatos de tacón. Perfecto para eventos semi-formales o cenas elegantes.",
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744581624/Chaqueta_Beige_Elegante.png",
  },
  {
    id: "urban",
    title: "Look urbano con NY Edition Tee",
    description:
      "Un look urbano y moderno, combinando la camiseta NY Edition con leggings negros, un cardigan gris y botas negras. Ideal para un estilo contemporáneo con un toque de sofisticación.",
    image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744581625/Combinacion1.png",
  },
]

export default function OutfitSuggestionsWomenAlt() {
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
          onClick={() => openOutfitModal("casual")}
        >
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
            {/* Primera fila */}
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744210993/labelleza.png"
                alt="Camiseta La Belleza"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744575738/Jeans_Azul_Claro.png"
                alt="Jeans azul claro"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Jeans azul claro</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            {/* Segunda fila */}
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744575739/Chaqueta_Azul.png"
                alt="Chaqueta denim"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Chaqueta denim</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744575736/zapatillas_Blancas2.png"
                alt="Zapatillas blancas"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Zapatillas blancas</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
          </div>
          <div className="p-4 bg-white border-t">
            <p className="font-medium">Look casual con La Belleza Tee</p>
            <div className="flex items-center text-blue-600 mt-2 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              <span>Ver look completo</span>
            </div>
          </div>
        </div>

        {/* Outfit 2 */}
        <div
          className="cursor-pointer transition-all hover:shadow-lg rounded-lg overflow-hidden group"
          onClick={() => openOutfitModal("elegant")}
        >
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
            {/* Primera fila */}
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744210993/lamariposa2.png"
                alt="Camiseta Mariposa"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744578579/FaldaNegra.png"
                alt="Falda negra"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Falda negra</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            {/* Segunda fila */}
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744578577/BlaserBeige.png"
                alt="Blazer beige"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Blazer beige</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744578575/ZapatoTacones.png"
                alt="Zapatos de tacón"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Zapatos de tacón</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
          </div>
          <div className="p-4 bg-white border-t">
            <p className="font-medium">Look elegante con Mariposa Tee</p>
            <div className="flex items-center text-blue-600 mt-2 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              <span>Ver look completo</span>
            </div>
          </div>
        </div>

        {/* Outfit 3 */}
        <div
          className="cursor-pointer transition-all hover:shadow-lg rounded-lg overflow-hidden group"
          onClick={() => openOutfitModal("urban")}
        >
          <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded-lg">
            {/* Primera fila */}
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744207237/elny.png"
                alt="Camiseta New York"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744581631/LeggingsNegros.png"
                alt="Leggings negros"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Leggings negros</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            {/* Segunda fila */}
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744581624/Cardigangris.png"
                alt="Cardigan gris"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Cardigan gris</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
            <div className="aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-100 relative">
              <img
                src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744581622/BotasNegras.png"
                alt="Botas negras"
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center">
                <span className="text-sm">Botas negras</span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
            </div>
          </div>
          <div className="p-4 bg-white border-t">
            <p className="font-medium">Look urbano con NY Edition Tee</p>
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
