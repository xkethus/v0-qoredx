"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, X } from "lucide-react"

export function AchievementNotification({ title, description, onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 500) // Dar tiempo para la animación de salida
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed top-20 right-4 z-50 max-w-sm"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-lg blur opacity-75 animate-pulse"></div>
            <div className="relative p-4 bg-black/80 backdrop-blur-sm border border-yellow-500/30 rounded-lg flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-900/30 flex items-center justify-center text-yellow-300">
                <Star className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-yellow-300">¡Logro Desbloqueado!</h3>
                <p className="text-white font-medium">{title}</p>
                <p className="text-sm text-gray-300 mt-1">{description}</p>
              </div>
              <button
                onClick={() => {
                  setIsVisible(false)
                  setTimeout(onClose, 500)
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
