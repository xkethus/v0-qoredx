import { neon, neonConfig } from "@neondatabase/serverless"
import { Client } from "postgres"

const sql = neon(process.env.DATABASE_URL || "", neonConfig())

async function testConnection() {
  try {
    const client = new Client(process.env.DATABASE_URL || "")
    await client.connect()
    const result = await client.query("SELECT NOW()")
    await client.end()

    return { success: true, timestamp: result.rows[0].now }
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error)
    return { success: false, error: error }
  }
}

export { sql, testConnection }
