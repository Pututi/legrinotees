"use client"
import { useLanguage } from "@/context/language-context"
import { VideoPlayer } from "@/components/ui/video-player"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WomenPromoSection() {
  const { t, language } = useLanguage()

  return (
    <div className="w-full mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 h-[70vh]">
        {/* Columna izquierda - Contenido */}
        <div className="bg-[#f9f9f9] text-black p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-2 text-sm font-medium opacity-80">{language === "de" ? "Gesponsert" : "Sponsored"}</div>

          <h2 className="text-3xl md:text-4xl font-bold mb-2">LEGRINO</h2>
          <p className="text-2xl md:text-3xl font-light mb-4">
            {language === "de" ? "Minimalismus trifft auf Stil" : "Minimalism meets style"}
          </p>

          <p className="mb-8 text-black/90">
            {language === "de"
              ? "Entdecke unsere Kollektion an minimalistischen T-Shirts für Frauen, die Komfort und Stil vereinen."
              : "Discover our collection of minimalist t-shirts for women that combine comfort and style."}
          </p>

          <Link href="/shop?category=women" className="inline-block">
            <Button variant="outline" className="text-black border-black hover:bg-black/20 hover:text-black">
              {language === "de" ? "Jetzt shoppen" : "Shop now"} →
            </Button>
          </Link>
        </div>

        {/* Columna derecha - Video/Imagen */}
        <div className="relative h-full overflow-hidden">
          <VideoPlayer
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LegrinoFemale-QIoDgrX1VOpbvcDd5HbRmuOb6vP98W.mp4"
            autoPlay
            muted
            loop
            objectFit="cover"
          />
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  )
}
