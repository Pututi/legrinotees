import nodemailer from 'nodemailer'

export async function sendEmail({ name, email, subject, message }) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@legrinotees.com',
      pass: 'Putipu#18' // ⚠️ Reemplaza esto
    }
  })

  const mailOptions = {
    from: '"Contacto Web" <info@legrinotees.com>',
    to: 'info@legrinotees.com',
    subject: `[Contacto] ${subject}`,
    text: `
      Nombre: ${name}
      Email: ${email}
      Mensaje:
      ${message}
    `
  }

  const info = await transporter.sendMail(mailOptions)
  console.log('📬 Email enviado: ', info.messageId)
  return info
}
