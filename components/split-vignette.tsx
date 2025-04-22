"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function SplitVignette({ leftImage, rightImage, leftText, rightText }) {
  const [hoverPosition, setHoverPosition] = useState(50)
  const [leftImageError, setLeftImageError] = useState(false)
  const [rightImageError, setRightImageError] = useState(false)

  const handleMouseMove = (e) => {
    const container = e.currentTarget
    const { left, width } = container.getBoundingClientRect()
    const x = e.clientX - left
    const position = (x / width) * 100
    setHoverPosition(position)
  }

  // Calcular la opacidad de cada texto basado en la posición del cursor
  const leftTextOpacity = hoverPosition < 50 ? 0 : 1
  const rightTextOpacity = hoverPosition > 50 ? 0 : 1

  // Actualizar el manejo de errores en el componente SplitVignette para manejar mejor las imágenes que no cargan

  // Asegurarse de que el fallback sea más robusto
  const fallbackImage = "/abstract-geometric-shapes.png"

  // Mejorar el manejo de errores para mostrar mensajes de consola más descriptivos
  const handleLeftImageError = () => {
    console.error(`Error loading left image: ${leftImage}`)
    setLeftImageError(true)
  }

  const handleRightImageError = () => {
    console.error(`Error loading right image: ${rightImage}`)
    setRightImageError(true)
  }

  return (
    <motion.div
      className="relative h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Left Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={leftImageError ? fallbackImage : leftImage}
          alt={leftText}
          className="w-full h-full object-cover"
          onError={handleLeftImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
      </div>

      {/* Right Image with clip-path */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          clipPath: `polygon(${hoverPosition}% 0, 100% 0, 100% 100%, ${hoverPosition}% 100%)`,
        }}
      >
        <img
          src={rightImageError ? fallbackImage : rightImage}
          alt={rightText}
          className="w-full h-full object-cover"
          onError={handleRightImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-black/20" />
      </div>

      {/* Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)]"
        style={{ left: `${hoverPosition}%`, transform: "translateX(-50%)" }}
      />

      {/* Left Text Overlay - Solo visible cuando el cursor está en la mitad derecha */}
      <div
        className="absolute inset-0 flex items-center pointer-events-none"
        style={{ opacity: leftTextOpacity, transition: "opacity 0.3s ease" }}
      >
        <div className="w-1/2 flex justify-center items-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">{leftText}</h2>
        </div>
      </div>

      {/* Right Text Overlay - Solo visible cuando el cursor está en la mitad izquierda */}
      <div
        className="absolute inset-0 flex items-center justify-end pointer-events-none"
        style={{ opacity: rightTextOpacity, transition: "opacity 0.3s ease" }}
      >
        <div className="w-1/2 flex justify-center items-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">{rightText}</h2>
        </div>
      </div>
    </motion.div>
  )
}
