import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Usar variables de entorno para la conexión
const connectionString = process.env.DATABASE_URL || ""

// Crear cliente postgres
const client = postgres(connectionString)

// Crear instancia de drizzle con el esquema
export const db = drizzle(client, { schema })
