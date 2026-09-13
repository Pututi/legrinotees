"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { useCart } from "@/context/cart-context"
import { formatPrice } from "@/lib/currency"
import { products } from "@/lib/products"

const accessories = {
  women: {
    bottoms: [
      { id: "jeans", name: "Jeans azul claro", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744575738/Jeans_Azul_Claro.png" },
      { id: "skirt", name: "Falda negra", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744578579/FaldaNegra.png" },
      { id: "leggings", name: "Leggings negros", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744581631/LeggingsNegros.png" },
    ],
    outerwear: [
      { id: "denim-jacket", name: "Chaqueta denim", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744575739/Chaqueta_Azul.png" },
      { id: "blazer", name: "Blazer beige", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744578577/BlaserBeige.png" },
      { id: "cardigan", name: "Cardigan gris", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744581624/Cardigangris.png" },
    ],
    shoes: [
      { id: "sneakers", name: "Zapatillas blancas", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744575736/zapatillas_Blancas2.png" },
      { id: "heels", name: "Zapatos de tacón", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744578575/ZapatoTacones.png" },
      { id: "boots", name: "Botas negras", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744581622/BotasNegras.png" },
    ],
  },
  men: {
    bottoms: [
      { id: "black-jeans", name: "Jeans negro", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744644007/JeansNegros.png" },
      { id: "chinos", name: "Pantalones chinos", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744664240/PantalonesChinos.png" },
      { id: "joggers", name: "Joggers negros", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744816448/JoggersNegros.png" },
    ],
    outerwear: [
      { id: "bomber", name: "Chaqueta bomber", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744644007/BomberjackeBeige.png" },
      { id: "open-shirt", name: "Camisa abierta", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744664237/CamisaAbierta.png" },
      { id: "hoodie", name: "Sudadera con capucha", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744816447/CamisaHombre.png" },
    ],
    shoes: [
      { id: "black-sneakers", name: "Zapatillas negras", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744644008/ZapatillasNegras.png" },
      { id: "brown-boots", name: "Botas marrones", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744664236/BotasMarrones.png" },
      { id: "sport-sneakers", name: "Zapatillas deportivas", image: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744816446/ZapatillasOliva.png" },
    ],
  },
}

function Tile({ image, label, selected, onClick, size = "md" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex-shrink-0 overflow-hidden rounded-md border-2 bg-white transition-colors ${
        size === "md" ? "w-20 h-20" : "w-full aspect-[3/4]"
      } ${selected ? "border-black" : "border-gray-200 hover:border-gray-400"}`}
      title={label}
    >
      <img src={image || "/placeholder.svg"} alt={label} className="w-full h-full object-contain p-1" />
    </button>
  )
}

export default function OutfitBuilder({ category }: { category: "men" | "women" }) {
  const { language } = useLanguage()
  const { addItem } = useCart()

  const shirts = products.filter((p) => p.gender === category || p.gender === "unisex")
  const opts = accessories[category]

  const [shirt, setShirt] = useState(shirts[0])
  const [bottom, setBottom] = useState(opts.bottoms[0])
  const [outer, setOuter] = useState(opts.outerwear[0])
  const [shoes, setShoes] = useState(opts.shoes[0])
  const [added, setAdded] = useState(false)

  const title = language === "de" ? "Baue dein Outfit" : "Arma tu Outfit"
  const subtitle =
    language === "de"
      ? "Wähle eine unserer T-Shirts und kombiniere sie zu deinem eigenen Stil."
      : "Elige una de nuestras camisetas y combínala a tu propio estilo."
  const shirtLabel = language === "de" ? "T-Shirt" : "Camiseta"
  const bottomLabel = language === "de" ? "Unterteil" : "Parte de abajo"
  const outerLabel = language === "de" ? "Jacke / Oberteil" : "Abrigo"
  const shoesLabel = language === "de" ? "Schuhe" : "Calzado"
  const addToCartLabel = language === "de" ? "Zum Warenkorb hinzufügen" : "Añadir al carrito"
  const addedLabel = language === "de" ? "Hinzugefügt ✓" : "Añadido ✓"
  const viewShirtLabel = language === "de" ? "T-Shirt ansehen" : "Ver camiseta"
  const disclaimer =
    language === "de"
      ? "* Nur das T-Shirt ist käuflich. Die restlichen Teile sind Stil-Inspiration."
      : "* Solo la camiseta está disponible para comprar — el resto es inspiración de estilo."

  const handleAddToCart = () => {
    addItem({
      id: shirt.id,
      name: shirt.name,
      price: shirt.price,
      image: shirt.image,
      size: "M",
      quantity: 1,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      className="w-full min-w-0 mt-16 mb-12 bg-gray-50 p-6 md:p-8 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-black flex-shrink-0 mt-1" />
        <div>
          <h2 className="text-2xl font-bold mb-1">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 min-w-0">
        {/* Live preview */}
        <div className="grid grid-cols-2 gap-3 bg-white rounded-lg p-4 min-w-0 max-w-sm mx-auto md:max-w-none md:mx-0">
          <Tile image={shirt.image} label={shirt.name} selected size="lg" onClick={() => {}} />
          <Tile image={bottom.image} label={bottom.name} selected size="lg" onClick={() => {}} />
          <Tile image={outer.image} label={outer.name} selected size="lg" onClick={() => {}} />
          <Tile image={shoes.image} label={shoes.name} selected size="lg" onClick={() => {}} />
        </div>

        {/* Pickers */}
        <div className="space-y-6 min-w-0">
          <div>
            <p className="font-medium mb-2">
              {shirtLabel} — <span className="text-gray-500 font-normal">{shirt.name}</span>
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {shirts.map((s) => (
                <Tile key={s.id} image={s.image} label={s.name} selected={shirt.id === s.id} onClick={() => setShirt(s)} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">
              {bottomLabel} — <span className="text-gray-500 font-normal">{bottom.name}</span>
            </p>
            <div className="flex gap-2">
              {opts.bottoms.map((b) => (
                <Tile key={b.id} image={b.image} label={b.name} selected={bottom.id === b.id} onClick={() => setBottom(b)} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">
              {outerLabel} — <span className="text-gray-500 font-normal">{outer.name}</span>
            </p>
            <div className="flex gap-2">
              {opts.outerwear.map((o) => (
                <Tile key={o.id} image={o.image} label={o.name} selected={outer.id === o.id} onClick={() => setOuter(o)} />
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">
              {shoesLabel} — <span className="text-gray-500 font-normal">{shoes.name}</span>
            </p>
            <div className="flex gap-2">
              {opts.shoes.map((sh) => (
                <Tile key={sh.id} image={sh.image} label={sh.name} selected={shoes.id === sh.id} onClick={() => setShoes(sh)} />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button onClick={handleAddToCart} className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              {added ? addedLabel : `${addToCartLabel} — ${formatPrice(shirt.price, language)}`}
            </Button>
            <Link href={`/shop/${shirt.id}`}>
              <Button variant="outline">{viewShirtLabel}</Button>
            </Link>
          </div>
          <p className="text-xs text-gray-400">{disclaimer}</p>
        </div>
      </div>
    </motion.div>
  )
}
