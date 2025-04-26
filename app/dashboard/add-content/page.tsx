"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { BookOpen, FileText, Video, Code, Upload, Plus, Save, Tag, Sparkles, Link2, HelpCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { createContent } from "@/lib/actions/content-actions"
import dynamic from "next/dynamic"
import { useToast } from "@/components/ui/use-toast"
import QuizQuestionEditor, { type QuizQuestion, type QuestionType } from "@/components/quiz-question-editor"
import ContentReferenceSelector, { type ContentReference } from "@/components/content-reference-selector"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Importar Quill dinámicamente para evitar errores de SSR
const QuillEditor = dynamic(() => import("@/components/quill-editor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[300px] border border-purple-900/50 bg-black/50 rounded-md p-4 flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent"></div>
    </div>
  ),
})

// Categorías predefinidas
const CATEGORIES = [
  { value: "programming", label: "Programación" },
  { value: "design", label: "Diseño" },
  { value: "science", label: "Ciencia" },
  { value: "math", label: "Matemáticas" },
  { value: "language", label: "Idiomas" },
  { value: "history", label: "Historia" },
  { value: "art", label: "Arte" },
  { value: "music", label: "Música" },
  { value: "other", label: "Otro" },
]

export default function AddContentPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("document")
  const [documentContent, setDocumentContent] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Estado para el quiz mejorado
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [quizSettings, setQuizSettings] = useState({
    passingScore: 70,
    timeLimit: 0, // 0 significa sin límite
    randomizeQuestions: false,
    showCorrectAnswers: true,
    attemptsAllowed: 1,
  })
  const [selectedContent, setSelectedContent] = useState<ContentReference | null>(null)
  const [showContentSelector, setShowContentSelector] = useState(false)
  const [questionGenerationCount, setQuestionGenerationCount] = useState(3)
  const [generatingQuestions, setGeneratingQuestions] = useState(false)

  // Inicializar con una pregunta por defecto cuando se selecciona la pestaña de quiz
  useEffect(() => {
    if (activeTab === "quiz" && quizQuestions.length === 0) {
      // Añadir una pregunta por defecto
      addQuestion()
    }
  }, [activeTab])

  // Función para añadir una nueva pregunta
  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: crypto.randomUUID(),
      type: "single",
      text: "",
      richText: "",
      options: [
        { id: crypto.randomUUID(), text: "", isCorrect: false },
        { id: crypto.randomUUID(), text: "", isCorrect: false },
      ],
      mediaType: "none",
      points: 10,
    }
    setQuizQuestions([...quizQuestions, newQuestion])
  }

  // Función para actualizar una pregunta existente
  const updateQuestion = (updatedQuestion: QuizQuestion) => {
    setQuizQuestions(quizQuestions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)))
  }

  // Función para eliminar una pregunta
  const deleteQuestion = (questionId: string) => {
    setQuizQuestions(quizQuestions.filter((q) => q.id !== questionId))
  }

  // Función para generar preguntas automáticamente basadas en el contenido seleccionado
  const generateQuestions = async () => {
    if (!selectedContent) {
      toast({
        title: "Error",
        description: "Selecciona un contenido de referencia primero",
        variant: "destructive",
      })
      return
    }

    setGeneratingQuestions(true)

    try {
      // Simular la generación de preguntas (en una implementación real, esto sería una llamada a la API)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generar preguntas de ejemplo basadas en el contenido seleccionado
      const generatedQuestions: QuizQuestion[] = Array.from({ length: questionGenerationCount }).map((_, index) => ({
        id: crypto.randomUUID(),
        type: ["single", "multiple", "short"][Math.floor(Math.random() * 3)] as QuestionType,
        text: `Pregunta generada ${index + 1} sobre ${selectedContent.title}`,
        richText: `<p>Pregunta generada ${index + 1} sobre <strong>${selectedContent.title}</strong></p>`,
        options: [
          { id: crypto.randomUUID(), text: "Opción generada 1", isCorrect: index === 0 },
          { id: crypto.randomUUID(), text: "Opción generada 2", isCorrect: index === 1 },
          { id: crypto.randomUUID(), text: "Opción generada 3", isCorrect: index === 2 },
        ],
        mediaType: "none",
        points: 10,
      }))

      setQuizQuestions([...quizQuestions, ...generatedQuestions])

      toast({
        title: "Preguntas generadas",
        description: `Se han generado ${questionGenerationCount} preguntas basadas en "${selectedContent.title}"`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron generar las preguntas",
        variant: "destructive",
      })
    } finally {
      setGeneratingQuestions(false)
    }
  }

  const handleAddCategory = (category: string) => {
    if (category && !selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category))
  }

  const handleAddCustomCategory = () => {
    if (newCategory && !selectedCategories.includes(newCategory)) {
      setSelectedCategories([...selectedCategories, newCategory])
      setNewCategory("")
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Aquí usamos el moduleId de ejemplo, en una implementación real vendría de un selector
      const moduleId = "example-module-id"

      // Preparar el contenido según el tipo
      const contentData: any = {
        categories: selectedCategories,
      }

      if (activeTab === "document") {
        contentData.body = documentContent
      } else if (activeTab === "quiz") {
        contentData.questions = quizQuestions
        contentData.settings = quizSettings
        contentData.referencedContent = selectedContent
          ? {
              id: selectedContent.id,
              title: selectedContent.title,
              type: selectedContent.type,
            }
          : null
      }

      const result = await createContent({
        moduleId,
        title,
        description,
        type: activeTab as "document" | "video" | "quiz" | "assignment",
        content: contentData,
        order: 1, // En una implementación real, esto se calcularía
      })

      if (result.success) {
        toast({
          title: "Contenido creado",
          description: "El contenido ha sido creado exitosamente",
          variant: "default",
        })
        // Resetear el formulario
        setTitle("")
        setDescription("")
        setDocumentContent("")
        setSelectedCategories([])
        setQuizQuestions([])
        setSelectedContent(null)
      } else {
        toast({
          title: "Error",
          description: result.error || "Hubo un error al crear el contenido",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al crear el contenido",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <DashboardHeader heading="Add Content" text="Create and manage your educational content">
        <Button
          className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Publicando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Publicar Contenido
            </>
          )}
        </Button>
      </DashboardHeader>
      <DashboardShell>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              <Video className="mr-2 h-4 w-4" />
              Video
            </TabsTrigger>
            <TabsTrigger
              value="quiz"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              <Code className="mr-2 h-4 w-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger
              value="assignment"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Tarea
            </TabsTrigger>
          </TabsList>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <TabsContent value="document" className="space-y-4">
                <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-300">Crear Documento</CardTitle>
                    <CardDescription>Crea un nuevo documento para tus estudiantes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Título
                      </label>
                      <Input
                        placeholder="Ingresa el título del documento"
                        className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Descripción
                      </label>
                      <Textarea
                        placeholder="Ingresa una breve descripción"
                        className="min-h-[100px] border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Contenido
                      </label>
                      <QuillEditor value={documentContent} onChange={setDocumentContent} theme="spacepunk" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="video" className="space-y-4">
                <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyan-300">Subir Video</CardTitle>
                    <CardDescription>Sube un video para tus estudiantes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Título
                      </label>
                      <Input
                        placeholder="Ingresa el título del video"
                        className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Descripción
                      </label>
                      <Textarea
                        placeholder="Ingresa una breve descripción"
                        className="min-h-[100px] border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="border-2 border-dashed border-cyan-900/50 rounded-md p-8 text-center">
                      <Upload className="h-10 w-10 text-cyan-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-cyan-300 mb-2">Subir Video</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Arrastra y suelta tu archivo de video aquí, o haz clic para navegar
                      </p>
                      <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Seleccionar Archivo</Button>
                      <p className="text-xs text-muted-foreground mt-4">MP4, MOV o WebM. Máx 500MB.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quiz" className="space-y-4">
                <Card className="border-pink-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                  <CardHeader>
                    <CardTitle className="text-xl text-pink-300">Crear Quiz</CardTitle>
                    <CardDescription>Crea un quiz interactivo para tus estudiantes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Título del Quiz
                      </label>
                      <Input
                        placeholder="Ingresa el título del quiz"
                        className="border-pink-900/50 bg-black/50 focus-visible:ring-pink-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Descripción
                      </label>
                      <Textarea
                        placeholder="Ingresa una breve descripción"
                        className="min-h-[100px] border-pink-900/50 bg-black/50 focus-visible:ring-pink-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    {/* Selector de contenido de referencia */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium leading-none flex items-center gap-2">
                          <Link2 className="h-4 w-4" /> Contenido de Referencia
                        </label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6 text-pink-300">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black/90 border-pink-900/50 text-xs max-w-xs">
                              Selecciona contenido existente para basar este quiz. Esto ayudará a generar preguntas
                              automáticamente.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      {selectedContent ? (
                        <div className="p-3 border border-pink-900/50 rounded-md flex gap-3 bg-pink-950/10">
                          <div className="w-[56px] h-[56px] bg-black/50 rounded flex items-center justify-center flex-shrink-0">
                            {selectedContent.type === "document" && <FileText className="h-5 w-5 text-purple-400" />}
                            {selectedContent.type === "video" && <Video className="h-5 w-5 text-cyan-400" />}
                            {selectedContent.type === "quiz" && <Code className="h-5 w-5 text-pink-400" />}
                            {selectedContent.type === "assignment" && <BookOpen className="h-5 w-5 text-amber-400" />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-sm">{selectedContent.title}</h4>
                              <Badge
                                variant="outline"
                                className={
                                  selectedContent.type === "document"
                                    ? "border-purple-900/50 text-purple-300"
                                    : selectedContent.type === "video"
                                      ? "border-cyan-900/50 text-cyan-300"
                                      : selectedContent.type === "quiz"
                                        ? "border-pink-900/50 text-pink-300"
                                        : "border-amber-900/50 text-amber-300"
                                }
                              >
                                <span className="text-xs capitalize">{selectedContent.type}</span>
                              </Badge>
                            </div>
                            {selectedContent.description && (
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                {selectedContent.description}
                              </p>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-pink-300 hover:text-pink-200 hover:bg-pink-950/30 h-8 w-8 p-0"
                            onClick={() => setSelectedContent(null)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full border-dashed border-2 border-pink-900/50 bg-transparent text-pink-300 hover:bg-pink-950/20"
                          onClick={() => setShowContentSelector(true)}
                        >
                          <Link2 className="mr-2 h-4 w-4" /> Seleccionar Contenido
                        </Button>
                      )}
                    </div>

                    {/* Generación automática de preguntas */}
                    {selectedContent && (
                      <div className="p-4 border border-pink-900/50 rounded-md bg-pink-950/10 space-y-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-pink-300" />
                          <h3 className="text-sm font-medium text-pink-300">Generación Automática de Preguntas</h3>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Genera preguntas automáticamente basadas en el contenido seleccionado.
                        </p>

                        <div className="flex gap-2 items-center">
                          <div className="flex-1">
                            <Select
                              value={questionGenerationCount.toString()}
                              onValueChange={(value) => setQuestionGenerationCount(Number.parseInt(value))}
                            >
                              <SelectTrigger className="border-pink-900/50 bg-black/50 focus:ring-pink-500">
                                <SelectValue placeholder="Número de preguntas" />
                              </SelectTrigger>
                              <SelectContent className="bg-black/90 border-pink-900/50">
                                <SelectItem value="1">1 pregunta</SelectItem>
                                <SelectItem value="3">3 preguntas</SelectItem>
                                <SelectItem value="5">5 preguntas</SelectItem>
                                <SelectItem value="10">10 preguntas</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Button
                            className="bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-600"
                            onClick={generateQuestions}
                            disabled={generatingQuestions}
                          >
                            {generatingQuestions ? (
                              <>
                                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Generando...
                              </>
                            ) : (
                              <>
                                <Sparkles className="mr-2 h-4 w-4" /> Generar
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Lista de preguntas */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium leading-none">Preguntas ({quizQuestions.length})</label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={addQuestion}
                          className="border-pink-900/50 text-pink-300 hover:bg-pink-950/20"
                        >
                          <Plus className="mr-2 h-3 w-3" /> Añadir Pregunta
                        </Button>
                      </div>

                      {quizQuestions.length === 0 ? (
                        <div className="p-8 border-2 border-dashed border-pink-900/50 rounded-md text-center">
                          <Code className="h-10 w-10 text-pink-500 mx-auto mb-2" />
                          <h3 className="text-lg font-medium text-pink-300 mb-1">No hay preguntas</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Añade preguntas manualmente o genera automáticamente desde un contenido de referencia
                          </p>
                          <div className="flex gap-2 justify-center">
                            <Button
                              variant="outline"
                              className="border-pink-900/50 text-pink-300 hover:bg-pink-950/20"
                              onClick={() => setShowContentSelector(true)}
                            >
                              <Link2 className="mr-2 h-4 w-4" /> Seleccionar Contenido
                            </Button>
                            <Button
                              className="bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-600"
                              onClick={addQuestion}
                            >
                              <Plus className="mr-2 h-4 w-4" /> Añadir Pregunta
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {quizQuestions.map((question, index) => (
                            <QuizQuestionEditor
                              key={question.id}
                              question={question}
                              onUpdate={updateQuestion}
                              onDelete={() => deleteQuestion(question.id)}
                              index={index}
                            />
                          ))}

                          <Button
                            variant="outline"
                            className="w-full border-dashed border-2 border-pink-900/50 bg-transparent text-pink-300 hover:bg-pink-950/20"
                            onClick={addQuestion}
                          >
                            <Plus className="mr-2 h-4 w-4" /> Añadir Otra Pregunta
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignment" className="space-y-4">
                <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-300">Crear Tarea</CardTitle>
                    <CardDescription>Crea una nueva tarea para tus estudiantes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Título de la Tarea
                      </label>
                      <Input
                        placeholder="Ingresa el título de la tarea"
                        className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Descripción
                      </label>
                      <Textarea
                        placeholder="Ingresa las instrucciones de la tarea"
                        className="min-h-[150px] border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Fecha de Entrega
                        </label>
                        <Input type="date" className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Puntos
                        </label>
                        <Input
                          type="number"
                          placeholder="100"
                          className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Archivos Adjuntos
                      </label>
                      <div className="border-2 border-dashed border-purple-900/50 rounded-md p-6 text-center">
                        <Upload className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Arrastra y suelta archivos aquí, o haz clic para navegar
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                        >
                          Seleccionar Archivos
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>

            <div>
              <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                <CardHeader>
                  <CardTitle className="text-xl text-cyan-300">Configuración de Contenido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Curso
                    </label>
                    <Select>
                      <SelectTrigger className="border-cyan-900/50 bg-black/50 focus:ring-cyan-500">
                        <SelectValue placeholder="Selecciona un curso" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-cyan-900/50">
                        <SelectItem value="quantum-physics">Física Cuántica 101</SelectItem>
                        <SelectItem value="space-exploration">Exploración Espacial</SelectItem>
                        <SelectItem value="ai-ethics">Ética de la IA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Visibilidad
                    </label>
                    <Select>
                      <SelectTrigger className="border-cyan-900/50 bg-black/50 focus:ring-cyan-500">
                        <SelectValue placeholder="Selecciona la visibilidad" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-cyan-900/50">
                        <SelectItem value="published">Publicado</SelectItem>
                        <SelectItem value="draft">Borrador</SelectItem>
                        <SelectItem value="scheduled">Programado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Fecha de Publicación
                    </label>
                    <Input
                      type="datetime-local"
                      className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                    />
                  </div>

                  {/* Configuración específica para Quiz */}
                  {activeTab === "quiz" && (
                    <div className="space-y-4 pt-2 border-t border-cyan-900/50">
                      <h3 className="text-sm font-medium text-cyan-300">Configuración del Quiz</h3>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Calificación Mínima (%)</label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={quizSettings.passingScore}
                          onChange={(e) =>
                            setQuizSettings({ ...quizSettings, passingScore: Number.parseInt(e.target.value) || 0 })
                          }
                          className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Límite de Tiempo (minutos)</label>
                        <Input
                          type="number"
                          min="0"
                          value={quizSettings.timeLimit}
                          onChange={(e) =>
                            setQuizSettings({ ...quizSettings, timeLimit: Number.parseInt(e.target.value) || 0 })
                          }
                          className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                        />
                        <p className="text-xs text-muted-foreground">0 = Sin límite de tiempo</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Intentos Permitidos</label>
                        <Select
                          value={quizSettings.attemptsAllowed.toString()}
                          onValueChange={(value) =>
                            setQuizSettings({ ...quizSettings, attemptsAllowed: Number.parseInt(value) })
                          }
                        >
                          <SelectTrigger className="border-cyan-900/50 bg-black/50 focus:ring-cyan-500">
                            <SelectValue placeholder="Intentos permitidos" />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-cyan-900/50">
                            <SelectItem value="1">1 intento</SelectItem>
                            <SelectItem value="2">2 intentos</SelectItem>
                            <SelectItem value="3">3 intentos</SelectItem>
                            <SelectItem value="0">Intentos ilimitados</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="randomize-questions"
                          checked={quizSettings.randomizeQuestions}
                          onChange={(e) => setQuizSettings({ ...quizSettings, randomizeQuestions: e.target.checked })}
                          className="rounded border-cyan-900/50 text-cyan-600 focus:ring-cyan-500"
                        />
                        <label htmlFor="randomize-questions" className="text-sm font-medium leading-none">
                          Aleatorizar preguntas
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="show-correct-answers"
                          checked={quizSettings.showCorrectAnswers}
                          onChange={(e) => setQuizSettings({ ...quizSettings, showCorrectAnswers: e.target.checked })}
                          className="rounded border-cyan-900/50 text-cyan-600 focus:ring-cyan-500"
                        />
                        <label htmlFor="show-correct-answers" className="text-sm font-medium leading-none">
                          Mostrar respuestas correctas
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Categorización */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none flex items-center gap-2">
                      <Tag className="h-4 w-4" /> Categorías
                    </label>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedCategories.map((category) => (
                        <Badge
                          key={category}
                          className="bg-cyan-900/30 text-cyan-300 hover:bg-cyan-900/50 cursor-pointer"
                          onClick={() => handleRemoveCategory(category)}
                        >
                          {CATEGORIES.find((c) => c.value === category)?.label || category}
                          <span className="ml-1">×</span>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                          >
                            Añadir Categoría
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-black/90 border-cyan-900/50 p-2 w-48">
                          <div className="grid gap-1">
                            {CATEGORIES.map((category) => (
                              <Button
                                key={category.value}
                                variant="ghost"
                                size="sm"
                                className="justify-start text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-200"
                                onClick={() => handleAddCategory(category.value)}
                                disabled={selectedCategories.includes(category.value)}
                              >
                                {category.label}
                              </Button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>

                      <div className="flex gap-2 flex-1">
                        <Input
                          placeholder="Nueva categoría"
                          className="h-9 border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              handleAddCustomCategory()
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          className="h-9 bg-cyan-600 hover:bg-cyan-700 text-white"
                          onClick={handleAddCustomCategory}
                          disabled={!newCategory}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-cyan-900/50">
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Guardando..." : "Guardar Contenido"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)] mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-purple-300">Contenido Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-md hover:bg-purple-900/20">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-purple-400 mr-2" />
                        <span className="text-sm">Física Cuántica Lección 3</span>
                      </div>
                      <span className="text-xs text-muted-foreground">hace 2 días</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md hover:bg-purple-900/20">
                      <div className="flex items-center">
                        <Video className="h-4 w-4 text-cyan-400 mr-2" />
                        <span className="text-sm">Tutorial de Exploración Espacial</span>
                      </div>
                      <span className="text-xs text-muted-foreground">hace 1 semana</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-md hover:bg-purple-900/20">
                      <div className="flex items-center">
                        <Code className="h-4 w-4 text-pink-400 mr-2" />
                        <span className="text-sm">Quiz de Ética de la IA</span>
                      </div>
                      <span className="text-xs text-muted-foreground">hace 2 semanas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </DashboardShell>

      {/* Diálogo para seleccionar contenido de referencia */}
      <Dialog open={showContentSelector} onOpenChange={setShowContentSelector}>
        <DialogContent className="bg-black/90 border-pink-900/50 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-pink-300">Seleccionar Contenido de Referencia</DialogTitle>
            <DialogDescription>
              Selecciona un contenido existente para basar este quiz. Esto te permitirá generar preguntas
              automáticamente.
            </DialogDescription>
          </DialogHeader>

          <ContentReferenceSelector
            onSelect={(content) => {
              setSelectedContent(content)
              setShowContentSelector(false)
            }}
            selectedContentId={selectedContent?.id}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
