import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Calendar, Download, FileText, Activity, TrendingUp, Clock, Video } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CourseAnalyticsPage() {
  return (
    <>
      <DashboardHeader heading="Analíticas de Cursos" text="Estadísticas y métricas de rendimiento de todos los cursos">
        <div className="flex gap-2">
          <Button variant="outline" className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20">
            <Calendar className="mr-2 h-4 w-4" /> Últimos 30 días
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
            <Download className="mr-2 h-4 w-4" /> Exportar Datos
          </Button>
        </div>
      </DashboardHeader>
      <DashboardShell>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-purple-300">Total de Cursos</CardTitle>
              <CardDescription>Todos los cursos activos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <div className="flex items-center mt-1 text-green-400 text-xs">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+2 desde el mes pasado</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-cyan-300">Estudiantes Activos</CardTitle>
              <CardDescription>Total de estudiantes inscritos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">128</div>
              <div className="flex items-center mt-1 text-green-400 text-xs">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+15 desde el mes pasado</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-pink-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-pink-300">Tasa de Finalización</CardTitle>
              <CardDescription>Promedio de todos los cursos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">68%</div>
              <Progress
                value={68}
                className="h-2 bg-black/50 mt-2"
                indicatorClassName="bg-gradient-to-r from-pink-500 to-pink-300"
              />
            </CardContent>
          </Card>

          <Card className="border-amber-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(251,191,36,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-amber-300">Tiempo Promedio</CardTitle>
              <CardDescription>Tiempo de estudio por estudiante</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.2h</div>
              <div className="flex items-center mt-1 text-amber-400 text-xs">
                <Clock className="mr-1 h-3 w-3" />
                <span>Por semana y estudiante</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="engagement" className="space-y-4 mt-4">
          <TabsList className="bg-black/20 border border-purple-900/50">
            <TabsTrigger
              value="engagement"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              <Activity className="mr-2 h-4 w-4" />
              Participación
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              <BarChart className="mr-2 h-4 w-4" />
              Rendimiento
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              <FileText className="mr-2 h-4 w-4" />
              Contenido
            </TabsTrigger>
          </TabsList>

          <TabsContent value="engagement" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg text-purple-300">Participación por Curso</CardTitle>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px] border-purple-900/50 bg-black/50 focus:ring-purple-500">
                        <SelectValue placeholder="Seleccionar período" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-purple-900/50">
                        <SelectItem value="all">Todos los cursos</SelectItem>
                        <SelectItem value="active">Cursos activos</SelectItem>
                        <SelectItem value="completed">Cursos completados</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="text-sm">Física Cuántica</span>
                        </div>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <Progress
                        value={92}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                          <span className="text-sm">Exploración Espacial</span>
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <Progress
                        value={78}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyan-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                          <span className="text-sm">Ética en IA</span>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress
                        value={85}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-pink-500 to-pink-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          <span className="text-sm">Programación Cuántica</span>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <Progress
                        value={45}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-amber-500 to-amber-300"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-300">Actividad Semanal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[220px] flex items-end justify-between gap-2">
                    {[40, 65, 30, 70, 90, 55, 45].map((value, i) => (
                      <div key={i} className="relative flex-1">
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-t-sm"
                          style={{ height: `${value}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mié</span>
                    <span>Jue</span>
                    <span>Vie</span>
                    <span>Sáb</span>
                    <span>Dom</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-pink-900/50 bg-black/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-pink-300">Estudiantes Más Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="border-b border-pink-900/50">
                      <tr className="border-b transition-colors hover:bg-pink-900/10">
                        <th className="h-12 px-4 text-left align-middle font-medium text-pink-300">Estudiante</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-pink-300">Cursos</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-pink-300">Tiempo</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-pink-300">Progreso</th>
                        <th className="h-12 px-4 text-right align-middle font-medium text-pink-300">Calificación</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-pink-900/30 transition-colors hover:bg-pink-900/10">
                        <td className="p-4 align-middle">Jamie Chen</td>
                        <td className="p-4 align-middle">3</td>
                        <td className="p-4 align-middle">8.5h</td>
                        <td className="p-4 align-middle">
                          <Progress
                            value={92}
                            className="h-2 w-24 bg-black/50"
                            indicatorClassName="bg-gradient-to-r from-pink-500 to-pink-300"
                          />
                        </td>
                        <td className="p-4 align-middle text-right">A+</td>
                      </tr>
                      <tr className="border-b border-pink-900/30 transition-colors hover:bg-pink-900/10">
                        <td className="p-4 align-middle">Alex Johnson</td>
                        <td className="p-4 align-middle">2</td>
                        <td className="p-4 align-middle">6.2h</td>
                        <td className="p-4 align-middle">
                          <Progress
                            value={85}
                            className="h-2 w-24 bg-black/50"
                            indicatorClassName="bg-gradient-to-r from-pink-500 to-pink-300"
                          />
                        </td>
                        <td className="p-4 align-middle text-right">A</td>
                      </tr>
                      <tr className="border-b border-pink-900/30 transition-colors hover:bg-pink-900/10">
                        <td className="p-4 align-middle">Sam Rodriguez</td>
                        <td className="p-4 align-middle">2</td>
                        <td className="p-4 align-middle">5.8h</td>
                        <td className="p-4 align-middle">
                          <Progress
                            value={78}
                            className="h-2 w-24 bg-black/50"
                            indicatorClassName="bg-gradient-to-r from-pink-500 to-pink-300"
                          />
                        </td>
                        <td className="p-4 align-middle text-right">B+</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-300">Calificaciones Promedio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="text-sm">Física Cuántica</span>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress
                        value={85}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                          <span className="text-sm">Exploración Espacial</span>
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <Progress
                        value={78}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyan-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                          <span className="text-sm">Ética en IA</span>
                        </div>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <Progress
                        value={92}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-pink-500 to-pink-300"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-300">Distribución de Calificaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">A (90-100%)</span>
                      </div>
                      <span className="text-sm font-medium">32 estudiantes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                        <span className="text-sm">B (80-89%)</span>
                      </div>
                      <span className="text-sm font-medium">45 estudiantes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">C (70-79%)</span>
                      </div>
                      <span className="text-sm font-medium">28 estudiantes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-sm">D (60-69%)</span>
                      </div>
                      <span className="text-sm font-medium">15 estudiantes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">F (0-59%)</span>
                      </div>
                      <span className="text-sm font-medium">8 estudiantes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-pink-900/50 bg-black/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-pink-300">Rendimiento por Módulo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="border-b border-pink-900/50">
                      <tr className="border-b transition-colors hover:bg-pink-900/10">
                        <th className="h-12 px-4 text-left align-middle font-medium text-pink-300">Módulo</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-pink-300">Curso</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-pink-300">Completado</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-pink-300">Calificación</th>
                        <th className="h-12 px-4 text-right align-middle font-medium text-pink-300">Dificultad</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-pink-900/30 transition-colors hover:bg-pink-900/10">
                        <td className="p-4 align-middle">Fundamentos de la Exploración Espacial</td>
                        <td className="p-4 align-middle">Exploración Espacial</td>
                        <td className="p-4 align-middle">85%</td>
                        <td className="p-4 align-middle">78%</td>
                        <td className="p-4 align-middle text-right">Media</td>
                      </tr>
                      <tr className="border-b border-pink-900/30 transition-colors hover:bg-pink-900/10">
                        <td className="p-4 align-middle">Principios Cuánticos</td>
                        <td className="p-4 align-middle">Física Cuántica</td>
                        <td className="p-4 align-middle">72%</td>
                        <td className="p-4 align-middle">65%</td>
                        <td className="p-4 align-middle text-right">Alta</td>
                      </tr>
                      <tr className="border-b border-pink-900/30 transition-colors hover:bg-pink-900/10">
                        <td className="p-4 align-middle">Consideraciones Éticas</td>
                        <td className="p-4 align-middle">Ética en IA</td>
                        <td className="p-4 align-middle">95%</td>
                        <td className="p-4 align-middle">92%</td>
                        <td className="p-4 align-middle text-right">Baja</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg text-purple-300">Contenido Más Popular</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-purple-900/50 rounded-md bg-purple-950/10">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-purple-400" />
                        <span className="font-medium">Física de los Viajes Espaciales</span>
                      </div>
                      <Badge variant="outline" className="border-purple-900/50 text-purple-300 bg-purple-950/20">
                        Video
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Exploración Espacial</span>
                      <span>45:30 min</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Vistas</span>
                        <span>128</span>
                      </div>
                      <Progress
                        value={95}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-300"
                      />
                    </div>
                  </div>

                  <div className="p-4 border border-purple-900/50 rounded-md bg-purple-950/10">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-400" />
                        <span className="font-medium">Introducción a la Ética en IA</span>
                      </div>
                      <Badge variant="outline" className="border-purple-900/50 text-purple-300 bg-purple-950/20">
                        Documento
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Ética en IA</span>
                      <span>15 páginas</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Vistas</span>
                        <span>112</span>
                      </div>
                      <Progress
                        value={85}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-300"
                      />
                    </div>
                  </div>

                  <div className="p-4 border border-purple-900/50 rounded-md bg-purple-950/10">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-purple-400" />
                        <span className="font-medium">Quiz: Conceptos Básicos de Navegación</span>
                      </div>
                      <Badge variant="outline" className="border-purple-900/50 text-purple-300 bg-purple-950/20">
                        Quiz
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Exploración Espacial</span>
                      <span>10 preguntas</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Intentos</span>
                        <span>98</span>
                      </div>
                      <Progress
                        value={75}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-300"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-300">Tipos de Contenido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-cyan-950/50 border border-cyan-900/50 flex items-center justify-center text-cyan-300 text-xl font-bold">
                        45%
                      </div>
                      <div>
                        <div className="font-medium">Videos</div>
                        <div className="text-sm text-muted-foreground">Contenido más consumido</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-purple-950/50 border border-purple-900/50 flex items-center justify-center text-purple-300 text-xl font-bold">
                        30%
                      </div>
                      <div>
                        <div className="font-medium">Documentos</div>
                        <div className="text-sm text-muted-foreground">Lecturas y guías</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-pink-950/50 border border-pink-900/50 flex items-center justify-center text-pink-300 text-xl font-bold">
                        25%
                      </div>
                      <div>
                        <div className="font-medium">Quizzes</div>
                        <div className="text-sm text-muted-foreground">Evaluaciones y tests</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-pink-900/50 bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-pink-300">Tiempo de Visualización</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                          <span className="text-sm">Mañana (6:00 - 12:00)</span>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <Progress
                        value={25}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-pink-500 to-pink-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                          <span className="text-sm">Tarde (12:00 - 18:00)</span>
                        </div>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <Progress
                        value={35}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-cyan-500 to-cyan-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="text-sm">Noche (18:00 - 00:00)</span>
                        </div>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                      <Progress
                        value={40}
                        className="h-2 bg-black/50"
                        indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-300"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </>
  )
}
