"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Palette, Rocket, Monitor, RockingChairIcon as Chair, Lightbulb, Shield } from "lucide-react"

// Tipos de assets disponibles para personalizar la cabina
const assetCategories = [
  { id: "seats", name: "Asientos", icon: <Chair className="h-4 w-4" /> },
  { id: "consoles", name: "Consolas", icon: <Monitor className="h-4 w-4" /> },
  { id: "lights", name: "Iluminación", icon: <Lightbulb className="h-4 w-4" /> },
  { id: "shields", name: "Escudos", icon: <Shield className="h-4 w-4" /> },
  { id: "engines", name: "Motores", icon: <Rocket className="h-4 w-4" /> },
]

// Assets disponibles por categoría
const availableAssets = {
  seats: [
    { id: "seat-1", name: "Asiento Estándar", thumbnail: "/standard-seat.png", model: "standard" },
    { id: "seat-2", name: "Asiento Deportivo", thumbnail: "/asiento-deportivo.png", model: "sport" },
    { id: "seat-3", name: "Asiento Capitán", thumbnail: "/asiento-capitan.png", model: "captain" },
    { id: "seat-4", name: "Asiento Futurista", thumbnail: "/futuristic-seat.png", model: "future" },
  ],
  consoles: [
    { id: "console-1", name: "Consola Básica", thumbnail: "/basic-console.png", model: "basic" },
    {
      id: "console-2",
      name: "Consola Táctil",
      thumbnail: "/placeholder.svg?height=80&width=80&query=consola+táctil",
      model: "touch",
    },
    {
      id: "console-3",
      name: "Consola Holográfica",
      thumbnail: "/placeholder.svg?height=80&width=80&query=consola+holográfica",
      model: "hologram",
    },
    {
      id: "console-4",
      name: "Consola Militar",
      thumbnail: "/placeholder.svg?height=80&width=80&query=consola+militar",
      model: "military",
    },
  ],
  lights: [
    {
      id: "light-1",
      name: "Luces Estándar",
      thumbnail: "/placeholder.svg?height=80&width=80&query=luces+estándar",
      model: "standard",
    },
    {
      id: "light-2",
      name: "Luces Ambientales",
      thumbnail: "/placeholder.svg?height=80&width=80&query=luces+ambientales",
      model: "ambient",
    },
    {
      id: "light-3",
      name: "Luces Neón",
      thumbnail: "/placeholder.svg?height=80&width=80&query=luces+neón",
      model: "neon",
    },
    {
      id: "light-4",
      name: "Luces Pulsantes",
      thumbnail: "/placeholder.svg?height=80&width=80&query=luces+pulsantes",
      model: "pulse",
    },
  ],
  shields: [
    {
      id: "shield-1",
      name: "Escudo Básico",
      thumbnail: "/placeholder.svg?height=80&width=80&query=escudo+básico",
      model: "basic",
    },
    {
      id: "shield-2",
      name: "Escudo Energético",
      thumbnail: "/placeholder.svg?height=80&width=80&query=escudo+energético",
      model: "energy",
    },
    {
      id: "shield-3",
      name: "Escudo Hexagonal",
      thumbnail: "/placeholder.svg?height=80&width=80&query=escudo+hexagonal",
      model: "hex",
    },
    {
      id: "shield-4",
      name: "Escudo Burbuja",
      thumbnail: "/placeholder.svg?height=80&width=80&query=escudo+burbuja",
      model: "bubble",
    },
  ],
  engines: [
    {
      id: "engine-1",
      name: "Motor Estándar",
      thumbnail: "/placeholder.svg?height=80&width=80&query=motor+estándar",
      model: "standard",
    },
    {
      id: "engine-2",
      name: "Motor Iónico",
      thumbnail: "/placeholder.svg?height=80&width=80&query=motor+iónico",
      model: "ion",
    },
    {
      id: "engine-3",
      name: "Motor Warp",
      thumbnail: "/placeholder.svg?height=80&width=80&query=motor+warp",
      model: "warp",
    },
    {
      id: "engine-4",
      name: "Motor Cuántico",
      thumbnail: "/placeholder.svg?height=80&width=80&query=motor+cuántico",
      model: "quantum",
    },
  ],
}

export function CockpitAssetSelector({ onSelectAsset }) {
  const [selectedCategory, setSelectedCategory] = useState("seats")
  const [selectedAssets, setSelectedAssets] = useState({
    seats: "seat-1",
    consoles: "console-1",
    lights: "light-1",
    shields: "shield-1",
    engines: "engine-1",
  })

  const handleAssetSelect = (assetId) => {
    const category = selectedCategory
    const newSelectedAssets = {
      ...selectedAssets,
      [category]: assetId,
    }

    setSelectedAssets(newSelectedAssets)

    // Find the asset model name
    const asset = availableAssets[category].find((a) => a.id === assetId)

    // Call the parent callback with category and model info
    if (asset && onSelectAsset) {
      onSelectAsset(category, asset.model)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="absolute top-4 left-4 z-10 bg-black/50 border-cyan-500/50 text-cyan-300"
        >
          <Settings className="h-4 w-4 mr-2" />
          Personalizar Nave
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gray-900 border-cyan-500 text-white">
        <DialogHeader>
          <DialogTitle className="text-cyan-300 flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Personalización de Cabina
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="seats" value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-5 bg-gray-800">
            {assetCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-cyan-900 data-[state=active]:text-cyan-300"
              >
                {category.icon}
                <span className="ml-2 hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {assetCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableAssets[category.id].map((asset) => (
                  <div
                    key={asset.id}
                    className={`p-2 rounded-lg cursor-pointer transition-all hover:bg-gray-800 ${selectedAssets[category.id] === asset.id ? "bg-cyan-900/30 border border-cyan-500" : "bg-gray-800/50"}`}
                    onClick={() => handleAssetSelect(asset.id)}
                  >
                    <div className="aspect-square rounded overflow-hidden mb-2">
                      <img
                        src={asset.thumbnail || "/placeholder.svg"}
                        alt={asset.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-center font-medium">{asset.name}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-4 text-xs text-gray-400">Los cambios se aplican automáticamente a tu cabina de control.</div>
      </DialogContent>
    </Dialog>
  )
}
