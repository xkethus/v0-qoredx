import { testConnection } from "../lib/db"

async function checkConnection() {
  const result = await testConnection()

  if (result.success) {
    console.log("✅ Conexión exitosa a la base de datos")
    console.log(`Timestamp del servidor: ${result.timestamp}`)
    return { success: true, timestamp: result.timestamp }
  } else {
    console.error("❌ Error al conectar a la base de datos")
    console.error(result.error)
    return { success: false, error: result.error }
  }
}

// Ejecutar la función si este archivo se ejecuta directamente
if (require.main === module) {
  checkConnection()
    .then((result) => {
      if (result.success) {
        process.exit(0)
      } else {
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error("Error inesperado:", error)
      process.exit(1)
    })
}

export default checkConnection
