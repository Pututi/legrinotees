import { sendEmail } from '@/lib/sendEmail'

export async function POST(req) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, subject, message } = body

    if (!firstName || !lastName || !email || !subject || !message) {
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

    return new Response(JSON.stringify({ success: true, result }), { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ success: false, error: 'Failed to send email.' }), {
      status: 500,
    })
  }
}
