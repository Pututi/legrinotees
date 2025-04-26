import { Resend } from "resend"

export interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

const resendApiKey = process.env.RESEND_API_KEY
const resend = new Resend(resendApiKey)

export async function sendEmail(data: EmailData) {
  const { name, email, subject, message } = data

  // ✉️ 1. Correo a tu empresa (Legrinotees)
  const emailToAdmin = await resend.emails.send({
    from: 'Legrinotees <info@legrinotees.com>',
    to: ['info@legrinotees.com'],
    subject: `[Contacto Web] ${subject}`,
    text: `
Nombre: ${name}
Email: ${email}
Mensaje:
${message}
    `.trim(),
    html: `
      <h2>Nuevo Mensaje de Contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `.trim(),
  })

  // ✉️ 2. Auto-Respuesta al cliente
  const autoResponse = await resend.emails.send({
    from: 'Legrinotees <info@legrinotees.com>',
    to: [email],
    subject: '¡Hemos recibido tu mensaje en Legrinotees!',
    text: `
Hola ${name},

Gracias por tu mensaje.

Nuestro equipo lo ha recibido y te responderá pronto.

Si tienes dudas urgentes puedes llamarnos al +49 17621649886.

¡Gracias por confiar en nosotros!

El equipo de Legrinotees
    `.trim(),
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #4CAF50;">¡Hola ${name}!</h2>
        <p>Gracias por tu mensaje. 😊</p>
        <p>Queremos confirmarte que hemos recibido tu solicitud y te responderemos pronto.</p>
        <hr />
        <p><strong>Teléfono:</strong> +49 17621649886</p>
        <p><strong>Email:</strong> info@legrinotees.com</p>
        <br/>
        <p>Un cordial saludo,</p>
        <p><strong>Legrinotees Team</strong></p>
      </div>
    `.trim(),
  })

  return {
    adminResult: emailToAdmin,
    customerResult: autoResponse,
  }
}
