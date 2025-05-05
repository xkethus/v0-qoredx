"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "../db"

export type QerniumFormData = {
  title: string
  description: string
  bloomLevel: string
  actionVerb: string
  estimatedTime: number
  coverImage?: string | null
  content?: {
    title: string
    description: string
    text?: string
    url?: string
  }
  skills?: Array<{
    subskillId: string
    level: number
  }>
  contentIds?: string[]
  creatorId?: string
}

// Crear un nuevo Qernium
export async function createQernium(data: QerniumFormData) {
  try {
    // Validar datos requeridos
    if (!data.title || !data.bloomLevel || !data.actionVerb) {
      return {
        success: false,
        error: "Title, Bloom level, and action verb are required",
      }
    }

    // Preparar datos para inserción
    const qerniumData = {
      title: data.title,
      description: data.description,
      bloom_level: data.bloomLevel,
      action_verb: data.actionVerb,
      estimated_time: data.estimatedTime,
      cover_image: data.coverImage,
      creator_id: data.creatorId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: "draft", // Por defecto, los Qerniums se crean como borradores
    }

    // Insertar el Qernium en la base de datos
    const { data: qernium, error } = await supabase.from("qerniums").insert(qerniumData).select("id").single()

    if (error) {
      console.error("Error creating qernium:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    // Si hay habilidades asignadas, guardarlas
    if (data.skills && data.skills.length > 0) {
      const skillsData = data.skills.map((skill) => ({
        qernium_id: qernium.id,
        subskill_id: skill.subskillId,
        level: skill.level,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))

      const { error: skillsError } = await supabase.from("qernium_skills").insert(skillsData)

      if (skillsError) {
        console.error("Error assigning skills:", skillsError)
        // No fallamos la operación completa, solo registramos el error
      }
    }

    // Si hay contenidos seleccionados, asociarlos al Qernium
    if (data.contentIds && data.contentIds.length > 0) {
      // Actualizar los contenidos con el ID del Qernium
      const { error: contentError } = await supabase
        .from("contents")
        .update({ qernium_id: qernium.id })
        .in("id", data.contentIds)

      if (contentError) {
        console.error("Error associating contents:", contentError)
        // No fallamos la operación completa, solo registramos el error
      }
    }

    // Si hay contenido nuevo, crearlo
    if (data.content && data.content.title) {
      let contentType: "document" | "video" | "quiz" | "assignment" = "document"

      if (data.content.url && (data.content.url.includes("youtube") || data.content.url.includes("vimeo"))) {
        contentType = "video"
      }

      const contentData = {
        qernium_id: qernium.id,
        title: data.content.title,
        description: data.content.description || "",
        type: contentType,
        content: data.content.text ? { text: data.content.text } : data.content.url ? { url: data.content.url } : {},
        order: 0,
        creator_id: data.creatorId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { error: contentError } = await supabase.from("contents").insert(contentData)

      if (contentError) {
        console.error("Error creating content:", contentError)
        // No fallamos la operación completa, solo registramos el error
      }
    }

    // Revalidar rutas
    revalidatePath("/dashboard/qerniums")

    return {
      success: true,
      qerniumId: qernium.id,
    }
  } catch (error: any) {
    console.error("Error creating qernium:", error)
    return {
      success: false,
      error: error.message || "Failed to create qernium",
    }
  }
}

// Obtener todos los Qerniums con filtros opcionales
export async function getQerniums({
  page = 1,
  limit = 20,
  search = "",
  bloomLevel = "",
  status = "",
  orderBy = "created_at",
  orderDirection = "desc",
}: {
  page?: number
  limit?: number
  search?: string
  bloomLevel?: string
  status?: string
  orderBy?: string
  orderDirection?: "asc" | "desc"
} = {}) {
  try {
    const offset = (page - 1) * limit

    // Construir la consulta base
    let query = supabase.from("qerniums").select(`
      *,
      qernium_skills (
        id,
        subskill_id,
        level,
        subskills (
          id,
          name,
          skills (
            id,
            name,
            color
          )
        )
      ),
      contents (
        id,
        title,
        type
      )
    `)

    // Aplicar filtros si se proporcionan
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (bloomLevel) {
      query = query.eq("bloom_level", bloomLevel)
    }

    if (status) {
      query = query.eq("status", status)
    }

    // Obtener el recuento total para la paginación
    const { count, error: countError } = await supabase.from("qerniums").count({ exact: true, head: true })

    if (countError) {
      throw countError
    }

    // Ejecutar la consulta principal con ordenación y paginación
    const { data, error } = await query
      .order(orderBy, { ascending: orderDirection === "asc" })
      .range(offset, offset + limit - 1)

    if (error) {
      throw error
    }

    // Transformar los datos para el formato esperado
    const formattedData = (data || []).map((item) => {
      // Extraer las habilidades y subhabilidades
      const skills = item.qernium_skills
        ? item.qernium_skills.map((qs: any) => ({
            id: qs.id,
            subskillId: qs.subskill_id,
            subskillName: qs.subskills?.name || "",
            skillName: qs.subskills?.skills?.name || "",
            skillColor: qs.subskills?.skills?.color || "purple",
            level: qs.level,
          }))
        : []

      // Extraer los contenidos asociados
      const contents = item.contents
        ? item.contents.map((c: any) => ({
            id: c.id,
            title: c.title,
            type: c.type,
          }))
        : []

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        bloomLevel: item.bloom_level,
        actionVerb: item.action_verb,
        estimatedTime: item.estimated_time,
        status: item.status,
        coverImage: item.cover_image,
        creatorId: item.creator_id,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        skills,
        contents,
        qlusters: [], // Esto se podría llenar con una consulta adicional si es necesario
      }
    })

    return {
      success: true,
      qerniums: formattedData,
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
    }
  } catch (error: any) {
    console.error("Error fetching qerniums:", error)
    return {
      success: false,
      error: error.message || "Failed to fetch qerniums",
      qerniums: [],
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 0,
      },
    }
  }
}

// Obtener un Qernium por ID
export async function getQerniumById(qerniumId: string) {
  try {
    const { data, error } = await supabase
      .from("qerniums")
      .select(`
        *,
        qernium_skills (
          id,
          subskill_id,
          level,
          subskills (
            id,
            name,
            skills (
              id,
              name,
              color
            )
          )
        ),
        contents (
          id,
          title,
          description,
          type,
          content,
          order
        )
      `)
      .eq("id", qerniumId)
      .single()

    if (error) {
      throw error
    }

    if (!data) {
      return {
        success: false,
        error: "Qernium not found",
      }
    }

    // Transformar los datos para el formato esperado
    const skills = data.qernium_skills
      ? data.qernium_skills.map((qs: any) => ({
          id: qs.id,
          subskillId: qs.subskill_id,
          subskillName: qs.subskills?.name || "",
          skillName: qs.subskills?.skills?.name || "",
          skillColor: qs.subskills?.skills?.color || "purple",
          level: qs.level,
        }))
      : []

    const contents = data.contents
      ? data.contents.map((c: any) => ({
          id: c.id,
          title: c.title,
          description: c.description,
          type: c.type,
          content: c.content,
          order: c.order,
        }))
      : []

    const formattedData = {
      id: data.id,
      title: data.title,
      description: data.description,
      bloomLevel: data.bloom_level,
      actionVerb: data.action_verb,
      estimatedTime: data.estimated_time,
      status: data.status,
      coverImage: data.cover_image,
      creatorId: data.creator_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      skills,
      contents,
    }

    return {
      success: true,
      qernium: formattedData,
    }
  } catch (error: any) {
    console.error("Error fetching qernium:", error)
    return {
      success: false,
      error: error.message || "Failed to fetch qernium",
    }
  }
}

// Actualizar un Qernium existente
export async function updateQernium(qerniumId: string, data: Partial<QerniumFormData>) {
  try {
    // Preparar datos para actualización
    const updateData: any = {}

    if (data.title !== undefined) updateData.title = data.title
    if (data.description !== undefined) updateData.description = data.description
    if (data.bloomLevel !== undefined) updateData.bloom_level = data.bloomLevel
    if (data.actionVerb !== undefined) updateData.action_verb = data.actionVerb
    if (data.estimatedTime !== undefined) updateData.estimated_time = data.estimatedTime
    if (data.coverImage !== undefined) updateData.cover_image = data.coverImage

    updateData.updated_at = new Date().toISOString()

    // Ejecutar la actualización
    const { error } = await supabase.from("qerniums").update(updateData).eq("id", qerniumId)

    if (error) {
      throw error
    }

    // Si hay habilidades asignadas, actualizar
    if (data.skills && data.skills.length > 0) {
      // Primero eliminamos las habilidades existentes
      await supabase.from("qernium_skills").delete().eq("qernium_id", qerniumId)

      // Luego insertamos las nuevas
      const skillsData = data.skills.map((skill) => ({
        qernium_id: qerniumId,
        subskill_id: skill.subskillId,
        level: skill.level,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))

      const { error: skillsError } = await supabase.from("qernium_skills").insert(skillsData)

      if (skillsError) {
        console.error("Error updating skills:", skillsError)
      }
    }

    // Revalidar rutas
    revalidatePath("/dashboard/qerniums")
    revalidatePath(`/dashboard/qerniums/${qerniumId}`)

    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Error updating qernium:", error)
    return {
      success: false,
      error: error.message || "Failed to update qernium",
    }
  }
}

// Cambiar el estado de un Qernium
export async function changeQerniumStatus(qerniumId: string, status: "draft" | "published" | "archived") {
  try {
    const { error } = await supabase
      .from("qerniums")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", qerniumId)

    if (error) {
      throw error
    }

    // Revalidar rutas
    revalidatePath("/dashboard/qerniums")
    revalidatePath(`/dashboard/qerniums/${qerniumId}`)

    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Error changing qernium status:", error)
    return {
      success: false,
      error: error.message || "Failed to change qernium status",
    }
  }
}

// Eliminar un Qernium
export async function deleteQernium(qerniumId: string) {
  try {
    // Eliminar el Qernium (las restricciones de clave foránea deberían eliminar las relaciones)
    const { error } = await supabase.from("qerniums").delete().eq("id", qerniumId)

    if (error) {
      throw error
    }

    // Revalidar rutas
    revalidatePath("/dashboard/qerniums")

    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Error deleting qernium:", error)
    return {
      success: false,
      error: error.message || "Failed to delete qernium",
    }
  }
}
