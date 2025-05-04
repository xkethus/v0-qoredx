"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

// Crear un cliente de Supabase para el servidor
const supabaseUrl = process.env.SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseServiceKey)

type ContentType = "document" | "video" | "quiz" | "assignment"

interface ContentData {
  moduleId: string
  title: string
  description: string
  type: ContentType
  content: any
  order: number
}

// Reemplazar la función createContent
export async function createContent(data: ContentData) {
  try {
    // En una implementación real, validaríamos los datos y manejaríamos errores específicos
    const { moduleId, title, description, type, content, order } = data

    // Insertar el contenido en la base de datos usando Supabase
    const { data: result, error } = await supabase
      .from("contents")
      .insert({
        module_id: moduleId,
        title,
        description,
        type,
        content,
        order,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .select("id")
      .single()

    if (error) throw error

    // Revalidar la ruta para actualizar los datos
    revalidatePath("/dashboard/courses")

    return {
      success: true,
      contentId: result.id,
    }
  } catch (error) {
    console.error("Error creating content:", error)
    return {
      success: false,
      error: "Failed to create content",
    }
  }
}

// Reemplazar la función getContentByModule
export async function getContentByModule(moduleId: string) {
  try {
    const { data, error } = await supabase
      .from("contents")
      .select("*")
      .eq("module_id", moduleId)
      .order("order", { ascending: true })

    if (error) throw error

    return {
      success: true,
      content: data,
    }
  } catch (error) {
    console.error("Error fetching content:", error)
    return {
      success: false,
      error: "Failed to fetch content",
    }
  }
}

// Reemplazar la función getContentById
export async function getContentById(contentId: string) {
  try {
    const { data, error } = await supabase.from("contents").select("*").eq("id", contentId).single()

    if (error) throw error

    return {
      success: true,
      content: data,
    }
  } catch (error) {
    console.error("Error fetching content:", error)
    return {
      success: false,
      error: "Failed to fetch content",
    }
  }
}

// Reemplazar la función updateContent
export async function updateContent(contentId: string, data: Partial<ContentData>) {
  try {
    const { title, description, type, content, order } = data

    // Construir el objeto de actualización con los campos proporcionados
    const updateFields: any = {}

    if (title !== undefined) updateFields.title = title
    if (description !== undefined) updateFields.description = description
    if (type !== undefined) updateFields.type = type
    if (content !== undefined) updateFields.content = content
    if (order !== undefined) updateFields.order = order

    updateFields.updated_at = new Date()

    // Ejecutar la actualización con Supabase
    const { error } = await supabase.from("contents").update(updateFields).eq("id", contentId)

    if (error) throw error

    // Revalidar la ruta para actualizar los datos
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

// Reemplazar la función deleteContent
export async function deleteContent(contentId: string) {
  try {
    const { error } = await supabase.from("contents").delete().eq("id", contentId)

    if (error) throw error

    // Revalidar la ruta para actualizar los datos
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

// Reemplazar la función searchContent
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
    let query = supabase.from("contents").select(`
        id, 
        title, 
        description, 
        type, 
        created_at,
        users!creator_id (name),
        modules!module_id (
          qlusters!qluster_id (title)
        ),
        module_id
      `)

    // Aplicar filtros según el tipo de búsqueda
    if (type === "title") {
      query = query.ilike("title", `%${term}%`)
    } else if (type === "id") {
      query = query.ilike("id", `%${term}%`)
    } else if (type === "creator") {
      query = query.ilike("users.name", `%${term}%`)
    } else if (type === "course") {
      query = query.ilike("modules.qlusters.title", `%${term}%`)
    }

    // Añadir filtros adicionales si se proporcionan
    if (courseFilter) {
      query = query.eq("modules.qlusters.id", courseFilter)
    }

    if (typeFilter) {
      query = query.eq("type", typeFilter)
    }

    // Ordenar por fecha de creación (más reciente primero)
    query = query.order("created_at", { ascending: false }).limit(50)

    const { data, error } = await query

    if (error) throw error

    // Transformar los datos para que coincidan con el formato esperado
    const formattedResults = data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type,
      createdAt: item.created_at,
      creatorName: item.users?.name,
      courseName: item.modules?.qlusters?.title,
      moduleId: item.module_id,
    }))

    return {
      success: true,
      content: formattedResults,
    }
  } catch (error) {
    console.error("Error searching content:", error)
    return {
      success: false,
      error: "Failed to search content",
    }
  }
}

// Reemplazar la función cloneContent
export async function cloneContent(contentId: string, moduleId: string) {
  try {
    // Obtener el contenido original
    const { data: originalContent, error: fetchError } = await supabase
      .from("contents")
      .select("*")
      .eq("id", contentId)
      .single()

    if (fetchError) throw fetchError

    // Insertar el contenido clonado
    const { data: result, error: insertError } = await supabase
      .from("contents")
      .insert({
        module_id: moduleId,
        title: `${originalContent.title} (Copia)`,
        description: originalContent.description,
        type: originalContent.type,
        content: originalContent.content,
        order: originalContent.order,
        created_at: new Date(),
        updated_at: new Date(),
        creator_id: originalContent.creator_id,
      })
      .select("id")
      .single()

    if (insertError) throw insertError

    // Revalidar la ruta para actualizar los datos
    revalidatePath("/dashboard/courses")

    return {
      success: true,
      contentId: result.id,
    }
  } catch (error) {
    console.error("Error cloning content:", error)
    return {
      success: false,
      error: "Failed to clone content",
    }
  }
}
