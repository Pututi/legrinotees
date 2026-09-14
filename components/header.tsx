"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import CartIcon from "@/components/cart/cart-icon"
import UserMenu from "@/components/user-menu"
import { useLanguage } from "@/context/language-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  // Cerrar el menú con la tecla Escape, y bloquear el scroll del fondo mientras está abierto
  useEffect(() => {
    if (!isMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/shop", label: t("nav.shop") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 justify-self-start">
              <div className="text-base sm:text-xl font-bold whitespace-nowrap hover:text-gray-700 transition-colors duration-300">
                LEGRINO TEES
              </div>
            </Link>

            {/* Hamburger menu button, centrado */}
            <button
              className="justify-self-center p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Menü öffnen"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Right side icons */}
            <div className="flex items-center justify-end space-x-1 sm:space-x-2">
              <div className="hidden sm:block">
                <UserMenu />
              </div>
              <CartIcon />
            </div>
          </div>
        </div>
      </header>

      {/* Left-side slide-out menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 bottom-0 z-[60] w-full max-w-xs bg-white shadow-xl flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex items-center justify-between h-16 px-4 border-b flex-shrink-0">
                <span className="text-base font-bold whitespace-nowrap">LEGRINO TEES</span>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Menü schließen"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col p-6 gap-1 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg text-gray-800 hover:text-black hover:pl-2 transition-all duration-300 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="sm:hidden mt-auto p-6 border-t">
                <UserMenu />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
