"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  MoreHorizontal,
  Plus,
  Users,
  Video,
  Code,
  Edit,
  Eye,
  Settings,
  ChevronRight,
  Network,
  CuboidIcon as Cube,
  Maximize2,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { HierarchyVisualization } from "@/components/hierarchy-visualization"
import { useState } from "react"
import { QerniumPreviewModal } from "@/components/qernium-preview-modal"
import Link from "next/link"
import type { QerniumData } from "@/components/qernium-viewer"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  // Mock data para la visualización jerárquica
  const hierarchyData = {
    id: "qernex-1",
    name: "Exploración Espacial Avanzada",
    type: "qernex" as const,
    children: [
      {
        id: "qluster-1",
        name: "Fundamentos de la Exploración Espacial",
        type: "qluster" as const,
        children: [
          {
            id: "qernium-1",
            name: "Historia de la Exploración Espacial",
            type: "qernium" as const,
          },
          {
            id: "qernium-2",
            name: "Física de los Viajes Espaciales",
            type: "qernium" as const,
          },
          {
            id: "qernium-3",
            name: "Conceptos Básicos de Navegación",
            type: "qernium" as const,
          },
        ],
      },
      {
        id: "qluster-2",
        name: "Tecnologías de Propulsión",
        type: "qluster" as const,
        children: [
          {
            id: "qernium-4",
            name: "Sistemas de Propulsión Química",
            type: "qernium" as const,
          },
          {
            id: "qernium-5",
            name: "Propulsión Iónica y Nuclear",
            type: "qernium" as const,
          },
          {
            id: "qernium-6",
            name: "Futuro de la Propulsión Espacial",
            type: "qernium" as const,
          },
          {
            id: "qernium-7",
            name: "Evaluación de Tecnologías de Propulsión",
            type: "qernium" as const,
          },
        ],
      },
      {
        id: "qluster-3",
        name: "Exploración de Planetas y Lunas",
        type: "qluster" as const,
        children: [
          {
            id: "qernium-8",
            name: "Geología Planetaria",
            type: "qernium" as const,
          },
          {
            id: "qernium-9",
            name: "Misiones a Marte",
            type: "qernium" as const,
          },
          {
            id: "qernium-10",
            name: "Exploración de Lunas de Júpiter",
            type: "qernium" as const,
          },
          {
            id: "qernium-11",
            name: "Evaluación Final",
            type: "qernium" as const,
          },
        ],
      },
    ],
  }

  // Mock data for a course
  const course = {
    id: params.id,
    title: "Exploración Espacial Avanzada",
    description:
      "Técnicas y teorías modernas para la exploración del espacio profundo. Este curso cubre los fundamentos de la navegación espacial, la física de los viajes interplanetarios y las tecnologías emergentes para la exploración del espacio profundo.",
    startDate: "2025-04-15",
    endDate: "2025-07-30",
    classes: ["SE200-A"],
    students: 28,
    modules: [
      {
        id: 1,
        title: "Fundamentos de la Exploración Espacial",
        progress: 60,
        contents: [
          { id: 1, type: "document", title: "Historia de la Exploración Espacial", completed: true },
          { id: 2, type: "video", title: "Física de los Viajes Espaciales", completed: true },
          { id: 3, type: "quiz", title: "Conceptos Básicos de Navegación", completed: false },
        ],
      },
      {
        id: 2,
        title: "Tecnologías de Propulsión",
        progress: 0,
        contents: [
          { id: 4, type: "document", title: "Sistemas de Propulsión Química", completed: false },
          { id: 5, type: "document", title: "Propulsión Iónica y Nuclear", completed: false },
          { id: 6, type: "video", title: "Futuro de la Propulsión Espacial", completed: false },
          { id: 7, type: "quiz", title: "Evaluación de Tecnologías de Propulsión", completed: false },
        ],
      },
      {
        id: 3,
        title: "Exploración de Planetas y Lunas",
        progress: 0,
        contents: [
          { id: 8, type: "document", title: "Geología Planetaria", completed: false },
          { id: 9, type: "video", title: "Misiones a Marte", completed: false },
          { id: 10, type: "document", title: "Exploración de Lunas de Júpiter", completed: false },
          { id: 11, type: "assignment", title: "Diseño de Misión a Marte", completed: false },
        ],
      },
    ],
    progress: 15,
    status: "active",
    color: "cyan",
    enrolledStudents: [
      { id: 1, name: "Alex Johnson", email: "alex.j@example.com", progress: 20, lastActive: "2025-04-20" },
      { id: 2, name: "Sam Rodriguez", email: "sam.r@example.com", progress: 15, lastActive: "2025-04-22" },
      { id: 3, name: "Jamie Chen", email: "jamie.c@example.com", progress: 30, lastActive: "2025-04-21" },
      { id: 4, name: "Taylor Kim", email: "taylor.k@example.com", progress: 10, lastActive: "2025-04-19" },
      { id: 5, name: "Morgan Smith", email: "morgan.s@example.com", progress: 5, lastActive: "2025-04-18" },
    ],
  }

  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedQernium, setSelectedQernium] = useState<QerniumData | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Función para crear un objeto QerniumData completo basado en el tipo de contenido
  const createMockQernium = (content: any): QerniumData => {
    // Determinar el nivel de Bloom y verbo de acción según el tipo
    const bloomLevel =
      content.type === "document"
        ? "remember"
        : content.type === "video"
          ? "understand"
          : content.type === "quiz"
            ? "apply"
            : "create"

    const actionVerb =
      content.type === "document"
        ? "Identificar"
        : content.type === "video"
          ? "Explicar"
          : content.type === "quiz"
            ? "Aplicar"
            : "Diseñar"

    // Crear contenido específico según el tipo
    const qerniumContent: any = {
      type: content.type,
      title: content.title,
    }

    // Añadir propiedades específicas según el tipo
    if (content.type === "document") {
      qerniumContent.content = `
        <h2>${content.title}</h2>
        <p>Este es un documento de ejemplo que explica conceptos fundamentales sobre ${content.title}.</p>
        <h3>Secciones principales</h3>
        <ul>
          <li>Introducción a ${content.title}</li>
          <li>Conceptos clave</li>
          <li>Aplicaciones prácticas</li>
          <li>Conclusiones</li>
        </ul>
        <p>El contenido completo estará disponible en la versión final.</p>
      `
      qerniumContent.attachments = [{ name: "Material complementario.pdf", url: "#", type: "pdf" }]
    } else if (content.type === "video") {
      qerniumContent.videoUrl = "https://example.com/videos/sample.mp4"
      qerniumContent.duration = "25:30"
      qerniumContent.transcript = `
        [00:00] Introducción a ${content.title}
        [02:15] Conceptos fundamentales
        [10:30] Demostraciones prácticas
        [18:45] Resumen y conclusiones
      `
    } else if (content.type === "quiz") {
      qerniumContent.description = `Evaluación sobre ${content.title}`
      qerniumContent.questions = [
        {
          id: "q1",
          question: `¿Cuál es el principio fundamental de ${content.title}?`,
          options: [
            { id: "q1a", text: "Opción A", isCorrect: false },
            { id: "q1b", text: "Opción B", isCorrect: true },
            { id: "q1c", text: "Opción C", isCorrect: false },
          ],
          type: "single",
          points: 10,
        },
        {
          id: "q2",
          question: "Selecciona todos los conceptos relacionados:",
          options: [
            { id: "q2a", text: "Concepto 1", isCorrect: true },
            { id: "q2b", text: "Concepto 2", isCorrect: false },
            { id: "q2c", text: "Concepto 3", isCorrect: true },
          ],
          type: "multiple",
          points: 15,
        },
      ]
      qerniumContent.timeLimit = 30
      qerniumContent.passingScore = 70
    } else if (content.type === "assignment") {
      qerniumContent.description = `Tarea práctica sobre ${content.title}`
      qerniumContent.instructions = `
        # Instrucciones para ${content.title}
        
        ## Objetivo
        Aplicar los conceptos aprendidos sobre ${content.title} en un proyecto práctico.
        
        ## Requisitos
        1. Investigación preliminar
        2. Desarrollo del proyecto
        3. Documentación
        4. Presentación de resultados
        
        ## Criterios de evaluación
        - Comprensión de conceptos (30%)
        - Aplicación práctica (40%)
        - Creatividad (20%)
        - Presentación (10%)
      `
      qerniumContent.dueDate = "2025-05-30"
      qerniumContent.attachments = [
        { name: "Plantilla de entrega.docx", url: "#", type: "docx" },
        { name: "Recursos adicionales.zip", url: "#", type: "zip" },
      ]
    }

    // Crear y devolver el objeto QerniumData completo
    return {
      id: content.id.toString(),
      title: content.title,
      description: `${
        content.type === "document"
          ? "Documento sobre"
          : content.type === "video"
            ? "Video explicativo sobre"
            : content.type === "quiz"
              ? "Evaluación de"
              : "Tarea práctica sobre"
      } ${content.title}`,
      bloomLevel: bloomLevel,
      actionVerb: actionVerb,
      estimatedTime: content.type === "assignment" ? 120 : content.type === "quiz" ? 45 : 30,
      content: qerniumContent,
      skills: [
        {
          id: "skill1",
          subskillId: "subskill1",
          subskillName: `Conocimiento de ${content.title}`,
          skillName: "Competencia Técnica",
          skillColor: "cyan",
          level: 3,
        },
        {
          id: "skill2",
          subskillId: "subskill2",
          subskillName: "Pensamiento analítico",
          skillName: "Competencia Cognitiva",
          skillColor: "purple",
          level: 2,
        },
      ],
      creatorId: "1",
      creatorName: "Instructor",
    }
  }

  return (
    <>
      <DashboardHeader heading={course.title} text="Gestión del Qernex y seguimiento de progreso">
        <div className="flex gap-2">
          <Button variant="outline" className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20">
            <Edit className="mr-2 h-4 w-4" /> Editar Qernex
          </Button>
          <Link href="/dashboard/qerniums/preview">
            <Button className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600">
              <Eye className="mr-2 h-4 w-4" /> Vista Previa
            </Button>
          </Link>
        </div>
      </DashboardHeader>
      <DashboardShell>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-cyan-300">Información del Qernex</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Fecha de Inicio</div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-cyan-400" />
                        <span>{new Date(course.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Fecha de Finalización</div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-cyan-400" />
                        <span>{new Date(course.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Clases Asignadas</div>
                      <div className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4 text-cyan-400" />
                        <span>{course.classes.join(", ")}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Estudiantes Inscritos</div>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-cyan-400" />
                        <span>{course.students}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progreso General del Qernex</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress
                      value={course.progress}
                      className="h-2 bg-black/50"
                      indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyan-300"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <Badge variant="outline" className="border-cyan-900/50 text-cyan-300 bg-cyan-950/20">
                      {course.status === "active"
                        ? "Activo"
                        : course.status === "scheduled"
                          ? "Programado"
                          : "Borrador"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                    >
                      <Settings className="mr-2 h-4 w-4" /> Configuración
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="modules" className="space-y-4">
              <TabsList className="bg-black/20 border border-cyan-900/50">
                <TabsTrigger
                  value="modules"
                  className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                >
                  <Cube className="mr-2 h-4 w-4" />
                  Qlusters
                </TabsTrigger>
                <TabsTrigger
                  value="students"
                  className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Estudiantes
                </TabsTrigger>
                <TabsTrigger
                  value="hierarchy"
                  className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                >
                  <Network className="mr-2 h-4 w-4" />
                  Scope
                </TabsTrigger>
                <TabsTrigger
                  value="stats"
                  className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
                >
                  <ChevronRight className="mr-2 h-4 w-4" />
                  Estadísticas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="modules" className="space-y-4">
                {course.modules.map((module) => (
                  <Card key={module.id} className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg text-cyan-300">{module.title}</CardTitle>
                          <CardDescription>
                            {module.contents.length} contenidos • {module.progress}% completado
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menú</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-black/90 border-cyan-900/50">
                            <DropdownMenuItem className="text-cyan-300 focus:bg-cyan-900/20 focus:text-cyan-200">
                              Editar Qluster
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-cyan-300 focus:bg-cyan-900/20 focus:text-cyan-200">
                              Añadir Qernium
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-cyan-300 focus:bg-cyan-900/20 focus:text-cyan-200">
                              Reordenar
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
                        <div className="space-y-2">
                          {module.contents.map((content) => (
                            <div
                              key={content.id}
                              className={`flex justify-between items-center p-3 border rounded-md ${
                                content.completed
                                  ? "border-green-900/50 bg-green-950/10"
                                  : "border-cyan-900/50 bg-cyan-950/10"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {content.type === "document" && <FileText className="h-4 w-4 text-cyan-400" />}
                                {content.type === "video" && <Video className="h-4 w-4 text-cyan-400" />}
                                {content.type === "quiz" && <Code className="h-4 w-4 text-cyan-400" />}
                                <span>{content.title}</span>
                                {content.completed && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 border-green-900/50 text-green-300 bg-green-950/20"
                                  >
                                    Completado
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-200"
                                  onClick={() => {
                                    // Crear un objeto QerniumData completo
                                    const mockQernium = createMockQernium(content)
                                    setSelectedQernium(mockQernium)
                                    setIsPreviewOpen(true)
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progreso del Qluster</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress
                            value={module.progress}
                            className="h-2 bg-black/50"
                            indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyan-300"
                          />
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Añadir Qernium
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button className="w-full border-dashed border-2 border-cyan-900/50 bg-transparent text-cyan-300 hover:bg-cyan-950/20">
                  <Plus className="mr-2 h-4 w-4" /> Añadir Qluster
                </Button>
              </TabsContent>

              <TabsContent value="students" className="space-y-4">
                <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg text-cyan-300">Estudiantes Inscritos</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Añadir Estudiante
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border border-cyan-900/50">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="border-b border-cyan-900/50">
                            <tr className="border-b transition-colors hover:bg-cyan-900/10">
                              <th className="h-12 px-4 text-left align-middle font-medium text-cyan-300">Estudiante</th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-cyan-300 hidden md:table-cell">
                                Progreso
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-cyan-300 hidden md:table-cell">
                                Última Actividad
                              </th>
                              <th className="h-12 px-4 text-right align-middle font-medium text-cyan-300">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {course.enrolledStudents.map((student) => (
                              <tr
                                key={student.id}
                                className="border-b border-cyan-900/30 transition-colors hover:bg-cyan-900/10"
                              >
                                <td className="p-4 align-middle">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 border border-cyan-900/50">
                                      <AvatarImage
                                        src={`/abstract-geometric-pattern.png?key=72xkq&key=ir9x7&height=36&width=36`}
                                        alt={student.name}
                                      />
                                      <AvatarFallback className="bg-cyan-950/50 text-cyan-300">
                                        {student.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium">{student.name}</div>
                                      <div className="text-xs text-muted-foreground">{student.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 align-middle hidden md:table-cell">
                                  <div className="flex items-center gap-2">
                                    <div className="w-full max-w-24 bg-black/50 rounded-full h-2">
                                      <div
                                        className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-2 rounded-full"
                                        style={{ width: `${student.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs font-medium">{student.progress}%</span>
                                  </div>
                                </td>
                                <td className="p-4 align-middle hidden md:table-cell">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-cyan-400" />
                                    <span className="text-sm">{new Date(student.lastActive).toLocaleDateString()}</span>
                                  </div>
                                </td>
                                <td className="p-4 align-middle text-right">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-200"
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hierarchy" className="space-y-4">
                <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg text-cyan-300">Scope</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                        onClick={() => {
                          document
                            .querySelector('[aria-label="Visualizar Jerarquía"]')
                            ?.dispatchEvent(new MouseEvent("click"))
                        }}
                      >
                        <Maximize2 className="mr-2 h-4 w-4" />
                        Pantalla Completa
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="relative h-[400px] border border-cyan-900/30 rounded-md overflow-hidden">
                        <HierarchyVisualization data={hierarchyData} onNodeClick={setSelectedNode} />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2 border border-cyan-900/50 rounded-md bg-cyan-950/10 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                          <span className="text-xs text-cyan-300">Qernex</span>
                        </div>
                        <div className="p-2 border border-cyan-900/50 rounded-md bg-cyan-950/10 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-violet-400"></div>
                          <span className="text-xs text-violet-300">Qlusters</span>
                        </div>
                        <div className="p-2 border border-cyan-900/50 rounded-md bg-cyan-950/10 flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                          <span className="text-xs text-pink-300">Qerniums</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>
                          Visualiza la estructura completa del Qernex. Haz clic en los nodos para explorar y usa la
                          rueda del ratón para hacer zoom.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-cyan-300">Estadísticas del Qernex</CardTitle>
                    <CardDescription>Análisis de participación y rendimiento</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-cyan-900/50 rounded-md bg-cyan-950/10 space-y-2">
                        <h3 className="text-sm font-medium text-cyan-300">Progreso Promedio</h3>
                        <div className="text-3xl font-bold">15%</div>
                        <Progress
                          value={15}
                          className="h-2 bg-black/50"
                          indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyan-300"
                        />
                      </div>

                      <div className="p-4 border border-cyan-900/50 rounded-md bg-cyan-950/10 space-y-2">
                        <h3 className="text-sm font-medium text-cyan-300">Tasa de Finalización</h3>
                        <div className="text-3xl font-bold">0%</div>
                        <Progress
                          value={0}
                          className="h-2 bg-black/50"
                          indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyan-300"
                        />
                      </div>

                      <div className="p-4 border border-cyan-900/50 rounded-md bg-cyan-950/10 space-y-2">
                        <h3 className="text-sm font-medium text-cyan-300">Participación</h3>
                        <div className="text-3xl font-bold">78%</div>
                        <Progress
                          value={78}
                          className="h-2 bg-black/50"
                          indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyan-300"
                        />
                      </div>

                      <div className="p-4 border border-cyan-900/50 rounded-md bg-cyan-950/10 space-y-2">
                        <h3 className="text-sm font-medium text-cyan-300">Calificación Promedio</h3>
                        <div className="text-3xl font-bold">85%</div>
                        <Progress
                          value={85}
                          className="h-2 bg-black/50"
                          indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyan-300"
                        />
                      </div>
                    </div>

                    <div className="mt-4 text-center text-sm text-muted-foreground">
                      <p>Las estadísticas detalladas estarán disponibles cuando más estudiantes completen el Qernex.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-300">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                >
                  <Plus className="mr-2 h-4 w-4" /> Añadir Qluster
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                >
                  <Users className="mr-2 h-4 w-4" /> Gestionar Estudiantes
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                >
                  <FileText className="mr-2 h-4 w-4" /> Exportar Calificaciones
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                >
                  <Settings className="mr-2 h-4 w-4" /> Configuración del Qernex
                </Button>
              </CardContent>
            </Card>

            <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-300">Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border border-cyan-900/50 rounded-md bg-cyan-950/10">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">Fecha Límite: Quiz de Navegación</div>
                      <Badge variant="outline" className="border-amber-900/50 text-amber-300 bg-amber-950/20">
                        Pendiente
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">30 de Abril, 2025</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" /> En 10 días
                    </div>
                  </div>

                  <div className="p-3 border border-cyan-900/50 rounded-md bg-cyan-950/10">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">Inicio de Qluster: Tecnologías de Propulsión</div>
                      <Badge variant="outline" className="border-purple-900/50 text-purple-300 bg-purple-950/20">
                        Programado
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">15 de Mayo, 2025</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" /> En 25 días
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-300">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 border border-cyan-900/50">
                      <AvatarFallback className="bg-cyan-950/50 text-cyan-300">JC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Jamie Chen</span> completó{" "}
                        <span className="text-cyan-300">Física de los Viajes Espaciales</span>
                      </p>
                      <p className="text-xs text-muted-foreground">Hace 2 días</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 border border-cyan-900/50">
                      <AvatarFallback className="bg-cyan-950/50 text-cyan-300">AJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Alex Johnson</span> completó{" "}
                        <span className="text-cyan-300">Historia de la Exploración Espacial</span>
                      </p>
                      <p className="text-xs text-muted-foreground">Hace 3 días</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 border border-cyan-900/50">
                      <AvatarFallback className="bg-cyan-950/50 text-cyan-300">SR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Sam Rodriguez</span> se unió al Qernex
                      </p>
                      <p className="text-xs text-muted-foreground">Hace 5 días</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardShell>
      {/* Modal de vista previa */}
      <QerniumPreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} qernium={selectedQernium} />
    </>
  )
}
