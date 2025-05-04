# Glosario de QoreXplorer

Este documento sirve como referencia para todos los componentes, elementos y conceptos del visor QoreXplorer, para facilitar la comunicación y evitar confusiones durante el desarrollo.

## Conceptos Educativos

### Qluster
**Descripción:** Agrupación de contenido educativo que representa un área de conocimiento o tema. Los Qlusters contienen Qerniums.  
**Representación Visual:** Esferas grandes en el espacio 3D, con un color distintivo.  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (visualización)
- `components/student/qluster-info-modal.tsx` (información detallada)
- `lib/mock-data.ts` (datos de ejemplo)

### Qernium
**Descripción:** Unidad educativa individual que contiene contenido específico como cuestionarios, lecturas o actividades.  
**Representación Visual:** Octaedros más pequeños que orbitan alrededor de los Qlusters.  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (visualización)
- `components/qernium-preview-modal.tsx` (vista previa)
- `components/qernium-viewer.tsx` (visualización completa)
- `lib/mock-data.ts` (datos de ejemplo)

### Niveles de Bloom
**Descripción:** Clasificación de los Qerniums según la taxonomía de Bloom (recordar, comprender, aplicar, analizar, evaluar, crear).  
**Representación Visual:** Colores diferentes en los badges de los Qerniums.  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (visualización de badges)

## Interfaz de Usuario

### HUD (Heads-Up Display)
**Descripción:** Interfaz superpuesta que enmarca la visualización del espacio 3D, simulando una cabina de nave espacial.  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (componente CockpitOverlay)
- `lib/contexts/hud-context.tsx` (gestión del estado)
- `components/student/hud-toggle-button.tsx` (botón para activar/desactivar)

### Cockpit (Cabina)
**Descripción:** El marco visual que rodea la visualización del espacio, simulando estar dentro de una nave espacial.  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (función CockpitOverlay)

### Console (Consola)
**Descripción:** Parte inferior del HUD donde se muestran controles y botones interactivos.  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (función renderConsole)

### Frame (Marco)
**Descripción:** Estructura que rodea la visualización del espacio 3D, parte del HUD.  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (función renderFrame)

### Sidebar (Barra lateral)
**Descripción:** Panel lateral que contiene navegación y opciones adicionales.  
**Archivos Relacionados:** 
- `components/student/student-sidebar.tsx`

### Header (Cabecera)
**Descripción:** Barra superior con información del usuario y controles principales.  
**Archivos Relacionados:** 
- `components/student/student-header.tsx`

## Elementos del Espacio 3D

### Space Scene (Escena Espacial)
**Descripción:** El entorno 3D principal donde se visualizan los Qlusters y Qerniums.  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (función SpaceScene)

### Node (Nodo)
**Descripción:** Término genérico para referirse a elementos interactivos en el espacio 3D (Qlusters o Qerniums).  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (funciones QlusterNode y QerniumNode)

### Connection (Conexión)
**Descripción:** Línea visual que conecta un Qluster con sus Qerniums.  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (función Connection)

### Stars (Estrellas)
**Descripción:** Fondo de estrellas que proporciona profundidad al espacio 3D.  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (componente Stars en SpaceScene)

## Personalización del HUD

### Frame Style (Estilo de Marco)
**Descripción:** Apariencia visual del marco del HUD. Opciones: standard, minimal, tactical, futuristic.  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (función renderFrame)
- `lib/contexts/hud-context.tsx` (gestión del estado)

### Console Style (Estilo de Consola)
**Descripción:** Apariencia visual de la consola del HUD. Opciones: basic, touch, hologram, military.  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (función renderConsole)
- `lib/contexts/hud-context.tsx` (gestión del estado)

### Light Style (Estilo de Luces)
**Descripción:** Configuración de iluminación del HUD. Opciones: standard, ambient, neon, pulse.  
**Archivos Relacionados:** 
- `components/student/space-navigation.tsx` (función renderLights)
- `lib/contexts/hud-context.tsx` (gestión del estado)

### Customizations (Personalizaciones)
**Descripción:** Colores personalizables del HUD: frameColor, consoleColor, hologramColor, lightColor.  
**Archivos Relacionados:** 
- `lib/contexts/hud-context.tsx` (gestión del estado)
- `components/student/space-navigation.tsx` (panel de personalización)

## Componentes de Notificación

### Achievement Notification (Notificación de Logro)
**Descripción:** Notificación emergente que aparece cuando el estudiante desbloquea un logro.  
**Archivos Relacionados:** 
- `components/student/achievement-notification.tsx`

### HUD Tutorial (Tutorial de HUD)
**Descripción:** Overlay informativo que explica la interfaz de navegación espacial al usuario.  
**Archivos Relacionados:** 
- `app/student/dashboard/page.tsx` (componente showHUDTutorial)

### Intro Screen (Pantalla de Introducción)
**Descripción:** Pantalla inicial que da la bienvenida al estudiante antes de mostrar el espacio 3D.  
**Archivos Relacionados:** 
- `app/student/dashboard/page.tsx` (componente showIntro)

## Modales

### Qluster Info Modal (Modal de Información de Qluster)
**Descripción:** Ventana emergente con información detallada sobre un Qluster seleccionado.  
**Archivos Relacionados:** 
- `components/student/qluster-info-modal.tsx`

### Qernium Preview Modal (Modal de Vista Previa de Qernium)
**Descripción:** Ventana emergente con vista previa de un Qernium seleccionado.  
**Archivos Relacionados:** 
- `components/qernium-preview-modal.tsx`

## Contextos y Gestión de Estado

### HUD Context (Contexto de HUD)
**Descripción:** Contexto de React que gestiona el estado y la configuración del HUD.  
**Archivos Relacionados:** 
- `lib/contexts/hud-context.tsx`

## Datos

### Mock Data (Datos de Ejemplo)
**Descripción:** Datos ficticios utilizados para demostrar la funcionalidad del sistema.  
**Archivos Relacionados:** 
- `lib/mock-data.ts`

## Páginas Principales

### Student Dashboard (Dashboard del Estudiante)
**Descripción:** Página principal que muestra el espacio 3D y la interfaz de navegación.  
**Archivos Relacionados:** 
- `app/student/dashboard/page.tsx`

### Qernium View (Vista de Qernium)
**Descripción:** Página para interactuar con un Qernium específico.  
**Archivos Relacionados:** 
- `app/dashboard/student/qerniums/[id]/page.tsx`

### Qluster View (Vista de Qluster)
**Descripción:** Página que muestra todos los Qerniums dentro de un Qluster.  
**Archivos Relacionados:** 
- `app/student/qlusters/page.tsx`
