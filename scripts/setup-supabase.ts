import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

// Configuración para Supabase
const supabaseUrl = process.env.SUPABASE_SUPABASE_URL || process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY || ""

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Error: Variables de entorno de Supabase no configuradas")
  process.exit(1)
}

// Cliente de Supabase con la clave de servicio para tener permisos completos
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupSupabase() {
  try {
    console.log("Iniciando configuración de Supabase...")

    // Verificar conexión
    const { error: connectionError } = await supabase
      .from("_dummy_query")
      .select()
      .limit(1)
      .catch(() => ({ error: null }))
    if (connectionError && connectionError.code !== "PGRST116") {
      console.error("Error al conectar a Supabase:", connectionError)
      return { success: false, error: connectionError }
    }

    console.log("Conexión a Supabase establecida correctamente")

    // Crear enums usando SQL raw
    console.log("Creando tipos enumerados...")
    const enums = [
      `CREATE TYPE IF NOT EXISTS qernium_status AS ENUM ('draft', 'published', 'archived');`,
      `CREATE TYPE IF NOT EXISTS qluster_status AS ENUM ('draft', 'scheduled', 'active', 'completed', 'archived');`,
      `CREATE TYPE IF NOT EXISTS qluster_visibility AS ENUM ('private', 'public', 'restricted');`,
      `CREATE TYPE IF NOT EXISTS content_type AS ENUM ('document', 'video', 'quiz', 'assignment');`,
      `CREATE TYPE IF NOT EXISTS student_status AS ENUM ('active', 'warning', 'inactive');`,
      `CREATE TYPE IF NOT EXISTS bloom_taxonomy_level AS ENUM ('remember', 'understand', 'apply', 'analyze', 'evaluate', 'create');`,
      `CREATE TYPE IF NOT EXISTS user_role AS ENUM ('qorexplorer', 'qoremaster', 'qorescout');`,
      `CREATE TYPE IF NOT EXISTS institution_type AS ENUM ('school', 'university', 'organization', 'company');`,
    ]

    for (const enumSql of enums) {
      const { error } = await supabase.rpc("exec", { query: enumSql }).catch(() => ({ error: null }))
      if (error) {
        console.warn(`Advertencia al crear enum: ${error.message}`)
      }
    }

    // Crear tablas usando SQL raw
    console.log("Creando tablas...")
    const tables = [
      // Institutions
      `CREATE TABLE IF NOT EXISTS institutions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        logo TEXT,
        website TEXT,
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Users
      `CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        institution_id UUID REFERENCES institutions(id),
        avatar TEXT,
        bio TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // QorePlex
      `CREATE TABLE IF NOT EXISTS qore_plex (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        code TEXT NOT NULL,
        color TEXT DEFAULT 'purple',
        creator_id UUID REFERENCES users(id),
        institution_id UUID REFERENCES institutions(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Qernex
      `CREATE TABLE IF NOT EXISTS qernex (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qore_plex_id UUID NOT NULL REFERENCES qore_plex(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        description TEXT,
        code TEXT NOT NULL,
        color TEXT DEFAULT 'cyan',
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Qlusters
      `CREATE TABLE IF NOT EXISTS qlusters (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qernex_id UUID NOT NULL REFERENCES qernex(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        start_date TIMESTAMP,
        end_date TIMESTAMP,
        status TEXT DEFAULT 'draft',
        visibility TEXT DEFAULT 'private',
        color TEXT DEFAULT 'purple',
        auto_enroll BOOLEAN DEFAULT FALSE,
        sequential_progress BOOLEAN DEFAULT FALSE,
        certificate BOOLEAN DEFAULT FALSE,
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Skills
      `CREATE TABLE IF NOT EXISTS skills (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        color TEXT DEFAULT 'purple',
        institution_id UUID REFERENCES institutions(id),
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Subskills
      `CREATE TABLE IF NOT EXISTS subskills (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        description TEXT,
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Qerniums
      `CREATE TABLE IF NOT EXISTS qerniums (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        bloom_level TEXT NOT NULL,
        action_verb TEXT NOT NULL,
        status TEXT DEFAULT 'draft',
        estimated_time INTEGER,
        prerequisites JSONB,
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Qluster Qerniums
      `CREATE TABLE IF NOT EXISTS qluster_qerniums (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qluster_id UUID NOT NULL REFERENCES qlusters(id) ON DELETE CASCADE,
        qernium_id UUID NOT NULL REFERENCES qerniums(id) ON DELETE CASCADE,
        "order" INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );`,

      // Contents
      `CREATE TABLE IF NOT EXISTS contents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qernium_id UUID NOT NULL REFERENCES qerniums(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL,
        content JSONB,
        "order" INTEGER NOT NULL,
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Qernium Skills
      `CREATE TABLE IF NOT EXISTS qernium_skills (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qernium_id UUID NOT NULL REFERENCES qerniums(id) ON DELETE CASCADE,
        subskill_id UUID NOT NULL REFERENCES subskills(id) ON DELETE CASCADE,
        level INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Classes
      `CREATE TABLE IF NOT EXISTS classes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        schedule TEXT,
        institution_id UUID REFERENCES institutions(id),
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Students
      `CREATE TABLE IF NOT EXISTS students (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        status TEXT DEFAULT 'active',
        user_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Course Classes
      `CREATE TABLE IF NOT EXISTS course_classes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qluster_id UUID NOT NULL REFERENCES qlusters(id) ON DELETE CASCADE,
        class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
      );`,

      // Course Students
      `CREATE TABLE IF NOT EXISTS course_students (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qluster_id UUID NOT NULL REFERENCES qlusters(id) ON DELETE CASCADE,
        student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        progress INTEGER DEFAULT 0,
        last_active TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Qernium Responses
      `CREATE TABLE IF NOT EXISTS qernium_responses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qernium_id UUID NOT NULL REFERENCES qerniums(id) ON DELETE CASCADE,
        content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        response JSONB,
        score DECIMAL(5,2),
        feedback TEXT,
        completed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Qernium Progress
      `CREATE TABLE IF NOT EXISTS qernium_progress (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qernium_id UUID NOT NULL REFERENCES qerniums(id) ON DELETE CASCADE,
        student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        completed BOOLEAN DEFAULT FALSE,
        score INTEGER,
        completed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Calendar Events
      `CREATE TABLE IF NOT EXISTS calendar_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP,
        location TEXT,
        type TEXT NOT NULL,
        qluster_id UUID REFERENCES qlusters(id) ON DELETE SET NULL,
        class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
        color TEXT DEFAULT 'purple',
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,

      // Modules
      `CREATE TABLE IF NOT EXISTS modules (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qluster_id UUID NOT NULL REFERENCES qlusters(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        "order" INTEGER NOT NULL,
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );`,
    ]

    for (const tableSql of tables) {
      const { error } = await supabase.rpc("exec", { query: tableSql }).catch(() => ({ error: null }))
      if (error) {
        console.warn(`Advertencia al crear tabla: ${error.message}`)
      }
    }

    // Crear datos de ejemplo
    console.log("Creando datos de ejemplo...")

    // Verificar si ya existen datos
    const { data: existingUsers, error: usersError } = await supabase.from("users").select("id").limit(1)

    if (usersError) {
      console.error("Error al verificar usuarios existentes:", usersError)
    }

    if (existingUsers && existingUsers.length > 0) {
      console.log("Ya existen datos en la base de datos, omitiendo la creación de datos de ejemplo")
      return {
        success: true,
        message: "Configuración completada. Se omitió la creación de datos de ejemplo porque ya existen.",
      }
    }

    // Crear institución de ejemplo
    const institutionId = uuidv4()
    const { error: institutionError } = await supabase.from("institutions").insert({
      id: institutionId,
      name: "QoreEdu Institute",
      type: "organization",
      website: "https://qoreedu.com",
      address: "Av. Innovación 123, Ciudad Digital",
    })

    if (institutionError) {
      console.error("Error al crear institución:", institutionError)
    }

    // Crear usuario administrador
    const adminId = uuidv4()
    const { error: adminError } = await supabase.from("users").insert({
      id: adminId,
      name: "Admin QoreEdu",
      email: "admin@qoreedu.com",
      password: "$2a$10$GQf3sSLLrEp7v.JdPLFjz.hJJ0/0.tpyy6vMbA5L1JhZJ5q5XdZxO", // 'password123' hasheado
      role: "qoremaster",
      institution_id: institutionId,
    })

    if (adminError) {
      console.error("Error al crear usuario admin:", adminError)
    }

    // Crear QorePlex de ejemplo
    const qorePlexId = uuidv4()
    const { error: qorePlexError } = await supabase.from("qore_plex").insert({
      id: qorePlexId,
      name: "Ciencias Computacionales",
      description: "Programa de estudios en ciencias de la computación",
      code: "CS-PLEX",
      color: "purple",
      creator_id: adminId,
      institution_id: institutionId,
    })

    if (qorePlexError) {
      console.error("Error al crear QorePlex:", qorePlexError)
    }

    // Crear Qernex de ejemplo
    const qernexId = uuidv4()
    const { error: qernexError } = await supabase.from("qernex").insert({
      id: qernexId,
      qore_plex_id: qorePlexId,
      name: "Programación",
      description: "Área de aprendizaje enfocada en programación y desarrollo de software",
      code: "PROG-101",
      color: "cyan",
      creator_id: adminId,
    })

    if (qernexError) {
      console.error("Error al crear Qernex:", qernexError)
    }

    // Crear Qluster de ejemplo
    const qlusterId = uuidv4()
    const { error: qlusterError } = await supabase.from("qlusters").insert({
      id: qlusterId,
      qernex_id: qernexId,
      title: "Introducción a JavaScript",
      description: "Curso introductorio a la programación con JavaScript",
      status: "active",
      visibility: "public",
      color: "purple",
      creator_id: adminId,
    })

    if (qlusterError) {
      console.error("Error al crear Qluster:", qlusterError)
    }

    console.log("Configuración de Supabase completada exitosamente")
    return { success: true, message: "Configuración de Supabase completada exitosamente" }
  } catch (error) {
    console.error("Error al configurar Supabase:", error)
    return { success: false, error }
  }
}

// Ejecutar la función si este archivo se ejecuta directamente
if (require.main === module) {
  setupSupabase()
    .then((result) => {
      if (result.success) {
        console.log(result.message)
        process.exit(0)
      } else {
        console.error("Error al configurar Supabase:", result.error)
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error("Error inesperado:", error)
      process.exit(1)
    })
}

export default setupSupabase
