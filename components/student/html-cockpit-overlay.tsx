"use client"

type HtmlCockpitOverlayProps = {
  customizations: any
  assets: any
}

export function HtmlCockpitOverlay({ customizations, assets }: HtmlCockpitOverlayProps) {
  // Por ahora, este componente no renderiza nada visible
  // Solo mantiene la estructura para futuras implementaciones
  return <div className="absolute inset-0 pointer-events-none">{/* Componente vacío - sin elementos visibles */}</div>
}
