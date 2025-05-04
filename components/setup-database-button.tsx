"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SetupDatabaseButton() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSetupDatabase = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/setup-db")
      const data = await response.json()

      if (data.success) {
        toast({
          title: "Base de datos configurada",
          description: data.message,
          variant: "default",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Ocurrió un error al configurar la base de datos",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al configurar la base de datos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSetupDatabase} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Configurando...
        </>
      ) : (
        "Configurar Base de Datos"
      )}
    </Button>
  )
}
