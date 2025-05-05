"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { getContentById, deleteContent } from "@/lib/actions/content-actions"
import { ArrowLeft, Edit, Trash2, FileText, Video, BookOpen, FileQuestion, Eye } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function ContentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)

      try {
        const result = await getContentById(params.id)

        if (result.success) {
          setContent(result.content)
        } else {
          toast({
            title: "Error",
            description: result.error || "No se pudo cargar el contenido",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching content:", error)
        toast({
          title: "Error",
          description: "Ocurrió un error al cargar el contenido",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [params.id, toast])

  // Función para manejar la eliminación del contenido
  const handleDeleteContent = async () => {
    try {
      const result = await deleteContent(params.id)

      if (result.success) {
        toast({
          title: "Contenido eliminado",
          description: "El contenido ha sido eliminado correctamente",
        })

        // Redirigir a la lista de contenidos
        router.push("/dashboard/content")
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
      setDeleteDialogOpen(false)
    }
  }

  // Función para obtener el icono según el tipo de contenido
  const getContentIcon = (type: string) => {
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
  const getContentBadgeClass = (type: string) => {
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

  // Renderizar el contenido según su tipo
  const renderContentPreview = () => {
    if (!content) return null

    switch (content.type) {
      case "document":
        return (
          <div className="p-6 border border-purple-900/50 rounded-md bg-purple-950/10 min-h-[300px]">
            <div className="prose prose-invert max-w-none">
              {typeof content.content === "object" ? (
                <div dangerouslySetInnerHTML={{ __html: content.content.html || "Sin contenido" }} />
              ) : (
                <p>{content.content || "Sin contenido"}</p>
              )}
            </div>
          </div>
        )

      case "video":
        return (
          <div className="space-y-4">
            <div className="relative aspect-video rounded-md overflow-hidden border border-cyan-900/50">
              {content.content?.videoUrl ? (
                <iframe
                  src={content.content.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title={content.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/50">
                  <Video className="h-16 w-16 text-cyan-500 opacity-50" />
                  <p className="absolute bottom-4 text-center w-full text-sm text-muted-foreground">
                    Vista previa no disponible
                  </p>
                </div>
              )}
            </div>

            {content.content?.transcript && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-cyan-300">Transcripción</h3>
                <div className="p-4 border border-cyan-900/50 rounded-md bg-cyan-950/10 max-h-60 overflow-y-auto">
                  <p className="text-sm whitespace-pre-line">{content.content.transcript}</p>
                </div>
              </div>
            )}
          </div>
        )

      case "quiz":
        return (
          <div className="space-y-4">
            {content.content?.questions?.map((question: any, index: number) => (
              <div key={index} className="p-4 border border-amber-900/50 rounded-md bg-amber-950/10">
                <h3 className="text-lg font-medium text-amber-300 mb-2">{question.question}</h3>
                <div className="space-y-2">
                  {question.options?.map((option: string, optIndex: number) => (
                    <div key={optIndex} className="flex items-center space-x-2 p-2 rounded-md hover:bg-amber-900/10">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                          optIndex === question.correctAnswer
                            ? "border-green-500 bg-green-900/20 text-green-300"
                            : "border-amber-900/50"
                        }`}
                      >
                        {optIndex === question.correctAnswer && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className={optIndex === question.correctAnswer ? "text-green-300" : ""}>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {(!content.content?.questions || content.content.questions.length === 0) && (
              <div className="p-6 text-center border border-dashed rounded-md border-amber-900/50">
                <h3 className="text-lg font-medium text-amber-300 mb-1">Sin preguntas</h3>
                <p className="text-sm text-muted-foreground">Este quiz no tiene preguntas configuradas.</p>
              </div>
            )}
          </div>
        )

      case "assignment":
        return (
          <div className="p-6 border border-pink-900/50 rounded-md bg-pink-950/10 min-h-[300px]">
            <div className="prose prose-invert max-w-none">
              {typeof content.content === "object" ? (
                <div dangerouslySetInnerHTML={{ __html: content.content.html || "Sin contenido" }} />
              ) : (
                <p>{content.content || "Sin contenido"}</p>
              )}
            </div>

            {content.content?.dueDate && (
              <div className="mt-4 p-3 border border-pink-900/50 rounded-md bg-pink-900/10">
                <p className="text-sm font-medium text-pink-300">
                  Fecha de entrega: {new Date(content.content.dueDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        )

      default:
        return (
          <div className="p-6 text-center border border-dashed rounded-md border-gray-700">
            <Eye className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium mb-1">Vista previa no disponible</h3>
            <p className="text-sm text-muted-foreground">
              No se puede mostrar una vista previa para este tipo de contenido.
            </p>
          </div>
        )
    }
  }

  return (
    <>
      <DashboardHeader heading={loading ? "Cargando..." : content?.title || "Contenido"} text="Detalles del contenido">
        <div className="flex gap-2">
          <Link href="/dashboard/content">
            <Button variant="outline" className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </Button>
          </Link>
          {!loading && content && (
            <>
              <Link href={`/dashboard/content/${params.id}/edit`}>
                <Button variant="outline" className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20">
                  <Edit className="mr-2 h-4 w-4" /> Editar
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-red-900/50 text-red-300 hover:bg-red-900/20"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
              </Button>
            </>
          )}
        </div>
      </DashboardHeader>

      <DashboardShell>
        {loading ? (
          // Esqueleto de carga
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        ) : content ? (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getContentIcon(content.type)}
                      <CardTitle className="text-xl text-purple-300">{content.title}</CardTitle>
                    </div>
                    <Badge className={`${getContentBadgeClass(content.type)} border`}>
                      {content.type === "document" && "Documento"}
                      {content.type === "video" && "Video"}
                      {content.type === "quiz" && "Quiz"}
                      {content.type === "assignment" && "Tarea"}
                    </Badge>
                  </div>
                  <CardDescription>{content.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">{renderContentPreview()}</CardContent>
              </Card>

              <Tabs defaultValue="metadata" className="space-y-4">
                <TabsList className="bg-black/20 border border-purple-900/50">
                  <TabsTrigger
                    value="metadata"
                    className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
                  >
                    Metadatos
                  </TabsTrigger>
                  <TabsTrigger
                    value="usage"
                    className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
                  >
                    Uso
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="metadata" className="space-y-4">
                  <Card className="border-purple-900/50 bg-black/50">
                    <CardHeader>
                      <CardTitle className="text-lg text-purple-300">Información del Contenido</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                          <p className="font-mono text-xs">{content.id}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Tipo</h3>
                          <p>{content.type}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Creado</h3>
                          <p>{new Date(content.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Actualizado</h3>
                          <p>{new Date(content.updatedAt).toLocaleString()}</p>
                        </div>
                        {content.qerniumId && (
                          <div className="col-span-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Qernium</h3>
                            <p>{content.qerniumTitle || content.qerniumId}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="usage" className="space-y-4">
                  <Card className="border-purple-900/50 bg-black/50">
                    <CardHeader>
                      <CardTitle className="text-lg text-purple-300">Uso del Contenido</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-muted-foreground py-8">
                        Las estadísticas de uso estarán disponibles próximamente.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-4">
              <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-300">Acciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href={`/dashboard/content/${params.id}/edit`}>
                    <Button className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600">
                      <Edit className="mr-2 h-4 w-4" /> Editar Contenido
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="w-full border-red-900/50 text-red-300 hover:bg-red-900/20"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar Contenido
                  </Button>
                </CardContent>
              </Card>

              {content.qerniumId && (
                <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-300">Qernium Asociado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/dashboard/qerniums/${content.qerniumId}`}>
                      <Button
                        variant="outline"
                        className="w-full border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                      >
                        <Eye className="mr-2 h-4 w-4" /> Ver Qernium
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          // Mensaje cuando no se encuentra el contenido
          <div className="p-8 text-center border border-dashed rounded-md border-purple-900/50">
            <h3 className="text-lg font-medium text-purple-300 mb-1">Contenido no encontrado</h3>
            <p className="text-sm text-muted-foreground mb-4">
              El contenido que estás buscando no existe o ha sido eliminado.
            </p>
            <Link href="/dashboard/content">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Contenidos
              </Button>
            </Link>
          </div>
        )}
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
