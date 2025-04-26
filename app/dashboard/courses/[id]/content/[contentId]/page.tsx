import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  FileText,
  Save,
  Settings,
  Video,
  Globe,
  LinkIcon,
  Plus,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export default function ContentDetailPage({
  params,
}: {
  params: { id: string; contentId: string }
}) {
  // Mock data for a content item
  const content = {
    id: params.contentId,
    courseId: params.id,
    moduleId: "1",
    title: "Física de los Viajes Espaciales",
    type: "video",
    description:
      "Este video explora los principios físicos fundamentales que rigen los viajes espaciales, incluyendo la mecánica orbital, la propulsión y los efectos de la microgravedad.",
    duration: "45:30",
    videoUrl: "https://example.com/videos/space-travel-physics.mp4",
    thumbnailUrl: "/placeholder.svg?height=720&width=1280",
    transcript:
      "En este video, exploraremos los principios físicos que hacen posible los viajes espaciales. Comenzaremos con las leyes de Newton y cómo se aplican al movimiento orbital...",
    quiz: [
      {
        question: "¿Qué ley de Newton es más relevante para entender la mecánica orbital?",
        options: [
          "Primera ley (Inercia)",
          "Segunda ley (F=ma)",
          "Tercera ley (Acción y reacción)",
          "Ley de gravitación universal",
        ],
        correctAnswer: 3,
      },
      {
        question: "¿Qué es la velocidad de escape?",
        options: [
          "La velocidad máxima que puede alcanzar un cohete",
          "La velocidad necesaria para entrar en órbita",
          "La velocidad mínima necesaria para escapar de la atracción gravitatoria de un cuerpo",
          "La velocidad a la que un objeto cae hacia la Tierra",
        ],
        correctAnswer: 2,
      },
    ],
    resources: [
      {
        title: "Ecuaciones de la Mecánica Orbital",
        type: "pdf",
        url: "https://example.com/resources/orbital-mechanics.pdf",
      },
      {
        title: "Simulador de Órbitas",
        type: "link",
        url: "https://example.com/simulators/orbit",
      },
    ],
    relatedContent: [
      {
        id: "rel-1",
        title: "Historia de la Exploración Espacial",
        type: "internal",
        contentType: "document",
        source: "Qernex: Exploración Espacial Avanzada",
      },
      {
        id: "rel-2",
        title: "Propulsión Iónica y Nuclear",
        type: "internal",
        contentType: "document",
        source: "Qernex: Exploración Espacial Avanzada",
      },
      {
        id: "rel-3",
        title: "Introducción a la Mecánica Orbital - NASA",
        type: "external",
        contentType: "link",
        url: "https://www.nasa.gov/orbital-mechanics",
      },
    ],
    nextContent: {
      id: "3",
      title: "Conceptos Básicos de Navegación",
    },
    prevContent: {
      id: "1",
      title: "Historia de la Exploración Espacial",
    },
    completed: true,
    completionRate: 85,
  }

  return (
    <>
      <DashboardHeader heading={content.title} text="Contenido del Qernex">
        <div className="flex gap-2">
          <Button variant="outline" className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20">
            <Edit className="mr-2 h-4 w-4" /> Editar
          </Button>
          <Button className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600">
            <Save className="mr-2 h-4 w-4" /> Guardar Cambios
          </Button>
        </div>
      </DashboardHeader>
      <DashboardShell>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl text-cyan-300">Vista Previa del Qernium</CardTitle>
                    <CardDescription>
                      {content.type === "video" ? "Video educativo" : "Documento de aprendizaje"}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      content.completed
                        ? "border-green-900/50 text-green-300 bg-green-950/20"
                        : "border-amber-900/50 text-amber-300 bg-amber-950/20"
                    }
                  >
                    {content.completed ? "Completado" : "Pendiente"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {content.type === "video" && (
                  <div className="space-y-4">
                    <div className="relative aspect-video rounded-md overflow-hidden border border-cyan-900/50">
                      <img
                        src={content.thumbnailUrl || "/placeholder.svg"}
                        alt={content.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="lg"
                          className="rounded-full w-16 h-16 bg-cyan-600/80 hover:bg-cyan-600 text-white"
                        >
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
                        {content.duration}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-cyan-300">Transcripción</h3>
                      <div className="p-4 border border-cyan-900/50 rounded-md bg-cyan-950/10 max-h-60 overflow-y-auto">
                        <p className="text-sm whitespace-pre-line">{content.transcript}</p>
                      </div>
                    </div>
                  </div>
                )}

                {content.type === "document" && (
                  <div className="space-y-4">
                    <div className="p-6 border border-cyan-900/50 rounded-md bg-cyan-950/10 min-h-[300px]">
                      <h2 className="text-xl font-bold mb-4 text-cyan-300">{content.title}</h2>
                      <p className="mb-4">{content.description}</p>
                      <p className="whitespace-pre-line">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                        tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget
                        ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-2">
                  {content.prevContent ? (
                    <Link href={`/dashboard/courses/${params.id}/content/${content.prevContent.id}`}>
                      <Button variant="outline" className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20">
                        <ArrowLeft className="mr-2 h-4 w-4" /> {content.prevContent.title}
                      </Button>
                    </Link>
                  ) : (
                    <div></div>
                  )}

                  {content.nextContent && (
                    <Link href={`/dashboard/courses/${params.id}/content/${content.nextContent.id}`}>
                      <Button variant="outline" className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20">
                        {content.nextContent.title} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="quiz" className="space-y-4">
              <TabsList className="bg-black/20 border border-cyan-900/50">
                <TabsTrigger
                  value="quiz"
                  className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Quiz
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Recursos
                </TabsTrigger>
                <TabsTrigger
                  value="related"
                  className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Contenido Relacionado
                </TabsTrigger>
                <TabsTrigger
                  value="stats"
                  className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Estadísticas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="quiz" className="space-y-4">
                <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-cyan-300">Quiz de Comprensión</CardTitle>
                    <CardDescription>Evalúa el conocimiento adquirido con estas preguntas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {content.quiz.map((question, index) => (
                      <div key={index} className="space-y-4">
                        <div className="flex items-start gap-2">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-900/50 text-cyan-300 text-xs">
                            {index + 1}
                          </span>
                          <div className="space-y-2 flex-1">
                            <h3 className="text-base font-medium">{question.question}</h3>
                            <RadioGroup defaultValue={question.correctAnswer.toString()}>
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center space-x-2 py-1">
                                  <RadioGroupItem
                                    value={optIndex.toString()}
                                    id={`q${index}-opt${optIndex}`}
                                    className="border-cyan-500 text-cyan-500"
                                  />
                                  <Label
                                    htmlFor={`q${index}-opt${optIndex}`}
                                    className={optIndex === question.correctAnswer ? "text-green-300" : ""}
                                  >
                                    {option}
                                    {optIndex === question.correctAnswer && (
                                      <span className="ml-2 text-green-400 text-xs">(Respuesta correcta)</span>
                                    )}
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600">
                      <CheckCircle className="mr-2 h-4 w-4" /> Guardar Quiz
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-cyan-300">Recursos Adicionales</CardTitle>
                    <CardDescription>Material complementario para profundizar en el tema</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {content.resources.map((resource, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 border border-cyan-900/50 rounded-md bg-cyan-950/10"
                        >
                          <div className="flex items-center gap-2">
                            {resource.type === "pdf" ? (
                              <FileText className="h-4 w-4 text-cyan-400" />
                            ) : (
                              <BookOpen className="h-4 w-4 text-cyan-400" />
                            )}
                            <span>{resource.title}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                          >
                            <Eye className="mr-2 h-4 w-4" /> Ver
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-resource">Añadir Recurso</Label>
                      <div className="flex gap-2">
                        <Input
                          id="new-resource"
                          placeholder="Título del recurso"
                          className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                        />
                        <Button variant="outline" className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20">
                          Añadir
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="related" className="space-y-4">
                <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-cyan-300">Contenido Relacionado</CardTitle>
                    <CardDescription>Qerniums y recursos externos relacionados con este contenido</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {content.relatedContent.map((related, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 border border-cyan-900/50 rounded-md bg-cyan-950/10"
                        >
                          <div className="flex items-center gap-2">
                            {related.type === "internal" ? (
                              related.contentType === "document" ? (
                                <FileText className="h-4 w-4 text-cyan-400" />
                              ) : related.contentType === "video" ? (
                                <Video className="h-4 w-4 text-cyan-400" />
                              ) : (
                                <FileText className="h-4 w-4 text-cyan-400" />
                              )
                            ) : (
                              <Globe className="h-4 w-4 text-cyan-400" />
                            )}
                            <div>
                              <div>{related.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {related.type === "internal" ? related.source : related.url?.substring(0, 30) + "..."}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                          >
                            <Eye className="mr-2 h-4 w-4" /> Ver
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Añadir Contenido
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                        >
                          <Globe className="mr-2 h-4 w-4" /> Añadir Enlace Externo
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                      >
                        <Sparkles className="mr-2 h-4 w-4" /> Recomendar Contenido
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-cyan-300">Estadísticas de Uso</CardTitle>
                    <CardDescription>Datos sobre la interacción de los estudiantes con este contenido</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-cyan-900/50 rounded-md bg-cyan-950/10 space-y-2">
                        <h3 className="text-sm font-medium text-cyan-300">Tasa de Finalización</h3>
                        <div className="text-3xl font-bold">{content.completionRate}%</div>
                        <Progress
                          value={content.completionRate}
                          className="h-2 bg-black/50"
                          indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyan-300"
                        />
                      </div>

                      <div className="p-4 border border-cyan-900/50 rounded-md bg-cyan-950/10 space-y-2">
                        <h3 className="text-sm font-medium text-cyan-300">Tiempo Promedio</h3>
                        <div className="text-3xl font-bold">12:45</div>
                        <div className="text-xs text-muted-foreground">Duración total: {content.duration}</div>
                      </div>

                      <div className="p-4 border border-cyan-900/50 rounded-md bg-cyan-950/10 space-y-2">
                        <h3 className="text-sm font-medium text-cyan-300">Aciertos en Quiz</h3>
                        <div className="text-3xl font-bold">72%</div>
                        <Progress
                          value={72}
                          className="h-2 bg-black/50"
                          indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyan-300"
                        />
                      </div>

                      <div className="p-4 border border-cyan-900/50 rounded-md bg-cyan-950/10 space-y-2">
                        <h3 className="text-sm font-medium text-cyan-300">Interacciones</h3>
                        <div className="text-3xl font-bold">156</div>
                        <div className="text-xs text-muted-foreground">Última: hace 2 días</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-300">Detalles del Qernium</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content-title">Título</Label>
                  <Input
                    id="content-title"
                    value={content.title}
                    className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content-description">Descripción</Label>
                  <Textarea
                    id="content-description"
                    value={content.description}
                    className="min-h-[100px] border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content-type">Tipo de Contenido</Label>
                  <select
                    id="content-type"
                    defaultValue={content.type}
                    className="flex h-10 w-full rounded-md border border-cyan-900/50 bg-black/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="video">Video</option>
                    <option value="document">Documento</option>
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Tarea</option>
                  </select>
                </div>

                {content.type === "video" && (
                  <div className="space-y-2">
                    <Label htmlFor="content-duration">Duración</Label>
                    <Input
                      id="content-duration"
                      value={content.duration}
                      className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="content-required" className="border-cyan-500 text-cyan-500" defaultChecked />
                    <Label htmlFor="content-required">Contenido obligatorio</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="content-downloadable" className="border-cyan-500 text-cyan-500" />
                    <Label htmlFor="content-downloadable">Permitir descarga</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-300">Ubicación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Qernex</div>
                  <div className="font-medium">Exploración Espacial Avanzada</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Qluster</div>
                  <div className="font-medium">Fundamentos de la Exploración Espacial</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Posición</div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">2 de 3</span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                      >
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
                          <path d="m18 15-6-6-6 6" />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                      >
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
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href={`/dashboard/courses/${params.id}`}>
                    <Button variant="outline" className="w-full border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Qernex
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-300">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-cyan-900/20">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-cyan-400 mr-2" />
                      <span className="text-sm">Contenido actualizado</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Hace 2 días</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-cyan-900/20">
                    <div className="flex items-center">
                      <Video className="h-4 w-4 text-cyan-400 mr-2" />
                      <span className="text-sm">Video reemplazado</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Hace 1 semana</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-cyan-900/20">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-cyan-400 mr-2" />
                      <span className="text-sm">Quiz añadido</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Hace 2 semanas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardShell>
    </>
  )
}
