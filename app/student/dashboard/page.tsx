"use client"

import { useState, useEffect } from "react"
import { SpaceNavigation } from "@/components/student/space-navigation"
import { StudentHeader } from "@/components/student/student-header"
import { StudentSidebar } from "@/components/student/student-sidebar"
import { QerniumPreviewModal } from "@/components/qernium-preview-modal"
import { QlusterInfoModal } from "@/components/student/qluster-info-modal"
import { AchievementNotification } from "@/components/student/achievement-notification"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"

export default function StudentDashboardPage() {
  const [showIntro, setShowIntro] = useState(true)
  const [selectedQernium, setSelectedQernium] = useState(null)
  const [selectedQluster, setSelectedQluster] = useState(null)
  const [showAchievement, setShowAchievement] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock achievement notification after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAchievement(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  // Handle node selection from 3D space
  const handleNodeSelect = (nodeType, nodeData) => {
    if (nodeType === "qernium") {
      setSelectedQernium(nodeData)
    } else if (nodeType === "qluster") {
      setSelectedQluster(nodeData)
    }
  }

  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-6">
        <div className="max-w-lg text-center space-y-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 animate-pulse">
            Bienvenido, QoreXplorer
          </h1>
          <p className="text-gray-300 text-lg">
            Prepárate para navegar por el cosmos del conocimiento. Explora Qlusters, completa Qerniums y desbloquea
            nuevas habilidades en tu viaje educativo.
          </p>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg blur opacity-75 animate-pulse"></div>
            <Button
              onClick={() => setShowIntro(false)}
              className="relative bg-black hover:bg-gray-900 text-white border border-cyan-500 px-8 py-6 rounded-lg"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Iniciar Exploración
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <StudentHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <StudentSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main 3D space navigation */}
      <main className="w-full h-screen">
        <SpaceNavigation onNodeSelect={handleNodeSelect} />
      </main>

      {/* Modals */}
      {selectedQernium && (
        <QerniumPreviewModal
          isOpen={!!selectedQernium}
          onClose={() => setSelectedQernium(null)}
          qernium={selectedQernium}
        />
      )}

      {selectedQluster && (
        <QlusterInfoModal
          isOpen={!!selectedQluster}
          onClose={() => setSelectedQluster(null)}
          qluster={selectedQluster}
        />
      )}

      {/* Achievement notification */}
      {showAchievement && (
        <AchievementNotification
          title="¡Primer Contacto!"
          description="Has iniciado tu viaje como QoreXplorer"
          onClose={() => setShowAchievement(false)}
        />
      )}
    </div>
  )
}
