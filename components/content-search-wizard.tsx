"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Video, BookOpen, LinkIcon, Search, Filter, Copy, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface ContentSearchWizardProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (content: any, action: "clone" | "view") => void
}

export function ContentSearchWizard({ isOpen, onClose, onSelect }: ContentSearchWizardProps) {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedContent, setSelectedContent] = useState<any>(null)

  // Mock data para contenidos
  const mockContents = [
    {
      id: "1",
      title: "Introducción a la Física Cuántica",
      description: "Una introducción a los conceptos básicos de la física cuántica",
      type: "text",
      createdAt: "2023-05-15T10:30:00Z",
      author: "Dr. Juan Pérez",
    },
    {
      id: "2",
      title: "Tutorial: Ecuaciones Diferenciales",
      description: "Video explicativo sobre cómo resolver ecuaciones diferenciales de primer orden",
      type: "video",
      createdAt: "2023-06-20T14:45:00Z",
      author: "Dra. María González",
    },
    {
      id: "3",
      title: "Guía de Estudio: Cálculo Integral",
      description: "Documento PDF con ejercicios y teoría sobre cálculo integral",
      type: "document",
      createdAt: "2023-04-10T09:15:00Z",
      author: "Prof. Carlos Rodríguez",
    },
    {
      id: "4",
      title: "Recursos de Khan Academy",
      description: "Enlaces a recursos educativos de Khan Academy sobre álgebra",
      type: "link",
      createdAt: "2023-07-05T16:20:00Z",
      author: "Lic. Ana Martínez",
    },
    {
      id: "5",
      title: "Teoría de la Relatividad",
      description: "Explicación detallada de la teoría de la relatividad de Einstein",
      type: "text",
      createdAt: "2023-03-25T11:10:00Z",
      author: "Dr. Roberto Sánchez",
    },
  ]

  // Filtrar contenidos según la pestaña activa y la búsqueda
  const filteredContents = mockContents
    .filter((content) => {
      if (activeTab === "all") return true
      return content.type === activeTab
    })
    .filter((content) => {
      if (!searchQuery) return true
      return (
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  // Ordenar contenidos
  const sortedContents = [...filteredContents].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  // Función para obtener el icono según el tipo de contenido
  const getContentIcon = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="h-4 w-4 text-purple-300" />
      case "video":
        return <Video className="h-4 w-4 text-cyan-300" />
      case "document":
        return <BookOpen className="h-4 w-4 text-amber-300" />
      case "link":
        return <LinkIcon className="h-4 w-4 text-pink-300" />
      default:
        return <FileText className="h-4 w-4 text-gray-300" />
    }
  }

  // Función para obtener el color de la insignia según el tipo de contenido
  const getContentBadgeClass = (type: string) => {
    switch (type) {
      case "text":
        return "bg-purple-900/30 text-purple-300 border-purple-900/50"
      case "video":
        return "bg-cyan-900/30 text-cyan-300 border-cyan-900/50"
      case "document":
        return "bg-amber-900/30 text-amber-300 border-amber-900/50"
      case "link":
        return "bg-pink-900/30 text-pink-300 border-pink-900/50"
      default:
        return "bg-gray-900/30 text-gray-300 border-gray-700/50"
    }
  }

  // Función para manejar la selección de contenido
  const handleContentSelect = (content: any) => {
    setSelectedContent(content)
  }

  // Función para clonar el contenido seleccionado
  const handleClone = () => {
    if (!selectedContent) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un contenido primero",
        variant: "destructive",
      })
      return
    }

    onSelect(selectedContent, "clone")
    toast({
      title: "Contenido clonado",
      description: `Has clonado "${selectedContent.title}"`,
    })
    onClose()
  }

  // Función para ver el contenido seleccionado
  const handleView = () => {
    if (!selectedContent) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un contenido primero",
        variant: "destructive",
      })
      return
    }

    onSelect(selectedContent, "view")
    toast({
      title: "Abriendo contenido",
      description: `Abriendo "${selectedContent.title}" para edición`,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-black/90 border-purple-900/50">
        <DialogHeader>
          <DialogTitle className="text-xl text-purple-300">Buscar Contenido</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título o descripción..."
                className="pl-8 border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="border-purple-900/50 bg-black/50 hover:bg-purple-900/20"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <div className="p-3 border border-purple-900/50 rounded-md bg-black/50 space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="sort-by" className="min-w-[80px]">
                  Ordenar por:
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-by" className="border-purple-900/50 bg-black/70 focus:ring-purple-500">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-purple-900/50">
                    <SelectItem value="recent">Más recientes</SelectItem>
                    <SelectItem value="oldest">Más antiguos</SelectItem>
                    <SelectItem value="alphabetical">Alfabético</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-black/20 border border-purple-900/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                <FileText className="h-4 w-4 mr-2" />
                Textos
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                <Video className="h-4 w-4 mr-2" />
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="document"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Documentos
              </TabsTrigger>
              <TabsTrigger
                value="link"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                Enlaces
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <ScrollArea className="h-[400px] pr-4">
                {sortedContents.length === 0 ? (
                  <div className="p-8 text-center border border-dashed rounded-md border-purple-900/50">
                    <Search className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium text-purple-300 mb-1">No se encontraron resultados</h3>
                    <p className="text-sm text-muted-foreground">
                      Intenta con otros términos de búsqueda o cambia los filtros.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sortedContents.map((content) => (
                      <div
                        key={content.id}
                        className={`p-3 border rounded-md bg-black/50 hover:bg-purple-900/10 cursor-pointer transition-colors ${
                          selectedContent?.id === content.id
                            ? "border-purple-500 bg-purple-900/20"
                            : "border-purple-900/50"
                        }`}
                        onClick={() => handleContentSelect(content)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            {getContentIcon(content.type)}
                            <h3 className="font-medium text-purple-300">{content.title}</h3>
                          </div>
                          <Badge className={`${getContentBadgeClass(content.type)} border`}>
                            {content.type === "text" && "Texto"}
                            {content.type === "video" && "Video"}
                            {content.type === "document" && "Documento"}
                            {content.type === "link" && "Enlace"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{content.description}</p>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>{content.author}</span>
                          <span>{new Date(content.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose} className="border-purple-900/50 hover:bg-purple-900/20">
            Cancelar
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleView}
              disabled={!selectedContent}
              className="border-cyan-900/50 hover:bg-cyan-900/20 text-cyan-300"
            >
              <Eye className="mr-2 h-4 w-4" /> Ver / Editar
            </Button>
            <Button
              onClick={handleClone}
              disabled={!selectedContent}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
            >
              <Copy className="mr-2 h-4 w-4" /> Clonar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
