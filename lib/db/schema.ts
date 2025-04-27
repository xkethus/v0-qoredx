import { pgTable, text, timestamp, uuid, boolean, integer, json, pgEnum, decimal } from "drizzle-orm/pg-core"

// Enums
export const qerniumStatusEnum = pgEnum("qernium_status", ["draft", "published", "archived"])
export const qlusterStatusEnum = pgEnum("qluster_status", ["draft", "scheduled", "active", "completed", "archived"])
export const qlusterVisibilityEnum = pgEnum("qluster_visibility", ["private", "public", "restricted"])
export const contentTypeEnum = pgEnum("content_type", ["document", "video", "quiz", "assignment"])
export const studentStatusEnum = pgEnum("student_status", ["active", "warning", "inactive"])
export const bloomTaxonomyLevelEnum = pgEnum("bloom_taxonomy_level", [
  "remember", // Recordar
  "understand", // Comprender
  "apply", // Aplicar
  "analyze", // Analizar
  "evaluate", // Evaluar
  "create", // Crear
])
export const userRoleEnum = pgEnum("user_role", ["qorexplorer", "qoremaster", "qorescout"])
export const institutionTypeEnum = pgEnum("institution_type", ["school", "university", "organization", "company"])

// Users
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: userRoleEnum("role").notNull(),
  institutionId: uuid("institution_id").references(() => institutions.id),
  avatar: text("avatar"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Institutions (Schools, Universities, etc.)
export const institutions = pgTable("institutions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  type: institutionTypeEnum("type").notNull(),
  logo: text("logo"),
  website: text("website"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// QorePlex (Macroestructura del Aprendizaje)
export const qorePlex = pgTable("qore_plex", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  code: text("code").notNull(),
  color: text("color").default("purple"),
  coverImage: text("cover_image"), // Imagen de portada
  creatorId: uuid("creator_id").references(() => users.id),
  institutionId: uuid("institution_id").references(() => institutions.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Qernex (Áreas de Aprendizaje)
export const qernex = pgTable("qernex", {
  id: uuid("id").defaultRandom().primaryKey(),
  qorePlexId: uuid("qore_plex_id")
    .notNull()
    .references(() => qorePlex.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  code: text("code").notNull(),
  color: text("color").default("cyan"),
  coverImage: text("cover_image"), // Imagen de portada
  creatorId: uuid("creator_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Qlusters (Bloques Temáticos) - Equivalente a los antiguos "courses"
export const qlusters = pgTable("qlusters", {
  id: uuid("id").defaultRandom().primaryKey(),
  qernexId: uuid("qernex_id")
    .notNull()
    .references(() => qernex.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  status: qlusterStatusEnum("status").default("draft"),
  visibility: qlusterVisibilityEnum("visibility").default("private"),
  color: text("color").default("purple"),
  coverImage: text("cover_image"), // Imagen de portada
  autoEnroll: boolean("auto_enroll").default(false),
  sequentialProgress: boolean("sequential_progress").default(false),
  certificate: boolean("certificate").default(false),
  creatorId: uuid("creator_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Skills (Habilidades)
export const skills = pgTable("skills", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  color: text("color").default("purple"),
  coverImage: text("cover_image"), // Imagen de portada
  institutionId: uuid("institution_id").references(() => institutions.id),
  creatorId: uuid("creator_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Subskills (Subhabilidades)
export const subskills = pgTable("subskills", {
  id: uuid("id").defaultRandom().primaryKey(),
  skillId: uuid("skill_id")
    .notNull()
    .references(() => skills.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  creatorId: uuid("creator_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Qerniums (Unidades de Aprendizaje Específicas)
export const qerniums = pgTable("qerniums", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  bloomLevel: bloomTaxonomyLevelEnum("bloom_level").notNull(),
  actionVerb: text("action_verb").notNull(), // Ej: "Identifica", "Analiza", "Evalúa"
  status: qerniumStatusEnum("status").default("draft"),
  estimatedTime: integer("estimated_time"), // Tiempo estimado en minutos
  prerequisites: json("prerequisites"), // Array de IDs de Qerniums prerequisitos
  coverImage: text("cover_image"), // Imagen de portada
  creatorId: uuid("creator_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Relación muchos a muchos entre Qlusters y Qerniums
export const qlusterQerniums = pgTable("qluster_qerniums", {
  id: uuid("id").defaultRandom().primaryKey(),
  qlusterId: uuid("qluster_id")
    .notNull()
    .references(() => qlusters.id, { onDelete: "cascade" }),
  qerniumId: uuid("qernium_id")
    .notNull()
    .references(() => qerniums.id, { onDelete: "cascade" }),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
})

// Contenidos asociados a Qerniums
export const contents = pgTable("contents", {
  id: uuid("id").defaultRandom().primaryKey(),
  qerniumId: uuid("qernium_id")
    .notNull()
    .references(() => qerniums.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  type: contentTypeEnum("type").notNull(),
  content: json("content"),
  order: integer("order").notNull(),
  coverImage: text("cover_image"), // Imagen de portada para contenidos
  creatorId: uuid("creator_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Relación entre Qerniums y Skills/Subskills
export const qerniumSkills = pgTable("qernium_skills", {
  id: uuid("id").defaultRandom().primaryKey(),
  qerniumId: uuid("qernium_id")
    .notNull()
    .references(() => qerniums.id, { onDelete: "cascade" }),
  subskillId: uuid("subskill_id")
    .notNull()
    .references(() => subskills.id, { onDelete: "cascade" }),
  level: integer("level").notNull().default(0), // Valor del 0 al 4
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Respuestas de los estudiantes a los Qerniums
export const qerniumResponses = pgTable("qernium_responses", {
  id: uuid("id").defaultRandom().primaryKey(),
  qerniumId: uuid("qernium_id")
    .notNull()
    .references(() => qerniums.id, { onDelete: "cascade" }),
  contentId: uuid("content_id")
    .notNull()
    .references(() => contents.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  response: json("response"), // Respuestas a preguntas, etc.
  score: decimal("score", { precision: 5, scale: 2 }),
  feedback: text("feedback"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Clases (grupos de estudiantes) - Mantenemos esta tabla sin cambios
export const classes = pgTable("classes", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull(),
  schedule: text("schedule"),
  institutionId: uuid("institution_id").references(() => institutions.id),
  creatorId: uuid("creator_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Estudiantes (QoreXplorers) - Mantenemos esta tabla sin cambios
export const students = pgTable("students", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  status: studentStatusEnum("status").default("active"),
  userId: uuid("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Relación entre Qlusters y Clases
export const courseClasses = pgTable("course_classes", {
  id: uuid("id").defaultRandom().primaryKey(),
  qlusterId: uuid("qluster_id")
    .notNull()
    .references(() => qlusters.id, { onDelete: "cascade" }),
  classId: uuid("class_id")
    .notNull()
    .references(() => classes.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
})

// Relación entre Qlusters y Estudiantes
export const courseStudents = pgTable("course_students", {
  id: uuid("id").defaultRandom().primaryKey(),
  qlusterId: uuid("qluster_id")
    .notNull()
    .references(() => qlusters.id, { onDelete: "cascade" }),
  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  progress: integer("progress").default(0),
  lastActive: timestamp("last_active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Progreso de los estudiantes en los Qerniums
export const qerniumProgress = pgTable("qernium_progress", {
  id: uuid("id").defaultRandom().primaryKey(),
  qerniumId: uuid("qernium_id")
    .notNull()
    .references(() => qerniums.id, { onDelete: "cascade" }),
  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "cascade" }),
  completed: boolean("completed").default(false),
  score: integer("score"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Eventos del calendario
export const calendarEvents = pgTable("calendar_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  location: text("location"),
  type: text("type").notNull(), // class, test, meeting, etc.
  qlusterId: uuid("qluster_id").references(() => qlusters.id, { onDelete: "set null" }),
  classId: uuid("class_id").references(() => classes.id, { onDelete: "set null" }),
  color: text("color").default("purple"),
  creatorId: uuid("creator_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Módulos (unidades dentro de un Qluster)
export const modules = pgTable("modules", {
  id: uuid("id").defaultRandom().primaryKey(),
  qlusterId: uuid("qluster_id")
    .notNull()
    .references(() => qlusters.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull(),
  coverImage: text("cover_image"), // Imagen de portada para módulos
  creatorId: uuid("creator_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Alias para compatibilidad con código existente
export const courses = qlusters
