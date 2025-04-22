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
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Calculate total items and subtotal
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

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
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, mounted])

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

  // Remove item from cart
  const removeItem = (id: number, size: string, color?: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size && (color ? item.color === color : true))),
    )
  }

  // Update item quantity
  const updateQuantity = (id: number, size: string, quantity: number, color?: string) => {
    if (quantity < 1) return

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size && (color ? item.color === color : true) ? { ...item, quantity } : item,
      ),
    )
  }

  // Clear cart
  const clearCart = () => {
    setItems([])
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
