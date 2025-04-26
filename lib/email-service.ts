import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactFormEmail(data: EmailData): Promise<boolean> {
  const { name, email, subject, message } = data

  try {
    const { data: resendData, error } = await resend.emails.send({
      from: "Legrinotees <info@legrinotees.com>",
      to: ["info@legrinotees.com"],
      subject: `[Contacto] ${subject}`,
      text: `
Nombre: ${name}
Email: ${email}
Asunto: ${subject}

Mensaje:
${message}
      `.trim(),
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <h3>Mensaje:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    })

    if (error) {
      console.error("❌ Error enviando email con Resend:", error)
      return false
    }

    console.log("✅ Email enviado correctamente:", resendData)
    return true
  } catch (err) {
    console.error("❌ Error inesperado en sendContactFormEmail:", err)
    return false
  }
}
