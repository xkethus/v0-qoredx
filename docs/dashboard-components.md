# Componentes del Dashboard de Qoredx LMS

Este documento detalla los componentes principales utilizados en el dashboard de Qoredx LMS, sus propiedades, y cómo utilizarlos.

## Componentes de Estructura

### DashboardHeader

**Archivo:** `components/dashboard-header.tsx`

**Descripción:** Encabezado consistente para las páginas del dashboard.

**Props:**
\`\`\`typescript
interface DashboardHeaderProps {
  heading: string;           // Título principal
  text?: string;             // Subtítulo o descripción (opcional)
  children?: React.ReactNode; // Contenido adicional (botones, acciones)
  className?: string;        // Clases CSS adicionales
}
\`\`\`

**Ejemplo de uso:**
\`\`\`tsx
<DashboardHeader 
  heading="Crear Contenido" 
  text="Crea y gestiona tu contenido educativo"
>
  <Button>Acción</Button>
</DashboardHeader>
\`\`\`

### DashboardShell

**Archivo:** `components/dashboard-shell.tsx`

**Descripción:** Contenedor principal para el contenido de las páginas del dashboard.

**Props:**
\`\`\`typescript
interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}
\`\`\`

**Ejemplo de uso:**
\`\`\`tsx
<DashboardShell>
  <div>Contenido de la página</div>
</DashboardShell>
\`\`\`

## Componentes de Navegación

### DashboardSidebar

**Archivo:** `app/dashboard/layout.tsx`

**Descripción:** Barra lateral con navegación principal del dashboard.

**Estado interno:**
- `isOpen`: Controla la visibilidad en dispositivos móviles
- `isCollapsed`: Controla si la barra está colapsada (solo iconos) o expandida
- `isTextVisible`: Controla la animación de texto al expandir/colapsar

**Características:**
- Navegación principal con iconos y texto
- Modo colapsado para maximizar espacio
- Adaptable a dispositivos móviles
- Perfil de usuario en la parte inferior

### DashboardNavbar

**Archivo:** `app/dashboard/layout.tsx`

**Descripción:** Barra de navegación superior del dashboard.

**Características:**
- Botones para notificaciones y búsqueda
- Diseño minimalista para no distraer del contenido principal

## Componentes de Calendario

### FloatingCalendar

**Archivo:** `components/floating-calendar.tsx`

**Descripción:** Botón que abre un modal de calendario completo.

**Props:**
\`\`\`typescript
interface FloatingCalendarProps {
  userId?: string;  // ID del usuario para cargar sus eventos
}
\`\`\`

**Ejemplo de uso:**
\`\`\`tsx
<FloatingCalendar userId="user-123" />
\`\`\`

### CalendarModal

**Archivo:** `components/calendar-modal.tsx`

**Descripción:** Modal de calendario completo con vista mensual y gestión de eventos.

**Props:**
\`\`\`typescript
interface CalendarModalProps {
  isOpen: boolean;           // Controla si el modal está abierto
  onClose: () => void;       // Función para cerrar el modal
  userId: string;            // ID del usuario para cargar sus eventos
}
\`\`\`

**Estado interno:**
- `currentMonth`: Mes actual visualizado
- `events`: Lista de eventos cargados
- `showEventForm`: Controla si se muestra el formulario de eventos
- `selectedEvent`: Evento seleccionado para editar
- `selectedDate`: Fecha seleccionada para crear un evento

**Ejemplo de uso:**
\`\`\`tsx
<CalendarModal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)} 
  userId="user-123" 
/>
\`\`\`

## Componentes de Contenido

### ContentSearchModal

**Archivo:** `components/content-search-modal.tsx`

**Descripción:** Modal para buscar, visualizar y clonar contenido existente.

**Props:**
\`\`\`typescript
interface ContentSearchModalProps {
  isOpen: boolean;           // Controla si el modal está abierto
  onClose: () => void;       // Función para cerrar el modal
  onSelectContent?: (content: any) => void; // Callback al seleccionar contenido
}
\`\`\`

**Estado interno:**
- `searchTerm`: Término de búsqueda
- `searchResults`: Resultados de la búsqueda
- `selectedContent`: Contenido seleccionado para ver detalles
- `isLoading`: Estado de carga durante la búsqueda

**Ejemplo de uso:**
\`\`\`tsx
<ContentSearchModal 
  isOpen={isSearchModalOpen} 
  onClose={() => setIsSearchModalOpen(false)}
  onSelectContent={(content) => handleContentSelect(content)}
/>
\`\`\`

### QuillEditor

**Archivo:** `components/quill-editor.tsx`

**Descripción:** Editor de texto enriquecido basado en Quill.

**Props:**
\`\`\`typescript
interface QuillEditorProps {
  value: string;             // Contenido inicial del editor
  onChange: (value: string) => void; // Callback al cambiar el contenido
  placeholder?: string;      // Texto de placeholder
  readOnly?: boolean;        // Modo de solo lectura
}
\`\`\`

**Ejemplo de uso:**
\`\`\`tsx
<QuillEditor 
  value={content} 
  onChange={setContent}
  placeholder="Escribe tu contenido aquí..."
/>
\`\`\`

## Tarjetas y Elementos Visuales

### Tarjetas de Dashboard

Las tarjetas en el dashboard siguen un patrón consistente:

1. **Tarjeta de Horario**
   - Muestra actividades programadas para el día
   - Código de colores por tipo de actividad
   - Información de hora y ubicación

2. **Tarjeta de Entregas**
   - Muestra próximas entregas y plazos
   - Barra de progreso para visualizar entregas completadas
   - Información de fecha límite

3. **Tarjeta de Estadísticas**
   - Muestra métricas clave en un formato de cuadrícula
   - Iconos representativos para cada métrica
   - Valores numéricos destacados

4. **Tarjeta de Acciones Rápidas**
   - Botones para acciones frecuentes
   - Iconos descriptivos
   - Enlaces a secciones importantes

## Patrones de Diseño Visual

### Esquema de Colores

El dashboard utiliza un esquema de colores consistente:

- **Fondo principal**: Negro con gradiente sutil (`bg-black`, `bg-[radial-gradient(...)]`)
- **Tarjetas**: Negro semi-transparente con efecto de vidrio (`bg-black/50`, `backdrop-blur-sm`)
- **Acentos por sección**:
  - Púrpura (`purple-300`, `purple-400`, `purple-500`) - Navegación y elementos generales
  - Cian (`cyan-300`, `cyan-400`, `cyan-500`) - Contenido y entregas
  - Rosa (`pink-300`, `pink-400`, `pink-500`) - Estadísticas y evaluaciones
  - Ámbar (`amber-300`, `amber-400`, `amber-500`) - Reuniones y eventos

### Tipografía

- **Títulos**: Tamaños variables con `font-bold` y ocasionalmente gradientes de texto
- **Texto regular**: Tamaño base con buena legibilidad
- **Texto secundario**: Utiliza `text-muted-foreground` para información menos importante

### Espaciado y Layout

- Uso consistente de `gap-4` y `gap-8` para espaciado entre elementos
- Estructura de cuadrícula responsiva con `grid-cols-2` y `lg:grid-cols-3`
- Márgenes internos consistentes con `p-4` y `p-6`

## Mejores Prácticas de Uso

1. **Consistencia Visual**
   - Utilizar los componentes DashboardHeader y DashboardShell en todas las páginas
   - Mantener el esquema de colores por tipo de contenido

2. **Responsividad**
   - Probar todas las interfaces en dispositivos móviles y de escritorio
   - Utilizar las clases responsivas de Tailwind (sm:, md:, lg:)

3. **Accesibilidad**
   - Incluir textos alternativos para iconos (`<span className="sr-only">...</span>`)
   - Asegurar suficiente contraste en textos

4. **Rendimiento**
   - Cargar datos de manera eficiente con Server Actions
   - Implementar paginación para listas largas
