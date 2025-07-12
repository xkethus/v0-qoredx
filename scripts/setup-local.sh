#!/bin/bash

# Script de configuración local para QoreEdu LMS
# Ejecutar con: bash scripts/setup-local.sh

echo "🚀 Configurando QoreEdu LMS para desarrollo local..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18+ desde https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versión 18+ requerida. Versión actual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Verificar npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado"
    exit 1
fi

echo "✅ npm $(npm -v) detectado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

echo "✅ Dependencias instaladas correctamente"

# Crear archivo .env.local si no existe
if [ ! -f ".env.local" ]; then
    echo "📝 Creando archivo .env.local..."
    
    # Generar secret aleatorio
    SECRET=$(openssl rand -base64 32 2>/dev/null || node -e "console.log(require('crypto').randomBytes(32).toString('base64'))")
    
    cat > .env.local << EOF
# ==============================================
# CONFIGURACIÓN BÁSICA PARA DESARROLLO LOCAL
# ==============================================
NEXTAUTH_SECRET="$SECRET"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"

# ==============================================
# BASE DE DATOS - SUPABASE (OPCIONAL)
# ==============================================
# Descomenta y configura si quieres usar Supabase
# NEXT_PUBLIC_SUPABASE_URL="https://tu-proyecto.supabase.co"
# NEXT_PUBLIC_SUPABASE_ANON_KEY="tu_anon_key_aqui"
# SUPABASE_SERVICE_ROLE_KEY="tu_service_role_key_aqui"

# ==============================================
# NOTAS
# ==============================================
# - El proyecto funciona con datos mock por defecto
# - No necesitas configurar base de datos para desarrollo
# - Para usar Supabase, descomenta las variables de arriba
EOF

    echo "✅ Archivo .env.local creado con configuración básica"
else
    echo "ℹ️  Archivo .env.local ya existe, no se modificará"
fi

# Verificar configuración
echo "🔍 Verificando configuración..."

# Crear script de verificación temporal
cat > temp_verify.js << 'EOF'
require('dotenv').config({ path: '.env.local' });

const requiredVars = ['NEXTAUTH_SECRET', 'NEXTAUTH_URL'];
let missing = [];

requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    missing.push(varName);
  }
});

if (missing.length > 0) {
  console.log('❌ Variables faltantes:', missing.join(', '));
  process.exit(1);
} else {
  console.log('✅ Configuración básica válida');
}
EOF

node temp_verify.js
rm temp_verify.js

# Verificar build
echo "🔨 Verificando que el proyecto compile..."
npm run build > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Proyecto compila correctamente"
else
    echo "⚠️  Advertencia: El proyecto tiene errores de compilación, pero puede funcionar en desarrollo"
fi

# Instrucciones finales
echo ""
echo "🎉 ¡Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Ejecutar: npm run dev"
echo "   2. Abrir: http://localhost:3000"
echo "   3. Explorar: /student/dashboard (navegación 3D)"
echo "   4. Administrar: /dashboard (panel admin)"
echo ""
echo "📚 Documentación:"
echo "   - docs/deployment-guide.md - Guía completa"
echo "   - docs/quick-start.md - Inicio rápido"
echo "   - docs/environment-setup.md - Configuración avanzada"
echo ""
echo "🔧 Configuración opcional:"
echo "   - Para usar Supabase: edita .env.local"
echo "   - Para personalizar: revisa tailwind.config.ts"
echo "   - Para agregar contenido: edita lib/data/*.json"
echo ""
echo "🚀 ¡Listo para desarrollar!"
