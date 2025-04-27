import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AddContentLoading() {
  return (
    <>
      <DashboardHeader heading="Añadir Contenido" text="Crea o selecciona contenido para tus cursos">
        <Skeleton className="h-10 w-32" />
      </DashboardHeader>
      <DashboardShell>
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Card>
            <CardHeader className="gap-2">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-4 w-2/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </>
  )
}
