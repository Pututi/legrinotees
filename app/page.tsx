"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SplitVignette from "@/components/split-vignette"
import SplitImageAnimation from "@/components/split-image-animation"

// Definir interfaces para los props de los componentes
interface ParallaxSectionProps {
  imageSrc: string
  title: string
  description: string
}

interface AwwwardsButtonProps {
  text: string
}

export default function Home() {
  // Estado para controlar si el componente está montado
  const [isMounted, setIsMounted] = useState(false)
  const ref = useRef(null)

  // Usar useEffect para actualizar el estado de montaje
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Solo crear efectos de scroll cuando el componente está montado
  const scrollInfo = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Usar scrollInfo.scrollYProgress en lugar de desestructurar
  const scale = useTransform(scrollInfo.scrollYProgress, [0, 1], [1, 1.2])
  const opacity = useTransform(scrollInfo.scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  // Estado para controlar si la imagen de Cloudinary falló
  const [cloudinaryFailed, setCloudinaryFailed] = useState(false)

  // Sitio en alemán únicamente
  const t = (key: string): string => {
    const translations: Record<string, string> = {
      "home.hero.title": "Minimalistischer Stil",
      "home.hero.description": "Entdecke unsere Kollektion hochwertiger minimalistischer T-Shirts für Komfort und Stil.",
      "home.hero.cta": "Jetzt einkaufen",
      "home.collection.title": "Unsere Kollektion",
      "home.categories.title": "Entdecke unsere Kategorien",
      "home.categories.men": "Herrenkollektion",
      "home.categories.women": "Damenkollektion",
      "home.categories.limited": "Limitierte Edition",
      "home.crafted.title": "Mit Sorgfalt gefertigt",
      "home.crafted.description": "Jedes T-Shirt wird aus hochwertigen Materialien und mit viel Liebe zum Detail hergestellt.",
      "home.sustainable.title": "Nachhaltige Mode",
      "home.sustainable.description": "Unser Engagement für die Umwelt spiegelt sich in jedem Stück wider, das wir schaffen.",
    }
    return translations[key] || key
  }

  // Actualizar las URLs de Cloudinary para usar imágenes de alta calidad
  const cloudinaryHeroUrl = "/images/home/chosen-loved-redeemed.png"
  const cloudinaryElbocosaUrl = "/images/home/strength-and-dignity.png"
  const cloudinaryAmorososUrl = "/images/home/wildflower-warrior.png"

  // Mock language state for demonstration purposes
  const [language, setLanguage] = useState("de")

  // Si el componente no está montado, devolver null o un placeholder
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Hero section with parallax background */}
      <div ref={ref} className="relative h-screen overflow-hidden">
        <motion.div className="absolute inset-0 w-full h-full" style={{ scale, opacity }}>
          {/* Usar la imagen de Cloudinary que funciona */}
          <img
            src={cloudinaryHeroUrl || "/placeholder.svg"}
            alt="LEGRINO TEES"
            className="w-full h-full object-cover"
            onError={() => {
              console.error("Error loading Cloudinary image")
              setCloudinaryFailed(true)
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-6">
            {/* Actualizar el título y descripción del hero */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              {t("home.hero.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/90 mb-8"
            >
              {t("home.hero.description")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg">
                  {t("home.hero.cta")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Second parallax section - Corregido para altura adecuada */}
      <div className="relative h-screen overflow-hidden">
        <ParallaxSection
          imageSrc={cloudinaryElbocosaUrl}
          title={t("home.crafted.title")}
          description={t("home.crafted.description")}
        />
      </div>

      {/* Parallax with zoom section */}
      <div className="relative h-screen overflow-hidden">
        <ParallaxZoomSection
          imageSrc={cloudinaryAmorososUrl}
          title={t("home.sustainable.title")}
          description={t("home.sustainable.description")}
        />
      </div>

      {/* Lazy loading images section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {t("home.collection.title")}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overflow-hidden rounded-lg aspect-[3/4]">
                <img
                  src="/images/home/moth-i-came-i-saw.png"
                  alt="I Came I Saw I Went Home t-shirt"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overflow-hidden rounded-lg aspect-[3/4]">
                <img
                  src="/images/home/beach-please.png"
                  alt="Beach Please t-shirt"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overflow-hidden rounded-lg aspect-[3/4] bg-gray-50">
                <img
                  src="/images/home/bold-soul.png"
                  alt="Bold Soul t-shirt"
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animated buttons section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">{t("home.categories.title")}</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/shop?category=men">
              <AwwwardsButton text={t("home.categories.men")} />
            </Link>
            <Link href="/shop?category=women">
              <AwwwardsButton text={t("home.categories.women")} />
            </Link>
            <Link href="/shop?category=limited">
              <AwwwardsButton text={t("home.categories.limited")} />
            </Link>
          </div>
        </div>
      </div>

      {/* Split vignette effect */}
      <SplitVignette
        leftImage="/images/home/rhythm.png"
        rightImage="/images/home/happily-unavailable.png"
        leftText="Urban"
        rightText="Casual"
      />

      {/* Split image animation */}
      <SplitImageAnimation
        image1="/images/home/world-in-his-hands.png"
        image2="/images/home/read-dream-bloom.png"
      />

      {/* New Arrivals Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {language === "de" ? "Neuheiten" : "New Arrivals"}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Link href="/shop/16">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src="/images/home/dream-loud.png"
                    alt="Dream Loud"
                    className="w-full h-auto aspect-[3/4] object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      console.error("Error loading image")
                      e.currentTarget.src = "/plain-cotton-tee.png"
                    }}
                  />
                </div>
                <h3 className="font-medium text-lg">Dream Loud Tee</h3>
                <p className="text-gray-600">34,99 €</p>
              </Link>
            </motion.div>

            {/* Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Link href="/shop/17">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src="/images/home/inner-force.png"
                    alt="Inner Force"
                    className="w-full h-auto aspect-[3/4] object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      console.error("Error loading image")
                      e.currentTarget.src = "/plain-cotton-tee.png"
                    }}
                  />
                </div>
                <h3 className="font-medium text-lg">Inner Force Tee</h3>
                <p className="text-gray-600">34,99 €</p>
              </Link>
            </motion.div>

            {/* Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Link href="/shop/18">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src="/images/home/no-limits.png"
                    alt="No Limits"
                    className="w-full h-auto aspect-[3/4] object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      console.error("Error loading image")
                      e.currentTarget.src = "/plain-cotton-tee.png"
                    }}
                  />
                </div>
                <h3 className="font-medium text-lg">No Limits Tee</h3>
                <p className="text-gray-600">34,99 €</p>
              </Link>
            </motion.div>

            {/* Item 4 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Link href="/shop/19">
                <div className="overflow-hidden rounded-lg mb-4">
                  <img
                    src="/images/home/silent-power.png"
                    alt="Silent Power"
                    className="w-full h-auto aspect-[3/4] object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      console.error("Error loading image")
                      e.currentTarget.src = "/plain-cotton-tee.png"
                    }}
                  />
                </div>
                <h3 className="font-medium text-lg">Silent Power Tee</h3>
                <p className="text-gray-600">34,99 €</p>
              </Link>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" className="px-8">
                {language === "de" ? "Alle ansehen" : "View All"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Modificar la función ParallaxSection para mejorar la calidad de la imagen y corregir el tamaño
function ParallaxSection({ imageSrc, title, description }: ParallaxSectionProps) {
  const ref = useRef(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollInfo = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollInfo.scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div ref={ref} className="relative h-full overflow-hidden">
      <motion.div className="absolute inset-0 w-full h-full" style={{ y }}>
        {/* Usar la imagen directamente sin transformaciones de Cloudinary para mantener la calidad */}
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center">
        <div className="max-w-2xl px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{title}</h2>
          <p className="text-xl text-white/90">{description}</p>
        </div>
      </div>
    </div>
  )
}

// También modificar la función ParallaxZoomSection para mantener la consistencia
function ParallaxZoomSection({ imageSrc, title, description }: ParallaxSectionProps) {
  const containerRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollInfo = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollInfo.scrollYProgress, [0, 1], [1, 1.3])
  const opacity = useTransform(scrollInfo.scrollYProgress, [0, 0.5, 1], [0.6, 0.8, 1])

  return (
    <div ref={containerRef} className="relative h-full overflow-hidden">
      <motion.div className="absolute inset-0 w-full h-full" style={{ scale }}>
        {/* Usar la imagen directamente sin transformaciones */}
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-black/40 flex items-center justify-center text-center"
        style={{ opacity }}
      >
        <div className="max-w-2xl px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{title}</h2>
          <p className="text-xl text-white/90">{description}</p>
          <div className="mt-8">
            <Link href="/shop">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg">
                Jetzt einkaufen
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Awwwards-style Button Component
function AwwwardsButton({ text }: AwwwardsButtonProps) {
  return (
    <motion.div className="relative inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
      <Button className="relative overflow-hidden rounded-full px-8 py-6 text-lg bg-black text-white hover:bg-black/90 z-10">
        <motion.span
          className="relative z-10"
          initial={{ y: 0 }}
          whileHover={{ y: -30 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
        <motion.span
          className="absolute left-0 top-[100%] w-full text-center"
          initial={{ y: 0 }}
          whileHover={{ y: -30 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      </Button>
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-black"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.div>
  )
}
