# Configuración de Entorno - QoreEdu LMS

## Variables de Entorno

### Archivo .env.local (Crear en la raíz del proyecto)

\`\`\`env
# ==============================================
# CONFIGURACIÓN BÁSICA DE NEXT.JS
# ==============================================
NEXTAUTH_SECRET="genera_un_secret_aleatorio_aqui"
NEXTAUTH_URL="http://localhost:3000"

# ==============================================
# BASE DE DATOS - SUPABASE (OPCIONAL)
# ==============================================
# Si quieres usar Supabase en lugar de datos mock
NEXT_PUBLIC_SUPABASE_URL="https://tu-proyecto.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu_anon_key_aqui"
SUPABASE_SERVICE_ROLE_KEY="tu_service_role_key_aqui"

# ==============================================
# BASE DE DATOS - POSTGRESQL (OPCIONAL)
# ==============================================
# Si tienes PostgreSQL local
DATABASE_URL="postgresql://usuario:password@localhost:5432/qoredx"
POSTGRES_URL="postgresql://usuario:password@localhost:5432/qoredx"
POSTGRES_PRISMA_URL="postgresql://usuario:password@localhost:5432/qoredx"
POSTGRES_URL_NON_POOLING="postgresql://usuario:password@localhost:5432/qoredx"

# ==============================================
# CONFIGURACIÓN DE DESARROLLO
# ==============================================
NODE_ENV="development"
\`\`\`

## Configuraciones por Entorno

### 🔧 Desarrollo Local (Recomendado)
\`\`\`env
# Solo necesitas esto para desarrollo
NEXTAUTH_SECRET="dev-secret-key-123"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
\`\`\`

### 🌐 Desarrollo con Supabase
\`\`\`env
# Configuración básica
NEXTAUTH_SECRET="dev-secret-key-123"
NEXTAUTH_URL="http://localhost:3000"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
\`\`\`

### 🚀 Producción
\`\`\`env
# Configuración de producción
NEXTAUTH_SECRET="tu_secret_super_seguro_aqui"
NEXTAUTH_URL="https://tu-dominio.com"

# Base de datos de producción
NEXT_PUBLIC_SUPABASE_URL="https://tu-proyecto-prod.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu_anon_key_produccion"
SUPABASE_SERVICE_ROLE_KEY="tu_service_role_key_produccion"

NODE_ENV="production"
\`\`\`

## Generación de Secrets

### NEXTAUTH_SECRET
\`\`\`bash
# Opción 1: OpenSSL
openssl rand -base64 32

# Opción 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Opción 3: Online
# Visita: https://generate-secret.vercel.app/32
\`\`\`

## Configuración de Supabase

### 1. Crear Proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta
3. Crea un nuevo proyecto
4. Espera a que se inicialice (2-3 minutos)

### 2. Obtener Credenciales
1. Ve a **Settings** > **API**
2. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configurar Base de Datos
\`\`\`bash
# Después de configurar las variables de entorno
npm run dev

# Ve a http://localhost:3000/admin/setup
# Haz clic en "Configurar Base de Datos"
\`\`\`

## Verificación de Configuración

### Script de Verificación
Crea `scripts/verify-env.js`:

\`\`\`javascript
// scripts/verify-env.js
const requiredEnvVars = [
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL'
];

const optionalEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

console.log('🔍 Verificando configuración de entorno...\n');

// Verificar variables requeridas
let missingRequired = [];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    missingRequired.push(varName);
  } else {
    console.log(`✅ ${varName}: Configurado`);
  }
});

// Verificar variables opcionales
console.log('\n📋 Variables opcionales:');
optionalEnvVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: Configurado`);
  } else {
    console.log(`⚠️  ${varName}: No configurado (usando datos mock)`);
  }
});

if (missingRequired.length > 0) {
  console.log('\n❌ Variables requeridas faltantes:');
  missingRequired.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n📝 Crea un archivo .env.local con estas variables.');
  process.exit(1);
} else {
  console.log('\n✅ Configuración válida para desarrollo!');
}
\`\`\`

### Ejecutar Verificación
\`\`\`bash
node scripts/verify-env.js
\`\`\`

## Configuración por Plataforma de Deploy

### Vercel
1. Ve a tu proyecto en Vercel
2. **Settings** > **Environment Variables**
3. Agrega las variables una por una

### Netlify
1. **Site settings** > **Environment variables**
2. Agrega las variables necesarias

### Railway
1. **Variables** tab en tu proyecto
2. Agrega las variables de entorno

### DigitalOcean App Platform
1. **Settings** > **App-Level Environment Variables**
2. Agrega las variables necesarias

## Troubleshooting

### Error: "NEXTAUTH_SECRET is not set"
\`\`\`bash
# Agrega a .env.local
NEXTAUTH_SECRET="tu_secret_aqui"
\`\`\`

### Error: "Cannot connect to Supabase"
1. Verifica que las URLs sean correctas
2. Verifica que las keys no tengan espacios extra
3. Verifica que el proyecto de Supabase esté activo

### Error: "Environment variables not loaded"
1. Verifica que el archivo se llame `.env.local`
2. Verifica que esté en la raíz del proyecto
3. Reinicia el servidor de desarrollo

### Variables no se cargan en producción
1. Verifica que estén configuradas en tu plataforma de deploy
2. Verifica que no tengan prefijos incorrectos
3. Las variables que empiezan con `NEXT_PUBLIC_` son públicas

## Seguridad

### ⚠️ Variables Públicas
Las variables con `NEXT_PUBLIC_` son visibles en el cliente:
- `NEXT_PUBLIC_SUPABASE_URL` ✅ Seguro
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅ Seguro (solo lectura)

### 🔒 Variables Privadas
Estas NUNCA deben tener `NEXT_PUBLIC_`:
- `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Solo servidor
- `NEXTAUTH_SECRET` ⚠️ Solo servidor
- `DATABASE_URL` ⚠️ Solo servidor

### Buenas Prácticas
1. **Nunca** commits archivos `.env*` al repositorio
2. Usa diferentes secrets para desarrollo y producción
3. Rota los secrets regularmente
4. Usa variables de entorno específicas por entorno
