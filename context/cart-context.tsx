"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size: string
  color?: string
}

// Códigos de promoción válidos. Por ahora solo WELCOME10 (10% de descuento),
// que es el único que se anunciaba en el carrito.
const PROMO_CODES: Record<string, number> = {
  welcome10: 0.1,
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: number, size: string, color?: string) => void
  updateQuantity: (id: number, size: string, quantity: number, color?: string) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  totalItems: number
  subtotal: number
  promoCode: string | null
  discountPercent: number
  discount: number
  applyPromoCode: (code: string) => boolean
  removePromoCode: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [promoCode, setPromoCode] = useState<string | null>(null)
  const [discountPercent, setDiscountPercent] = useState(0)

  // Calculate total items and subtotal
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  // El descuento se recalcula siempre sobre el subtotal actual, nunca se
  // guarda como un monto fijo: así cambiar cantidades o quitar artículos
  // no deja un descuento "fantasma" calculado sobre un carrito anterior.
  const discount = subtotal * discountPercent

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage")
      }
    }
    const savedPromo = localStorage.getItem("promo")
    if (savedPromo) {
      try {
        const parsed = JSON.parse(savedPromo)
        if (parsed.code && typeof parsed.percent === "number") {
          setPromoCode(parsed.code)
          setDiscountPercent(parsed.percent)
        }
      } catch (e) {
        console.error("Failed to parse promo from localStorage")
      }
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, mounted])

  // Save promo code to localStorage when it changes. Se guarda junto al
  // carrito para que sobreviva a recargar la página o volver del checkout.
  useEffect(() => {
    if (!mounted) return
    if (promoCode) {
      localStorage.setItem("promo", JSON.stringify({ code: promoCode, percent: discountPercent }))
    } else {
      localStorage.removeItem("promo")
    }
  }, [promoCode, discountPercent, mounted])

  // Add item to cart
  const addItem = (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    console.log("Añadiendo al carrito:", newItem) // Para depuración

    setItems((prevItems) => {
      // Check if item with same id, size and color already exists
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color,
      )

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity || 1
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, { ...newItem, quantity: newItem.quantity || 1 }]
      }
    })

    // Open cart when adding item
    setIsCartOpen(true)
  }

  // Remove item from cart. La identidad de una línea es id + size + color:
  // comparar color con === (y no con un atajo que trate "sin color" como
  // "cualquier color") evita afectar otras variantes del mismo producto/talla.
  const removeItem = (id: number, size: string, color?: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size && item.color === color)),
    )
  }

  // Update item quantity
  const updateQuantity = (id: number, size: string, quantity: number, color?: string) => {
    if (quantity < 1) return

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size && item.color === color ? { ...item, quantity } : item,
      ),
    )
  }

  // Clear cart
  const clearCart = () => {
    setItems([])
    setPromoCode(null)
    setDiscountPercent(0)
  }

  // Aplicar un código de promoción. Devuelve true/false para que la
  // pantalla que lo llama pueda mostrar el mensaje correspondiente.
  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toLowerCase()
    const percent = PROMO_CODES[normalized]
    if (percent) {
      setPromoCode(normalized)
      setDiscountPercent(percent)
      return true
    }
    return false
  }

  const removePromoCode = () => {
    setPromoCode(null)
    setDiscountPercent(0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        promoCode,
        discountPercent,
        discount,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
