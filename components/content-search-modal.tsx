"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, FileText, Video, Code, BookOpen, Copy, Eye, Loader2, TelescopeIcon as Binoculars } from "lucide-react"
import { searchContent } from "@/lib/actions/content-actions"
import { useToast } from "@/components/ui/use-toast"

export type ContentSearchResult = {
  id: string
  title: string
  description: string
  type: "document" | "video" | "quiz" | "assignment"
  createdAt: string
  creatorName: string
  courseName: string
  moduleId: string
}

interface ContentSearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectContent: (content: ContentSearchResult) => void
}

export default function ContentSearchModal({ open, onOpenChange, onSelectContent }: ContentSearchModalProps) {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("title")
  const [courseFilter, setCourseFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [results, setResults] = useState<ContentSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedContent, setSelectedContent] = useState<ContentSearchResult | null>(null)

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un término de búsqueda",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const searchResults = await searchContent({
        term: searchTerm,
        type: searchType as "title" | "id" | "creator" | "course",
        courseFilter: courseFilter !== "all" ? courseFilter : undefined,
        typeFilter: typeFilter !== "all" ? (typeFilter as any) : undefined,
      })

      if (searchResults.success) {
        setResults(searchResults.content)
        if (searchResults.content.length === 0) {
          toast({
            title: "Sin resultados",
            description: "No se encontraron contenidos que coincidan con tu búsqueda",
          })
        }
      } else {
        toast({
          title: "Error",
          description: searchResults.error || "Error al buscar contenido",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error searching content:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al buscar contenido",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleSelectContent = (content: ContentSearchResult) => {
    setSelectedContent(content)
  }

  const handleCloneContent = () => {
    if (selectedContent) {
      onSelectContent(selectedContent)
      onOpenChange(false)
      toast({
        title: "Contenido seleccionado",
        description: `Has seleccionado "${selectedContent.title}" para clonar`,
      })
    }
  }

  const handleViewContent = () => {
    if (selectedContent) {
      // En una implementación real, esto abriría el contenido en una nueva pestaña
      window.open(`/dashboard/courses/content/${selectedContent.id}`, "_blank")
      toast({
        title: "Visualizando contenido",
        description: `Abriendo "${selectedContent.title}" en una nueva pestaña`,
      })
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-purple-400" />
      case "video":
        return <Video className="h-5 w-5 text-cyan-400" />
      case "quiz":
        return <Code className="h-5 w-5 text-pink-400" />
      case "assignment":
        return <BookOpen className="h-5 w-5 text-amber-400" />
      default:
        return <FileText className="h-5 w-5 text-purple-400" />
    }
  }

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "document":
        return "border-purple-900/50 text-purple-300"
      case "video":
        return "border-cyan-900/50 text-cyan-300"
      case "quiz":
        return "border-pink-900/50 text-pink-300"
      case "assignment":
        return "border-amber-900/50 text-amber-300"
      default:
        return "border-purple-900/50 text-purple-300"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border-cyan-900/50 max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-cyan-300 flex items-center gap-2">
            <Binoculars className="h-5 w-5" /> Buscador de Contenido
          </DialogTitle>
          <DialogDescription>
            Busca contenido existente para visualizar o clonar en tu nuevo contenido
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Buscar contenido..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-600"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                Buscar
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="border-cyan-900/50 bg-black/50 focus:ring-cyan-500">
                <SelectValue placeholder="Buscar por" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-cyan-900/50">
                <SelectItem value="title">Título</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="creator">Creador</SelectItem>
                <SelectItem value="course">Curso</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <div className="md:col-span-2">
            <Tabs defaultValue="results" className="w-full">
              <TabsList className="bg-black/20 border border-cyan-900/50 w-full">
                <TabsTrigger
                  value="results"
                  className="flex-1 data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                >
                  Resultados ({results.length})
                </TabsTrigger>
                <TabsTrigger
                  value="selected"
                  className="flex-1 data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                  disabled={!selectedContent}
                >
                  Seleccionado
                </TabsTrigger>
              </TabsList>

              <TabsContent value="results" className="mt-2 max-h-[50vh] overflow-y-auto pr-2">
                {results.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    {isLoading ? "Buscando..." : "No hay resultados para mostrar"}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {results.map((content) => (
                      <Card
                        key={content.id}
                        className={`border-cyan-900/50 bg-black/50 backdrop-blur-sm hover:bg-cyan-950/10 transition-colors cursor-pointer ${
                          selectedContent?.id === content.id ? "ring-2 ring-cyan-500" : ""
                        }`}
                        onClick={() => handleSelectContent(content)}
                      >
                        <CardContent className="p-3 flex gap-3">
                          <div className="w-[56px] h-[56px] bg-black/50 rounded flex items-center justify-center flex-shrink-0">
                            {getTypeIcon(content.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-sm">{content.title}</h4>
                              <Badge variant="outline" className={getTypeBadgeClass(content.type)}>
                                <span className="text-xs capitalize">{content.type}</span>
                              </Badge>
                            </div>
                            {content.description && (
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{content.description}</p>
                            )}
                            <div className="flex gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                Curso: {content.courseName || "Sin curso"}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Creador: {content.creatorName || "Desconocido"}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="selected" className="mt-2">
                {selectedContent ? (
                  <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-[80px] h-[80px] bg-black/50 rounded flex items-center justify-center flex-shrink-0">
                          {getTypeIcon(selectedContent.type)}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-medium text-cyan-300">{selectedContent.title}</h3>
                            <Badge variant="outline" className={getTypeBadgeClass(selectedContent.type)}>
                              <span className="capitalize">{selectedContent.type}</span>
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mt-2">{selectedContent.description}</p>

                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <h4 className="text-xs font-medium text-muted-foreground">ID</h4>
                              <p className="text-sm">{selectedContent.id}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-muted-foreground">Fecha de Creación</h4>
                              <p className="text-sm">
                                {new Date(selectedContent.createdAt).toLocaleDateString("es-ES")}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-muted-foreground">Curso</h4>
                              <p className="text-sm">{selectedContent.courseName || "Sin curso"}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-muted-foreground">Creador</h4>
                              <p className="text-sm">{selectedContent.creatorName || "Desconocido"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No hay contenido seleccionado</div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Filtrar por Curso</label>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="border-cyan-900/50 bg-black/50 focus:ring-cyan-500">
                  <SelectValue placeholder="Todos los cursos" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-cyan-900/50">
                  <SelectItem value="all">Todos los cursos</SelectItem>
                  <SelectItem value="quantum-physics">Física Cuántica 101</SelectItem>
                  <SelectItem value="space-exploration">Exploración Espacial</SelectItem>
                  <SelectItem value="ai-ethics">Ética de la IA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Filtrar por Tipo</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="border-cyan-900/50 bg-black/50 focus:ring-cyan-500">
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-cyan-900/50">
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="document">Documento</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="assignment">Tarea</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 space-y-2">
              <Button
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-500 hover:from-cyan-700 hover:to-blue-600"
                onClick={handleCloneContent}
                disabled={!selectedContent}
              >
                <Copy className="mr-2 h-4 w-4" /> Clonar Contenido
              </Button>
              <Button
                variant="outline"
                className="w-full border-cyan-900/50 text-cyan-300 hover:bg-cyan-950/20"
                onClick={handleViewContent}
                disabled={!selectedContent}
              >
                <Eye className="mr-2 h-4 w-4" /> Visualizar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
