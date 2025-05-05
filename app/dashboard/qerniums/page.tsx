import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Atom, Search, Filter, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { QerniumCard, type ContentTypeQernium } from "@/components/qernium-card"

export default function QerniumsPage() {
  // Mock data para Qerniums
  const qerniums = [
    {
      id: 1,
      title: "Identificar principios de la mecánica cuántica",
      description: "Reconocer y enumerar los principios fundamentales que rigen la mecánica cuántica.",
      bloomLevel: "remember",
      actionVerb: "Identificar",
      status: "published",
      estimatedTime: 30,
      qlusters: ["Fundamentos de Física Cuántica", "Introducción a la Computación Cuántica"],
      color: "purple",
      contentType: "texto" as ContentTypeQernium,
      coverImage: "/abstract-geometric-pattern.png",
    },
    {
      id: 2,
      title: "Explicar el principio de incertidumbre de Heisenberg",
      description: "Describir y explicar el principio de incertidumbre y sus implicaciones en la física cuántica.",
      bloomLevel: "understand",
      actionVerb: "Explicar",
      status: "published",
      estimatedTime: 45,
      qlusters: ["Fundamentos de Física Cuántica"],
      color: "cyan",
      contentType: "video" as ContentTypeQernium,
      coverImage: "/abstract-color-run.png",
    },
    {
      id: 3,
      title: "Aplicar ecuaciones de mecánica orbital",
      description: "Utilizar las ecuaciones de la mecánica orbital para resolver problemas de trayectorias espaciales.",
      bloomLevel: "apply",
      actionVerb: "Aplicar",
      status: "published",
      estimatedTime: 60,
      qlusters: ["Exploración Espacial Avanzada"],
      color: "pink",
      contentType: "enlace" as ContentTypeQernium,
      coverImage: "/abstract-em.png",
    },
    {
      id: 4,
      title: "Analizar dilemas éticos en IA",
      description: "Examinar y descomponer dilemas éticos relacionados con el desarrollo y uso de la IA.",
      bloomLevel: "analyze",
      actionVerb: "Analizar",
      status: "published",
      estimatedTime: 90,
      qlusters: ["Ética en Inteligencia Artificial"],
      color: "amber",
      contentType: "tarea" as ContentTypeQernium,
      coverImage: "/abstract-dl.png",
    },
    {
      id: 5,
      title: "Evaluar algoritmos de aprendizaje automático",
      description: "Juzgar la eficacia y pertinencia de diferentes algoritmos de aprendizaje automático.",
      bloomLevel: "evaluate",
      actionVerb: "Evaluar",
      status: "draft",
      estimatedTime: 120,
      qlusters: [],
      color: "purple",
      contentType: "quiz" as ContentTypeQernium,
      coverImage: "/abstract-ls.png",
    },
    {
      id: 6,
      title: "Crear un modelo de simulación cuántica",
      description: "Diseñar y desarrollar un modelo de simulación para un sistema cuántico simple.",
      bloomLevel: "create",
      actionVerb: "Crear",
      status: "draft",
      estimatedTime: 180,
      qlusters: [],
      color: "cyan",
      contentType: "tarea" as ContentTypeQernium,
      coverImage: "/abstract-geometric-gold.png",
    },
  ]

  return (
    <>
      <DashboardHeader heading="Qerniums" text="Unidades de Aprendizaje Específicas basadas en la Taxonomía de Bloom">
        <Link href="/dashboard/qerniums/create">
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
            <Plus className="mr-2 h-4 w-4" /> Crear Qernium
          </Button>
        </Link>
      </DashboardHeader>
      <DashboardShell>
        <Tabs defaultValue="all" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-black/20 border border-purple-900/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="published"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Publicados
              </TabsTrigger>
              <TabsTrigger
                value="draft"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Borradores
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar qerniums..."
                  className="w-full sm:w-[250px] pl-8 border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
              >
                <Filter className="mr-2 h-4 w-4" /> Filtrar
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {qerniums.map((qernium) => (
                <QerniumCard key={qernium.id} qernium={qernium} />
              ))}

              {/* Card para crear nuevo qernium */}
              <Card className="border-dashed border-2 border-purple-900/50 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center h-full">
                <Atom className="h-12 w-12 text-purple-500/50 mb-4" />
                <h3 className="text-lg font-medium text-purple-300 mb-2">Crear Nuevo Qernium</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Diseña una unidad de aprendizaje específica basada en la Taxonomía de Bloom
                </p>
                <Link href="/dashboard/qerniums/create">
                  <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Nuevo Qernium
                  </Button>
                </Link>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="published" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {qerniums
                .filter((qernium) => qernium.status === "published")
                .map((qernium) => (
                  <QerniumCard key={qernium.id} qernium={qernium} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="draft" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {qerniums
                .filter((qernium) => qernium.status === "draft")
                .map((qernium) => (
                  <QerniumCard key={qernium.id} qernium={qernium} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </DashboardShell>
    </>
  )
}
