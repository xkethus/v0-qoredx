"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Rocket, Monitor } from "lucide-react"
import { useRouter } from "next/navigation"
import { useHUD } from "@/lib/contexts/hud-context"

export function SpaceNavigationButton() {
  const [isVisible, setIsVisible] = useState(false)
  const { showHUD, toggleHUD } = useHUD()
  const router = useRouter()

  // Mostrar el botón después de un pequeño retraso para evitar parpadeos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // No mostrar el botón si ya estamos en la página del dashboard
  useEffect(() => {
    const path = window.location.pathname
    if (path === "/student/dashboard") {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [])

  const handleNavigationClick = () => {
    router.push("/student/dashboard")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Botón de HUD */}
      <div className="relative">
        <div
          className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full blur opacity-75 ${showHUD ? "animate-pulse" : ""}`}
        ></div>
        <Button
          onClick={toggleHUD}
          className="relative bg-black hover:bg-gray-900 text-white border border-cyan-500 rounded-full h-14 w-14 flex items-center justify-center"
          title={showHUD ? "Desactivar HUD" : "Activar HUD"}
        >
          <Monitor className="h-6 w-6" />
        </Button>
      </div>

      {/* Botón de navegación espacial */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full blur opacity-75"></div>
        <Button
          onClick={handleNavigationClick}
          className="relative bg-black hover:bg-gray-900 text-white border border-cyan-500 rounded-full h-14 w-14 flex items-center justify-center"
          title="Ir a la navegación espacial"
        >
          <Rocket className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
