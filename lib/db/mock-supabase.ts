// Mock implementation of Supabase client for development purposes
import { v4 as uuidv4 } from "uuid"

// Mock data storage
const mockDatabase: Record<string, any[]> = {
  qerniums: [],
  qernium_skills: [],
  contents: [],
  skills: [
    { id: "1", name: "Pensamiento Crítico", color: "purple" },
    { id: "2", name: "Comunicación Efectiva", color: "cyan" },
    { id: "3", name: "Resolución de Problemas", color: "pink" },
    { id: "4", name: "Creatividad", color: "amber" },
  ],
  subskills: [
    { id: "1", name: "Análisis de Argumentos", skill_id: "1" },
    { id: "2", name: "Evaluación de Evidencia", skill_id: "1" },
    { id: "3", name: "Comunicación Escrita", skill_id: "2" },
    { id: "4", name: "Comunicación Oral", skill_id: "2" },
    { id: "5", name: "Definición de Problemas", skill_id: "3" },
    { id: "6", name: "Pensamiento Divergente", skill_id: "4" },
  ],
}

// Helper to find items in mock database
const findInTable = (table: string, conditions: Record<string, any>) => {
  return (
    mockDatabase[table]?.filter((item) => {
      return Object.entries(conditions).every(([key, value]) => item[key] === value)
    }) || []
  )
}

// Mock Supabase client
export const createMockSupabaseClient = () => {
  return {
    from: (table: string) => ({
      select: (query?: string) => {
        // Parse the query to determine if we need to include related data
        const includeRelations = query && query.includes("(")

        return {
          eq: (column: string, value: any) => ({
            single: () => {
              const result = findInTable(table, { [column]: value })[0]

              if (!result) {
                return { data: null, error: { message: "Not found" } }
              }

              // Handle relations if needed
              if (includeRelations && result) {
                // This is a simplified implementation
                if (table === "qerniums") {
                  result.qernium_skills = findInTable("qernium_skills", { qernium_id: result.id })
                  result.contents = findInTable("contents", { qernium_id: result.id })
                }
              }

              return { data: result, error: null }
            },
            range: (start: number, end: number) => {
              const results = findInTable(table, { [column]: value }).slice(start, end + 1)
              return { data: results, error: null }
            },
          }),
          or: (conditions: string) => ({
            order: (column: string, options: { ascending: boolean }) => ({
              range: (start: number, end: number) => {
                // Simplified implementation
                const results = mockDatabase[table] || []
                return { data: results.slice(start, end + 1), error: null }
              },
            }),
          }),
          order: (column: string, options: { ascending: boolean }) => ({
            range: (start: number, end: number) => {
              // Simplified implementation
              const results = mockDatabase[table] || []
              return { data: results.slice(start, end + 1), error: null }
            },
          }),
          in: (column: string, values: any[]) => ({
            data: findInTable(table, {}),
            error: null,
          }),
          count: (options: { exact: boolean; head: boolean }) => {
            return { count: mockDatabase[table]?.length || 0, error: null }
          },
        }
      },
      insert: (data: any) => {
        if (Array.isArray(data)) {
          const insertedItems = data.map((item) => {
            const newItem = { ...item, id: item.id || uuidv4() }
            mockDatabase[table] = [...(mockDatabase[table] || []), newItem]
            return newItem
          })
          return {
            data: insertedItems,
            error: null,
            select: () => ({ single: () => ({ data: insertedItems[0], error: null }) }),
          }
        } else {
          const newItem = { ...data, id: data.id || uuidv4() }
          mockDatabase[table] = [...(mockDatabase[table] || []), newItem]
          return {
            data: newItem,
            error: null,
            select: () => ({ single: () => ({ data: newItem, error: null }) }),
          }
        }
      },
      update: (data: any) => ({
        eq: (column: string, value: any) => {
          const index = mockDatabase[table]?.findIndex((item) => item[column] === value)
          if (index !== undefined && index >= 0 && mockDatabase[table]) {
            mockDatabase[table][index] = { ...mockDatabase[table][index], ...data }
            return { data: mockDatabase[table][index], error: null }
          }
          return { data: null, error: { message: "Not found" } }
        },
        in: (column: string, values: any[]) => {
          // Simplified implementation
          return { data: null, error: null }
        },
      }),
      delete: () => ({
        eq: (column: string, value: any) => {
          const index = mockDatabase[table]?.findIndex((item) => item[column] === value)
          if (index !== undefined && index >= 0 && mockDatabase[table]) {
            const deleted = mockDatabase[table].splice(index, 1)[0]
            return { data: deleted, error: null }
          }
          return { data: null, error: { message: "Not found" } }
        },
      }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    },
  }
}
