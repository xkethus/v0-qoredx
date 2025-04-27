"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon, X, Upload } from "lucide-react"
import Image from "next/image"

interface CoverImageUploadProps {
  initialImage: string | null
  onImageChange: (imageUrl: string | null) => void
  aspectRatio?: "landscape" | "square" | "wide"
}

export function CoverImageUpload({ initialImage, onImageChange, aspectRatio = "landscape" }: CoverImageUploadProps) {
  const [image, setImage] = useState<string | null>(initialImage)
  const [isUploading, setIsUploading] = useState(false)

  // Determinar la altura según la relación de aspecto
  const getHeightClass = () => {
    switch (aspectRatio) {
      case "landscape":
        return "h-48" // 16:9 aproximadamente
      case "square":
        return "h-64" // 1:1 aproximadamente
      case "wide":
        return "h-32" // 21:9 aproximadamente
      default:
        return "h-48"
    }
  }

  // Función para manejar la carga de imagen
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        // En un entorno real, aquí subiríamos la imagen a un servidor
        // y obtendríamos la URL de la imagen subida
        const imageUrl = reader.result as string
        setImage(imageUrl)
        onImageChange(imageUrl)
        setIsUploading(false)
      }

      reader.readAsDataURL(file)
    }
  }

  // Función para eliminar la imagen
  const handleRemoveImage = () => {
    setImage(null)
    onImageChange(null)
  }

  return (
    <div className="space-y-2">
      {!image ? (
        <div className={`w-full ${getHeightClass()} relative`}>
          <label
            htmlFor="cover-image-upload"
            className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer border-purple-900/50 bg-black/30 hover:bg-purple-900/10"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-300 border-t-transparent"></div>
              ) : (
                <>
                  <ImageIcon className="w-10 h-10 mb-3 text-purple-300" />
                  <p className="mb-2 text-sm text-gray-300">
                    <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG, WebP (Recomendado: 1200x600px)</p>
                </>
              )}
            </div>
            <input
              id="cover-image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      ) : (
        <div className={`w-full ${getHeightClass()} relative rounded-lg overflow-hidden`}>
          <Image src={image || "/placeholder.svg"} alt="Cover image" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              size="icon"
              variant="destructive"
              className="h-8 w-8 rounded-full bg-red-600/80 hover:bg-red-700"
              onClick={handleRemoveImage}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Eliminar imagen</span>
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
              onClick={() => document.getElementById("cover-image-upload")?.click()}
            >
              <Upload className="h-4 w-4" />
              <span className="sr-only">Cambiar imagen</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
