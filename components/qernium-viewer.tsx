"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Sparkles,
  Clock,
  Brain,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Eye,
  FileText,
  Video,
  BookOpen,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Tipos para el contenido
export type ContentType = "document" | "video" | "quiz" | "assignment"

export type QuizOption = {
  id: string
  text: string
  isCorrect: boolean
}

export type QuizQuestion = {
  id: string
  question: string
  options: QuizOption[]
  type: "single" | "multiple" | "text"
  points: number
}

export type DocumentContent = {
  type: "document"
  title: string
  content: string
  attachments?: { name: string; url: string; type: string }[]
}

export type VideoContent = {
  type: "video"
  title: string
  videoUrl: string
  duration: string
  transcript?: string
}

export type QuizContent = {
  type: "quiz"
  title: string
  description: string
  questions: QuizQuestion[]
  timeLimit?: number
  passingScore: number
}

export type AssignmentContent = {
  type: "assignment"
  title: string
  description: string
  instructions: string
  dueDate?: string
  attachments?: { name: string; url: string; type: string }[]
}

export type QerniumContent = DocumentContent | VideoContent | QuizContent | AssignmentContent

export type QerniumSkill = {
  id: string
  subskillId: string
  subskillName: string
  skillName: string
  skillColor: string
  level: number
}

export type QerniumData = {
  id: string
  title: string
  description: string
  bloomLevel: string
  actionVerb: string
  estimatedTime: number
  content: QerniumContent
  skills: QerniumSkill[]
  creatorId: string
  creatorName: string
}

interface QerniumViewerProps {
  qernium: QerniumData
  onComplete?: (response: any) => void
  onPrevious?: () => void
  onNext?: () => void
  viewOnly?: boolean
  userRole?: "qorexplorer" | "qoremaster" | "qorescout"
}

export default function QerniumViewer({
  qernium,
  onComplete,
  onPrevious,
  onNext,
  viewOnly = false,
  userRole = "qorexplorer",
}: QerniumViewerProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<string>("content")
  const [quizResponses, setQuizResponses] = useState<Record<string, any>>({})
  const [progress, setProgress] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Inicializar respuestas para quiz
  useEffect(() => {
    if (qernium.content.type === "quiz") {
      const initialResponses: Record<string, any> = {}
      qernium.content.questions.forEach((question) => {
        initialResponses[question.id] = question.type === "multiple" ? [] : ""
      })
      setQuizResponses(initialResponses)
    }
  }, [qernium])

  // Temporizador para seguimiento de tiempo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Función para obtener el nombre del nivel de Bloom en español
  const getBloomLevelName = (level: string) => {
    switch (level) {
      case "remember":
        return "Recordar"
      case "understand":
        return "Comprender"
      case "apply":
        return "Aplicar"
      case "analyze":
        return "Analizar"
      case "evaluate":
        return "Evaluar"
      case "create":
        return "Crear"
      default:
        return level
    }
  }

  // Función para obtener el color de fondo según el nivel de Bloom
  const getBloomLevelColor = (level: string) => {
    switch (level) {
      case "remember":
        return "bg-blue-900/30 text-blue-300"
      case "understand":
        return "bg-green-900/30 text-green-300"
      case "apply":
        return "bg-yellow-900/30 text-yellow-300"
      case "analyze":
        return "bg-orange-900/30 text-orange-300"
      case "evaluate":
        return "bg-red-900/30 text-red-300"
      case "create":
        return "bg-purple-900/30 text-purple-300"
      default:
        return "bg-gray-900/30 text-gray-300"
    }
  }

  // Manejar cambio en respuestas de quiz
  const handleQuizResponseChange = (questionId: string, value: any) => {
    setQuizResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))

    // Actualizar progreso
    if (qernium.content.type === "quiz") {
      const totalQuestions = qernium.content.questions.length
      const answeredQuestions = Object.values(quizResponses).filter((r) =>
        Array.isArray(r) ? r.length > 0 : r !== "",
      ).length
      setProgress(Math.round((answeredQuestions / totalQuestions) * 100))
    }
  }

  // Manejar envío de respuestas
  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simular envío
    setTimeout(() => {
      // Calcular puntuación para quiz
      if (qernium.content.type === "quiz") {
        let correctAnswers = 0
        let totalPoints = 0

        qernium.content.questions.forEach((question) => {
          totalPoints += question.points

          if (question.type === "single") {
            const correctOption = question.options.find((opt) => opt.isCorrect)
            if (correctOption && quizResponses[question.id] === correctOption.id) {
              correctAnswers += question.points
            }
          } else if (question.type === "multiple") {
            const userSelections = quizResponses[question.id] || []
            const correctOptions = question.options.filter((opt) => opt.isCorrect).map((opt) => opt.id)

            // Verificar si las selecciones del usuario coinciden exactamente con las opciones correctas
            const isCorrect =
              userSelections.length === correctOptions.length &&
              userSelections.every((id) => correctOptions.includes(id))

            if (isCorrect) {
              correctAnswers += question.points
            }
          }
          // Para preguntas de texto, se necesitaría evaluación manual o NLP
        })

        const score = Math.round((correctAnswers / totalPoints) * 100)

        toast({
          title: "Respuestas enviadas",
          description: `Tu puntuación: ${score}%. ${score >= qernium.content.passingScore ? "¡Has aprobado!" : "Necesitas mejorar."}`,
        })

        if (onComplete) {
          onComplete({
            qerniumId: qernium.id,
            responses: quizResponses,
            score,
            timeSpent,
            completed: true,
          })
        }
      } else {
        toast({
          title: "Contenido completado",
          description: "Has completado este Qernium exitosamente.",
        })

        if (onComplete) {
          onComplete({
            qerniumId: qernium.id,
            timeSpent,
            completed: true,
          })
        }
      }

      setIsSubmitting(false)
    }, 1500)
  }

  // Formatear tiempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="space-y-4">
      {/* Encabezado del Qernium */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-purple-300">{qernium.title}</h1>
          <p className="text-muted-foreground mt-1">{qernium.description}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            <Badge className={getBloomLevelColor(qernium.bloomLevel)}>
              {qernium.actionVerb} ({getBloomLevelName(qernium.bloomLevel)})
            </Badge>

            <Badge variant="outline" className="border-purple-900/50 flex items-center gap-1">
              <Clock className="h-3 w-3" /> {qernium.estimatedTime} min
            </Badge>

            {qernium.content.type === "document" && (
              <Badge variant="outline" className="border-cyan-900/50 text-cyan-300 flex items-center gap-1">
                <FileText className="h-3 w-3" /> Documento
              </Badge>
            )}

            {qernium.content.type === "video" && (
              <Badge variant="outline" className="border-pink-900/50 text-pink-300 flex items-center gap-1">
                <Video className="h-3 w-3" /> Video
              </Badge>
            )}

            {qernium.content.type === "quiz" && (
              <Badge variant="outline" className="border-amber-900/50 text-amber-300 flex items-center gap-1">
                <FileText className="h-3 w-3" /> Quiz
              </Badge>
            )}

            {qernium.content.type === "assignment" && (
              <Badge variant="outline" className="border-green-900/50 text-green-300 flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> Tarea
              </Badge>
            )}
          </div>
        </div>

        {!viewOnly && (
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" /> Tiempo: {formatTime(timeSpent)}
            </div>

            {qernium.content.type === "quiz" && (
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">Progreso:</div>
                <Progress value={progress} className="w-24 h-2" />
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pestañas de navegación */}
      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-black/20 border border-purple-900/50">
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
          >
            Contenido
          </TabsTrigger>
          <TabsTrigger
            value="skills"
            className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
          >
            Habilidades
          </TabsTrigger>
          {userRole === "qoremaster" && (
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              Estadísticas
            </TabsTrigger>
          )}
        </TabsList>

        {/* Contenido del Qernium */}
        <TabsContent value="content" className="space-y-4">
          <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <CardContent className="p-6">
              {/* Contenido tipo Documento */}
              {qernium.content.type === "document" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-purple-300">{qernium.content.title}</h2>
                  <div className="prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: qernium.content.content }} />
                  </div>

                  {qernium.content.attachments && qernium.content.attachments.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <h3 className="text-lg font-medium text-purple-300">Archivos adjuntos</h3>
                      <div className="space-y-2">
                        {qernium.content.attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border border-purple-900/50 rounded-md bg-purple-950/10"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-purple-400" />
                              <span>{attachment.name}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                            >
                              <Eye className="mr-2 h-4 w-4" /> Ver
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Contenido tipo Video */}
              {qernium.content.type === "video" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-pink-300">{qernium.content.title}</h2>

                  <div className="relative aspect-video rounded-md overflow-hidden border border-pink-900/50">
                    {/* Placeholder para el video */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Button size="lg" className="rounded-full w-16 h-16 bg-pink-600/80 hover:bg-pink-600 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span className="sr-only">Reproducir video</span>
                      </Button>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded text-xs text-white">
                      {qernium.content.duration}
                    </div>
                  </div>

                  {qernium.content.transcript && (
                    <div className="space-y-2 mt-4">
                      <h3 className="text-lg font-medium text-pink-300">Transcripción</h3>
                      <div className="p-4 border border-pink-900/50 rounded-md bg-pink-950/10 max-h-60 overflow-y-auto">
                        <p className="text-sm whitespace-pre-line">{qernium.content.transcript}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Contenido tipo Quiz */}
              {qernium.content.type === "quiz" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-amber-300">{qernium.content.title}</h2>
                    {qernium.content.timeLimit && (
                      <Badge variant="outline" className="border-amber-900/50 text-amber-300">
                        Tiempo límite: {qernium.content.timeLimit} min
                      </Badge>
                    )}
                  </div>

                  <p className="text-muted-foreground">{qernium.content.description}</p>

                  <div className="space-y-8">
                    {qernium.content.questions.map((question, qIndex) => (
                      <div key={question.id} className="space-y-4">
                        <div className="flex items-start gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-900/50 text-amber-300 text-xs">
                            {qIndex + 1}
                          </span>
                          <div className="space-y-3 flex-1">
                            <div className="flex justify-between">
                              <h3 className="text-base font-medium">{question.question}</h3>
                              <Badge variant="outline" className="border-amber-900/50 text-amber-300">
                                {question.points} {question.points === 1 ? "punto" : "puntos"}
                              </Badge>
                            </div>

                            {/* Pregunta de opción única */}
                            {question.type === "single" && (
                              <RadioGroup
                                value={quizResponses[question.id] || ""}
                                onValueChange={(value) => handleQuizResponseChange(question.id, value)}
                                disabled={viewOnly}
                              >
                                {question.options.map((option) => (
                                  <div key={option.id} className="flex items-center space-x-2 py-1">
                                    <RadioGroupItem
                                      value={option.id}
                                      id={`q${question.id}-opt${option.id}`}
                                      className="border-amber-500 text-amber-500"
                                    />
                                    <Label htmlFor={`q${question.id}-opt${option.id}`}>
                                      {option.text}
                                      {viewOnly && option.isCorrect && (
                                        <span className="ml-2 text-green-400 text-xs">(Respuesta correcta)</span>
                                      )}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            )}

                            {/* Pregunta de opción múltiple */}
                            {question.type === "multiple" && (
                              <div className="space-y-2">
                                {question.options.map((option) => (
                                  <div key={option.id} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`q${question.id}-opt${option.id}`}
                                      checked={(quizResponses[question.id] || []).includes(option.id)}
                                      onCheckedChange={(checked) => {
                                        const currentSelections = [...(quizResponses[question.id] || [])]
                                        if (checked) {
                                          handleQuizResponseChange(question.id, [...currentSelections, option.id])
                                        } else {
                                          handleQuizResponseChange(
                                            question.id,
                                            currentSelections.filter((id) => id !== option.id),
                                          )
                                        }
                                      }}
                                      disabled={viewOnly}
                                      className="border-amber-500 text-amber-500"
                                    />
                                    <Label htmlFor={`q${question.id}-opt${option.id}`}>
                                      {option.text}
                                      {viewOnly && option.isCorrect && (
                                        <span className="ml-2 text-green-400 text-xs">(Respuesta correcta)</span>
                                      )}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Pregunta de texto */}
                            {question.type === "text" && (
                              <Textarea
                                placeholder="Escribe tu respuesta aquí..."
                                value={quizResponses[question.id] || ""}
                                onChange={(e) => handleQuizResponseChange(question.id, e.target.value)}
                                disabled={viewOnly}
                                className="min-h-[100px] border-amber-900/50 bg-black/50 focus-visible:ring-amber-500"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contenido tipo Tarea */}
              {qernium.content.type === "assignment" && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-green-300">{qernium.content.title}</h2>
                  <p className="text-muted-foreground">{qernium.content.description}</p>

                  <div className="space-y-2 mt-4">
                    <h3 className="text-lg font-medium text-green-300">Instrucciones</h3>
                    <div className="p-4 border border-green-900/50 rounded-md bg-green-950/10">
                      <p className="whitespace-pre-line">{qernium.content.instructions}</p>
                    </div>
                  </div>

                  {qernium.content.dueDate && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Fecha límite: {new Date(qernium.content.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}

                  {qernium.content.attachments && qernium.content.attachments.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <h3 className="text-lg font-medium text-green-300">Archivos adjuntos</h3>
                      <div className="space-y-2">
                        {qernium.content.attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border border-green-900/50 rounded-md bg-green-950/10"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-green-400" />
                              <span>{attachment.name}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-900/50 text-green-300 hover:bg-green-900/20"
                            >
                              <Eye className="mr-2 h-4 w-4" /> Ver
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!viewOnly && (
                    <div className="space-y-4 mt-6 pt-4 border-t border-green-900/50">
                      <h3 className="text-lg font-medium text-green-300">Tu respuesta</h3>
                      <Textarea
                        placeholder="Escribe tu respuesta aquí..."
                        className="min-h-[150px] border-green-900/50 bg-black/50 focus-visible:ring-green-500"
                      />

                      <div className="space-y-2">
                        <Label htmlFor="assignment-file">Adjuntar archivo (opcional)</Label>
                        <Input
                          id="assignment-file"
                          type="file"
                          className="border-green-900/50 bg-black/50 focus-visible:ring-green-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botones de navegación y envío */}
          <div className="flex justify-between pt-2">
            {onPrevious ? (
              <Button
                variant="outline"
                onClick={onPrevious}
                className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
            ) : (
              <div></div>
            )}

            <div className="flex gap-2">
              {!viewOnly && (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" /> Completar
                    </>
                  )}
                </Button>
              )}

              {onNext && (
                <Button
                  variant="outline"
                  onClick={onNext}
                  className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                >
                  Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Pestaña de Habilidades */}
        <TabsContent value="skills" className="space-y-4">
          <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-cyan-300 flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> Habilidades Desarrolladas
              </h2>

              {qernium.skills.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-cyan-900/50 rounded-md">
                  <p className="text-muted-foreground">No hay habilidades asignadas a este Qernium</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {qernium.skills.map((skill) => {
                    let borderColor = "border-purple-900/50"
                    let bgColor = "bg-purple-900/20"
                    let textColor = "text-purple-300"

                    if (skill.skillColor === "cyan") {
                      borderColor = "border-cyan-900/50"
                      bgColor = "bg-cyan-900/20"
                      textColor = "text-cyan-300"
                    } else if (skill.skillColor === "pink") {
                      borderColor = "border-pink-900/50"
                      bgColor = "bg-pink-900/20"
                      textColor = "text-pink-300"
                    } else if (skill.skillColor === "amber") {
                      borderColor = "border-amber-900/50"
                      bgColor = "bg-amber-900/20"
                      textColor = "text-amber-300"
                    }

                    return (
                      <div key={skill.id} className={`p-4 rounded-md border ${borderColor} ${bgColor}`}>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${textColor}`}>{skill.subskillName}</span>
                              <Badge className={`bg-${skill.skillColor}-900/30 text-${skill.skillColor}-300`}>
                                {skill.skillName}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-xs text-muted-foreground">Nivel:</span>
                              <div className="flex gap-1">
                                {[0, 1, 2, 3, 4].map((level) => (
                                  <div
                                    key={level}
                                    className={`w-4 h-1 rounded-full ${level <= skill.level ? textColor : "bg-gray-700"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground ml-1">{skill.level}/4</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-muted-foreground">
                              {skill.level === 0 && "No desarrollado"}
                              {skill.level === 1 && "Inicial"}
                              {skill.level === 2 && "En desarrollo"}
                              {skill.level === 3 && "Avanzado"}
                              {skill.level === 4 && "Experto"}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="pt-4 border-t border-cyan-900/50">
                <h3 className="text-lg font-medium text-cyan-300 mb-3">Nivel de Bloom</h3>
                <div className="p-4 rounded-md bg-black/30 border border-cyan-900/30 space-y-3">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-cyan-300" />
                    <span className="font-medium">Nivel seleccionado:</span>
                    <Badge className={getBloomLevelColor(qernium.bloomLevel)}>
                      {getBloomLevelName(qernium.bloomLevel)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {qernium.bloomLevel === "remember" &&
                      "Este nivel se enfoca en recordar hechos, términos, conceptos básicos y respuestas simples."}
                    {qernium.bloomLevel === "understand" &&
                      "Este nivel se enfoca en demostrar comprensión de hechos e ideas organizando, comparando, interpretando y describiendo ideas principales."}
                    {qernium.bloomLevel === "apply" &&
                      "Este nivel se enfoca en usar información aprendida en situaciones nuevas, resolviendo problemas aplicando conocimientos, hechos y técnicas."}
                    {qernium.bloomLevel === "analyze" &&
                      "Este nivel se enfoca en examinar y descomponer información en partes, identificando motivos o causas, haciendo inferencias y encontrando evidencia."}
                    {qernium.bloomLevel === "evaluate" &&
                      "Este nivel se enfoca en presentar y defender opiniones haciendo juicios sobre información, validez de ideas o calidad de trabajo."}
                    {qernium.bloomLevel === "create" &&
                      "Este nivel se enfoca en compilar información de manera diferente combinando elementos en un nuevo patrón o proponiendo soluciones alternativas."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Estadísticas (solo para QoreMasters) */}
        {userRole === "qoremaster" && (
          <TabsContent value="stats" className="space-y-4">
            <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-semibold text-purple-300">Estadísticas de Uso</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-purple-900/50 rounded-md bg-purple-950/10 space-y-2">
                    <h3 className="text-sm font-medium text-purple-300">Tasa de Finalización</h3>
                    <div className="text-3xl font-bold">78%</div>
                    <Progress
                      value={78}
                      className="h-2 bg-black/50"
                      indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-300"
                    />
                  </div>

                  <div className="p-4 border border-purple-900/50 rounded-md bg-purple-950/10 space-y-2">
                    <h3 className="text-sm font-medium text-purple-300">Tiempo Promedio</h3>
                    <div className="text-3xl font-bold">12:45</div>
                    <div className="text-xs text-muted-foreground">Duración estimada: {qernium.estimatedTime} min</div>
                  </div>

                  <div className="p-4 border border-purple-900/50 rounded-md bg-purple-950/10 space-y-2">
                    <h3 className="text-sm font-medium text-purple-300">Puntuación Promedio</h3>
                    <div className="text-3xl font-bold">85%</div>
                    <Progress
                      value={85}
                      className="h-2 bg-black/50"
                      indicatorClassName="bg-gradient-to-r from-green-500 to-green-300"
                    />
                  </div>

                  <div className="p-4 border border-purple-900/50 rounded-md bg-purple-950/10 space-y-2">
                    <h3 className="text-sm font-medium text-purple-300">Interacciones</h3>
                    <div className="text-3xl font-bold">156</div>
                    <div className="text-xs text-muted-foreground">Última: hace 2 días</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-900/50">
                  <h3 className="text-lg font-medium text-purple-300 mb-3">Preguntas más difíciles</h3>
                  <div className="space-y-2">
                    <div className="p-3 border border-purple-900/50 rounded-md bg-purple-950/10 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-900/50 text-purple-300 text-xs">
                          1
                        </span>
                        <span className="text-sm">¿Cuál es el principio de incertidumbre de Heisenberg?</span>
                      </div>
                      <Badge className="bg-red-900/30 text-red-300">45% aciertos</Badge>
                    </div>
                    <div className="p-3 border border-purple-900/50 rounded-md bg-purple-950/10 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-900/50 text-purple-300 text-xs">
                          2
                        </span>
                        <span className="text-sm">¿Qué establece la ecuación de Schrödinger?</span>
                      </div>
                      <Badge className="bg-amber-900/30 text-amber-300">62% aciertos</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
