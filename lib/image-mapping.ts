// Nombre de tu cuenta de Cloudinary
const CLOUDINARY_CLOUD_NAME = "dnic69xtm"

// Mapeo de rutas locales a URLs de Cloudinary
const imageMapping: Record<string, string> = {
  // Imágenes principales que sabemos que funcionan
  "/images/BlackWhite.jpg": "https://res.cloudinary.com/dnic69xtm/image/upload/v1744210953/BlackWhite.png",
  "/images/elbocosa.jpg": "https://res.cloudinary.com/dnic69xtm/image/upload/v1744210956/elbocosa.jpg",
  "/images/amorosos.jpg": "https://res.cloudinary.com/dnic69xtm/image/upload/v1744210953/amorosos.jpg",

  // Nuevas imágenes de productos
  "/images/products/elactracto2.png": "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207237/elactracto2.png",
  "/images/products/elny.png": "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207237/elny.png",
  "/images/products/elfumador.png": "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207239/elfumador.png",
  "/images/products/elfumador2.png": "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207235/elfumador2.png",
  "/images/products/elfumador3.png": "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207236/elfumador3.png",
  "/images/products/ellg.png": "https://res.cloudinary.com/dnic69xtm/image/upload/v1744207236/ellg.png",
  "/images/products/labelleza.png": "https://res.cloudinary.com/dnic69xtm/image/upload/v1744210993/labelleza.png",
  "/images/products/lamariposa2.png": "https://res.cloudinary.com/dnic69xtm/image/upload/v1744210993/lamariposa2.png",

  // Productos existentes
  "/images/products/black-tee.jpg": "/images/products/black-tee.jpg", // Usar rutas locales por ahora
  "/images/products/white-tee.jpg": "/images/products/white-tee.jpg",
  "/images/products/gray-tee.jpg": "/images/products/gray-tee.jpg",
  "/images/products/navy-tee.jpg": "/images/products/navy-tee.jpg",
  "/images/products/pink-tee.jpg": "/images/products/pink-tee.jpg",
  "/images/products/green-tee.jpg": "/images/products/green-tee.jpg",
  "/images/products/sostenibileza-tee.png": "/images/products/sostenibileza-tee.png",
  "/images/products/romanticas-tee.png": "/images/products/romanticas-tee.png",
  "/images/products/mariposa-tee.png": "/images/products/mariposa-tee.png",
  "/images/products/mariposa-tee-2.png": "/images/products/mariposa-tee-2.png",
  "/images/products/mariposa-back-tee.png": "/images/products/mariposa-back-tee.png",

  // Otras imágenes de la página principal
  "/images/elbarbudo.jpg": "/images/elbarbudo.jpg",
  "/images/elbarbudo2.jpg": "/images/elbarbudo2.jpg",
  "/images/laamarilla.jpg": "/images/laamarilla.jpg",
}

/**
 * Convierte una ruta de imagen local a una URL de Cloudinary
 * @param src Ruta local de la imagen
 * @returns URL de Cloudinary o la ruta original si no hay mapeo
 */
export function getCloudinaryUrl(src: string): string {
  try {
    // Si ya es una URL de Cloudinary, devuélvela tal cual
    if (src.includes("cloudinary.com")) {
      return src
    }

    // Si existe en el mapeo, devuelve la URL mapeada
    if (src in imageMapping) {
      // Si la URL mapeada ya es una URL completa, devuélvela tal cual
      if (imageMapping[src].startsWith("http")) {
        return imageMapping[src]
      }

      // Si no, devuelve la ruta original
      return imageMapping[src]
    }

    // Si no existe en el mapeo, devuelve la ruta original
    return src
  } catch (error) {
    console.error("Error al convertir URL de Cloudinary:", error)
    return src // En caso de error, devuelve la ruta original
  }
}
