import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarDays,
  BookOpen,
  Users,
  FileText,
  Plus,
  BarChart,
  Clock,
  Atom,
  CuboidIcon as Cube,
  Network,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FloatingCalendar } from "@/components/floating-calendar"

export default function DashboardPage() {
  // Mock data for today's schedule
  const todaysSchedule = [
    {
      id: 1,
      title: "Quantum Physics 101",
      time: "09:00 - 10:30",
      location: "Virtual Room A",
      type: "class",
      color: "cyan",
    },
    {
      id: 2,
      title: "Space Exploration",
      time: "11:00 - 12:30",
      location: "Lab 42",
      type: "class",
      color: "purple",
    },
    {
      id: 3,
      title: "AI Ethics Quiz",
      time: "14:00 - 15:00",
      location: "Virtual Room C",
      type: "test",
      color: "pink",
    },
    {
      id: 4,
      title: "Office Hours",
      time: "16:00 - 17:30",
      location: "Office 101",
      type: "meeting",
      color: "amber",
    },
  ]

  // Mock data for upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: "Quantum Physics Assignment",
      dueDate: "Tomorrow",
      course: "Quantum Physics 101",
      submissions: 18,
      totalStudents: 24,
    },
    {
      id: 2,
      title: "Space Exploration Project",
      dueDate: "In 3 days",
      course: "Space Exploration",
      submissions: 12,
      totalStudents: 20,
    },
    {
      id: 3,
      title: "AI Ethics Final Paper",
      dueDate: "In 1 week",
      course: "AI Ethics",
      submissions: 5,
      totalStudents: 22,
    },
  ]

  return (
    <>
      <DashboardHeader heading="Dashboard" text="Bienvenido a Qoredx, tu plataforma de aprendizaje adaptativo">
        <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
          <Plus className="mr-2 h-4 w-4" /> Nuevo Qluster
        </Button>
      </DashboardHeader>
      <DashboardShell>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="today" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList className="bg-black/20 border border-purple-900/50">
                  <TabsTrigger
                    value="today"
                    className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
                  >
                    Hoy
                  </TabsTrigger>
                  <TabsTrigger
                    value="week"
                    className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
                  >
                    Esta Semana
                  </TabsTrigger>
                  <TabsTrigger
                    value="month"
                    className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
                  >
                    Este Mes
                  </TabsTrigger>
                </TabsList>
                <FloatingCalendar />
              </div>
              <TabsContent value="today" className="space-y-4">
                <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-purple-300 flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-purple-400" />
                      Horario de Hoy
                    </CardTitle>
                    <CardDescription>
                      {new Date().toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {todaysSchedule.map((item) => (
                        <div
                          key={item.id}
                          className={`flex justify-between items-center p-3 border-l-2 rounded bg-${item.color}-950/20 border-${item.color}-500`}
                        >
                          <div className="flex items-center space-x-3">
                            {item.type === "class" && <BookOpen className={`h-5 w-5 text-${item.color}-400`} />}
                            {item.type === "test" && <FileText className={`h-5 w-5 text-${item.color}-400`} />}
                            {item.type === "meeting" && <Users className={`h-5 w-5 text-${item.color}-400`} />}
                            <div>
                              <div className="font-medium">{item.title}</div>
                              <div className="text-sm text-muted-foreground">{item.location}</div>
                            </div>
                          </div>
                          <div className={`text-sm font-medium text-${item.color}-400`}>{item.time}</div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Añadir Evento
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-cyan-300 flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-cyan-400" />
                      Próximas Entregas
                    </CardTitle>
                    <CardDescription>Seguimiento de entregas y plazos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingDeadlines.map((item) => (
                        <div key={item.id} className="p-3 border border-cyan-900/30 rounded bg-cyan-950/10">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-cyan-400">{item.dueDate}</div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">{item.course}</div>
                          <div className="w-full bg-black/50 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-2 rounded-full"
                              style={{ width: `${(item.submissions / item.totalStudents) * 100}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-right mt-1 text-muted-foreground">
                            {item.submissions} de {item.totalStudents} entregas
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="week" className="space-y-4">
                <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-300">Horario Semanal</CardTitle>
                    <CardDescription>24 - 30 de Abril, 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarDays className="mx-auto h-12 w-12 text-purple-400 opacity-50 mb-2" />
                      <p>La vista semanal del calendario se mostrará aquí</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                      >
                        Ver Calendario Completo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="month" className="space-y-4">
                <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-300">Vista Mensual</CardTitle>
                    <CardDescription>Abril 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarDays className="mx-auto h-12 w-12 text-purple-400 opacity-50 mb-2" />
                      <p>La vista mensual del calendario se mostrará aquí</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                      >
                        Ver Calendario Completo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-4">
            <Card className="border-pink-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-pink-300 flex items-center">
                  <BarChart className="mr-2 h-5 w-5 text-pink-400" />
                  Estadísticas Rápidas
                </CardTitle>
                <CardDescription>Resumen de tu actividad docente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-pink-900/30 rounded bg-pink-950/10 flex flex-col items-center justify-center text-center">
                    <Cube className="h-8 w-8 text-pink-500 mb-2" />
                    <span className="text-xs text-muted-foreground">Qlusters Activos</span>
                    <span className="text-2xl font-bold text-white">5</span>
                  </div>
                  <div className="p-4 border border-pink-900/30 rounded bg-pink-950/10 flex flex-col items-center justify-center text-center">
                    <Atom className="h-8 w-8 text-pink-500 mb-2" />
                    <span className="text-xs text-muted-foreground">Qerniums</span>
                    <span className="text-2xl font-bold text-white">86</span>
                  </div>
                  <div className="p-4 border border-pink-900/30 rounded bg-pink-950/10 flex flex-col items-center justify-center text-center">
                    <Users className="h-8 w-8 text-pink-500 mb-2" />
                    <span className="text-xs text-muted-foreground">Estudiantes</span>
                    <span className="text-2xl font-bold text-white">128</span>
                  </div>
                  <div className="p-4 border border-pink-900/30 rounded bg-pink-950/10 flex flex-col items-center justify-center text-center">
                    <Network className="h-8 w-8 text-pink-500 mb-2" />
                    <span className="text-xs text-muted-foreground">QorePlex</span>
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-purple-300">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/dashboard/add-content">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Añadir Nuevo Contenido
                    </Button>
                  </Link>
                  <Link href="/dashboard/qerniums">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                    >
                      <Atom className="mr-2 h-4 w-4" /> Crear Nuevo Qernium
                    </Button>
                  </Link>
                  <Link href="/dashboard/classroom">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-pink-900/50 text-pink-300 hover:bg-pink-900/20"
                    >
                      <Users className="mr-2 h-4 w-4" /> Gestionar Estudiantes
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardShell>

      <FloatingCalendar />
    </>
  )
}
