"use client"

// Simplified version of the use-toast hook
import { useState } from "react"

export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = ({ title, description, variant = "default" }) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prevToasts) => [...prevToasts, { id, title, description, variant }])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 5000)

    return { id, dismiss: () => setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id)) }
  }

  return { toast, toasts }
}
