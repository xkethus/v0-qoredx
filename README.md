# QoreEdu LMS

![QoreEdu LMS](https://via.placeholder.com/1200x400?text=QoreEdu+LMS)

## Descripción

QoreEdu LMS es una plataforma de gestión de aprendizaje (Learning Management System) moderna y flexible diseñada para instituciones educativas. Permite la creación, gestión y seguimiento de contenido educativo, cursos, evaluaciones y progreso de estudiantes.

## Características Principales

- **Dashboard Intuitivo**: Interfaz de usuario moderna con visualización clara de datos y actividades
- **Gestión de Contenido**: Creación y organización de material educativo (Qerniums)
- **Sistema de Cursos**: Estructura jerárquica con Qlusters y Qerniums
- **Calendario Integrado**: Gestión de eventos y actividades académicas
- **Evaluaciones**: Creación y gestión de evaluaciones con diferentes tipos de preguntas
- **Análisis de Datos**: Seguimiento del progreso de estudiantes y efectividad del contenido
- **Diseño Responsivo**: Experiencia óptima en dispositivos móviles y de escritorio

## Cambios Recientes

### Interfaz de Usuario
- Simplificación del dashboard principal
- Eliminación de botones redundantes en la navegación
- Mejora en la visualización del calendario
- Implementación de modal de calendario a pantalla completa
- Indicadores visuales para días con actividades programadas

### Funcionalidad de Contenido
- Nuevo buscador de contenido con ícono de binoculares
- Capacidad para clonar contenido existente
- Búsqueda avanzada por nombre, ID, creador y curso
- Visualización previa de contenido antes de clonar

### Base de Datos
- Configuración para conexión a base de datos PostgreSQL real
- Scripts de inicialización y población de datos
- Mejora en el manejo de errores de conexión
- Soporte para entornos de desarrollo y producción

### Documentación
- Documentación detallada de la estructura del proyecto
- Documentación de componentes del dashboard
- Documentación de páginas principales
- Especificación de endpoints de API

## Instalación

### Requisitos Previos
- Node.js v18 o superior
- Base de datos PostgreSQL (recomendamos [Neon](https://neon.tech))

### Pasos de Instalación

1. Clonar el repositorio:
\`\`\`bash
git clone https://github.com/tu-usuario/qoreedu-lms.git
cd qoreedu-lms
\`\`\`

2. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`

3. Configurar variables de entorno:
   - Crea un archivo `.env.local` en la raíz del proyecto
   - Añade las siguientes variables:
\`\`\`
DATABASE_URL=postgresql://usuario:contraseña@endpoint/nombre_db
\`\`\`

4. Verificar la conexión a la base de datos:
\`\`\`bash
npm run db:check
\`\`\`

5. Inicializar la estructura de la base de datos:
\`\`\`bash
npm run db:init
\`\`\`

6. (Opcional) Sembrar datos iniciales:
\`\`\`bash
npm run db:seed
\`\`\`

7. Iniciar el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

## Estructura del Proyecto

\`\`\`
qoreedu-lms/
├── app/                    # Rutas y páginas de la aplicación
│   ├── dashboard/          # Páginas del dashboard
│   ├── admin/              # Páginas de administración
│   └── ...
├── components/             # Componentes reutilizables
│   ├── ui/                 # Componentes de interfaz básicos
│   └── ...
├── lib/                    # Utilidades y lógica de negocio
│   ├── actions/            # Acciones del servidor
│   ├── db/                 # Configuración de base de datos
│   └── ...
├── public/                 # Archivos estáticos
├── scripts/                # Scripts de utilidad
└── docs/                   # Documentación
    ├── project-structure.md    # Estructura del proyecto
    ├── dashboard-components.md # Componentes del dashboard
    ├── dashboard-pages.md      # Páginas del dashboard
    └── api-endpoints.md        # Endpoints de API
\`\`\`

## Documentación

Hemos creado documentación detallada para facilitar el desarrollo y mantenimiento del proyecto:

- [Estructura del Proyecto](docs/project-structure.md): Visión general de la organización del código
- [Componentes del Dashboard](docs/dashboard-components.md): Detalles de los componentes utilizados
- [Páginas del Dashboard](docs/dashboard-pages.md): Descripción de las páginas principales
- [Endpoints de API](docs/api-endpoints.md): Especificación de la API para integración con backend

## Comandos Útiles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia la aplicación en modo producción
- `npm run db:check`: Verifica la conexión a la base de datos
- `npm run db:init`: Inicializa la estructura de la base de datos
- `npm run db:seed`: Siembra datos iniciales
- `npm run db:reset`: Reinicia la base de datos (inicializa y siembra)

## Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Nombre del Equipo - [@qoreedu](https://twitter.com/qoreedu) - info@qoreedu.com

Link del Proyecto: [https://github.com/tu-usuario/qoreedu-lms](https://github.com/tu-usuario/qoreedu-lms)
