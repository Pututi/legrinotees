import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

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

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    })
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    })
  }
}
