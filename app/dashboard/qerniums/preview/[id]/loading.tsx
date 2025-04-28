import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function QerniumPreviewLoading() {
  return (
    <>
      <DashboardHeader heading="Cargando Vista Previa..." text="Por favor espere mientras cargamos el contenido">
        <Skeleton className="h-10 w-32" />
      </DashboardHeader>
      <DashboardShell>
        <div className="grid gap-4 md:grid-cols-2">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-[300px] w-full" />
            ))}
        </div>
      </DashboardShell>
    </>
  )
}
