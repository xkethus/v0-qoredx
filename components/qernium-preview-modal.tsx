"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import QerniumViewer, { type QerniumData } from "@/components/qernium-viewer"

interface QerniumPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  qernium: QerniumData | null
}

export function QerniumPreviewModal({ isOpen, onClose, qernium }: QerniumPreviewModalProps) {
  if (!qernium) return null

  // Determinar el color del borde según el tipo de contenido
  const getBorderColor = () => {
    switch (qernium.content.type) {
      case "document":
        return "border-cyan-900/50"
      case "video":
        return "border-pink-900/50"
      case "quiz":
        return "border-amber-900/50"
      case "assignment":
        return "border-green-900/50"
      default:
        return "border-purple-900/50"
    }
  }

  // Determinar el color del texto del título según el tipo de contenido
  const getTitleColor = () => {
    switch (qernium.content.type) {
      case "document":
        return "text-cyan-300"
      case "video":
        return "text-pink-300"
      case "quiz":
        return "text-amber-300"
      case "assignment":
        return "text-green-300"
      default:
        return "text-purple-300"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 ${getBorderColor()}`}>
        <DialogHeader>
          <DialogTitle className={`text-xl ${getTitleColor()}`}>Vista Previa: {qernium.title}</DialogTitle>
        </DialogHeader>
        <QerniumViewer qernium={qernium} viewOnly={true} />
      </DialogContent>
    </Dialog>
  )
}
