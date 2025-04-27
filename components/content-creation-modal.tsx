"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileText, Video, BookOpen, LinkIcon, ChevronRight, ChevronLeft, Upload } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { SimpleTextEditor } from "@/components/simple-text-editor"

interface ContentCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (content: any) => void
}

export function ContentCreationModal({ isOpen, onClose, onSave }: ContentCreationModalProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [contentType, setContentType] = useState<"text" | "video" | "document" | "link">("text")
  const [videoSource, setVideoSource] = useState<"url" | "file">("url")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [useSimpleEditor, setUseSimpleEditor] = useState(false)
  const [quillLoadAttempts, setQuillLoadAttempts] = useState(0)
  const quillContainerRef = useRef<HTMLDivElement>(null)
  const quillInstanceRef = useRef<any>(null)
  const [content, setContent] = useState({
    title: "",
    description: "",
    text: "",
    url: "",
    file: null as File | null,
    videoFile: null as File | null,
  })

  // Reiniciar el estado cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setContentType("text")
      setVideoSource("url")
      setUseSimpleEditor(false)
      setQuillLoadAttempts(0)
      setContent({
        title: "",
        description: "",
        text: "",
        url: "",
        file: null,
        videoFile: null,
      })
    }
  }, [isOpen])

  // Función para manejar la selección de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: "document" | "video") => {
    if (e.target.files && e.target.files[0]) {
      if (fileType === "document") {
        setContent({ ...content, file: e.target.files[0] })
      } else {
        setContent({ ...content, videoFile: e.target.files[0] })
      }
    }
  }

  // Función para guardar el contenido
  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Aquí iría la lógica para guardar el contenido en la base de datos
      console.log("Guardando contenido:", {
        ...content,
        type: contentType,
        videoSource: contentType === "video" ? videoSource : undefined,
      })

      // Simulamos éxito
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Contenido creado",
        description: "El contenido ha sido creado exitosamente",
      })

      // Notificar al componente padre
      onSave({
        ...content,
        type: contentType,
        videoSource: contentType === "video" ? videoSource : undefined,
      })

      // Cerrar el modal
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al crear el contenido",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Inicializar Quill cuando estamos en el paso 3 y el tipo de contenido es texto
  useEffect(() => {
    if (step === 3 && contentType === "text" && !useSimpleEditor && quillContainerRef.current) {
      // Limpiar cualquier instancia previa
      if (quillInstanceRef.current) {
        try {
          quillInstanceRef.current = null
        } catch (e) {
          console.error("Error al limpiar Quill:", e)
        }
      }

      // Función para cargar e inicializar Quill
      const loadQuill = async () => {
        try {
          // Verificar si Quill ya está cargado
          if (typeof window !== "undefined" && !(window as any).Quill) {
            // Cargar CSS de Quill
            const linkElement = document.createElement("link")
            linkElement.rel = "stylesheet"
            linkElement.href = "https://cdn.quilljs.com/1.3.6/quill.snow.css"
            document.head.appendChild(linkElement)

            // Cargar script de Quill
            await new Promise<void>((resolve, reject) => {
              const script = document.createElement("script")
              script.src = "https://cdn.quilljs.com/1.3.6/quill.min.js"
              script.async = true
              script.onload = () => resolve()
              script.onerror = () => reject(new Error("Failed to load Quill.js"))
              document.body.appendChild(script)
            })
          }

          // Esperar un momento para asegurarnos de que Quill esté disponible
          await new Promise((resolve) => setTimeout(resolve, 100))

          // Verificar que Quill está disponible
          const Quill = (window as any).Quill
          if (!Quill) {
            throw new Error("Quill is not available")
          }

          // Crear un ID único para el contenedor
          const editorId = `quill-editor-${Date.now()}`

          // Crear el contenedor del editor
          if (quillContainerRef.current) {
            quillContainerRef.current.innerHTML = `<div id="${editorId}"></div>`

            // Configuración para el editor
            const editorConfig = {
              modules: {
                toolbar: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  [{ font: [] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["blockquote", "code-block"],
                  ["link", "image"],
                  ["clean"],
                ],
              },
              placeholder: "Comienza a escribir tu contenido aquí...",
              theme: "snow",
            }

            // Crear nueva instancia de Quill
            const editorElement = document.getElementById(editorId)
            if (!editorElement) {
              throw new Error("Editor element not found")
            }

            quillInstanceRef.current = new Quill(editorElement, editorConfig)

            // Establecer el contenido inicial
            if (content.text) {
              quillInstanceRef.current.root.innerHTML = content.text
            }

            // Manejar cambios
            quillInstanceRef.current.on("text-change", () => {
              const html = quillInstanceRef.current.root.innerHTML
              setContent((prev) => ({ ...prev, text: html }))
            })

            // Aplicar estilos personalizados
            const editorContent = editorElement.querySelector(".ql-editor")
            if (editorContent) {
              editorContent.classList.add("spacepunk-editor")
            }

            console.log("Quill initialized successfully")
            return true
          }
          return false
        } catch (error) {
          console.error("Error initializing Quill:", error)
          setQuillLoadAttempts((prev) => prev + 1)

          // Si fallamos demasiadas veces, usar el editor simple
          if (quillLoadAttempts >= 2) {
            console.log("Falling back to simple editor")
            setUseSimpleEditor(true)
          }
          return false
        }
      }

      // Intentar cargar Quill
      loadQuill()

      // Limpiar al desmontar
      return () => {
        if (quillInstanceRef.current) {
          try {
            // Limpiar eventos y referencias
            quillInstanceRef.current = null
          } catch (e) {
            console.error("Error cleaning up Quill:", e)
          }
        }
      }
    }
  }, [step, contentType, useSimpleEditor, quillLoadAttempts, content.text])

  // Validación para habilitar el botón siguiente
  const canProceedToStep2 = content.title.trim() !== "" && content.description.trim() !== ""
  const canProceedToStep3 = contentType !== ""
  const canSubmit =
    (contentType === "text" && content.text.trim() !== "") ||
    (contentType === "video" &&
      ((videoSource === "url" && content.url.trim() !== "") || (videoSource === "file" && content.videoFile))) ||
    (contentType === "document" && content.file) ||
    (contentType === "link" && content.url.trim() !== "")

  // Renderizar el contenido según el paso actual
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título del Contenido</Label>
              <Input
                id="title"
                placeholder="Ej: Introducción a la Física Cuántica"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                className="border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describe brevemente este contenido..."
                value={content.description}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                className="min-h-[100px] border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <Label className="block">Selecciona el tipo de contenido</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className={`h-auto flex flex-col items-center justify-center p-6 border-2 ${
                  contentType === "text"
                    ? "border-purple-500 bg-purple-900/20 text-purple-300"
                    : "border-purple-900/50 hover:border-purple-500/50 hover:bg-purple-900/10"
                }`}
                onClick={() => setContentType("text")}
              >
                <FileText className="h-12 w-12 mb-2" />
                <span className="text-lg">Texto</span>
                <span className="text-xs text-muted-foreground mt-1">Contenido de texto enriquecido con formato</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className={`h-auto flex flex-col items-center justify-center p-6 border-2 ${
                  contentType === "video"
                    ? "border-cyan-500 bg-cyan-900/20 text-cyan-300"
                    : "border-purple-900/50 hover:border-cyan-500/50 hover:bg-cyan-900/10"
                }`}
                onClick={() => setContentType("video")}
              >
                <Video className="h-12 w-12 mb-2" />
                <span className="text-lg">Video</span>
                <span className="text-xs text-muted-foreground mt-1">Videos de YouTube, Vimeo o archivos propios</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className={`h-auto flex flex-col items-center justify-center p-6 border-2 ${
                  contentType === "document"
                    ? "border-amber-500 bg-amber-900/20 text-amber-300"
                    : "border-purple-900/50 hover:border-amber-500/50 hover:bg-amber-900/10"
                }`}
                onClick={() => setContentType("document")}
              >
                <BookOpen className="h-12 w-12 mb-2" />
                <span className="text-lg">Documento</span>
                <span className="text-xs text-muted-foreground mt-1">Archivos PDF, DOCX, PPTX y otros documentos</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className={`h-auto flex flex-col items-center justify-center p-6 border-2 ${
                  contentType === "link"
                    ? "border-pink-500 bg-pink-900/20 text-pink-300"
                    : "border-purple-900/50 hover:border-pink-500/50 hover:bg-pink-900/10"
                }`}
                onClick={() => setContentType("link")}
              >
                <LinkIcon className="h-12 w-12 mb-2" />
                <span className="text-lg">Enlace</span>
                <span className="text-xs text-muted-foreground mt-1">Enlaces a recursos externos relevantes</span>
              </Button>
            </div>
          </div>
        )

      case 3:
        switch (contentType) {
          case "text":
            return (
              <div className="space-y-2">
                <Label htmlFor="text-content">Contenido de Texto</Label>

                {useSimpleEditor ? (
                  // Editor simple como fallback
                  <SimpleTextEditor
                    value={content.text}
                    onChange={(value) => setContent({ ...content, text: value })}
                    placeholder="Comienza a escribir tu contenido aquí..."
                  />
                ) : (
                  // Contenedor para Quill
                  <div className="quill-container">
                    <div ref={quillContainerRef} className="min-h-[300px] border border-purple-900/50 rounded-md" />

                    {/* Estilos para Quill */}
                    <style jsx global>{`
                      .quill-container .ql-toolbar {
                        background-color: rgba(0, 0, 0, 0.5);
                        border-color: rgba(139, 92, 246, 0.5);
                        border-top-left-radius: 0.375rem;
                        border-top-right-radius: 0.375rem;
                      }
                      
                      .quill-container .ql-container {
                        border-color: rgba(139, 92, 246, 0.5);
                        background-color: rgba(0, 0, 0, 0.3);
                        border-bottom-left-radius: 0.375rem;
                        border-bottom-right-radius: 0.375rem;
                        min-height: 300px;
                      }
                      
                      .quill-container .ql-editor {
                        min-height: 300px;
                        color: #e2e8f0;
                      }
                      
                      .quill-container .spacepunk-editor {
                        font-family: 'Space Mono', monospace;
                        color: #d8b4fe;
                      }
                      
                      .quill-container .ql-snow .ql-stroke {
                        stroke: #a78bfa;
                      }
                      
                      .quill-container .ql-snow .ql-fill {
                        fill: #a78bfa;
                      }
                      
                      .quill-container .ql-snow .ql-picker {
                        color: #a78bfa;
                      }
                      
                      .quill-container .ql-snow .ql-picker-options {
                        background-color: rgba(0, 0, 0, 0.9);
                        border-color: rgba(139, 92, 246, 0.5);
                      }
                      
                      .quill-container .ql-snow .ql-tooltip {
                        background-color: rgba(0, 0, 0, 0.8);
                        border-color: rgba(139, 92, 246, 0.5);
                        color: #e2e8f0;
                      }
                      
                      .quill-container .ql-snow .ql-tooltip input[type=text] {
                        background-color: rgba(0, 0, 0, 0.5);
                        border-color: rgba(139, 92, 246, 0.5);
                        color: #e2e8f0;
                      }
                    `}</style>

                    {/* Botón para cambiar al editor simple */}
                    <div className="mt-2 flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setUseSimpleEditor(true)}
                        className="text-xs text-purple-300 hover:text-purple-200"
                      >
                        Cambiar a editor simple
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )

          case "video":
            return (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Fuente del Video</Label>
                  <RadioGroup
                    value={videoSource}
                    onValueChange={(value) => setVideoSource(value as "url" | "file")}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="url" id="video-url-option" />
                      <Label htmlFor="video-url-option" className="cursor-pointer">
                        URL
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="file" id="video-file-option" />
                      <Label htmlFor="video-file-option" className="cursor-pointer">
                        Archivo
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {videoSource === "url" ? (
                  <div className="space-y-2">
                    <Label htmlFor="video-url">URL del Video</Label>
                    <Input
                      id="video-url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={content.url}
                      onChange={(e) => setContent({ ...content, url: e.target.value })}
                      className="border-cyan-900/50 bg-black/50 focus-visible:ring-cyan-500"
                    />
                    <p className="text-xs text-muted-foreground">
                      Soportamos videos de YouTube, Vimeo y otros servicios populares.
                    </p>

                    {/* Vista previa del video */}
                    {content.url && (
                      <div className="mt-4 border border-cyan-900/50 rounded-md p-4 bg-black/30">
                        <h3 className="text-sm font-medium text-cyan-300 mb-2">Vista Previa</h3>
                        <div className="aspect-video bg-black/50 rounded-md flex items-center justify-center">
                          <Video className="h-12 w-12 text-cyan-500 opacity-50" />
                        </div>
                        <p className="text-xs text-center mt-2 text-muted-foreground">
                          La vista previa estará disponible después de guardar
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="video-file">Archivo de Video</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="video-file"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-cyan-900/50 bg-black/30 hover:bg-cyan-900/10"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-cyan-300" />
                          <p className="mb-2 text-sm text-gray-300">
                            <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                          </p>
                          <p className="text-xs text-gray-400">MP4, WEBM, MOV (MAX. 100MB)</p>
                        </div>
                        <input
                          id="video-file"
                          type="file"
                          className="hidden"
                          accept="video/mp4,video/webm,video/mov"
                          onChange={(e) => handleFileChange(e, "video")}
                        />
                      </label>
                    </div>
                    {content.videoFile && (
                      <div className="mt-4 p-3 border border-cyan-900/50 rounded-md bg-cyan-900/10">
                        <div className="flex items-center">
                          <div className="bg-cyan-900/20 p-2 rounded-md mr-3">
                            <Video className="h-6 w-6 text-cyan-300" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{content.videoFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {Math.round(content.videoFile.size / 1024 / 1024)} MB
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-cyan-300 hover:text-cyan-200 hover:bg-cyan-950/30"
                            onClick={() => setContent({ ...content, videoFile: null })}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )

          case "document":
            return (
              <div className="space-y-2">
                <Label htmlFor="document-file">Archivo de Documento</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="document-file"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-amber-900/50 bg-black/30 hover:bg-amber-900/10"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-amber-300" />
                      <p className="mb-2 text-sm text-gray-300">
                        <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                      </p>
                      <p className="text-xs text-gray-400">PDF, DOCX, PPTX (MAX. 10MB)</p>
                    </div>
                    <input
                      id="document-file"
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx,.pptx"
                      onChange={(e) => handleFileChange(e, "document")}
                    />
                  </label>
                </div>
                {content.file && (
                  <div className="mt-4 p-3 border border-amber-900/50 rounded-md bg-amber-900/10">
                    <div className="flex items-center">
                      <div className="bg-amber-900/20 p-2 rounded-md mr-3">
                        <BookOpen className="h-6 w-6 text-amber-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{content.file.name}</p>
                        <p className="text-xs text-muted-foreground">{Math.round(content.file.size / 1024)} KB</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-amber-300 hover:text-amber-200 hover:bg-amber-950/30"
                        onClick={() => setContent({ ...content, file: null })}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )

          case "link":
            return (
              <div className="space-y-2">
                <Label htmlFor="link-url">URL del Enlace</Label>
                <Input
                  id="link-url"
                  placeholder="https://..."
                  value={content.url}
                  onChange={(e) => setContent({ ...content, url: e.target.value })}
                  className="border-pink-900/50 bg-black/50 focus-visible:ring-pink-500"
                />
                <p className="text-xs text-muted-foreground">
                  Añade un enlace a un recurso externo relevante para el aprendizaje.
                </p>

                {/* Información adicional del enlace */}
                {content.url && (
                  <div className="mt-4 border border-pink-900/50 rounded-md p-4 bg-black/30">
                    <div className="flex items-center">
                      <div className="bg-pink-900/20 p-2 rounded-md mr-3">
                        <LinkIcon className="h-5 w-5 text-pink-300" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">{content.url}</p>
                        <p className="text-xs text-muted-foreground">Enlace externo</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )

          default:
            return null
        }

      default:
        return null
    }
  }

  // Renderizar indicador de pasos
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400"
            }`}
          >
            1
          </div>
          <div className={`h-1 w-12 ${step > 1 ? "bg-purple-600" : "bg-gray-700"}`}></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400"
            }`}
          >
            2
          </div>
          <div className={`h-1 w-12 ${step > 2 ? "bg-purple-600" : "bg-gray-700"}`}></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-400"
            }`}
          >
            3
          </div>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-black/90 border-purple-900/50">
        <DialogHeader>
          <DialogTitle className="text-xl text-purple-300">
            {step === 1 && "Información Básica"}
            {step === 2 && "Tipo de Contenido"}
            {step === 3 && "Detalles del Contenido"}
          </DialogTitle>
        </DialogHeader>

        {renderStepIndicator()}
        {renderStepContent()}

        <DialogFooter className="flex justify-between">
          <div>
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="border-purple-900/50 hover:bg-purple-900/20"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
              </Button>
            )}
          </div>
          <div>
            {step < 3 ? (
              <Button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={(step === 1 && !canProceedToStep2) || (step === 2 && !canProceedToStep3)}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
              >
                Siguiente <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Guardando...
                  </>
                ) : (
                  "Guardar Contenido"
                )}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
