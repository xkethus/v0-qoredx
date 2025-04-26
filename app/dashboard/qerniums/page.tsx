import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Atom, Search, Filter, MoreHorizontal, Plus, Brain, CuboidIcon as Cube, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function QerniumsPage() {
  // Mock data para Qerniums
  const qerniums = [
    {
      id: 1,
      title: "Identificar principios de la mecánica cuántica",
      description: "Reconocer y enumerar los principios fundamentales que rigen la mecánica cuántica.",
      bloomLevel: "remember",
      actionVerb: "Identificar",
      status: "published",
      estimatedTime: 30,
      qlusters: ["Fundamentos de Física Cuántica", "Introducción a la Computación Cuántica"],
      color: "purple",
    },
    {
      id: 2,
      title: "Explicar el principio de incertidumbre de Heisenberg",
      description: "Describir y explicar el principio de incertidumbre y sus implicaciones en la física cuántica.",
      bloomLevel: "understand",
      actionVerb: "Explicar",
      status: "published",
      estimatedTime: 45,
      qlusters: ["Fundamentos de Física Cuántica"],
      color: "cyan",
    },
    {
      id: 3,
      title: "Aplicar ecuaciones de mecánica orbital",
      description: "Utilizar las ecuaciones de la mecánica orbital para resolver problemas de trayectorias espaciales.",
      bloomLevel: "apply",
      actionVerb: "Aplicar",
      status: "published",
      estimatedTime: 60,
      qlusters: ["Exploración Espacial Avanzada"],
      color: "pink",
    },
    {
      id: 4,
      title: "Analizar dilemas éticos en IA",
      description: "Examinar y descomponer dilemas éticos relacionados con el desarrollo y uso de la IA.",
      bloomLevel: "analyze",
      actionVerb: "Analizar",
      status: "published",
      estimatedTime: 90,
      qlusters: ["Ética en Inteligencia Artificial"],
      color: "amber",
    },
    {
      id: 5,
      title: "Evaluar algoritmos de aprendizaje automático",
      description: "Juzgar la eficacia y pertinencia de diferentes algoritmos de aprendizaje automático.",
      bloomLevel: "evaluate",
      actionVerb: "Evaluar",
      status: "draft",
      estimatedTime: 120,
      qlusters: [],
      color: "purple",
    },
    {
      id: 6,
      title: "Crear un modelo de simulación cuántica",
      description: "Diseñar y desarrollar un modelo de simulación para un sistema cuántico simple.",
      bloomLevel: "create",
      actionVerb: "Crear",
      status: "draft",
      estimatedTime: 180,
      qlusters: [],
      color: "cyan",
    },
  ]

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

  return (
    <>
      <DashboardHeader heading="Qerniums" text="Unidades de Aprendizaje Específicas basadas en la Taxonomía de Bloom">
        <Link href="/dashboard/qerniums/create">
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
            <Plus className="mr-2 h-4 w-4" /> Crear Qernium
          </Button>
        </Link>
      </DashboardHeader>
      <DashboardShell>
        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-black/20 border border-purple-900/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="published"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Publicados
              </TabsTrigger>
              <TabsTrigger
                value="draft"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Borradores
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar qerniums..."
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

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {qerniums.map((qernium) => {
                let borderColor = "border-purple-900/50"
                let shadowColor = "shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                let textColor = "text-purple-300"
                let bgHoverColor = "hover:bg-purple-900/20"

                if (qernium.color === "cyan") {
                  borderColor = "border-cyan-900/50"
                  shadowColor = "shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                  textColor = "text-cyan-300"
                  bgHoverColor = "hover:bg-cyan-900/20"
                } else if (qernium.color === "pink") {
                  borderColor = "border-pink-900/50"
                  shadowColor = "shadow-[0_0_15px_rgba(236,72,153,0.1)]"
                  textColor = "text-pink-300"
                  bgHoverColor = "hover:bg-pink-900/20"
                } else if (qernium.color === "amber") {
                  borderColor = "border-amber-900/50"
                  shadowColor = "shadow-[0_0_15px_rgba(251,191,36,0.1)]"
                  textColor = "text-amber-300"
                  bgHoverColor = "hover:bg-amber-900/20"
                }

                return (
                  <Card key={qernium.id} className={`${borderColor} bg-black/50 backdrop-blur-sm ${shadowColor}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className={`text-xl ${textColor}`}>{qernium.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{qernium.description}</CardDescription>
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
                              Editar Qernium
                            </DropdownMenuItem>
                            <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                              Ver Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                              Duplicar Qernium
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 focus:bg-red-900/20 focus:text-red-300">
                              Eliminar Qernium
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
                              <Brain className={`h-4 w-4 ${textColor}`} />
                              <span className="text-sm">Nivel Bloom:</span>
                            </div>
                            <Badge className={getBloomLevelColor(qernium.bloomLevel)}>
                              {getBloomLevelName(qernium.bloomLevel)}
                            </Badge>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Zap className={`h-4 w-4 ${textColor}`} />
                              <span className="text-sm">Verbo de acción:</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{qernium.actionVerb}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Cube className={`h-4 w-4 ${textColor}`} />
                              <span className="text-sm">Qlusters:</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {qernium.qlusters.length > 0 ? qernium.qlusters.length : "Ninguno"}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
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
                                className={`${textColor}`}
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span className="text-sm">Tiempo estimado:</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{qernium.estimatedTime} min</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            {qernium.status === "published" && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-green-950/50 text-green-300 border border-green-900/50">
                                Publicado
                              </span>
                            )}
                            {qernium.status === "draft" && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50">
                                Borrador
                              </span>
                            )}
                          </div>
                          <Link href={`/dashboard/qerniums/${qernium.id}`}>
                            <Button
                              size="sm"
                              className={`bg-${qernium.color}-600 hover:bg-${qernium.color}-700 text-white`}
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

              {/* Card para crear nuevo qernium */}
              <Card className="border-dashed border-2 border-purple-900/50 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center h-full">
                <Atom className="h-12 w-12 text-purple-500/50 mb-4" />
                <h3 className="text-lg font-medium text-purple-300 mb-2">Crear Nuevo Qernium</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Diseña una unidad de aprendizaje específica basada en la Taxonomía de Bloom
                </p>
                <Link href="/dashboard/qerniums/create">
                  <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Qernium
                  </Button>
                </Link>
              </Card>
            </div>
          </TabsContent>

          {/* Contenido para las otras pestañas (published, draft) */}
          {/* Similar al contenido de "all" pero filtrado por status */}
        </Tabs>
      </DashboardShell>
    </>
  )
}
