"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useToast } from "@/hooks/use-toast"
import { submitContactForm } from "../actions/contact-actions"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Contact() {
  const { t, language } = useLanguage()
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
        toast({
          title: "¡Éxito!",
          description: result.message,
          variant: "default",
        })
        // Limpiar el formulario si fue exitoso
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
      setFormStatus({
        success: false,
        message: "Hubo un error inesperado. Por favor intenta de nuevo más tarde.",
      })
      toast({
        title: "Error",
        description: "Hubo un error inesperado. Por favor intenta de nuevo más tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Mensaje de desarrollo para indicar que los emails se envían a una dirección de prueba
  const isDevelopment = process.env.NODE_ENV !== "production"

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {language === "en" ? "Get in Touch" : "Kontaktieren Sie uns"}
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        {isDevelopment && (
          <Alert className="mb-6 bg-blue-50 text-blue-800 border border-blue-200">
            <AlertDescription>
              <p className="text-sm">
                <strong>Modo de desarrollo:</strong> Los emails se enviarán a gustavopc@icloud.com en lugar de
                info@legrinotees.com. Para enviar a otros destinatarios en producción, verifica un dominio en
                resend.com/domains.
              </p>
            </AlertDescription>
          </Alert>
        )}

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

        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">
            {language === "en" ? "Other Ways to Contact Us" : "Andere Kontaktmöglichkeiten"}
          </h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4 mt-1 text-gray-600">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{language === "en" ? "Email" : "E-Mail"}</h3>
                <p className="text-gray-600 mt-1">info@legrinotees.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4 mt-1 text-gray-600">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{language === "en" ? "Phone" : "Telefon"}</h3>
                <p className="text-gray-600 mt-1">+49 17621649886</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4 mt-1 text-gray-600">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{language === "en" ? "Address" : "Adresse"}</h3>
                <p className="text-gray-600 mt-1">Langenkamp 67, 49082 Osnabrück Deutschland</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4 mt-1 text-gray-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{language === "en" ? "Business Hours" : "Geschäftszeiten"}</h3>
                <p className="text-gray-600 mt-1">
                  {language === "en" ? "Monday - Friday: 9am - 6pm EST" : "Montag - Freitag: 9:00 - 18:00 MEZ"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
