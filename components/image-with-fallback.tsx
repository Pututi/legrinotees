"use client"

import { useState } from "react"

export default function ImageWithFallback({ src, alt, fill = false, width, height, className, ...props }) {
  // No convertir a URL absoluta si ya es una URL completa o si es una URL de blob
  const absoluteSrc = src.startsWith("http") || src.startsWith("blob:") ? src : src

  const [imgSrc, setImgSrc] = useState(absoluteSrc)
  const [error, setError] = useState(false)

  // Usar una URL absoluta para el placeholder también
  const placeholderSrc = `https://placehold.co/600x400?text=${encodeURIComponent(alt)}`

  const handleError = () => {
    setError(true)
    setImgSrc(placeholderSrc)
  }

  if (fill) {
    return (
      <div className={`relative ${className}`} style={{ width: "100%", height: "100%" }}>
        <img
          src={error ? placeholderSrc : imgSrc}
          alt={alt}
          onError={handleError}
          className="object-cover w-full h-full"
          {...props}
        />
      </div>
    )
  }

  return (
    <img
      src={error ? placeholderSrc : imgSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      onError={handleError}
      className={className}
      {...props}
    />
  )
}
