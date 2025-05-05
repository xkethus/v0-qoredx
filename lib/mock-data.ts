// Tipos para nuestros datos
export type BloomLevel = "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create"
export type QerniumStatus = "draft" | "published" | "archived"
export type QlusterStatus = "draft" | "scheduled" | "active" | "completed" | "archived"
export type QlusterVisibility = "private" | "public" | "restricted"
export type ContentType = "document" | "video" | "quiz" | "assignment"
export type ContentTypeQernium = "texto" | "video" | "enlace" | "tarea" | "quiz" // Tipos de contenido para Qerniums

// Interfaces para nuestros datos
export interface Skill {
  id: string
  name: string
  description: string
  color: string
  subskills: Subskill[]
}

export interface Subskill {
  id: string
  skillId: string
  name: string
  description: string
}

export interface QerniumSkill {
  id: string
  qerniumId: string
  subskillId: string
  subskillName: string
  skillName: string
  skillColor: string
  level: number // 0-4
}

export interface Qernex {
  id: string
  qorePlexId: string
  name: string
  description: string
  code: string
  color: string
  coverImage?: string
  creatorId: string
  creatorName: string
  qlusters: string[] // IDs de Qlusters
}

export interface Qluster {
  id: string
  qernexId: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: QlusterStatus
  visibility: QlusterVisibility
  color: string
  coverImage?: string
  autoEnroll: boolean
  sequentialProgress: boolean
  certificate: boolean
  creatorId: string
  creatorName: string
  qerniums: string[] // IDs de Qerniums
  progress?: number // Para estudiantes
  position?: [number, number, number] // Para visualización 3D
}

// Actualizar la interfaz Qernium para incluir el tipo de contenido
export interface Qernium {
  id: string
  title: string
  description: string
  bloomLevel: BloomLevel
  actionVerb: string
  status: QerniumStatus
  estimatedTime: number // minutos
  prerequisites?: string[] // IDs de Qerniums
  coverImage?: string
  creatorId: string
  creatorName: string
  skills: QerniumSkill[]
  content: QerniumContent[]
  position?: [number, number, number] // Para visualización 3D
  qlusterId?: string // Para relación con Qluster
  contentType: ContentTypeQernium // Tipo de contenido principal
}

export interface QerniumContent {
  id: string
  qerniumId: string
  title: string
  description: string
  type: ContentType
  content: any // Contenido específico según el tipo
  order: number
}

// Datos mock
export const mockSkills: Skill[] = [
  {
    id: "skill-1",
    name: "Pensamiento Crítico",
    description: "Capacidad para analizar y evaluar información de manera objetiva",
    color: "purple",
    subskills: [
      {
        id: "subskill-1-1",
        skillId: "skill-1",
        name: "Análisis de Argumentos",
        description: "Capacidad para descomponer argumentos y evaluar su validez",
      },
      {
        id: "subskill-1-2",
        skillId: "skill-1",
        name: "Evaluación de Evidencia",
        description: "Capacidad para evaluar la calidad y relevancia de la evidencia",
      },
    ],
  },
  {
    id: "skill-2",
    name: "Resolución de Problemas",
    description: "Capacidad para identificar y resolver problemas de manera efectiva",
    color: "cyan",
    subskills: [
      {
        id: "subskill-2-1",
        skillId: "skill-2",
        name: "Identificación de Problemas",
        description: "Capacidad para identificar y definir problemas",
      },
      {
        id: "subskill-2-2",
        skillId: "skill-2",
        name: "Generación de Soluciones",
        description: "Capacidad para generar múltiples soluciones a un problema",
      },
    ],
  },
  {
    id: "skill-3",
    name: "Comunicación Efectiva",
    description: "Capacidad para comunicar ideas de manera clara y efectiva",
    color: "pink",
    subskills: [
      {
        id: "subskill-3-1",
        skillId: "skill-3",
        name: "Comunicación Escrita",
        description: "Capacidad para expresar ideas por escrito de manera clara",
      },
      {
        id: "subskill-3-2",
        skillId: "skill-3",
        name: "Comunicación Oral",
        description: "Capacidad para expresar ideas oralmente de manera efectiva",
      },
    ],
  },
]

// Crear un Qernex
export const mockQernex: Qernex = {
  id: "qernex-1",
  qorePlexId: "qoreplex-1",
  name: "Ciencias y Tecnología",
  description: "Área de aprendizaje enfocada en ciencias y tecnología avanzada",
  code: "CT-2025",
  color: "#22d3ee", // cyan
  coverImage: "/abstract-geometric-pattern.png",
  creatorId: "creator-1",
  creatorName: "Dr. Quantum",
  qlusters: ["qluster-1", "qluster-2", "qluster-3"],
}

// Crear Qlusters
export const mockQlusters: Qluster[] = [
  {
    id: "qluster-1",
    qernexId: "qernex-1",
    title: "Física Cuántica",
    description: "Explora los fundamentos de la física cuántica y sus aplicaciones en la tecnología moderna.",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    status: "active",
    visibility: "public",
    color: "#22d3ee", // cyan
    coverImage: "/abstract-geometric-gold.png",
    autoEnroll: true,
    sequentialProgress: true,
    certificate: true,
    creatorId: "creator-1",
    creatorName: "Dr. Quantum",
    qerniums: ["qernium-1", "qernium-2", "qernium-3", "qernium-4"],
    progress: 65,
    position: [0, 0, 0],
  },
  {
    id: "qluster-2",
    qernexId: "qernex-1",
    title: "Exploración Espacial",
    description:
      "Descubre los misterios del cosmos y las misiones espaciales que están expandiendo nuestro conocimiento del universo.",
    startDate: "2025-04-15",
    endDate: "2025-07-15",
    status: "active",
    visibility: "public",
    color: "#ec4899", // pink
    coverImage: "/abstract-color-run.png",
    autoEnroll: true,
    sequentialProgress: false,
    certificate: true,
    creatorId: "creator-2",
    creatorName: "Dra. Cosmos",
    qerniums: ["qernium-5", "qernium-6", "qernium-7", "qernium-8"],
    progress: 30,
    position: [-8, 3, -5],
  },
  {
    id: "qluster-3",
    qernexId: "qernex-1",
    title: "Inteligencia Artificial",
    description:
      "Aprende sobre algoritmos, redes neuronales y aplicaciones de IA que están transformando nuestra sociedad.",
    startDate: "2025-05-01",
    endDate: "2025-08-01",
    status: "active",
    visibility: "public",
    color: "#a855f7", // purple
    coverImage: "/abstract-em.png",
    autoEnroll: false,
    sequentialProgress: true,
    certificate: true,
    creatorId: "creator-3",
    creatorName: "Prof. Neural",
    qerniums: ["qernium-9", "qernium-10", "qernium-11", "qernium-12"],
    progress: 15,
    position: [10, -2, -8],
  },
]

// Función para generar un verbo de acción basado en el nivel de Bloom
function getActionVerbFromBloomLevel(bloomLevel: BloomLevel): string {
  switch (bloomLevel) {
    case "remember":
      return "Identificar"
    case "understand":
      return "Explicar"
    case "apply":
      return "Aplicar"
    case "analyze":
      return "Analizar"
    case "evaluate":
      return "Evaluar"
    case "create":
      return "Crear"
    default:
      return "Explorar"
  }
}

// Crear Qerniums con tipos de contenido específicos
export const mockQerniums: Qernium[] = [
  // Qerniums para Física Cuántica
  {
    id: "qernium-1",
    title: "Fundamentos de la Mecánica Cuántica",
    description:
      "Introducción a los principios fundamentales de la mecánica cuántica y su importancia en la física moderna.",
    bloomLevel: "understand",
    actionVerb: "Explicar",
    status: "published",
    estimatedTime: 45,
    coverImage: "/abstract-geometric-gold.png",
    creatorId: "creator-1",
    creatorName: "Dr. Quantum",
    contentType: "texto",
    skills: [
      {
        id: "qs-1-1",
        qerniumId: "qernium-1",
        subskillId: "subskill-1-1",
        subskillName: "Análisis de Argumentos",
        skillName: "Pensamiento Crítico",
        skillColor: "purple",
        level: 2,
      },
    ],
    content: [
      {
        id: "content-1-1",
        qerniumId: "qernium-1",
        title: "Introducción a la Mecánica Cuántica",
        description: "Conceptos básicos y desarrollo histórico",
        type: "document",
        content: {
          text: "La mecánica cuántica es una rama fundamental de la física que describe el comportamiento de la materia y la energía a escalas muy pequeñas, como átomos y partículas subatómicas...",
        },
        order: 1,
      },
      {
        id: "content-1-2",
        qerniumId: "qernium-1",
        title: "Principio de Incertidumbre",
        description: "Comprensión del principio de Heisenberg",
        type: "quiz",
        content: {
          questions: [
            {
              id: "q1",
              question: "¿Cuál es el principio de incertidumbre de Heisenberg?",
              type: "single",
              options: [
                {
                  id: "q1-opt1",
                  text: "No es posible conocer simultáneamente y con precisión arbitraria la posición y el momento de una partícula.",
                  isCorrect: true,
                },
                {
                  id: "q1-opt2",
                  text: "La energía total de un sistema aislado se conserva.",
                  isCorrect: false,
                },
              ],
              points: 2,
            },
          ],
          passingScore: 70,
        },
        order: 2,
      },
    ],
    position: [1.5, 0.8, 0.5],
    qlusterId: "qluster-1",
  },
  {
    id: "qernium-2",
    title: "Ecuación de Schrödinger",
    description: "Estudio de la ecuación fundamental de la mecánica cuántica y sus aplicaciones.",
    bloomLevel: "apply",
    actionVerb: "Aplicar",
    status: "published",
    estimatedTime: 60,
    coverImage: "/abstract-geometric-gold.png",
    creatorId: "creator-1",
    creatorName: "Dr. Quantum",
    contentType: "video",
    skills: [
      {
        id: "qs-2-1",
        qerniumId: "qernium-2",
        subskillId: "subskill-2-1",
        subskillName: "Identificación de Problemas",
        skillName: "Resolución de Problemas",
        skillColor: "cyan",
        level: 3,
      },
    ],
    content: [
      {
        id: "content-2-1",
        qerniumId: "qernium-2",
        title: "La Ecuación de Schrödinger",
        description: "Formulación y significado",
        type: "document",
        content: {
          text: "La ecuación de Schrödinger es una ecuación diferencial que describe cómo el estado cuántico de un sistema físico cambia con el tiempo...",
        },
        order: 1,
      },
      {
        id: "content-2-2",
        qerniumId: "qernium-2",
        title: "Aplicaciones de la Ecuación de Schrödinger",
        description: "Resolución de problemas prácticos",
        type: "assignment",
        content: {
          instructions:
            "Resuelve la ecuación de Schrödinger para un pozo de potencial infinito y analiza los resultados.",
          deadline: "2025-05-15",
          submissionType: "pdf",
        },
        order: 2,
      },
    ],
    position: [-1.2, 0.5, 1.8],
    qlusterId: "qluster-1",
  },
  {
    id: "qernium-3",
    title: "Entrelazamiento Cuántico",
    description:
      "Exploración del fenómeno de entrelazamiento cuántico y sus implicaciones para la información cuántica.",
    bloomLevel: "analyze",
    actionVerb: "Analizar",
    status: "published",
    estimatedTime: 50,
    coverImage: "/abstract-geometric-gold.png",
    creatorId: "creator-1",
    creatorName: "Dr. Quantum",
    contentType: "enlace",
    skills: [
      {
        id: "qs-3-1",
        qerniumId: "qernium-3",
        subskillId: "subskill-1-2",
        subskillName: "Evaluación de Evidencia",
        skillName: "Pensamiento Crítico",
        skillColor: "purple",
        level: 3,
      },
    ],
    content: [
      {
        id: "content-3-1",
        qerniumId: "qernium-3",
        title: "Entrelazamiento Cuántico",
        description: "Concepto y experimentos clave",
        type: "video",
        content: {
          url: "https://example.com/videos/entanglement.mp4",
          duration: 1800, // 30 minutos en segundos
          transcript: "En este video, exploraremos el fascinante fenómeno del entrelazamiento cuántico...",
        },
        order: 1,
      },
    ],
    position: [2.1, -1.3, 0.7],
    qlusterId: "qluster-1",
  },
  {
    id: "qernium-4",
    title: "Computación Cuántica",
    description: "Introducción a los principios de la computación cuántica y sus aplicaciones potenciales.",
    bloomLevel: "evaluate",
    actionVerb: "Evaluar",
    status: "published",
    estimatedTime: 70,
    coverImage: "/abstract-geometric-gold.png",
    creatorId: "creator-1",
    creatorName: "Dr. Quantum",
    contentType: "quiz",
    skills: [
      {
        id: "qs-4-1",
        qerniumId: "qernium-4",
        subskillId: "subskill-2-2",
        subskillName: "Generación de Soluciones",
        skillName: "Resolución de Problemas",
        skillColor: "cyan",
        level: 4,
      },
    ],
    content: [
      {
        id: "content-4-1",
        qerniumId: "qernium-4",
        title: "Fundamentos de Computación Cuántica",
        description: "Qubits, puertas cuánticas y algoritmos",
        type: "document",
        content: {
          text: "La computación cuántica utiliza las propiedades de la mecánica cuántica para realizar cálculos de manera fundamentalmente diferente a las computadoras clásicas...",
        },
        order: 1,
      },
      {
        id: "content-4-2",
        qerniumId: "qernium-4",
        title: "Algoritmo de Shor",
        description: "Comprensión del algoritmo de factorización cuántica",
        type: "quiz",
        content: {
          questions: [
            {
              id: "q1",
              question: "¿Cuál es la principal aplicación del algoritmo de Shor?",
              type: "single",
              options: [
                {
                  id: "q1-opt1",
                  text: "Factorización de números enteros grandes",
                  isCorrect: true,
                },
                {
                  id: "q1-opt2",
                  text: "Búsqueda en bases de datos no estructuradas",
                  isCorrect: false,
                },
              ],
              points: 2,
            },
          ],
          passingScore: 70,
        },
        order: 2,
      },
    ],
    position: [-0.8, -1.5, -1.2],
    qlusterId: "qluster-1",
  },

  // Qerniums para Exploración Espacial
  {
    id: "qernium-5",
    title: "Sistema Solar",
    description: "Estudio detallado de los planetas, lunas y otros cuerpos del Sistema Solar.",
    bloomLevel: "understand",
    actionVerb: "Explicar",
    status: "published",
    estimatedTime: 55,
    coverImage: "/abstract-color-run.png",
    creatorId: "creator-2",
    creatorName: "Dra. Cosmos",
    contentType: "texto",
    skills: [
      {
        id: "qs-5-1",
        qerniumId: "qernium-5",
        subskillId: "subskill-1-1",
        subskillName: "Análisis de Argumentos",
        skillName: "Pensamiento Crítico",
        skillColor: "purple",
        level: 2,
      },
    ],
    content: [
      {
        id: "content-5-1",
        qerniumId: "qernium-5",
        title: "Planetas del Sistema Solar",
        description: "Características y composición",
        type: "document",
        content: {
          text: "Nuestro Sistema Solar está compuesto por ocho planetas principales que orbitan alrededor del Sol...",
        },
        order: 1,
      },
    ],
    position: [-7.2, 3.5, -4.8],
    qlusterId: "qluster-2",
  },
  {
    id: "qernium-6",
    title: "Misiones Espaciales",
    description: "Historia y logros de las principales misiones espaciales humanas y robóticas.",
    bloomLevel: "remember",
    actionVerb: "Identificar",
    status: "published",
    estimatedTime: 40,
    coverImage: "/abstract-color-run.png",
    creatorId: "creator-2",
    creatorName: "Dra. Cosmos",
    contentType: "video",
    skills: [
      {
        id: "qs-6-1",
        qerniumId: "qernium-6",
        subskillId: "subskill-3-1",
        subskillName: "Comunicación Escrita",
        skillName: "Comunicación Efectiva",
        skillColor: "pink",
        level: 2,
      },
    ],
    content: [
      {
        id: "content-6-1",
        qerniumId: "qernium-6",
        title: "Misiones Apolo",
        description: "El programa que llevó al hombre a la Luna",
        type: "video",
        content: {
          url: "https://example.com/videos/apollo-missions.mp4",
          duration: 1500, // 25 minutos en segundos
          transcript:
            "El programa Apolo fue uno de los logros más significativos en la historia de la exploración espacial...",
        },
        order: 1,
      },
    ],
    position: [-9.1, 2.3, -5.7],
    qlusterId: "qluster-2",
  },
  {
    id: "qernium-7",
    title: "Exoplanetas",
    description: "Métodos de detección y características de planetas fuera de nuestro Sistema Solar.",
    bloomLevel: "analyze",
    actionVerb: "Analizar",
    status: "published",
    estimatedTime: 65,
    coverImage: "/abstract-color-run.png",
    creatorId: "creator-2",
    creatorName: "Dra. Cosmos",
    contentType: "enlace",
    skills: [
      {
        id: "qs-7-1",
        qerniumId: "qernium-7",
        subskillId: "subskill-2-1",
        subskillName: "Identificación de Problemas",
        skillName: "Resolución de Problemas",
        skillColor: "cyan",
        level: 3,
      },
    ],
    content: [
      {
        id: "content-7-1",
        qerniumId: "qernium-7",
        title: "Métodos de Detección de Exoplanetas",
        description: "Técnicas y tecnologías",
        type: "document",
        content: {
          text: "Los astrónomos utilizan varios métodos para detectar exoplanetas, incluyendo el tránsito, la velocidad radial y la microlente gravitacional...",
        },
        order: 1,
      },
      {
        id: "content-7-2",
        qerniumId: "qernium-7",
        title: "Análisis de Datos de Exoplanetas",
        description: "Interpretación de observaciones",
        type: "assignment",
        content: {
          instructions:
            "Analiza los datos proporcionados del telescopio Kepler y determina las características de los posibles exoplanetas detectados.",
          deadline: "2025-06-20",
          submissionType: "spreadsheet",
        },
        order: 2,
      },
    ],
    position: [-8.5, 4.2, -4.3],
    qlusterId: "qluster-2",
  },
  {
    id: "qernium-8",
    title: "Colonización Espacial",
    description: "Desafíos y posibilidades para la colonización humana de otros planetas.",
    bloomLevel: "create",
    actionVerb: "Crear",
    status: "published",
    estimatedTime: 75,
    coverImage: "/abstract-color-run.png",
    creatorId: "creator-2",
    creatorName: "Dra. Cosmos",
    contentType: "tarea",
    skills: [
      {
        id: "qs-8-1",
        qerniumId: "qernium-8",
        subskillId: "subskill-2-2",
        subskillName: "Generación de Soluciones",
        skillName: "Resolución de Problemas",
        skillColor: "cyan",
        level: 4,
      },
      {
        id: "qs-8-2",
        qerniumId: "qernium-8",
        subskillId: "subskill-3-2",
        subskillName: "Comunicación Oral",
        skillName: "Comunicación Efectiva",
        skillColor: "pink",
        level: 3,
      },
    ],
    content: [
      {
        id: "content-8-1",
        qerniumId: "qernium-8",
        title: "Desafíos de la Colonización de Marte",
        description: "Problemas y posibles soluciones",
        type: "document",
        content: {
          text: "La colonización de Marte presenta numerosos desafíos, desde la radiación cósmica hasta la producción de alimentos y oxígeno...",
        },
        order: 1,
      },
      {
        id: "content-8-2",
        qerniumId: "qernium-8",
        title: "Diseño de Hábitat Marciano",
        description: "Proyecto creativo",
        type: "assignment",
        content: {
          instructions:
            "Diseña un hábitat para colonos humanos en Marte, considerando todos los aspectos necesarios para la supervivencia y el bienestar.",
          deadline: "2025-07-10",
          submissionType: "project",
        },
        order: 2,
      },
    ],
    position: [-7.8, 2.1, -6.2],
    qlusterId: "qluster-2",
  },

  // Qerniums para Inteligencia Artificial
  {
    id: "qernium-9",
    title: "Fundamentos de IA",
    description: "Introducción a los conceptos básicos y la historia de la inteligencia artificial.",
    bloomLevel: "understand",
    actionVerb: "Explicar",
    status: "published",
    estimatedTime: 50,
    coverImage: "/abstract-em.png",
    creatorId: "creator-3",
    creatorName: "Prof. Neural",
    contentType: "texto",
    skills: [
      {
        id: "qs-9-1",
        qerniumId: "qernium-9",
        subskillId: "subskill-1-1",
        subskillName: "Análisis de Argumentos",
        skillName: "Pensamiento Crítico",
        skillColor: "purple",
        level: 2,
      },
    ],
    content: [
      {
        id: "content-9-1",
        qerniumId: "qernium-9",
        title: "Historia de la IA",
        description: "Desarrollo histórico y conceptos clave",
        type: "document",
        content: {
          text: "La inteligencia artificial como campo de estudio comenzó en la década de 1950, con pioneros como Alan Turing y John McCarthy...",
        },
        order: 1,
      },
      {
        id: "content-9-2",
        qerniumId: "qernium-9",
        title: "Conceptos Básicos de IA",
        description: "Evaluación de comprensión",
        type: "quiz",
        content: {
          questions: [
            {
              id: "q1",
              question: "¿Cuál es la diferencia entre IA débil y IA fuerte?",
              type: "single",
              options: [
                {
                  id: "q1-opt1",
                  text: "La IA débil está diseñada para tareas específicas, mientras que la IA fuerte tendría una inteligencia generalizada similar a la humana.",
                  isCorrect: true,
                },
                {
                  id: "q1-opt2",
                  text: "La IA débil utiliza menos recursos computacionales que la IA fuerte.",
                  isCorrect: false,
                },
              ],
              points: 2,
            },
          ],
          passingScore: 70,
        },
        order: 2,
      },
    ],
    position: [9.5, -1.8, -7.9],
    qlusterId: "qluster-3",
  },
  {
    id: "qernium-10",
    title: "Aprendizaje Automático",
    description: "Estudio de algoritmos y técnicas que permiten a las máquinas aprender de los datos.",
    bloomLevel: "apply",
    actionVerb: "Aplicar",
    status: "published",
    estimatedTime: 70,
    coverImage: "/abstract-em.png",
    creatorId: "creator-3",
    creatorName: "Prof. Neural",
    contentType: "tarea",
    skills: [
      {
        id: "qs-10-1",
        qerniumId: "qernium-10",
        subskillId: "subskill-2-1",
        subskillName: "Identificación de Problemas",
        skillName: "Resolución de Problemas",
        skillColor: "cyan",
        level: 3,
      },
    ],
    content: [
      {
        id: "content-10-1",
        qerniumId: "qernium-10",
        title: "Algoritmos de Aprendizaje Supervisado",
        description: "Regresión y clasificación",
        type: "document",
        content: {
          text: "El aprendizaje supervisado es un tipo de algoritmo de aprendizaje automático que utiliza datos etiquetados para entrenar modelos...",
        },
        order: 1,
      },
      {
        id: "content-10-2",
        qerniumId: "qernium-10",
        title: "Implementación de un Clasificador",
        description: "Proyecto práctico",
        type: "assignment",
        content: {
          instructions:
            "Implementa un clasificador de imágenes utilizando una red neuronal convolucional para distinguir entre diferentes tipos de objetos.",
          deadline: "2025-06-15",
          submissionType: "code",
        },
        order: 2,
      },
    ],
    position: [10.8, -2.5, -8.3],
    qlusterId: "qluster-3",
  },
  {
    id: "qernium-11",
    title: "Redes Neuronales",
    description: "Estudio de las redes neuronales artificiales y su aplicación en problemas complejos.",
    bloomLevel: "analyze",
    actionVerb: "Analizar",
    status: "published",
    estimatedTime: 65,
    coverImage: "/abstract-em.png",
    creatorId: "creator-3",
    creatorName: "Prof. Neural",
    contentType: "video",
    skills: [
      {
        id: "qs-11-1",
        qerniumId: "qernium-11",
        subskillId: "subskill-2-2",
        subskillName: "Generación de Soluciones",
        skillName: "Resolución de Problemas",
        skillColor: "cyan",
        level: 4,
      },
    ],
    content: [
      {
        id: "content-11-1",
        qerniumId: "qernium-11",
        title: "Arquitecturas de Redes Neuronales",
        description: "Tipos y aplicaciones",
        type: "document",
        content: {
          text: "Las redes neuronales artificiales son modelos computacionales inspirados en el cerebro humano, compuestos por capas de neuronas artificiales...",
        },
        order: 1,
      },
      {
        id: "content-11-2",
        qerniumId: "qernium-11",
        title: "Análisis de Rendimiento de Redes Neuronales",
        description: "Evaluación y optimización",
        type: "assignment",
        content: {
          instructions:
            "Analiza el rendimiento de diferentes arquitecturas de redes neuronales en un conjunto de datos proporcionado y propón mejoras.",
          deadline: "2025-07-05",
          submissionType: "report",
        },
        order: 2,
      },
    ],
    position: [11.2, -1.5, -9.1],
    qlusterId: "qluster-3",
  },
  {
    id: "qernium-12",
    title: "Ética en IA",
    description:
      "Exploración de las implicaciones éticas y sociales del desarrollo y uso de la inteligencia artificial.",
    bloomLevel: "evaluate",
    actionVerb: "Evaluar",
    status: "published",
    estimatedTime: 55,
    coverImage: "/abstract-em.png",
    creatorId: "creator-3",
    creatorName: "Prof. Neural",
    contentType: "quiz",
    skills: [
      {
        id: "qs-12-1",
        qerniumId: "qernium-12",
        subskillId: "subskill-1-2",
        subskillName: "Evaluación de Evidencia",
        skillName: "Pensamiento Crítico",
        skillColor: "purple",
        level: 4,
      },
      {
        id: "qs-12-2",
        qerniumId: "qernium-12",
        subskillId: "subskill-3-2",
        subskillName: "Comunicación Oral",
        skillName: "Comunicación Efectiva",
        skillColor: "pink",
        level: 3,
      },
    ],
    content: [
      {
        id: "content-12-1",
        qerniumId: "qernium-12",
        title: "Dilemas Éticos en IA",
        description: "Casos de estudio y análisis",
        type: "document",
        content: {
          text: "El desarrollo y despliegue de sistemas de IA plantea numerosos dilemas éticos, desde la privacidad y el sesgo algorítmico hasta el desplazamiento laboral...",
        },
        order: 1,
      },
      {
        id: "content-12-2",
        qerniumId: "qernium-12",
        title: "Debate sobre Regulación de IA",
        description: "Actividad de discusión",
        type: "assignment",
        content: {
          instructions:
            "Prepara y participa en un debate sobre cómo deberían regularse los sistemas de IA, considerando diferentes perspectivas y argumentos.",
          deadline: "2025-07-20",
          submissionType: "presentation",
        },
        order: 2,
      },
    ],
    position: [9.8, -3.0, -7.5],
    qlusterId: "qluster-3",
  },
]

// Función para obtener Qerniums por Qluster
export function getQerniumsByQluster(qlusterId: string): Qernium[] {
  return mockQerniums.filter((qernium) => qernium.qlusterId === qlusterId)
}

// Función para obtener un Qernium por ID
export function getQerniumById(qerniumId: string): Qernium | undefined {
  return mockQerniums.find((qernium) => qernium.id === qerniumId)
}

// Función para obtener un Qluster por ID
export function getQlusterById(qlusterId: string): Qluster | undefined {
  return mockQlusters.find((qluster) => qluster.id === qlusterId)
}

// Función para obtener el progreso del estudiante (simulado)
export function getStudentProgress(): {
  completedQerniums: number
  totalQerniums: number
  skills: { name: string; level: number; color: string }[]
  achievements: { id: string; title: string; description: string; date: string; icon: string }[]
} {
  return {
    completedQerniums: 5,
    totalQerniums: 12,
    skills: [
      { name: "Pensamiento Crítico", level: 3, color: "purple" },
      { name: "Resolución de Problemas", level: 2, color: "cyan" },
      { name: "Comunicación Efectiva", level: 1, color: "pink" },
    ],
    achievements: [
      {
        id: "ach-1",
        title: "Primer Contacto",
        description: "Completaste tu primer Qernium",
        date: "2025-04-05",
        icon: "Star",
      },
      {
        id: "ach-2",
        title: "Explorador Cuántico",
        description: "Completaste todos los Qerniums de Física Cuántica",
        date: "2025-04-20",
        icon: "Atom",
      },
    ],
  }
}
