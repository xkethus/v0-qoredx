"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import QerniumViewer, { type QerniumData } from "@/components/qernium-viewer"

interface QerniumPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  qernium: QerniumData | null
}

export function QerniumPreviewModal({ isOpen, onClose, qernium }: QerniumPreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 border-purple-900/50">
        <DialogHeader>
          <DialogTitle className="text-xl text-purple-300">Vista Previa de Qernium</DialogTitle>
        </DialogHeader>
        {qernium && <QerniumViewer qernium={qernium} viewOnly={true} />}
      </DialogContent>
    </Dialog>
  )
}
