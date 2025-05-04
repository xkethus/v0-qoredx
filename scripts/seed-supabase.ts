import { createClient } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"

// Configuración para Supabase
const supabaseUrl = process.env.SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY || ""

// Cliente de Supabase con la clave de servicio para tener permisos completos
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedSupabaseDatabase() {
  try {
    console.log("Iniciando siembra de datos en Supabase...")

    // Crear institución de ejemplo
    const institutionId = uuidv4()
    const { error: institutionError } = await supabase
      .from("institutions")
      .insert({
        id: institutionId,
        name: "QoreEdu Institute",
        type: "organization",
        website: "https://qoreedu.com",
        address: "Av. Innovación 123, Ciudad Digital",
      })
      .select()

    if (institutionError) {
      console.error("Error al crear institución:", institutionError)
    }

    // Crear usuario administrador
    const adminId = uuidv4()
    const { error: adminError } = await supabase
      .from("users")
      .insert({
        id: adminId,
        name: "Admin QoreEdu",
        email: "admin@qoreedu.com",
        password: "$2a$10$GQf3sSLLrEp7v.JdPLFjz.hJJ0/0.tpyy6vMbA5L1JhZJ5q5XdZxO", // 'password123' hasheado
        role: "qoremaster",
        institution_id: institutionId,
      })
      .select()

    if (adminError) {
      console.error("Error al crear usuario admin:", adminError)
    }

    // Crear QorePlex de ejemplo
    const qorePlexId = uuidv4()
    const { error: qorePlexError } = await supabase
      .from("qore_plex")
      .insert({
        id: qorePlexId,
        name: "Ciencias Computacionales",
        description: "Programa de estudios en ciencias de la computación",
        code: "CS-PLEX",
        color: "purple",
        creator_id: adminId,
        institution_id: institutionId,
      })
      .select()

    if (qorePlexError) {
      console.error("Error al crear QorePlex:", qorePlexError)
    }

    // Crear Qernex de ejemplo
    const qernexId = uuidv4()
    const { error: qernexError } = await supabase
      .from("qernex")
      .insert({
        id: qernexId,
        qore_plex_id: qorePlexId,
        name: "Programación",
        description: "Área de aprendizaje enfocada en programación y desarrollo de software",
        code: "PROG-101",
        color: "cyan",
        creator_id: adminId,
      })
      .select()

    if (qernexError) {
      console.error("Error al crear Qernex:", qernexError)
    }

    // Crear Qluster de ejemplo
    const qlusterId = uuidv4()
    const { error: qlusterError } = await supabase
      .from("qlusters")
      .insert({
        id: qlusterId,
        qernex_id: qernexId,
        title: "Introducción a JavaScript",
        description: "Curso introductorio a la programación con JavaScript",
        status: "active",
        visibility: "public",
        color: "purple",
        creator_id: adminId,
      })
      .select()

    if (qlusterError) {
      console.error("Error al crear Qluster:", qlusterError)
    }

    // Crear módulos para el Qluster
    const moduleIds = [uuidv4(), uuidv4(), uuidv4()]
    const { error: modulesError } = await supabase
      .from("modules")
      .insert([
        {
          id: moduleIds[0],
          qluster_id: qlusterId,
          title: "Fundamentos de JavaScript",
          description: "Conceptos básicos del lenguaje",
          order: 1,
          creator_id: adminId,
        },
        {
          id: moduleIds[1],
          qluster_id: qlusterId,
          title: "Estructuras de control",
          description: "Condicionales y bucles",
          order: 2,
          creator_id: adminId,
        },
        {
          id: moduleIds[2],
          qluster_id: qlusterId,
          title: "Funciones y objetos",
          description: "Trabajando con funciones y objetos en JavaScript",
          order: 3,
          creator_id: adminId,
        },
      ])
      .select()

    if (modulesError) {
      console.error("Error al crear módulos:", modulesError)
    }

    // Crear Qerniums de ejemplo
    const qerniumIds = [uuidv4(), uuidv4(), uuidv4()]
    const { error: qerniumsError } = await supabase
      .from("qerniums")
      .insert([
        {
          id: qerniumIds[0],
          title: "Variables y tipos de datos",
          description: "Aprende sobre los diferentes tipos de datos en JavaScript",
          bloom_level: "understand",
          action_verb: "Identifica",
          status: "published",
          estimated_time: 30,
          creator_id: adminId,
        },
        {
          id: qerniumIds[1],
          title: "Operadores y expresiones",
          description: "Comprende cómo funcionan los operadores en JavaScript",
          bloom_level: "apply",
          action_verb: "Utiliza",
          status: "published",
          estimated_time: 45,
          creator_id: adminId,
        },
        {
          id: qerniumIds[2],
          title: "Funciones básicas",
          description: "Crea y utiliza funciones en JavaScript",
          bloom_level: "create",
          action_verb: "Desarrolla",
          status: "published",
          estimated_time: 60,
          creator_id: adminId,
        },
      ])
      .select()

    if (qerniumsError) {
      console.error("Error al crear qerniums:", qerniumsError)
    }

    // Asociar Qerniums a Qluster
    const { error: qlusterQerniumsError } = await supabase
      .from("qluster_qerniums")
      .insert([
        { qluster_id: qlusterId, qernium_id: qerniumIds[0], order: 1 },
        { qluster_id: qlusterId, qernium_id: qerniumIds[1], order: 2 },
        { qluster_id: qlusterId, qernium_id: qerniumIds[2], order: 3 },
      ])
      .select()

    if (qlusterQerniumsError) {
      console.error("Error al asociar qerniums a qluster:", qlusterQerniumsError)
    }

    // Crear contenidos para los Qerniums
    const contentIds = [uuidv4(), uuidv4(), uuidv4()]
    const { error: contentsError } = await supabase
      .from("contents")
      .insert([
        {
          id: contentIds[0],
          qernium_id: qerniumIds[0],
          title: "Introducción a variables",
          description: "Aprende a declarar y usar variables en JavaScript",
          type: "document",
          content: {
            blocks: [
              {
                type: "paragraph",
                data: {
                  text: "Las variables en JavaScript se declaran usando let, const o var.",
                },
              },
            ],
          },
          order: 1,
          creator_id: adminId,
        },
        {
          id: contentIds[1],
          qernium_id: qerniumIds[1],
          title: "Quiz sobre operadores",
          description: "Evalúa tu conocimiento sobre operadores",
          type: "quiz",
          content: {
            questions: [
              {
                question: "¿Qué devuelve 5 + '5' en JavaScript?",
                options: ["10", "'55'", "Error", "undefined"],
                correctAnswer: 1,
              },
            ],
          },
          order: 1,
          creator_id: adminId,
        },
        {
          id: contentIds[2],
          qernium_id: qerniumIds[2],
          title: "Creando funciones",
          description: "Aprende a crear y usar funciones",
          type: "document",
          content: {
            blocks: [
              {
                type: "paragraph",
                data: {
                  text: "Las funciones en JavaScript se pueden declarar de varias formas.",
                },
              },
            ],
          },
          order: 1,
          creator_id: adminId,
        },
      ])
      .select()

    if (contentsError) {
      console.error("Error al crear contenidos:", contentsError)
    }

    // Crear eventos de calendario
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const nextWeek = new Date(now)
    nextWeek.setDate(nextWeek.getDate() + 7)

    const { error: eventsError } = await supabase
      .from("calendar_events")
      .insert([
        {
          title: "Clase introductoria",
          description: "Primera clase del curso de JavaScript",
          start_date: now.toISOString(),
          end_date: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
          location: "Aula Virtual 1",
          type: "class",
          qluster_id: qlusterId,
          color: "purple",
          creator_id: adminId,
        },
        {
          title: "Evaluación de operadores",
          description: "Quiz sobre operadores en JavaScript",
          start_date: tomorrow.toISOString(),
          end_date: new Date(tomorrow.getTime() + 1 * 60 * 60 * 1000).toISOString(),
          location: "Aula Virtual 2",
          type: "test",
          qluster_id: qlusterId,
          color: "cyan",
          creator_id: adminId,
        },
        {
          title: "Proyecto final",
          description: "Entrega del proyecto final",
          start_date: nextWeek.toISOString(),
          end_date: new Date(nextWeek.getTime() + 3 * 60 * 60 * 1000).toISOString(),
          location: "Aula Virtual 3",
          type: "assignment",
          qluster_id: qlusterId,
          color: "pink",
          creator_id: adminId,
        },
      ])
      .select()

    if (eventsError) {
      console.error("Error al crear eventos de calendario:", eventsError)
    }

    console.log("Datos sembrados exitosamente en Supabase")
    return { success: true }
  } catch (error) {
    console.error("Error al sembrar datos en Supabase:", error)
    return { success: false, error }
  }
}

// Ejecutar la función si este archivo se ejecuta directamente
if (require.main === module) {
  seedSupabaseDatabase()
    .then((result) => {
      if (result.success) {
        console.log("Datos sembrados correctamente en Supabase")
        process.exit(0)
      } else {
        console.error("Error al sembrar datos en Supabase:", result.error)
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error("Error inesperado:", error)
      process.exit(1)
    })
}

export default seedSupabaseDatabase
