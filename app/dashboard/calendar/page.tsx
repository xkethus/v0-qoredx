"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Plus, Calendar } from "lucide-react"

export default function CalendarPage() {
  // En una aplicación real, obtendríamos el ID del usuario de la sesión
  const userId = "user-1"
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
      <DashboardHeader heading="Calendario" text="Gestiona tus eventos y actividades">
        <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
          <Plus className="mr-2 h-4 w-4" /> Nuevo Evento
        </Button>
      </DashboardHeader>
      <DashboardShell>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-center">
            <Calendar className="mx-auto h-12 w-12 text-purple-400 opacity-50 mb-4" />
            <h2 className="text-xl font-medium text-purple-300 mb-2">Calendario Interactivo</h2>
            <p className="text-muted-foreground mb-4">
              Utiliza el botón de calendario en la barra superior para abrir el calendario completo
            </p>
            <Button
              variant="outline"
              className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
              onClick={() => {
                // En una aplicación real, abriríamos el modal aquí
                // Por ahora, esto es solo un placeholder
                alert("Esta funcionalidad se implementará con JavaScript del lado del cliente")
              }}
            >
              <Calendar className="mr-2 h-4 w-4" /> Abrir Calendario
            </Button>
          </div>
        </div>
      </DashboardShell>
    </>
  )
}
