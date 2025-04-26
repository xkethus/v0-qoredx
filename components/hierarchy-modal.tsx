"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HierarchyVisualization } from "@/components/hierarchy-visualization"
import { Maximize2 } from "lucide-react"

interface HierarchyNode {
  id: string
  name: string
  type: "qernex" | "qluster" | "qernium"
  color?: string
  children?: HierarchyNode[]
}

interface HierarchyModalProps {
  data: HierarchyNode
}

export function HierarchyModal({ data }: HierarchyModalProps) {
  const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
          aria-label="Visualizar Jerarquía"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh] w-[1200px] h-[800px] bg-black/95 border-cyan-900/50">
        <DialogHeader>
          <DialogTitle className="text-xl text-cyan-300">Visualización Jerárquica</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full">
          <div className="flex-1 relative border border-cyan-900/30 rounded-md overflow-hidden">
            <HierarchyVisualization data={data} onNodeClick={setSelectedNode} fullscreen={true} />
          </div>
          {selectedNode && (
            <div className="mt-4 p-3 border border-cyan-900/50 rounded-md bg-cyan-950/10">
              <div className="font-medium text-cyan-300">{selectedNode.name}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Tipo:{" "}
                <span
                  className={`
                  ${selectedNode.type === "qernex" ? "text-cyan-400" : ""}
                  ${selectedNode.type === "qluster" ? "text-violet-400" : ""}
                  ${selectedNode.type === "qernium" ? "text-pink-400" : ""}
                `}
                >
                  {selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)}
                </span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Usa la rueda del ratón para hacer zoom y arrastra para moverte por el diagrama. Haz clic en el botón de
                reinicio (⟲) para volver a la vista inicial.
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
