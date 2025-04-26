// app/contact/page.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useToast } from "@/hooks/use-toast"
import { submitContactForm } from "../actions/contact-actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import confetti from "canvas-confetti"

export default function Contact() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const result = await submitContactForm(formData)

      if (result.success) {
        setFormSuccess(true)
        confetti({ 
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 }
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
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        
        {!formSuccess ? (
          <>
            <h1 className="text-3xl font-bold mb-8 text-center">
              {language === "en" ? "Get in Touch" : "Kontaktieren Sie uns"}
            </h1>

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
                    {language === "en" ? "Sending..." : "Senden..."}
                  </>
                ) : language === "en" ? (
                  "Send Message"
                ) : (
                  "Nachricht senden"
                )}
              </Button>
            </form>
          </>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              {language === "en" ? "Message Sent Successfully!" : "Nachricht erfolgreich gesendet!"}
            </h2>
            <p className="text-gray-600 text-center">
              {language === "en"
                ? "Thanks for contacting us. We'll reply as soon as possible."
                : "Vielen Dank für Ihre Nachricht. Wir melden uns so schnell wie möglich bei Ihnen."}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
