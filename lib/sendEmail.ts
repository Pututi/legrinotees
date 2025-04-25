import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}


export async function sendEmail(data: EmailData) {
  const { name, email, subject, message } = data

  const result = await resend.emails.send({
    from: 'Legrinotees <info@legrinotees.com>',
    to: ['info@legrinotees.com'],
    subject: `[Contacto] ${subject}`,
    text: `
      Nombre: ${name}
      Email: ${email}
      Mensaje:
      ${message}
    `,
  })

  return result
}
