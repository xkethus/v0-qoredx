import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Configuración para entornos de producción
const connectionString = process.env.DATABASE_URL || ""

// Configuración específica para el cliente postgres
const client = postgres(connectionString, {
  max: 10, // Máximo número de conexiones
  idle_timeout: 20, // Tiempo máximo de inactividad en segundos
  connect_timeout: 10, // Tiempo máximo para conectar en segundos
  prepare: false, // Deshabilitar prepared statements para mayor compatibilidad
  ssl: process.env.NODE_ENV === "production", // Habilitar SSL en producción
  debug: process.env.NODE_ENV === "development", // Habilitar debug en desarrollo
})

// Crear instancia de drizzle con el esquema
export const db = drizzle(client, { schema })

// Cliente SQL directo para consultas raw
import { neon } from "@neondatabase/serverless"
export const sql = neon(connectionString)

// Función de utilidad para verificar la conexión
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as time`
    console.log("Conexión a la base de datos exitosa:", result[0].time)
    return { success: true, timestamp: result[0].time }
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error)
    return { success: false, error }
  }
}
