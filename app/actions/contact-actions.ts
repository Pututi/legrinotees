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
    // Extraer los datos del formulario
    const rawData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    // Validar los datos
    const validationResult = contactFormSchema.safeParse(rawData)

    if (!validationResult.success) {
      console.error("Validation Error:", validationResult.error.format())
      return {
        success: false,
        message: "Por favor revisa que todos los campos estén correctamente completados.",
      }
    }

    // Enviar el email
    const emailSent = await sendContactFormEmail(validationResult.data)

    if (!emailSent) {
      return {
        success: false,
        message: "Hubo un error al enviar el email. Intenta nuevamente más tarde.",
      }
    }

    return {
      success: true,
      message: "¡Tu mensaje ha sido enviado exitosamente!",
    }
  } catch (error) {
    console.error("submitContactForm error:", error)
    return {
      success: false,
      message: "Ocurrió un error inesperado. Por favor intenta de nuevo.",
    }
  }
}
