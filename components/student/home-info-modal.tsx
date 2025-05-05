"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, Rocket, BookOpen, Award } from "lucide-react"

interface HomeInfoModalProps {
  isOpen: boolean
  onClose: () => void
  homeData: any
}

export function HomeInfoModal({ isOpen, onClose, homeData }: HomeInfoModalProps) {
  const [activeTab, setActiveTab] = useState("tasks")

  // Datos de ejemplo para tareas pendientes
  const pendingTasks = [
    {
      id: "task1",
      title: "Completar Qernium: Introducción a la Física Cuántica",
      dueDate: "2023-06-15",
      priority: "alta",
      type: "qernium",
      status: "pending",
    },
    {
      id: "task2",
      title: "Revisar retroalimentación del Qluster de Programación",
      dueDate: "2023-06-18",
      priority: "media",
      type: "feedback",
      status: "pending",
    },
    {
      id: "task3",
      title: "Participar en la discusión: Futuro de la IA",
      dueDate: "2023-06-20",
      priority: "baja",
      type: "discussion",
      status: "pending",
    },
  ]

  // Datos de ejemplo para logros recientes
  const recentAchievements = [
    {
      id: "ach1",
      title: "Explorador Novato",
      description: "Completaste tu primer Qernium",
      date: "2023-06-01",
      icon: <Rocket className="h-5 w-5 text-cyan-400" />,
    },
    {
      id: "ach2",
      title: "Mente Curiosa",
      description: "Exploraste 5 Qlusters diferentes",
      date: "2023-06-05",
      icon: <BookOpen className="h-5 w-5 text-purple-400" />,
    },
    {
      id: "ach3",
      title: "Aprendiz Dedicado",
      description: "Completaste 10 Qerniums",
      date: "2023-06-10",
      icon: <Award className="h-5 w-5 text-amber-400" />,
    },
  ]

  // Datos de ejemplo para recomendaciones
  const recommendations = [
    {
      id: "rec1",
      title: "Física Avanzada",
      description: "Basado en tu interés en física cuántica",
      match: 95,
      type: "qluster",
    },
    {
      id: "rec2",
      title: "Introducción a la Programación Cuántica",
      description: "Complementa tus conocimientos de física y programación",
      match: 87,
      type: "qernium",
    },
    {
      id: "rec3",
      title: "Matemáticas para Computación Cuántica",
      description: "Fundamentos matemáticos necesarios",
      match: 82,
      type: "qluster",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black border border-amber-500/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-400 flex items-center gap-2">
            <Rocket className="h-6 w-6" />
            Centro de Navegación
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Tu punto central de referencia en el cosmos del aprendizaje
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 mb-4">
          <Button
            variant={activeTab === "tasks" ? "default" : "outline"}
            onClick={() => setActiveTab("tasks")}
            className={activeTab === "tasks" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-500/50 text-amber-400"}
          >
            Tareas Pendientes
          </Button>
          <Button
            variant={activeTab === "achievements" ? "default" : "outline"}
            onClick={() => setActiveTab("achievements")}
            className={
              activeTab === "achievements" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-500/50 text-amber-400"
            }
          >
            Logros Recientes
          </Button>
          <Button
            variant={activeTab === "recommendations" ? "default" : "outline"}
            onClick={() => setActiveTab("recommendations")}
            className={
              activeTab === "recommendations" ? "bg-amber-600 hover:bg-amber-700" : "border-amber-500/50 text-amber-400"
            }
          >
            Recomendaciones
          </Button>
        </div>

        {activeTab === "tasks" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Tareas Pendientes</h3>
            {pendingTasks.length > 0 ? (
              <div className="grid gap-4">
                {pendingTasks.map((task) => (
                  <Card key={task.id} className="bg-gray-900 border-amber-500/20">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-white text-lg">{task.title}</CardTitle>
                        <Badge
                          className={`${
                            task.priority === "alta"
                              ? "bg-red-900/30 text-red-300 border-red-500/50"
                              : task.priority === "media"
                                ? "bg-amber-900/30 text-amber-300 border-amber-500/50"
                                : "bg-blue-900/30 text-blue-300 border-blue-500/50"
                          }`}
                        >
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        Fecha límite: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                        Ir a la tarea
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-400" />
                <p>¡No tienes tareas pendientes!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Logros Recientes</h3>
            <div className="grid gap-4">
              {recentAchievements.map((achievement) => (
                <Card key={achievement.id} className="bg-gray-900 border-amber-500/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-amber-900/30 flex items-center justify-center">
                        {achievement.icon}
                      </div>
                      <div>
                        <CardTitle className="text-white">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <p className="text-xs text-gray-400">
                      Desbloqueado el {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "recommendations" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Recomendaciones Personalizadas</h3>
            <div className="grid gap-4">
              {recommendations.map((recommendation) => (
                <Card key={recommendation.id} className="bg-gray-900 border-amber-500/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-white">{recommendation.title}</CardTitle>
                      <Badge className={`bg-amber-900/30 text-amber-300 border-amber-500/50`}>
                        {recommendation.match}% Match
                      </Badge>
                    </div>
                    <CardDescription>{recommendation.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                      Explorar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
