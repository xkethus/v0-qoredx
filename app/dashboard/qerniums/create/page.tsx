"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Clock, Save, Sparkles, Plus, Minus, Lightbulb } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export default function CreateQerniumPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [qernium, setQernium] = useState({
    title: "",
    description: "",
    bloomLevel: "remember",
    actionVerb: "",
    estimatedTime: 30,
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

  // Función para guardar el Qernium
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para guardar el Qernium en la base de datos
      console.log("Guardando Qernium:", {
        ...qernium,
        assignedSkills,
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
      })
      setAssignedSkills([])
      setActiveTab("basic")
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

  return (
    <>
      <DashboardHeader
        heading="Crear Qernium"
        text="Diseña una unidad de aprendizaje específica basada en la Taxonomía de Bloom"
      >
        <Button
          className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
          onClick={handleSubmit}
          disabled={isSubmitting}
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-black/20 border border-purple-900/50">
            <TabsTrigger
              value="basic"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              Información Básica
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              Habilidades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-300">Asignación de Habilidades</CardTitle>
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
                      <SelectTrigger id="skill" className="border-cyan-900/50 bg-black/50 focus:ring-cyan-500">
                        <SelectValue placeholder="Selecciona una habilidad" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-cyan-900/50">
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
                      <SelectTrigger id="subskill" className="border-cyan-900/50 bg-black/50 focus:ring-cyan-500">
                        <SelectValue placeholder="Selecciona una subhabilidad" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-cyan-900/50">
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
                    <Sparkles className="h-4 w-4 text-cyan-300" />
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
                  className="w-full bg-gradient-to-r from-cyan-600 to-purple-500 hover:from-cyan-700 hover:to-purple-600"
                  disabled={!selectedSkill || !selectedSubskill}
                >
                  <Plus className="mr-2 h-4 w-4" /> Asignar Subhabilidad
                </Button>

                <div className="space-y-2 pt-4 border-t border-cyan-900/50">
                  <h3 className="text-sm font-medium text-cyan-300 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" /> Subhabilidades Asignadas ({assignedSkills.length})
                  </h3>

                  {assignedSkills.length === 0 ? (
                    <div className="p-4 text-center border border-dashed border-cyan-900/50 rounded-md">
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
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </>
  )
}
