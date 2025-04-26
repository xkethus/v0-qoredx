"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  // Función para generar los días del mes actual
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    // Ajuste para que la semana comience en lunes (0 = lunes, 6 = domingo)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

    const days = []

    // Días del mes anterior
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      const prevMonthDay = new Date(year, month, 0 - i)
      days.push({
        date: prevMonthDay,
        isCurrentMonth: false,
        events: getEventsForDate(prevMonthDay),
      })
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i)
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday: isToday(currentDate),
        events: getEventsForDate(currentDate),
      })
    }

    // Días del mes siguiente para completar la última semana
    const remainingDays = 42 - days.length // 6 semanas * 7 días = 42
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDay = new Date(year, month + 1, i)
      days.push({
        date: nextMonthDay,
        isCurrentMonth: false,
        events: getEventsForDate(nextMonthDay),
      })
    }

    return days
  }

  // Verificar si una fecha es hoy
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Mock de eventos para el calendario
  const mockEvents = [
    {
      id: 1,
      title: "Clase de Física Cuántica",
      date: new Date(2025, 3, 15, 10, 0),
      endDate: new Date(2025, 3, 15, 12, 0),
      type: "class",
      color: "purple",
    },
    {
      id: 2,
      title: "Evaluación de IA Ética",
      date: new Date(2025, 3, 18, 14, 0),
      endDate: new Date(2025, 3, 18, 16, 0),
      type: "test",
      color: "pink",
    },
    {
      id: 3,
      title: "Tutoría de Exploración Espacial",
      date: new Date(2025, 3, 20, 9, 0),
      endDate: new Date(2025, 3, 20, 10, 30),
      type: "meeting",
      color: "cyan",
    },
    {
      id: 4,
      title: "Entrega de Proyecto Final",
      date: new Date(2025, 3, 25, 23, 59),
      type: "deadline",
      color: "amber",
    },
  ]

  // Obtener eventos para una fecha específica
  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  // Cambiar al mes anterior
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Cambiar al mes siguiente
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Cambiar al mes actual
  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  // Días de la semana
  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

  // Obtener los días del mes actual
  const days = getDaysInMonth(currentMonth)

  return (
    <>
      <DashboardHeader heading="Calendario" text="Gestiona tus eventos, clases y plazos">
        <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
          <Plus className="mr-2 h-4 w-4" /> Nuevo Evento
        </Button>
      </DashboardHeader>
      <DashboardShell>
        <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-purple-300 flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5 text-purple-400" />
                Calendario
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                  onClick={goToToday}
                >
                  Hoy
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                  onClick={prevMonth}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                  onClick={nextMonth}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>
              {currentMonth.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week" | "day")} className="space-y-4">
              <TabsList className="bg-black/20 border border-purple-900/50">
                <TabsTrigger
                  value="month"
                  className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
                >
                  Mes
                </TabsTrigger>
                <TabsTrigger
                  value="week"
                  className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
                >
                  Semana
                </TabsTrigger>
                <TabsTrigger
                  value="day"
                  className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
                >
                  Día
                </TabsTrigger>
              </TabsList>

              <TabsContent value="month" className="space-y-4">
                <div className="grid grid-cols-7 gap-1">
                  {weekDays.map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className={`min-h-[100px] p-1 border border-purple-900/20 rounded-md ${
                        day.isCurrentMonth ? "bg-black/30" : "bg-black/10"
                      } ${day.isToday ? "ring-2 ring-purple-500" : ""}`}
                    >
                      <div
                        className={`text-right text-sm p-1 ${
                          day.isCurrentMonth ? "text-white" : "text-muted-foreground"
                        }`}
                      >
                        {day.date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {day.events.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate bg-${event.color}-950/30 border-l-2 border-${event.color}-500`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {day.events.length > 2 && (
                          <div className="text-xs text-center text-muted-foreground">+{day.events.length - 2} más</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="week" className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <p>Vista semanal en desarrollo</p>
                </div>
              </TabsContent>

              <TabsContent value="day" className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <p>Vista diaria en desarrollo</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-cyan-300">Próximos Eventos</CardTitle>
              <CardDescription>Eventos programados para los próximos días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-3 border border-${event.color}-900/30 rounded bg-${event.color}-950/10`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">{event.title}</div>
                      <Badge className={`bg-${event.color}-900/30 text-${event.color}-300`}>
                        {event.type === "class"
                          ? "Clase"
                          : event.type === "test"
                            ? "Evaluación"
                            : event.type === "meeting"
                              ? "Reunión"
                              : "Entrega"}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {event.date.toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}{" "}
                      • {event.date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                      {event.endDate &&
                        ` - ${event.endDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}`}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-pink-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-pink-300">Filtros</CardTitle>
              <CardDescription>Personaliza la visualización de tu calendario</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="filter-classes"
                    className="rounded border-purple-900/50 bg-black/50 text-purple-500 focus:ring-purple-500"
                    defaultChecked
                  />
                  <label htmlFor="filter-classes" className="text-sm">
                    Mostrar Clases
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="filter-tests"
                    className="rounded border-purple-900/50 bg-black/50 text-pink-500 focus:ring-pink-500"
                    defaultChecked
                  />
                  <label htmlFor="filter-tests" className="text-sm">
                    Mostrar Evaluaciones
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="filter-meetings"
                    className="rounded border-purple-900/50 bg-black/50 text-cyan-500 focus:ring-cyan-500"
                    defaultChecked
                  />
                  <label htmlFor="filter-meetings" className="text-sm">
                    Mostrar Reuniones
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="filter-deadlines"
                    className="rounded border-purple-900/50 bg-black/50 text-amber-500 focus:ring-amber-500"
                    defaultChecked
                  />
                  <label htmlFor="filter-deadlines" className="text-sm">
                    Mostrar Entregas
                  </label>
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full border-pink-900/50 text-pink-300 hover:bg-pink-900/20">
                    Aplicar Filtros
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </>
  )
}
