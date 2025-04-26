# QoreEdu LMS - Versión con Base de Datos Real

Este es un fork del proyecto QoreEdu LMS que se conecta a una base de datos PostgreSQL real a través de Neon.

## Requisitos previos

1. Node.js v18 o superior
2. Una base de datos PostgreSQL (recomendamos usar [Neon](https://neon.tech) para desarrollo)

## Configuración de la base de datos

1. Crea una cuenta en [Neon](https://neon.tech) si aún no tienes una
2. Crea un nuevo proyecto en Neon
3. Obtén la cadena de conexión desde el panel de control de Neon
4. Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

\`\`\`
DATABASE_URL=postgresql://usuario:contraseña@endpoint/nombre_db
\`\`\`

## Inicialización del proyecto

1. Instala las dependencias:

\`\`\`bash
npm install
\`\`\`

2. Verifica la conexión a la base de datos:

\`\`\`bash
npm run db:check
\`\`\`

3. Inicializa la estructura de la base de datos:

\`\`\`bash
npm run db:init
\`\`\`

4. Siembra datos iniciales (opcional):

\`\`\`bash
npm run db:seed
\`\`\`

5. Inicia el servidor de desarrollo:

\`\`\`bash
npm run dev
\`\`\`

## Estructura del proyecto

- `/lib/db/index.ts` - Configuración de la conexión a la base de datos
- `/lib/db/schema.ts` - Definición del esquema de la base de datos
- `/scripts` - Scripts para inicializar y sembrar la base de datos
- `/lib/actions` - Acciones del servidor para interactuar con la base de datos

## Credenciales de prueba

Después de ejecutar el script de siembra de datos, puedes acceder al sistema con las siguientes credenciales:

- **Email**: admin@qoreedu.com
- **Password**: password123

## Comandos útiles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run db:check`: Verifica la conexión a la base de datos
- `npm run db:init`: Inicializa la estructura de la base de datos
- `npm run db:seed`: Siembra datos iniciales
- `npm run db:reset`: Reinicia la base de datos (inicializa y siembra)

## Diferencias con la versión anterior

Esta versión del proyecto se diferencia de la versión original en los siguientes aspectos:

1. **Conexión a base de datos real**: Se conecta a una base de datos PostgreSQL real en lugar de usar datos de prueba o mocks.
2. **Scripts de inicialización**: Incluye scripts para inicializar y sembrar la base de datos.
3. **Manejo de errores mejorado**: Implementa un mejor manejo de errores en las operaciones de base de datos.
4. **Configuración flexible**: Permite configurar la conexión a la base de datos mediante variables de entorno.

## Próximos pasos

1. Implementar autenticación real con JWT o NextAuth
2. Añadir migraciones para gestionar cambios en el esquema
3. Implementar caché para mejorar el rendimiento
4. Añadir pruebas automatizadas para la capa de datos
