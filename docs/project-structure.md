# Estructura del Proyecto Qoredx LMS

Este documento describe la estructura general del proyecto, con énfasis en los componentes y elementos del dashboard.

## Estructura de Carpetas

\`\`\`
qoredx-lms/
├── app/                    # Carpetas de rutas de Next.js (App Router)
│   ├── admin/              # Rutas de administración
│   ├── dashboard/          # Rutas del dashboard principal
│   │   ├── add-content/    # Creación de contenido
│   │   ├── calendar/       # Vista de calendario
│   │   ├── classroom/      # Gestión de aula
│   │   ├── courses/        # Gestión de cursos
│   │   ├── qerniums/       # Gestión de qerniums
│   │   ├── qlusters/       # Gestión de qlusters
│   │   ├── review/         # Revisión de contenido
│   │   ├── skills/         # Gestión de habilidades
│   │   ├── layout.tsx      # Layout compartido del dashboard
│   │   └── page.tsx        # Página principal del dashboard
│   ├── info/               # Páginas informativas
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout raíz de la aplicación
│   └── page.tsx            # Página de inicio
├── components/             # Componentes reutilizables
│   ├── ui/                 # Componentes de UI básicos (shadcn)
│   ├── dashboard-*.tsx     # Componentes específicos del dashboard
│   ├── calendar-*.tsx      # Componentes relacionados con el calendario
│   ├── content-*.tsx       # Componentes relacionados con contenido
│   └── quill-editor.tsx    # Editor de texto enriquecido
├── lib/                    # Utilidades y lógica de negocio
│   ├── actions/            # Server Actions de Next.js
│   ├── db/                 # Configuración y esquema de base de datos
│   └── utils.ts            # Utilidades generales
├── public/                 # Archivos estáticos
├── scripts/                # Scripts de utilidad
└── docs/                   # Documentación
\`\`\`

## Componentes Principales del Dashboard

### Layouts y Navegación

1. **DashboardLayout** (`app/dashboard/layout.tsx`)
   - Layout principal que envuelve todas las páginas del dashboard
   - Incluye la barra lateral y la barra de navegación superior
   - Gestiona el estado de colapso de la barra lateral

2. **DashboardSidebar** (`app/dashboard/layout.tsx`)
   - Barra lateral con navegación principal
   - Incluye logo, enlaces a secciones principales y perfil de usuario
   - Soporta modo colapsado para maximizar espacio

3. **DashboardNavbar** (`app/dashboard/layout.tsx`)
   - Barra de navegación superior
   - Contiene notificaciones y búsqueda global

### Componentes Estructurales

1. **DashboardHeader** (`components/dashboard-header.tsx`)
   - Encabezado para páginas del dashboard
   - Muestra título, subtítulo y acciones contextuales

2. **DashboardShell** (`components/dashboard-shell.tsx`)
   - Contenedor principal para el contenido de las páginas
   - Proporciona espaciado y estructura consistentes

### Componentes Funcionales

1. **FloatingCalendar** (`components/floating-calendar.tsx`)
   - Botón que abre un modal de calendario
   - Permite ver y gestionar eventos

2. **CalendarModal** (`components/calendar-modal.tsx`)
   - Modal de calendario completo
   - Muestra eventos, permite navegación por meses y creación de eventos

3. **EventForm** (`components/event-form.tsx`)
   - Formulario para crear y editar eventos
   - Integrado con el modal de calendario

4. **ContentSearchModal** (`components/content-search-modal.tsx`)
   - Modal para buscar contenido existente
   - Permite filtrar, visualizar y clonar contenido

5. **QuillEditor** (`components/quill-editor.tsx`)
   - Editor de texto enriquecido
   - Utilizado para crear y editar contenido educativo

## Páginas Principales del Dashboard

### Dashboard Principal (`app/dashboard/page.tsx`)

La página principal del dashboard contiene:

1. **Encabezado de Bienvenida**
   - Título y subtítulo personalizados

2. **Sección de Horario**
   - Tabs para ver horarios por día, semana o mes
   - Lista de actividades programadas
   - Integración con el calendario

3. **Estadísticas Rápidas**
   - Tarjetas con métricas clave (Qlusters, Qerniums, Estudiantes, QorePlex)
   - Visualización de datos importantes

4. **Acciones Rápidas**
   - Botones para acciones frecuentes
   - Enlaces a secciones importantes

### Creación de Contenido (`app/dashboard/add-content/page.tsx`)

Página para crear y gestionar contenido educativo:

1. **Formulario de Creación**
   - Campos para título, descripción, tipo de contenido
   - Editor de texto enriquecido (QuillEditor)
   - Opciones de configuración avanzadas

2. **Búsqueda de Contenido**
   - Botón para abrir modal de búsqueda
   - Permite encontrar y clonar contenido existente

## Flujo de Datos

### Patrón de Comunicación Cliente-Servidor

1. **Server Actions**
   - Funciones del servidor definidas en `lib/actions/`
   - Utilizadas para operaciones CRUD y lógica de negocio
   - Invocadas directamente desde componentes del cliente

2. **Estado Local y Global**
   - Estado local gestionado con React hooks (useState, useEffect)
   - No se utiliza gestión de estado global (como Redux)

### Interacción con Base de Datos

1. **Cliente de Base de Datos**
   - Configurado en `lib/db/index.ts`
   - Utiliza Neon PostgreSQL para almacenamiento

2. **Esquema de Base de Datos**
   - Definido en `lib/db/schema.ts`
   - Incluye tablas para usuarios, cursos, contenido, eventos, etc.

## Patrones de Diseño

1. **Componentes Compuestos**
   - Componentes que se componen de subcomponentes más pequeños
   - Ejemplo: DashboardShell + DashboardHeader

2. **Separación de Preocupaciones**
   - Componentes de UI separados de la lógica de negocio
   - Server Actions para operaciones del servidor

3. **Diseño Responsivo**
   - Interfaces adaptables a diferentes tamaños de pantalla
   - Uso de Tailwind CSS para estilos responsivos

4. **Modales Contextuales**
   - Uso de modales para acciones específicas sin cambiar de página
   - Ejemplo: CalendarModal, ContentSearchModal
