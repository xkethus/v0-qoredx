"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FileText, Search, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ContentCreationModal } from "@/components/content-creation-modal"
import { ContentSearchWizard } from "@/components/content-search-wizard"

export default function AddContentPage() {
  const { toast } = useToast()
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)

  // Función para manejar la creación de contenido
  const handleContentSave = (content: any) => {
    console.log("Contenido guardado:", content)
    toast({
      title: "Contenido creado",
      description: "El contenido ha sido creado exitosamente",
    })
  }

  // Función para manejar la selección de contenido existente
  const handleContentSelect = (content: any, action: "clone" | "view") => {
    console.log(`Contenido ${action === "clone" ? "clonado" : "visualizado"}:`, content)
    toast({
      title: action === "clone" ? "Contenido clonado" : "Contenido abierto",
      description: `Has ${action === "clone" ? "clonado" : "abierto"} "${content.title}"`,
    })
  }

  return (
    <>
      <DashboardHeader heading="Contenido" text="Crea o busca contenido para tus cursos"></DashboardHeader>
      <DashboardShell>
        <div className="grid gap-4 md:grid-cols-2">
          <Card
            className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)] hover:bg-purple-900/10 transition-colors cursor-pointer"
            onClick={() => setIsCreationModalOpen(true)}
          >
            <CardHeader>
              <CardTitle className="text-xl text-purple-300 flex items-center">
                <Plus className="mr-2 h-5 w-5" /> Crear Nuevo Contenido
              </CardTitle>
              <CardDescription>Crea contenido desde cero</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-purple-900/20 p-4 rounded-full mb-4">
                  <FileText className="h-10 w-10 text-purple-300" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Crea nuevo contenido de texto, video, documentos o enlaces para tus cursos.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)] hover:bg-purple-900/10 transition-colors cursor-pointer"
            onClick={() => setShowSearchModal(true)}
          >
            <CardHeader>
              <CardTitle className="text-xl text-purple-300 flex items-center">
                <Search className="mr-2 h-5 w-5" /> Buscar Contenido Existente
              </CardTitle>
              <CardDescription>Encuentra y reutiliza contenido</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-purple-900/20 p-4 rounded-full mb-4">
                  <Search className="h-10 w-10 text-purple-300" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Busca, visualiza, edita o clona contenido que ya has creado para reutilizarlo.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>

      {/* Modal de creación de contenido */}
      <ContentCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onSave={handleContentSave}
      />

      {/* Modal para buscar contenido existente */}
      {showSearchModal && (
        <ContentSearchWizard
          isOpen={showSearchModal}
          onClose={() => setShowSearchModal(false)}
          onSelect={(content, action) => {
            if (action === "clone") {
              toast({
                title: "Contenido clonado",
                description: `Has clonado "${content.title}"`,
              })
            } else if (action === "view") {
              toast({
                title: "Abriendo contenido",
                description: `Abriendo "${content.title}" para edición`,
              })
            }
            setShowSearchModal(false)
          }}
        />
      )}
    </>
  )
}
