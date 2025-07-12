# Guía de Implementación Local - QoreEdu LMS

Esta guía te ayudará a configurar y ejecutar el proyecto QoreEdu LMS en tu entorno local.

## Requisitos Previos

### Software Necesario
- **Node.js** (versión 18 o superior)
- **npm** o **yarn** (gestor de paquetes)
- **Git** (para clonar el repositorio)
- **Editor de código** (recomendado: VS Code)

### Servicios Opcionales
- **Supabase** (para base de datos en la nube) - Opcional
- **Vercel** (para deploy en producción) - Opcional

## Paso 1: Clonar y Configurar el Proyecto

### 1.1 Clonar el Repositorio
\`\`\`bash
git clone <URL_DEL_REPOSITORIO>
cd qoredx-lms
\`\`\`

### 1.2 Instalar Dependencias
\`\`\`bash
npm install
# o si prefieres yarn
yarn install
\`\`\`

### 1.3 Configurar Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto:

\`\`\`env
# Base de datos (Opcional - el proyecto funciona con datos mock)
DATABASE_URL="postgresql://usuario:password@localhost:5432/qoredx"
POSTGRES_URL="postgresql://usuario:password@localhost:5432/qoredx"

# Supabase (Opcional)
NEXT_PUBLIC_SUPABASE_URL="tu_supabase_url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu_supabase_anon_key"
SUPABASE_SERVICE_ROLE_KEY="tu_supabase_service_role_key"

# Next.js
NEXTAUTH_SECRET="tu_secret_key_aqui"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

## Paso 2: Ejecutar el Proyecto

### 2.1 Modo Desarrollo
\`\`\`bash
npm run dev
# o
yarn dev
\`\`\`

El proyecto estará disponible en: `http://localhost:3000`

### 2.2 Verificar la Instalación
1. Abre tu navegador en `http://localhost:3000`
2. Deberías ver la página principal del LMS
3. Navega a `/student/dashboard` para ver el dashboard del estudiante
4. Navega a `/dashboard` para ver el dashboard del administrador

## Paso 3: Configuración de Base de Datos (Opcional)

### 3.1 Usando Datos Mock (Recomendado para desarrollo)
El proyecto viene configurado con datos mock que no requieren base de datos real. Esto está configurado en:
- `lib/db/index.ts` - Cliente mock de Supabase
- `lib/mock-data.ts` - Datos de ejemplo
- `lib/data/*.json` - Archivos de datos estáticos

### 3.2 Configurar Supabase (Opcional)
Si quieres usar una base de datos real:

1. **Crear cuenta en Supabase**
   - Ve a [supabase.com](https://supabase.com)
   - Crea una cuenta gratuita
   - Crea un nuevo proyecto

2. **Configurar variables de entorno**
   - Copia las credenciales de tu proyecto Supabase
   - Actualiza el archivo `.env.local`

3. **Inicializar base de datos**
   \`\`\`bash
   # Visita la página de configuración
   http://localhost:3000/admin/setup
   
   # O ejecuta los scripts manualmente
   npm run db:init
   npm run db:seed
   \`\`\`

## Paso 4: Estructura del Proyecto

### 4.1 Directorios Principales
\`\`\`
qoredx-lms/
├── app/                    # Páginas de Next.js (App Router)
│   ├── dashboard/         # Dashboard del administrador
│   ├── student/           # Dashboard del estudiante
│   └── api/               # API routes
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de UI (shadcn/ui)
│   └── student/          # Componentes específicos del estudiante
├── lib/                   # Utilidades y configuración
│   ├── data/             # Datos mock y estáticos
│   ├── db/               # Configuración de base de datos
│   └── actions/          # Server Actions
├── docs/                  # Documentación
├── scripts/              # Scripts de configuración
└── public/               # Archivos estáticos
\`\`\`

### 4.2 Páginas Principales
- `/` - Página de inicio
- `/student/dashboard` - Dashboard del estudiante con navegación 3D
- `/dashboard` - Dashboard del administrador
- `/admin/setup` - Configuración de base de datos

## Paso 5: Funcionalidades Principales

### 5.1 Dashboard del Estudiante
- **Navegación 3D espacial** - Interfaz inmersiva para explorar contenido
- **HUD integrado** - Información contextual y controles
- **Qlusters** - Cursos y contenido educativo
- **Qerniums** - Unidades de aprendizaje específicas
- **Progreso** - Seguimiento del avance del estudiante

### 5.2 Dashboard del Administrador
- **Gestión de contenido** - Crear y editar Qerniums y Qlusters
- **Analytics** - Métricas y reportes
- **Calendario** - Gestión de eventos y clases
- **Estudiantes** - Administración de usuarios

## Paso 6: Desarrollo y Personalización

### 6.1 Agregar Nuevos Componentes
\`\`\`bash
# Crear un nuevo componente
touch components/mi-componente.tsx
\`\`\`

### 6.2 Modificar Estilos
- Los estilos están en `app/globals.css`
- Usa Tailwind CSS para estilos utilitarios
- Los componentes UI están en `components/ui/`

### 6.3 Agregar Nuevas Páginas
\`\`\`bash
# Crear nueva página
mkdir app/mi-pagina
touch app/mi-pagina/page.tsx
\`\`\`

## Paso 7: Build y Deploy

### 7.1 Build Local
\`\`\`bash
npm run build
npm start
\`\`\`

### 7.2 Deploy en Vercel
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático desde Git

### 7.3 Deploy en Otros Servicios
El proyecto es compatible con:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## Paso 8: Solución de Problemas

### 8.1 Errores Comunes

**Error: Cannot find module**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

**Error: Port 3000 already in use**
\`\`\`bash
# Cambiar puerto
npm run dev -- -p 3001
\`\`\`

**Error de TypeScript**
\`\`\`bash
# Verificar tipos
npm run type-check
\`\`\`

### 8.2 Logs y Debugging
- Los logs aparecen en la consola del navegador
- Los errores del servidor aparecen en la terminal
- Usa `console.log()` para debugging

## Paso 9: Datos de Prueba

### 9.1 Usuarios de Ejemplo
El sistema incluye datos mock con:
- **Administrador**: admin@qoreedu.com
- **Estudiantes**: Varios perfiles de prueba
- **Contenido**: Qerniums y Qlusters de ejemplo

### 9.2 Navegación de Prueba
1. Ve a `/student/dashboard`
2. Usa los controles de navegación 3D
3. Explora los diferentes Qlusters
4. Prueba el HUD y sus funcionalidades

## Paso 10: Próximos Pasos

### 10.1 Personalización
- Modifica los colores en `tailwind.config.ts`
- Personaliza los componentes en `components/`
- Agrega tu propio contenido en `lib/data/`

### 10.2 Integración
- Conecta con tu sistema de autenticación
- Integra con tu base de datos existente
- Agrega nuevas funcionalidades

## Soporte y Recursos

### Documentación Adicional
- `docs/project-structure.md` - Estructura detallada del proyecto
- `docs/dashboard-components.md` - Componentes del dashboard
- `docs/qorexplorer-technical-reference.md` - Referencia técnica

### Tecnologías Utilizadas
- **Next.js 15** - Framework de React
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **shadcn/ui** - Componentes de UI
- **React Three Fiber** - Gráficos 3D
- **Supabase** - Base de datos (opcional)

### Contacto
Para soporte adicional, consulta la documentación o crea un issue en el repositorio.
