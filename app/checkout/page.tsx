"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"
import { CreditCard, CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)

  // Shipping cost calculation
  const shippingCost = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shippingCost + tax

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true)
      clearCart()
    }, 1500)
  }

  // If no items in cart, redirect to cart page
  if (items.length === 0 && !orderComplete) {
    return (
      <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Your cart is empty</h1>
        <p className="mb-8">You need to add items to your cart before checking out.</p>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  // Order complete screen
  if (orderComplete) {
    return (
      <motion.div
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </motion.div>

          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. We've received your order and will process it right away. You'll receive a
            confirmation email shortly.
          </p>

          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="font-medium mb-2">Order #LEGRINO-{Math.floor(Math.random() * 10000)}</h2>
            <p className="text-sm text-gray-500">Estimated delivery: 3-5 business days</p>
          </div>

          <div className="flex justify-center space-x-4">
            <Link href="/">
              <Button variant="outline">Return Home</Button>
            </Link>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Checkout
      </motion.h1>

      {/* Checkout steps */}
      <div className="mb-8">
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-black text-white" : "bg-gray-200"}`}
          >
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-black" : "bg-gray-200"}`}></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-black text-white" : "bg-gray-200"}`}
          >
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-black" : "bg-gray-200"}`}></div>
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-black text-white" : "bg-gray-200"}`}
          >
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>Shipping</span>
          <span>Payment</span>
          <span>Review</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout form */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input id="email" type="email" required />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <Input id="phone" type="tel" required />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Address
                    </label>
                    <Input id="address" required />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <Input id="city" required />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State
                      </label>
                      <Input id="state" required />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium mb-1">
                        ZIP Code
                      </label>
                      <Input id="zip" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium mb-1">
                      Order Notes (Optional)
                    </label>
                    <Textarea id="notes" rows={3} />
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button onClick={() => setStep(2)} className="flex items-center">
                      Continue to Payment
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Payment Information</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                      Name on Card
                    </label>
                    <Input id="cardName" required />
                  </div>

                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                        Expiry Date
                      </label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium mb-1">
                        CVC
                      </label>
                      <Input id="cvc" placeholder="123" required />
                    </div>
                  </div>

                  <div className="flex items-center mt-4">
                    <ShieldCheck className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-500">Your payment information is secure and encrypted</span>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex items-center">
                      Review Order
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div className="p-6">
                <h2 className="text-xl font-medium mb-6">Review Your Order</h2>

                <div className="space-y-4 mb-6">
                  <h3 className="font-medium">Order Items</h3>
                  <ul className="divide-y">
                    {items.map((item, index) => (
                      <li key={index} className="py-4 flex">
                        <div className="w-16 h-16 relative flex-shrink-0 mr-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">Size: {item.size}</p>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm">Qty: {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4 mb-6">
                  <h3 className="font-medium mb-3">Shipping Address</h3>
                  <p className="text-gray-600">
                    John Doe
                    <br />
                    123 Main St
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>

                <div className="border-t pt-4 mb-6">
                  <h3 className="font-medium mb-3">Payment Method</h3>
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                    <span>Credit Card ending in 3456</span>
                  </div>
                </div>

                <form onSubmit={handleSubmitOrder}>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep(2)} type="button">
                      Back
                    </Button>
                    <Button type="submit" className="flex items-center">
                      Place Order
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
            <div className="p-6 border-b">
              <h2 className="text-xl font-medium">Order Summary</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {shippingCost === 0 ? <span className="text-green-600">Free</span> : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-4 border-t font-medium text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {shippingCost === 0 && (
                <div className="text-sm text-green-600 mt-2">You've qualified for free shipping!</div>
              )}

              {shippingCost > 0 && (
                <div className="text-sm text-gray-500 mt-2">
                  Add ${(100 - subtotal).toFixed(2)} more to qualify for free shipping
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
