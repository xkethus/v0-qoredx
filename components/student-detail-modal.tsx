"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  MessageSquare,
  FileText,
  Send,
} from "lucide-react"

interface StudentDetailModalProps {
  student: any // Idealmente, esto debería ser un tipo específico
  isOpen: boolean
  onClose: () => void
}

export function StudentDetailModal({ student, isOpen, onClose }: StudentDetailModalProps) {
  const [activeTab, setActiveTab] = useState("info")

  if (!student) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black/90 border-purple-900/50 shadow-[0_0_15px_rgba(139,92,246,0.2)] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-300 flex items-center gap-2">
            <span>Perfil de Estudiante</span>
            <Badge className="ml-2 bg-cyan-900/50 text-cyan-300">
              {student.status === "active" ? "Activo" : "Inactivo"}
            </Badge>
          </DialogTitle>
          <DialogDescription>Información detallada y estadísticas del estudiante</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-1">
            <Card className="border-purple-900/50 bg-black/50 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
              <CardHeader className="pb-2 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-2 border-purple-500">
                  <AvatarImage src={student.avatar || "/placeholder.svg?height=96&width=96"} />
                  <AvatarFallback className="bg-purple-900/50 text-purple-300 text-xl">
                    {student.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="mt-2 text-xl text-purple-300">{student.name}</CardTitle>
                <CardDescription>{student.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-cyan-400" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-cyan-400" />
                    <span>{student.phone || "No disponible"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-cyan-400" />
                    <span>{student.enrollmentDate || "No disponible"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-cyan-400" />
                    <span>{student.location || "No disponible"}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-purple-900/30">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-pink-400" /> Cursos Inscritos
                  </h4>
                  <div className="space-y-1">
                    {(student.courses || []).map((course: any) => (
                      <Badge key={course.id} className="mr-1 mb-1 bg-pink-900/30 text-pink-300 hover:bg-pink-900/50">
                        {course.name}
                      </Badge>
                    ))}
                    {(!student.courses || student.courses.length === 0) && (
                      <span className="text-xs text-muted-foreground">No hay cursos inscritos</span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-purple-900/30">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Award className="h-4 w-4 text-cyan-400" /> Logros
                  </h4>
                  <div className="space-y-1">
                    {(student.achievements || []).map((achievement: any) => (
                      <Badge
                        key={achievement.id}
                        className="mr-1 mb-1 bg-cyan-900/30 text-cyan-300 hover:bg-cyan-900/50"
                      >
                        {achievement.name}
                      </Badge>
                    ))}
                    {(!student.achievements || student.achievements.length === 0) && (
                      <span className="text-xs text-muted-foreground">No hay logros obtenidos</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="bg-black/20 border border-purple-900/50">
                <TabsTrigger
                  value="info"
                  className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
                >
                  <User className="mr-2 h-4 w-4" />
                  Información
                </TabsTrigger>
                <TabsTrigger
                  value="performance"
                  className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Rendimiento
                </TabsTrigger>
                <TabsTrigger
                  value="assignments"
                  className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Tareas
                </TabsTrigger>
                <TabsTrigger
                  value="messages"
                  className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Mensajes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <Card className="border-purple-900/50 bg-black/50 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-300">Información Personal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Nombre Completo</h4>
                        <p className="text-sm">{student.name}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Fecha de Nacimiento</h4>
                        <p className="text-sm">{student.birthDate || "No disponible"}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Género</h4>
                        <p className="text-sm">{student.gender || "No disponible"}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Dirección</h4>
                        <p className="text-sm">{student.address || "No disponible"}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Ciudad</h4>
                        <p className="text-sm">{student.city || "No disponible"}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">País</h4>
                        <p className="text-sm">{student.country || "No disponible"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-cyan-900/50 bg-black/50 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyan-300">Información Académica</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Nivel Educativo</h4>
                        <p className="text-sm">{student.educationLevel || "No disponible"}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Institución Anterior</h4>
                        <p className="text-sm">{student.previousInstitution || "No disponible"}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Especialización</h4>
                        <p className="text-sm">{student.specialization || "No disponible"}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Fecha de Inscripción</h4>
                        <p className="text-sm">{student.enrollmentDate || "No disponible"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <Card className="border-pink-900/50 bg-black/50 shadow-[0_0_10px_rgba(236,72,153,0.1)]">
                  <CardHeader>
                    <CardTitle className="text-xl text-pink-300">Estadísticas de Rendimiento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Promedio General</h4>
                        <span className="text-sm font-bold text-pink-300">{student.gpa || "N/A"}/10</span>
                      </div>
                      <Progress value={student.gpa ? student.gpa * 10 : 0} className="h-2 bg-pink-950/30">
                        <div className="h-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
                      </Progress>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Asistencia</h4>
                        <span className="text-sm font-bold text-pink-300">{student.attendance || 0}%</span>
                      </div>
                      <Progress value={student.attendance || 0} className="h-2 bg-pink-950/30">
                        <div className="h-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
                      </Progress>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Tareas Completadas</h4>
                        <span className="text-sm font-bold text-pink-300">
                          {student.completedAssignments || 0}/{student.totalAssignments || 0}
                        </span>
                      </div>
                      <Progress
                        value={
                          student.totalAssignments ? (student.completedAssignments / student.totalAssignments) * 100 : 0
                        }
                        className="h-2 bg-pink-950/30"
                      >
                        <div className="h-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
                      </Progress>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Participación</h4>
                        <span className="text-sm font-bold text-pink-300">{student.participation || 0}%</span>
                      </div>
                      <Progress value={student.participation || 0} className="h-2 bg-pink-950/30">
                        <div className="h-full bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
                      </Progress>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="p-3 rounded-md bg-pink-950/20 border border-pink-900/30">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm font-medium">Fortalezas</span>
                        </div>
                        <ul className="mt-2 space-y-1 text-xs">
                          {(student.strengths || ["No hay datos disponibles"]).map((strength: string, i: number) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-green-400">•</span> {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 rounded-md bg-pink-950/20 border border-pink-900/30">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          <span className="text-sm font-medium">Áreas de Mejora</span>
                        </div>
                        <ul className="mt-2 space-y-1 text-xs">
                          {(student.areasToImprove || ["No hay datos disponibles"]).map((area: string, i: number) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-yellow-400">•</span> {area}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignments" className="space-y-4">
                <Card className="border-cyan-900/50 bg-black/50 shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                  <CardHeader>
                    <CardTitle className="text-xl text-cyan-300">Tareas Recientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(student.assignments || []).length > 0 ? (
                        (student.assignments || []).map((assignment: any) => (
                          <div
                            key={assignment.id}
                            className="p-3 rounded-md border border-cyan-900/30 bg-cyan-950/10 hover:bg-cyan-950/20 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-medium text-cyan-300">{assignment.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{assignment.course}</p>
                              </div>
                              <Badge
                                className={`
                                  ${
                                    assignment.status === "completed"
                                      ? "bg-green-900/30 text-green-300"
                                      : assignment.status === "pending"
                                        ? "bg-yellow-900/30 text-yellow-300"
                                        : assignment.status === "late"
                                          ? "bg-red-900/30 text-red-300"
                                          : "bg-cyan-900/30 text-cyan-300"
                                  }
                                `}
                              >
                                {assignment.status === "completed"
                                  ? "Completado"
                                  : assignment.status === "pending"
                                    ? "Pendiente"
                                    : assignment.status === "late"
                                      ? "Atrasado"
                                      : assignment.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-xs">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-muted-foreground">Fecha límite: {assignment.dueDate}</span>
                            </div>
                            {assignment.grade && (
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-xs">Calificación:</span>
                                <Badge className="bg-purple-900/30 text-purple-300">{assignment.grade}/10</Badge>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-muted-foreground">
                          <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No hay tareas disponibles</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="space-y-4">
                <Card className="border-purple-900/50 bg-black/50 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-300">Mensajes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border border-purple-900/30 rounded-md p-4 bg-purple-950/10">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-purple-900/50 text-purple-300 text-xs">
                              {student.name
                                ?.split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h4 className="text-sm font-medium">{student.name}</h4>
                              <span className="text-xs text-muted-foreground">Hace 2 días</span>
                            </div>
                            <p className="text-sm mt-1">
                              Hola profesor, tengo una duda sobre la última tarea asignada. ¿Podría darme más detalles
                              sobre los requisitos?
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border border-cyan-900/30 rounded-md p-4 bg-cyan-950/10 ml-6">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-cyan-900/50 text-cyan-300 text-xs">PR</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <h4 className="text-sm font-medium">Profesor</h4>
                              <span className="text-xs text-muted-foreground">Hace 1 día</span>
                            </div>
                            <p className="text-sm mt-1">
                              Claro, los detalles están en la sección de recursos adicionales. Revisa el documento
                              adjunto y si tienes más dudas, no dudes en preguntar.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Textarea
                          placeholder="Escribe un mensaje..."
                          className="min-h-[80px] border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                        />
                        <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 self-end">
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Enviar mensaje</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
            onClick={onClose}
          >
            Cerrar
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
            Editar Perfil
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
