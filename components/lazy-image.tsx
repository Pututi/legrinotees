"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function LazyImage({ src, alt }) {
  const [isInView, setIsInView] = useState(false)
  const [imgSrc, setImgSrc] = useState("")
  const [error, setError] = useState(false)
  const ref = useRef(null)

  // Placeholder for when image fails to load
  const placeholderSrc = `https://placehold.co/600x800?text=${encodeURIComponent(alt)}`

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // Asegurarse de que la URL sea absoluta
          setImgSrc(src)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.disconnect()
      }
    }
  }, [src])

  const handleError = () => {
    setError(true)
    setImgSrc(placeholderSrc)
  }

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-lg aspect-[4/5]"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {isInView && (
        <img
          src={error ? placeholderSrc : imgSrc}
          alt={alt}
          onError={handleError}
          className="w-full h-full object-cover"
        />
      )}
    </motion.div>
  )
}
