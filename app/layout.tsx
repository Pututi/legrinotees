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
import type React from "react"
import RootClient from "./client"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "LEGRINO TEES | Minimalist T-shirts",
  description: "Minimalist t-shirts for men and women",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
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
