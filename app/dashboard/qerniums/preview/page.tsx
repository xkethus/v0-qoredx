"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { QerniumPreviewModal } from "@/components/qernium-preview-modal"
import type { QerniumData } from "@/components/qernium-viewer"
import { Brain, Clock, Eye, FileText, Search, Video, BookOpen, Code } from "lucide-react"

export default function QerniumPreviewPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedQernium, setSelectedQernium] = useState<QerniumData | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Datos de ejemplo para los Qerniums
  const qerniums: QerniumData[] = [
    {
      id: "1",
      title: "Historia de la Exploración Espacial",
      description: "Un recorrido por los hitos más importantes en la historia de la exploración espacial humana.",
      bloomLevel: "remember",
      actionVerb: "Identificar",
      estimatedTime: 30,
      content: {
        type: "document",
        title: "Historia de la Exploración Espacial",
        content: `
          <h2>Historia de la Exploración Espacial</h2>
          <p>La exploración espacial comenzó formalmente en la década de 1950 durante la Guerra Fría, cuando la competencia entre Estados Unidos y la Unión Soviética impulsó avances significativos en la tecnología de cohetes y satélites.</p>
          
          <h3>Hitos Importantes</h3>
          <ul>
            <li><strong>4 de octubre de 1957:</strong> La Unión Soviética lanza el Sputnik 1, el primer satélite artificial en órbita terrestre.</li>
            <li><strong>12 de abril de 1961:</strong> Yuri Gagarin se convierte en el primer ser humano en viajar al espacio a bordo de la Vostok 1.</li>
            <li><strong>20 de julio de 1969:</strong> Neil Armstrong y Buzz Aldrin se convierten en los primeros humanos en pisar la Luna durante la misión Apollo 11.</li>
            <li><strong>1990-presente:</strong> Lanzamiento y operación del Telescopio Espacial Hubble, que ha revolucionado nuestra comprensión del universo.</li>
            <li><strong>1998-presente:</strong> Construcción y operación de la Estación Espacial Internacional (ISS).</li>
            <li><strong>2004:</strong> Aterrizaje de los rovers Spirit y Opportunity en Marte.</li>
            <li><strong>2012:</strong> Aterrizaje del rover Curiosity en Marte.</li>
            <li><strong>2020:</strong> SpaceX se convierte en la primera empresa privada en llevar astronautas a la ISS.</li>
            <li><strong>2021:</strong> Aterrizaje del rover Perseverance y el helicóptero Ingenuity en Marte.</li>
          </ul>
          
          <h3>La Carrera Espacial</h3>
          <p>La carrera espacial fue un período de competencia intensa entre Estados Unidos y la Unión Soviética por lograr hitos en la exploración espacial. Esta competencia llevó a avances tecnológicos significativos y culminó con el alunizaje del Apollo 11 en 1969.</p>
          
          <h3>La Era Moderna de la Exploración Espacial</h3>
          <p>Actualmente, la exploración espacial ha entrado en una nueva era caracterizada por:</p>
          <ul>
            <li>Colaboración internacional en proyectos como la ISS</li>
            <li>Participación creciente de empresas privadas como SpaceX, Blue Origin y Virgin Galactic</li>
            <li>Planes para el retorno a la Luna y misiones tripuladas a Marte</li>
            <li>Desarrollo de tecnologías para la exploración del espacio profundo</li>
          </ul>
        `,
        attachments: [
          { name: "Línea de tiempo de la exploración espacial.pdf", url: "#", type: "pdf" },
          { name: "Imágenes históricas de misiones espaciales.zip", url: "#", type: "zip" },
        ],
      },
      skills: [
        {
          id: "skill1",
          subskillId: "subskill1",
          subskillName: "Conocimiento histórico espacial",
          skillName: "Historia Científica",
          skillColor: "cyan",
          level: 3,
        },
        {
          id: "skill2",
          subskillId: "subskill2",
          subskillName: "Cronología de eventos espaciales",
          skillName: "Análisis Temporal",
          skillColor: "purple",
          level: 2,
        },
      ],
      creatorId: "user1",
      creatorName: "Dr. Carlos Jiménez",
    },
    {
      id: "2",
      title: "Física de los Viajes Espaciales",
      description: "Conceptos fundamentales de física que hacen posible los viajes espaciales.",
      bloomLevel: "understand",
      actionVerb: "Explicar",
      estimatedTime: 45,
      content: {
        type: "video",
        title: "Física de los Viajes Espaciales",
        videoUrl: "https://example.com/videos/space-physics.mp4",
        duration: "42:15",
        transcript: `
          [00:00] Bienvenidos a esta lección sobre la física de los viajes espaciales.
          
          [00:15] Para entender cómo las naves espaciales pueden viajar por el espacio, primero debemos comprender algunas leyes fundamentales de la física.
          
          [01:30] La primera ley de Newton establece que un objeto en movimiento permanecerá en movimiento a menos que actúe sobre él una fuerza externa. En el espacio, donde hay muy poca resistencia, esto significa que una vez que una nave espacial está en movimiento, continuará moviéndose sin necesidad de propulsión constante.
          
          [05:45] La segunda ley de Newton, F = ma, nos ayuda a entender cómo la masa de una nave espacial afecta la cantidad de fuerza necesaria para cambiar su velocidad o dirección.
          
          [10:20] La tercera ley de Newton, para cada acción hay una reacción igual y opuesta, explica cómo funcionan los motores de cohetes: expulsan gases a alta velocidad en una dirección, lo que impulsa la nave en la dirección opuesta.
          
          [15:40] La ecuación del cohete de Tsiolkovsky relaciona la velocidad final de un cohete con su velocidad de escape y la proporción de masa inicial a masa final.
          
          [22:10] Las órbitas se rigen por la ley de gravitación universal de Newton y las leyes de Kepler. Una órbita es esencialmente un equilibrio entre la velocidad tangencial de un objeto y la atracción gravitacional del cuerpo alrededor del cual orbita.
          
          [30:25] Las transferencias orbitales, como la maniobra de Hohmann, permiten a las naves espaciales cambiar de una órbita a otra de manera eficiente en términos de combustible.
          
          [35:50] La asistencia gravitacional utiliza la gravedad de los planetas para acelerar o desacelerar una nave espacial, permitiendo misiones a destinos distantes con menos combustible.
          
          [40:00] Conclusión: La física de los viajes espaciales combina principios de mecánica newtoniana, dinámica orbital y propulsión de cohetes para hacer posible la exploración del espacio.
        `,
      },
      skills: [
        {
          id: "skill3",
          subskillId: "subskill3",
          subskillName: "Leyes del movimiento",
          skillName: "Física Mecánica",
          skillColor: "pink",
          level: 4,
        },
        {
          id: "skill4",
          subskillId: "subskill4",
          subskillName: "Dinámica orbital",
          skillName: "Astrofísica",
          skillColor: "amber",
          level: 3,
        },
      ],
      creatorId: "user2",
      creatorName: "Dra. Elena Martínez",
    },
    {
      id: "3",
      title: "Conceptos Básicos de Navegación",
      description: "Evaluación sobre los principios fundamentales de la navegación espacial.",
      bloomLevel: "apply",
      actionVerb: "Aplicar",
      estimatedTime: 60,
      content: {
        type: "quiz",
        title: "Conceptos Básicos de Navegación Espacial",
        description:
          "Este quiz evalúa tu comprensión de los principios fundamentales de la navegación espacial y cómo se aplican en misiones reales.",
        questions: [
          {
            id: "q1",
            question: "¿Qué ley de Newton explica el principio básico de propulsión de cohetes?",
            options: [
              { id: "q1a", text: "Primera ley: Ley de inercia", isCorrect: false },
              { id: "q1b", text: "Segunda ley: F = ma", isCorrect: false },
              { id: "q1c", text: "Tercera ley: Para cada acción hay una reacción igual y opuesta", isCorrect: true },
              { id: "q1d", text: "Ley de gravitación universal", isCorrect: false },
            ],
            type: "single",
            points: 10,
          },
          {
            id: "q2",
            question:
              "¿Cuáles de los siguientes factores afectan la trayectoria de una nave espacial? (Selecciona todos los que apliquen)",
            options: [
              { id: "q2a", text: "Campos gravitacionales de cuerpos celestes", isCorrect: true },
              { id: "q2b", text: "Presión de radiación solar", isCorrect: true },
              { id: "q2c", text: "Temperatura del espacio exterior", isCorrect: false },
              { id: "q2d", text: "Resistencia atmosférica (en órbitas bajas)", isCorrect: true },
            ],
            type: "multiple",
            points: 15,
          },
          {
            id: "q3",
            question:
              "Explica cómo funciona una maniobra de asistencia gravitacional y por qué es útil para misiones a planetas distantes.",
            options: [],
            type: "text",
            points: 20,
          },
          {
            id: "q4",
            question: "¿Qué tipo de órbita se utiliza típicamente para satélites de comunicaciones?",
            options: [
              { id: "q4a", text: "Órbita terrestre baja (LEO)", isCorrect: false },
              { id: "q4b", text: "Órbita terrestre media (MEO)", isCorrect: false },
              { id: "q4c", text: "Órbita geosíncrona (GEO)", isCorrect: true },
              { id: "q4d", text: "Órbita de transferencia de Hohmann", isCorrect: false },
            ],
            type: "single",
            points: 10,
          },
          {
            id: "q5",
            question: "Ordena los siguientes pasos de una misión típica a Marte:",
            options: [
              { id: "q5a", text: "Inserción en órbita marciana", isCorrect: true },
              { id: "q5b", text: "Fase de crucero interplanetario", isCorrect: true },
              { id: "q5c", text: "Lanzamiento desde la Tierra", isCorrect: true },
              { id: "q5d", text: "Aterrizaje o inserción de sonda orbital", isCorrect: true },
            ],
            type: "multiple",
            points: 15,
          },
        ],
        timeLimit: 45,
        passingScore: 70,
      },
      skills: [
        {
          id: "skill5",
          subskillId: "subskill5",
          subskillName: "Navegación espacial",
          skillName: "Ingeniería Aeroespacial",
          skillColor: "cyan",
          level: 3,
        },
        {
          id: "skill6",
          subskillId: "subskill6",
          subskillName: "Cálculo de trayectorias",
          skillName: "Matemáticas Aplicadas",
          skillColor: "purple",
          level: 2,
        },
      ],
      creatorId: "user3",
      creatorName: "Ing. Roberto Sánchez",
    },
    {
      id: "4",
      title: "Diseño de Misión a Marte",
      description: "Tarea para diseñar una misión de exploración a Marte aplicando los conceptos aprendidos.",
      bloomLevel: "create",
      actionVerb: "Diseñar",
      estimatedTime: 120,
      content: {
        type: "assignment",
        title: "Diseño de Misión a Marte",
        description:
          "En esta tarea, diseñarás una misión de exploración a Marte aplicando los conceptos de física espacial, navegación y sistemas de soporte vital que has aprendido.",
        instructions: `
          # Diseño de Misión a Marte
          
          ## Objetivo
          Diseñar una misión completa de exploración a Marte que sea técnicamente viable con la tecnología actual o de un futuro cercano.
          
          ## Requisitos
          1. **Descripción general de la misión**
             - Nombre y objetivo principal
             - Duración estimada
             - Tipo de misión (orbital, aterrizaje, retorno de muestras, etc.)
          
          2. **Diseño de la nave espacial**
             - Componentes principales
             - Sistemas de propulsión
             - Sistemas de soporte vital (para misiones tripuladas)
             - Instrumentos científicos
          
          3. **Plan de navegación**
             - Ventana de lanzamiento
             - Trayectoria Tierra-Marte
             - Maniobras orbitales
             - Plan de aterrizaje (si aplica)
          
          4. **Cronograma de la misión**
             - Fases principales
             - Hitos clave
             - Plan de contingencia
          
          5. **Consideraciones científicas**
             - Objetivos de investigación
             - Experimentos planificados
             - Datos a recolectar
          
          ## Formato de entrega
          - Documento PDF (máximo 10 páginas)
          - Incluir diagramas y visualizaciones
          - Referencias bibliográficas
          
          ## Criterios de evaluación
          - Viabilidad técnica (30%)
          - Originalidad y creatividad (20%)
          - Aplicación correcta de conceptos físicos y de ingeniería (30%)
          - Claridad en la presentación (10%)
          - Consideración de desafíos y soluciones (10%)
        `,
        dueDate: "2025-05-15",
        attachments: [
          { name: "Plantilla de diseño de misión.docx", url: "#", type: "docx" },
          { name: "Datos de referencia sobre Marte.xlsx", url: "#", type: "xlsx" },
          { name: "Ejemplos de misiones anteriores.pdf", url: "#", type: "pdf" },
        ],
      },
      skills: [
        {
          id: "skill7",
          subskillId: "subskill7",
          subskillName: "Diseño de misiones",
          skillName: "Planificación Espacial",
          skillColor: "amber",
          level: 4,
        },
        {
          id: "skill8",
          subskillId: "subskill8",
          subskillName: "Resolución de problemas complejos",
          skillName: "Pensamiento Crítico",
          skillColor: "pink",
          level: 3,
        },
      ],
      creatorId: "user4",
      creatorName: "Dr. Alejandro Vega",
    },
  ]

  // Filtrar qerniums según la pestaña activa y la búsqueda
  const filteredQerniums = qerniums.filter((qernium) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "document" && qernium.content.type === "document") ||
      (activeTab === "video" && qernium.content.type === "video") ||
      (activeTab === "quiz" && qernium.content.type === "quiz") ||
      (activeTab === "assignment" && qernium.content.type === "assignment")

    const matchesSearch =
      qernium.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      qernium.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  // Función para obtener el color de fondo según el nivel de Bloom
  const getBloomLevelColor = (level: string) => {
    switch (level) {
      case "remember":
        return "bg-blue-900/30 text-blue-300"
      case "understand":
        return "bg-green-900/30 text-green-300"
      case "apply":
        return "bg-yellow-900/30 text-yellow-300"
      case "analyze":
        return "bg-orange-900/30 text-orange-300"
      case "evaluate":
        return "bg-red-900/30 text-red-300"
      case "create":
        return "bg-purple-900/30 text-purple-300"
      default:
        return "bg-gray-900/30 text-gray-300"
    }
  }

  // Función para obtener el nombre del nivel de Bloom en español
  const getBloomLevelName = (level: string) => {
    switch (level) {
      case "remember":
        return "Recordar"
      case "understand":
        return "Comprender"
      case "apply":
        return "Aplicar"
      case "analyze":
        return "Analizar"
      case "evaluate":
        return "Evaluar"
      case "create":
        return "Crear"
      default:
        return level
    }
  }

  // Función para abrir el modal de vista previa
  const openPreview = (qernium: QerniumData) => {
    setSelectedQernium(qernium)
    setIsPreviewOpen(true)
  }

  return (
    <>
      <DashboardHeader
        heading="Vista Previa de Qerniums"
        text="Explora los diferentes tipos de Qerniums disponibles en el Qluster 'Fundamentos de la Exploración Espacial'"
      />
      <DashboardShell>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-black/20 border border-purple-900/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="document"
                className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
              >
                <FileText className="mr-2 h-4 w-4" />
                Documentos
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="data-[state=active]:bg-pink-900/20 data-[state=active]:text-pink-300"
              >
                <Video className="mr-2 h-4 w-4" />
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="quiz"
                className="data-[state=active]:bg-amber-900/20 data-[state=active]:text-amber-300"
              >
                <Code className="mr-2 h-4 w-4" />
                Quizzes
              </TabsTrigger>
              <TabsTrigger
                value="assignment"
                className="data-[state=active]:bg-green-900/20 data-[state=active]:text-green-300"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Tareas
              </TabsTrigger>
            </TabsList>
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar qerniums..."
                className="pl-8 border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredQerniums.map((qernium) => (
                <Card key={qernium.id} className="border-purple-900/50 bg-black/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-purple-300">{qernium.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{qernium.description}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-purple-300 hover:bg-purple-900/20"
                        onClick={() => openPreview(qernium)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Vista previa</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getBloomLevelColor(qernium.bloomLevel)}>
                          {qernium.actionVerb} ({getBloomLevelName(qernium.bloomLevel)})
                        </Badge>

                        <Badge variant="outline" className="border-purple-900/50 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {qernium.estimatedTime} min
                        </Badge>

                        {qernium.content.type === "document" && (
                          <Badge variant="outline" className="border-cyan-900/50 text-cyan-300 flex items-center gap-1">
                            <FileText className="h-3 w-3" /> Documento
                          </Badge>
                        )}

                        {qernium.content.type === "video" && (
                          <Badge variant="outline" className="border-pink-900/50 text-pink-300 flex items-center gap-1">
                            <Video className="h-3 w-3" /> Video
                          </Badge>
                        )}

                        {qernium.content.type === "quiz" && (
                          <Badge
                            variant="outline"
                            className="border-amber-900/50 text-amber-300 flex items-center gap-1"
                          >
                            <Code className="h-3 w-3" /> Quiz
                          </Badge>
                        )}

                        {qernium.content.type === "assignment" && (
                          <Badge
                            variant="outline"
                            className="border-green-900/50 text-green-300 flex items-center gap-1"
                          >
                            <BookOpen className="h-3 w-3" /> Tarea
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-300" />
                        <span className="text-sm">Habilidades:</span>
                        <div className="flex flex-wrap gap-1">
                          {qernium.skills.map((skill) => (
                            <Badge
                              key={skill.id}
                              variant="outline"
                              className={`text-${skill.skillColor}-300 border-${skill.skillColor}-900/50`}
                            >
                              {skill.subskillName}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="text-sm text-muted-foreground">Creado por: {qernium.creatorName}</div>
                        <Button
                          size="sm"
                          onClick={() => openPreview(qernium)}
                          className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                        >
                          <Eye className="mr-2 h-4 w-4" /> Ver Qernium
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredQerniums.length === 0 && (
                <div className="col-span-2 p-8 text-center border border-dashed border-purple-900/50 rounded-md">
                  <p className="text-muted-foreground">No se encontraron Qerniums que coincidan con tu búsqueda.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Las demás pestañas mostrarán el mismo contenido pero filtrado por tipo */}
          <TabsContent value="document" className="space-y-4">
            {/* El contenido se filtra automáticamente en filteredQerniums */}
            <div className="grid gap-4 md:grid-cols-2">
              {filteredQerniums.map((qernium) => (
                <Card key={qernium.id} className="border-cyan-900/50 bg-black/50 backdrop-blur-sm">
                  {/* Mismo contenido que en "all" pero con colores específicos para documentos */}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-cyan-300">{qernium.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{qernium.description}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-cyan-300 hover:bg-cyan-900/20"
                        onClick={() => openPreview(qernium)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Vista previa</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Mismo contenido que en "all" */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getBloomLevelColor(qernium.bloomLevel)}>
                          {qernium.actionVerb} ({getBloomLevelName(qernium.bloomLevel)})
                        </Badge>

                        <Badge variant="outline" className="border-cyan-900/50 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {qernium.estimatedTime} min
                        </Badge>

                        <Badge variant="outline" className="border-cyan-900/50 text-cyan-300 flex items-center gap-1">
                          <FileText className="h-3 w-3" /> Documento
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-cyan-300" />
                        <span className="text-sm">Habilidades:</span>
                        <div className="flex flex-wrap gap-1">
                          {qernium.skills.map((skill) => (
                            <Badge
                              key={skill.id}
                              variant="outline"
                              className={`text-${skill.skillColor}-300 border-${skill.skillColor}-900/50`}
                            >
                              {skill.subskillName}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="text-sm text-muted-foreground">Creado por: {qernium.creatorName}</div>
                        <Button
                          size="sm"
                          onClick={() => openPreview(qernium)}
                          className="bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600"
                        >
                          <Eye className="mr-2 h-4 w-4" /> Ver Qernium
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredQerniums.length === 0 && (
                <div className="col-span-2 p-8 text-center border border-dashed border-cyan-900/50 rounded-md">
                  <p className="text-muted-foreground">No se encontraron documentos que coincidan con tu búsqueda.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredQerniums.map((qernium) => (
                <Card key={qernium.id} className="border-pink-900/50 bg-black/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-pink-300">{qernium.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{qernium.description}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-pink-300 hover:bg-pink-900/20"
                        onClick={() => openPreview(qernium)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Vista previa</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getBloomLevelColor(qernium.bloomLevel)}>
                          {qernium.actionVerb} ({getBloomLevelName(qernium.bloomLevel)})
                        </Badge>

                        <Badge variant="outline" className="border-pink-900/50 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {qernium.estimatedTime} min
                        </Badge>

                        <Badge variant="outline" className="border-pink-900/50 text-pink-300 flex items-center gap-1">
                          <Video className="h-3 w-3" /> Video
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-pink-300" />
                        <span className="text-sm">Habilidades:</span>
                        <div className="flex flex-wrap gap-1">
                          {qernium.skills.map((skill) => (
                            <Badge
                              key={skill.id}
                              variant="outline"
                              className={`text-${skill.skillColor}-300 border-${skill.skillColor}-900/50`}
                            >
                              {skill.subskillName}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="text-sm text-muted-foreground">Creado por: {qernium.creatorName}</div>
                        <Button
                          size="sm"
                          onClick={() => openPreview(qernium)}
                          className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
                        >
                          <Eye className="mr-2 h-4 w-4" /> Ver Qernium
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredQerniums.length === 0 && (
                <div className="col-span-2 p-8 text-center border border-dashed border-pink-900/50 rounded-md">
                  <p className="text-muted-foreground">No se encontraron videos que coincidan con tu búsqueda.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredQerniums.map((qernium) => (
                <Card key={qernium.id} className="border-amber-900/50 bg-black/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-amber-300">{qernium.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{qernium.description}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-amber-300 hover:bg-amber-900/20"
                        onClick={() => openPreview(qernium)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Vista previa</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getBloomLevelColor(qernium.bloomLevel)}>
                          {qernium.actionVerb} ({getBloomLevelName(qernium.bloomLevel)})
                        </Badge>

                        <Badge variant="outline" className="border-amber-900/50 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {qernium.estimatedTime} min
                        </Badge>

                        <Badge variant="outline" className="border-amber-900/50 text-amber-300 flex items-center gap-1">
                          <Code className="h-3 w-3" /> Quiz
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-amber-300" />
                        <span className="text-sm">Habilidades:</span>
                        <div className="flex flex-wrap gap-1">
                          {qernium.skills.map((skill) => (
                            <Badge
                              key={skill.id}
                              variant="outline"
                              className={`text-${skill.skillColor}-300 border-${skill.skillColor}-900/50`}
                            >
                              {skill.subskillName}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="text-sm text-muted-foreground">Creado por: {qernium.creatorName}</div>
                        <Button
                          size="sm"
                          onClick={() => openPreview(qernium)}
                          className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600"
                        >
                          <Eye className="mr-2 h-4 w-4" /> Ver Qernium
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredQerniums.length === 0 && (
                <div className="col-span-2 p-8 text-center border border-dashed border-amber-900/50 rounded-md">
                  <p className="text-muted-foreground">No se encontraron quizzes que coincidan con tu búsqueda.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="assignment" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredQerniums.map((qernium) => (
                <Card key={qernium.id} className="border-green-900/50 bg-black/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-green-300">{qernium.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{qernium.description}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-green-300 hover:bg-green-900/20"
                        onClick={() => openPreview(qernium)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Vista previa</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getBloomLevelColor(qernium.bloomLevel)}>
                          {qernium.actionVerb} ({getBloomLevelName(qernium.bloomLevel)})
                        </Badge>

                        <Badge variant="outline" className="border-green-900/50 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {qernium.estimatedTime} min
                        </Badge>

                        <Badge variant="outline" className="border-green-900/50 text-green-300 flex items-center gap-1">
                          <BookOpen className="h-3 w-3" /> Tarea
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-green-300" />
                        <span className="text-sm">Habilidades:</span>
                        <div className="flex flex-wrap gap-1">
                          {qernium.skills.map((skill) => (
                            <Badge
                              key={skill.id}
                              variant="outline"
                              className={`text-${skill.skillColor}-300 border-${skill.skillColor}-900/50`}
                            >
                              {skill.subskillName}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="text-sm text-muted-foreground">Creado por: {qernium.creatorName}</div>
                        <Button
                          size="sm"
                          onClick={() => openPreview(qernium)}
                          className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                        >
                          <Eye className="mr-2 h-4 w-4" /> Ver Qernium
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredQerniums.length === 0 && (
                <div className="col-span-2 p-8 text-center border border-dashed border-green-900/50 rounded-md">
                  <p className="text-muted-foreground">No se encontraron tareas que coincidan con tu búsqueda.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DashboardShell>

      {/* Modal de vista previa */}
      <QerniumPreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} qernium={selectedQernium} />
    </>
  )
}
