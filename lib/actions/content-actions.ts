"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

const sql = neon(process.env.DATABASE_URL!)

type ContentType = "document" | "video" | "quiz" | "assignment"

interface ContentData {
  moduleId: string
  title: string
  description: string
  type: ContentType
  content: any
  order: number
}

export async function createContent(data: ContentData) {
  try {
    // En una implementación real, validaríamos los datos y manejaríamos errores específicos
    const { moduleId, title, description, type, content, order } = data

    // Convertir el contenido a JSON para almacenarlo
    const contentJson = JSON.stringify(content)

    // Insertar el contenido en la base de datos
    const result = await sql`
      INSERT INTO contents (module_id, title, description, type, content, "order", created_at, updated_at)
      VALUES (${moduleId}, ${title}, ${description}, ${type}, ${contentJson}::jsonb, ${order}, NOW(), NOW())
      RETURNING id
    `

    // Revalidar la ruta para actualizar los datos
    revalidatePath("/dashboard/add-content")
    revalidatePath("/dashboard/courses")

    return {
      success: true,
      contentId: result[0].id,
    }
  } catch (error) {
    console.error("Error creating content:", error)
    return {
      success: false,
      error: "Failed to create content",
    }
  }
}

export async function getContentByModule(moduleId: string) {
  try {
    const content = await sql`
      SELECT * FROM contents
      WHERE module_id = ${moduleId}
      ORDER BY "order" ASC
    `

    return {
      success: true,
      content,
    }
  } catch (error) {
    console.error("Error fetching content:", error)
    return {
      success: false,
      error: "Failed to fetch content",
    }
  }
}

export async function getContentById(contentId: string) {
  try {
    const content = await sql`
      SELECT * FROM contents
      WHERE id = ${contentId}
    `

    if (content.length === 0) {
      return {
        success: false,
        error: "Content not found",
      }
    }

    return {
      success: true,
      content: content[0],
    }
  } catch (error) {
    console.error("Error fetching content:", error)
    return {
      success: false,
      error: "Failed to fetch content",
    }
  }
}

export async function updateContent(contentId: string, data: Partial<ContentData>) {
  try {
    const { title, description, type, content, order } = data

    // Construir el objeto de actualización con los campos proporcionados
    const updateFields: any = {}

    if (title !== undefined) updateFields.title = title
    if (description !== undefined) updateFields.description = description
    if (type !== undefined) updateFields.type = type
    if (content !== undefined) updateFields.content = JSON.stringify(content)
    if (order !== undefined) updateFields.order = order

    updateFields.updated_at = "NOW()"

    // Construir la consulta SQL dinámicamente
    const setClause = Object.entries(updateFields)
      .map(([key, value]) => {
        if (key === "content") return `"${key}" = ${value}::jsonb`
        if (key === "updated_at") return `"${key}" = ${value}`
        return `"${key}" = '${value}'`
      })
      .join(", ")

    // Ejecutar la consulta
    await sql.raw(`
      UPDATE contents
      SET ${setClause}
      WHERE id = '${contentId}'
    `)

    // Revalidar la ruta para actualizar los datos
    revalidatePath("/dashboard/add-content")
    revalidatePath("/dashboard/courses")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error updating content:", error)
    return {
      success: false,
      error: "Failed to update content",
    }
  }
}

export async function deleteContent(contentId: string) {
  try {
    await sql`
      DELETE FROM contents
      WHERE id = ${contentId}
    `

    // Revalidar la ruta para actualizar los datos
    revalidatePath("/dashboard/add-content")
    revalidatePath("/dashboard/courses")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error deleting content:", error)
    return {
      success: false,
      error: "Failed to delete content",
    }
  }
}

// Nueva función para buscar contenido
export async function searchContent({
  term,
  type = "title",
  courseFilter,
  typeFilter,
}: {
  term: string
  type: "title" | "id" | "creator" | "course"
  courseFilter?: string
  typeFilter?: "document" | "video" | "quiz" | "assignment"
}) {
  try {
    let query = `
      SELECT 
        c.id, 
        c.title, 
        c.description, 
        c.type, 
        c.created_at as "createdAt",
        u.name as "creatorName",
        q.title as "courseName",
        c.module_id as "moduleId"
      FROM 
        contents c
      LEFT JOIN 
        users u ON c.creator_id = u.id
      LEFT JOIN 
        modules m ON c.module_id = m.id
      LEFT JOIN 
        qlusters q ON m.qluster_id = q.id
      WHERE 
    `

    // Construir la condición de búsqueda según el tipo
    if (type === "title") {
      query += `c.title ILIKE '%${term}%'`
    } else if (type === "id") {
      query += `c.id::text ILIKE '%${term}%'`
    } else if (type === "creator") {
      query += `u.name ILIKE '%${term}%'`
    } else if (type === "course") {
      query += `q.title ILIKE '%${term}%'`
    }

    // Añadir filtros adicionales si se proporcionan
    if (courseFilter) {
      query += ` AND q.id = '${courseFilter}'`
    }

    if (typeFilter) {
      query += ` AND c.type = '${typeFilter}'`
    }

    // Ordenar por fecha de creación (más reciente primero)
    query += ` ORDER BY c.created_at DESC LIMIT 50`

    const results = await sql.raw(query)

    return {
      success: true,
      content: results.rows,
    }
  } catch (error) {
    console.error("Error searching content:", error)
    return {
      success: false,
      error: "Failed to search content",
    }
  }
}

// Nueva función para clonar contenido
export async function cloneContent(contentId: string, moduleId: string) {
  try {
    // Obtener el contenido original
    const originalContent = await sql`
      SELECT * FROM contents
      WHERE id = ${contentId}
    `

    if (originalContent.length === 0) {
      return {
        success: false,
        error: "Content not found",
      }
    }

    const content = originalContent[0]

    // Insertar el contenido clonado
    const result = await sql`
      INSERT INTO contents (
        module_id, 
        title, 
        description, 
        type, 
        content, 
        "order", 
        created_at, 
        updated_at,
        creator_id
      )
      VALUES (
        ${moduleId}, 
        ${content.title + " (Copia)"}, 
        ${content.description}, 
        ${content.type}, 
        ${content.content}, 
        ${content.order}, 
        NOW(), 
        NOW(),
        ${content.creator_id}
      )
      RETURNING id
    `

    // Revalidar la ruta para actualizar los datos
    revalidatePath("/dashboard/add-content")
    revalidatePath("/dashboard/courses")

    return {
      success: true,
      contentId: result[0].id,
    }
  } catch (error) {
    console.error("Error cloning content:", error)
    return {
      success: false,
      error: "Failed to clone content",
    }
  }
}
