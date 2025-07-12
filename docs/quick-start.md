# Guía de Inicio Rápido - QoreEdu LMS

## 🚀 Inicio en 5 Minutos

### 1. Clonar e Instalar
\`\`\`bash
git clone <URL_DEL_REPOSITORIO>
cd qoredx-lms
npm install
\`\`\`

### 2. Ejecutar
\`\`\`bash
npm run dev
\`\`\`

### 3. Abrir en el Navegador
\`\`\`
http://localhost:3000
\`\`\`

## 🎯 Páginas Principales

| URL | Descripción |
|-----|-------------|
| `/` | Página de inicio |
| `/student/dashboard` | Dashboard del estudiante (3D) |
| `/dashboard` | Dashboard del administrador |
| `/admin/setup` | Configuración inicial |

## 🛠️ Comandos Útiles

\`\`\`bash
# Desarrollo
npm run dev

# Build
npm run build
npm start

# Linting
npm run lint

# Base de datos (opcional)
npm run db:init
npm run db:seed
\`\`\`

## 📁 Estructura Básica

\`\`\`
qoredx-lms/
├── app/           # Páginas (Next.js App Router)
├── components/    # Componentes React
├── lib/           # Utilidades y datos
├── docs/          # Documentación
└── public/        # Archivos estáticos
\`\`\`

## 🎮 Funcionalidades Clave

- ✅ **Navegación 3D** - Interfaz espacial inmersiva
- ✅ **HUD Integrado** - Información contextual
- ✅ **Gestión de Contenido** - Qerniums y Qlusters
- ✅ **Dashboard Admin** - Panel de administración
- ✅ **Datos Mock** - Funciona sin base de datos
- ✅ **Responsive** - Compatible con móviles

## 🔧 Configuración Opcional

### Variables de Entorno (.env.local)
\`\`\`env
# Opcional - para base de datos real
NEXT_PUBLIC_SUPABASE_URL="tu_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu_key"
\`\`\`

### Sin Base de Datos
El proyecto funciona completamente con datos mock. No necesitas configurar base de datos para desarrollo.

## 🎨 Personalización Rápida

### Cambiar Colores
Edita `tailwind.config.ts`:
\`\`\`typescript
theme: {
  extend: {
    colors: {
      primary: "tu-color-aqui"
    }
  }
}
\`\`\`

### Agregar Contenido
Edita archivos en `lib/data/`:
- `qlusters.json` - Cursos
- `qerniums.json` - Unidades de aprendizaje
- `contents.json` - Contenido específico

## 🚨 Solución Rápida de Problemas

**Puerto ocupado:**
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

**Dependencias:**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

**TypeScript:**
\`\`\`bash
npm run build
\`\`\`

## 📚 Documentación Completa

Para más detalles, consulta:
- `docs/deployment-guide.md` - Guía completa de implementación
- `docs/project-structure.md` - Estructura del proyecto
- `docs/qorexplorer-technical-reference.md` - Referencia técnica
