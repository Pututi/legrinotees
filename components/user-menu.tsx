"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useUser } from "@/context/user-context"
import { Button } from "@/components/ui/button"
import { User, LogOut, Package, Heart, Settings } from "lucide-react"
import { useLanguage } from "@/context/language-context"

export default function UserMenu() {
  const { user, logout, isAuthenticated } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            {t("user.signin")}
          </Button>
        </Link>
        <Link href="/register">
          <Button size="sm">{t("user.register")}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
          {user.firstName.charAt(0)}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown menu */}
            <motion.div
              className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-3 border-b">
                <p className="font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>

              <div className="py-1">
                <Link href="/account" onClick={() => setIsOpen(false)}>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
                    <User className="w-4 h-4 mr-3" />
                    {t("user.account")}
                  </button>
                </Link>

                <Link href="/account?tab=orders" onClick={() => setIsOpen(false)}>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
                    <Package className="w-4 h-4 mr-3" />
                    {t("user.orders")}
                  </button>
                </Link>

                <Link href="/account?tab=wishlist" onClick={() => setIsOpen(false)}>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
                    <Heart className="w-4 h-4 mr-3" />
                    {t("user.wishlist")}
                  </button>
                </Link>

                <Link href="/account?tab=details" onClick={() => setIsOpen(false)}>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
                    <Settings className="w-4 h-4 mr-3" />
                    {t("user.details")}
                  </button>
                </Link>
              </div>

              <div className="py-1 border-t">
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  {t("user.signOut")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
