"use server"

import { db } from "@/lib/db"
import { courses, modules, contents, courseClasses, courseStudents } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export type CourseFormData = {
  title: string
  description: string
  startDate: string
  endDate: string
  status: "draft" | "scheduled" | "active"
  visibility: "private" | "public" | "restricted"
  color: "purple" | "cyan" | "pink"
  autoEnroll: boolean
  sequentialProgress: boolean
  certificate: boolean
}

export type ModuleFormData = {
  title: string
  description?: string
  order: number
}

export type ContentFormData = {
  title: string
  description?: string
  type: "document" | "video" | "quiz" | "assignment"
  content?: any
  order: number
}

export async function createCourse(data: CourseFormData) {
  try {
    const [course] = await db
      .insert(courses)
      .values({
        title: data.title,
        description: data.description,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        status: data.status,
        visibility: data.visibility,
        color: data.color,
        autoEnroll: data.autoEnroll,
        sequentialProgress: data.sequentialProgress,
        certificate: data.certificate,
      })
      .returning()

    revalidatePath("/dashboard/courses")
    return { success: true, courseId: course.id }
  } catch (error) {
    console.error("Error creating course:", error)
    return { success: false, error: "Failed to create course" }
  }
}

export async function updateCourse(courseId: string, data: Partial<CourseFormData>) {
  try {
    await db
      .update(courses)
      .set({
        title: data.title,
        description: data.description,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        status: data.status,
        visibility: data.visibility,
        color: data.color,
        autoEnroll: data.autoEnroll,
        sequentialProgress: data.sequentialProgress,
        certificate: data.certificate,
        updatedAt: new Date(),
      })
      .where(eq(courses.id, courseId))

    revalidatePath(`/dashboard/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    console.error("Error updating course:", error)
    return { success: false, error: "Failed to update course" }
  }
}

export async function deleteCourse(courseId: string) {
  try {
    await db.delete(courses).where(eq(courses.id, courseId))
    revalidatePath("/dashboard/courses")
    return { success: true }
  } catch (error) {
    console.error("Error deleting course:", error)
    return { success: false, error: "Failed to delete course" }
  }
}

export async function createModule(courseId: string, data: ModuleFormData) {
  try {
    const [module] = await db
      .insert(modules)
      .values({
        courseId,
        title: data.title,
        description: data.description || null,
        order: data.order,
      })
      .returning()

    revalidatePath(`/dashboard/courses/${courseId}`)
    return { success: true, moduleId: module.id }
  } catch (error) {
    console.error("Error creating module:", error)
    return { success: false, error: "Failed to create module" }
  }
}

export async function updateModule(moduleId: string, data: Partial<ModuleFormData>) {
  try {
    const [module] = await db
      .update(modules)
      .set({
        title: data.title,
        description: data.description,
        order: data.order,
        updatedAt: new Date(),
      })
      .where(eq(modules.id, moduleId))
      .returning()

    revalidatePath(`/dashboard/courses/${module.courseId}`)
    return { success: true }
  } catch (error) {
    console.error("Error updating module:", error)
    return { success: false, error: "Failed to update module" }
  }
}

export async function deleteModule(moduleId: string) {
  try {
    const [module] = await db.delete(modules).where(eq(modules.id, moduleId)).returning()

    revalidatePath(`/dashboard/courses/${module.courseId}`)
    return { success: true }
  } catch (error) {
    console.error("Error deleting module:", error)
    return { success: false, error: "Failed to delete module" }
  }
}

export async function createContent(moduleId: string, data: ContentFormData) {
  try {
    const [content] = await db
      .insert(contents)
      .values({
        moduleId,
        title: data.title,
        description: data.description || null,
        type: data.type,
        content: data.content || null,
        order: data.order,
      })
      .returning()

    const module = await db.query.modules.findFirst({
      where: eq(modules.id, moduleId),
    })

    revalidatePath(`/dashboard/courses/${module?.courseId}`)
    return { success: true, contentId: content.id }
  } catch (error) {
    console.error("Error creating content:", error)
    return { success: false, error: "Failed to create content" }
  }
}

export async function updateContent(contentId: string, data: Partial<ContentFormData>) {
  try {
    await db
      .update(contents)
      .set({
        title: data.title,
        description: data.description,
        type: data.type,
        content: data.content,
        order: data.order,
        updatedAt: new Date(),
      })
      .where(eq(contents.id, contentId))

    revalidatePath(`/dashboard/courses`)
    return { success: true }
  } catch (error) {
    console.error("Error updating content:", error)
    return { success: false, error: "Failed to update content" }
  }
}

export async function deleteContent(contentId: string) {
  try {
    await db.delete(contents).where(eq(contents.id, contentId))
    revalidatePath(`/dashboard/courses`)
    return { success: true }
  } catch (error) {
    console.error("Error deleting content:", error)
    return { success: false, error: "Failed to delete content" }
  }
}

export async function assignClassToCourse(courseId: string, classId: string) {
  try {
    await db.insert(courseClasses).values({
      courseId,
      classId,
    })

    revalidatePath(`/dashboard/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    console.error("Error assigning class to course:", error)
    return { success: false, error: "Failed to assign class to course" }
  }
}

export async function removeClassFromCourse(courseId: string, classId: string) {
  try {
    await db.delete(courseClasses).where(and(eq(courseClasses.courseId, courseId), eq(courseClasses.classId, classId)))

    revalidatePath(`/dashboard/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    console.error("Error removing class from course:", error)
    return { success: false, error: "Failed to remove class from course" }
  }
}

export async function enrollStudentInCourse(courseId: string, studentId: string) {
  try {
    await db.insert(courseStudents).values({
      courseId,
      studentId,
      progress: 0,
      lastActive: new Date(),
    })

    revalidatePath(`/dashboard/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    console.error("Error enrolling student in course:", error)
    return { success: false, error: "Failed to enroll student in course" }
  }
}

export async function removeStudentFromCourse(courseId: string, studentId: string) {
  try {
    await db
      .delete(courseStudents)
      .where(and(eq(courseStudents.courseId, courseId), eq(courseStudents.studentId, studentId)))

    revalidatePath(`/dashboard/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    console.error("Error removing student from course:", error)
    return { success: false, error: "Failed to remove student from course" }
  }
}

export async function updateStudentProgress(courseId: string, studentId: string, progress: number) {
  try {
    await db
      .update(courseStudents)
      .set({
        progress,
        lastActive: new Date(),
        updatedAt: new Date(),
      })
      .where(and(eq(courseStudents.courseId, courseId), eq(courseStudents.studentId, studentId)))

    revalidatePath(`/dashboard/courses/${courseId}`)
    return { success: true }
  } catch (error) {
    console.error("Error updating student progress:", error)
    return { success: false, error: "Failed to update student progress" }
  }
}
