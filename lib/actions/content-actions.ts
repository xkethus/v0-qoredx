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
