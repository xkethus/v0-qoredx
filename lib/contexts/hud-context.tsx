"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"

// Default values
const DEFAULT_COLORS = {
  cockpitColor: "#1a1a2e",
  frameColor: "#4a4e69",
  consoleColor: "#22d3ee",
  hologramColor: "#ec4899",
  lightColor: "#a855f7",
}

const DEFAULT_STYLES = {
  frameStyle: "standard",
  consoleStyle: "basic",
  lightStyle: "standard",
}

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
const defaultCustomizations: HUDCustomizations = DEFAULT_COLORS
const defaultHUDStyle: HUDStyle = DEFAULT_STYLES

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

  // Simple non-debounced save for boolean value
  useEffect(() => {
    localStorage.setItem("showHUD", showHUD.toString())
  }, [showHUD])

  // Debounced saves for complex objects
  useDebounceEffect(customizations, 300, "hudCustomizations")
  useDebounceEffect(hudStyle, 300, "hudStyle")

  const toggleHUD = useCallback(() => {
    setShowHUD((prev) => !prev)
  }, [])

  const updateCustomization = useCallback((key: keyof HUDCustomizations, value: string) => {
    setCustomizations((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  const updateHUDStyle = useCallback((key: keyof HUDStyle, value: string) => {
    setHUDStyle((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

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

// Debounced localStorage save function
const useDebounceEffect = (value, delay, storageKey) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify(value))
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay, storageKey])
}

// Hook personalizado para usar el contexto
export function useHUD() {
  const context = useContext(HUDContext)
  if (context === undefined) {
    throw new Error("useHUD must be used within a HUDProvider")
  }
  return context
}
