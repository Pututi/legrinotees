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
  const [formSuccess, setFormSuccess] = useState(false)
  const { language } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

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
        ;(event.target as HTMLFormElement).reset()
        // 🎉 Disparar confetti
        confetti({
          particleCount: 200,
          spread: 90,
          origin: { y: 0.6 },
        })
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
      <h1 className="text-3xl font-bold mb-8 text-center">
        {language === "en" ? "Get in Touch" : "Kontaktieren Sie uns"}
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {formSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
            <h2 className="text-2xl font-bold mb-2">
              {language === "en" ? "Thank you!" : "Vielen Dank!"}
            </h2>
            <p className="text-gray-600">
              {language === "en"
                ? "Your message has been sent successfully."
                : "Ihre Nachricht wurde erfolgreich gesendet."}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  {language === "en" ? "First Name" : "Vorname"}
                </label>
                <Input id="firstName" name="firstName" type="text" required className="w-full" />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  {language === "en" ? "Last Name" : "Nachname"}
                </label>
                <Input id="lastName" name="lastName" type="text" required className="w-full" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {language === "en" ? "Email" : "E-Mail"}
              </label>
              <Input id="email" name="email" type="email" required className="w-full" />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                {language === "en" ? "Subject" : "Betreff"}
              </label>
              <Input id="subject" name="subject" type="text" required className="w-full" />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {language === "en" ? "Message" : "Nachricht"}
              </label>
              <Textarea id="message" name="message" rows={5} required className="w-full" />
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
        )}
      </div>
    </div>
  )
}
