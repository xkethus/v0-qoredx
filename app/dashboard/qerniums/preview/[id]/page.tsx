"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Esta página simplemente redirige a la página de vista previa con el ID como parámetro de consulta
export default function QerniumPreviewRedirect({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    router.push(`/dashboard/qerniums/preview?id=${id}`)
  }, [router, id])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-muted-foreground">Redirigiendo a la vista previa...</p>
    </div>
  )
}
