"use client"

import { useHUD } from "@/lib/contexts/hud-context"
import { Button } from "@/components/ui/button"
import { Layers } from "lucide-react"
import { usePathname } from "next/navigation"

export function HUDToggleButton() {
  const { toggleHUD } = useHUD()
  const pathname = usePathname()

  // No renderizar este botón en la página de dashboard del estudiante
  // ya que allí ya existe un botón para el HUD en la navegación espacial
  if (pathname === "/student/dashboard") {
    return null
  }

  return (
    <Button
      onClick={toggleHUD}
      variant="outline"
      size="icon"
      className="fixed bottom-4 right-4 z-50 rounded-full bg-cyan-900/70 text-cyan-300 border-cyan-700 hover:bg-cyan-800"
    >
      <Layers className="h-5 w-5" />
      <span className="sr-only">Toggle HUD</span>
    </Button>
  )
}
