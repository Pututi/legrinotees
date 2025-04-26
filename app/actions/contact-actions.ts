"use server"

import { z } from "zod"
import { sendContactFormEmail } from "@/lib/email-service"

// Esquema de validación para el formulario
const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "El nombre es requerido" }),
  lastName: z.string().min(1, { message: "El apellido es requerido" }),
  email: z.string().email({ message: "Email inválido" }),
  subject: z.string().min(1, { message: "El asunto es requerido" }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
})

export async function submitContactForm(formData: FormData) {
  try {
    // Extraer datos del formulario
    const rawData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    // Validar datos
    const validationResult = contactFormSchema.safeParse(rawData)

    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.format())
      return {
        success: false,
        message: "Error de validación. Por favor verifica los campos del formulario.",
      }
    }

    // Enviar email
    console.log("Enviando email con datos:", validationResult.data)
    const emailSent = await sendContactFormEmail(validationResult.data)

    if (!emailSent) {
      console.error("Failed to send email")
      return {
        success: false,
        message: "Hubo un error al enviar el formulario. Por favor intenta de nuevo más tarde.",
      }
    }

    return {
      success: true,
      message: "¡Gracias! Tu mensaje ha sido enviado correctamente.",
    }
  } catch (error) {
    console.error("Error in submitContactForm:", error)
    return {
      success: false,
      message: "Hubo un error al procesar tu solicitud. Por favor intenta de nuevo más tarde.",
    }
  }
}
