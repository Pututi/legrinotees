"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { Star, Heart, Share2, Truck, RefreshCw } from "lucide-react"
import { formatPrice } from "@/lib/currency"

// Define product interface
interface Product {
  id: number
  name: string
  price: number
  description: string
  sizes: string[]
  colors: string[]
  colorImages: Record<string, string>
  images: string[]
  category: string
  rating: number
  reviews: number
}

// Mapeo de nombres de colores a valores CSS
const colorMap = {
  Black: "#000000",
  White: "#ffffff",
  Gray: "#808080",
  Navy: "#000080",
  Pink: "#FFC0CB",
  Green: "#008000",
  Cream: "#FFFDD0",
  Charcoal: "#36454F",
}

// Importar los productos desde el archivo de la página de tienda
const products = [
  {
    id: 1,
    name: "RnB Hamster",
    price: 29.99,
    description:
      "Our signature minimalist t-shirt in classic black. Made from 100% organic cotton for ultimate comfort and durability.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207240/master2.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207240/master2.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207241/master.png",
    ],
    category: "men",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Rabbit Yow",
    price: 29.99,
    description:
      "A clean, minimalist white t-shirt that pairs with everything. Crafted from premium cotton for everyday comfort.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    colorImages: {
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207241/rabbito.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207241/rabbito.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744309331/rabbito2.png",
    ],
    category: "men",
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 3,
    name: "Chicken Legs",
    price: 34.99,
    description: "A versatile gray t-shirt with a relaxed fit. Perfect for layering or wearing on its own.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black"],
    colorImages: {
      White: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492220/chickenleg3.png",
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492221/chickenleg2.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492221/chickenleg2.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492220/chickenleg3.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207231/Chickenleg.png",
    ],
    category: "men",
    rating: 4.6,
    reviews: 87,
  },
  {
    id: 4,
    name: "DJ Lama",
    price: 34.99,
    description:
      "A fun and stylish t-shirt featuring a llama DJ with headphones and a turntable. Perfect for music lovers and those with a playful sense of style.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744264807/djlama.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744264807/djlama.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207239/Djlama2.png",
    ],
    category: "men",
    rating: 4.9,
    reviews: 112,
  },
  {
    id: 5,
    name: "Bad Dog",
    price: 29.99,
    description: "A soft blush pink t-shirt with a feminine silhouette. Made from premium cotton for a luxurious feel.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black"],
    colorImages: {
      White: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744309704/eldoggy5.png",
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744477761/eldoggy3.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744309704/eldoggy5.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207233/eldoggy2.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744477761/eldoggy3.png",
    ],
    category: "women",
    rating: 4.8,
    reviews: 143,
  },
  {
    id: 6,
    name: "El Pez Tee",
    price: 34.99,
    description: "A calming sage green t-shirt with a relaxed fit. Perfect for creating effortless, stylish looks.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White"],
    colorImages: {
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492218/elpeznegro.png",
      White: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492219/elpez.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492218/elpeznegro.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492219/elpez.png",
    ],
    category: "women",
    rating: 4.7,
    reviews: 92,
  },
  {
    id: 7,
    name: "The Big Mouth",
    price: 29.99,
    description:
      "A versatile cream t-shirt that complements any outfit. Made from soft, breathable fabric for everyday wear.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207232/elbocudo.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207232/elbocudo.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207227/elbocudo2.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207227/elbocudo3.png",
    ],
    category: "women",
    rating: 4.6,
    reviews: 78,
  },
  {
    id: 8,
    name: "The Minimalist Cat",
    price: 34.99,
    description: "A sophisticated Minimalist t-shirt with a modern fit. Perfect for creating a sleek, minimalist look.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744315789/elgato.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744315789/elgato.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744315786/elgato2.png",
    ],
    category: "women",
    rating: 4.9,
    reviews: 105,
  },
  {
    id: 9,
    name: "La Hoja",
    price: 49.99,
    description: "A premium Beige t-shirt from our limited edition collection. Features unique design elements.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige"],
    colorImages: {
      Beige: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744318764/lahoja.png",
    },
    images: ["https://res.cloudinary.com/dnic69xtm/image/upload/v1744318764/lahoja.png"],
    category: "limited",
    rating: 5.0,
    reviews: 42,
  },
  {
    id: 10,
    name: "El Gato Tee",
    price: 49.99,
    description: "A premium white t-shirt from our limited edition collection. Features unique design elements.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744315789/elgato.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744315789/elgato.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744315786/elgato2.png",
    ],
    category: "limited",
    rating: 5.0,
    reviews: 38,
  },
  // Nuevos productos con URLs directas a las imágenes
  {
    id: 11,
    name: "Sostenibileza Tee",
    price: 39.99,
    description:
      "A beautiful eco-friendly t-shirt featuring a tree design that symbolizes sustainability and environmental consciousness.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lamata-FOLzmGGmjpgGK7mQ3kexacQsT4dgpe.png",
    
    },
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lamata-FOLzmGGmjpgGK7mQ3kexacQsT4dgpe.png"],
    category: "women",
  },
  {
    id: 12,
    name: "Romanticas Art Tee",
    price: 39.99,
    description:
      "An artistic t-shirt featuring a Japanese-inspired ink drawing of two characters. Perfect for anime and art lovers.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laromanticas-72DDvrXN7VB3W9cMhPDfLrSPXP1W0l.png",
    },
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laromanticas-72DDvrXN7VB3W9cMhPDfLrSPXP1W0l.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744309708/laromanticas2.png",

    ],
    category: "women",
    rating: 4.8,
    reviews: 47,
  },
  {
    id: 13,
    name: "Mariposa Mini",
    price: 34.99,
    description: "A minimalist white t-shirt with a small butterfly design. Subtle and elegant for everyday wear.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Cream"],
    colorImages: {
      White: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lamariposa-11tv3w2YbEFxiWVMaOLQ5pfyXss2Ro.png",

    },
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lamariposa-11tv3w2YbEFxiWVMaOLQ5pfyXss2Ro.png",
  

    ],
    category: "women",
    rating: 4.7,
    reviews: 39,
  },
  {
    id: 14,
    name: "Mariposa Grande",
    price: 34.99,
    description:
      "A statement white t-shirt with a large butterfly design. Bold and beautiful for those who want to stand out.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lamariposa2-hPvGwGXcUb1b2Or6lQ7z5xvxc8DIie.png",
    
    },
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lamariposa2-hPvGwGXcUb1b2Or6lQ7z5xvxc8DIie.png",
  
    ],
    category: "women",
    rating: 4.8,
    reviews: 42,
  },
  {
    id: 15,
    name: "Mariposa Back Print",
    price: 39.99,
    description:
      "A unique white t-shirt with a large butterfly design on the back. Perfect for making a statement as you walk away.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mariposon-fXDYPmW7KvQnso3DHdP6qZNsP4tUaK.png",
    },
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mariposon-fXDYPmW7KvQnso3DHdP6qZNsP4tUaK.png",


    ],
    category: "men",
    rating: 4.9,
    reviews: 28,
  },
  // Nuevos productos con URLs de Cloudinary
  {
    id: 16,
    name: "Abstract Art Tee",
    price: 39.99,
    description:
      "A striking black t-shirt featuring a colorful abstract design with orange and yellow elements. Perfect for art lovers and those who appreciate unique graphic tees.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207237/elactracto2.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207237/elactracto2.png",

    ],
    category: "women",
    rating: 4.9,
    reviews: 37,
  },
  {
    id: 17,
    name: "New York Edition",
    price: 44.99,
    description:
      "A premium t-shirt celebrating the iconic New York City. Features a stylish urban design that captures the essence of the Big Apple.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White"],
    colorImages: {
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207237/elny.png",
      White: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744309709/elny2.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207237/elny.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744309709/elny2.png",

    ],
    category: "women",
    rating: 4.8,
    reviews: 42,
  },
  {
    id: 18,
    name: "The Eyes are the Window",
    price: 39.99,
    description:
      "A unique artistic t-shirt featuring 'El Ojo' (The Eye) design. This conversation starter combines vintage aesthetics with modern style.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744922048/ElOjo3.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744922048/ElOjo3.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744922049/MujerNegraSol.png",
    ],
    category: "women",
    rating: 4.7,
    reviews: 31,
  },
  {
    id: 19,
    name: "El Fumador Black",
    price: 39.99,
    description:
      "The black version of our popular 'El Fumador' design. Features the same artistic smoking figure on a premium black cotton tee.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207235/elfumador2.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207235/elfumador2.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207239/elfumador.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207236/elfumador3.png",
    ],
    category: "men",
    rating: 4.8,
    reviews: 29,
  },
  {
    id: 20,
    name: "Life is Like a Mirror",
    price: 39.99,
    description:
      "The white version of our artistic 'El Fumador' design. A clean, minimalist take on our popular smoking figure graphic.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744922050/NegroSol.png",
    },
    images: ["https://res.cloudinary.com/dnic69xtm/image/upload/v1744922050/NegroSol.png"],
    category: "men",
    rating: 4.6,
    reviews: 33,
  },
  {
    id: 21,
    name: "LG Classic",
    price: 34.99,
    description: "A classic t-shirt with our iconic LG logo. Simple, stylish, and versatile for any occasion.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White"],
    colorImages: {
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207236/ellg.png",
     
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207236/ellg.png",
     ],
    category: "limited",
    rating: 4.7,
    reviews: 35,
  },
  {
    id: 22,
    name: "La Belleza",
    price: 44.99,
    description: "A beautiful artistic t-shirt featuring a stylized portrait of a woman. Elegant and eye-catching.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744210993/labelleza.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744210993/labelleza.png",

    ],
    category: "women",
    rating: 4.9,
    reviews: 41,
  },
  {
    id: 23,
    name: "Mariposa Deluxe",
    price: 49.99,
    description:
      "Our premium butterfly design t-shirt. Features an intricate butterfly pattern on high-quality fabric.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White"],
    colorImages: {
      White: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744210993/lamariposa2.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744210993/lamariposa2.png",

    ],
    category: "women",
    rating: 5.0,
    reviews: 27,
  },
  {
    id: 24,
    name: "DJ Llama Tee",
    price: 39.99,
    description:
      "A fun and stylish t-shirt featuring a llama DJ with headphones and a turntable. Perfect for music lovers and those with a playful sense of style.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744264807/djlama.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744264807/djlama.png",

    ],
    category: "limited",
    rating: 5.0,
    reviews: 18,
  },
  {
    id: 25,
    name: "La Palma",
    price: 39.99,
    description: "A  stylish t-shirt featuring with The Palm. Perfect for a sense of style.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black"],
    colorImages: {
      Black: "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492224/lapalma.png",
    },
    images: [
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492224/lapalma.png",
      "https://res.cloudinary.com/dnic69xtm/image/upload/v1744492222/lapalma2.png",
    ],
    category: "men",
    rating: 5.0,
    reviews: 18,
  },
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { t, language } = useLanguage()

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [productImages, setProductImages] = useState([])

  useEffect(() => {
    // Obtener el ID del producto de los parámetros de la URL
    const productId = Number.parseInt(params.id)

    // Buscar el producto en la lista de productos
    const foundProduct = products.find((p) => p.id === productId)

    if (foundProduct) {
      setProduct(foundProduct)
      // Establecer el primer color como predeterminado
      const defaultColor = foundProduct.colors[0]
      setSelectedColor(defaultColor)

      // Establecer las imágenes basadas en el color seleccionado
      if (foundProduct.colorImages && foundProduct.colorImages[defaultColor]) {
        // Si hay imágenes específicas para el color, usarlas
        setProductImages([foundProduct.colorImages[defaultColor], ...foundProduct.images.slice(1)])
      } else {
        // Si no, usar las imágenes predeterminadas
        setProductImages(foundProduct.images)
      }

      // Obtener productos relacionados de la misma categoría
      const related = products
        .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4)
      setRelatedProducts(related)
    } else {
      // Si no se encuentra el producto, redirigir a la página de tienda
      router.push("/shop")
    }
  }, [params.id, router])

  // Actualizar las imágenes cuando cambia el color seleccionado
  useEffect(() => {
    if (product && selectedColor) {
      if (product.colorImages && product.colorImages[selectedColor]) {
        // Si hay imágenes específicas para el color, usarlas
        setProductImages([product.colorImages[selectedColor], ...product.images.slice(1)])
        // Resetear la imagen seleccionada al cambiar de color
        setSelectedImage(0)
      }
    }
  }, [selectedColor, product])

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert(t("product.selectSizeAlert"))
      return
    }

    // Usar la imagen correspondiente al color seleccionado
    const imageToUse =
      product.colorImages && product.colorImages[selectedColor] ? product.colorImages[selectedColor] : product.images[0]

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageToUse,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    })
  }

  if (!product) {
    return (
      <div className="py-24 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
            <img
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square overflow-hidden rounded-md ${
                  selectedImage === index ? "ring-2 ring-black" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviews} {t("product.reviews")})
            </span>
          </div>
          <p className="text-2xl font-bold mb-6">{formatPrice(product.price, language)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">{t("product.color")}</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => {
                const bgColor = colorMap[color] || color.toLowerCase()

                return (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color ? "ring-2 ring-black ring-offset-2" : ""
                    } ${color === "White" || color === "Cream" ? "border-gray-300" : ""}`}
                    style={{ backgroundColor: bgColor }}
                    onClick={() => {
                      setSelectedColor(color)
                      console.log("Color seleccionado:", color)
                    }}
                    aria-label={color}
                  >
                    {selectedColor === color && (
                      <span
                        className={`flex items-center justify-center h-full ${
                          color === "White" || color === "Cream" ? "text-black" : "text-white"
                        }`}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {t("product.selected")}: {selectedColor}
            </p>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">{t("product.size")}</h3>
              <Link href="/size-guide" className="text-xs text-gray-600 underline">
                {t("product.sizeGuide")}
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`py-2 border rounded-md text-sm font-medium ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-900 border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-xs text-red-500 mt-1">{t("product.selectSize")}</p>}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">{t("product.quantity")}</h3>
            <div className="flex items-center border rounded-md w-32">
              <button
                className="w-10 h-10 flex items-center justify-center border-r"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                aria-label={t("product.decrease")}
              >
                -
              </button>
              <span className="flex-1 text-center">{quantity}</span>
              <button
                className="w-10 h-10 flex items-center justify-center border-l"
                onClick={() => setQuantity(quantity + 1)}
                aria-label={t("product.increase")}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button className="flex-1" onClick={handleAddToCart}>
              {t("product.addToCart")}
            </Button>
            <Button variant="outline" className="flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" />
              {t("product.wishlist")}
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
              <span className="sr-only">{t("product.share")}</span>
            </Button>
          </div>

          {/* Shipping Info */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="font-medium">{t("product.freeShipping")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="font-medium">{t("product.easyReturns")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full max-w-md mx-auto">
            <TabsTrigger value="description" className="flex-1">
              {t("product.description")}
            </TabsTrigger>
            <TabsTrigger value="details" className="flex-1">
              {t("product.details")}
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">
              {t("product.reviews_tab")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                Our t-shirts are designed with comfort and style in mind. Each piece is crafted from premium materials
                that are soft to the touch and built to last. The minimalist design ensures versatility, making it easy
                to pair with any outfit for any occasion.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-6">
            <div className="prose max-w-none">
              <ul>
                <li>100% organic cotton</li>
                <li>Medium weight fabric (180 gsm)</li>
                <li>Relaxed fit</li>
                <li>Pre-shrunk</li>
                <li>Machine wash cold, tumble dry low</li>
                <li>Made ethically in Portugal</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="prose max-w-none">
              <p>
                This product has received {product.reviews} reviews with an average rating of {product.rating} out of 5
                stars.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8">{t("product.youMayAlsoLike")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/shop/${relatedProduct.id}`}>
                <div className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-3">
                    <img
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium group-hover:underline">{relatedProduct.name}</h3>
                  <p className="text-gray-600">{formatPrice(relatedProduct.price, language)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
