"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type HeroContextType = {
  hasHero: boolean
  setHasHero: (value: boolean) => void
}

const HeroContext = createContext<HeroContextType>({
  hasHero: false,
  setHasHero: () => {},
})

export function HeroProvider({ children }: { children: ReactNode }) {
  const [hasHero, setHasHero] = useState(false)
  return <HeroContext.Provider value={{ hasHero, setHasHero }}>{children}</HeroContext.Provider>
}

export function useHero() {
  return useContext(HeroContext)
}
