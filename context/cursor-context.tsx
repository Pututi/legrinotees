"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"

type CursorContextType = {
  showCursor: (text?: string) => void
  hideCursor: () => void
}

const CursorContext = createContext<CursorContextType>({
  showCursor: () => {},
  hideCursor: () => {},
})

export function CursorProvider({ children }: { children: ReactNode }) {
  const dotRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState("Ansehen")
  const [visible, setVisible] = useState(false)
  const [isFinePointer, setIsFinePointer] = useState(false)

  // Solo en dispositivos con mouse real (no táctiles): así en celular
  // nunca se monta el listener de mousemove ni el círculo de reemplazo.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    setIsFinePointer(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (!isFinePointer) return
    const handleMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
    }
    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [isFinePointer])

  const showCursor = (text = "Ansehen") => {
    setLabel(text)
    setVisible(true)
  }
  const hideCursor = () => setVisible(false)

  return (
    <CursorContext.Provider value={{ showCursor, hideCursor }}>
      {children}
      {isFinePointer && (
        // El div externo solo se mueve (posición vía JS en cada mousemove);
        // el interno solo escala/desvanece vía clases de Tailwind. Separarlos
        // evita que el "transform" en línea pise el scale de Tailwind.
        <div ref={dotRef} className="fixed top-0 left-0 z-[100] pointer-events-none">
          <div
            className={`flex items-center justify-center w-20 h-20 rounded-full bg-black text-white text-xs uppercase tracking-wider transition-[opacity,transform] duration-300 ease-out ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            {label}
          </div>
        </div>
      )}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  return useContext(CursorContext)
}
