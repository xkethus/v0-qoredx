import { sql } from "../lib/db"

async function initDatabase() {
  try {
    console.log("Iniciando creación de tablas...")

    // Crear enums
    await sql`
      DO $$ BEGIN
        CREATE TYPE IF NOT EXISTS qernium_status AS ENUM ('draft', 'published', 'archived');
        CREATE TYPE IF NOT EXISTS qluster_status AS ENUM ('draft', 'scheduled', 'active', 'completed', 'archived');
        CREATE TYPE IF NOT EXISTS qluster_visibility AS ENUM ('private', 'public', 'restricted');
        CREATE TYPE IF NOT EXISTS content_type AS ENUM ('document', 'video', 'quiz', 'assignment');
        CREATE TYPE IF NOT EXISTS student_status AS ENUM ('active', 'warning', 'inactive');
        CREATE TYPE IF NOT EXISTS bloom_taxonomy_level AS ENUM ('remember', 'understand', 'apply', 'analyze', 'evaluate', 'create');
        CREATE TYPE IF NOT EXISTS user_role AS ENUM ('qorexplorer', 'qoremaster', 'qorescout');
        CREATE TYPE IF NOT EXISTS institution_type AS ENUM ('school', 'university', 'organization', 'company');
      EXCEPTION
        WHEN duplicate_object THEN
          NULL;
      END $$;
    `

    // Crear tablas
    await sql`
      -- Institutions
      CREATE TABLE IF NOT EXISTS institutions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        type institution_type NOT NULL,
        logo TEXT,
        website TEXT,
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Users
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role user_role NOT NULL,
        institution_id UUID REFERENCES institutions(id),
        avatar TEXT,
        bio TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- QorePlex
      CREATE TABLE IF NOT EXISTS qore_plex (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        code TEXT NOT NULL,
        color TEXT DEFAULT 'purple',
        creator_id UUID REFERENCES users(id),
        institution_id UUID REFERENCES institutions(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Qernex
      CREATE TABLE IF NOT EXISTS qernex (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qore_plex_id UUID NOT NULL REFERENCES qore_plex(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        description TEXT,
        code TEXT NOT NULL,
        color TEXT DEFAULT 'cyan',
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Qlusters
      CREATE TABLE IF NOT EXISTS qlusters (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qernex_id UUID NOT NULL REFERENCES qernex(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        start_date TIMESTAMP,
        end_date TIMESTAMP,
        status qluster_status DEFAULT 'draft',
        visibility qluster_visibility DEFAULT 'private',
        color TEXT DEFAULT 'purple',
        auto_enroll BOOLEAN DEFAULT FALSE,
        sequential_progress BOOLEAN DEFAULT FALSE,
        certificate BOOLEAN DEFAULT FALSE,
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Skills
      CREATE TABLE IF NOT EXISTS skills (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        color TEXT DEFAULT 'purple',
        institution_id UUID REFERENCES institutions(id),
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Subskills
      CREATE TABLE IF NOT EXISTS subskills (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        skill_id UUID NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        description TEXT,
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Qerniums
      CREATE TABLE IF NOT EXISTS qerniums (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        bloom_level bloom_taxonomy_level NOT NULL,
        action_verb TEXT NOT NULL,
        status qernium_status DEFAULT 'draft',
        estimated_time INTEGER,
        prerequisites JSONB,
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Qluster Qerniums
      CREATE TABLE IF NOT EXISTS qluster_qerniums (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qluster_id UUID NOT NULL REFERENCES qlusters(id) ON DELETE CASCADE,
        qernium_id UUID NOT NULL REFERENCES qerniums(id) ON DELETE CASCADE,
        "order" INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      -- Contents
      CREATE TABLE IF NOT EXISTS contents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qernium_id UUID NOT NULL REFERENCES qerniums(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        type content_type NOT NULL,
        content JSONB,
        "order" INTEGER NOT NULL,
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Qernium Skills
      CREATE TABLE IF NOT EXISTS qernium_skills (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qernium_id UUID NOT NULL REFERENCES qerniums(id) ON DELETE CASCADE,
        subskill_id UUID NOT NULL REFERENCES subskills(id) ON DELETE CASCADE,
        level INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Classes
      CREATE TABLE IF NOT EXISTS classes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        schedule TEXT,
        institution_id UUID REFERENCES institutions(id),
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Students
      CREATE TABLE IF NOT EXISTS students (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        status student_status DEFAULT 'active',
        user_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Course Classes
      CREATE TABLE IF NOT EXISTS course_classes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qluster_id UUID NOT NULL REFERENCES qlusters(id) ON DELETE CASCADE,
        class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
      );

      -- Course Students
      CREATE TABLE IF NOT EXISTS course_students (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qluster_id UUID NOT NULL REFERENCES qlusters(id) ON DELETE CASCADE,
        student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        progress INTEGER DEFAULT 0,
        last_active TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Qernium Responses
      CREATE TABLE IF NOT EXISTS qernium_responses (
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
      );

      -- Qernium Progress
      CREATE TABLE IF NOT EXISTS qernium_progress (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qernium_id UUID NOT NULL REFERENCES qerniums(id) ON DELETE CASCADE,
        student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        completed BOOLEAN DEFAULT FALSE,
        score INTEGER,
        completed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Calendar Events
      CREATE TABLE IF NOT EXISTS calendar_events (
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
      );

      -- Modules
      CREATE TABLE IF NOT EXISTS modules (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        qluster_id UUID NOT NULL REFERENCES qlusters(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        "order" INTEGER NOT NULL,
        creator_id UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `

    console.log("Tablas creadas exitosamente")
    return { success: true }
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error)
    return { success: false, error }
  }
}

// Ejecutar la función si este archivo se ejecuta directamente
if (require.main === module) {
  initDatabase()
    .then((result) => {
      if (result.success) {
        console.log("Base de datos inicializada correctamente")
        process.exit(0)
      } else {
        console.error("Error al inicializar la base de datos:", result.error)
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error("Error inesperado:", error)
      process.exit(1)
    })
}

export default initDatabase
