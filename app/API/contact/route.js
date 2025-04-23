export const runtime = 'nodejs'

import { sendEmail } from '../../../lib/sendEmail.js'

export async function POST(req) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, subject, message } = body

    // Log para confirmar que los datos llegan correctamente (se verá en Vercel)
    console.log('✅ Datos recibidos:', body)

    if (!firstName || !lastName || !email || !subject || !message) {
      console.warn('❌ Faltan campos en el formulario')
      return new Response(JSON.stringify({ error: 'All fields are required.' }), {
        status: 400,
      })
    }

    const fullName = `${firstName} ${lastName}`

    const result = await sendEmail({
      name: fullName,
      email,
      subject,
      message
    })

    console.log('✅ Correo enviado:', result.messageId)

    return new Response(JSON.stringify({ success: true }), { status: 200 })

  } catch (error) {
    console.error('❌ Error al enviar el correo:', error)
    return new Response(JSON.stringify({ success: false, error: 'Failed to send email.' }), {
      status: 500,
    })
  }
}
