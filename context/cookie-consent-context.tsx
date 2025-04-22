"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Tipo para las preferencias de cookies
type CookiePreferences = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

// Tipo para el contexto
type CookieConsentContextType = {
  consentGiven: boolean
  setConsentGiven: (value: boolean) => void
  cookiePreferences: CookiePreferences
  setCookiePreferences: (prefs: CookiePreferences) => void
  showBanner: boolean
  setShowBanner: (value: boolean) => void
  openPreferences: boolean
  setOpenPreferences: (value: boolean) => void
}

// Crear el contexto
const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

// Proveedor del contexto
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  // Estado para el consentimiento
  const [consentGiven, setConsentGiven] = useState(false)

  // Estado para las preferencias de cookies
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    necessary: true, // Siempre necesario
    analytics: false,
    marketing: false,
  })

  // Estado para mostrar el banner
  const [showBanner, setShowBanner] = useState(false)

  // Estado para mostrar las preferencias
  const [openPreferences, setOpenPreferences] = useState(false)

  // Cargar el estado del consentimiento y las preferencias desde localStorage al montar el componente
  useEffect(() => {
    const savedConsent = localStorage.getItem("cookieConsent")
    const savedPreferences = localStorage.getItem("cookiePreferences")

    if (savedConsent === "true") {
      setConsentGiven(true)
      setShowBanner(false)
    } else {
      // Si no hay consentimiento guardado, mostrar el banner después de un breve retraso
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)

      return () => clearTimeout(timer)
    }

    if (savedPreferences) {
      try {
        setCookiePreferences(JSON.parse(savedPreferences))
      } catch (e) {
        console.error("Error parsing cookie preferences:", e)
      }
    }
  }, [])

  // Guardar el estado del consentimiento y las preferencias en localStorage cuando cambien
  useEffect(() => {
    if (consentGiven) {
      localStorage.setItem("cookieConsent", "true")
      localStorage.setItem("cookiePreferences", JSON.stringify(cookiePreferences))
    }
  }, [consentGiven, cookiePreferences])

  return (
    <CookieConsentContext.Provider
      value={{
        consentGiven,
        setConsentGiven,
        cookiePreferences,
        setCookiePreferences,
        showBanner,
        setShowBanner,
        openPreferences,
        setOpenPreferences,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider")
  }
  return context
}
