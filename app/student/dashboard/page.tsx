"use client"

import { useState, useEffect } from "react"
import { SpaceNavigation } from "@/components/student/space-navigation"
import { StudentHeader } from "@/components/student/student-header"
import { StudentSidebar } from "@/components/student/student-sidebar"
import { QerniumPreviewModal } from "@/components/qernium-preview-modal"
import { QlusterInfoModal } from "@/components/student/qluster-info-modal"
import { AchievementNotification } from "@/components/student/achievement-notification"
import { IntegratedHUD } from "@/components/student/integrated-hud"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"
// Importar el nuevo componente
import { HomeInfoModal } from "@/components/student/home-info-modal"

export default function StudentDashboardPage() {
  const [showIntro, setShowIntro] = useState(true)
  const [selectedQernium, setSelectedQernium] = useState(null)
  const [selectedQluster, setSelectedQluster] = useState(null)
  const [showAchievement, setShowAchievement] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true) // Sidebar abierto por defecto
  const [showHUDTutorial, setShowHUDTutorial] = useState(false)
  const [showHUD, setShowHUD] = useState(false)
  // Añadir un nuevo estado para el modal del centro de navegación
  const [selectedHome, setSelectedHome] = useState(null)

  // Mock achievement notification after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAchievement(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  // Show HUD tutorial after intro
  useEffect(() => {
    if (!showIntro && !localStorage.getItem("hudTutorialSeen")) {
      setShowHUDTutorial(true)
      localStorage.setItem("hudTutorialSeen", "true")
    }
  }, [showIntro])

  // Handle node selection from 3D space
  const handleNodeSelect = (nodeType, nodeData) => {
    if (nodeType === "qernium") {
      setSelectedQernium(nodeData)
    } else if (nodeType === "qluster") {
      setSelectedQluster(nodeData)
    } else if (nodeType === "home") {
      setSelectedHome(nodeData)
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

      {/* Integrated HUD */}
      <IntegratedHUD visible={showHUD} onClose={() => setShowHUD(false)} />

      {/* HUD tutorial overlay */}
      {showHUDTutorial && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="max-w-2xl bg-gray-900 border border-cyan-500 rounded-lg p-8 relative">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Tu Interfaz de Navegación Espacial</h2>
            <div className="space-y-4 text-gray-300">
              <p>Bienvenido a tu interfaz de navegación personalizada. Desde aquí podrás:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Ver el espacio educativo a través de la ventana principal</li>
                <li>Interactuar con los controles holográficos para acceder a diferentes Qlusters</li>
                <li>Personalizar los colores y apariencia de tu interfaz</li>
                <li>Ocultar o mostrar la interfaz para una vista más limpia</li>
                <li>Acceder a tu perfil, logros y estadísticas desde el panel de control</li>
              </ul>
              <p>Esta interfaz es tu marco personal para explorar el cosmos del aprendizaje.</p>
            </div>
            <Button onClick={() => setShowHUDTutorial(false)} className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white">
              Entendido
            </Button>
          </div>
        </div>
      )}

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

      {selectedHome && (
        <HomeInfoModal isOpen={!!selectedHome} onClose={() => setSelectedHome(null)} homeData={selectedHome} />
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
