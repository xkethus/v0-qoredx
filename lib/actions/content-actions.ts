"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "../db"

export type ContentType = "document" | "video" | "quiz" | "assignment"

export interface Content {
  id: string
  title: string
  description: string
  type: ContentType
  coverImage?: string
  qerniumId?: string
  qerniumTitle?: string
  createdAt: string
}

export interface ContentData {
  qerniumId?: string
  title: string
  description?: string
  type: ContentType
  content?: any
  order?: number
  coverImage?: string
  creatorId?: string
}

// Create new content
export async function createContent(data: ContentData) {
  try {
    // Validate required data
    if (!data.title || !data.type) {
      return {
        success: false,
        error: "Title and type are required",
      }
    }

    // Prepare data for insertion
    const contentData = {
      qernium_id: data.qerniumId,
      title: data.title,
      description: data.description || "",
      type: data.type,
      content: data.content || {},
      order: data.order || 0,
      cover_image: data.coverImage,
      creator_id: data.creatorId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // Insert content into database
    const { data: result, error } = await supabase.from("contents").insert(contentData).select("id").single()

    if (error) {
      console.error("Error creating content:", error)
      return {
        success: false,
        error: error.message,
      }
    }

    // Revalidate paths to update data
    revalidatePath("/dashboard/content")
    revalidatePath("/dashboard/qerniums")

    return {
      success: true,
      contentId: result.id,
    }
  } catch (error: any) {
    console.error("Error creating content:", error)
    return {
      success: false,
      error: error.message || "Failed to create content",
    }
  }
}

// Get all contents with pagination and filters
export async function getAllContents({
  page = 1,
  limit = 10,
  search = "",
  type = "",
  qerniumId = "",
  orderBy = "created_at",
  orderDirection = "desc",
}: {
  page?: number
  limit?: number
  search?: string
  type?: string
  qerniumId?: string
  orderBy?: string
  orderDirection?: "asc" | "desc"
} = {}) {
  try {
    const offset = (page - 1) * limit

    // Build base query
    let query = supabase.from("contents").select(`
      *,
      qerniums (
        id,
        title
      )
    `)

    // Apply filters if provided
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (type) {
      query = query.eq("type", type)
    }

    if (qerniumId) {
      query = query.eq("qernium_id", qerniumId)
    }

    // Get total count for pagination
    const { count, error: countError } = await supabase.from("contents").select("*", { count: "exact", head: true })

    if (countError) {
      throw countError
    }

    // Execute main query with sorting and pagination
    const { data, error } = await query
      .order(orderBy, { ascending: orderDirection === "asc" })
      .range(offset, offset + limit - 1)

    if (error) {
      throw error
    }

    // Transform data to expected format
    const formattedData = (data || []).map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type,
      content: item.content,
      order: item.order,
      coverImage: item.cover_image,
      creatorId: item.creator_id,
      qerniumId: item.qernium_id,
      qerniumTitle: item.qerniums?.title,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    }))

    return {
      success: true,
      contents: formattedData,
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
    }
  } catch (error: any) {
    console.error("Error fetching contents:", error)
    return {
      success: false,
      error: error.message || "Failed to fetch contents",
      contents: [],
      pagination: {
        total: 0,
        page,
        limit,
        totalPages: 0,
      },
    }
  }
}

// Get content by ID
export async function getContentById(contentId: string) {
  try {
    const { data, error } = await supabase
      .from("contents")
      .select(`
        *,
        qerniums (
          id,
          title
        )
      `)
      .eq("id", contentId)
      .single()

    if (error) {
      throw error
    }

    if (!data) {
      return {
        success: false,
        error: "Content not found",
      }
    }

    // Transform data to expected format
    const formattedData = {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      content: data.content,
      order: data.order,
      coverImage: data.cover_image,
      creatorId: data.creator_id,
      qerniumId: data.qernium_id,
      qerniumTitle: data.qerniums?.title,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }

    return {
      success: true,
      content: formattedData,
    }
  } catch (error: any) {
    console.error("Error fetching content:", error)
    return {
      success: false,
      error: error.message || "Failed to fetch content",
    }
  }
}

// Update existing content
export async function updateContent(contentId: string, data: Partial<ContentData>) {
  try {
    // Prepare data for update
    const updateData: any = {}

    if (data.title !== undefined) updateData.title = data.title
    if (data.description !== undefined) updateData.description = data.description
    if (data.type !== undefined) updateData.type = data.type
    if (data.content !== undefined) updateData.content = data.content
    if (data.order !== undefined) updateData.order = data.order
    if (data.coverImage !== undefined) updateData.cover_image = data.coverImage
    if (data.qerniumId !== undefined) updateData.qernium_id = data.qerniumId

    updateData.updated_at = new Date().toISOString()

    // Execute update
    const { error } = await supabase.from("contents").update(updateData).eq("id", contentId)

    if (error) {
      throw error
    }

    // Revalidate paths
    revalidatePath("/dashboard/content")
    revalidatePath(`/dashboard/content/${contentId}`)
    revalidatePath("/dashboard/qerniums")

    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Error updating content:", error)
    return {
      success: false,
      error: error.message || "Failed to update content",
    }
  }
}

// Delete content
export async function deleteContent(contentId: string) {
  try {
    const { error } = await supabase.from("contents").delete().eq("id", contentId)

    if (error) {
      throw error
    }

    // Revalidate paths
    revalidatePath("/dashboard/content")
    revalidatePath("/dashboard/qerniums")

    return {
      success: true,
    }
  } catch (error: any) {
    console.error("Error deleting content:", error)
    return {
      success: false,
      error: error.message || "Failed to delete content",
    }
  }
}

// Function to search contents with filters
export async function searchContents(
  query = "",
  filters: { type?: ContentType } = {},
): Promise<{ success: boolean; contents?: Content[]; error?: string }> {
  try {
    // Mock data for demonstration
    const mockContents: Content[] = [
      {
        id: "1",
        title: "Introducción a la Física Cuántica",
        description: "Una introducción a los conceptos básicos de la física cuántica",
        type: "document",
        createdAt: "2023-05-15T10:30:00Z",
      },
      {
        id: "2",
        title: "Tutorial: Ecuaciones Diferenciales",
        description: "Video explicativo sobre cómo resolver ecuaciones diferenciales de primer orden",
        type: "video",
        createdAt: "2023-06-20T14:45:00Z",
      },
      {
        id: "3",
        title: "Cuestionario: Cálculo Integral",
        description: "Preguntas de evaluación sobre cálculo integral",
        type: "quiz",
        createdAt: "2023-04-10T09:15:00Z",
      },
      {
        id: "4",
        title: "Tarea: Recursos de Khan Academy",
        description: "Tarea con enlaces a recursos educativos de Khan Academy sobre álgebra",
        type: "assignment",
        createdAt: "2023-07-05T16:20:00Z",
      },
      {
        id: "5",
        title: "Teoría de la Relatividad",
        description: "Explicación detallada de la teoría de la relatividad de Einstein",
        type: "document",
        createdAt: "2023-03-25T11:10:00Z",
        qerniumId: "101",
        qerniumTitle: "Fundamentos de Física Moderna",
      },
    ]

    // Filter by query
    let filteredContents = mockContents
    if (query) {
      filteredContents = filteredContents.filter(
        (content) =>
          content.title.toLowerCase().includes(query.toLowerCase()) ||
          content.description.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Filter by type
    if (filters.type) {
      filteredContents = filteredContents.filter((content) => content.type === filters.type)
    }

    return {
      success: true,
      contents: filteredContents,
    }
  } catch (error) {
    console.error("Error searching contents:", error)
    return {
      success: false,
      error: "Failed to search contents",
    }
  }
}

// Clone content
export async function cloneContent(contentId: string, newQerniumId?: string) {
  try {
    // Get original content
    const { data: originalContent, error: fetchError } = await supabase
      .from("contents")
      .select("*")
      .eq("id", contentId)
      .single()

    if (fetchError) {
      throw fetchError
    }

    if (!originalContent) {
      return {
        success: false,
        error: "Original content not found",
      }
    }

    // Create new cloned content
    const clonedContent = {
      qernium_id: newQerniumId || originalContent.qernium_id,
      title: `${originalContent.title} (Copia)`,
      description: originalContent.description,
      type: originalContent.type,
      content: originalContent.content,
      order: originalContent.order,
      cover_image: originalContent.cover_image,
      creator_id: originalContent.creator_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data: result, error: insertError } = await supabase
      .from("contents")
      .insert(clonedContent)
      .select("id")
      .single()

    if (insertError) {
      throw insertError
    }

    // Revalidate paths
    revalidatePath("/dashboard/content")
    revalidatePath("/dashboard/qerniums")

    return {
      success: true,
      contentId: result.id,
    }
  } catch (error: any) {
    console.error("Error cloning content:", error)
    return {
      success: false,
      error: error.message || "Failed to clone content",
    }
  }
}

// Check if content with same title exists
export async function checkContentExists(title: string, excludeId?: string) {
  try {
    let query = supabase.from("contents").select("id").eq("title", title)

    if (excludeId) {
      query = query.neq("id", excludeId)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return {
      success: true,
      exists: data.length > 0,
    }
  } catch (error: any) {
    console.error("Error checking content existence:", error)
    return {
      success: false,
      error: error.message || "Failed to check content existence",
      exists: false,
    }
  }
}
