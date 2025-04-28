"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Filter, Layers, Calendar, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { QlusterInfoModal } from "@/components/student/qluster-info-modal"
import { StudentHeader } from "@/components/student/student-header"
import { StudentSidebar } from "@/components/student/student-sidebar"

export default function StudentQlustersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedQluster, setSelectedQluster] = useState(null)

  // Mock data for qlusters
  const qlusters = [
    {
      id: 1,
      title: "Física Cuántica",
      description: "Explora los fundamentos de la física cuántica y sus aplicaciones.",
      coverImage: "/abstract-color-run.png",
      progress: 65,
      qerniums: 12,
      completedQerniums: 8,
      totalQerniums: 12,
      startDate: "2025-04-01",
      endDate: "2025-06-30",
      status: "active",
      instructor: "Dr. Quantum",
      category: "Ciencias",
      classes: ["Grupo A"],
      students: 24,
      color: "cyan",
    },
    {
      id: 2,
      title: "Exploración Espacial",
      description: "Descubre los misterios del cosmos y las misiones espaciales.",
      coverImage: "/abstract-em.png",
      progress: 30,
      qerniums: 10,
      completedQerniums: 3,
      totalQerniums: 10,
      startDate: "2025-04-15",
      endDate: "2025-07-15",
      status: "active",
      instructor: "Dra. Stella",
      category: "Ciencias",
      classes: ["Grupo B"],
      students: 20,
      color: "pink",
    },
    {
      id: 3,
      title: "Inteligencia Artificial",
      description: "Aprende sobre algoritmos, redes neuronales y aplicaciones de IA.",
      coverImage: "/abstract-geometric-pattern.png",
      progress: 15,
      qerniums: 8,
      completedQerniums: 1,
      totalQerniums: 8,
      startDate: "2025-05-01",
      endDate: "2025-08-01",
      status: "active",
      instructor: "Prof. Neural",
      category: "Tecnología",
      classes: ["Grupo C"],
      students: 18,
      color: "purple",
    },
    {
      id: 4,
      title: "Matemáticas Avanzadas",
      description: "Domina conceptos avanzados de cálculo, álgebra y geometría.",
      coverImage: "/abstract-dl.png",
      progress: 0,
      qerniums: 15,
      completedQerniums: 0,
      totalQerniums: 15,
      startDate: "2025-06-01",
      endDate: "2025-09-01",
      status: "scheduled",
      instructor: "Dr. Matrix",
      category: "Matemáticas",
      classes: ["Grupo D"],
      students: 15,
      color: "amber",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <StudentHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <StudentSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className="pt-16 px-4 md:px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Link href="/student/dashboard">
                <Button variant="ghost" size="icon" className="text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-300">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                Mis Qlusters
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Buscar Qlusters..."
                  className="pl-9 bg-black/30 border-cyan-900/30 focus-visible:ring-cyan-500 w-[200px] md:w-[260px]"
                />
              </div>
              <Button variant="outline" size="icon" className="border-cyan-900/50 text-cyan-300 hover:bg-cyan-950/30">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="bg-black/20 border border-cyan-900/50">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
              >
                Activos
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300"
              >
                Completados
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-300">
                Todos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {qlusters
                  .filter((q) => q.status === "active")
                  .map((qluster) => (
                    <QlusterCard key={qluster.id} qluster={qluster} onClick={() => setSelectedQluster(qluster)} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              <div className="text-center py-12 text-gray-400">
                <Layers className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">No hay Qlusters completados</h3>
                <p className="text-sm">Completa tus Qlusters activos para verlos aquí.</p>
              </div>
            </TabsContent>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {qlusters.map((qluster) => (
                  <QlusterCard key={qluster.id} qluster={qluster} onClick={() => setSelectedQluster(qluster)} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Qluster info modal */}
      {selectedQluster && (
        <QlusterInfoModal
          isOpen={!!selectedQluster}
          onClose={() => setSelectedQluster(null)}
          qluster={selectedQluster}
        />
      )}
    </div>
  )
}

// Qluster card component
function QlusterCard({ qluster, onClick }) {
  let borderColor = "border-purple-900/50"
  let shadowColor = "shadow-[0_0_15px_rgba(139,92,246,0.1)]"
  let textColor = "text-purple-300"
  let bgHoverColor = "hover:bg-purple-900/20"
  let gradientFrom = "from-purple-500"
  let gradientTo = "to-purple-300"

  if (qluster.color === "cyan") {
    borderColor = "border-cyan-900/50"
    shadowColor = "shadow-[0_0_15px_rgba(34,211,238,0.1)]"
    textColor = "text-cyan-300"
    bgHoverColor = "hover:bg-cyan-900/20"
    gradientFrom = "from-cyan-500"
    gradientTo = "to-cyan-300"
  } else if (qluster.color === "pink") {
    borderColor = "border-pink-900/50"
    shadowColor = "shadow-[0_0_15px_rgba(236,72,153,0.1)]"
    textColor = "text-pink-300"
    bgHoverColor = "hover:bg-pink-900/20"
    gradientFrom = "from-pink-500"
    gradientTo = "to-pink-300"
  } else if (qluster.color === "amber") {
    borderColor = "border-amber-900/50"
    shadowColor = "shadow-[0_0_15px_rgba(251,191,36,0.1)]"
    textColor = "text-amber-300"
    bgHoverColor = "hover:bg-amber-900/20"
    gradientFrom = "from-amber-500"
    gradientTo = "to-amber-300"
  }

  return (
    <div
      className={`${borderColor} bg-black/50 backdrop-blur-sm ${shadowColor} rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]`}
      onClick={onClick}
    >
      <div className="relative w-full h-40">
        <Image src={qluster.coverImage || "/placeholder.svg"} alt={qluster.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-xl font-bold text-white">{qluster.title}</h2>
          <p className="text-sm text-gray-300 line-clamp-1">{qluster.description}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progreso</span>
            <span className={textColor}>{qluster.progress}%</span>
          </div>
          <div className="w-full bg-black/50 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} h-2 rounded-full`}
              style={{ width: `${qluster.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            className={`bg-${qluster.color}-900/30 text-${qluster.color}-300 border border-${qluster.color}-500/50 flex items-center gap-1`}
          >
            <Layers className="h-3 w-3" /> {qluster.completedQerniums}/{qluster.totalQerniums} Qerniums
          </Badge>

          <Badge
            className={`bg-${qluster.color}-900/30 text-${qluster.color}-300 border border-${qluster.color}-500/50 flex items-center gap-1`}
          >
            <Calendar className="h-3 w-3" /> {new Date(qluster.endDate).toLocaleDateString()}
          </Badge>

          <Badge
            className={`bg-${qluster.color}-900/30 text-${qluster.color}-300 border border-${qluster.color}-500/50 flex items-center gap-1`}
          >
            <Users className="h-3 w-3" /> {qluster.students}
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <div>
            {qluster.status === "active" && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-green-950/50 text-green-300 border border-green-900/50">
                Activo
              </span>
            )}
            {qluster.status === "scheduled" && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-amber-950/50 text-amber-300 border border-amber-900/50">
                Programado
              </span>
            )}
            {qluster.status === "completed" && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-950/50 text-cyan-300 border border-cyan-900/50">
                Completado
              </span>
            )}
          </div>

          <Link href={`/student/qlusters/${qluster.id}`}>
            <Button size="sm" className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:opacity-90 text-white`}>
              Explorar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
