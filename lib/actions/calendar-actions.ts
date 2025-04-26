"use server"

import { db } from "@/lib/db"
import { calendarEvents } from "@/lib/db/schema"
import { eq, and, gte, lte } from "drizzle-orm"
import { revalidatePath } from "next/cache"

// Tipo para los eventos del calendario
export type CalendarEvent = {
  id: string
  title: string
  description?: string
  startDate: Date
  endDate?: Date
  location?: string
  type: string
  qlusterId?: string
  classId?: string
  color: string
  creatorId: string
}

// Tipo para crear un nuevo evento
export type NewCalendarEvent = Omit<CalendarEvent, "id">

// Obtener todos los eventos del calendario para un usuario
export async function getCalendarEvents(userId: string) {
  try {
    if (!userId) {
      console.warn("getCalendarEvents: userId es undefined o vacío")
      return { success: false, error: "ID de usuario no válido" }
    }

    const events = await db.query.calendarEvents.findMany({
      where: eq(calendarEvents.creatorId, userId),
      orderBy: (calendarEvents, { asc }) => [asc(calendarEvents.startDate)],
    })
    return { success: true, data: events }
  } catch (error) {
    console.error("Error al obtener eventos del calendario:", error)
    return { success: false, error: "No se pudieron cargar los eventos del calendario" }
  }
}

// Obtener eventos del calendario para un rango de fechas
export async function getCalendarEventsForRange(userId: string, startDate: Date, endDate: Date) {
  try {
    if (!userId) {
      console.warn("getCalendarEventsForRange: userId es undefined o vacío")
      return { success: false, error: "ID de usuario no válido" }
    }

    if (!startDate || !endDate) {
      console.warn("getCalendarEventsForRange: fechas inválidas", { startDate, endDate })
      return { success: false, error: "Fechas no válidas" }
    }

    const events = await db.query.calendarEvents.findMany({
      where: and(
        eq(calendarEvents.creatorId, userId),
        gte(calendarEvents.startDate, startDate),
        lte(calendarEvents.startDate, endDate),
      ),
      orderBy: (calendarEvents, { asc }) => [asc(calendarEvents.startDate)],
    })
    return { success: true, data: events }
  } catch (error) {
    console.error("Error al obtener eventos del calendario para el rango:", error)
    return { success: false, error: "No se pudieron cargar los eventos del calendario" }
  }
}

// Crear un nuevo evento en el calendario
export async function createCalendarEvent(event: NewCalendarEvent) {
  try {
    await db.insert(calendarEvents).values(event)
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/calendar")
    return { success: true, message: "Evento creado correctamente" }
  } catch (error) {
    console.error("Error al crear evento del calendario:", error)
    return { success: false, error: "No se pudo crear el evento" }
  }
}

// Actualizar un evento existente
export async function updateCalendarEvent(id: string, event: Partial<CalendarEvent>) {
  try {
    await db.update(calendarEvents).set(event).where(eq(calendarEvents.id, id))
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/calendar")
    return { success: true, message: "Evento actualizado correctamente" }
  } catch (error) {
    console.error("Error al actualizar evento del calendario:", error)
    return { success: false, error: "No se pudo actualizar el evento" }
  }
}

// Eliminar un evento
export async function deleteCalendarEvent(id: string) {
  try {
    await db.delete(calendarEvents).where(eq(calendarEvents.id, id))
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/calendar")
    return { success: true, message: "Evento eliminado correctamente" }
  } catch (error) {
    console.error("Error al eliminar evento del calendario:", error)
    return { success: false, error: "No se pudo eliminar el evento" }
  }
}

// Obtener eventos relacionados con un qluster específico
export async function getQlusterEvents(qlusterId: string) {
  try {
    const events = await db.query.calendarEvents.findMany({
      where: eq(calendarEvents.qlusterId, qlusterId),
      orderBy: (calendarEvents, { asc }) => [asc(calendarEvents.startDate)],
    })
    return { success: true, data: events }
  } catch (error) {
    console.error("Error al obtener eventos del qluster:", error)
    return { success: false, error: "No se pudieron cargar los eventos del qluster" }
  }
}

// Obtener eventos relacionados con una clase específica
export async function getClassEvents(classId: string) {
  try {
    const events = await db.query.calendarEvents.findMany({
      where: eq(calendarEvents.classId, classId),
      orderBy: (calendarEvents, { asc }) => [asc(calendarEvents.startDate)],
    })
    return { success: true, data: events }
  } catch (error) {
    console.error("Error al obtener eventos de la clase:", error)
    return { success: false, error: "No se pudieron cargar los eventos de la clase" }
  }
}

// Función para generar eventos automáticos a partir de deadlines de qerniums
export async function generateQerniumEvents(qerniumId: string, qlusterId: string, userId: string) {
  try {
    // Aquí iría la lógica para obtener los deadlines de qerniums y crear eventos
    // Por ahora es un placeholder
    return { success: true, message: "Eventos generados correctamente" }
  } catch (error) {
    console.error("Error al generar eventos de qernium:", error)
    return { success: false, error: "No se pudieron generar los eventos" }
  }
}
