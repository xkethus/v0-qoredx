// scripts/verify-env.js
require("dotenv").config({ path: ".env.local" })

const requiredEnvVars = ["NEXTAUTH_SECRET", "NEXTAUTH_URL"]

const optionalEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "DATABASE_URL",
  "POSTGRES_URL",
]

console.log("🔍 Verificando configuración de entorno...\n")

// Verificar variables requeridas
const missingRequired = []
console.log("📋 Variables requeridas:")
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    missingRequired.push(varName)
    console.log(`❌ ${varName}: No configurado`)
  } else {
    console.log(`✅ ${varName}: Configurado`)
  }
})

// Verificar variables opcionales
console.log("\n📋 Variables opcionales:")
optionalEnvVars.forEach((varName) => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: Configurado`)
  } else {
    console.log(`⚠️  ${varName}: No configurado (usando datos mock)`)
  }
})

// Verificar configuración de Supabase
const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
const hasSupabaseAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const hasSupabaseServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY

console.log("\n🗄️  Estado de la base de datos:")
if (hasSupabaseUrl && hasSupabaseAnonKey && hasSupabaseServiceKey) {
  console.log("✅ Supabase completamente configurado")
} else if (hasSupabaseUrl || hasSupabaseAnonKey || hasSupabaseServiceKey) {
  console.log("⚠️  Supabase parcialmente configurado")
  console.log("   Para usar Supabase, configura todas las variables:")
  console.log("   - NEXT_PUBLIC_SUPABASE_URL")
  console.log("   - NEXT_PUBLIC_SUPABASE_ANON_KEY")
  console.log("   - SUPABASE_SERVICE_ROLE_KEY")
} else {
  console.log("ℹ️  Usando datos mock (no requiere base de datos)")
}

// Verificar Node.js
console.log("\n🔧 Entorno de desarrollo:")
console.log(`✅ Node.js: ${process.version}`)
console.log(`✅ Plataforma: ${process.platform}`)

if (missingRequired.length > 0) {
  console.log("\n❌ Variables requeridas faltantes:")
  missingRequired.forEach((varName) => {
    console.log(`   - ${varName}`)
  })
  console.log("\n📝 Solución:")
  console.log("1. Crea un archivo .env.local en la raíz del proyecto")
  console.log("2. Agrega las variables faltantes")
  console.log("3. Ejecuta: npm run setup (para configuración automática)")
  console.log("\nEjemplo de .env.local:")
  console.log('NEXTAUTH_SECRET="tu_secret_aqui"')
  console.log('NEXTAUTH_URL="http://localhost:3000"')
  process.exit(1)
} else {
  console.log("\n✅ Configuración válida para desarrollo!")
  console.log("\n🚀 Próximos pasos:")
  console.log("1. npm run dev")
  console.log("2. Abrir http://localhost:3000")
  console.log("3. Explorar /student/dashboard")
}
