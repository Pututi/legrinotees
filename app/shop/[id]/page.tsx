"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { Star, Heart, Share2, Truck, RefreshCw, ZoomIn, X } from "lucide-react"
import { formatPrice } from "@/lib/currency"
import { products, colorMap } from "@/lib/products"

// Define product interface
interface Product {
  id: number
  name: string
  price: number
  description: string
  sizes: string[]
  colors: string[]
  colorImages: Record<string, string>
  image: string
  images: string[]
  category: string
  gender: string
  rating: number
  reviews: number
}


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
  const [isZoomed, setIsZoomed] = useState(false)

  // Cerrar la vista ampliada con la tecla Escape
  useEffect(() => {
    if (!isZoomed) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsZoomed(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isZoomed])

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
      // Si solo hay una talla disponible (p. ej. One Size), preseleccionarla
      setSelectedSize(foundProduct.sizes.length === 1 ? foundProduct.sizes[0] : "")

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
    <div className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {/* Product Images */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button
            type="button"
            className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-5 w-full cursor-zoom-in group"
            onClick={() => setIsZoomed(true)}
            aria-label="Bild vergrößern"
          >
            <img
              src={productImages[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4 text-black" />
            </span>
          </button>
          <div className="flex gap-3">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden bg-gray-50 transition-opacity ${
                  selectedImage === index ? "ring-1 ring-black" : "opacity-50 hover:opacity-100"
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
          className="md:pt-2"
        >
          <h1 className="text-2xl md:text-3xl font-normal mb-2">{product.name}</h1>
          <p className="text-xl font-normal mb-4">{formatPrice(product.price, language)}</p>
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-gray-900 fill-gray-900" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-500">
              {product.rating} ({product.reviews} {t("product.reviews")})
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-10">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">{t("product.color")}</h3>
            <div className="flex space-x-3">
              {product.colors.map((color) => {
                const bgColor = colorMap[color] || color.toLowerCase()

                return (
                  <button
                    key={color}
                    className={`w-7 h-7 rounded-full border border-gray-300 transition-shadow ${
                      selectedColor === color ? "ring-1 ring-black ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: bgColor }}
                    onClick={() => {
                      setSelectedColor(color)
                    }}
                    aria-label={color}
                  >
                    {selectedColor === color && (
                      <span
                        className={`flex items-center justify-center h-full text-xs ${
                          color === "White" || color === "Cream" || color === "Natural" ? "text-black" : "text-white"
                        }`}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {t("product.selected")}: {selectedColor}
            </p>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs uppercase tracking-wider text-gray-500">{t("product.size")}</h3>
              <Link href="/size-guide" className="text-xs text-gray-500 underline underline-offset-2">
                {t("product.sizeGuide")}
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`py-2.5 border text-sm font-normal transition-colors ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-900 border-gray-300 hover:border-black"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-xs text-red-500 mt-2">{t("product.selectSize")}</p>}
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">{t("product.quantity")}</h3>
            <div className="flex items-center border border-gray-300 w-28">
              <button
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                aria-label={t("product.decrease")}
              >
                -
              </button>
              <span className="flex-1 text-center text-sm">{quantity}</span>
              <button
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                onClick={() => setQuantity(quantity + 1)}
                aria-label={t("product.increase")}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mb-10">
            <Button className="w-full h-12 rounded-none text-sm tracking-wide" onClick={handleAddToCart}>
              {t("product.addToCart")}
            </Button>
            <div className="flex items-center gap-6 mt-4">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
                <Heart className="w-4 h-4" />
                {t("product.wishlist")}
              </button>
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors">
                <Share2 className="w-4 h-4" />
                {t("product.share")}
              </button>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-gray-200 pt-6 space-y-3">
            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-600">{t("product.freeShipping")}</p>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="w-4 h-4 text-gray-400 mt-0.5" />
              <p className="text-sm text-gray-600">{t("product.easyReturns")}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Tabs */}
      <div className="mt-20 max-w-3xl">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start gap-8 bg-transparent p-0 h-auto border-b border-gray-200 rounded-none">
            <TabsTrigger
              value="description"
              className="rounded-none px-0 pb-3 text-xs uppercase tracking-wider font-normal text-gray-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b data-[state=active]:border-black"
            >
              {t("product.description")}
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="rounded-none px-0 pb-3 text-xs uppercase tracking-wider font-normal text-gray-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b data-[state=active]:border-black"
            >
              {t("product.details")}
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none px-0 pb-3 text-xs uppercase tracking-wider font-normal text-gray-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:border-b data-[state=active]:border-black"
            >
              {t("product.reviews_tab")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="text-sm text-gray-600 leading-relaxed space-y-4">
              <p>{product.description}</p>
              <p>
                Unsere T-Shirts sind auf Komfort und Stil ausgelegt. Jedes Teil wird aus hochwertigen Materialien
                gefertigt, die sich weich anfühlen und langlebig sind. Das minimalistische Design sorgt für
                Vielseitigkeit und lässt sich leicht mit jedem Outfit kombinieren.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-6">
            <ul className="text-sm text-gray-600 leading-relaxed space-y-1.5">
              <li>100% Bio-Baumwolle</li>
              <li>Mittelschwerer Stoff (180 g/m²)</li>
              <li>{product.description.toLowerCase().includes("fitted") ? "Eng anliegender Schnitt" : "Oversize-Schnitt"}</li>
              <li>Vorgewaschen (verhindert Einlaufen)</li>
              <li>Maschinenwäsche kalt, Trockner niedrige Stufe</li>
              <li>Ethisch gefertigt in Portugal</li>
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.reviews > 0
                ? `Dieses Produkt hat ${product.reviews} Bewertungen mit einer durchschnittlichen Bewertung von ${product.rating} von 5 Sternen.`
                : "Für dieses Produkt liegen noch keine Bewertungen vor."}
            </p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-lg font-normal mb-8">{t("product.youMayAlsoLike")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/shop/${relatedProduct.id}`}>
                <div className="group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-3">
                    <img
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm font-normal group-hover:underline">{relatedProduct.name}</h3>
                  <p className="text-sm text-gray-500">{formatPrice(relatedProduct.price, language)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Zoomed image lightbox */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsZoomed(false)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={() => setIsZoomed(false)}
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              className="relative w-full max-w-lg h-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 32%" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
