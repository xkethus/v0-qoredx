import { sql } from "../lib/db"
import { v4 as uuidv4 } from "uuid"

async function seedDatabase() {
  try {
    console.log("Iniciando siembra de datos...")

    // Crear institución de ejemplo
    const institutionId = uuidv4()
    await sql`
      INSERT INTO institutions (id, name, type, website, address)
      VALUES (
        ${institutionId},
        'QoreEdu Institute',
        'organization',
        'https://qoreedu.com',
        'Av. Innovación 123, Ciudad Digital'
      )
      ON CONFLICT DO NOTHING
    `

    // Crear usuario administrador
    const adminId = uuidv4()
    await sql`
      INSERT INTO users (id, name, email, password, role, institution_id)
      VALUES (
        ${adminId},
        'Admin QoreEdu',
        'admin@qoreedu.com',
        '$2a$10$GQf3sSLLrEp7v.JdPLFjz.hJJ0/0.tpyy6vMbA5L1JhZJ5q5XdZxO', -- 'password123' hasheado
        'qoremaster',
        ${institutionId}
      )
      ON CONFLICT (email) DO NOTHING
    `

    // Crear QorePlex de ejemplo
    const qorePlexId = uuidv4()
    await sql`
      INSERT INTO qore_plex (id, name, description, code, color, creator_id, institution_id)
      VALUES (
        ${qorePlexId},
        'Ciencias Computacionales',
        'Programa de estudios en ciencias de la computación',
        'CS-PLEX',
        'purple',
        ${adminId},
        ${institutionId}
      )
      ON CONFLICT DO NOTHING
    `

    // Crear Qernex de ejemplo
    const qernexId = uuidv4()
    await sql`
      INSERT INTO qernex (id, qore_plex_id, name, description, code, color, creator_id)
      VALUES (
        ${qernexId},
        ${qorePlexId},
        'Programación',
        'Área de aprendizaje enfocada en programación y desarrollo de software',
        'PROG-101',
        'cyan',
        ${adminId}
      )
      ON CONFLICT DO NOTHING
    `

    // Crear Qluster de ejemplo
    const qlusterId = uuidv4()
    await sql`
      INSERT INTO qlusters (id, qernex_id, title, description, status, visibility, color, creator_id)
      VALUES (
        ${qlusterId},
        ${qernexId},
        'Introducción a JavaScript',
        'Curso introductorio a la programación con JavaScript',
        'active',
        'public',
        'purple',
        ${adminId}
      )
      ON CONFLICT DO NOTHING
    `

    // Crear módulos para el Qluster
    const moduleIds = [uuidv4(), uuidv4(), uuidv4()]
    await sql`
      INSERT INTO modules (id, qluster_id, title, description, "order", creator_id)
      VALUES 
        (
          ${moduleIds[0]},
          ${qlusterId},
          'Fundamentos de JavaScript',
          'Conceptos básicos del lenguaje',
          1,
          ${adminId}
        ),
        (
          ${moduleIds[1]},
          ${qlusterId},
          'Estructuras de control',
          'Condicionales y bucles',
          2,
          ${adminId}
        ),
        (
          ${moduleIds[2]},
          ${qlusterId},
          'Funciones y objetos',
          'Trabajando con funciones y objetos en JavaScript',
          3,
          ${adminId}
        )
      ON CONFLICT DO NOTHING
    `

    // Crear Qerniums de ejemplo
    const qerniumIds = [uuidv4(), uuidv4(), uuidv4()]
    await sql`
      INSERT INTO qerniums (id, title, description, bloom_level, action_verb, status, estimated_time, creator_id)
      VALUES 
        (
          ${qerniumIds[0]},
          'Variables y tipos de datos',
          'Aprende sobre los diferentes tipos de datos en JavaScript',
          'understand',
          'Identifica',
          'published',
          30,
          ${adminId}
        ),
        (
          ${qerniumIds[1]},
          'Operadores y expresiones',
          'Comprende cómo funcionan los operadores en JavaScript',
          'apply',
          'Utiliza',
          'published',
          45,
          ${adminId}
        ),
        (
          ${qerniumIds[2]},
          'Funciones básicas',
          'Crea y utiliza funciones en JavaScript',
          'create',
          'Desarrolla',
          'published',
          60,
          ${adminId}
        )
      ON CONFLICT DO NOTHING
    `

    // Asociar Qerniums a Qluster
    await sql`
      INSERT INTO qluster_qerniums (qluster_id, qernium_id, "order")
      VALUES 
        (${qlusterId}, ${qerniumIds[0]}, 1),
        (${qlusterId}, ${qerniumIds[1]}, 2),
        (${qlusterId}, ${qerniumIds[2]}, 3)
      ON CONFLICT DO NOTHING
    `

    // Crear contenidos para los Qerniums
    const contentIds = [uuidv4(), uuidv4(), uuidv4()]
    await sql`
      INSERT INTO contents (id, qernium_id, title, description, type, content, "order", creator_id)
      VALUES 
        (
          ${contentIds[0]},
          ${qerniumIds[0]},
          'Introducción a variables',
          'Aprende a declarar y usar variables en JavaScript',
          'document',
          ${{
            blocks: [
              {
                type: "paragraph",
                data: {
                  text: "Las variables en JavaScript se declaran usando let, const o var.",
                },
              },
            ],
          }}::jsonb,
          1,
          ${adminId}
        ),
        (
          ${contentIds[1]},
          ${qerniumIds[1]},
          'Quiz sobre operadores',
          'Evalúa tu conocimiento sobre operadores',
          'quiz',
          ${{
            questions: [
              {
                question: "¿Qué devuelve 5 + '5' en JavaScript?",
                options: ["10", "'55'", "Error", "undefined"],
                correctAnswer: 1,
              },
            ],
          }}::jsonb,
          1,
          ${adminId}
        ),
        (
          ${contentIds[2]},
          ${qerniumIds[2]},
          'Creando funciones',
          'Aprende a crear y usar funciones',
          'document',
          ${{
            blocks: [
              {
                type: "paragraph",
                data: {
                  text: "Las funciones en JavaScript se pueden declarar de varias formas.",
                },
              },
            ],
          }}::jsonb,
          1,
          ${adminId}
        )
      ON CONFLICT DO NOTHING
    `

    // Crear eventos de calendario
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const nextWeek = new Date(now)
    nextWeek.setDate(nextWeek.getDate() + 7)

    await sql`
      INSERT INTO calendar_events (title, description, start_date, end_date, location, type, qluster_id, color, creator_id)
      VALUES 
        (
          'Clase introductoria',
          'Primera clase del curso de JavaScript',
          ${now.toISOString()},
          ${new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString()},
          'Aula Virtual 1',
          'class',
          ${qlusterId},
          'purple',
          ${adminId}
        ),
        (
          'Evaluación de operadores',
          'Quiz sobre operadores en JavaScript',
          ${tomorrow.toISOString()},
          ${new Date(tomorrow.getTime() + 1 * 60 * 60 * 1000).toISOString()},
          'Aula Virtual 2',
          'test',
          ${qlusterId},
          'cyan',
          ${adminId}
        ),
        (
          'Proyecto final',
          'Entrega del proyecto final',
          ${nextWeek.toISOString()},
          ${new Date(nextWeek.getTime() + 3 * 60 * 60 * 1000).toISOString()},
          'Aula Virtual 3',
          'assignment',
          ${qlusterId},
          'pink',
          ${adminId}
        )
      ON CONFLICT DO NOTHING
    `

    console.log("Datos sembrados exitosamente")
    return { success: true }
  } catch (error) {
    console.error("Error al sembrar datos:", error)
    return { success: false, error }
  }
}

// Ejecutar la función si este archivo se ejecuta directamente
if (require.main === module) {
  seedDatabase()
    .then((result) => {
      if (result.success) {
        console.log("Datos sembrados correctamente")
        process.exit(0)
      } else {
        console.error("Error al sembrar datos:", result.error)
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error("Error inesperado:", error)
      process.exit(1)
    })
}

export default seedDatabase
