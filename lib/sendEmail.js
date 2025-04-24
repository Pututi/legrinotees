import emailjs from '@emailjs/browser'

export function sendEmail(data) {
  const serviceId = 'service_iayr6km'
  const templateId = 'template_gvew3cb'
  const publicKey = 'sXmMw5gjv6YXOyOm4'

  return emailjs.send(serviceId, templateId, data, publicKey)
}
