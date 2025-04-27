"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Save, Rocket } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { CoverImageUpload } from "@/components/cover-image-upload"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function CreateQlusterPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [qluster, setQluster] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "draft",
    visibility: "private",
    color: "purple",
    autoEnroll: false,
    sequentialProgress: true,
    certificate: true,
  })

  // Función para guardar el Qluster
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para guardar el Qluster en la base de datos
      console.log("Guardando Qluster:", {
        ...qluster,
        coverImage,
      })

      // Simulamos éxito
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Qluster creado",
        description: "El Qluster ha sido creado exitosamente",
      })

      // Resetear formulario
      setQluster({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "draft",
        visibility: "private",
        color: "purple",
        autoEnroll: false,
        sequentialProgress: true,
        certificate: true,
      })
      setCoverImage(null)
      setActiveTab("basic")
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al crear el Qluster",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <DashboardHeader
        heading="Crear Qluster"
        text="Diseña un bloque temático que agrupe Qerniums con objetivos comunes"
      >
        <Button
          className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Guardando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Guardar Qluster
            </>
          )}
        </Button>
      </DashboardHeader>
      <DashboardShell>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-black/20 border border-purple-900/50">
            <TabsTrigger
              value="basic"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              Información Básica
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              Configuración
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              Apariencia
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <CardHeader>
                <CardTitle className="text-xl text-purple-300">Información del Qluster</CardTitle>
                <CardDescription>Define los detalles básicos de este bloque temático</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Qluster</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Fundamentos de Física Cuántica"
                    value={qluster.title}
                    onChange={(e) => setQluster({ ...qluster, title: e.target.value })}
                    className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe brevemente el contenido y objetivos de este qluster..."
                    value={qluster.description}
                    onChange={(e) => setQluster({ ...qluster, description: e.target.value })}
                    className="min-h-[100px] border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Fecha de Inicio</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="start-date"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal border-purple-900/50 bg-black/50 focus-visible:ring-purple-500",
                            !qluster.startDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {qluster.startDate ? (
                            format(new Date(qluster.startDate), "PPP")
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-black/90 border-purple-900/50">
                        <Calendar
                          mode="single"
                          selected={qluster.startDate ? new Date(qluster.startDate) : undefined}
                          onSelect={(date) => setQluster({ ...qluster, startDate: date ? date.toISOString() : "" })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">Fecha de Finalización</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="end-date"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal border-purple-900/50 bg-black/50 focus-visible:ring-purple-500",
                            !qluster.endDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {qluster.endDate ? format(new Date(qluster.endDate), "PPP") : <span>Seleccionar fecha</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-black/90 border-purple-900/50">
                        <Calendar
                          mode="single"
                          selected={qluster.endDate ? new Date(qluster.endDate) : undefined}
                          onSelect={(date) => setQluster({ ...qluster, endDate: date ? date.toISOString() : "" })}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select value={qluster.status} onValueChange={(value) => setQluster({ ...qluster, status: value })}>
                    <SelectTrigger id="status" className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
                      <SelectValue placeholder="Selecciona un estado" />
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
                  <Select
                    value={qluster.visibility}
                    onValueChange={(value) => setQluster({ ...qluster, visibility: value })}
                  >
                    <SelectTrigger id="visibility" className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
                      <SelectValue placeholder="Selecciona la visibilidad" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-purple-900/50">
                      <SelectItem value="private">Privado</SelectItem>
                      <SelectItem value="public">Público</SelectItem>
                      <SelectItem value="restricted">Restringido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <CardHeader>
                <CardTitle className="text-xl text-purple-300">Configuración del Qluster</CardTitle>
                <CardDescription>Define cómo funcionará este qluster</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-enroll">Inscripción Automática</Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que los estudiantes se inscriban automáticamente sin aprobación
                    </p>
                  </div>
                  <Switch
                    id="auto-enroll"
                    checked={qluster.autoEnroll}
                    onCheckedChange={(checked) => setQluster({ ...qluster, autoEnroll: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sequential">Progreso Secuencial</Label>
                    <p className="text-sm text-muted-foreground">
                      Los estudiantes deben completar los qerniums en orden secuencial
                    </p>
                  </div>
                  <Switch
                    id="sequential"
                    checked={qluster.sequentialProgress}
                    onCheckedChange={(checked) => setQluster({ ...qluster, sequentialProgress: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="certificate">Certificado de Finalización</Label>
                    <p className="text-sm text-muted-foreground">
                      Emitir un certificado cuando el estudiante complete el qluster
                    </p>
                  </div>
                  <Switch
                    id="certificate"
                    checked={qluster.certificate}
                    onCheckedChange={(checked) => setQluster({ ...qluster, certificate: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <CardHeader>
                <CardTitle className="text-xl text-purple-300">Apariencia del Qluster</CardTitle>
                <CardDescription>Personaliza cómo se verá este qluster</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="color">Color Temático</Label>
                  <Select value={qluster.color} onValueChange={(value) => setQluster({ ...qluster, color: value })}>
                    <SelectTrigger id="color" className="border-purple-900/50 bg-black/50 focus:ring-purple-500">
                      <SelectValue placeholder="Selecciona un color" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-purple-900/50">
                      <SelectItem value="purple">Púrpura</SelectItem>
                      <SelectItem value="cyan">Cian</SelectItem>
                      <SelectItem value="pink">Rosa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Imagen de Portada</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Sube una imagen que represente el contenido de este qluster
                  </p>
                  <CoverImageUpload initialImage={coverImage} onImageChange={setCoverImage} aspectRatio="landscape" />
                </div>

                <div className="p-4 border border-purple-900/30 rounded-md bg-purple-950/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket className="h-4 w-4 text-purple-300" />
                    <span className="text-sm font-medium">Vista previa</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    La apariencia del qluster se aplicará en todas las vistas donde aparezca, incluyendo el dashboard y
                    las páginas de detalle.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </>
  )
}
