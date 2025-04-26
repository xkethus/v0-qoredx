import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FileText, Plus, Users, Layers, Video, Code, CheckCircle, X, Globe, Sparkles, LinkIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CreateCoursePage() {
  return (
    <>
      <DashboardHeader heading="Crear Qernex" text="Diseña un Qernex completo con contenido y asignaciones">
        <div className="flex gap-2">
          <Button variant="outline" className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20">
            <X className="mr-2 h-4 w-4" /> Cancelar
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
            <CheckCircle className="mr-2 h-4 w-4" /> Guardar Qernex
          </Button>
        </div>
      </DashboardHeader>
      <DashboardShell>
        <div className="grid gap-4 md:grid-cols-7">
          <div className="md:col-span-5 space-y-4">
            <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <CardHeader>
                <CardTitle className="text-xl text-purple-300">Información del Qernex</CardTitle>
                <CardDescription>Información básica sobre el Qernex</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Qernex</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Fundamentos de Física Cuántica"
                    className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe el contenido y objetivos del Qernex..."
                    className="min-h-[100px] border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Fecha de Inicio</Label>
                    <Input
                      id="start-date"
                      type="date"
                      className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">Fecha de Finalización</Label>
                    <Input
                      id="end-date"
                      type="date"
                      className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tema de Color</Label>
                  <RadioGroup defaultValue="purple" className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="purple" id="purple" className="border-purple-500 text-purple-500" />
                      <Label htmlFor="purple" className="text-purple-300">
                        Púrpura
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cyan" id="cyan" className="border-cyan-500 text-cyan-500" />
                      <Label htmlFor="cyan" className="text-cyan-300">
                        Cian
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pink" id="pink" className="border-pink-500 text-pink-500" />
                      <Label htmlFor="pink" className="text-pink-300">
                        Rosa
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-300">Qlusters</CardTitle>
                <CardDescription>Organiza el contenido en Qlusters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border border-cyan-900/50 rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-cyan-400" />
                      <h3 className="text-lg font-medium text-cyan-300">Qluster 1</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="module-title-1">Título del Qluster</Label>
                    <Input
                      id="module-title-1"
                      placeholder="Ej: Introducción a la Física Cuántica"
                      className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Qerniums</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border border-cyan-900/50 rounded-md bg-cyan-950/10">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-cyan-400" />
                          <span>Introducción a los Principios Cuánticos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-200"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 border border-cyan-900/50 rounded-md bg-cyan-950/10">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-cyan-400" />
                          <span>Video: Fundamentos de la Mecánica Cuántica</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-200"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 border border-cyan-900/50 rounded-md bg-cyan-950/10">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-cyan-400" />
                          <span>Quiz: Conceptos Básicos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-200"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Añadir Qernium
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border border-cyan-900/50 rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Layers className="h-5 w-5 text-cyan-400" />
                      <h3 className="text-lg font-medium text-cyan-300">Qluster 2</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="module-title-2">Título del Qluster</Label>
                    <Input
                      id="module-title-2"
                      placeholder="Ej: Aplicaciones Prácticas"
                      className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Qerniums</Label>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Añadir Qernium
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full border-dashed border-2 border-cyan-900/50 bg-transparent text-cyan-300 hover:bg-cyan-950/20">
                  <Plus className="mr-2 h-4 w-4" /> Añadir Qluster
                </Button>
              </CardContent>
            </Card>

            <Card className="border-pink-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.1)]">
              <CardHeader>
                <CardTitle className="text-xl text-pink-300">Asignación de Clases y Estudiantes</CardTitle>
                <CardDescription>Asigna clases y estudiantes al Qernex</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-pink-300">Clases</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 p-3 border border-pink-900/50 rounded-md bg-pink-950/10">
                      <Checkbox id="class-1" className="border-pink-500 text-pink-500" />
                      <Label htmlFor="class-1" className="flex-1">
                        QP101-A (Física Cuántica 101 - Grupo A)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-pink-900/50 rounded-md bg-pink-950/10">
                      <Checkbox id="class-2" className="border-pink-500 text-pink-500" />
                      <Label htmlFor="class-2" className="flex-1">
                        QP101-B (Física Cuántica 101 - Grupo B)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-pink-900/50 rounded-md bg-pink-950/10">
                      <Checkbox id="class-3" className="border-pink-500 text-pink-500" />
                      <Label htmlFor="class-3" className="flex-1">
                        SE200-A (Exploración Espacial - Grupo A)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-pink-900/50 rounded-md bg-pink-950/10">
                      <Checkbox id="class-4" className="border-pink-500 text-pink-500" />
                      <Label htmlFor="class-4" className="flex-1">
                        AIE300-A (Ética en IA - Grupo A)
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-pink-300">Estudiantes Individuales</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-pink-900/50 text-pink-300 hover:bg-pink-900/20"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Añadir Estudiante
                    </Button>
                  </div>

                  <div className="border border-pink-900/50 rounded-md">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead className="border-b border-pink-900/50">
                          <tr className="border-b transition-colors hover:bg-pink-900/10">
                            <th className="h-12 px-4 text-left align-middle font-medium text-pink-300">Estudiante</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-pink-300">Email</th>
                            <th className="h-12 px-4 text-right align-middle font-medium text-pink-300">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-pink-900/30 transition-colors hover:bg-pink-900/10">
                            <td className="p-4 align-middle">Alex Johnson</td>
                            <td className="p-4 align-middle">alex.j@example.com</td>
                            <td className="p-4 align-middle text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-pink-300 hover:bg-pink-900/20 hover:text-pink-200"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b border-pink-900/30 transition-colors hover:bg-pink-900/10">
                            <td className="p-4 align-middle">Jamie Chen</td>
                            <td className="p-4 align-middle">jamie.c@example.com</td>
                            <td className="p-4 align-middle text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-pink-300 hover:bg-pink-900/20 hover:text-pink-200"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <CardHeader>
                <CardTitle className="text-xl text-purple-300">Contenido Relacionado</CardTitle>
                <CardDescription>Añade contenido relacionado para enriquecer el Qernex</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border border-purple-900/50 rounded-md bg-purple-950/10">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-400" />
                      <div>
                        <div>Introducción a la Mecánica Cuántica</div>
                        <div className="text-xs text-muted-foreground">Qernex: Física Avanzada</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-purple-300 hover:bg-purple-900/20 hover:text-purple-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-purple-900/50 rounded-md bg-purple-950/10">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-purple-400" />
                      <div>
                        <div>Recursos de Física Cuántica - MIT OpenCourseWare</div>
                        <div className="text-xs text-muted-foreground">https://ocw.mit.edu/quantum-physics</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-purple-300 hover:bg-purple-900/20 hover:text-purple-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Añadir Qernium
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                    >
                      <LinkIcon className="mr-2 h-4 w-4" /> Añadir Enlace Externo
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
          </div>

          <div className="md:col-span-2 space-y-4">
            <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <CardHeader>
                <CardTitle className="text-lg text-purple-300">Configuración del Qernex</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-purple-900/50">
                      <SelectItem value="draft">Borrador</SelectItem>
                      <SelectItem value="scheduled">Programado</SelectItem>
                      <SelectItem value="active">Activo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibilidad</Label>
                  <Select defaultValue="private">
                    <SelectTrigger className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
                      <SelectValue placeholder="Seleccionar visibilidad" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-purple-900/50">
                      <SelectItem value="private">Privado</SelectItem>
                      <SelectItem value="public">Público</SelectItem>
                      <SelectItem value="restricted">Restringido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="auto-enroll" className="border-purple-500 text-purple-500" />
                    <Label htmlFor="auto-enroll">Inscripción automática para nuevos estudiantes</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sequential" className="border-purple-500 text-purple-500" />
                    <Label htmlFor="sequential">Progresión secuencial (completar Qlusters en orden)</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="certificate" className="border-purple-500 text-purple-500" />
                    <Label htmlFor="certificate">Emitir certificado al completar</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <CardHeader>
                <CardTitle className="text-lg text-cyan-300">Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Qlusters:</span>
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Qerniums:</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Clases asignadas:</span>
                    <span className="text-sm font-medium">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Estudiantes asignados:</span>
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Duración:</span>
                    <span className="text-sm font-medium">No definida</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-cyan-900/50">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
                    <CheckCircle className="mr-2 h-4 w-4" /> Guardar Qernex
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-pink-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.1)]">
              <CardHeader>
                <CardTitle className="text-lg text-pink-300">Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start border-pink-900/50 text-pink-300 hover:bg-pink-900/20"
                >
                  <FileText className="mr-2 h-4 w-4" /> Vista Previa
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-pink-900/50 text-pink-300 hover:bg-pink-900/20"
                >
                  <Plus className="mr-2 h-4 w-4" /> Importar Contenido
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-pink-900/50 text-pink-300 hover:bg-pink-900/20"
                >
                  <Users className="mr-2 h-4 w-4" /> Gestionar Permisos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardShell>
    </>
  )
}
