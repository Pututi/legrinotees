import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import RootClient from "./client"

export const metadata: Metadata = {
  title: "LEGRINO TEES | Minimalist T-shirts",
  description: "Minimalist t-shirts for men and women",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LEGRINO",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <RootClient>{children}</RootClient>
}
