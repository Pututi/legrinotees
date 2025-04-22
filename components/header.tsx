"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import CartIcon from "@/components/cart/cart-icon"
import UserMenu from "@/components/user-menu"
import LanguageSwitcher from "@/components/language-switcher"
import { useLanguage } from "@/context/language-context"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-xl font-bold hover:text-gray-700 transition-colors duration-300">LEGRINO TEES</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 hover:text-black hover:underline transition-colors duration-300">
              {t("nav.home")}
            </Link>
            <Link
              href="/shop"
              className="text-gray-800 hover:text-black hover:underline transition-colors duration-300"
            >
              {t("nav.shop")}
            </Link>
            <Link
              href="/about"
              className="text-gray-800 hover:text-black hover:underline transition-colors duration-300"
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/contact"
              className="text-gray-800 hover:text-black hover:underline transition-colors duration-300"
            >
              {t("nav.contact")}
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <UserMenu />
            <CartIcon />

            {/* Mobile menu button */}
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: isMenuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4 border-t">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-800 hover:text-black hover:pl-2 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/shop"
              className="text-gray-800 hover:text-black hover:pl-2 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.shop")}
            </Link>
            <Link
              href="/about"
              className="text-gray-800 hover:text-black hover:pl-2 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/contact"
              className="text-gray-800 hover:text-black hover:pl-2 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.contact")}
            </Link>
          </nav>
        </div>
      </motion.div>
    </header>
  )
}
