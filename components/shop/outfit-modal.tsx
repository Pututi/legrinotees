"use client"

import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { motion } from "framer-motion"

interface OutfitModalProps {
  isOpen: boolean
  onClose: () => void
  outfit: {
    title: string
    description: string
    image: string
  }
}

export default function OutfitModal({ isOpen, onClose, outfit }: OutfitModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-white rounded-lg">
        <div className="flex flex-col md:flex-row h-full">
          {/* Imagen del outfit - ahora ocupa toda la altura y tiene mejor proporción */}
          <div className="relative w-full md:w-2/3 h-[500px] md:h-auto overflow-hidden bg-[#f8f8f8]">
            <img
              src={outfit.image || "/placeholder.svg"}
              alt={outfit.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Información del outfit */}
          <div className="w-full md:w-1/3 p-6 flex flex-col">
            <DialogTitle className="text-2xl font-bold mb-2">{outfit.title}</DialogTitle>
            <DialogDescription className="text-base mb-6">{outfit.description}</DialogDescription>

            <div className="mt-auto">
              <motion.button
                className="w-full py-3 px-4 bg-black text-white rounded-md font-medium"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
              >
                Cerrar
              </motion.button>
            </div>
          </div>
        </div>

        <DialogClose className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 z-10">
          <X className="h-4 w-4" />
          <span className="sr-only">Cerrar</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
