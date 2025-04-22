"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function SplitImageAnimation({ image1, image2 }) {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [image1Error, setImage1Error] = useState(false)
  const [image2Error, setImage2Error] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Animación basada en scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <div ref={containerRef} className="relative py-32 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ opacity, scale }}>
            Explore Our Styles
          </motion.h2>
          <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ opacity, scale }}>
            Discover the perfect style that matches your personality
          </motion.p>
        </div>

        {/* Contenedor de imágenes con tamaño controlado */}
        <motion.div
          className="relative max-w-6xl mx-auto h-[550px] md:h-[750px] lg:h-[850px] rounded-xl overflow-hidden shadow-2xl"
          style={{ opacity, scale }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Imagen izquierda */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out"
            style={{
              clipPath: isHovered ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <img
              src={
                image1Error
                  ? "/placeholder.svg?height=850&width=1200&query=Urban+Style"
                  : image1.startsWith("http")
                    ? image1
                    : `http://localhost:3000${image1}`
              }
              alt="Urban style"
              className="w-full h-full object-cover object-center"
              onError={() => setImage1Error(true)}
            />
            <div className="absolute inset-0 bg-black/10" />

            {/* Texto superpuesto */}
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">Urban</h3>
              <p className="text-white/90 drop-shadow-md">Modern and sleek designs for city life</p>
            </div>
          </div>

          {/* Imagen derecha */}
          <div
            className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out"
            style={{
              clipPath: isHovered
                ? "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)"
                : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
            }}
          >
            <img
              src={
                image2Error
                  ? "/placeholder.svg?height=850&width=1200&query=Colorful+Style"
                  : image2.startsWith("http")
                    ? image2
                    : `http://localhost:3000${image2}`
              }
              alt="Colorful style"
              className="w-full h-full object-cover object-center"
              onError={() => setImage2Error(true)}
            />
            <div className="absolute inset-0 bg-black/10" />

            {/* Texto superpuesto */}
            <div className="absolute bottom-0 right-0 p-6 w-full text-right">
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">Colorful</h3>
              <p className="text-white/90 drop-shadow-md">Vibrant patterns to express yourself</p>
            </div>
          </div>

          {/* Línea divisoria */}
          <div
            className={`absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-700 ease-in-out ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />

          {/* Indicador de interacción */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="bg-black/50 text-white px-6 py-3 rounded-full text-sm font-medium">Hover to explore</div>
          </div>
        </motion.div>

        {/* Texto descriptivo debajo */}
        <motion.div className="text-center mt-12" style={{ opacity, scale }}>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our collection features a wide range of styles to suit every taste and occasion.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
