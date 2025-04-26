import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Configuración para entornos de desarrollo y producción
const connectionString = process.env.DATABASE_URL || ""

// Configuración específica para el cliente postgres
const client = postgres(connectionString, {
  max: 10, // Máximo número de conexiones
  idle_timeout: 20, // Tiempo máximo de inactividad en segundos
  connect_timeout: 10, // Tiempo máximo para conectar en segundos
  prepare: false, // Deshabilitar prepared statements para mayor compatibilidad
})

// Crear instancia de drizzle con el esquema
export const db = drizzle(client, { schema })
