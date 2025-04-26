"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Clock, Award, Sparkles, Brain } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function QerniumResultsPage() {
  const params = useParams()
  const qerniumId = params.id as string

  // Mock data para el resultado
  const result = {
    qerniumId,
    title: "Identificar principios de la mecánica cuántica",
    score: 85,
    passingScore: 70,
    timeSpent: 1245, // en segundos
    completedAt: "2023-04-15T14:30:00Z",
    totalQuestions: 4,
    correctAnswers: 3,
    skillsProgress: [
      {
        id: "s1",
        subskillId: "1",
        subskillName: "Análisis de Argumentos",
        skillName: "Pensamiento Crítico",
        skillColor: "purple",
        previousLevel: 1,
        newLevel: 2,
      },
      {
        id: "s2",
        subskillId: "5",
        subskillName: "Definición de Problemas",
        skillName: "Resolución de Problemas",
        skillColor: "pink",
        previousLevel: 2,
        newLevel: 3,
      },
    ],
    questions: [
      {
        id: "q1",
        question: "¿Cuál es el principio de incertidumbre de Heisenberg?",
        userAnswer: "q1-opt1",
        correctAnswer: "q1-opt1",
        isCorrect: true,
        points: 2,
        earnedPoints: 2,
      },
      {
        id: "q2",
        question: "¿Qué establece la ecuación de Schrödinger?",
        userAnswer: "q2-opt2",
        correctAnswer: "q2-opt2",
        isCorrect: true,
        points: 2,
        earnedPoints: 2,
      },
      {
        id: "q3",
        question: "Selecciona todos los principios que son fundamentales en la mecánica cuántica:",
        userAnswer: ["q3-opt1", "q3-opt2", "q3-opt3"],
        correctAnswer: ["q3-opt1", "q3-opt2", "q3-opt4"],
        isCorrect: false,
        points: 3,
        earnedPoints: 0,
      },
      {
        id: "q4",
        question: "Explica brevemente el concepto de entrelazamiento cuántico:",
        userAnswer:
          "El entrelazamiento cuántico es un fenómeno donde dos o más partículas se encuentran correlacionadas de tal manera que el estado cuántico de cada partícula no puede describirse independientemente de las demás.",
        correctAnswer: null, // Requiere evaluación manual
        isCorrect: true, // Asumimos que es correcta para este ejemplo
        points: 3,
        earnedPoints: 3,
      },
    ],
    feedback:
      "Buen trabajo en general. Necesitas repasar el concepto de principios fundamentales de la mecánica cuántica.",
  }

  // Formatear tiempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <DashboardHeader heading="Resultados del Qernium" text="Revisa tu desempeño y las habilidades desarrolladas">
        <div className="flex gap-2">
          <Link href={`/dashboard/student/qerniums/${qerniumId}`}>
            <Button variant="outline" className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Qernium
            </Button>
          </Link>
          <Link href="/dashboard/student/qlusters">
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
              Continuar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </DashboardHeader>
      <DashboardShell>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Columna principal */}
          <div className="md:col-span-2 space-y-4">
            <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <CardHeader>
                <CardTitle className="text-xl text-purple-300">Resumen de Resultados</CardTitle>
                <CardDescription>Qernium: {result.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center p-6 space-y-4">
                  <div className="relative">
                    <svg className="w-32 h-32">
                      <circle
                        className="text-purple-950"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                      />
                      <circle
                        className={`${result.score >= result.passingScore ? "text-green-500" : "text-amber-500"}`}
                        strokeWidth="8"
                        strokeDasharray={`${result.score * 3.51} 351`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="56"
                        cx="64"
                        cy="64"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold">{result.score}%</span>
                      <span className="text-xs text-muted-foreground">Puntuación</span>
                    </div>
                  </div>

                  <div className="text-center">
                    {result.score >= result.passingScore ? (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">¡Aprobado!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-amber-400">
                        <XCircle className="h-5 w-5" />
                        <span className="font-medium">No aprobado</span>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">
                      Puntuación mínima requerida: {result.passingScore}%
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 border border-purple-900/50 rounded-md bg-purple-950/10 space-y-1 flex flex-col items-center justify-center">
                    <div className="text-sm text-muted-foreground">Preguntas correctas</div>
                    <div className="text-2xl font-bold">
                      {result.correctAnswers}/{result.totalQuestions}
                    </div>
                  </div>

                  <div className="p-4 border border-purple-900/50 rounded-md bg-purple-950/10 space-y-1 flex flex-col items-center justify-center">
                    <div className="text-sm text-muted-foreground">Tiempo empleado</div>
                    <div className="text-2xl font-bold">{formatTime(result.timeSpent)}</div>
                  </div>

                  <div className="p-4 border border-purple-900/50 rounded-md bg-purple-950/10 space-y-1 flex flex-col items-center justify-center">
                    <div className="text-sm text-muted-foreground">Completado</div>
                    <div className="text-sm font-medium">{formatDate(result.completedAt)}</div>
                  </div>
                </div>

                {result.feedback && (
                  <div className="p-4 border border-purple-900/50 rounded-md bg-purple-950/10">
                    <h3 className="text-sm font-medium text-purple-300 mb-2">Retroalimentación</h3>
                    <p className="text-sm">{result.feedback}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <CardHeader>
                <CardTitle className="text-xl text-purple-300">Detalle de Respuestas</CardTitle>
                <CardDescription>Revisa tus respuestas y las correctas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {result.questions.map((question, index) => (
                  <div key={question.id} className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-900/50 text-purple-300 text-xs">
                        {index + 1}
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-base font-medium">{question.question}</h3>
                          <div className="flex items-center gap-1">
                            {question.isCorrect ? (
                              <Badge className="bg-green-900/30 text-green-300">Correcto</Badge>
                            ) : (
                              <Badge className="bg-red-900/30 text-red-300">Incorrecto</Badge>
                            )}
                            <span className="text-xs text-muted-foreground ml-2">
                              {question.earnedPoints}/{question.points} pts
                            </span>
                          </div>
                        </div>

                        <div className="p-3 border border-purple-900/50 rounded-md bg-purple-950/10">
                          <div className="text-sm">
                            <span className="font-medium">Tu respuesta: </span>
                            {Array.isArray(question.userAnswer) ? question.userAnswer.join(", ") : question.userAnswer}
                          </div>

                          {!question.isCorrect && question.correctAnswer && (
                            <div className="text-sm mt-2 text-green-400">
                              <span className="font-medium">Respuesta correcta: </span>
                              {Array.isArray(question.correctAnswer)
                                ? question.correctAnswer.join(", ")
                                : question.correctAnswer}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Columna lateral */}
          <div className="space-y-4">
            <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-300">Progreso de Habilidades</CardTitle>
                <CardDescription>Habilidades desarrolladas con este Qernium</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.skillsProgress.map((skill) => {
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
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <Sparkles className={`h-4 w-4 ${textColor}`} />
                            <span className={`text-sm font-medium ${textColor}`}>{skill.subskillName}</span>
                          </div>
                          <Badge className={`bg-${skill.skillColor}-900/30 text-${skill.skillColor}-300 mt-1`}>
                            {skill.skillName}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>Nivel anterior: {skill.previousLevel}/4</span>
                            <span>Nuevo nivel: {skill.newLevel}/4</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <div className="flex gap-1 flex-1">
                              {[0, 1, 2, 3, 4].map((level) => (
                                <div
                                  key={level}
                                  className={`h-1.5 flex-1 rounded-full ${
                                    level <= skill.previousLevel
                                      ? "bg-gray-600"
                                      : level <= skill.newLevel
                                        ? textColor
                                        : "bg-gray-800"
                                  }`}
                                />
                              ))}
                            </div>

                            {skill.newLevel > skill.previousLevel && (
                              <Badge className="bg-green-900/30 text-green-300">
                                +{skill.newLevel - skill.previousLevel}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                <div className="p-4 border border-cyan-900/50 rounded-md bg-cyan-950/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-cyan-300" />
                    <h3 className="text-sm font-medium text-cyan-300">Nivel de Bloom</h3>
                  </div>
                  <Badge className="bg-blue-900/30 text-blue-300">Recordar</Badge>
                  <p className="text-xs text-muted-foreground mt-2">
                    Este Qernium te ha ayudado a desarrollar habilidades de reconocimiento y recuerdo de información
                    específica.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <CardHeader>
                <CardTitle className="text-lg text-purple-300">Logros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.score >= 80 && (
                    <div className="flex items-center gap-3 p-3 border border-amber-900/50 rounded-md bg-amber-950/10">
                      <Award className="h-8 w-8 text-amber-400" />
                      <div>
                        <div className="font-medium text-amber-300">Excelencia Académica</div>
                        <div className="text-xs text-muted-foreground">Obtuviste más del 80% en este Qernium</div>
                      </div>
                    </div>
                  )}

                  {result.timeSpent < 900 && (
                    <div className="flex items-center gap-3 p-3 border border-cyan-900/50 rounded-md bg-cyan-950/10">
                      <Clock className="h-8 w-8 text-cyan-400" />
                      <div>
                        <div className="font-medium text-cyan-300">Velocidad Mental</div>
                        <div className="text-xs text-muted-foreground">
                          Completaste el Qernium en menos de 15 minutos
                        </div>
                      </div>
                    </div>
                  )}

                  {result.skillsProgress.some((s) => s.newLevel > s.previousLevel) && (
                    <div className="flex items-center gap-3 p-3 border border-purple-900/50 rounded-md bg-purple-950/10">
                      <Sparkles className="h-8 w-8 text-purple-400" />
                      <div>
                        <div className="font-medium text-purple-300">Desarrollo de Habilidades</div>
                        <div className="text-xs text-muted-foreground">
                          Mejoraste tu nivel en al menos una habilidad
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardShell>
    </>
  )
}
