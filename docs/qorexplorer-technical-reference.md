# Referencia Técnica de QoreXplorer

Este documento proporciona detalles técnicos sobre la implementación del visor QoreXplorer, incluyendo las tecnologías utilizadas, patrones de diseño y consideraciones técnicas importantes.

## Tecnologías Principales

### React Three Fiber
- **Descripción**: Biblioteca de React para crear gráficos 3D con Three.js
- **Uso**: Renderizado de la escena espacial 3D, Qlusters, Qerniums y efectos visuales
- **Componentes Clave**: Canvas, useFrame, useThree
- **Archivos**: `components/student/space-navigation.tsx`

### React Three Drei
- **Descripción**: Colección de helpers para React Three Fiber
- **Uso**: Controles de cámara, HTML en 3D, efectos visuales
- **Componentes Clave**: OrbitControls, Html, Stars
- **Archivos**: `components/student/space-navigation.tsx`

### Three.js
- **Descripción**: Biblioteca JavaScript para gráficos 3D
- **Uso**: Geometrías, materiales, luces, curvas y animaciones
- **Clases Clave**: Vector3, QuadraticBezierCurve3, LineDashedMaterial
- **Archivos**: `components/student/space-navigation.tsx`

### React Context API
- **Descripción**: API de React para gestión de estado global
- **Uso**: Gestión del estado del HUD y sus configuraciones
- **Contextos**: HUDContext
- **Archivos**: `lib/contexts/hud-context.tsx`

### localStorage
- **Descripción**: API del navegador para almacenamiento persistente
- **Uso**: Guardar preferencias de usuario para el HUD
- **Datos Almacenados**: showHUD, hudStyle, hudCustomizations
- **Archivos**: `lib/contexts/hud-context.tsx`

## Patrones de Diseño

### Componentes Compuestos
El visor utiliza un patrón de componentes compuestos donde SpaceNavigation contiene múltiples subcomponentes que trabajan juntos:
- SpaceScene
- CockpitOverlay
- QlusterNode
- QerniumNode
- Connection

### Render Props
Se utilizan funciones de renderizado condicional para los diferentes estilos del HUD:
- renderFrame()
- renderConsole()
- renderLights()
- renderConsoleButtons()

### Custom Hooks
Se implementan hooks personalizados para encapsular la lógica:
- useHUD(): Proporciona acceso al contexto del HUD

### Animaciones con useFrame
Se utiliza el hook useFrame de React Three Fiber para crear animaciones por fotograma:
- Movimiento sutil del marco del HUD
- Pulsación de luces
- Animación de nodos y conexiones

## Estructura de Datos

### Qluster
\`\`\`typescript
interface Qluster {
  id: string;
  title: string;
  description: string;
  color: string;
  position: [number, number, number];
  progress: number;
  qerniums?: string[];
}
\`\`\`

### Qernium
\`\`\`typescript
interface Qernium {
  id: string;
  title: string;
  description: string;
  qlusterId: string;
  position: [number, number, number];
  status: "published" | "draft" | "archived";
  bloomLevel: "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create";
  color?: string;
  content?: QerniumContent[];
  skills?: string[];
  creatorId?: string;
  creatorName?: string;
  actionVerb?: string;
  estimatedTime?: number;
}
\`\`\`

### HUD Customizations
\`\`\`typescript
interface HUDCustomizations {
  cockpitColor: string;
  frameColor: string;
  consoleColor: string;
  hologramColor: string;
  lightColor: string;
}
\`\`\`

### HUD Style
\`\`\`typescript
interface HUDStyle {
  frameStyle: "standard" | "minimal" | "tactical" | "futuristic";
  consoleStyle: "basic" | "touch" | "hologram" | "military";
  lightStyle: "standard" | "ambient" | "neon" | "pulse";
}
\`\`\`

## Optimizaciones

### Memoización
Se utiliza useMemo para calcular valores costosos solo cuando sus dependencias cambian:
- Puntos de las curvas de conexión
- Propiedades de los nodos basadas en su estado

### Renderizado Condicional
Se implementa renderizado condicional para mostrar/ocultar elementos según sea necesario:
- HUD visible/oculto
- Panel de personalización
- Información de nodos al hacer hover

### Geometrías Reutilizables
Se utilizan geometrías básicas de Three.js para optimizar el rendimiento:
- boxGeometry
- sphereGeometry
- octahedronGeometry
- torusGeometry

## Consideraciones Técnicas

### Rendimiento 3D
- Se limita el número de polígonos en las geometrías
- Se utilizan materiales simples cuando es posible
- Se implementa oclusión para HTML en 3D

### Compatibilidad con Navegadores
- Se requiere soporte para WebGL
- Se recomienda un navegador moderno (Chrome, Firefox, Edge, Safari)

### Accesibilidad
- Se proporcionan alternativas textuales para elementos visuales
- Se implementan controles de teclado para navegación
- Se utilizan contrastes adecuados para texto y elementos interactivos

### Responsive Design
- La interfaz se adapta a diferentes tamaños de pantalla
- El HUD ajusta su aspecto según las dimensiones del canvas
- Los controles táctiles están optimizados para dispositivos móviles
