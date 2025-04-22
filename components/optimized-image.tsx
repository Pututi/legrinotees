"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  quality?: number
  style?: React.CSSProperties
}

export default function OptimizedImage(props: OptimizedImageProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  // Extraer props individualmente sin desestructuración
  const src = props.src
  const alt = props.alt
  const width = props.width
  const height = props.height
  const className = props.className || ""
  const fill = props.fill || false
  const sizes = props.sizes
  const priority = props.priority || false
  const style = props.style || {}

  // Función simple para obtener URL de Cloudinary
  function getImageUrl(path: string): string {
    // Si ya es una URL completa, devolverla tal cual
    if (path.startsWith("http")) {
      return path
    }

    // De lo contrario, devolver la ruta original
    return path
  }

  // Obtener la URL final de la imagen
  const imageUrl = getImageUrl(src)

  // Crear un objeto con todas las props para Image excepto src y alt
  const imageProps: any = {
    width: fill ? undefined : width,
    height: fill ? undefined : height,
    className: `${className} ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`,
    sizes: sizes,
    priority: priority,
    style: {
      ...style,
      ...(fill ? { objectFit: "cover", width: "100%", height: "100%" } : {}),
    },
    onLoadingComplete: () => setLoading(false),
    onError: () => {
      console.log(`Error loading image: ${src}`)
      setError(true)
      setLoading(false)
    },
  }

  return (
    <div className={`relative ${fill ? "w-full h-full" : ""}`} style={fill ? { position: "relative" } : {}}>
      {loading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={
            !fill
              ? { width: width || "100%", height: height || "100%" }
              : { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }
          }
        />
      )}
      {error ? (
        // Mostrar un placeholder si hay error
        <div
          className="flex items-center justify-center bg-gray-200 text-gray-500"
          style={
            !fill
              ? { width: width || 300, height: height || 200 }
              : { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }
          }
        >
          Image not found
        </div>
      ) : (
        // Mostrar la imagen
        <Image src={imageUrl || "/placeholder.svg"} alt={alt} {...imageProps} />
      )}
    </div>
  )
}
