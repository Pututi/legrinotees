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

  // Primero: correo para ti
  const resultToOwner = await resend.emails.send({
    from: 'Legrinotees <info@legrinotees.com>',
    to: ['info@legrinotees.com'],
    subject: `[Nuevo mensaje de contacto] ${subject}`,
    text: `
Nombre: ${name}
Email: ${email}

Mensaje:
${message}
    `,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <h3>Mensaje:</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  })

  // Segundo: correo de confirmación para el cliente
  const resultToCustomer = await resend.emails.send({
    from: 'Legrinotees <info@legrinotees.com>',
    to: [email],
    subject: 'Hemos recibido tu mensaje | Legrinotees',
    text: `
Hola ${name},

Gracias por contactarnos en Legrinotees.

Hemos recibido tu mensaje con el asunto: "${subject}".

Nos pondremos en contacto contigo lo antes posible.

Saludos,
El equipo de Legrinotees
    `,
    html: `
      <div style="font-family: sans-serif; font-size: 16px;">
        <p>Hola <strong>${name}</strong>,</p>
        <p>Gracias por contactarnos en <strong>Legrinotees</strong>.</p>
        <p>Hemos recibido tu mensaje con el asunto: "<em>${subject}</em>".</p>
        <p>Nos pondremos en contacto contigo lo antes posible.</p>
        <br/>
        <p>Saludos,</p>
        <p><strong>El equipo de Legrinotees</strong></p>
      </div>
    `,
  })

  return {
    ownerResult: resultToOwner,
    customerResult: resultToCustomer
  }
}
