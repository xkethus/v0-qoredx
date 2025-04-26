"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, FileText, Video, BookOpen, Code } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Tipos para el contenido
export interface ContentReference {
  id: string
  title: string
  type: "document" | "video" | "quiz" | "assignment"
  description?: string
  moduleId?: string
  moduleName?: string
  courseName?: string
  thumbnailUrl?: string
}

interface ContentReferenceSelectorProps {
  onSelect: (content: ContentReference) => void
  selectedContentId?: string
}

export default function ContentReferenceSelector({ onSelect, selectedContentId }: ContentReferenceSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [contentType, setContentType] = useState<string>("all")
  const [contents, setContents] = useState<ContentReference[]>([])
  const [loading, setLoading] = useState(true)

  // Simular la carga de contenido
  // En una implementación real, esto vendría de una llamada a la API
  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      // Datos de ejemplo
      const mockContents: ContentReference[] = [
        {
          id: "1",
          title: "Introducción a la Física Espacial",
          type: "document",
          description: "Conceptos básicos de física aplicados al espacio",
          moduleId: "mod1",
          moduleName: "Fundamentos",
          courseName: "Exploración Espacial",
          thumbnailUrl: "/placeholder.svg?height=100&width=200",
        },
        {
          id: "2",
          title: "Tutorial de Navegación Estelar",
          type: "video",
          description: "Aprende a navegar usando las estrellas como guía",
          moduleId: "mod2",
          moduleName: "Navegación",
          courseName: "Exploración Espacial",
          thumbnailUrl: "/placeholder.svg?height=100&width=200",
        },
        {
          id: "3",
          title: "Evaluación de Sistemas de Propulsión",
          type: "quiz",
          description: "Test sobre diferentes sistemas de propulsión espacial",
          moduleId: "mod3",
          moduleName: "Propulsión",
          courseName: "Ingeniería Espacial",
          thumbnailUrl: "/placeholder.svg?height=100&width=200",
        },
        {
          id: "4",
          title: "Diseño de Hábitats Espaciales",
          type: "assignment",
          description: "Proyecto para diseñar un hábitat espacial funcional",
          moduleId: "mod4",
          moduleName: "Hábitats",
          courseName: "Arquitectura Espacial",
          thumbnailUrl: "/placeholder.svg?height=100&width=200",
        },
      ]

      setContents(mockContents)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filtrar contenido basado en búsqueda y tipo
  const filteredContents = contents.filter((content) => {
    const matchesSearch =
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (content.description && content.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = contentType === "all" || content.type === contentType

    return matchesSearch && matchesType
  })

  // Renderizar icono según el tipo de contenido
  const getContentIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4 text-purple-400" />
      case "video":
        return <Video className="h-4 w-4 text-cyan-400" />
      case "quiz":
        return <Code className="h-4 w-4 text-pink-400" />
      case "assignment":
        return <BookOpen className="h-4 w-4 text-amber-400" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
      <CardContent className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar contenido..."
              className="pl-8 border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger className="w-[180px] border-cyan-900/50 bg-black/50 focus:ring-cyan-500">
              <SelectValue placeholder="Tipo de contenido" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-cyan-900/50">
              <SelectItem value="all">Todos los tipos</SelectItem>
              <SelectItem value="document">Documentos</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="quiz">Quizzes</SelectItem>
              <SelectItem value="assignment">Tareas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-[300px] overflow-y-auto space-y-2 pr-2">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent"></div>
            </div>
          ) : filteredContents.length > 0 ? (
            filteredContents.map((content) => (
              <div
                key={content.id}
                className={`p-3 border rounded-md flex gap-3 cursor-pointer transition-colors ${
                  selectedContentId === content.id
                    ? "border-cyan-500 bg-cyan-950/30"
                    : "border-cyan-900/50 hover:bg-cyan-950/20"
                }`}
                onClick={() => onSelect(content)}
              >
                {content.type === "video" ? (
                  <div className="w-[100px] h-[56px] bg-black/50 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={content.thumbnailUrl || "/placeholder.svg?height=100&width=200"}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-[56px] h-[56px] bg-black/50 rounded flex items-center justify-center flex-shrink-0">
                    {getContentIcon(content.type)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm truncate">{content.title}</h4>
                    <Badge
                      variant="outline"
                      className={`ml-2 flex-shrink-0 ${
                        content.type === "document"
                          ? "border-purple-900/50 text-purple-300"
                          : content.type === "video"
                            ? "border-cyan-900/50 text-cyan-300"
                            : content.type === "quiz"
                              ? "border-pink-900/50 text-pink-300"
                              : "border-amber-900/50 text-amber-300"
                      }`}
                    >
                      {getContentIcon(content.type)}
                      <span className="ml-1 text-xs capitalize">{content.type}</span>
                    </Badge>
                  </div>
                  {content.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{content.description}</p>
                  )}
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <span className="truncate">
                      {content.courseName} &gt; {content.moduleName}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <Search className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No se encontraron resultados para "{searchTerm}"</p>
              <p className="text-xs text-muted-foreground mt-1">Intenta con otros términos o cambia el filtro</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
