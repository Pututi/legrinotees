"use client"

import { useRef, useEffect } from "react"

export default function ParallaxSection({ children, className = "", speed = 0.5 }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const scrollPosition = window.scrollY
      const sectionTop = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight
      const windowHeight = window.innerHeight

      // Solo aplicar el efecto cuando la sección está visible
      if (scrollPosition + windowHeight >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
        // Calcular la posición relativa de la sección en la ventana
        const relativePosition = scrollPosition - sectionTop + windowHeight / 2

        // Aplicar la transformación con un valor limitado para evitar desplazamientos extremos
        const translateY = Math.min(relativePosition * speed, sectionHeight / 2)
        sectionRef.current.style.transform = `translateY(${translateY}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [speed])

  return (
    <div ref={sectionRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}
