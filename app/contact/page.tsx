"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useToast } from "@/hooks/use-toast"
import { submitContactForm } from "../actions/contact-actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import confetti from "canvas-confetti"

export default function Contact() {
  const [formSuccess, setFormSuccess] = useState(false)
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string }>({})

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})

    try {
      const formData = new FormData(event.currentTarget)
      const result = await submitContactForm(formData)

      setFormStatus(result)

      if (result.success) {
        setFormSuccess(true)
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
        })
        toast({
          title: "✅ Mensaje enviado",
          description: "¡Gracias por contactarnos! Te responderemos pronto.",
          variant: "default",
        })
        ;(event.target as HTMLFormElement).reset()
      } else {
        toast({
          title: "❌ Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "❌ Error inesperado",
        description: "Por favor intenta de nuevo más tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        {language === "en" ? "Get in Touch" : "Kontaktieren Sie uns"}
      </motion.h1>

      <motion.div 
        className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-6">
          {language === "en" ? "Send us a message" : "Senden Sie uns eine Nachricht"}
        </h2>

        {formStatus.message && (
          <div
            className={`mb-6 p-4 rounded-md border ${
              formStatus.success
                ? "bg-green-50 text-green-600 border-green-200"
                : "bg-red-50 text-red-600 border-red-200"
            }`}
          >
            {formStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                {language === "en" ? "First Name" : "Vorname"}
              </label>
              <Input id="firstName" name="firstName" type="text" required />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                {language === "en" ? "Last Name" : "Nachname"}
              </label>
              <Input id="lastName" name="lastName" type="text" required />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              {language === "en" ? "Email" : "E-Mail"}
            </label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">
              {language === "en" ? "Subject" : "Betreff"}
            </label>
            <Input id="subject" name="subject" type="text" required />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              {language === "en" ? "Message" : "Nachricht"}
            </label>
            <Textarea id="message" name="message" rows={5} required />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {language === "en" ? "Sending..." : "Wird gesendet..."}
              </>
            ) : language === "en" ? (
              "Send Message"
            ) : (
              "Nachricht senden"
            )}
          </Button>
        </form>

        <div className="mt-12 space-y-6">
          <ContactDetail icon={<Mail className="h-5 w-5" />} title={language === "en" ? "Email" : "E-Mail"} content="info@legrinotees.com" />
          <ContactDetail icon={<Phone className="h-5 w-5" />} title={language === "en" ? "Phone" : "Telefon"} content="+49 17621649886" />
          <ContactDetail icon={<MapPin className="h-5 w-5" />} title={language === "en" ? "Address" : "Adresse"} content="Langenkamp 67, 49082 Osnabrück Deutschland" />
          <ContactDetail icon={<Clock className="h-5 w-5" />} title={language === "en" ? "Business Hours" : "Geschäftszeiten"} content={language === "en" ? "Monday - Friday: 9am - 6pm" : "Montag - Freitag: 9:00 - 18:00"} />
        </div>
      </motion.div>
    </div>
  )
}

type ContactDetailProps = {
  icon: React.ReactNode
  title: string
  content: string
}

function ContactDetail({ icon, title, content }: ContactDetailProps) {
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
