"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { getContentById, updateContent, type ContentType, checkContentExists } from "@/lib/actions/content-actions"
import { ArrowLeft, FileText, Video, BookOpen, FileQuestion, Save } from "lucide-react"
import Link from "next/link"
import { SimpleTextEditor } from "@/components/simple-text-editor"

export default function EditContentPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()

  // Estados para el formulario
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [contentType, setContentType] = useState<ContentType>("document")
  const [documentContent, setDocumentContent] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [videoTranscript, setVideoTranscript] = useState("")
  const [quizQuestions, setQuizQuestions] = useState<any[]>([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ])
  const [assignmentContent, setAssignmentContent] = useState("")
  const [assignmentDueDate, setAssignmentDueDate] = useState("")
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Cargar el contenido existente
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)

      try {
        const result = await getContentById(params.id)

        if (result.success) {
          const content = result.content

          // Establecer los valores básicos
          setTitle(content.title)
          setDescription(content.description || "")
          setContentType(content.type as ContentType)

          // Establecer los valores específicos según el tipo
          switch (content.type) {
            case "document":
              setDocumentContent(content.content?.html || "")
              break

            case "video":
              setVideoUrl(content.content?.videoUrl || "")
              setVideoTranscript(content.content?.transcript || "")
              break

            case "quiz":
              if (content.content?.questions && content.content.questions.length > 0) {
                setQuizQuestions(content.content.questions)
              }
              break

            case "assignment":
              setAssignmentContent(content.content?.html || "")
              setAssignmentDueDate(content.content?.dueDate || "")
              break
          }
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

  // Función para validar el formulario
  const validateForm = async () => {
    const newErrors: Record<string, string> = {}

    // Validar campos obligatorios
    if (!title.trim()) {
      newErrors.title = "El título es obligatorio"
    }

    // Validar longitud del título
    if (title.trim().length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres"
    }

    // Validar contenido según el tipo
    if (contentType === "document" && !documentContent.trim()) {
      newErrors.documentContent = "El contenido del documento es obligatorio"
    }

    if (contentType === "video" && !videoUrl.trim()) {
      newErrors.videoUrl = "La URL del video es obligatoria"
    }

    if (contentType === "quiz") {
      const hasEmptyQuestion = quizQuestions.some((q) => !q.question.trim())
      const hasEmptyOptions = quizQuestions.some((q) => q.options.some((opt: string) => !opt.trim()))

      if (hasEmptyQuestion) {
        newErrors.quizQuestions = "Todas las preguntas deben tener un enunciado"
      }

      if (hasEmptyOptions) {
        newErrors.quizOptions = "Todas las opciones deben tener contenido"
      }
    }

    if (contentType === "assignment" && !assignmentContent.trim()) {
      newErrors.assignmentContent = "El contenido de la tarea es obligatorio"
    }

    // Verificar si ya existe un contenido con el mismo título (excluyendo el actual)
    if (title.trim()) {
      const result = await checkContentExists(title.trim(), params.id)
      if (result.success && result.exists) {
        newErrors.title = "Ya existe otro contenido con este título"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      // Validar el formulario
      const isValid = await validateForm()

      if (!isValid) {
        setIsSubmitting(false)
        return
      }

      // Preparar el contenido según el tipo
      let contentData: any = {}

      switch (contentType) {
        case "document":
          contentData = {
            html: documentContent,
          }
          break

        case "video":
          contentData = {
            videoUrl,
            transcript: videoTranscript,
          }
          break

        case "quiz":
          contentData = {
            questions: quizQuestions,
          }
          break

        case "assignment":
          contentData = {
            html: assignmentContent,
            dueDate: assignmentDueDate || null,
          }
          break
      }

      // Actualizar el contenido
      const result = await updateContent(params.id, {
        title,
        description,
        type: contentType,
        content: contentData,
      })

      if (result.success) {
        toast({
          title: "Contenido actualizado",
          description: "El contenido ha sido actualizado correctamente",
        })

        // Redirigir a la página de detalles del contenido
        router.push(`/dashboard/content/${params.id}`)
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo actualizar el contenido",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating content:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar el contenido",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Función para agregar una nueva pregunta al quiz
  const addQuizQuestion = () => {
    setQuizQuestions([...quizQuestions, { question: "", options: ["", "", "", ""], correctAnswer: 0 }])
  }

  // Función para actualizar una pregunta del quiz
  const updateQuizQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...quizQuestions]

    if (field === "question") {
      updatedQuestions[index].question = value
    } else if (field === "correctAnswer") {
      updatedQuestions[index].correctAnswer = Number.parseInt(value)
    } else if (field.startsWith("option")) {
      const optionIndex = Number.parseInt(field.replace("option", ""))
      updatedQuestions[index].options[optionIndex] = value
    }

    setQuizQuestions(updatedQuestions)
  }

  // Función para eliminar una pregunta del quiz
  const removeQuizQuestion = (index: number) => {
    if (quizQuestions.length > 1) {
      const updatedQuestions = [...quizQuestions]
      updatedQuestions.splice(index, 1)
      setQuizQuestions(updatedQuestions)
    }
  }

  if (loading) {
    return (
      <>
        <DashboardHeader heading="Editando Contenido" text="Cargando información...">
          <Link href="/dashboard/content">
            <Button variant="outline" className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </Button>
          </Link>
        </DashboardHeader>

        <DashboardShell>
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-10 w-32 ml-auto" />
          </div>
        </DashboardShell>
      </>
    )
  }

  return (
    <>
      <DashboardHeader heading={`Editando: ${title}`} text="Modifica la información del contenido">
        <Link href={`/dashboard/content/${params.id}`}>
          <Button variant="outline" className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver
          </Button>
        </Link>
      </DashboardHeader>

      <DashboardShell>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <CardHeader>
              <CardTitle className="text-xl text-purple-300">Información Básica</CardTitle>
              <CardDescription>Modifica la información básica del contenido</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Título <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Introducción a la Física Cuántica"
                  className={`border-purple-900/50 bg-black/50 focus-visible:ring-purple-500 ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe brevemente este contenido..."
                  className="min-h-[100px] border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-type">
                  Tipo de Contenido <span className="text-red-500">*</span>
                </Label>
                <Select value={contentType} onValueChange={(value) => setContentType(value as ContentType)}>
                  <SelectTrigger id="content-type" className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-purple-900/50">
                    <SelectItem value="document">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-purple-300" />
                        <span>Documento</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="video">
                      <div className="flex items-center">
                        <Video className="mr-2 h-4 w-4 text-cyan-300" />
                        <span>Video</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="quiz">
                      <div className="flex items-center">
                        <FileQuestion className="mr-2 h-4 w-4 text-amber-300" />
                        <span>Quiz</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="assignment">
                      <div className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4 text-pink-300" />
                        <span>Tarea</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Tabs
            value={contentType}
            onValueChange={(value) => setContentType(value as ContentType)}
            className="space-y-4"
          >
            <TabsList className="bg-black/20 border border-purple-900/50">
              <TabsTrigger
                value="document"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                <FileText className="mr-2 h-4 w-4" />
                Documento
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
              >
                <Video className="mr-2 h-4 w-4" />
                Video
              </TabsTrigger>
              <TabsTrigger
                value="quiz"
                className="data-[state=active]:bg-amber-900/20 data-[state=active]:text-amber-300"
              >
                <FileQuestion className="mr-2 h-4 w-4" />
                Quiz
              </TabsTrigger>
              <TabsTrigger
                value="assignment"
                className="data-[state=active]:bg-pink-900/20 data-[state=active]:text-pink-300"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Tarea
              </TabsTrigger>
            </TabsList>

            <TabsContent value="document" className="space-y-4">
              <Card className="border-purple-900/50 bg-black/50">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-300">Contenido del Documento</CardTitle>
                  <CardDescription>Edita el contenido del documento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <SimpleTextEditor
                      value={documentContent}
                      onChange={setDocumentContent}
                      placeholder="Escribe el contenido aquí..."
                      className={errors.documentContent ? "border-red-500" : ""}
                    />
                    {errors.documentContent && <p className="text-sm text-red-500">{errors.documentContent}</p>}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="video" className="space-y-4">
              <Card className="border-cyan-900/50 bg-black/50">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-300">Información del Video</CardTitle>
                  <CardDescription>Edita la URL y detalles del video</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-url">
                      URL del Video <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="video-url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className={`border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500 ${
                        errors.videoUrl ? "border-red-500" : ""
                      }`}
                    />
                    {errors.videoUrl && <p className="text-sm text-red-500">{errors.videoUrl}</p>}
                    <p className="text-xs text-muted-foreground">
                      Soportamos videos de YouTube, Vimeo y otros servicios populares.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video-transcript">Transcripción (opcional)</Label>
                    <Textarea
                      id="video-transcript"
                      value={videoTranscript}
                      onChange={(e) => setVideoTranscript(e.target.value)}
                      placeholder="Transcripción del video..."
                      className="min-h-[150px] border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quiz" className="space-y-4">
              <Card className="border-amber-900/50 bg-black/50">
                <CardHeader>
                  <CardTitle className="text-lg text-amber-300">Preguntas del Quiz</CardTitle>
                  <CardDescription>Edita las preguntas y respuestas del quiz</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {errors.quizQuestions && <p className="text-sm text-red-500">{errors.quizQuestions}</p>}
                  {errors.quizOptions && <p className="text-sm text-red-500">{errors.quizOptions}</p>}

                  {quizQuestions.map((question, index) => (
                    <div key={index} className="space-y-4 p-4 border border-amber-900/50 rounded-md bg-amber-950/10">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-medium text-amber-300">Pregunta {index + 1}</h3>
                        {quizQuestions.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuizQuestion(index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-950/20"
                          >
                            Eliminar
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`question-${index}`}>Enunciado de la pregunta</Label>
                        <Input
                          id={`question-${index}`}
                          value={question.question}
                          onChange={(e) => updateQuizQuestion(index, "question", e.target.value)}
                          placeholder="Escribe la pregunta..."
                          className="border-amber-900/50 bg-black/50 focus-visible:ring-amber-500"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label>Opciones</Label>
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-2">
                            <div className="flex items-center h-10 w-10 shrink-0">
                              <input
                                type="radio"
                                id={`question-${index}-option-${optIndex}`}
                                name={`question-${index}-correct`}
                                checked={question.correctAnswer === optIndex}
                                onChange={() => updateQuizQuestion(index, "correctAnswer", optIndex)}
                                className="h-4 w-4 text-amber-500 focus:ring-amber-500 bg-black border-amber-900/50"
                              />
                              <Label
                                htmlFor={`question-${index}-option-${optIndex}`}
                                className="ml-2 text-sm font-medium cursor-pointer"
                              >
                                {String.fromCharCode(65 + optIndex)}
                              </Label>
                            </div>
                            <Input
                              value={option}
                              onChange={(e) => updateQuizQuestion(index, `option${optIndex}`, e.target.value)}
                              placeholder={`Opción ${String.fromCharCode(65 + optIndex)}...`}
                              className="border-amber-900/50 bg-black/50 focus-visible:ring-amber-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addQuizQuestion}
                    className="w-full border-amber-900/50 text-amber-300 hover:bg-amber-900/20"
                  >
                    Añadir Pregunta
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignment" className="space-y-4">
              <Card className="border-pink-900/50 bg-black/50">
                <CardHeader>
                  <CardTitle className="text-lg text-pink-300">Detalles de la Tarea</CardTitle>
                  <CardDescription>Edita la tarea y sus requisitos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignment-content">
                      Descripción de la Tarea <span className="text-red-500">*</span>
                    </Label>
                    <SimpleTextEditor
                      value={assignmentContent}
                      onChange={setAssignmentContent}
                      placeholder="Describe la tarea, objetivos, requisitos, etc..."
                      className={errors.assignmentContent ? "border-red-500" : ""}
                    />
                    {errors.assignmentContent && <p className="text-sm text-red-500">{errors.assignmentContent}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assignment-due-date">Fecha de Entrega (opcional)</Label>
                    <Input
                      id="assignment-due-date"
                      type="date"
                      value={assignmentDueDate}
                      onChange={(e) => setAssignmentDueDate(e.target.value)}
                      className="border-pink-900/50 bg-black/50 focus-visible:ring-pink-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Guardar Cambios
                </>
              )}
            </Button>
          </div>
        </form>
      </DashboardShell>
    </>
  )
}
