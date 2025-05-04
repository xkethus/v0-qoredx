"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Tipos para el contexto
type HUDCustomizations = {
  cockpitColor: string
  frameColor: string
  consoleColor: string
  hologramColor: string
  lightColor: string
}

type HUDStyle = {
  frameStyle: string
  consoleStyle: string
  lightStyle: string
}

type HUDContextType = {
  showHUD: boolean
  toggleHUD: () => void
  customizations: HUDCustomizations
  hudStyle: HUDStyle
  updateCustomization: (key: keyof HUDCustomizations, value: string) => void
  updateHUDStyle: (key: keyof HUDStyle, value: string) => void
}

// Valores por defecto
const defaultCustomizations: HUDCustomizations = {
  cockpitColor: "#1a1a2e",
  frameColor: "#4a4e69",
  consoleColor: "#22d3ee",
  hologramColor: "#ec4899",
  lightColor: "#a855f7",
}

const defaultHUDStyle: HUDStyle = {
  frameStyle: "standard",
  consoleStyle: "basic",
  lightStyle: "standard",
}

// Crear el contexto
const HUDContext = createContext<HUDContextType | undefined>(undefined)

// Proveedor del contexto
export function HUDProvider({ children }: { children: ReactNode }) {
  const [showHUD, setShowHUD] = useState(true)
  const [customizations, setCustomizations] = useState<HUDCustomizations>(defaultCustomizations)
  const [hudStyle, setHUDStyle] = useState<HUDStyle>(defaultHUDStyle)

  // Cargar preferencias guardadas al iniciar
  useEffect(() => {
    const savedShowHUD = localStorage.getItem("showHUD")
    if (savedShowHUD !== null) {
      setShowHUD(savedShowHUD === "true")
    }

    const savedCustomizations = localStorage.getItem("hudCustomizations")
    if (savedCustomizations) {
      try {
        setCustomizations(JSON.parse(savedCustomizations))
      } catch (e) {
        console.error("Error parsing saved HUD customizations", e)
      }
    }

    const savedHUDStyle = localStorage.getItem("hudStyle")
    if (savedHUDStyle) {
      try {
        setHUDStyle(JSON.parse(savedHUDStyle))
      } catch (e) {
        console.error("Error parsing saved HUD style", e)
      }
    }
  }, [])

  // Guardar preferencias cuando cambien
  useEffect(() => {
    localStorage.setItem("showHUD", showHUD.toString())
  }, [showHUD])

  useEffect(() => {
    localStorage.setItem("hudCustomizations", JSON.stringify(customizations))
  }, [customizations])

  useEffect(() => {
    localStorage.setItem("hudStyle", JSON.stringify(hudStyle))
  }, [hudStyle])

  // Función para alternar la visibilidad del HUD
  const toggleHUD = () => {
    setShowHUD((prev) => !prev)
  }

  // Función para actualizar una personalización específica
  const updateCustomization = (key: keyof HUDCustomizations, value: string) => {
    setCustomizations((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Función para actualizar un estilo específico del HUD
  const updateHUDStyle = (key: keyof HUDStyle, value: string) => {
    setHUDStyle((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <HUDContext.Provider
      value={{
        showHUD,
        toggleHUD,
        customizations,
        hudStyle,
        updateCustomization,
        updateHUDStyle,
      }}
    >
      {children}
    </HUDContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useHUD() {
  const context = useContext(HUDContext)
  if (context === undefined) {
    throw new Error("useHUD must be used within a HUDProvider")
  }
  return context
}
