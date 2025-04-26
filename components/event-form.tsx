"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from "@/lib/actions/calendar-actions"
import { toast } from "@/components/ui/use-toast"

// Esquema de validación para el formulario
const eventFormSchema = z.object({
  title: z.string().min(2, {
    message: "El título debe tener al menos 2 caracteres.",
  }),
  description: z.string().optional(),
  startDate: z.date({
    required_error: "Se requiere una fecha de inicio.",
  }),
  endDate: z.date().optional(),
  location: z.string().optional(),
  type: z.string({
    required_error: "Por favor selecciona un tipo de evento.",
  }),
  color: z.string().default("purple"),
  qlusterId: z.string().optional(),
  classId: z.string().optional(),
})

type EventFormValues = z.infer<typeof eventFormSchema>

// Props para el componente
interface EventFormProps {
  userId: string
  event?: EventFormValues & { id?: string }
  onSuccess?: () => void
  onCancel?: () => void
  qlusters?: { id: string; title: string }[]
  classes?: { id: string; name: string }[]
}

// Añadir después de la declaración de EventFormProps
// Usuario mock para desarrollo (eliminar en producción)
const mockUserId = "1234-5678-9012-3456"

export function EventForm({ userId, event, onSuccess, onCancel, qlusters = [], classes = [] }: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Valores por defecto
  const defaultValues: Partial<EventFormValues> = {
    title: event?.title || "",
    description: event?.description || "",
    startDate: event?.startDate || new Date(),
    endDate: event?.endDate,
    location: event?.location || "",
    type: event?.type || "class",
    color: event?.color || "purple",
    qlusterId: event?.qlusterId,
    classId: event?.classId,
  }

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  })

  // Manejar el envío del formulario
  async function onSubmit(data: EventFormValues) {
    setIsSubmitting(true)
    try {
      // Usar mockUserId si userId no está disponible
      const userIdToUse = userId || mockUserId

      // Procesar valores especiales
      const processedData = {
        ...data,
        qlusterId: data.qlusterId === "none" ? undefined : data.qlusterId,
        classId: data.classId === "none" ? undefined : data.classId,
        creatorId: userIdToUse,
      }

      if (event?.id) {
        // Actualizar evento existente
        const result = await updateCalendarEvent(event.id, processedData)
        if (result.success) {
          toast({
            title: "Evento actualizado",
            description: "El evento ha sido actualizado correctamente.",
          })
          onSuccess?.()
        } else {
          toast({
            title: "Error",
            description: result.error || "No se pudo actualizar el evento.",
            variant: "destructive",
          })
        }
      } else {
        // Crear nuevo evento
        const result = await createCalendarEvent(processedData)
        if (result.success) {
          toast({
            title: "Evento creado",
            description: "El evento ha sido creado correctamente.",
          })
          onSuccess?.()
        } else {
          toast({
            title: "Error",
            description: result.error || "No se pudo crear el evento.",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error al guardar el evento:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al guardar el evento.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Manejar la eliminación del evento
  async function handleDelete() {
    if (!event?.id) return

    setIsDeleting(true)
    try {
      const result = await deleteCalendarEvent(event.id)
      if (result.success) {
        toast({
          title: "Evento eliminado",
          description: "El evento ha sido eliminado correctamente.",
        })
        onSuccess?.()
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo eliminar el evento.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error al eliminar el evento:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al eliminar el evento.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título del evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder="Descripción del evento" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de inicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                      >
                        {field.value ? format(field.value, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de fin (opcional)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                      >
                        {field.value ? format(field.value, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value || undefined}
                      onSelect={field.onChange}
                      initialFocus
                      disabled={(date) => date < form.getValues("startDate")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Input placeholder="Ubicación del evento" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de evento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="class">Clase</SelectItem>
                  <SelectItem value="test">Evaluación</SelectItem>
                  <SelectItem value="meeting">Reunión</SelectItem>
                  <SelectItem value="deadline">Entrega</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="purple">Morado</SelectItem>
                  <SelectItem value="cyan">Cian</SelectItem>
                  <SelectItem value="pink">Rosa</SelectItem>
                  <SelectItem value="amber">Ámbar</SelectItem>
                  <SelectItem value="green">Verde</SelectItem>
                  <SelectItem value="blue">Azul</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {qlusters.length > 0 && (
          <FormField
            control={form.control}
            name="qlusterId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qluster relacionado (opcional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || "none"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un qluster" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Ninguno</SelectItem>
                    {qlusters.map((qluster) => (
                      <SelectItem key={qluster.id} value={qluster.id}>
                        {qluster.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Asociar este evento a un Qluster específico</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {classes.length > 0 && (
          <FormField
            control={form.control}
            name="classId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clase relacionada (opcional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || "none"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una clase" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Ninguna</SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Asociar este evento a una clase específica</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-between pt-4">
          <div className="space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : event?.id ? "Actualizar" : "Crear"}
            </Button>
          </div>

          {event?.id && (
            <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
