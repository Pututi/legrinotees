// app/contact/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useToast } from "@/hooks/use-toast"
import { submitContactForm } from "../actions/contact-actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

export default function Contact() {
  const [formSuccess, setFormSuccess] = useState(false)
  const { language } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

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
          spread: 70,
          origin: { y: 0.6 },
        })
        window.scrollTo({ top: 0, behavior: "smooth" })
        ;(event.target as HTMLFormElement).reset()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Unexpected error. Please try again later.",
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
            className="flex flex-col items-center justify-center py-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
            <h2 className="text-2xl font-bold mb-4">
              {language === "en" ? "Thank you for contacting us!" : "Danke für Ihre Nachricht!"}
            </h2>
            <p className="text-gray-600 text-center">
              {language === "en"
                ? "We will get back to you as soon as possible."
                : "Wir werden uns so schnell wie möglich bei Ihnen melden."}
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input id="firstName" name="firstName" placeholder={language === "en" ? "First Name" : "Vorname"} required />
              <Input id="lastName" name="lastName" placeholder={language === "en" ? "Last Name" : "Nachname"} required />
            </div>
            <Input id="email" name="email" type="email" placeholder="Email" required />
            <Input id="subject" name="subject" placeholder={language === "en" ? "Subject" : "Betreff"} required />
            <Textarea id="message" name="message" rows={5} placeholder={language === "en" ? "Message" : "Nachricht"} required />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {language === "en" ? "Sending..." : "Wird gesendet..."}
                </>
              ) : (
                language === "en" ? "Send Message" : "Nachricht senden"
              )}
            </Button>
          </form>
        )}

        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">
            {language === "en" ? "Other Ways to Contact Us" : "Andere Kontaktmöglichkeiten"}
          </h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <Mail className="h-5 w-5 mr-4 text-gray-600" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600 mt-1">info@legrinotees.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-5 w-5 mr-4 text-gray-600" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-600 mt-1">+49 176 21649886</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-4 text-gray-600" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-600 mt-1">Langenkamp 67, 49082 Osnabrück, Germany</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-4 text-gray-600" />
              <div>
                <h3 className="font-medium">Business Hours</h3>
                <p className="text-gray-600 mt-1">Monday - Friday: 9am - 6pm</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
