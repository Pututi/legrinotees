"use client"

import { motion } from "framer-motion"

interface TornHeroImageProps {
  src: string
  alt: string
}

// Puntos de un borde irregular tipo "papel rasgado", en porcentaje del
// ancho/alto del contenedor, oscilando alrededor del 50% horizontal.
const TEAR_POINTS: [number, number][] = [
  [53, 0],
  [46, 6],
  [57, 13],
  [43, 20],
  [55, 28],
  [44, 36],
  [56, 44],
  [45, 52],
  [54, 60],
  [43, 68],
  [57, 76],
  [44, 84],
  [55, 92],
  [50, 100],
]

const colorClipPath = `polygon(0% 0%, ${TEAR_POINTS.map(([x, y]) => `${x}% ${y}%`).join(", ")}, 0% 100%)`
const tearPath = TEAR_POINTS.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ")

export default function TornHeroImage({ src, alt }: TornHeroImageProps) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-100">
      {/* Base: versión en blanco y negro, cubre todo el hero */}
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover grayscale" />

      {/* Revelado animado de la versión a color, recortada con el borde rasgado */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <div className="absolute inset-0 w-full h-full" style={{ clipPath: colorClipPath }}>
          <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Línea del "rasgado" sobre el borde */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <path
          d={tearPath}
          fill="none"
          stroke="white"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          opacity="0.95"
        />
      </motion.svg>
    </div>
  )
}
