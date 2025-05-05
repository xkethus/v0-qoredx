"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  FileText,
  Video,
  BookOpen,
  LinkIcon,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Check,
  AlertCircle,
} from "lucide-react"
import type { ContentType } from "@/lib/actions/content-actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SupabaseSetupGuide } from "@/components/supabase-setup-guide"
import SimpleRichEditor from "@/components/simple-rich-editor"

// Tipos para el contenido
// type ContentType = "document" | "video" | "quiz" | "assignment"

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

export default function CreateQerniumPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("recent")
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [contentType, setContentType] = useState<"text" | "video" | "document" | "link">("text")
  const [videoSource, setVideoSource] = useState<"url" | "file">("url")
  const [showSetupGuide, setShowSetupGuide] = useState(false)

  // Estado para los contenidos existentes
  const [existingContents, setExistingContents] = useState<Content[]>([])
  const [isLoadingContents, setIsLoadingContents] = useState(false)
  const [contentError, setContentError] = useState<string | null>(null)
  const [selectedContents, setSelectedContents] = useState<Content[]>([])
  const [contentTypeFilter, setContentTypeFilter] = useState<ContentType | "all">("all")
  const [activeTab, setActiveTab] = useState("create-content")

  const [qernium, setQernium] = useState({
    title: "",
    description: "",
    bloomLevel: "remember",
    actionVerb: "",
    estimatedTime: 30,
    content: {
      text: "",
      url: "",
      file: null as File | null,
      videoFile: null as File | null,
    },
  })

  // Estado para las habilidades asignadas
  const [assignedSkills, setAssignedSkills] = useState<
    Array<{
      id: string
      subskillId: string
      subskillName: string
      skillName: string
      skillColor: string
      level: number
    }>
  >([])

  // Mock data para habilidades y subhabilidades
  const skills = [
    {
      id: "1",
      name: "Pensamiento Crítico",
      color: "purple",
      subskills: [
        { id: "1", name: "Análisis de Argumentos" },
        { id: "2", name: "Evaluación de Evidencia" },
      ],
    },
    {
      id: "2",
      name: "Comunicación Efectiva",
      color: "cyan",
      subskills: [
        { id: "3", name: "Comunicación Escrita" },
        { id: "4", name: "Comunicación Oral" },
      ],
    },
    {
      id: "3",
      name: "Resolución de Problemas",
      color: "pink",
      subskills: [{ id: "5", name: "Definición de Problemas" }],
    },
    {
      id: "4",
      name: "Creatividad",
      color: "amber",
      subskills: [{ id: "6", name: "Pensamiento Divergente" }],
    },
  ]

  // Estado para el selector de habilidades
  const [selectedSkill, setSelectedSkill] = useState("")
  const [selectedSubskill, setSelectedSubskill] = useState("")
  const [skillLevel, setSkillLevel] = useState(2) // Nivel por defecto (0-4)

  // Verbos de acción según nivel de Bloom
  const bloomVerbs: Record<string, string[]> = {
    remember: ["Identificar", "Reconocer", "Recordar", "Enumerar", "Definir", "Nombrar"],
    understand: ["Explicar", "Describir", "Interpretar", "Resumir", "Clasificar", "Comparar"],
    apply: ["Aplicar", "Implementar", "Usar", "Ejecutar", "Resolver", "Demostrar"],
    analyze: ["Analizar", "Diferenciar", "Organizar", "Comparar", "Contrastar", "Examinar"],
    evaluate: ["Evaluar", "Juzgar", "Criticar", "Justificar", "Defender", "Valorar"],
    create: ["Crear", "Diseñar", "Producir", "Planear", "Elaborar", "Desarrollar"],
  }

  // Opciones de apariencia para el Qernium
  const appearanceOptions = [
    { id: "default", name: "Estándar", image: "/generic-placeholder-pattern.png" },
    { id: "abstract-geometric", name: "Geométrico", image: "/abstract-geometric-pattern.png" },
    { id: "abstract-gold", name: "Dorado", image: "/abstract-geometric-gold.png" },
    { id: "abstract-color", name: "Colorido", image: "/abstract-color-run.png" },
    { id: "abstract-em", name: "Electromagnético", image: "/abstract-em.png" },
  ]

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

  // Función para obtener el icono según el tipo de contenido
  const getContentIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4 text-purple-300" />
      case "video":
        return <Video className="h-4 w-4 text-cyan-300" />
      case "quiz":
        return <BookOpen className="h-4 w-4 text-amber-300" />
      case "assignment":
        return <LinkIcon className="h-4 w-4 text-pink-300" />
      default:
        return <FileText className="h-4 w-4 text-gray-300" />
    }
  }

  // Función para obtener el color de la insignia según el tipo de contenido
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

  // Función para añadir una habilidad asignada
  const addAssignedSkill = () => {
    if (!selectedSkill || !selectedSubskill) {
      toast({
        title: "Error",
        description: "Debes seleccionar una habilidad y una subhabilidad",
        variant: "destructive",
      })
      return
    }

    // Verificar si ya existe esta subhabilidad
    if (assignedSkills.some((s) => s.subskillId === selectedSubskill)) {
      toast({
        title: "Error",
        description: "Esta subhabilidad ya ha sido asignada",
        variant: "destructive",
      })
      return
    }

    // Encontrar la habilidad y subhabilidad seleccionadas
    const skill = skills.find((s) => s.id === selectedSkill)
    const subskill = skill?.subskills.find((ss) => ss.id === selectedSubskill)

    if (skill && subskill) {
      setAssignedSkills([
        ...assignedSkills,
        {
          id: crypto.randomUUID(),
          subskillId: subskill.id,
          subskillName: subskill.name,
          skillName: skill.name,
          skillColor: skill.color,
          level: skillLevel,
        },
      ])

      // Resetear selección
      setSelectedSubskill("")
      setSkillLevel(2)

      toast({
        title: "Subhabilidad asignada",
        description: `Se ha asignado "${subskill.name}" con nivel ${skillLevel}`,
      })
    }
  }

  // Función para eliminar una habilidad asignada
  const removeAssignedSkill = (id: string) => {
    setAssignedSkills(assignedSkills.filter((s) => s.id !== id))
  }

  // Función para manejar el cambio de nivel de Bloom
  const handleBloomLevelChange = (level: string) => {
    setQernium({
      ...qernium,
      bloomLevel: level,
      actionVerb: "", // Resetear el verbo de acción
    })
  }

  // Función para manejar la selección de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: "document" | "video") => {
    if (e.target.files && e.target.files[0]) {
      if (fileType === "document") {
        setQernium({
          ...qernium,
          content: {
            ...qernium.content,
            file: e.target.files[0],
          },
        })
      } else {
        setQernium({
          ...qernium,
          content: {
            ...qernium.content,
            videoFile: e.target.files[0],
          },
        })
      }
    }
  }

  // Función para seleccionar un contenido existente
  const toggleContentSelection = (content: Content) => {
    const isSelected = selectedContents.some((c) => c.id === content.id)

    if (isSelected) {
      setSelectedContents(selectedContents.filter((c) => c.id !== content.id))
    } else {
      setSelectedContents([...selectedContents, content])
    }
  }

  // Función para manejar la selección de contenido
  const handleContentSelect = (content: Content) => {
    setSelectedContent(content)
  }

  // Función para clonar el contenido seleccionado
  const handleCloneContent = () => {
    if (!selectedContent) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un contenido primero",
        variant: "destructive",
      })
      return
    }

    // Aquí simularíamos la clonación del contenido
    toast({
      title: "Contenido clonado",
      description: `Has clonado "${selectedContent.title}"`,
    })

    // Actualizar el estado con el contenido clonado
    setQernium({
      ...qernium,
      content: {
        ...qernium.content,
        text: selectedContent.type === "document" ? "Contenido clonado" : "",
        url: selectedContent.type === "video" || selectedContent.type === "assignment" ? "https://example.com" : "",
        file: null,
        videoFile: null,
      },
    })
    setContentType(
      selectedContent.type === "document"
        ? "text"
        : selectedContent.type === "video"
          ? "video"
          : selectedContent.type === "quiz"
            ? "document"
            : "link",
    )
    setActiveTab("create-content")
  }

  // Función para guardar el Qernium
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null) // Clear any previous errors

    try {
      // Prepare data to send to the API
      const qerniumData = {
        title: qernium.title,
        description: qernium.description,
        bloomLevel: qernium.bloomLevel,
        actionVerb: qernium.actionVerb,
        estimatedTime: qernium.estimatedTime,
        coverImage: coverImage,
        skills: assignedSkills.map((skill) => ({
          subskillId: skill.subskillId,
          level: skill.level,
        })),
        contentIds: selectedContents.map((content) => content.id),
        content:
          activeTab === "create-content"
            ? {
                title: qernium.title, // Usamos el título del Qernium
                description: qernium.description, // Usamos la descripción del Qernium
                text: contentType === "text" ? qernium.content.text : undefined,
                url:
                  (contentType === "video" && videoSource === "url") || contentType === "link"
                    ? qernium.content.url
                    : undefined,
              }
            : undefined,
      }

      // Simulamos una petición
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Qernium creado",
        description: "El Qernium ha sido creado exitosamente",
      })

      // Redirigir a la página de Qerniums
      router.push("/dashboard/qerniums")
    } catch (error: any) {
      console.error("Error al crear Qernium:", error)
      setError(error.message || "Hubo un error al crear el Qernium")
      toast({
        title: "Error",
        description: "Hubo un error al crear el Qernium",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Validación para habilitar el botón siguiente
  const canProceedToStep2 = qernium.title.trim() !== "" && qernium.bloomLevel !== ""
  const canProceedToStep3 = true // Siempre podemos avanzar al paso 3
  const canProceedToStep4 = true // Siempre podemos avanzar al paso 4
  const canSubmit = qernium.title.trim() !== "" && qernium.bloomLevel !== ""

  // Renderizar el indicador de pasos
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400"
            }`}
          >
            1
          </div>
          <div className={`h-1 w-12 ${currentStep > 1 ? "bg-purple-600" : "bg-gray-700"}`}></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400"
            }`}
          >
            2
          </div>
          <div className={`h-1 w-12 ${currentStep > 2 ? "bg-purple-600" : "bg-gray-700"}`}></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 3 ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400"
            }`}
          >
            3
          </div>
          <div className={`h-1 w-12 ${currentStep > 3 ? "bg-purple-600" : "bg-gray-700"}`}></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= 4 ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400"
            }`}
          >
            4
          </div>
        </div>
      </div>
    )
  }

  // If we need to show the setup guide
  if (showSetupGuide) {
    return (
      <div className="container relative py-8">
        <Alert className="mb-6 bg-amber-900/20 border-amber-900/50">
          <AlertCircle className="h-4 w-4 text-amber-300" />
          <AlertTitle className="text-amber-300">Configuración requerida</AlertTitle>
          <AlertDescription>
            Se requiere configurar Supabase para utilizar todas las funcionalidades de la aplicación.
          </AlertDescription>
        </Alert>
        <SupabaseSetupGuide />
      </div>
    )
  }

  return (
    <>
      <DashboardHeader heading="Crear Qernium" text="Crea una nueva unidad de aprendizaje">
        <Button
          variant="outline"
          className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
          onClick={() => router.push("/dashboard/qerniums")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver
        </Button>
      </DashboardHeader>

      <DashboardShell>
        {renderStepIndicator()}

        {/* Paso 1: Información Básica */}
        {currentStep === 1 && (
          <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <CardHeader>
              <CardTitle className="text-xl text-purple-300">Información Básica</CardTitle>
              <CardDescription>Define los detalles básicos del Qernium</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Título <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={qernium.title}
                  onChange={(e) => setQernium({ ...qernium, title: e.target.value })}
                  placeholder="Ej: Introducción a la Física Cuántica"
                  className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Descripción <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={qernium.description}
                  onChange={(e) => setQernium({ ...qernium, description: e.target.value })}
                  placeholder="Describe brevemente este Qernium..."
                  className="min-h-[100px] border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                />
              </div>

              <div className="space-y-4">
                <Label>
                  Nivel de Bloom <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.keys(bloomVerbs).map((level) => (
                    <div
                      key={level}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        qernium.bloomLevel === level
                          ? "border-purple-500 bg-purple-900/30"
                          : "border-gray-700 bg-black/30 hover:bg-gray-900/30"
                      }`}
                      onClick={() => handleBloomLevelChange(level)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium px-2 py-1 rounded ${getBloomLevelColor(level)}`}>
                          {getBloomLevelName(level)}
                        </span>
                        {qernium.bloomLevel === level && <Check className="h-4 w-4 text-purple-400" />}
                      </div>
                      <div className="text-xs text-gray-400">
                        {bloomVerbs[level].slice(0, 3).join(", ")}
                        {bloomVerbs[level].length > 3 ? "..." : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {qernium.bloomLevel && (
                <div className="space-y-2">
                  <Label htmlFor="action-verb">
                    Verbo de Acción <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={qernium.actionVerb}
                    onValueChange={(value) => setQernium({ ...qernium, actionVerb: value })}
                  >
                    <SelectTrigger id="action-verb" className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
                      <SelectValue placeholder="Selecciona un verbo de acción" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-purple-900/50">
                      {bloomVerbs[qernium.bloomLevel]?.map((verb) => (
                        <SelectItem key={verb} value={verb}>
                          {verb}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="estimated-time">Tiempo Estimado (minutos)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="estimated-time"
                    min={5}
                    max={120}
                    step={5}
                    value={[qernium.estimatedTime]}
                    onValueChange={(value) => setQernium({ ...qernium, estimatedTime: value[0] })}
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{qernium.estimatedTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Paso 2: Contenido */}
        {currentStep === 2 && (
          <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <CardHeader>
              <CardTitle className="text-xl text-purple-300">Contenido</CardTitle>
              <CardDescription>Añade o selecciona el contenido para este Qernium</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-black/20 border border-purple-900/50 mb-4">
                  <TabsTrigger
                    value="create-content"
                    className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
                  >
                    Crear Contenido
                  </TabsTrigger>
                  <TabsTrigger
                    value="all-content"
                    className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                  >
                    Contenido Existente
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="create-content" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Tipo de Contenido</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div
                          className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col items-center ${
                            contentType === "text"
                              ? "border-purple-500 bg-purple-900/30"
                              : "border-gray-700 bg-black/30 hover:bg-gray-900/30"
                          }`}
                          onClick={() => setContentType("text")}
                        >
                          <FileText className="h-6 w-6 mb-2 text-purple-300" />
                          <span>Texto</span>
                        </div>
                        <div
                          className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col items-center ${
                            contentType === "video"
                              ? "border-cyan-500 bg-cyan-900/30"
                              : "border-gray-700 bg-black/30 hover:bg-gray-900/30"
                          }`}
                          onClick={() => setContentType("video")}
                        >
                          <Video className="h-6 w-6 mb-2 text-cyan-300" />
                          <span>Video</span>
                        </div>
                        <div
                          className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col items-center ${
                            contentType === "document"
                              ? "border-amber-500 bg-amber-900/30"
                              : "border-gray-700 bg-black/30 hover:bg-gray-900/30"
                          }`}
                          onClick={() => setContentType("document")}
                        >
                          <BookOpen className="h-6 w-6 mb-2 text-amber-300" />
                          <span>Documento</span>
                        </div>
                        <div
                          className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col items-center ${
                            contentType === "link"
                              ? "border-pink-500 bg-pink-900/30"
                              : "border-gray-700 bg-black/30 hover:bg-gray-900/30"
                          }`}
                          onClick={() => setContentType("link")}
                        >
                          <LinkIcon className="h-6 w-6 mb-2 text-pink-300" />
                          <span>Enlace</span>
                        </div>
                      </div>
                    </div>

                    {/* Contenido específico según el tipo seleccionado */}
                    {contentType === "text" && (
                      <div className="space-y-2">
                        <Label htmlFor="text-content">Contenido de Texto</Label>
                        <SimpleRichEditor
                          value={qernium.content.text}
                          onChange={(value) =>
                            setQernium({
                              ...qernium,
                              content: { ...qernium.content, text: value },
                            })
                          }
                          theme="spacepunk"
                          placeholder="Escribe el contenido aquí..."
                        />
                      </div>
                    )}

                    {contentType === "video" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Fuente del Video</Label>
                          <div className="flex space-x-4">
                            <div className="flex items-center">
                              <RadioGroup value={videoSource} onValueChange={setVideoSource}>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="url" id="video-url" />
                                  <Label htmlFor="video-url">URL</Label>
                                </div>
                              </RadioGroup>
                            </div>
                            <div className="flex items-center">
                              <RadioGroup value={videoSource} onValueChange={setVideoSource}>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="file" id="video-file" />
                                  <Label htmlFor="video-file">Archivo</Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </div>

                        {videoSource === "url" ? (
                          <div className="space-y-2">
                            <Label htmlFor="video-url-input">URL del Video</Label>
                            <Input
                              id="video-url-input"
                              value={qernium.content.url}
                              onChange={(e) =>
                                setQernium({
                                  ...qernium,
                                  content: { ...qernium.content, url: e.target.value },
                                })
                              }
                              placeholder="https://www.youtube.com/watch?v=..."
                              className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                            />
                            <p className="text-xs text-gray-400">
                              Soportamos videos de YouTube, Vimeo y otros servicios populares.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Label htmlFor="video-file-input">Archivo de Video</Label>
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="video-file-input"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-cyan-900/50 bg-black/30 hover:bg-cyan-900/10"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Video className="w-8 h-8 mb-2 text-cyan-300" />
                                  <p className="mb-2 text-sm text-gray-300">
                                    <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                                  </p>
                                  <p className="text-xs text-gray-400">MP4, WebM o MOV (máx. 100MB)</p>
                                </div>
                                <input
                                  id="video-file-input"
                                  type="file"
                                  accept="video/*"
                                  className="hidden"
                                  onChange={(e) => handleFileChange(e, "video")}
                                />
                              </label>
                            </div>
                            {qernium.content.videoFile && (
                              <p className="text-sm text-cyan-300">
                                Archivo seleccionado: {qernium.content.videoFile.name}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {contentType === "document" && (
                      <div className="space-y-2">
                        <Label htmlFor="document-file">Archivo de Documento</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="document-file"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-amber-900/50 bg-black/30 hover:bg-amber-900/10"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <FileText className="w-8 h-8 mb-2 text-amber-300" />
                              <p className="mb-2 text-sm text-gray-300">
                                <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                              </p>
                              <p className="text-xs text-gray-400">PDF, DOCX o PPTX (máx. 50MB)</p>
                            </div>
                            <input
                              id="document-file"
                              type="file"
                              accept=".pdf,.docx,.pptx"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, "document")}
                            />
                          </label>
                        </div>
                        {qernium.content.file && (
                          <p className="text-sm text-amber-300">Archivo seleccionado: {qernium.content.file.name}</p>
                        )}
                      </div>
                    )}

                    {contentType === "link" && (
                      <div className="space-y-2">
                        <Label htmlFor="link-url">URL del Recurso</Label>
                        <Input
                          id="link-url"
                          value={qernium.content.url}
                          onChange={(e) =>
                            setQernium({
                              ...qernium,
                              content: { ...qernium.content, url: e.target.value },
                            })
                          }
                          placeholder="https://..."
                          className="border-pink-900/50 bg-black/50 focus-visible:ring-pink-500"
                        />
                        <p className="text-xs text-gray-400">
                          Enlace a un recurso externo como una página web, artículo o herramienta.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="all-content" className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Buscar contenido..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                        />
                        <Button
                          variant="outline"
                          className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                          onClick={() => setShowFilters(!showFilters)}
                        >
                          Filtros
                        </Button>
                      </div>

                      {showFilters && (
                        <div className="p-4 border rounded-md border-purple-900/50 bg-black/30 space-y-4">
                          <div className="space-y-2">
                            <Label>Tipo de Contenido</Label>
                            <Select
                              value={contentTypeFilter}
                              onValueChange={(value) => setContentTypeFilter(value as any)}
                            >
                              <SelectTrigger className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
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

                          <div className="space-y-2">
                            <Label>Ordenar por</Label>
                            <Select value={sortBy} onValueChange={setSortBy}>
                              <SelectTrigger className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
                                <SelectValue placeholder="Más reciente" />
                              </SelectTrigger>
                              <SelectContent className="bg-black/90 border-purple-900/50">
                                <SelectItem value="recent">Más reciente</SelectItem>
                                <SelectItem value="title">Título (A-Z)</SelectItem>
                                <SelectItem value="type">Tipo</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">Contenidos Disponibles</h3>
                          <Badge variant="outline" className="text-xs">
                            {existingContents.length} resultados
                          </Badge>
                        </div>

                        {isLoadingContents ? (
                          <div className="flex justify-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                          </div>
                        ) : contentError ? (
                          <div className="p-4 border rounded-md border-red-900/50 bg-red-900/10 text-red-300">
                            {contentError}
                          </div>
                        ) : existingContents.length === 0 ? (
                          <div className="p-4 border rounded-md border-gray-700 bg-black/30 text-center">
                            No se encontraron contenidos
                          </div>
                        ) : (
                          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                            {existingContents.map((content) => (
                              <div
                                key={content.id}
                                className={`p-3 border rounded-md cursor-pointer transition-all ${
                                  selectedContents.some((c) => c.id === content.id)
                                    ? "border-purple-500 bg-purple-900/20"
                                    : "border-gray-700 bg-black/30 hover:bg-gray-900/30"
                                }`}
                                onClick={() => toggleContentSelection(content)}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex items-start space-x-2">
                                    <div className="mt-1">{getContentIcon(content.type)}</div>
                                    <div>
                                      <h4 className="font-medium">{content.title}</h4>
                                      <p className="text-sm text-gray-400 line-clamp-2">{content.description}</p>
                                    </div>
                                  </div>
                                  <Badge variant="outline" className={`text-xs ${getContentBadgeClass(content.type)}`}>
                                    {content.type}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="w-full md:w-64 space-y-4">
                      <div className="p-4 border rounded-md border-purple-900/50 bg-black/30">
                        <h3 className="font-medium mb-2">Contenidos Seleccionados</h3>
                        {selectedContents.length === 0 ? (
                          <p className="text-sm text-gray-400">No hay contenidos seleccionados</p>
                        ) : (
                          <div className="space-y-2">
                            {selectedContents.map((content) => (
                              <div key={content.id} className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  {getContentIcon(content.type)}
                                  <span className="text-sm truncate max-w-[150px]">{content.title}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-950/20"
                                  onClick={() => toggleContentSelection(content)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Paso 3: Habilidades */}
        {currentStep === 3 && (
          <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <CardHeader>
              <CardTitle className="text-xl text-purple-300">Habilidades</CardTitle>
              <CardDescription>Asigna habilidades y subhabilidades a este Qernium</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Asignar Habilidades</h3>

                  <div className="space-y-2">
                    <Label htmlFor="skill">Habilidad</Label>
                    <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                      <SelectTrigger id="skill" className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
                        <SelectValue placeholder="Selecciona una habilidad" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-purple-900/50">
                        {skills.map((skill) => (
                          <SelectItem key={skill.id} value={skill.id}>
                            <div className="flex items-center">
                              <div
                                className={`w-2 h-2 rounded-full mr-2 bg-${skill.color}-500`}
                                style={{ backgroundColor: `var(--${skill.color}-500)` }}
                              ></div>
                              {skill.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedSkill && (
                    <div className="space-y-2">
                      <Label htmlFor="subskill">Subhabilidad</Label>
                      <Select value={selectedSubskill} onValueChange={setSelectedSubskill}>
                        <SelectTrigger id="subskill" className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
                          <SelectValue placeholder="Selecciona una subhabilidad" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 border-purple-900/50">
                          {skills
                            .find((s) => s.id === selectedSkill)
                            ?.subskills.map((subskill) => (
                              <SelectItem key={subskill.id} value={subskill.id}>
                                {subskill.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {selectedSubskill && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="skill-level">Nivel de Dominio</Label>
                        <span className="text-sm font-medium">{skillLevel}</span>
                      </div>
                      <Slider
                        id="skill-level"
                        min={0}
                        max={4}
                        step={1}
                        value={[skillLevel]}
                        onValueChange={(value) => setSkillLevel(value[0])}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Básico</span>
                        <span>Avanzado</span>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={addAssignedSkill}
                    disabled={!selectedSkill || !selectedSubskill}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Añadir Habilidad
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Habilidades Asignadas</h3>

                  {assignedSkills.length === 0 ? (
                    <div className="p-8 border rounded-md border-gray-700 bg-black/30 text-center text-gray-400">
                      No hay habilidades asignadas
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                      {assignedSkills.map((skill) => (
                        <div key={skill.id} className="p-3 border rounded-md border-gray-700 bg-black/30 relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-950/20"
                            onClick={() => removeAssignedSkill(skill.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          <div className="pr-8">
                            <div className="flex items-center mb-2">
                              <div
                                className={`w-2 h-2 rounded-full mr-2`}
                                style={{ backgroundColor: `var(--${skill.skillColor}-500)` }}
                              ></div>
                              <span className="font-medium">{skill.skillName}</span>
                            </div>
                            <div className="text-sm ml-4 mb-2">{skill.subskillName}</div>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-700 rounded-full h-1.5 mr-2">
                                <div
                                  className={`bg-${skill.skillColor}-500 h-1.5 rounded-full`}
                                  style={{
                                    width: `${(skill.level / 4) * 100}%`,
                                    backgroundColor: `var(--${skill.skillColor}-500)`,
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium">{skill.level}/4</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Paso 4: Apariencia */}
        {currentStep === 4 && (
          <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <CardHeader>
              <CardTitle className="text-xl text-purple-300">Apariencia</CardTitle>
              <CardDescription>Personaliza la apariencia visual del Qernium</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Imagen de Portada</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {appearanceOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`rounded-lg overflow-hidden cursor-pointer transition-all ${
                        coverImage === option.image
                          ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-black"
                          : "hover:opacity-80"
                      }`}
                      onClick={() => setCoverImage(option.image)}
                    >
                      <img
                        src={option.image || "/placeholder.svg"}
                        alt={option.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2 bg-black/50 text-center">
                        <span className="text-sm">{option.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Vista Previa</Label>
                <div className="border rounded-lg border-purple-900/50 overflow-hidden">
                  <div
                    className="h-40 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${coverImage || "/generic-placeholder-pattern.png"})`,
                    }}
                  ></div>
                  <div className="p-4 bg-black/70">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{qernium.title || "Título del Qernium"}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {qernium.description || "Descripción del Qernium..."}
                        </p>
                      </div>
                      <Badge className={`${getBloomLevelColor(qernium.bloomLevel)}`}>
                        {getBloomLevelName(qernium.bloomLevel)}
                      </Badge>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {assignedSkills.slice(0, 3).map((skill) => (
                        <Badge
                          key={skill.id}
                          variant="outline"
                          className="bg-black/50"
                          style={{ borderColor: `var(--${skill.skillColor}-500)` }}
                        >
                          {skill.subskillName}
                        </Badge>
                      ))}
                      {assignedSkills.length > 3 && (
                        <Badge variant="outline" className="bg-black/50">
                          +{assignedSkills.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          {currentStep < 4 ? (
            <Button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={
                (currentStep === 1 && !canProceedToStep2) ||
                (currentStep === 2 && !canProceedToStep3) ||
                (currentStep === 3 && !canProceedToStep4)
              }
            >
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !canSubmit}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Creando...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" /> Crear Qernium
                </>
              )}
            </Button>
          )}
        </div>
      </DashboardShell>
    </>
  )
}
