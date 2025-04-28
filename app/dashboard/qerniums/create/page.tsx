"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Clock,
  Save,
  Sparkles,
  Plus,
  Minus,
  Lightbulb,
  ImageIcon,
  ChevronRight,
  ChevronLeft,
  FileText,
  Video,
  BookOpen,
  LinkIcon,
  Search,
  Filter,
  Copy,
  Upload,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { CoverImageUpload } from "@/components/cover-image-upload"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SimpleTextEditor } from "@/components/simple-text-editor"

export default function CreateQerniumPage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("recent")
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [contentType, setContentType] = useState<"text" | "video" | "document" | "link">("text")
  const [videoSource, setVideoSource] = useState<"url" | "file">("url")
  const [useSimpleEditor, setUseSimpleEditor] = useState(false)
  const [quillLoadAttempts, setQuillLoadAttempts] = useState(0)
  const quillContainerRef = useRef<HTMLDivElement>(null)
  const quillInstanceRef = useRef<any>(null)

  const [qernium, setQernium] = useState({
    title: "",
    description: "",
    bloomLevel: "remember",
    actionVerb: "",
    estimatedTime: 30,
    content: {
      title: "",
      description: "",
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

  // Mock data para contenidos existentes
  const mockContents = [
    {
      id: "1",
      title: "Introducción a la Física Cuántica",
      description: "Una introducción a los conceptos básicos de la física cuántica",
      type: "text",
      createdAt: "2023-05-15T10:30:00Z",
      author: "Dr. Juan Pérez",
    },
    {
      id: "2",
      title: "Tutorial: Ecuaciones Diferenciales",
      description: "Video explicativo sobre cómo resolver ecuaciones diferenciales de primer orden",
      type: "video",
      createdAt: "2023-06-20T14:45:00Z",
      author: "Dra. María González",
    },
    {
      id: "3",
      title: "Guía de Estudio: Cálculo Integral",
      description: "Documento PDF con ejercicios y teoría sobre cálculo integral",
      type: "document",
      createdAt: "2023-04-10T09:15:00Z",
      author: "Prof. Carlos Rodríguez",
    },
    {
      id: "4",
      title: "Recursos de Khan Academy",
      description: "Enlaces a recursos educativos de Khan Academy sobre álgebra",
      type: "link",
      createdAt: "2023-07-05T16:20:00Z",
      author: "Lic. Ana Martínez",
    },
    {
      id: "5",
      title: "Teoría de la Relatividad",
      description: "Explicación detallada de la teoría de la relatividad de Einstein",
      type: "text",
      createdAt: "2023-03-25T11:10:00Z",
      author: "Dr. Roberto Sánchez",
    },
  ]

  // Estado para el selector de habilidades
  const [selectedSkill, setSelectedSkill] = useState("")
  const [selectedSubskill, setSelectedSubskill] = useState("")
  const [skillLevel, setSkillLevel] = useState(2) // Nivel por defecto (0-4)
  const [activeTab, setActiveTab] = useState("create-content")

  // Verbos de acción según nivel de Bloom
  const bloomVerbs: Record<string, string[]> = {
    remember: ["Identificar", "Reconocer", "Recordar", "Enumerar", "Definir", "Nombrar"],
    understand: ["Explicar", "Describir", "Interpretar", "Resumir", "Clasificar", "Comparar"],
    apply: ["Aplicar", "Implementar", "Usar", "Ejecutar", "Resolver", "Demostrar"],
    analyze: ["Analizar", "Diferenciar", "Organizar", "Comparar", "Contrastar", "Examinar"],
    evaluate: ["Evaluar", "Juzgar", "Criticar", "Justificar", "Defender", "Valorar"],
    create: ["Crear", "Diseñar", "Producir", "Planear", "Elaborar", "Desarrollar"],
  }

  // Filtrar contenidos según la pestaña activa y la búsqueda
  const filteredContents = mockContents
    .filter((content) => {
      if (activeTab === "all-content") return true
      if (activeTab === "text-content") return content.type === "text"
      if (activeTab === "video-content") return content.type === "video"
      if (activeTab === "document-content") return content.type === "document"
      if (activeTab === "link-content") return content.type === "link"
      return true
    })
    .filter((content) => {
      if (!searchQuery) return true
      return (
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  // Ordenar contenidos
  const sortedContents = [...filteredContents].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

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
      case "text":
        return <FileText className="h-4 w-4 text-purple-300" />
      case "video":
        return <Video className="h-4 w-4 text-cyan-300" />
      case "document":
        return <BookOpen className="h-4 w-4 text-amber-300" />
      case "link":
        return <LinkIcon className="h-4 w-4 text-pink-300" />
      default:
        return <FileText className="h-4 w-4 text-gray-300" />
    }
  }

  // Función para obtener el color de la insignia según el tipo de contenido
  const getContentBadgeClass = (type: string) => {
    switch (type) {
      case "text":
        return "bg-purple-900/30 text-purple-300 border-purple-900/50"
      case "video":
        return "bg-cyan-900/30 text-cyan-300 border-cyan-900/50"
      case "document":
        return "bg-amber-900/30 text-amber-300 border-amber-900/50"
      case "link":
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

  // Función para manejar la selección de contenido existente
  const handleContentSelect = (content: any) => {
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
        title: selectedContent.title + " (Copia)",
        description: selectedContent.description,
        text: selectedContent.type === "text" ? "Contenido clonado" : "",
        url: selectedContent.type === "video" || selectedContent.type === "link" ? "https://example.com" : "",
        file: null,
        videoFile: null,
      },
    })
    setContentType(selectedContent.type as any)
    setActiveTab("create-content")
  }

  // Inicializar Quill cuando estamos en el paso de contenido y el tipo es texto
  useEffect(() => {
    if (currentStep === 2 && contentType === "text" && !useSimpleEditor && quillContainerRef.current) {
      // Limpiar cualquier instancia previa
      if (quillInstanceRef.current) {
        try {
          quillInstanceRef.current = null
        } catch (e) {
          console.error("Error al limpiar Quill:", e)
        }
      }

      // Función para cargar e inicializar Quill
      const loadQuill = async () => {
        try {
          // Verificar si Quill ya está cargado
          if (typeof window !== "undefined" && !(window as any).Quill) {
            // Cargar CSS de Quill
            const linkElement = document.createElement("link")
            linkElement.rel = "stylesheet"
            linkElement.href = "https://cdn.quilljs.com/1.3.6/quill.snow.css"
            document.head.appendChild(linkElement)

            // Cargar script de Quill
            await new Promise<void>((resolve, reject) => {
              const script = document.createElement("script")
              script.src = "https://cdn.quilljs.com/1.3.6/quill.min.js"
              script.async = true
              script.onload = () => resolve()
              script.onerror = () => reject(new Error("Failed to load Quill.js"))
              document.body.appendChild(script)
            })
          }

          // Esperar un momento para asegurarnos de que Quill esté disponible
          await new Promise((resolve) => setTimeout(resolve, 100))

          // Verificar que Quill está disponible
          const Quill = (window as any).Quill
          if (!Quill) {
            throw new Error("Quill is not available")
          }

          // Crear un ID único para el contenedor
          const editorId = `quill-editor-${Date.now()}`

          // Crear el contenedor del editor
          if (quillContainerRef.current) {
            quillContainerRef.current.innerHTML = `<div id="${editorId}"></div>`

            // Configuración para el editor
            const editorConfig = {
              modules: {
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ font: [] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["blockquote", "code-block"],
                  ["link", "image"],
                  ["clean"],
                ],
              },
              placeholder: "Comienza a escribir tu contenido aquí...",
              theme: "snow",
            }

            // Crear nueva instancia de Quill
            const editorElement = document.getElementById(editorId)
            if (!editorElement) {
              throw new Error("Editor element not found")
            }

            quillInstanceRef.current = new Quill(editorElement, editorConfig)

            // Establecer el contenido inicial
            if (qernium.content.text) {
              quillInstanceRef.current.root.innerHTML = qernium.content.text
            }

            // Manejar cambios
            quillInstanceRef.current.on("text-change", () => {
              const html = quillInstanceRef.current.root.innerHTML
              setQernium({
                ...qernium,
                content: {
                  ...qernium.content,
                  text: html,
                },
              })
            })

            // Aplicar estilos personalizados
            const editorContent = editorElement.querySelector(".ql-editor")
            if (editorContent) {
              editorContent.classList.add("spacepunk-editor")
            }

            console.log("Quill initialized successfully")
            return true
          }
          return false
        } catch (error) {
          console.error("Error initializing Quill:", error)
          setQuillLoadAttempts((prev) => prev + 1)

          // Si fallamos demasiadas veces, usar el editor simple
          if (quillLoadAttempts >= 2) {
            console.log("Falling back to simple editor")
            setUseSimpleEditor(true)
          }
          return false
        }
      }

      // Intentar cargar Quill
      loadQuill()

      // Limpiar al desmontar
      return () => {
        if (quillInstanceRef.current) {
          try {
            // Limpiar eventos y referencias
            quillInstanceRef.current = null
          } catch (e) {
            console.error("Error cleaning up Quill:", e)
          }
        }
      }
    }
  }, [currentStep, contentType, useSimpleEditor, quillLoadAttempts, qernium.content.text])

  // Función para guardar el Qernium
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para guardar el Qernium en la base de datos
      console.log("Guardando Qernium:", {
        ...qernium,
        assignedSkills,
        coverImage,
      })

      // Simulamos éxito
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Qernium creado",
        description: "El Qernium ha sido creado exitosamente",
      })

      // Resetear formulario
      setQernium({
        title: "",
        description: "",
        bloomLevel: "remember",
        actionVerb: "",
        estimatedTime: 30,
        content: {
          title: "",
          description: "",
          text: "",
          url: "",
          file: null,
          videoFile: null,
        },
      })
      setAssignedSkills([])
      setCoverImage(null)
      setCurrentStep(1)
    } catch (error) {
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
  const canProceedToStep2 = qernium.title.trim() !== "" && qernium.description.trim() !== ""
  const canProceedToStep3 = true // Siempre podemos avanzar al paso 3
  const canProceedToStep4 = true // Siempre podemos avanzar al paso 4
  const canSubmit = qernium.title.trim() !== "" && qernium.description.trim() !== ""

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

  // Renderizar el contenido según el paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Información Básica
        return (
          <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <CardHeader>
              <CardTitle className="text-xl text-purple-300">Información del Qernium</CardTitle>
              <CardDescription>Define los detalles básicos de esta unidad de aprendizaje</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título del Qernium</Label>
                <Input
                  id="title"
                  placeholder="Ej: Identificar principios de la mecánica cuántica"
                  value={qernium.title}
                  onChange={(e) => setQernium({ ...qernium, title: e.target.value })}
                  className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe brevemente el objetivo de aprendizaje..."
                  value={qernium.description}
                  onChange={(e) => setQernium({ ...qernium, description: e.target.value })}
                  className="min-h-[100px] border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloom-level">Nivel de Taxonomía de Bloom</Label>
                <Select value={qernium.bloomLevel} onValueChange={handleBloomLevelChange}>
                  <SelectTrigger id="bloom-level" className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
                    <SelectValue placeholder="Selecciona un nivel" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-purple-900/50">
                    <SelectItem value="remember">Recordar</SelectItem>
                    <SelectItem value="understand">Comprender</SelectItem>
                    <SelectItem value="apply">Aplicar</SelectItem>
                    <SelectItem value="analyze">Analizar</SelectItem>
                    <SelectItem value="evaluate">Evaluar</SelectItem>
                    <SelectItem value="create">Crear</SelectItem>
                  </SelectContent>
                </Select>

                <div className="mt-2 p-3 rounded-md bg-black/30 border border-purple-900/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-purple-300" />
                    <span className="text-sm font-medium">Nivel seleccionado:</span>
                    <Badge className={getBloomLevelColor(qernium.bloomLevel)}>
                      {getBloomLevelName(qernium.bloomLevel)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
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

              <div className="space-y-2">
                <Label htmlFor="action-verb">Verbo de Acción</Label>
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

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="estimated-time">Tiempo Estimado (minutos)</Label>
                  <span className="text-sm text-muted-foreground">{qernium.estimatedTime} min</span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-4 w-4 text-purple-300" />
                  <Slider
                    id="estimated-time"
                    min={5}
                    max={180}
                    step={5}
                    value={[qernium.estimatedTime]}
                    onValueChange={(value) => setQernium({ ...qernium, estimatedTime: value[0] })}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 2: // Contenido
        return (
          <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <CardHeader>
              <CardTitle className="text-xl text-cyan-300">Contenido del Qernium</CardTitle>
              <CardDescription>Crea o selecciona el contenido para esta unidad de aprendizaje</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="bg-black/20 border border-cyan-900/50">
                  <TabsTrigger
                    value="create-content"
                    className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                  >
                    Crear Contenido
                  </TabsTrigger>
                  <TabsTrigger
                    value="all-content"
                    className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                  >
                    Buscar Existente
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="create-content" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content-title">Título del Contenido</Label>
                      <Input
                        id="content-title"
                        placeholder="Ej: Introducción a la Física Cuántica"
                        value={qernium.content.title}
                        onChange={(e) =>
                          setQernium({
                            ...qernium,
                            content: { ...qernium.content, title: e.target.value },
                          })
                        }
                        className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content-description">Descripción del Contenido</Label>
                      <Textarea
                        id="content-description"
                        placeholder="Describe brevemente este contenido..."
                        value={qernium.content.description}
                        onChange={(e) =>
                          setQernium({
                            ...qernium,
                            content: { ...qernium.content, description: e.target.value },
                          })
                        }
                        className="min-h-[100px] border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tipo de Contenido</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          className={`h-auto flex flex-col items-center justify-center p-6 border-2 ${
                            contentType === "text"
                              ? "border-purple-500 bg-purple-900/20 text-purple-300"
                              : "border-purple-900/50 hover:border-purple-500/50 hover:bg-purple-900/10"
                          }`}
                          onClick={() => setContentType("text")}
                        >
                          <FileText className="h-12 w-12 mb-2" />
                          <span className="text-lg">Texto</span>
                          <span className="text-xs text-muted-foreground mt-1">
                            Contenido de texto enriquecido con formato
                          </span>
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          className={`h-auto flex flex-col items-center justify-center p-6 border-2 ${
                            contentType === "video"
                              ? "border-cyan-500 bg-cyan-900/20 text-cyan-300"
                              : "border-purple-900/50 hover:border-cyan-500/50 hover:bg-cyan-900/10"
                          }`}
                          onClick={() => setContentType("video")}
                        >
                          <Video className="h-12 w-12 mb-2" />
                          <span className="text-lg">Video</span>
                          <span className="text-xs text-muted-foreground mt-1">
                            Videos de YouTube, Vimeo o archivos propios
                          </span>
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          className={`h-auto flex flex-col items-center justify-center p-6 border-2 ${
                            contentType === "document"
                              ? "border-amber-500 bg-amber-900/20 text-amber-300"
                              : "border-purple-900/50 hover:border-amber-500/50 hover:bg-amber-900/10"
                          }`}
                          onClick={() => setContentType("document")}
                        >
                          <BookOpen className="h-12 w-12 mb-2" />
                          <span className="text-lg">Documento</span>
                          <span className="text-xs text-muted-foreground mt-1">
                            Archivos PDF, DOCX, PPTX y otros documentos
                          </span>
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          className={`h-auto flex flex-col items-center justify-center p-6 border-2 ${
                            contentType === "link"
                              ? "border-pink-500 bg-pink-900/20 text-pink-300"
                              : "border-purple-900/50 hover:border-pink-500/50 hover:bg-pink-900/10"
                          }`}
                          onClick={() => setContentType("link")}
                        >
                          <LinkIcon className="h-12 w-12 mb-2" />
                          <span className="text-lg">Enlace</span>
                          <span className="text-xs text-muted-foreground mt-1">
                            Enlaces a recursos externos relevantes
                          </span>
                        </Button>
                      </div>
                    </div>

                    {/* Contenido específico según el tipo seleccionado */}
                    {contentType === "text" && (
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="text-content">Contenido de Texto</Label>

                        {useSimpleEditor ? (
                          // Editor simple como fallback
                          <SimpleTextEditor
                            value={qernium.content.text}
                            onChange={(value) =>
                              setQernium({
                                ...qernium,
                                content: { ...qernium.content, text: value },
                              })
                            }
                            placeholder="Comienza a escribir tu contenido aquí..."
                          />
                        ) : (
                          // Contenedor para Quill
                          <div className="quill-container">
                            <div
                              ref={quillContainerRef}
                              className="min-h-[300px] border border-purple-900/50 rounded-md"
                            />

                            {/* Estilos para Quill */}
                            <style jsx global>{`
                              .quill-container .ql-toolbar {
                                background-color: rgba(0, 0, 0, 0.5);
                                border-color: rgba(139, 92, 246, 0.5);
                                border-top-left-radius: 0.375rem;
                                border-top-right-radius: 0.375rem;
                              }
                              
                              .quill-container .ql-container {
                                border-color: rgba(139, 92, 246, 0.5);
                                background-color: rgba(0, 0, 0, 0.3);
                                border-bottom-left-radius: 0.375rem;
                                border-bottom-right-radius: 0.375rem;
                                min-height: 300px;
                              }
                              
                              .quill-container .ql-editor {
                                min-height: 300px;
                                color: #e2e8f0;
                              }
                              
                              .quill-container .spacepunk-editor {
                                font-family: 'Space Mono', monospace;
                                color: #d8b4fe;
                              }
                              
                              .quill-container .ql-snow .ql-stroke {
                                stroke: #a78bfa;
                              }
                              
                              .quill-container .ql-snow .ql-fill {
                                fill: #a78bfa;
                              }
                              
                              .quill-container .ql-snow .ql-picker {
                                color: #a78bfa;
                              }
                              
                              .quill-container .ql-snow .ql-picker-options {
                                background-color: rgba(0, 0, 0, 0.9);
                                border-color: rgba(139, 92, 246, 0.5);
                              }
                              
                              .quill-container .ql-snow .ql-tooltip {
                                background-color: rgba(0, 0, 0, 0.8);
                                border-color: rgba(139, 92, 246, 0.5);
                                color: #e2e8f0;
                              }
                              
                              .quill-container .ql-snow .ql-tooltip input[type=text] {
                                background-color: rgba(0, 0, 0, 0.5);
                                border-color: rgba(139, 92, 246, 0.5);
                                color: #e2e8f0;
                              }
                            `}</style>

                            {/* Botón para cambiar al editor simple */}
                            <div className="mt-2 flex justify-end">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setUseSimpleEditor(true)}
                                className="text-xs text-purple-300 hover:text-purple-200"
                              >
                                Cambiar a editor simple
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {contentType === "video" && (
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label>Fuente del Video</Label>
                          <RadioGroup
                            value={videoSource}
                            onValueChange={(value) => setVideoSource(value as "url" | "file")}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="url" id="video-url-option" />
                              <Label htmlFor="video-url-option" className="cursor-pointer">
                                URL
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="file" id="video-file-option" />
                              <Label htmlFor="video-file-option" className="cursor-pointer">
                                Archivo
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {videoSource === "url" ? (
                          <div className="space-y-2">
                            <Label htmlFor="video-url">URL del Video</Label>
                            <Input
                              id="video-url"
                              placeholder="https://www.youtube.com/watch?v=..."
                              value={qernium.content.url}
                              onChange={(e) =>
                                setQernium({
                                  ...qernium,
                                  content: { ...qernium.content, url: e.target.value },
                                })
                              }
                              className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                            />
                            <p className="text-xs text-muted-foreground">
                              Soportamos videos de YouTube, Vimeo y otros servicios populares.
                            </p>

                            {/* Vista previa del video */}
                            {qernium.content.url && (
                              <div className="mt-4 border border-cyan-900/50 rounded-md p-4 bg-black/30">
                                <h3 className="text-sm font-medium text-cyan-300 mb-2">Vista Previa</h3>
                                <div className="aspect-video bg-black/50 rounded-md flex items-center justify-center">
                                  <Video className="h-12 w-12 text-cyan-500 opacity-50" />
                                </div>
                                <p className="text-xs text-center mt-2 text-muted-foreground">
                                  La vista previa estará disponible después de guardar
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Label htmlFor="video-file">Archivo de Video</Label>
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="video-file"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-cyan-900/50 bg-black/30 hover:bg-cyan-900/10"
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <Upload className="w-8 h-8 mb-2 text-cyan-300" />
                                  <p className="mb-2 text-sm text-gray-300">
                                    <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                                  </p>
                                  <p className="text-xs text-gray-400">MP4, WEBM, MOV (MAX. 100MB)</p>
                                </div>
                                <input
                                  id="video-file"
                                  type="file"
                                  className="hidden"
                                  accept="video/mp4,video/webm,video/mov"
                                  onChange={(e) => handleFileChange(e, "video")}
                                />
                              </label>
                            </div>
                            {qernium.content.videoFile && (
                              <div className="mt-4 p-3 border border-cyan-900/50 rounded-md bg-cyan-900/10">
                                <div className="flex items-center">
                                  <div className="bg-cyan-900/20 p-2 rounded-md mr-3">
                                    <Video className="h-6 w-6 text-cyan-300" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{qernium.content.videoFile.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {Math.round(qernium.content.videoFile.size / 1024 / 1024)} MB
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-auto text-cyan-300 hover:text-cyan-200 hover:bg-cyan-950/30"
                                    onClick={() =>
                                      setQernium({
                                        ...qernium,
                                        content: { ...qernium.content, videoFile: null },
                                      })
                                    }
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
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {contentType === "document" && (
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="document-file">Archivo de Documento</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="document-file"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-amber-900/50 bg-black/30 hover:bg-amber-900/10"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-amber-300" />
                              <p className="mb-2 text-sm text-gray-300">
                                <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                              </p>
                              <p className="text-xs text-gray-400">PDF, DOCX, PPTX (MAX. 10MB)</p>
                            </div>
                            <input
                              id="document-file"
                              type="file"
                              className="hidden"
                              accept=".pdf,.docx,.pptx"
                              onChange={(e) => handleFileChange(e, "document")}
                            />
                          </label>
                        </div>
                        {qernium.content.file && (
                          <div className="mt-4 p-3 border border-amber-900/50 rounded-md bg-amber-900/10">
                            <div className="flex items-center">
                              <div className="bg-amber-900/20 p-2 rounded-md mr-3">
                                <BookOpen className="h-6 w-6 text-amber-300" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{qernium.content.file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {Math.round(qernium.content.file.size / 1024)} KB
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-auto text-amber-300 hover:text-amber-200 hover:bg-amber-950/30"
                                onClick={() =>
                                  setQernium({
                                    ...qernium,
                                    content: { ...qernium.content, file: null },
                                  })
                                }
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
                          </div>
                        )}
                      </div>
                    )}

                    {contentType === "link" && (
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="link-url">URL del Enlace</Label>
                        <Input
                          id="link-url"
                          placeholder="https://..."
                          value={qernium.content.url}
                          onChange={(e) =>
                            setQernium({
                              ...qernium,
                              content: { ...qernium.content, url: e.target.value },
                            })
                          }
                          className="border-pink-900/50 bg-black/50 focus-visible:ring-pink-500"
                        />
                        <p className="text-xs text-muted-foreground">
                          Añade un enlace a un recurso externo relevante para el aprendizaje.
                        </p>

                        {/* Información adicional del enlace */}
                        {qernium.content.url && (
                          <div className="mt-4 border border-pink-900/50 rounded-md p-4 bg-black/30">
                            <div className="flex items-center">
                              <div className="bg-pink-900/20 p-2 rounded-md mr-3">
                                <LinkIcon className="h-5 w-5 text-pink-300" />
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-sm font-medium truncate">{qernium.content.url}</p>
                                <p className="text-xs text-muted-foreground">Enlace externo</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="all-content" className="space-y-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por título o descripción..."
                        className="pl-8 border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="border-cyan-900/50 bg-black/50 hover:bg-cyan-900/20"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </div>

                  {showFilters && (
                    <div className="p-3 border border-cyan-900/50 rounded-md bg-black/50 space-y-3">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="sort-by" className="min-w-[80px]">
                          Ordenar por:
                        </Label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger id="sort-by" className="border-cyan-900/50 bg-black/70 focus:ring-cyan-500">
                            <SelectValue placeholder="Ordenar por" />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 border-cyan-900/50">
                            <SelectItem value="recent">Más recientes</SelectItem>
                            <SelectItem value="oldest">Más antiguos</SelectItem>
                            <SelectItem value="alphabetical">Alfabético</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <Tabs defaultValue="all-content" className="space-y-4">
                    <TabsList className="bg-black/20 border border-cyan-900/50">
                      <TabsTrigger
                        value="all-content"
                        className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                      >
                        Todos
                      </TabsTrigger>
                      <TabsTrigger
                        value="text-content"
                        className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Textos
                      </TabsTrigger>
                      <TabsTrigger
                        value="video-content"
                        className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Videos
                      </TabsTrigger>
                      <TabsTrigger
                        value="document-content"
                        className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Documentos
                      </TabsTrigger>
                      <TabsTrigger
                        value="link-content"
                        className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                      >
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Enlaces
                      </TabsTrigger>
                    </TabsList>

                    <ScrollArea className="h-[400px] pr-4">
                      {sortedContents.length === 0 ? (
                        <div className="p-8 text-center border border-dashed rounded-md border-cyan-900/50">
                          <Search className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <h3 className="text-lg font-medium text-cyan-300 mb-1">No se encontraron resultados</h3>
                          <p className="text-sm text-muted-foreground">
                            Intenta con otros términos de búsqueda o cambia los filtros.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {sortedContents.map((content) => (
                            <div
                              key={content.id}
                              className={`p-3 border rounded-md bg-black/50 hover:bg-cyan-900/10 cursor-pointer transition-colors ${
                                selectedContent?.id === content.id
                                  ? "border-cyan-500 bg-cyan-900/20"
                                  : "border-cyan-900/50"
                              }`}
                              onClick={() => handleContentSelect(content)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                  {getContentIcon(content.type)}
                                  <h3 className="font-medium text-cyan-300">{content.title}</h3>
                                </div>
                                <Badge className={`${getContentBadgeClass(content.type)} border`}>
                                  {content.type === "text" && "Texto"}
                                  {content.type === "video" && "Video"}
                                  {content.type === "document" && "Documento"}
                                  {content.type === "link" && "Enlace"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{content.description}</p>
                              <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <span>{content.author}</span>
                                <span>{new Date(content.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </Tabs>

                  <div className="flex justify-end mt-4">
                    <Button
                      onClick={handleCloneContent}
                      disabled={!selectedContent}
                      className="bg-gradient-to-r from-cyan-600 to-purple-500 hover:from-cyan-700 hover:to-purple-600"
                    >
                      <Copy className="mr-2 h-4 w-4" /> Clonar Contenido Seleccionado
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )

      case 3: // Habilidades
        return (
          <Card className="border-pink-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.1)]">
            <CardHeader>
              <CardTitle className="text-xl text-pink-300">Asignación de Habilidades</CardTitle>
              <CardDescription>
                Asigna subhabilidades a este Qernium y define su nivel de desarrollo (0-4)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="skill">Habilidad</Label>
                  <Select
                    value={selectedSkill}
                    onValueChange={(value) => {
                      setSelectedSkill(value)
                      setSelectedSubskill("")
                    }}
                  >
                    <SelectTrigger id="skill" className="border-pink-900/50 bg-black/50 focus:ring-pink-500">
                      <SelectValue placeholder="Selecciona una habilidad" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-pink-900/50">
                      {skills.map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subskill">Subhabilidad</Label>
                  <Select value={selectedSubskill} onValueChange={setSelectedSubskill} disabled={!selectedSkill}>
                    <SelectTrigger id="subskill" className="border-pink-900/50 bg-black/50 focus:ring-pink-500">
                      <SelectValue placeholder="Selecciona una subhabilidad" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-pink-900/50">
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
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="skill-level">Nivel de Desarrollo (0-4)</Label>
                  <span className="text-sm text-muted-foreground">{skillLevel}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Sparkles className="h-4 w-4 text-pink-300" />
                  <Slider
                    id="skill-level"
                    min={0}
                    max={4}
                    step={1}
                    value={[skillLevel]}
                    onValueChange={(value) => setSkillLevel(value[0])}
                    className="flex-1"
                  />
                </div>
                <div className="grid grid-cols-5 text-xs text-center mt-1">
                  <div>No desarrollado</div>
                  <div>Inicial</div>
                  <div>En desarrollo</div>
                  <div>Avanzado</div>
                  <div>Experto</div>
                </div>
              </div>

              <Button
                onClick={addAssignedSkill}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-600"
                disabled={!selectedSkill || !selectedSubskill}
              >
                <Plus className="mr-2 h-4 w-4" /> Asignar Subhabilidad
              </Button>

              <div className="space-y-2 pt-4 border-t border-pink-900/50">
                <h3 className="text-sm font-medium text-pink-300 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" /> Subhabilidades Asignadas ({assignedSkills.length})
                </h3>

                {assignedSkills.length === 0 ? (
                  <div className="p-4 text-center border border-dashed border-pink-900/50 rounded-md">
                    <p className="text-sm text-muted-foreground">No hay subhabilidades asignadas</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {assignedSkills.map((skill) => {
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
                        <div
                          key={skill.id}
                          className={`p-3 rounded-md border ${borderColor} ${bgColor} flex justify-between items-center`}
                        >
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
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeAssignedSkill(skill.id)}
                            className={`h-8 w-8 ${textColor} hover:${bgColor}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )

      case 4: // Apariencia
        return (
          <Card className="border-amber-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(251,191,36,0.1)]">
            <CardHeader>
              <CardTitle className="text-xl text-amber-300">Apariencia del Qernium</CardTitle>
              <CardDescription>Personaliza cómo se verá este qernium</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Imagen de Portada</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Sube una imagen que represente el contenido de este qernium
                </p>
                <CoverImageUpload initialImage={coverImage} onImageChange={setCoverImage} aspectRatio="landscape" />
              </div>

              <div className="p-4 border border-amber-900/30 rounded-md bg-amber-950/10">
                <div className="flex items-center gap-2 mb-2">
                  <ImageIcon className="h-4 w-4 text-amber-300" />
                  <span className="text-sm font-medium">Recomendaciones para la imagen</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                  <li>Usa imágenes de alta calidad relacionadas con el tema del qernium</li>
                  <li>Dimensiones recomendadas: 1200 x 600 píxeles</li>
                  <li>Formatos aceptados: JPG, PNG, WebP</li>
                  <li>Tamaño máximo: 5MB</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <>
      <DashboardHeader
        heading="Crear Qernium"
        text="Diseña una unidad de aprendizaje específica basada en la Taxonomía de Bloom"
      >
        <Button
          className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
          onClick={handleSubmit}
          disabled={isSubmitting || !canSubmit}
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Guardando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Guardar Qernium
            </>
          )}
        </Button>
      </DashboardHeader>
      <DashboardShell>
        <div className="space-y-6">
          {/* Indicador de progreso */}
          <div className="w-full bg-black/30 rounded-full h-2.5 mb-4 border border-purple-900/30">
            <div
              className="bg-gradient-to-r from-purple-600 to-cyan-500 h-2.5 rounded-full"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>

          {renderStepIndicator()}
          {renderStepContent()}

          <div className="flex justify-between mt-6">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="border-purple-900/50 hover:bg-purple-900/20"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
            ) : (
              <div></div> // Espacio vacío para mantener la alineación
            )}

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  (currentStep === 1 && !canProceedToStep2) ||
                  (currentStep === 2 && !canProceedToStep3) ||
                  (currentStep === 3 && !canProceedToStep4)
                }
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
              >
                Siguiente <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !canSubmit}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Guardar Qernium
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DashboardShell>
    </>
  )
}
