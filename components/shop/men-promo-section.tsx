"use client"
import Link from "next/link"

export default function MenPromoSection() {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen mb-16">
      <Link href="/shop?category=men" className="relative block overflow-hidden group">
        <img
          src="/images/home/men-promo-banner.png"
          alt="Herren-T-Shirts entdecken"
          className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
    </div>
  )
}
