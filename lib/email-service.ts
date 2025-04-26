import { Resend } from "resend"

interface EmailData {
  to: string
  from: string
  subject: string
  text: string
  html?: string
}

// Inicializar Resend con la API key
const resendApiKey = process.env.RESEND_API_KEY
const resend = new Resend(resendApiKey)

// Email de prueba (tu propio email)
const TEST_EMAIL = "gustavopc@icloud.com"
// Determinar si estamos en modo de producción o desarrollo
const isProduction = true


export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    console.log("Sending email with Resend API Key:", resendApiKey ? "API Key exists" : "API Key missing")

    // En modo de prueba, siempre enviar a tu propio email
    const recipient = isProduction ? data.to : TEST_EMAIL

    // Enviar el correo electrónico usando Resend
    const { data: resendData, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // Siempre usar este remitente en modo de prueba
      to: recipient,
      subject: data.subject,
      text: data.text,
      html: data.html || data.text,
      // Si estamos en modo de prueba y el destinatario original es diferente, añadirlo como CC
      ...(isProduction ? {} : { cc: data.to !== TEST_EMAIL ? data.to : undefined }),
    })

    if (error) {
      console.error("Error de Resend:", error)
      return false
    }

    console.log("Email enviado con Resend:", resendData)
    return true
  } catch (error) {
    console.error("Error al enviar email:", error)
    return false
  }
}

// Función específica para el formulario de contacto
export async function sendContactFormEmail(formData: {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}): Promise<boolean> {
  const { firstName, lastName, email, subject, message } = formData

  // Construir el contenido del email
  const emailContent = `
    Nuevo mensaje de contacto:
    
    Nombre: ${firstName} ${lastName}
    Email: ${email}
    Asunto: ${subject}
    
    Mensaje:
    ${message}
  `

  const htmlContent = `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Asunto:</strong> ${subject}</p>
    <h3>Mensaje:</h3>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `

  try {
    // En producción, esto debería ser tu dominio verificado
    const fromEmail = "onboarding@resend.dev"

    // El destinatario real (se usará en producción)
    const toEmail = "info@legrinotees.com"

    const emailSent = await sendEmail({
      to: toEmail,
      from: fromEmail,
      subject: `Formulario de contacto: ${subject}`,
      text: emailContent,
      html: htmlContent,
    })

    if (!emailSent) {
      console.error("Error: sendEmail returned false")
      return false
    }

    return true
  } catch (error) {
    console.error("Error in sendContactFormEmail:", error)
    return false
  }
}
