"use client"

import { useHUD } from "@/lib/contexts/hud-context"

type CockpitOverlayProps = {}

export function CockpitOverlay({}: CockpitOverlayProps) {
  const { customizations, hudStyle } = useHUD()

  // Styles based on HUD customizations and assets
  const cockpitStyle = {
    backgroundColor: customizations.cockpitColor,
    borderColor: customizations.frameColor,
    consoleColor: customizations.consoleColor,
    hologramColor: customizations.hologramColor,
    lightColor: customizations.lightColor,
    frameStyle: hudStyle.frameStyle,
    consoleStyle: hudStyle.consoleStyle,
    lightStyle: hudStyle.lightStyle,
  }

  return (
    <div
      className={`absolute inset-0 z-50 flex items-center justify-center w-full h-full pointer-events-none`}
      style={cockpitStyle}
    >
      {/* Cockpit frame */}
      <div className="absolute inset-0 border-2 rounded-lg" style={{ borderColor: cockpitStyle.borderColor }}></div>

      {/* Console */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black/50 border border-cyan-500/50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-cyan-300"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <span className="text-sm font-medium text-cyan-300">Navegación</span>
        </div>
      </div>

      {/* Lights */}
      <div className="absolute top-4 left-4 right-4 flex justify-center">
        <div className="w-full h-2 bg-black/50 rounded-full"></div>
      </div>
    </div>
  )
}
