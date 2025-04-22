"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/cart-context"
import { UserProvider } from "@/context/user-context"
import { LanguageProvider } from "@/context/language-context"
import { CookieConsentProvider } from "@/context/cookie-consent-context"
import CartSidebar from "@/components/cart/cart-sidebar"
import CookieConsentBanner from "@/components/cookie-consent-banner"
import QuickPurchase from "@/components/quick-purchase"
import { useEffect, useState } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootClient({
  children,
}: {
  children: React.ReactNode
}) {
  // Use useState to manage the theme on the client side
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light") // Default to light

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LanguageProvider>
            <UserProvider>
              <CartProvider>
                <CookieConsentProvider>
                  <Header />
                  <main className="pt-16">{children}</main>
                  <Footer />
                  <CartSidebar />
                  <QuickPurchase />
                  <CookieConsentBanner />
                </CookieConsentProvider>
              </CartProvider>
            </UserProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
