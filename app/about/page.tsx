"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/context/language-context"

export default function About() {
  const { language } = useLanguage()

  return (
    <div className="py-16">
      {/* Hero section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dnic69xtm/image/upload/v1744210956/elbocosa.jpg"
          alt={language === "de" ? "Über uns" : "About Us"}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            aria-label={language === "de" ? "Über uns" : "About Us"}
          >
            {language === "de" ? "Über uns" : "About Us"}
          </motion.h1>
        </div>
      </div>

      {/* Content sections */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6">{language === "de" ? "Wer wir sind" : "Who We Are"}</h2>
          <p className="text-lg text-gray-700 mb-4">
            {language === "de"
              ? "LEGRINO TEES wurde 2010 mit einer einfachen Mission gegründet: minimalistische, hochwertige T-Shirts zu kreieren, die sowohl stilvoll als auch nachhaltig sind. Unsere Reise begann in einem kleinen Studio in New York und hat sich zu einer globalen Marke entwickelt, die für ihre Liebe zum Detail und ihr Engagement für ethische Praktiken bekannt ist."
              : "LEGRINO TEES was founded in 2010 with a simple mission: to create minimalist, high-quality t-shirts that are both stylish and sustainable. Our journey began in a small studio in New York and has evolved into a global brand known for its attention to detail and commitment to ethical practices."}
          </p>
          <p className="text-lg text-gray-700">
            {language === "de"
              ? "Heute bleiben wir unseren Wurzeln treu und stellen sicher, dass jedes T-Shirt, das wir produzieren, unsere Werte von Qualität, Nachhaltigkeit und zeitlosem Design verkörpert. Wir glauben, dass Mode einfach, aber bedeutungsvoll sein sollte, und dieses Ethos leitet alles, was wir tun."
              : "Today, we remain true to our roots, ensuring that every t-shirt we produce embodies our values of quality, sustainability, and timeless design. We believe that fashion should be simple yet meaningful, and this ethos guides everything we do."}
          </p>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">{language === "de" ? "Unsere Werte" : "Our Values"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              title={language === "de" ? "Nachhaltigkeit" : "Sustainability"}
              description={
                language === "de"
                  ? "Wir verwenden nur Bio-Baumwolle und umweltfreundliche Farbstoffe, um unseren ökologischen Fußabdruck zu minimieren."
                  : "We use only organic cotton and eco-friendly dyes to minimize our environmental footprint."
              }
              delay={0}
            />
            <ValueCard
              title={language === "de" ? "Qualität" : "Quality"}
              description={
                language === "de"
                  ? "Jedes T-Shirt wird mit Präzision und Sorgfalt hergestellt, um Langlebigkeit und Komfort zu gewährleisten."
                  : "Each t-shirt is crafted with precision and care to ensure durability and comfort."
              }
              delay={0.1}
            />
            <ValueCard
              title={language === "de" ? "Transparenz" : "Transparency"}
              description={
                language === "de"
                  ? "Wir glauben an vollständige Transparenz in unserer Lieferkette und in der Art und Weise, wie wir Geschäfte machen."
                  : "We believe in complete transparency in our supply chain and the way we do business."
              }
              delay={0.2}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-6">{language === "de" ? "Unser Prozess" : "Our Process"}</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
            <ProcessStep
              number="01"
              title={language === "de" ? "Design" : "Design"}
              description={
                language === "de"
                  ? "Unsere Designer kreieren minimalistische, zeitlose Designs, die sowohl stilvoll als auch funktional sind."
                  : "Our designers create minimalist, timeless designs that are both stylish and functional."
              }
              delay={0}
            />
            <ProcessStep
              number="02"
              title={language === "de" ? "Material" : "Material"}
              description={
                language === "de"
                  ? "Wir wählen nur die hochwertigste Bio-Baumwolle aus, die sowohl weich als auch langlebig ist."
                  : "We select only the highest quality organic cotton that is both soft and durable."
              }
              delay={0.2}
            />
            <ProcessStep
              number="03"
              title={language === "de" ? "Produktion" : "Production"}
              description={
                language === "de"
                  ? "Unsere T-Shirts werden in ethischen Fabriken hergestellt, die faire Löhne und sichere Arbeitsbedingungen bieten."
                  : "Our t-shirts are manufactured in ethical factories that provide fair wages and safe working conditions."
              }
              delay={0.4}
            />
            <ProcessStep
              number="04"
              title={language === "de" ? "Qualitätskontrolle" : "Quality Control"}
              description={
                language === "de"
                  ? "Jedes T-Shirt durchläuft strenge Qualitätskontrollen, um sicherzustellen, dass es unseren hohen Standards entspricht."
                  : "Each t-shirt undergoes rigorous quality checks to ensure it meets our high standards."
              }
              delay={0.6}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function ValueCard({ title, description, delay }: { title: string; description: string; delay: number }) {
  return (
    <motion.div
      className="bg-gray-50 p-6 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  )
}

function ProcessStep({
  number,
  title,
  description,
  delay,
}: { number: string; title: string; description: string; delay: number }) {
  return (
    <motion.div
      className="relative flex items-start mb-12"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex-shrink-0 mr-8">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black text-white font-bold relative z-10">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </motion.div>
  )
}
