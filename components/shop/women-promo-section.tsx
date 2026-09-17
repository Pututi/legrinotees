"use client"
import Link from "next/link"

export default function WomenPromoSection() {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen mb-16">
      <Link href="/shop?category=women" className="relative block overflow-hidden group">
        <img
          src="/images/home/women-promo-banner.webp"
          alt="Damen-T-Shirts entdecken"
          className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
          <span className="text-white text-lg md:text-2xl font-medium drop-shadow-lg">
            Damen-T-Shirts entdecken
          </span>
          <div className="mt-2 h-px w-40 bg-white" />
        </div>
      </Link>
    </div>
  )
}
