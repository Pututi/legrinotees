"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/context/user-context"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export default function Login() {
  const router = useRouter()
  const { login, isAuthenticated } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // If already authenticated, redirect to account page
  if (isAuthenticated) {
    router.push("/account")
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!formData.email || !formData.password) {
      setError("E-Mail und Passwort sind erforderlich")
      return
    }

    setIsSubmitting(true)

    try {
      const success = await login(formData.email, formData.password)

      if (success) {
        router.push("/account")
      } else {
        setError("Ungültige E-Mail oder ungültiges Passwort")
      }
    } catch (err) {
      setError("Anmeldung fehlgeschlagen. Bitte versuche es erneut.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">In dein Konto einloggen</CardTitle>
            <CardDescription>Gib deine E-Mail-Adresse und dein Passwort ein, um auf dein Konto zuzugreifen</CardDescription>
          </CardHeader>

          <CardContent>
            {error && <div className="bg-red-50 text-red-500 px-4 py-2 rounded-md mb-4 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-Mail
                </label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Passwort
                  </label>
                  <Link href="/forgot-password" className="text-sm text-primary underline">
                    Passwort vergessen?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Anmeldung läuft...
                  </>
                ) : (
                  "Anmelden"
                )}
              </Button>

              <div className="text-center text-sm">
                Du hast noch kein Konto?{" "}
                <Link href="/register" className="text-primary underline">
                  Konto erstellen
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
