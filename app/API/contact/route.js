export const runtime = 'nodejs'

import { sendEmail } from '../../../lib/sendEmail.js'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required.' }), {
        status: 400,
      })
    }

    const result = await sendEmail({ name, email, subject, message })

    return new Response(JSON.stringify({ success: true, messageId: result.messageId }), {
      status: 200,
    })
  } catch (error) {
    console.error('❌ Error en el backend:', error)
    return new Response(JSON.stringify({ success: false, error: 'Email not sent' }), {
      status: 500,
    })
  }
}

