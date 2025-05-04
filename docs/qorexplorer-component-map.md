# Mapa de Componentes de QoreXplorer

Este documento proporciona un mapa visual de la estructura de componentes del visor QoreXplorer, mostrando las relaciones entre los diferentes elementos y su jerarquía.

## Estructura General

\`\`\`
StudentDashboardPage
├── StudentHeader
├── StudentSidebar
├── SpaceNavigation
│   ├── SpaceScene
│   │   ├── Stars
│   │   ├── QlusterNodes
│   │   ├── QerniumNodes
│   │   └── Connections
│   ├── CockpitOverlay (HUD)
│   │   ├── Frame
│   │   ├── Console
│   │   ├── ConsoleButtons
│   │   └── Lights
│   └── CustomizationPanel
├── HUDToggleButton
├── QerniumPreviewModal
├── QlusterInfoModal
└── AchievementNotification
\`\`\`

## Jerarquía de Componentes

### Nivel 1: Contenedores Principales
- **StudentDashboardPage**: Contenedor principal de la experiencia del estudiante
  - Archivo: `app/student/dashboard/page.tsx`

### Nivel 2: Componentes de Navegación y Layout
- **StudentHeader**: Barra superior con información del usuario
  - Archivo: `components/student/student-header.tsx`
- **StudentSidebar**: Panel lateral con opciones de navegación
  - Archivo: `components/student/student-sidebar.tsx`
- **SpaceNavigation**: Componente principal para la visualización 3D
  - Archivo: `components/student/space-navigation.tsx`

### Nivel 3: Componentes del Espacio 3D
- **SpaceScene**: Escena 3D con estrellas, Qlusters y Qerniums
  - Archivo: `components/student/space-navigation.tsx`
- **QlusterNode**: Representación visual de un Qluster
  - Archivo: `components/student/space-navigation.tsx`
- **QerniumNode**: Representación visual de un Qernium
  - Archivo: `components/student/space-navigation.tsx`
- **Connection**: Línea que conecta Qlusters y Qerniums
  - Archivo: `components/student/space-navigation.tsx`

### Nivel 3: Componentes del HUD
- **CockpitOverlay**: Marco visual que simula una cabina espacial
  - Archivo: `components/student/space-navigation.tsx`
- **HUDToggleButton**: Botón para mostrar/ocultar el HUD
  - Archivo: `components/student/hud-toggle-button.tsx`

### Nivel 4: Elementos del HUD
- **Frame**: Marco estructural del HUD
  - Función: `renderFrame()` en `components/student/space-navigation.tsx`
- **Console**: Panel de control inferior
  - Función: `renderConsole()` en `components/student/space-navigation.tsx`
- **ConsoleButtons**: Botones interactivos en la consola
  - Función: `renderConsoleButtons()` en `components/student/space-navigation.tsx`
- **Lights**: Sistema de iluminación del HUD
  - Función: `renderLights()` en `components/student/space-navigation.tsx`

### Nivel 3: Modales y Notificaciones
- **QerniumPreviewModal**: Modal con vista previa de un Qernium
  - Archivo: `components/qernium-preview-modal.tsx`
- **QlusterInfoModal**: Modal con información detallada de un Qluster
  - Archivo: `components/student/qluster-info-modal.tsx`
- **AchievementNotification**: Notificación de logros desbloqueados
  - Archivo: `components/student/achievement-notification.tsx`

## Flujo de Datos

\`\`\`
HUDContext
├── showHUD
├── toggleHUD()
├── customizations
├── hudStyle
├── updateCustomization()
└── updateHUDStyle()
\`\`\`

El flujo de datos principal se gestiona a través del HUDContext, que proporciona:
- Estado de visibilidad del HUD
- Configuración de estilos del HUD
- Colores personalizados
- Funciones para actualizar la configuración

Este contexto es consumido por:
- SpaceNavigation (para renderizar el HUD)
- HUDToggleButton (para alternar la visibilidad)
- CustomizationPanel (para modificar la configuración)

## Interacciones Principales

1. **Navegación Espacial**:
   - El usuario puede hacer zoom, rotar y desplazarse por el espacio 3D
   - Al hacer hover sobre un nodo (Qluster o Qernium), se muestra información
   - Al hacer clic en un nodo, se abre el modal correspondiente

2. **Personalización del HUD**:
   - El usuario puede mostrar/ocultar el HUD con el HUDToggleButton
   - El panel de personalización permite cambiar colores y estilos
   - Las preferencias se guardan en localStorage

3. **Interacción con Contenido**:
   - Los Qerniums disponibles se pueden seleccionar para ver su contenido
   - Los Qlusters proporcionan información sobre un área temática
   - Las conexiones muestran relaciones entre Qlusters y Qerniums
