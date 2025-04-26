"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HierarchyVisualization } from "@/components/hierarchy-visualization"
import { HierarchyModal } from "@/components/hierarchy-modal"
import { Button } from "@/components/ui/button"
import { Maximize2 } from "lucide-react"

// Definición de tipos para los datos jerárquicos
interface HierarchyNode {
  id: string
  name: string
  type: "qernex" | "qluster" | "qernium"
  color?: string
  children?: HierarchyNode[]
}

interface CourseHierarchyViewProps {
  data: HierarchyNode
  className?: string
}

export function CourseHierarchyView({ data, className = "" }: CourseHierarchyViewProps) {
  const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(null)

  return (
    <Card
      className={`border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)] ${className}`}
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-cyan-300">Estructura Jerárquica</CardTitle>
        <HierarchyModal data={data} />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="visualization" className="space-y-4">
          <TabsList className="bg-black/20 border border-cyan-900/50">
            <TabsTrigger
              value="visualization"
              className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
            >
              Visualización
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
            >
              Detalles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visualization" className="space-y-4">
            <div className="relative h-[400px] border border-cyan-900/30 rounded-md overflow-hidden">
              <HierarchyVisualization data={data} onNodeClick={setSelectedNode} />
              <Button
                variant="outline"
                size="sm"
                className="absolute bottom-2 right-2 bg-black/30 border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
                onClick={() =>
                  document.querySelector('[aria-label="Visualizar Jerarquía"]')?.dispatchEvent(new MouseEvent("click"))
                }
              >
                <Maximize2 className="mr-2 h-4 w-4" />
                Pantalla Completa
              </Button>
            </div>

            {selectedNode && (
              <div className="p-3 border border-cyan-900/50 rounded-md bg-cyan-950/10">
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
                  Haz clic en los nodos para explorar la estructura o usa los controles de zoom para navegar.
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <div className="space-y-4">
              <div className="p-3 border border-cyan-900/50 rounded-md bg-cyan-950/10">
                <div className="font-medium text-cyan-300">Qernex</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Áreas de Aprendizaje que agrupan Qlusters relacionados.
                </div>
              </div>

              <div className="p-3 border border-cyan-900/50 rounded-md bg-cyan-950/10">
                <div className="font-medium text-violet-300">Qlusters</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Bloques Temáticos que contienen Qerniums organizados secuencialmente.
                </div>
              </div>

              <div className="p-3 border border-cyan-900/50 rounded-md bg-cyan-950/10">
                <div className="font-medium text-pink-300">Qerniums</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Unidades de Aprendizaje Específicas con objetivos concretos basados en la Taxonomía de Bloom.
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
