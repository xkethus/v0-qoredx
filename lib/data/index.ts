// Archivo principal para exportar todos los datos
import qerniums from "./qerniums.json"
import qlusters from "./qlusters.json"
import skills from "./skills.json"
import contents from "./contents.json"
import bloomTaxonomy from "./bloom-taxonomy.json"
import contentTypes from "./content-types.json"

// Tipos exportados para usar en toda la aplicación
export type BloomLevel = "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create"
export type QerniumStatus = "draft" | "published" | "archived"
export type QlusterStatus = "draft" | "scheduled" | "active" | "completed" | "archived"
export type QlusterVisibility = "private" | "public" | "restricted"
export type ContentType = "document" | "video" | "quiz" | "assignment"
export type ContentTypeQernium = "texto" | "video" | "enlace" | "tarea" | "quiz" | "document"
export type MediaType = "image" | "video" | "audio" | "none"

// Interfaces para los datos
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
  contentIds: string[] // IDs de contenido asociado
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

export interface QuizQuestion {
  id: string
  type: "single" | "multiple" | "short" | "long" | "media"
  text: string
  richText?: string
  options: QuestionOption[]
  correctAnswer?: string
  mediaType: MediaType
  mediaUrl?: string
  points: number
}

export interface QuestionOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface Qluster {
  id: string
  title: string
  description: string
  startDate?: string
  endDate?: string
  status: QlusterStatus
  visibility: QlusterVisibility
  color: string
  coverImage?: string
  autoEnroll?: boolean
  sequentialProgress?: boolean
  certificate?: boolean
  creatorId: string
  creatorName: string
  qerniumIds: string[] // IDs de Qerniums
  progress?: number // Para estudiantes
  position?: [number, number, number] // Para visualización 3D
}

// Funciones de utilidad para acceder a los datos

// Obtener todos los qerniums
export function getAllQerniums(): Qernium[] {
  return qerniums
}

// Obtener un qernium por ID
export function getQerniumById(id: string): Qernium | undefined {
  return qerniums.find((q) => q.id === id)
}

// Obtener qerniums por qluster
export function getQerniumsByQluster(qlusterId: string): Qernium[] {
  return qerniums.filter((q) => q.qlusterId === qlusterId)
}

// Obtener todos los qlusters
export function getAllQlusters(): Qluster[] {
  return qlusters
}

// Obtener un qluster por ID
export function getQlusterById(id: string): Qluster | undefined {
  return qlusters.find((q) => q.id === id)
}

// Obtener todas las skills
export function getAllSkills(): Skill[] {
  return skills
}

// Obtener una skill por ID
export function getSkillById(id: string): Skill | undefined {
  return skills.find((s) => s.id === id)
}

// Obtener todos los contenidos
export function getAllContents(): QerniumContent[] {
  return contents
}

// Obtener contenido por ID
export function getContentById(id: string): QerniumContent | undefined {
  return contents.find((c) => c.id === id)
}

// Obtener contenidos por qernium
export function getContentsByQernium(qerniumId: string): QerniumContent[] {
  return contents.filter((c) => c.qerniumId === qerniumId)
}

// Obtener niveles de Bloom
export function getBloomTaxonomy() {
  return bloomTaxonomy
}

// Obtener tipos de contenido
export function getContentTypes() {
  return contentTypes
}

// Exportar los datos directamente
export { qerniums, qlusters, skills, contents, bloomTaxonomy, contentTypes }
