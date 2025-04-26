import type { ReactNode } from "react"
import RootClient from "./client"

export const metadata = {
  title: "LEGRINO TEES | Minimalist T-shirts",
  description: "Minimalist t-shirts for men and women",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <RootClient>{children}</RootClient>
}
