"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ArrowLeft, Download, CheckCircle, XCircle, Clock, User, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function QerniumResponsesPage() {
  const params = useParams()
  const qerniumId = params.id as string
  const [activeTab, setActiveTab] = useState("all")

  // Mock data para el Qernium
  const qernium = {
    id: qerniumId,
    title: "Identificar principios de la mecánica cuántica",
    description: "Reconocer y enumerar los principios fundamentales que rigen la mecánica cuántica.",
    bloomLevel: "remember",
    actionVerb: "Identificar",
    status: "published",
    estimatedTime: 30,
    color: "purple",
  }

  // Mock data para las respuestas
  const responses = [
    {
      id: "1",
      userId: "101",
      userName: "Ana García",
      userAvatar: "/abstract-geometric-gold.png",
      userRole: "qorexplorer",
      score: 85,
      completedAt: "2023-04-15T14:30:00Z",
      status: "completed",
    },
    {
      id: "2",
      userId: "102",
      userName: "Carlos Rodríguez",
      userAvatar: "/abstract-color-run.png",
      userRole: "qorexplorer",
      score: 92,
      completedAt: "2023-04-15T15:45:00Z",
      status: "completed",
    },
    {
      id: "3",
      userId: "103",
      userName: "Elena Martínez",
      userAvatar: "/abstract-em.png",
      userRole: "qorexplorer",
      score: 78,
      completedAt: "2023-04-16T09:20:00Z",
      status: "completed",
    },
    {
      id: "4",
      userId: "104",
      userName: "David López",
      userAvatar: "/abstract-dl.png",
      userRole: "qorexplorer",
      score: 0,
      completedAt: null,
      status: "in-progress",
    },
    {
      id: "5",
      userId: "105",
      userName: "Laura Sánchez",
      userAvatar: "/abstract-ls.png",
      userRole: "qorexplorer",
      score: 0,
      completedAt: null,
      status: "not-started",
    },
  ]

  // Filtrar respuestas según la pestaña activa
  const filteredResponses = activeTab === "all" ? responses : responses.filter((r) => r.status === activeTab)

  // Función para formatear fecha
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No completado"
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <DashboardHeader
        heading={`Respuestas: ${qernium.title}`}
        text="Visualiza y analiza las respuestas de los estudiantes"
      >
        <div className="flex gap-2">
          <Link href={`/dashboard/qerniums/${qerniumId}`}>
            <Button variant="outline" className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Qernium
            </Button>
          </Link>
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
            <Download className="mr-2 h-4 w-4" /> Exportar Datos
          </Button>
        </div>
      </DashboardHeader>
      <DashboardShell>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-black/20 border border-purple-900/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Todas
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Completadas
              </TabsTrigger>
              <TabsTrigger
                value="in-progress"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                En Progreso
              </TabsTrigger>
              <TabsTrigger
                value="not-started"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                No Iniciadas
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar estudiante..."
                  className="w-full sm:w-[250px] pl-8 border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
              >
                <Filter className="mr-2 h-4 w-4" /> Filtrar
              </Button>
            </div>
          </div>

          <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-purple-300">Resumen de Respuestas</CardTitle>
              <CardDescription>{filteredResponses.length} respuestas encontradas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border border-purple-900/50 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-purple-900/20">
                        <th className="text-left p-3 font-medium">Estudiante</th>
                        <th className="text-left p-3 font-medium">Estado</th>
                        <th className="text-left p-3 font-medium">Puntuación</th>
                        <th className="text-left p-3 font-medium">Completado</th>
                        <th className="text-left p-3 font-medium">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-900/30">
                      {filteredResponses.map((response) => (
                        <tr key={response.id} className="hover:bg-purple-900/10">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={response.userAvatar || "/placeholder.svg"} alt={response.userName} />
                                <AvatarFallback className="bg-purple-900/50 text-purple-300">
                                  {response.userName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{response.userName}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                  <User className="h-3 w-3" /> QoreXplorer
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            {response.status === "completed" && (
                              <Badge className="bg-green-900/30 text-green-300">Completado</Badge>
                            )}
                            {response.status === "in-progress" && (
                              <Badge className="bg-amber-900/30 text-amber-300">En Progreso</Badge>
                            )}
                            {response.status === "not-started" && (
                              <Badge className="bg-gray-900/30 text-gray-300">No Iniciado</Badge>
                            )}
                          </td>
                          <td className="p-3">
                            {response.status === "completed" ? (
                              <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">{response.score}%</span>
                                  {response.score >= 70 ? (
                                    <CheckCircle className="h-4 w-4 text-green-400" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-red-400" />
                                  )}
                                </div>
                                <Progress
                                  value={response.score}
                                  className="h-1.5 bg-purple-900/20"
                                  indicatorClassName={response.score >= 70 ? "bg-green-500" : "bg-red-500"}
                                />
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Pendiente</span>
                              </div>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(response.completedAt)}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Link href={`/dashboard/qerniums/${qerniumId}/responses/${response.id}`}>
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                                Ver Detalles
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredResponses.length === 0 && (
                  <div className="p-8 text-center border border-dashed border-purple-900/50 rounded-md">
                    <p className="text-muted-foreground">No se encontraron respuestas para los filtros seleccionados</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </DashboardShell>
    </>
  )
}
