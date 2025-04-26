"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { EventForm } from "./event-form"
import { getCalendarEventsForRange, type CalendarEvent } from "@/lib/actions/calendar-actions"
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns"
import { es } from "date-fns/locale"

interface CalendarModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

export function CalendarModal({ isOpen, onClose, userId }: CalendarModalProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [showEventForm, setShowEventForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Usuario mock para desarrollo (eliminar en producción)
  const mockUserId = "1234-5678-9012-3456"

  // Cargar eventos al cambiar de mes
  useEffect(() => {
    async function loadEvents() {
      setLoading(true)
      try {
        const start = startOfMonth(currentMonth)
        const end = endOfMonth(currentMonth)
        // Usar mockUserId si userId no está disponible
        const userIdToUse = userId || mockUserId

        console.log("Cargando eventos para usuario:", userIdToUse)
        const result = await getCalendarEventsForRange(userIdToUse, start, end)

        if (result.success) {
          setEvents(result.data)
        } else {
          console.error("Error al cargar eventos:", result.error)
          setEvents([])
        }
      } catch (error) {
        console.error("Error al cargar eventos:", error)
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    if (isOpen) {
      loadEvents()
    }
  }, [currentMonth, userId, isOpen])

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

  // Obtener eventos para una fecha específica
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDate)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  // Cambiar al mes anterior
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Cambiar al mes siguiente
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Cambiar al mes actual
  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  // Abrir formulario para crear un nuevo evento
  const handleAddEvent = (date?: Date) => {
    setSelectedEvent(null)
    setSelectedDate(date || new Date())
    setShowEventForm(true)
  }

  // Abrir formulario para editar un evento existente
  const handleEditEvent = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setSelectedDate(null)
    setShowEventForm(true)
  }

  // Cerrar formulario de evento
  const handleCloseEventForm = () => {
    setShowEventForm(false)
    setSelectedEvent(null)
    setSelectedDate(null)
  }

  // Manejar el éxito al guardar un evento
  const handleEventSuccess = () => {
    setShowEventForm(false)
    setSelectedEvent(null)
    setSelectedDate(null)

    // Recargar eventos
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    // Usar mockUserId si userId no está disponible
    const userIdToUse = userId || mockUserId

    getCalendarEventsForRange(userIdToUse, start, end).then((result) => {
      if (result.success) {
        setEvents(result.data)
      }
    })
  }

  // Días de la semana
  const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

  // Obtener los días del mes actual
  const days = getDaysInMonth(currentMonth)

  // Mock de qlusters y clases para el formulario
  const mockQlusters = [
    { id: "1", title: "Física Cuántica 101" },
    { id: "2", title: "Exploración Espacial" },
    { id: "3", title: "Ética en IA" },
  ]

  const mockClasses = [
    { id: "1", name: "Grupo A" },
    { id: "2", name: "Grupo B" },
    { id: "3", name: "Grupo C" },
  ]

  // Si se está mostrando el formulario de evento
  if (showEventForm) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-md w-[90vw] bg-black/90 border-purple-900/50 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-xl text-purple-300">
              {selectedEvent ? "Editar Evento" : "Nuevo Evento"}
            </DialogTitle>
          </DialogHeader>

          <EventForm
            userId={userId}
            event={selectedEvent || (selectedDate ? { startDate: selectedDate } : undefined)}
            onSuccess={handleEventSuccess}
            onCancel={handleCloseEventForm}
            qlusters={mockQlusters}
            classes={mockClasses}
          />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto bg-black/90 border-purple-900/50 backdrop-blur-sm">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl text-purple-300">Calendario</DialogTitle>
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
              <Button
                variant="outline"
                size="sm"
                className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
                onClick={() => handleAddEvent()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Evento
              </Button>
            </div>
          </div>
          <div className="text-lg font-medium text-purple-300">{format(currentMonth, "MMMM yyyy", { locale: es })}</div>
        </DialogHeader>

        <div className="grid grid-cols-7 gap-1 mt-4">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-[100px] p-1 border rounded-md relative ${
                day.isCurrentMonth ? "border-purple-900/20 bg-black/30" : "border-purple-900/10 bg-black/10"
              } ${day.isToday ? "ring-2 ring-purple-500" : ""}`}
              onClick={() => handleAddEvent(day.date)}
            >
              <div className={`text-right text-sm p-1 ${day.isCurrentMonth ? "text-white" : "text-muted-foreground"}`}>
                {day.date.getDate()}
              </div>

              {/* Indicador de eventos (aro o contorno) */}
              {day.events.length > 0 && (
                <div
                  className="absolute top-1 left-1 w-2 h-2 rounded-full bg-purple-500"
                  style={{ opacity: Math.min(0.3 + day.events.length * 0.15, 1) }}
                ></div>
              )}

              <div className="space-y-1">
                {day.events.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded truncate cursor-pointer ${
                      event.type === "class"
                        ? "bg-cyan-950/30 border-l-2 border-cyan-500"
                        : event.type === "test"
                          ? "bg-pink-950/30 border-l-2 border-pink-500"
                          : event.type === "meeting"
                            ? "bg-purple-950/30 border-l-2 border-purple-500"
                            : "bg-amber-950/30 border-l-2 border-amber-500"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditEvent(event)
                    }}
                  >
                    {event.title}
                  </div>
                ))}
                {day.events.length > 3 && (
                  <div className="text-xs text-center text-muted-foreground">+{day.events.length - 3} más</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <h3 className="text-lg font-medium text-purple-300">Leyenda</h3>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-cyan-950/30 text-cyan-300 border border-cyan-500">Clase</Badge>
            <Badge className="bg-pink-950/30 text-pink-300 border border-pink-500">Evaluación</Badge>
            <Badge className="bg-purple-950/30 text-purple-300 border border-purple-500">Reunión</Badge>
            <Badge className="bg-amber-950/30 text-amber-300 border border-amber-500">Entrega</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
