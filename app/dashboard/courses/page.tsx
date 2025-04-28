import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { BookOpen, Calendar, MoreHorizontal, Plus, Search, Users, Layers, Rocket } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function CoursesPage() {
  // Mock data for courses
  const courses = [
    {
      id: 2,
      title: "Exploración Espacial Avanzada",
      description: "Técnicas y teorías modernas para la exploración del espacio profundo.",
      startDate: "2025-04-15",
      endDate: "2025-07-30",
      classes: ["SE200-A"],
      students: 28,
      modules: 6,
      progress: 15,
      status: "active",
      color: "cyan",
    },
    {
      id: 1,
      title: "Fundamentos de Física Cuántica",
      description: "Un curso introductorio a los principios de la física cuántica y sus aplicaciones.",
      startDate: "2025-05-01",
      endDate: "2025-08-15",
      classes: ["QP101-A", "QP101-B"],
      students: 42,
      modules: 8,
      progress: 0,
      status: "scheduled",
      color: "purple",
    },
    {
      id: 3,
      title: "Ética en Inteligencia Artificial",
      description: "Análisis de las implicaciones éticas del desarrollo y uso de la IA.",
      startDate: "2025-03-10",
      endDate: "2025-06-25",
      classes: ["AIE300-A", "AIE300-B", "AIE300-C"],
      students: 64,
      modules: 10,
      progress: 40,
      status: "active",
      color: "pink",
    },
    {
      id: 4,
      title: "Programación Cuántica",
      description: "Introducción a los algoritmos y lenguajes de programación para computadoras cuánticas.",
      startDate: "2025-06-01",
      endDate: "2025-09-15",
      classes: [],
      students: 0,
      modules: 12,
      progress: 0,
      status: "draft",
      color: "purple",
    },
  ]

  return (
    <>
      <DashboardHeader
        heading="Creador de Qlusters"
        text="Crea y gestiona Qlusters completos con contenido y asignaciones"
      >
        <Link href="/dashboard/courses/create">
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
            <Plus className="mr-2 h-4 w-4" /> Crear Qluster
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
                value="active"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Activos
              </TabsTrigger>
              <TabsTrigger
                value="scheduled"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Programados
              </TabsTrigger>
              <TabsTrigger
                value="draft"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Borradores
              </TabsTrigger>
            </TabsList>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar qlusters..."
                className="w-full sm:w-[250px] pl-8 border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
              />
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => {
                let borderColor = "border-purple-900/50"
                let shadowColor = "shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                let textColor = "text-purple-300"
                let bgHoverColor = "hover:bg-purple-900/20"
                let bgColor = "bg-purple-900/10"
                let gradientFrom = "from-purple-500"
                let gradientTo = "to-purple-300"

                if (course.color === "cyan") {
                  borderColor = "border-cyan-900/50"
                  shadowColor = "shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                  textColor = "text-cyan-300"
                  bgHoverColor = "hover:bg-cyan-900/20"
                  bgColor = "bg-cyan-900/10"
                  gradientFrom = "from-cyan-500"
                  gradientTo = "to-cyan-300"
                } else if (course.color === "pink") {
                  borderColor = "border-pink-900/50"
                  shadowColor = "shadow-[0_0_15px_rgba(236,72,153,0.1)]"
                  textColor = "text-pink-300"
                  bgHoverColor = "hover:bg-pink-900/20"
                  bgColor = "bg-pink-900/10"
                  gradientFrom = "from-pink-500"
                  gradientTo = "to-pink-300"
                }

                return (
                  <Card key={course.id} className={`${borderColor} bg-black/50 backdrop-blur-sm ${shadowColor}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className={`text-xl ${textColor}`}>{course.title}</CardTitle>
                          <CardDescription className="line-clamp-1">{course.description}</CardDescription>
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
                              Editar Qluster
                            </DropdownMenuItem>
                            <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                              Ver Detalles
                            </DropdownMenuItem>
                            <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                              Duplicar Qluster
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 focus:bg-red-900/20 focus:text-red-300">
                              Eliminar Qluster
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
                              <Calendar className={`h-4 w-4 ${textColor}`} />
                              <span className="text-sm">Fechas:</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(course.startDate).toLocaleDateString()} -{" "}
                              {new Date(course.endDate).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Layers className={`h-4 w-4 ${textColor}`} />
                              <span className="text-sm">Qerniums:</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{course.modules}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Users className={`h-4 w-4 ${textColor}`} />
                              <span className="text-sm">Estudiantes:</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{course.students}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <BookOpen className={`h-4 w-4 ${textColor}`} />
                              <span className="text-sm">Clases:</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {course.classes.length > 0 ? course.classes.join(", ") : "Sin asignar"}
                            </span>
                          </div>
                        </div>

                        {course.status !== "draft" && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progreso del qluster</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-black/50 rounded-full h-2">
                              <div
                                className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} h-2 rounded-full`}
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <div>
                            {course.status === "active" && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-950/50 text-cyan-300 border border-cyan-900/50">
                                Activo
                              </span>
                            )}
                            {course.status === "scheduled" && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-purple-950/50 text-purple-300 border border-purple-900/50">
                                Programado
                              </span>
                            )}
                            {course.status === "draft" && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50">
                                Borrador
                              </span>
                            )}
                          </div>
                          <Link href={`/dashboard/courses/${course.id}`}>
                            <Button
                              size="sm"
                              className={`bg-${course.color}-600 hover:bg-${course.color}-700 text-white`}
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

              {/* Card para crear nuevo curso */}
              <Card className="border-dashed border-2 border-purple-900/50 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center h-full">
                <Rocket className="h-12 w-12 text-purple-500/50 mb-4" />
                <h3 className="text-lg font-medium text-purple-300 mb-2">Crear Nuevo Qluster</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Diseña un qluster completo con contenido y asignaciones
                </p>
                <Link href="/dashboard/courses/create">
                  <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Qluster
                  </Button>
                </Link>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((course) => course.status === "active")
                .map((course) => {
                  let borderColor = "border-purple-900/50"
                  let shadowColor = "shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                  let textColor = "text-purple-300"
                  let bgHoverColor = "hover:bg-purple-900/20"
                  let gradientFrom = "from-purple-500"
                  let gradientTo = "to-purple-300"

                  if (course.color === "cyan") {
                    borderColor = "border-cyan-900/50"
                    shadowColor = "shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                    textColor = "text-cyan-300"
                    bgHoverColor = "hover:bg-cyan-900/20"
                    gradientFrom = "from-cyan-500"
                    gradientTo = "to-cyan-300"
                  } else if (course.color === "pink") {
                    borderColor = "border-pink-900/50"
                    shadowColor = "shadow-[0_0_15px_rgba(236,72,153,0.1)]"
                    textColor = "text-pink-300"
                    bgHoverColor = "hover:bg-pink-900/20"
                    gradientFrom = "from-pink-500"
                    gradientTo = "to-pink-300"
                  }

                  return (
                    <Card key={course.id} className={`${borderColor} bg-black/50 backdrop-blur-sm ${shadowColor}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className={`text-xl ${textColor}`}>{course.title}</CardTitle>
                            <CardDescription className="line-clamp-1">{course.description}</CardDescription>
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
                                Editar Qluster
                              </DropdownMenuItem>
                              <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                                Ver Detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                                Duplicar Qluster
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 focus:bg-red-900/20 focus:text-red-300">
                                Eliminar Qluster
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
                                <Calendar className={`h-4 w-4 ${textColor}`} />
                                <span className="text-sm">Fechas:</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(course.startDate).toLocaleDateString()} -{" "}
                                {new Date(course.endDate).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Layers className={`h-4 w-4 ${textColor}`} />
                                <span className="text-sm">Qerniums:</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{course.modules}</span>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Users className={`h-4 w-4 ${textColor}`} />
                                <span className="text-sm">Estudiantes:</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{course.students}</span>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <BookOpen className={`h-4 w-4 ${textColor}`} />
                                <span className="text-sm">Clases:</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {course.classes.length > 0 ? course.classes.join(", ") : "Sin asignar"}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progreso del qluster</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-black/50 rounded-full h-2">
                              <div
                                className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} h-2 rounded-full`}
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-950/50 text-cyan-300 border border-cyan-900/50">
                                Activo
                              </span>
                            </div>
                            <Link href={`/dashboard/courses/${course.id}`}>
                              <Button
                                size="sm"
                                className={`bg-${course.color}-600 hover:bg-${course.color}-700 text-white`}
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
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((course) => course.status === "scheduled")
                .map((course) => {
                  let borderColor = "border-purple-900/50"
                  let shadowColor = "shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                  let textColor = "text-purple-300"
                  let bgHoverColor = "hover:bg-purple-900/20"

                  if (course.color === "cyan") {
                    borderColor = "border-cyan-900/50"
                    shadowColor = "shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                    textColor = "text-cyan-300"
                    bgHoverColor = "hover:bg-cyan-900/20"
                  } else if (course.color === "pink") {
                    borderColor = "border-pink-900/50"
                    shadowColor = "shadow-[0_0_15px_rgba(236,72,153,0.1)]"
                    textColor = "text-pink-300"
                    bgHoverColor = "hover:bg-pink-900/20"
                  }

                  return (
                    <Card key={course.id} className={`${borderColor} bg-black/50 backdrop-blur-sm ${shadowColor}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className={`text-xl ${textColor}`}>{course.title}</CardTitle>
                            <CardDescription className="line-clamp-1">{course.description}</CardDescription>
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
                                Editar Qluster
                              </DropdownMenuItem>
                              <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                                Ver Detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                                Duplicar Qluster
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 focus:bg-red-900/20 focus:text-red-300">
                                Eliminar Qluster
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
                                <Calendar className={`h-4 w-4 ${textColor}`} />
                                <span className="text-sm">Fechas:</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(course.startDate).toLocaleDateString()} -{" "}
                                {new Date(course.endDate).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Layers className={`h-4 w-4 ${textColor}`} />
                                <span className="text-sm">Qerniums:</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{course.modules}</span>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Users className={`h-4 w-4 ${textColor}`} />
                                <span className="text-sm">Estudiantes:</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{course.students}</span>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <BookOpen className={`h-4 w-4 ${textColor}`} />
                                <span className="text-sm">Clases:</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {course.classes.length > 0 ? course.classes.join(", ") : "Sin asignar"}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-purple-950/50 text-purple-300 border border-purple-900/50">
                                Programado
                              </span>
                            </div>
                            <Link href={`/dashboard/courses/${course.id}`}>
                              <Button
                                size="sm"
                                className={`bg-${course.color}-600 hover:bg-${course.color}-700 text-white`}
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
            </div>
          </TabsContent>

          <TabsContent value="draft" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((course) => course.status === "draft")
                .map((course) => {
                  let borderColor = "border-purple-900/50"
                  let shadowColor = "shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                  let textColor = "text-purple-300"
                  let bgHoverColor = "hover:bg-purple-900/20"

                  if (course.color === "cyan") {
                    borderColor = "border-cyan-900/50"
                    shadowColor = "shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                    textColor = "text-cyan-300"
                    bgHoverColor = "hover:bg-cyan-900/20"
                  } else if (course.color === "pink") {
                    borderColor = "border-pink-900/50"
                    shadowColor = "shadow-[0_0_15px_rgba(236,72,153,0.1)]"
                    textColor = "text-pink-300"
                    bgHoverColor = "hover:bg-pink-900/20"
                  }

                  return (
                    <Card key={course.id} className={`${borderColor} bg-black/50 backdrop-blur-sm ${shadowColor}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className={`text-xl ${textColor}`}>{course.title}</CardTitle>
                            <CardDescription className="line-clamp-1">{course.description}</CardDescription>
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
                                Editar Qluster
                              </DropdownMenuItem>
                              <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                                Ver Detalles
                              </DropdownMenuItem>
                              <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                                Duplicar Qluster
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 focus:bg-red-900/20 focus:text-red-300">
                                Eliminar Qluster
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
                                <Calendar className={`h-4 w-4 ${textColor}`} />
                                <span className="text-sm">Fechas:</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {new Date(course.startDate).toLocaleDateString()} -{" "}
                                {new Date(course.endDate).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Layers className={`h-4 w-4 ${textColor}`} />
                                <span className="text-sm">Qerniums:</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{course.modules}</span>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Users className={`h-4 w-4 ${textColor}`} />
                                <span className="text-sm">Estudiantes:</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{course.students}</span>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <BookOpen className={`h-4 w-4 ${textColor}`} />
                                <span className="text-sm">Clases:</span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {course.classes.length > 0 ? course.classes.join(", ") : "Sin asignar"}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <span className="px-2 py-0.5 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50">
                                Borrador
                              </span>
                            </div>
                            <Link href={`/dashboard/courses/${course.id}`}>
                              <Button
                                size="sm"
                                className={`bg-${course.color}-600 hover:bg-${course.color}-700 text-white`}
                              >
                                Editar
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

              {/* Card para crear nuevo curso */}
              <Card className="border-dashed border-2 border-purple-900/50 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center h-full">
                <Rocket className="h-12 w-12 text-purple-500/50 mb-4" />
                <h3 className="text-lg font-medium text-purple-300 mb-2">Crear Nuevo Qluster</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Diseña un qluster completo con contenido y asignaciones
                </p>
                <Link href="/dashboard/courses/create">
                  <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Qluster
                  </Button>
                </Link>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </>
  )
}
