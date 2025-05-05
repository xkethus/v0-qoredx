"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { getAllContents, type ContentType, deleteContent } from "@/lib/actions/content-actions"
import { FileText, Video, BookOpen, FileQuestion, Plus, Search, Filter, Trash2, Edit, Eye } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Content {
  id: string
  title: string
  description: string
  type: ContentType
  coverImage?: string
  qerniumId?: string
  qerniumTitle?: string
  createdAt: string
}

export default function ContentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Estados para la gestión de contenidos
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [contentType, setContentType] = useState<string>("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [contentToDelete, setContentToDelete] = useState<string | null>(null)

  // Cargar contenidos al montar el componente o cuando cambian los filtros
  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true)

      try {
        // Determinar el tipo de contenido según la pestaña activa
        const typeFilter = activeTab !== "all" ? activeTab : contentType

        const result = await getAllContents({
          page: currentPage,
          limit: 10,
          search: searchTerm,
          type: typeFilter,
          orderBy: "created_at",
          orderDirection: "desc",
        })

        if (result.success) {
          setContents(result.contents)
          setTotalPages(result.pagination.totalPages)
        } else {
          toast({
            title: "Error",
            description: result.error || "No se pudieron cargar los contenidos",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching contents:", error)
        toast({
          title: "Error",
          description: "Ocurrió un error al cargar los contenidos",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchContents()
  }, [currentPage, searchTerm, contentType, activeTab, toast])

  // Función para obtener el icono según el tipo de contenido
  const getContentIcon = (type: ContentType) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-purple-300" />
      case "video":
        return <Video className="h-5 w-5 text-cyan-300" />
      case "quiz":
        return <FileQuestion className="h-5 w-5 text-amber-300" />
      case "assignment":
        return <BookOpen className="h-5 w-5 text-pink-300" />
      default:
        return <FileText className="h-5 w-5 text-gray-300" />
    }
  }

  // Función para obtener la clase de la insignia según el tipo de contenido
  const getContentBadgeClass = (type: ContentType) => {
    switch (type) {
      case "document":
        return "bg-purple-900/30 text-purple-300 border-purple-900/50"
      case "video":
        return "bg-cyan-900/30 text-cyan-300 border-cyan-900/50"
      case "quiz":
        return "bg-amber-900/30 text-amber-300 border-amber-900/50"
      case "assignment":
        return "bg-pink-900/30 text-pink-300 border-pink-900/50"
      default:
        return "bg-gray-900/30 text-gray-300 border-gray-700/50"
    }
  }

  // Función para manejar la eliminación de un contenido
  const handleDeleteContent = async () => {
    if (!contentToDelete) return

    try {
      const result = await deleteContent(contentToDelete)

      if (result.success) {
        toast({
          title: "Contenido eliminado",
          description: "El contenido ha sido eliminado correctamente",
        })

        // Actualizar la lista de contenidos
        setContents(contents.filter((content) => content.id !== contentToDelete))
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo eliminar el contenido",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting content:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al eliminar el contenido",
        variant: "destructive",
      })
    } finally {
      setContentToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  // Función para confirmar la eliminación de un contenido
  const confirmDelete = (contentId: string) => {
    setContentToDelete(contentId)
    setDeleteDialogOpen(true)
  }

  return (
    <>
      <DashboardHeader heading="Gestión de Contenidos" text="Crea, edita y organiza tus recursos educativos">
        <Link href="/dashboard/content/create">
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
            <Plus className="mr-2 h-4 w-4" /> Crear Contenido
          </Button>
        </Link>
      </DashboardHeader>

      <DashboardShell>
        <div className="space-y-4">
          {/* Barra de búsqueda y filtros */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar contenido..."
                className="pl-8 border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* Panel de filtros */}
          {showFilters && (
            <Card className="border-purple-900/50 bg-black/50">
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo de Contenido</label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger className="border-purple-900/50 bg-black/70 focus:ring-purple-500">
                        <SelectValue placeholder="Todos los tipos" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-purple-900/50">
                        <SelectItem value="all">Todos los tipos</SelectItem>
                        <SelectItem value="document">Documento</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="assignment">Tarea</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pestañas para filtrar por tipo de contenido */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-black/20 border border-purple-900/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="document"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                <FileText className="h-4 w-4 mr-2" />
                Documentos
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
              >
                <Video className="h-4 w-4 mr-2" />
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="quiz"
                className="data-[state=active]:bg-amber-900/20 data-[state=active]:text-amber-300"
              >
                <FileQuestion className="h-4 w-4 mr-2" />
                Quizzes
              </TabsTrigger>
              <TabsTrigger
                value="assignment"
                className="data-[state=active]:bg-pink-900/20 data-[state=active]:text-pink-300"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Tareas
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0 space-y-4">
              {/* Lista de contenidos */}
              {loading ? (
                // Esqueletos de carga
                <div className="space-y-3">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="p-4 border border-purple-900/50 rounded-md bg-black/50">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-6 w-6 rounded-full" />
                          <Skeleton className="h-6 w-40" />
                        </div>
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <Skeleton className="h-4 w-full mt-2" />
                      <div className="flex justify-between items-center mt-4">
                        <Skeleton className="h-4 w-24" />
                        <div className="flex gap-2">
                          <Skeleton className="h-8 w-8 rounded-md" />
                          <Skeleton className="h-8 w-8 rounded-md" />
                          <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : contents.length === 0 ? (
                // Mensaje cuando no hay contenidos
                <div className="p-8 text-center border border-dashed rounded-md border-purple-900/50">
                  <Search className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium text-purple-300 mb-1">No se encontraron contenidos</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm
                      ? "Intenta con otros términos de búsqueda o cambia los filtros."
                      : "Comienza creando tu primer contenido."}
                  </p>
                  {!searchTerm && (
                    <Link href="/dashboard/content/create">
                      <Button className="mt-4 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
                        <Plus className="mr-2 h-4 w-4" /> Crear Contenido
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                // Lista de contenidos
                <div className="space-y-3">
                  {contents.map((content) => (
                    <Card
                      key={content.id}
                      className="border-purple-900/50 bg-black/50 hover:bg-purple-900/10 transition-colors"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            {getContentIcon(content.type as ContentType)}
                            <CardTitle className="text-lg text-purple-300">{content.title}</CardTitle>
                          </div>
                          <Badge className={`${getContentBadgeClass(content.type as ContentType)} border`}>
                            {content.type === "document" && "Documento"}
                            {content.type === "video" && "Video"}
                            {content.type === "quiz" && "Quiz"}
                            {content.type === "assignment" && "Tarea"}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">{content.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between pt-2">
                        <div className="text-xs text-muted-foreground">
                          {content.qerniumTitle ? (
                            <span>Qernium: {content.qerniumTitle}</span>
                          ) : (
                            <span>Creado: {new Date(content.createdAt).toLocaleDateString()}</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                            onClick={() => router.push(`/dashboard/content/${content.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                            onClick={() => router.push(`/dashboard/content/${content.id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 border-amber-900/50 text-amber-300 hover:bg-amber-900/20"
                            onClick={() => confirmDelete(content.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}

              {/* Paginación */}
              {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DashboardShell>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-black/90 border-red-900/50">
          <DialogHeader>
            <DialogTitle className="text-xl text-red-300">Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este contenido? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-gray-700 hover:bg-gray-900/20"
            >
              Cancelar
            </Button>
            <Button onClick={handleDeleteContent} className="bg-red-600 hover:bg-red-700 text-white">
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
