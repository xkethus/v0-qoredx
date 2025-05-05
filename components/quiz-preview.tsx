"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { QuizQuestion } from "./quiz-question-editor"

interface QuizPreviewProps {
  questions: QuizQuestion[]
}

export function QuizPreview({ questions }: QuizPreviewProps) {
  const [responses, setResponses] = useState<Record<string, any>>({})

  return (
    <Card className="border-amber-900/50 bg-black/50 backdrop-blur-sm">
      <CardContent className="p-4 space-y-6">
        <h2 className="text-lg font-medium text-amber-300">Vista Previa del Quiz</h2>

        <div className="space-y-8">
          {questions.map((question, qIndex) => (
            <div key={question.id} className="space-y-4">
              <div className="flex items-start gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-900/50 text-amber-300 text-xs">
                  {qIndex + 1}
                </span>
                <div className="space-y-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-base font-medium">{question.text || "Pregunta sin título"}</h3>
                    <Badge variant="outline" className="border-amber-900/50 text-amber-300">
                      {question.points} {question.points === 1 ? "punto" : "puntos"}
                    </Badge>
                  </div>

                  {/* Pregunta de opción única */}
                  {question.type === "single" && (
                    <RadioGroup
                      value={responses[question.id] || ""}
                      onValueChange={(value) => setResponses({ ...responses, [question.id]: value })}
                    >
                      {question.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2 py-1">
                          <RadioGroupItem
                            value={option.id}
                            id={`q${question.id}-opt${option.id}`}
                            className="border-amber-500 text-amber-500"
                          />
                          <Label htmlFor={`q${question.id}-opt${option.id}`}>{option.text || "Opción sin texto"}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}

                  {/* Pregunta de opción múltiple */}
                  {question.type === "multiple" && (
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`q${question.id}-opt${option.id}`}
                            checked={(responses[question.id] || []).includes(option.id)}
                            onCheckedChange={(checked) => {
                              const currentSelections = [...(responses[question.id] || [])]
                              if (checked) {
                                setResponses({
                                  ...responses,
                                  [question.id]: [...currentSelections, option.id],
                                })
                              } else {
                                setResponses({
                                  ...responses,
                                  [question.id]: currentSelections.filter((id) => id !== option.id),
                                })
                              }
                            }}
                            className="border-amber-500 text-amber-500"
                          />
                          <Label htmlFor={`q${question.id}-opt${option.id}`}>{option.text || "Opción sin texto"}</Label>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pregunta de respuesta corta */}
                  {question.type === "short" && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Respuesta corta"
                        value={responses[question.id] || ""}
                        onChange={(e) => setResponses({ ...responses, [question.id]: e.target.value })}
                        className="min-h-[80px] border-amber-900/50 bg-black/50 focus-visible:ring-amber-500"
                      />
                    </div>
                  )}

                  {/* Pregunta de respuesta larga */}
                  {question.type === "long" && (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Respuesta larga"
                        value={responses[question.id] || ""}
                        onChange={(e) => setResponses({ ...responses, [question.id]: e.target.value })}
                        className="min-h-[150px] border-amber-900/50 bg-black/50 focus-visible:ring-amber-500"
                      />
                    </div>
                  )}

                  {/* Pregunta con multimedia */}
                  {question.type === "media" && question.mediaType !== "none" && (
                    <div className="space-y-2">
                      <div className="p-4 border border-dashed border-amber-900/50 rounded-md text-center">
                        <p className="text-sm text-muted-foreground">
                          {question.mediaType === "image" && "Imagen"}
                          {question.mediaType === "video" && "Video"}
                          {question.mediaType === "audio" && "Audio"}
                        </p>
                      </div>
                      <Textarea
                        placeholder="Respuesta basada en multimedia"
                        value={responses[question.id] || ""}
                        onChange={(e) => setResponses({ ...responses, [question.id]: e.target.value })}
                        className="min-h-[100px] border-amber-900/50 bg-black/50 focus-visible:ring-amber-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
