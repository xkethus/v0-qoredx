"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Rocket,
  Atom,
  Layers,
  Calendar,
  Award,
  Star,
  BookOpen,
  Sparkles,
  MessageSquare,
  ChevronUp,
  ChevronDown,
  User,
  Settings,
  BarChart2,
  Navigation,
  Compass,
  Zap,
  Target,
} from "lucide-react"
import { getStudentProgress } from "@/lib/mock-data"

export function IntegratedHUD({ visible, onClose }) {
  const studentProgress = getStudentProgress()
  const [chatOpen, setChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  // Datos simulados para el próximo Qernium recomendado
  const nextQernium = {
    id: "qrn-123",
    title: "Fundamentos de Física Cuántica",
    description: "Aprende los conceptos básicos de la física cuántica y sus aplicaciones.",
    estimatedTime: "25 min",
    difficulty: "Intermedio",
    skills: ["Física", "Matemáticas", "Pensamiento Crítico"],
    image: "/abstract-em.png",
  }

  // Datos simulados para logros en progreso
  const achievementsInProgress = [
    {
      id: "ach-1",
      title: "Explorador Cuántico",
      description: "Completa 5 Qerniums de física cuántica",
      progress: 60,
      icon: "Atom",
    },
    {
      id: "ach-2",
      title: "Comunicador Estelar",
      description: "Participa en 10 discusiones de grupo",
      progress: 30,
      icon: "MessageSquare",
    },
  ]

  // Datos simulados para actividad reciente
  const recentActivity = [
    {
      id: "act-1",
      type: "qernium_completed",
      title: "Completaste 'Introducción a la Relatividad'",
      time: "Hace 2 horas",
      points: 150,
    },
    {
      id: "act-2",
      type: "skill_improved",
      title: "Habilidad de Física mejorada a Nivel 3",
      time: "Hace 5 horas",
      points: 75,
    },
    {
      id: "act-3",
      type: "achievement_unlocked",
      title: "Logro desbloqueado: 'Primer Contacto'",
      time: "Hace 1 día",
      points: 200,
    },
  ]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-x-0 bottom-0 z-50 p-4 pointer-events-none"
        >
          <div className="relative max-w-7xl mx-auto pointer-events-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg blur opacity-30"></div>
            <div className="relative bg-black/90 backdrop-blur-md border border-cyan-900/50 rounded-lg overflow-hidden">
              {/* Barra superior con pestañas */}
              <div className="border-b border-cyan-900/30 p-2 flex items-center justify-between">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="bg-black/50 border border-cyan-900/30">
                    <TabsTrigger
                      value="dashboard"
                      className="data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-300"
                    >
                      <Rocket className="h-4 w-4 mr-2" />
                      Dashboard
                    </TabsTrigger>
                    <TabsTrigger
                      value="navigation"
                      className="data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-300"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Navegación
                    </TabsTrigger>
                    <TabsTrigger
                      value="skills"
                      className="data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-300"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Habilidades
                    </TabsTrigger>
                    <TabsTrigger
                      value="achievements"
                      className="data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-300"
                    >
                      <Award className="h-4 w-4 mr-2" />
                      Logros
                    </TabsTrigger>
                    <TabsTrigger
                      value="stats"
                      className="data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-300"
                    >
                      <BarChart2 className="h-4 w-4 mr-2" />
                      Estadísticas
                    </TabsTrigger>
                  </TabsList>

                  {/* Contenido principal - IMPORTANTE: Todos los TabsContent deben estar dentro del componente Tabs */}
                  <div className="p-4 max-h-[70vh] overflow-y-auto">
                    <TabsContent value="dashboard" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Columna izquierda - Perfil y progreso */}
                        <div className="space-y-4">
                          <Card className="bg-black/50 border-cyan-900/30">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-cyan-300 text-lg flex items-center">
                                <User className="h-5 w-5 mr-2" />
                                Perfil de Explorador
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                                  QX
                                </div>
                                <div>
                                  <h3 className="font-bold text-white">QoreXplorer</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className="bg-cyan-900/30 text-cyan-300 border border-cyan-500/50">
                                      Nivel 3
                                    </Badge>
                                    <span className="text-xs text-gray-400">1250 XP</span>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-400">Progreso de Nivel</span>
                                    <span className="text-xs font-medium text-cyan-300">1250/2000 XP</span>
                                  </div>
                                  <Progress
                                    value={62.5}
                                    className="h-2 bg-cyan-950/30"
                                    indicatorClassName="bg-gradient-to-r from-cyan-500 to-pink-500"
                                  />
                                </div>

                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-400">Qerniums Completados</span>
                                    <span className="text-xs font-medium text-cyan-300">
                                      {studentProgress.completedQerniums}/{studentProgress.totalQerniums}
                                    </span>
                                  </div>
                                  <Progress
                                    value={(studentProgress.completedQerniums / studentProgress.totalQerniums) * 100}
                                    className="h-2 bg-cyan-950/30"
                                    indicatorClassName="bg-gradient-to-r from-cyan-500 to-pink-500"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-black/50 border-cyan-900/30">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-cyan-300 text-lg flex items-center">
                                <Target className="h-5 w-5 mr-2" />
                                Logros en Progreso
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              {achievementsInProgress.map((achievement) => (
                                <div
                                  key={achievement.id}
                                  className="p-2 rounded-md bg-cyan-900/10 border border-cyan-900/30"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-cyan-900/30 flex items-center justify-center text-cyan-300">
                                      {achievement.icon === "Atom" ? (
                                        <Atom className="h-4 w-4" />
                                      ) : achievement.icon === "MessageSquare" ? (
                                        <MessageSquare className="h-4 w-4" />
                                      ) : (
                                        <Award className="h-4 w-4" />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-xs font-medium text-cyan-300">{achievement.title}</p>
                                      <p className="text-[10px] text-gray-400">{achievement.description}</p>
                                      <div className="mt-1 w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                                        <div
                                          className="h-full rounded-full bg-cyan-500"
                                          style={{ width: `${achievement.progress}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                    <span className="text-xs font-medium text-cyan-300">{achievement.progress}%</span>
                                  </div>
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                        </div>

                        {/* Columna central - Qernium recomendado y actividad reciente */}
                        <div className="space-y-4">
                          <Card className="bg-black/50 border-cyan-900/30">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-cyan-300 text-lg flex items-center">
                                <Compass className="h-5 w-5 mr-2" />
                                Próximo Qernium Recomendado
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="relative rounded-md overflow-hidden mb-3">
                                <img
                                  src={nextQernium.image || "/placeholder.svg"}
                                  alt={nextQernium.title}
                                  className="w-full h-32 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-2">
                                  <h3 className="font-bold text-white text-sm">{nextQernium.title}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className="bg-pink-900/30 text-pink-300 border border-pink-500/50">
                                      {nextQernium.difficulty}
                                    </Badge>
                                    <span className="text-xs text-gray-300">{nextQernium.estimatedTime}</span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-xs text-gray-300 mb-3">{nextQernium.description}</p>

                              <div className="flex flex-wrap gap-1 mb-3">
                                {nextQernium.skills.map((skill, index) => (
                                  <Badge key={index} className="bg-cyan-900/20 text-cyan-300 border border-cyan-900/30">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>

                              <Button className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white">
                                Iniciar Qernium
                              </Button>
                            </CardContent>
                          </Card>

                          <Card className="bg-black/50 border-cyan-900/30">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-cyan-300 text-lg flex items-center">
                                <BarChart2 className="h-5 w-5 mr-2" />
                                Actividad Reciente
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              {recentActivity.map((activity) => (
                                <div
                                  key={activity.id}
                                  className="p-2 rounded-md bg-gray-900/30 border border-gray-800 flex items-center justify-between"
                                >
                                  <div>
                                    <p className="text-xs font-medium text-white">{activity.title}</p>
                                    <p className="text-[10px] text-gray-400">{activity.time}</p>
                                  </div>
                                  <Badge
                                    className={`${
                                      activity.type === "qernium_completed"
                                        ? "bg-green-900/30 text-green-300 border-green-900/30"
                                        : activity.type === "skill_improved"
                                          ? "bg-blue-900/30 text-blue-300 border-blue-900/30"
                                          : "bg-yellow-900/30 text-yellow-300 border-yellow-900/30"
                                    }`}
                                  >
                                    +{activity.points} XP
                                  </Badge>
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                        </div>

                        {/* Columna derecha - Habilidades y estadísticas */}
                        <div className="space-y-4">
                          <Card className="bg-black/50 border-cyan-900/30">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-cyan-300 text-lg flex items-center">
                                <Zap className="h-5 w-5 mr-2" />
                                Habilidades Principales
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              {studentProgress.skills.map((skill, index) => (
                                <div key={index} className="px-2">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-400">{skill.name}</span>
                                    <span className="text-xs font-medium" style={{ color: skill.color }}>
                                      Nivel {skill.level}
                                    </span>
                                  </div>
                                  <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                                    <div
                                      className="h-full rounded-full"
                                      style={{
                                        width: `${(skill.level / 5) * 100}%`,
                                        backgroundColor: skill.color,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-gray-400 hover:bg-gray-900/20 mt-2"
                              >
                                <Sparkles className="mr-2 h-3 w-3" />
                                Ver todas las habilidades
                              </Button>
                            </CardContent>
                          </Card>

                          <Card className="bg-black/50 border-cyan-900/30">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-cyan-300 text-lg flex items-center">
                                <Settings className="h-5 w-5 mr-2" />
                                Configuración Rápida
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" size="sm" className="border-cyan-900/50 text-cyan-300">
                                  <Rocket className="mr-2 h-4 w-4" />
                                  Modo Exploración
                                </Button>
                                <Button variant="outline" size="sm" className="border-cyan-900/50 text-cyan-300">
                                  <BookOpen className="mr-2 h-4 w-4" />
                                  Biblioteca
                                </Button>
                                <Button variant="outline" size="sm" className="border-cyan-900/50 text-cyan-300">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Calendario
                                </Button>
                                <Button variant="outline" size="sm" className="border-cyan-900/50 text-cyan-300">
                                  <Settings className="mr-2 h-4 w-4" />
                                  Preferencias
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="navigation" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-black/50 border-cyan-900/30">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-cyan-300 text-lg flex items-center">
                              <Navigation className="h-5 w-5 mr-2" />
                              Controles de Navegación
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <label className="text-xs text-gray-300 block mb-1">Horizontal</label>
                                <input
                                  type="range"
                                  min="-50"
                                  max="50"
                                  defaultValue="0"
                                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-300 block mb-1">Vertical</label>
                                <input
                                  type="range"
                                  min="-30"
                                  max="30"
                                  defaultValue="0"
                                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-300 block mb-1">Rotación</label>
                                <input
                                  type="range"
                                  min="-180"
                                  max="180"
                                  defaultValue="0"
                                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-300 block mb-1">Zoom</label>
                                <input
                                  type="range"
                                  min="5"
                                  max="50"
                                  defaultValue="15"
                                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                                />
                              </div>
                              <Button className="w-full bg-cyan-900/50 hover:bg-cyan-800/50 text-cyan-300 border border-cyan-700/50">
                                Volver al Centro
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-black/50 border-cyan-900/30">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-cyan-300 text-lg flex items-center">
                              <Layers className="h-5 w-5 mr-2" />
                              Qlusters Disponibles
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {[
                                { id: 1, name: "Física Cuántica", progress: 60, color: "#22d3ee" },
                                { id: 2, name: "Exploración Espacial", progress: 25, color: "#ec4899" },
                                { id: 3, name: "Inteligencia Artificial", progress: 40, color: "#a855f7" },
                                { id: 4, name: "Biología Molecular", progress: 10, color: "#10b981" },
                              ].map((qluster) => (
                                <div
                                  key={qluster.id}
                                  className="p-2 rounded-md bg-gray-900/30 border border-gray-800 flex items-center justify-between"
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className="w-3 h-3 rounded-full"
                                      style={{ backgroundColor: qluster.color }}
                                    ></div>
                                    <span className="text-sm text-white">{qluster.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-20 h-1.5 bg-gray-900 rounded-full overflow-hidden">
                                      <div
                                        className="h-full rounded-full"
                                        style={{
                                          width: `${qluster.progress}%`,
                                          backgroundColor: qluster.color,
                                        }}
                                      ></div>
                                    </div>
                                    <span className="text-xs text-gray-400">{qluster.progress}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="skills" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { category: "Ciencias", color: "#22d3ee" },
                          { category: "Tecnología", color: "#ec4899" },
                          { category: "Ingeniería", color: "#a855f7" },
                        ].map((category) => (
                          <Card key={category.category} className="bg-black/50 border-cyan-900/30">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg flex items-center" style={{ color: category.color }}>
                                <Zap className="h-5 w-5 mr-2" />
                                {category.category}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              {[1, 2, 3].map((skill) => (
                                <div key={skill} className="px-2">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-400">
                                      {category.category} {skill}
                                    </span>
                                    <span className="text-xs font-medium" style={{ color: category.color }}>
                                      Nivel {Math.floor(Math.random() * 5) + 1}
                                    </span>
                                  </div>
                                  <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                                    <div
                                      className="h-full rounded-full"
                                      style={{
                                        width: `${Math.floor(Math.random() * 100)}%`,
                                        backgroundColor: category.color,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="achievements" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["Recientes", "En Progreso", "Bloqueados"].map((category) => (
                          <Card key={category} className="bg-black/50 border-cyan-900/30">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-cyan-300 text-lg flex items-center">
                                <Award className="h-5 w-5 mr-2" />
                                {category}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              {[1, 2, 3].map((achievement) => (
                                <div
                                  key={achievement}
                                  className={`p-2 rounded-md ${
                                    category === "Recientes"
                                      ? "bg-yellow-900/10 border border-yellow-900/30"
                                      : category === "En Progreso"
                                        ? "bg-cyan-900/10 border border-cyan-900/30"
                                        : "bg-gray-900/30 border border-gray-800"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                        category === "Recientes"
                                          ? "bg-yellow-900/30 text-yellow-300"
                                          : category === "En Progreso"
                                            ? "bg-cyan-900/30 text-cyan-300"
                                            : "bg-gray-800 text-gray-400"
                                      }`}
                                    >
                                      <Star className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <p
                                        className={`text-xs font-medium ${
                                          category === "Recientes"
                                            ? "text-yellow-300"
                                            : category === "En Progreso"
                                              ? "text-cyan-300"
                                              : "text-gray-400"
                                        }`}
                                      >
                                        Logro {category} {achievement}
                                      </p>
                                      <p className="text-[10px] text-gray-400">
                                        Descripción del logro {category.toLowerCase()} {achievement}
                                      </p>
                                      {category === "En Progreso" && (
                                        <div className="mt-1 w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                                          <div
                                            className="h-full rounded-full bg-cyan-500"
                                            style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                                          ></div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="stats" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-black/50 border-cyan-900/30">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-cyan-300 text-lg flex items-center">
                              <BarChart2 className="h-5 w-5 mr-2" />
                              Estadísticas de Aprendizaje
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {[
                                { name: "Tiempo Total de Estudio", value: "42h 15m", icon: "clock" },
                                { name: "Qerniums Completados", value: "24/120", icon: "atom" },
                                { name: "Precisión en Evaluaciones", value: "87%", icon: "target" },
                                { name: "Racha Actual", value: "5 días", icon: "flame" },
                              ].map((stat, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 rounded-md bg-gray-900/30 border border-gray-800"
                                >
                                  <span className="text-sm text-white">{stat.name}</span>
                                  <span className="text-sm font-medium text-cyan-300">{stat.value}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-black/50 border-cyan-900/30">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-cyan-300 text-lg flex items-center">
                              <Award className="h-5 w-5 mr-2" />
                              Logros y Recompensas
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-2 rounded-md bg-yellow-900/10 border border-yellow-900/30">
                                <span className="text-sm text-white">Logros Desbloqueados</span>
                                <span className="text-sm font-medium text-yellow-300">12/50</span>
                              </div>
                              <div className="flex items-center justify-between p-2 rounded-md bg-pink-900/10 border border-pink-900/30">
                                <span className="text-sm text-white">Insignias Obtenidas</span>
                                <span className="text-sm font-medium text-pink-300">5</span>
                              </div>
                              <div className="flex items-center justify-between p-2 rounded-md bg-purple-900/10 border border-purple-900/30">
                                <span className="text-sm text-white">Puntos de Recompensa</span>
                                <span className="text-sm font-medium text-purple-300">1,250</span>
                              </div>
                              <div className="flex items-center justify-between p-2 rounded-md bg-cyan-900/10 border border-cyan-900/30">
                                <span className="text-sm text-white">Nivel de Explorador</span>
                                <span className="text-sm font-medium text-cyan-300">3</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </div>

              {/* Chat desplegable */}
              <div className="border-t border-cyan-900/30">
                <div
                  className="p-2 flex items-center justify-between cursor-pointer hover:bg-cyan-900/20"
                  onClick={() => setChatOpen(!chatOpen)}
                >
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 text-cyan-300 mr-2" />
                    <span className="text-sm text-cyan-300">Asistente QoreX</span>
                  </div>
                  {chatOpen ? (
                    <ChevronDown className="h-4 w-4 text-cyan-300" />
                  ) : (
                    <ChevronUp className="h-4 w-4 text-cyan-300" />
                  )}
                </div>

                <AnimatePresence>
                  {chatOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 border-t border-cyan-900/30">
                        <div className="h-32 overflow-y-auto mb-3 space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center text-cyan-300 flex-shrink-0">
                              <MessageSquare className="h-3 w-3" />
                            </div>
                            <div className="bg-cyan-900/20 rounded-lg p-2 text-xs text-gray-300">
                              Hola, QoreXplorer. ¿En qué puedo ayudarte hoy con tu exploración espacial?
                            </div>
                          </div>
                          <div className="flex items-start gap-2 justify-end">
                            <div className="bg-gray-800 rounded-lg p-2 text-xs text-gray-300">
                              ¿Qué Qernium me recomiendas para mejorar mi habilidad de Física?
                            </div>
                            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white flex-shrink-0">
                              <User className="h-3 w-3" />
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 rounded-full bg-cyan-900/50 flex items-center justify-center text-cyan-300 flex-shrink-0">
                              <MessageSquare className="h-3 w-3" />
                            </div>
                            <div className="bg-cyan-900/20 rounded-lg p-2 text-xs text-gray-300">
                              Basado en tu perfil, te recomendaría "Fundamentos de Física Cuántica". Este Qernium te
                              ayudará a avanzar al siguiente nivel en tu habilidad de Física.
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            className="flex-1 bg-gray-900 border border-gray-700 rounded-md px-3 py-1 text-sm text-white focus:outline-none focus:border-cyan-500"
                          />
                          <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                            Enviar
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
