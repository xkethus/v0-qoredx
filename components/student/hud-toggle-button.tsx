"use client"

import { Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useHUD } from "@/lib/contexts/hud-context"

export function HUDToggleButton() {
  const { showHUD, toggleHUD } = useHUD()

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <div className="relative">
        <div
          className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full blur opacity-75 ${
            showHUD ? "animate-pulse" : ""
          }`}
        ></div>
        <Button
          onClick={toggleHUD}
          className="relative bg-black hover:bg-gray-900 text-white border border-cyan-500 rounded-full h-14 w-14 flex items-center justify-center"
          title={showHUD ? "Desactivar HUD" : "Activar HUD"}
        >
          <Monitor className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
