// app/api/contact/route.js

import { sendEmail } from '@/lib/sendEmail'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    const result = await sendEmail({ name, email, subject, message })

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    })
  } catch (error) {
    console.error("❌ Error al enviar el email:", error)
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    })
  }
}
