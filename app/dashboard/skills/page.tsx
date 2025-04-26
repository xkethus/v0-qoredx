"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Search, Filter, MoreHorizontal, Plus, Lightbulb, Sparkles, Layers } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function SkillsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("skills")
  const [showAddSkillDialog, setShowAddSkillDialog] = useState(false)
  const [showAddSubskillDialog, setShowAddSubskillDialog] = useState(false)
  const [newSkill, setNewSkill] = useState({
    name: "",
    description: "",
    color: "purple",
  })
  const [newSubskill, setNewSubskill] = useState({
    name: "",
    description: "",
    skillId: "",
  })

  // Mock data para habilidades
  const skills = [
    {
      id: "1",
      name: "Pensamiento Crítico",
      description: "Capacidad para analizar y evaluar información de manera objetiva.",
      color: "purple",
      subskillsCount: 4,
      qerniumsCount: 12,
    },
    {
      id: "2",
      name: "Comunicación Efectiva",
      description: "Habilidad para transmitir ideas de manera clara y persuasiva.",
      color: "cyan",
      subskillsCount: 5,
      qerniumsCount: 8,
    },
    {
      id: "3",
      name: "Resolución de Problemas",
      description: "Capacidad para identificar problemas y encontrar soluciones eficaces.",
      color: "pink",
      subskillsCount: 3,
      qerniumsCount: 10,
    },
    {
      id: "4",
      name: "Creatividad",
      description: "Habilidad para generar ideas originales y valiosas.",
      color: "amber",
      subskillsCount: 4,
      qerniumsCount: 6,
    },
  ]

  // Mock data para subhabilidades
  const subskills = [
    {
      id: "1",
      name: "Análisis de Argumentos",
      description: "Capacidad para descomponer argumentos y evaluar su validez.",
      skillId: "1",
      skillName: "Pensamiento Crítico",
      skillColor: "purple",
      qerniumsCount: 5,
    },
    {
      id: "2",
      name: "Evaluación de Evidencia",
      description: "Habilidad para valorar la calidad y relevancia de la evidencia.",
      skillId: "1",
      skillName: "Pensamiento Crítico",
      skillColor: "purple",
      qerniumsCount: 3,
    },
    {
      id: "3",
      name: "Comunicación Escrita",
      description: "Capacidad para expresar ideas de forma clara y efectiva por escrito.",
      skillId: "2",
      skillName: "Comunicación Efectiva",
      skillColor: "cyan",
      qerniumsCount: 4,
    },
    {
      id: "4",
      name: "Comunicación Oral",
      description: "Habilidad para expresar ideas verbalmente con claridad y persuasión.",
      skillId: "2",
      skillName: "Comunicación Efectiva",
      skillColor: "cyan",
      qerniumsCount: 2,
    },
    {
      id: "5",
      name: "Definición de Problemas",
      description: "Capacidad para identificar y definir problemas con precisión.",
      skillId: "3",
      skillName: "Resolución de Problemas",
      skillColor: "pink",
      qerniumsCount: 3,
    },
    {
      id: "6",
      name: "Pensamiento Divergente",
      description: "Capacidad para generar múltiples ideas y soluciones alternativas.",
      skillId: "4",
      skillName: "Creatividad",
      skillColor: "amber",
      qerniumsCount: 2,
    },
  ]

  const handleAddSkill = () => {
    // Aquí iría la lógica para añadir la habilidad a la base de datos
    console.log("Añadiendo habilidad:", newSkill)

    // Simulamos éxito
    toast({
      title: "Habilidad creada",
      description: `La habilidad "${newSkill.name}" ha sido creada exitosamente.`,
    })

    // Resetear formulario y cerrar diálogo
    setNewSkill({ name: "", description: "", color: "purple" })
    setShowAddSkillDialog(false)
  }

  const handleAddSubskill = () => {
    // Aquí iría la lógica para añadir la subhabilidad a la base de datos
    console.log("Añadiendo subhabilidad:", newSubskill)

    // Simulamos éxito
    toast({
      title: "Subhabilidad creada",
      description: `La subhabilidad "${newSubskill.name}" ha sido creada exitosamente.`,
    })

    // Resetear formulario y cerrar diálogo
    setNewSubskill({ name: "", description: "", skillId: "" })
    setShowAddSubskillDialog(false)
  }

  return (
    <>
      <DashboardHeader
        heading="Habilidades y Subhabilidades"
        text="Gestiona las habilidades y subhabilidades para tus Qerniums"
      >
        <div className="flex gap-2">
          <Button
            onClick={() => setShowAddSkillDialog(true)}
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
          >
            <Plus className="mr-2 h-4 w-4" /> Nueva Habilidad
          </Button>
          <Button
            onClick={() => setShowAddSubskillDialog(true)}
            variant="outline"
            className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
          >
            <Plus className="mr-2 h-4 w-4" /> Nueva Subhabilidad
          </Button>
        </div>
      </DashboardHeader>
      <DashboardShell>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-black/20 border border-purple-900/50">
              <TabsTrigger
                value="skills"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Habilidades
              </TabsTrigger>
              <TabsTrigger
                value="subskills"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Subhabilidades
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={activeTab === "skills" ? "Buscar habilidades..." : "Buscar subhabilidades..."}
                  className="w-full sm:w-[250px] pl-8 border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
              >
                <Filter className="mr-2 h-4 w-4" /> Filtrar
              </Button>
            </div>
          </div>

          <TabsContent value="skills" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => {
                let borderColor = "border-purple-900/50"
                let shadowColor = "shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                let textColor = "text-purple-300"
                let bgHoverColor = "hover:bg-purple-900/20"

                if (skill.color === "cyan") {
                  borderColor = "border-cyan-900/50"
                  shadowColor = "shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                  textColor = "text-cyan-300"
                  bgHoverColor = "hover:bg-cyan-900/20"
                } else if (skill.color === "pink") {
                  borderColor = "border-pink-900/50"
                  shadowColor = "shadow-[0_0_15px_rgba(236,72,153,0.1)]"
                  textColor = "text-pink-300"
                  bgHoverColor = "hover:bg-pink-900/20"
                } else if (skill.color === "amber") {
                  borderColor = "border-amber-900/50"
                  shadowColor = "shadow-[0_0_15px_rgba(251,191,36,0.1)]"
                  textColor = "text-amber-300"
                  bgHoverColor = "hover:bg-amber-900/20"
                }

                return (
                  <Card key={skill.id} className={`${borderColor} bg-black/50 backdrop-blur-sm ${shadowColor}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className={`text-xl ${textColor}`}>{skill.name}</CardTitle>
                          <CardDescription className="line-clamp-2">{skill.description}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menú</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-black/90 border-purple-900/50">
                            <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                              Editar Habilidad
                            </DropdownMenuItem>
                            <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                              Ver Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                              Añadir Subhabilidad
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 focus:bg-red-900/20 focus:text-red-300">
                              Eliminar Habilidad
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Sparkles className={`h-4 w-4 ${textColor}`} />
                              <span className="text-sm">Subhabilidades:</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{skill.subskillsCount}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Layers className={`h-4 w-4 ${textColor}`} />
                              <span className="text-sm">Qerniums:</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{skill.qerniumsCount}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <Badge className={`bg-${skill.color}-900/30 text-${skill.color}-300`}>
                            {skill.color.charAt(0).toUpperCase() + skill.color.slice(1)}
                          </Badge>
                          <Link href={`/dashboard/skills/${skill.id}`}>
                            <Button
                              size="sm"
                              className={`bg-${skill.color}-600 hover:bg-${skill.color}-700 text-white`}
                            >
                              Gestionar
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {/* Card para crear nueva habilidad */}
              <Card className="border-dashed border-2 border-purple-900/50 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center h-full">
                <Lightbulb className="h-12 w-12 text-purple-500/50 mb-4" />
                <h3 className="text-lg font-medium text-purple-300 mb-2">Crear Nueva Habilidad</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Define una nueva habilidad para categorizar tus Qerniums
                </p>
                <Button
                  onClick={() => setShowAddSkillDialog(true)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Nueva Habilidad
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subskills" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {subskills.map((subskill) => {
                let borderColor = "border-purple-900/50"
                let shadowColor = "shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                let textColor = "text-purple-300"
                let bgHoverColor = "hover:bg-purple-900/20"

                if (subskill.skillColor === "cyan") {
                  borderColor = "border-cyan-900/50"
                  shadowColor = "shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                  textColor = "text-cyan-300"
                  bgHoverColor = "hover:bg-cyan-900/20"
                } else if (subskill.skillColor === "pink") {
                  borderColor = "border-pink-900/50"
                  shadowColor = "shadow-[0_0_15px_rgba(236,72,153,0.1)]"
                  textColor = "text-pink-300"
                  bgHoverColor = "hover:bg-pink-900/20"
                } else if (subskill.skillColor === "amber") {
                  borderColor = "border-amber-900/50"
                  shadowColor = "shadow-[0_0_15px_rgba(251,191,36,0.1)]"
                  textColor = "text-amber-300"
                  bgHoverColor = "hover:bg-amber-900/20"
                }

                return (
                  <Card key={subskill.id} className={`${borderColor} bg-black/50 backdrop-blur-sm ${shadowColor}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className={`text-xl ${textColor}`}>{subskill.name}</CardTitle>
                          <CardDescription className="line-clamp-2">{subskill.description}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menú</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-black/90 border-purple-900/50">
                            <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                              Editar Subhabilidad
                            </DropdownMenuItem>
                            <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                              Ver Qerniums
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 focus:bg-red-900/20 focus:text-red-300">
                              Eliminar Subhabilidad
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Lightbulb className={`h-4 w-4 ${textColor}`} />
                              <span className="text-sm">Habilidad:</span>
                            </div>
                            <Badge className={`bg-${subskill.skillColor}-900/30 text-${subskill.skillColor}-300`}>
                              {subskill.skillName}
                            </Badge>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Layers className={`h-4 w-4 ${textColor}`} />
                              <span className="text-sm">Qerniums:</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{subskill.qerniumsCount}</span>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Link href={`/dashboard/subskills/${subskill.id}`}>
                            <Button
                              size="sm"
                              className={`bg-${subskill.skillColor}-600 hover:bg-${subskill.skillColor}-700 text-white`}
                            >
                              Gestionar
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {/* Card para crear nueva subhabilidad */}
              <Card className="border-dashed border-2 border-purple-900/50 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center h-full">
                <Sparkles className="h-12 w-12 text-purple-500/50 mb-4" />
                <h3 className="text-lg font-medium text-purple-300 mb-2">Crear Nueva Subhabilidad</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Define una nueva subhabilidad para categorizar tus Qerniums con mayor precisión
                </p>
                <Button
                  onClick={() => setShowAddSubskillDialog(true)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Nueva Subhabilidad
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DashboardShell>

      {/* Diálogo para añadir nueva habilidad */}
      <Dialog open={showAddSkillDialog} onOpenChange={setShowAddSkillDialog}>
        <DialogContent className="bg-black/90 border-purple-900/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-purple-300">Crear Nueva Habilidad</DialogTitle>
            <DialogDescription>Define una nueva habilidad para categorizar tus Qerniums.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="skill-name">Nombre</Label>
              <Input
                id="skill-name"
                placeholder="Ej: Pensamiento Crítico"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill-description">Descripción</Label>
              <Textarea
                id="skill-description"
                placeholder="Describe brevemente esta habilidad..."
                value={newSkill.description}
                onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                className="min-h-[100px] border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill-color">Color</Label>
              <Select value={newSkill.color} onValueChange={(value) => setNewSkill({ ...newSkill, color: value })}>
                <SelectTrigger id="skill-color" className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
                  <SelectValue placeholder="Selecciona un color" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-purple-900/50">
                  <SelectItem value="purple">Púrpura</SelectItem>
                  <SelectItem value="cyan">Cian</SelectItem>
                  <SelectItem value="pink">Rosa</SelectItem>
                  <SelectItem value="amber">Ámbar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddSkillDialog(false)}
              className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddSkill}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
            >
              Crear Habilidad
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para añadir nueva subhabilidad */}
      <Dialog open={showAddSubskillDialog} onOpenChange={setShowAddSubskillDialog}>
        <DialogContent className="bg-black/90 border-purple-900/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-purple-300">Crear Nueva Subhabilidad</DialogTitle>
            <DialogDescription>
              Define una nueva subhabilidad para categorizar tus Qerniums con mayor precisión.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="subskill-skill">Habilidad Principal</Label>
              <Select
                value={newSubskill.skillId}
                onValueChange={(value) => setNewSubskill({ ...newSubskill, skillId: value })}
              >
                <SelectTrigger id="subskill-skill" className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
                  <SelectValue placeholder="Selecciona una habilidad" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-purple-900/50">
                  {skills.map((skill) => (
                    <SelectItem key={skill.id} value={skill.id}>
                      {skill.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subskill-name">Nombre</Label>
              <Input
                id="subskill-name"
                placeholder="Ej: Análisis de Argumentos"
                value={newSubskill.name}
                onChange={(e) => setNewSubskill({ ...newSubskill, name: e.target.value })}
                className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subskill-description">Descripción</Label>
              <Textarea
                id="subskill-description"
                placeholder="Describe brevemente esta subhabilidad..."
                value={newSubskill.description}
                onChange={(e) => setNewSubskill({ ...newSubskill, description: e.target.value })}
                className="min-h-[100px] border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddSubskillDialog(false)}
              className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddSubskill}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
            >
              Crear Subhabilidad
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
