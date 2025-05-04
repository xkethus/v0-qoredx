import { SetupDatabaseButton } from "@/components/setup-database-button"

export default function SetupPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Configuración de la Base de Datos</h1>
        <p className="mb-6 text-gray-600">
          Haz clic en el botón a continuación para configurar la base de datos de Supabase. Este proceso creará todas
          las tablas necesarias y algunos datos de ejemplo.
        </p>
        <SetupDatabaseButton />
      </div>
    </div>
  )
}
