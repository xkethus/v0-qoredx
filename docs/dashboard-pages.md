# Páginas del Dashboard de Qoredx LMS

Este documento detalla las principales páginas del dashboard de Qoredx LMS, su estructura, componentes y funcionalidad.

## Página Principal del Dashboard

**Ruta:** `/dashboard`
**Archivo:** `app/dashboard/page.tsx`

### Estructura

La página principal del dashboard está organizada en secciones:

1. **Encabezado**
   - Título "Dashboard"
   - Subtítulo de bienvenida

2. **Contenido Principal (Grid de 3 columnas en pantallas grandes)**
   - Columnas 1-2: Tabs de horario y entregas
   - Columna 3: Estadísticas y acciones rápidas

### Componentes Principales

1. **Tabs de Horario**
   - Selector de vista: Hoy, Esta Semana, Este Mes
   - Tarjeta de horario diario con actividades programadas
   - Botón de calendario flotante

2. **Tarjeta de Próximas Entregas**
   - Lista de entregas pendientes
   - Información de plazos
   - Barras de progreso de entregas

3. **Tarjeta de Estadísticas Rápidas**
   - Métricas clave en formato de cuadrícula
   - Iconos representativos
   - Valores numéricos destacados

4. **Tarjeta de Acciones Rápidas**
   - Botones para acciones frecuentes
   - Enlaces a secciones importantes

### Funcionalidad

- Visualización rápida de actividades del día
- Acceso a información de entregas pendientes
- Vista general de métricas importantes
- Acceso rápido a acciones frecuentes

## Página de Creación de Contenido

**Ruta:** `/dashboard/add-content`
**Archivo:** `app/dashboard/add-content/page.tsx`

### Estructura

1. **Encabezado**
   - Título "Crear Contenido"
   - Subtítulo descriptivo
   - Botones de acción (Publicar, Buscar)

2. **Formulario de Creación**
   - Campos de información básica
   - Editor de contenido
   - Opciones de configuración

### Componentes Principales

1. **Formulario de Información Básica**
   - Campos para título, descripción, tipo de contenido
   - Selectores para curso, módulo, etc.

2. **QuillEditor**
   - Editor de texto enriquecido
   - Herramientas de formato

3. **ContentSearchModal**
   - Modal para buscar contenido existente
   - Opciones para clonar o visualizar

### Funcionalidad

- Creación de nuevo contenido educativo
- Edición de contenido con formato enriquecido
- Búsqueda y clonación de contenido existente
- Publicación de contenido en la plataforma

## Página de Calendario

**Ruta:** `/dashboard/calendar`
**Archivo:** `app/dashboard/calendar/page.tsx`

### Estructura

1. **Encabezado**
   - Título "Calendario"
   - Subtítulo descriptivo
   - Botones de acción (Añadir Evento, Filtrar)

2. **Vista de Calendario**
   - Calendario mensual completo
   - Eventos visualizados por color según tipo
   - Navegación entre meses

### Componentes Principales

1. **Calendario Completo**
   - Vista mensual con días y eventos
   - Navegación entre meses
   - Indicadores visuales de eventos

2. **Formulario de Eventos**
   - Campos para título, fecha, hora, tipo
   - Opciones para asociar con cursos o clases

### Funcionalidad

- Visualización de todos los eventos programados
- Creación y edición de eventos
- Filtrado de eventos por tipo o curso
- Navegación entre diferentes períodos de tiempo

## Página de Classroom

**Ruta:** `/dashboard/classroom`
**Archivo:** `app/dashboard/classroom/page.tsx`

### Estructura

1. **Encabezado**
   - Título "Classroom"
   - Subtítulo descriptivo
   - Botones de acción (Añadir Estudiante, Filtrar)

2. **Lista de Estudiantes**
   - Tabla con información de estudiantes
   - Opciones de filtrado y búsqueda
   - Acciones por estudiante

### Componentes Principales

1. **Tabla de Estudiantes**
   - Columnas para nombre, email, curso, progreso
   - Opciones de ordenación
   - Paginación para listas largas

2. **StudentDetailModal**
   - Modal con información detallada del estudiante
   - Progreso en cursos y actividades
   - Historial de interacciones

### Funcionalidad

- Gestión de estudiantes
- Seguimiento de progreso individual
- Asignación de estudiantes a cursos
- Comunicación con estudiantes

## Página de Qerniums

**Ruta:** `/dashboard/qerniums`
**Archivo:** `app/dashboard/qerniums/page.tsx`

### Estructura

1. **Encabezado**
   - Título "Qerniums"
   - Subtítulo descriptivo
   - Botón de creación

2. **Lista de Qerniums**
   - Tarjetas o tabla con qerniums existentes
   - Opciones de filtrado y búsqueda
   - Acciones por qernium

### Componentes Principales

1. **Lista de Qerniums**
   - Visualización de qerniums existentes
   - Información básica por qernium
   - Opciones de ordenación y filtrado

2. **QerniumViewer**
   - Visualizador de contenido de qernium
   - Opciones para editar o duplicar

### Funcionalidad

- Gestión de qerniums (unidades de contenido)
- Creación y edición de qerniums
- Visualización de contenido
- Organización por categorías o cursos

## Página de Qlusters

**Ruta:** `/dashboard/qlusters`
**Archivo:** `app/dashboard/qlusters/page.tsx`

### Estructura

1. **Encabezado**
   - Título "Qlusters"
   - Subtítulo descriptivo
   - Botón de creación

2. **Lista de Qlusters**
   - Visualización de qlusters existentes
   - Información de estructura y contenido
   - Acciones por qluster

### Componentes Principales

1. **Lista de Qlusters**
   - Tarjetas o tabla con qlusters existentes
   - Información de estructura y contenido
   - Opciones de filtrado

2. **CourseHierarchyView**
   - Visualización jerárquica de la estructura
   - Relaciones entre qlusters y qerniums

### Funcionalidad

- Gestión de qlusters (agrupaciones de contenido)
- Creación y edición de estructura
- Organización jerárquica de contenido
- Visualización de relaciones entre elementos

## Página de Habilidades

**Ruta:** `/dashboard/skills`
**Archivo:** `app/dashboard/skills/page.tsx`

### Estructura

1. **Encabezado**
   - Título "Habilidades"
   - Subtítulo descriptivo
   - Botones de acción

2. **Gestión de Habilidades**
   - Lista de habilidades definidas
   - Opciones para crear y editar
   - Visualización de relaciones

### Componentes Principales

1. **Lista de Habilidades**
   - Visualización de habilidades existentes
   - Información de niveles y requisitos
   - Opciones de filtrado

2. **HierarchyVisualization**
   - Visualización gráfica de relaciones entre habilidades
   - Dependencias y prerrequisitos

### Funcionalidad

- Definición de habilidades y competencias
- Establecimiento de niveles y criterios
- Asociación con contenido educativo
- Visualización de relaciones jerárquicas

## Página de Revisión

**Ruta:** `/dashboard/review`
**Archivo:** `app/dashboard/review/page.tsx`

### Estructura

1. **Encabezado**
   - Título "Tests & Review"
   - Subtítulo descriptivo
   - Botones de acción

2. **Lista de Evaluaciones**
   - Evaluaciones pendientes de revisión
   - Estadísticas de resultados
   - Opciones de filtrado

### Componentes Principales

1. **Lista de Evaluaciones**
   - Tabla o tarjetas con evaluaciones
   - Información de estado y plazos
   - Opciones de filtrado

2. **QuizQuestionEditor**
   - Editor de preguntas y respuestas
   - Opciones de configuración

### Funcionalidad

- Revisión de evaluaciones completadas
- Análisis de resultados
- Creación y edición de preguntas
- Gestión de retroalimentación
