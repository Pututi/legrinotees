"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, CheckCircle, Instagram, Facebook } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { t, language } = useLanguage()

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, you would handle the form submission here
    setFormSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false)
      e.target.reset()
    }, 3000)
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

  // Seleccionar las traducciones según el idioma actual
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{currentTranslations.sendMessage}</CardTitle>
                <CardDescription>{currentTranslations.formDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                {formSubmitted ? (
                  <motion.div
                    className="flex flex-col items-center justify-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{currentTranslations.messageSent}</h3>
                    <p className="text-gray-600 text-center">{currentTranslations.thankYou}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium">
                          {currentTranslations.firstName}
                        </label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium">
                          {currentTranslations.lastName}
                        </label>
                        <Input id="lastName" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {currentTranslations.email}
                      </label>
                      <Input id="email" type="email" required />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        {currentTranslations.subject}
                      </label>
                      <Input id="subject" required />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        {currentTranslations.message}
                      </label>
                      <Textarea id="message" rows={5} required />
                    </div>

                    <Button type="submit" className="w-full">
                      {currentTranslations.sendButton}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>{currentTranslations.contactInfo}</CardTitle>
                <CardDescription>{currentTranslations.contactDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ContactInfo
                  icon={<MapPin />}
                  title={currentTranslations.address}
                  content="Langenkamp 67, 49082 Osnabrück Deutschland"
                />
                <ContactInfo icon={<Phone />} title={currentTranslations.phone} content="+49 17621649886" />
                <ContactInfo icon={<Mail />} title={currentTranslations.email} content="info@legrinotees.com" />
                <ContactInfo
                  icon={<Clock />}
                  title={currentTranslations.businessHours}
                  content={language === "de" ? "Montag - Freitag: 9:00 - 18:00 MEZ" : "Monday - Friday: 9am - 6pm EST"}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{currentTranslations.followUs}</CardTitle>
                <CardDescription>{currentTranslations.stayConnected}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com/legrinotees"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="https://facebook.com/legrinotees"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href="https://tiktok.com/@legrinotees"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                      <path d="M15 8a4 4 0 0 0 0 8V8z" />
                      <path d="M15 8a4 4 0 0 1 4 4V4h-4z" />
                    </svg>
                    <span className="sr-only">TikTok</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
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
