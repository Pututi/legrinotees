// Contact/page.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, CheckCircle, Instagram, Facebook } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { sendEmail } from "@/lib/sendEmail"

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { t, language } = useLanguage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const data = {
      name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    const response = await sendEmail(data)
    if (response.success) {
      setFormSubmitted(true)
      setTimeout(() => {
        setFormSubmitted(false)
        e.target.reset()
      }, 3000)
    } else {
      console.error("Fallo al enviar el mensaje", response.error)
    }
  }

  // Traducciones específicas para esta página
  const translations = {
    en: {
      title: "Get in Touch",
      subtitle:
        "We'd love to hear from you. Whether you have a question about our products, need help with an order, or want to collaborate, we're here to help.",
      sendMessage: "Send us a message",
      formDescription: "Fill out the form below and we'll get back to you as soon as possible.",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      sendButton: "Send Message",
      messageSent: "Message Sent!",
      thankYou: "Thank you for reaching out. We'll get back to you shortly.",
      contactInfo: "Contact Information",
      contactDescription: "Here's how you can reach us directly.",
      address: "Address",
      phone: "Phone",
      businessHours: "Business Hours",
      followUs: "Follow Us",
      stayConnected: "Stay connected with us on social media.",
    },
    de: {
      title: "Kontaktieren Sie uns",
      subtitle:
        "Wir würden gerne von Ihnen hören. Ob Sie eine Frage zu unseren Produkten haben, Hilfe bei einer Bestellung benötigen oder zusammenarbeiten möchten, wir sind hier, um zu helfen.",
      sendMessage: "Senden Sie uns eine Nachricht",
      formDescription:
        "Füllen Sie das untenstehende Formular aus und wir werden uns so schnell wie möglich bei Ihnen melden.",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      subject: "Betreff",
      message: "Nachricht",
      sendButton: "Nachricht senden",
      messageSent: "Nachricht gesendet!",
      thankYou: "Vielen Dank für Ihre Kontaktaufnahme. Wir werden uns in Kürze bei Ihnen melden.",
      contactInfo: "Kontaktinformationen",
      contactDescription: "Hier erfahren Sie, wie Sie uns direkt erreichen können.",
      address: "Adresse",
      phone: "Telefon",
      businessHours: "Geschäftszeiten",
      followUs: "Folgen Sie uns",
      stayConnected: "Bleiben Sie mit uns über soziale Medien in Verbindung.",
    },
  }

  const currentTranslations = language === "de" ? translations.de : translations.en

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{currentTranslations.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{currentTranslations.subtitle}</p>
        </motion.div>

        {/* resto sin cambios... */}
      </div>
    </div>
  )
}

function ContactInfo({ icon, title, content }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4 mt-1 text-gray-600">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-gray-600 mt-1">{content}</p>
      </div>
    </div>
  )
}
