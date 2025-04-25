'use client'

import { useState } from 'react'

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      setSent(true)
      form.reset()
    } else {
      alert('❌ Hubo un error al enviar el mensaje. Intenta de nuevo.')
    }

    setLoading(false)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="firstName"
          placeholder="First Name"
          required
          className="border border-gray-300 rounded px-3 py-2"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          required
          className="border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />

      <input
        name="subject"
        placeholder="Subject"
        required
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />

      <textarea
        name="message"
        placeholder="Your message..."
        rows={5}
        required
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {sent && (
        <p className="text-green-600 text-sm mt-2">
          ✅ Message sent successfully! We'll get back to you soon.
        </p>
      )}
    </form>
  )
}
