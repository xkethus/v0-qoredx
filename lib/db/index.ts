import { createMockSupabaseClient } from "./mock-supabase"

// Usar solo implementaciones mock para evitar conexiones a bases de datos reales
const supabase = createMockSupabaseClient()

// Función mock para probar la conexión
async function testConnection() {
  return {
    success: true,
    timestamp: new Date().toISOString(),
  }
}

// Mock de SQL para evitar conexiones reales
const sql = async (strings: TemplateStringsArray, ...values: any[]) => {
  console.log("SQL Mock:", strings, values)
  return [{ now: new Date().toISOString() }]
}

const db = sql

export { sql, db, testConnection, supabase }
