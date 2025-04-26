"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ImageIcon, Trash2, Upload, Volume2, Plus, Minus } from "lucide-react"
import dynamic from "next/dynamic"

// Importar Quill dinámicamente para evitar errores de SSR
const QuillEditor = dynamic(() => import("@/components/quill-editor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[150px] border border-pink-900/50 bg-black/50 rounded-md p-4 flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-pink-500 border-t-transparent"></div>
    </div>
  ),
})

export type QuestionType = "multiple" | "single" | "short" | "long" | "media"
export type MediaType = "image" | "video" | "audio" | "none"

export interface QuestionOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuizQuestion {
  id: string
  type: QuestionType
  text: string
  richText: string
  options: QuestionOption[]
  correctAnswer?: string
  mediaType: MediaType
  mediaUrl?: string
  points: number
}

interface QuizQuestionEditorProps {
  question: QuizQuestion
  onUpdate: (updatedQuestion: QuizQuestion) => void
  onDelete: () => void
  index: number
}

export default function QuizQuestionEditor({ question, onUpdate, onDelete, index }: QuizQuestionEditorProps) {
  const [useRichText, setUseRichText] = useState(!!question.richText)

  const handleTypeChange = (type: QuestionType) => {
    const updatedQuestion = { ...question, type }

    // Reiniciar opciones si cambiamos a/desde preguntas de opción
    if ((type === "multiple" || type === "single") && question.type !== "multiple" && question.type !== "single") {
      updatedQuestion.options = [
        { id: crypto.randomUUID(), text: "", isCorrect: false },
        { id: crypto.randomUUID(), text: "", isCorrect: false },
      ]
    }

    onUpdate(updatedQuestion)
  }

  const handleMediaTypeChange = (mediaType: MediaType) => {
    onUpdate({ ...question, mediaType })
  }

  const handleTextChange = (text: string) => {
    onUpdate({ ...question, text })
  }

  const handleRichTextChange = (richText: string) => {
    onUpdate({ ...question, richText })
  }

  const handleOptionTextChange = (id: string, text: string) => {
    const updatedOptions = question.options.map((option) => (option.id === id ? { ...option, text } : option))
    onUpdate({ ...question, options: updatedOptions })
  }

  const handleOptionCorrectChange = (id: string, isCorrect: boolean) => {
    let updatedOptions = [...question.options]

    if (question.type === "single") {
      // Para opción única, solo una puede ser correcta
      updatedOptions = updatedOptions.map((option) =>
        option.id === id ? { ...option, isCorrect } : { ...option, isCorrect: false },
      )
    } else {
      // Para opción múltiple, varias pueden ser correctas
      updatedOptions = updatedOptions.map((option) => (option.id === id ? { ...option, isCorrect } : option))
    }

    onUpdate({ ...question, options: updatedOptions })
  }

  const addOption = () => {
    const newOption = { id: crypto.randomUUID(), text: "", isCorrect: false }
    onUpdate({ ...question, options: [...question.options, newOption] })
  }

  const removeOption = (id: string) => {
    if (question.options.length <= 2) return // Mantener al menos 2 opciones
    onUpdate({
      ...question,
      options: question.options.filter((option) => option.id !== id),
    })
  }

  const handlePointsChange = (points: number) => {
    onUpdate({ ...question, points })
  }

  return (
    <Card className="border-pink-900/50 bg-black/50 backdrop-blur-sm mb-4">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-900/50 text-pink-300 text-xs">
              {index + 1}
            </div>
            <h3 className="text-lg font-medium text-pink-300">Pregunta {index + 1}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-pink-300 hover:text-pink-200 hover:bg-pink-950/30"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Eliminar pregunta</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`question-type-${question.id}`}>Tipo de Pregunta</Label>
              <Select value={question.type} onValueChange={(value) => handleTypeChange(value as QuestionType)}>
                <SelectTrigger
                  id={`question-type-${question.id}`}
                  className="border-pink-900/50 bg-black/50 focus:ring-pink-500"
                >
                  <SelectValue placeholder="Selecciona el tipo de pregunta" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-pink-900/50">
                  <SelectItem value="single">Opción Única</SelectItem>
                  <SelectItem value="multiple">Opción Múltiple</SelectItem>
                  <SelectItem value="short">Respuesta Corta</SelectItem>
                  <SelectItem value="long">Respuesta Amplia</SelectItem>
                  <SelectItem value="media">Basada en Multimedia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`question-text-${question.id}`}>Texto de la Pregunta</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUseRichText(!useRichText)}
                  className="text-xs border-pink-900/50 text-pink-300 hover:bg-pink-900/20"
                >
                  {useRichText ? "Usar texto simple" : "Usar editor enriquecido"}
                </Button>
              </div>

              {useRichText ? (
                <QuillEditor value={question.richText} onChange={handleRichTextChange} theme="spacepunk" />
              ) : (
                <Textarea
                  id={`question-text-${question.id}`}
                  value={question.text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Escribe tu pregunta aquí..."
                  className="min-h-[100px] border-pink-900/50 bg-black/50 focus-visible:ring-pink-500"
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`question-points-${question.id}`}>Puntos</Label>
              <Input
                id={`question-points-${question.id}`}
                type="number"
                min="1"
                value={question.points}
                onChange={(e) => handlePointsChange(Number.parseInt(e.target.value) || 1)}
                className="border-pink-900/50 bg-black/50 focus-visible:ring-pink-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`question-media-${question.id}`}>Multimedia</Label>
              <Select value={question.mediaType} onValueChange={(value) => handleMediaTypeChange(value as MediaType)}>
                <SelectTrigger
                  id={`question-media-${question.id}`}
                  className="border-pink-900/50 bg-black/50 focus:ring-pink-500"
                >
                  <SelectValue placeholder="Añadir multimedia" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-pink-900/50">
                  <SelectItem value="none">Sin multimedia</SelectItem>
                  <SelectItem value="image">Imagen</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {question.mediaType !== "none" && (
              <div className="border-2 border-dashed border-pink-900/50 rounded-md p-4 text-center">
                {question.mediaType === "image" && <ImageIcon className="h-8 w-8 text-pink-500 mx-auto mb-2" />}
                {question.mediaType === "video" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-pink-500 mx-auto mb-2"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
                {question.mediaType === "audio" && <Volume2 className="h-8 w-8 text-pink-500 mx-auto mb-2" />}

                <p className="text-sm text-muted-foreground mb-2">
                  {question.mediaUrl ? "Reemplazar archivo" : `Subir ${question.mediaType}`}
                </p>
                <Button variant="outline" size="sm" className="border-pink-900/50 text-pink-300 hover:bg-pink-900/20">
                  <Upload className="h-4 w-4 mr-2" />
                  Seleccionar Archivo
                </Button>
                {question.mediaUrl && (
                  <div className="mt-2 text-xs text-pink-300">Archivo actual: {question.mediaUrl.split("/").pop()}</div>
                )}
              </div>
            )}

            {/* Opciones para preguntas de opción única o múltiple */}
            {(question.type === "single" || question.type === "multiple") && (
              <div className="space-y-3">
                <Label>Opciones de Respuesta</Label>
                {question.type === "single" ? (
                  <RadioGroup value={question.options.find((o) => o.isCorrect)?.id || ""}>
                    {question.options.map((option, optIndex) => (
                      <div key={option.id} className="flex items-start space-x-2">
                        <div className="pt-2">
                          <RadioGroupItem
                            value={option.id}
                            id={`option-${option.id}`}
                            checked={option.isCorrect}
                            onClick={() => handleOptionCorrectChange(option.id, !option.isCorrect)}
                            className="border-pink-500 text-pink-500"
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            value={option.text}
                            onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                            placeholder={`Opción ${optIndex + 1}`}
                            className="border-pink-900/50 bg-black/50 focus-visible:ring-pink-500"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(option.id)}
                          disabled={question.options.length <= 2}
                          className="h-8 w-8 text-pink-300 hover:text-pink-200 hover:bg-pink-950/30"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  question.options.map((option, optIndex) => (
                    <div key={option.id} className="flex items-start space-x-2">
                      <div className="pt-2">
                        <Checkbox
                          id={`option-${option.id}`}
                          checked={option.isCorrect}
                          onCheckedChange={(checked) => handleOptionCorrectChange(option.id, checked === true)}
                          className="border-pink-500 text-pink-500"
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          value={option.text}
                          onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                          placeholder={`Opción ${optIndex + 1}`}
                          className="border-pink-900/50 bg-black/50 focus-visible:ring-pink-500"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(option.id)}
                        disabled={question.options.length <= 2}
                        className="h-8 w-8 text-pink-300 hover:text-pink-200 hover:bg-pink-950/30"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  className="w-full border-dashed border-2 border-pink-900/50 bg-transparent text-pink-300 hover:bg-pink-950/20"
                >
                  <Plus className="h-4 w-4 mr-2" /> Añadir Opción
                </Button>
              </div>
            )}

            {/* Campo para respuesta corta */}
            {question.type === "short" && (
              <div className="space-y-2">
                <Label>Vista Previa de Respuesta Corta</Label>
                <Input
                  disabled
                  placeholder="Los estudiantes escribirán una respuesta corta aquí"
                  className="border-pink-900/50 bg-black/70 focus-visible:ring-pink-500"
                />
                <p className="text-xs text-muted-foreground">
                  Las respuestas cortas son ideales para definiciones, términos o respuestas breves.
                </p>
              </div>
            )}

            {/* Campo para respuesta amplia */}
            {question.type === "long" && (
              <div className="space-y-2">
                <Label>Vista Previa de Respuesta Amplia</Label>
                <Textarea
                  disabled
                  placeholder="Los estudiantes escribirán una respuesta amplia aquí"
                  className="min-h-[100px] border-pink-900/50 bg-black/70 focus-visible:ring-pink-500"
                />
                <p className="text-xs text-muted-foreground">
                  Las respuestas amplias son ideales para ensayos, explicaciones o análisis detallados.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
