"use client"

import { useRef, useState, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html, Stars } from "@react-three/drei"
import { Vector3 } from "three"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Info,
  Atom,
  Layers,
  Rocket,
  Settings,
  Navigation2,
  EyeOff,
  Monitor,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react"
import * as THREE from "three"
import { mockQlusters } from "@/lib/mock-data"
import { useHUD } from "@/lib/contexts/hud-context"
import { IntegratedHUD } from "./integrated-hud"

// Generamos datos de Qerniums para cada Qluster
const generateQerniumsForQlusters = () => {
  const qerniums = []

  mockQlusters.forEach((qluster) => {
    // Generamos 3 Qerniums para cada Qluster
    for (let i = 0; i < 3; i++) {
      const bloomLevels = ["remember", "understand", "apply", "analyze", "evaluate", "create"]
      // Aseguramos que todos los Qerniums estén publicados para evitar problemas de visualización
      const status = "published"

      qerniums.push({
        id: `qrn-${qluster.id}-${i}`,
        title: `Qernium ${i + 1} de ${qluster.title}`,
        description: `Descripción del Qernium ${i + 1} del Qluster ${qluster.title}`,
        qlusterId: qluster.id,
        status: status,
        bloomLevel: bloomLevels[Math.floor(Math.random() * bloomLevels.length)],
        color: qluster.color, // Aseguramos que el color sea el mismo que el del Qluster
        // La posición se calculará dinámicamente en el componente QerniumNode
        position: null,
        content: [
          {
            type: "quiz",
            title: `Quiz de ${qluster.title} - Parte ${i + 1}`,
            description: `Evaluación sobre los conceptos de ${qluster.title}`,
            content: {
              questions: [
                {
                  question: `Pregunta 1 sobre ${qluster.title}`,
                  options: ["Opción A", "Opción B", "Opción C", "Opción D"],
                  correctAnswer: 0,
                },
              ],
              passingScore: 70,
            },
          },
        ],
        skills: [
          { id: "skill-1", name: "Física", level: Math.floor(Math.random() * 5) + 1 },
          { id: "skill-2", name: "Matemáticas", level: Math.floor(Math.random() * 5) + 1 },
        ],
        actionVerb: "Explorar",
        estimatedTime: "15 min",
        creatorId: "creator-1",
        creatorName: "QoreX",
      })
    }
  })

  return qerniums
}

const mockQerniums = generateQerniumsForQlusters()

// Componente CockpitOverlay
function CockpitOverlay({ customizations, assets }) {
  const { size } = useThree()
  const aspect = size.width / size.height
  const frameRef = useRef()

  // Subtle frame movement to simulate cockpit feel
  useFrame((state) => {
    if (frameRef.current) {
      const t = state.clock.getElapsedTime()
      frameRef.current.rotation.z = Math.sin(t * 0.2) * 0.005
      frameRef.current.rotation.x = Math.sin(t * 0.3) * 0.005
    }
  })

  // Render different frame styles
  const renderFrame = () => {
    switch (assets.frameStyle) {
      case "minimal":
        return (
          <group>
            {/* Top frame */}
            <mesh position={[0, 1.8, -3]}>
              <boxGeometry args={[4 * aspect, 0.05, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Bottom frame */}
            <mesh position={[0, -1.8, -3]}>
              <boxGeometry args={[4 * aspect, 0.05, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Left frame */}
            <mesh position={[-2 * aspect, 0, -3]}>
              <boxGeometry args={[0.05, 3.6, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Right frame */}
            <mesh position={[2 * aspect, 0, -3]}>
              <boxGeometry args={[0.05, 3.6, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        )

      case "tactical":
        return (
          <group>
            {/* Corner pieces */}
            <mesh position={[-2 * aspect + 0.2, 1.6, -3]}>
              <boxGeometry args={[0.4, 0.05, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[-2 * aspect, 1.6 - 0.2, -3]}>
              <boxGeometry args={[0.05, 0.4, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.7} roughness={0.3} />
            </mesh>

            <mesh position={[2 * aspect - 0.2, 1.6, -3]}>
              <boxGeometry args={[0.4, 0.05, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[2 * aspect, 1.6 - 0.2, -3]}>
              <boxGeometry args={[0.05, 0.4, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.7} roughness={0.3} />
            </mesh>

            <mesh position={[-2 * aspect + 0.2, -1.6, -3]}>
              <boxGeometry args={[0.4, 0.05, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[-2 * aspect, -1.6 + 0.2, -3]}>
              <boxGeometry args={[0.05, 0.4, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.7} roughness={0.3} />
            </mesh>

            <mesh position={[2 * aspect - 0.2, -1.6, -3]}>
              <boxGeometry args={[0.4, 0.05, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[2 * aspect, -1.6 + 0.2, -3]}>
              <boxGeometry args={[0.05, 0.4, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Top and bottom indicators */}
            <mesh position={[0, 1.8, -3]}>
              <boxGeometry args={[1, 0.05, 0.1]} />
              <meshStandardMaterial
                color={customizations.consoleColor}
                emissive={customizations.consoleColor}
                emissiveIntensity={0.5}
              />
            </mesh>

            <mesh position={[0, -1.8, -3]}>
              <boxGeometry args={[1, 0.05, 0.1]} />
              <meshStandardMaterial
                color={customizations.consoleColor}
                emissive={customizations.consoleColor}
                emissiveIntensity={0.5}
              />
            </mesh>
          </group>
        )

      case "futuristic":
        return (
          <group>
            {/* Curved frame elements */}
            <mesh position={[0, 1.8, -3]}>
              <torusGeometry args={[2 * aspect, 0.05, 16, 32, Math.PI]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.8} roughness={0.2} />
            </mesh>

            <mesh position={[0, -1.8, -3]} rotation={[Math.PI, 0, 0]}>
              <torusGeometry args={[2 * aspect, 0.05, 16, 32, Math.PI]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Side elements */}
            <mesh position={[-2 * aspect, 0, -3]}>
              <boxGeometry args={[0.05, 2, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.8} roughness={0.2} />
            </mesh>

            <mesh position={[2 * aspect, 0, -3]}>
              <boxGeometry args={[0.05, 2, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Glowing elements */}
            <mesh position={[-2 * aspect + 0.03, 0, -3]}>
              <boxGeometry args={[0.01, 1.8, 0.12]} />
              <meshStandardMaterial
                color={customizations.hologramColor}
                emissive={customizations.hologramColor}
                emissiveIntensity={1}
              />
            </mesh>

            <mesh position={[2 * aspect - 0.03, 0, -3]}>
              <boxGeometry args={[0.01, 1.8, 0.12]} />
              <meshStandardMaterial
                color={customizations.hologramColor}
                emissive={customizations.hologramColor}
                emissiveIntensity={1}
              />
            </mesh>
          </group>
        )

      default: // standard
        return (
          <group>
            {/* Top frame */}
            <mesh position={[0, 1.8, -3]}>
              <boxGeometry args={[4 * aspect, 0.1, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Bottom frame with console */}
            <mesh position={[0, -1.8, -3]}>
              <boxGeometry args={[4 * aspect, 0.2, 0.3]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Left frame */}
            <mesh position={[-2 * aspect, 0, -3]}>
              <boxGeometry args={[0.1, 3.6, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Right frame */}
            <mesh position={[2 * aspect, 0, -3]}>
              <boxGeometry args={[0.1, 3.6, 0.1]} />
              <meshStandardMaterial color={customizations.frameColor} metalness={0.5} roughness={0.5} />
            </mesh>
          </group>
        )
    }
  }

  // Render different console styles
  const renderConsole = () => {
    switch (assets.consoleStyle) {
      case "touch":
        return (
          <group position={[0, -1.7, -3]}>
            <mesh rotation={[Math.PI * 0.15, 0, 0]}>
              <boxGeometry args={[2 * aspect, 0.05, 0.3]} />
              <meshStandardMaterial color={customizations.consoleColor} metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.05, 0]} rotation={[Math.PI * 0.15, 0, 0]}>
              <boxGeometry args={[1.8 * aspect, 0.01, 0.25]} />
              <meshStandardMaterial
                color={customizations.hologramColor}
                emissive={customizations.hologramColor}
                emissiveIntensity={0.5}
                transparent={true}
                opacity={0.7}
              />
            </mesh>
          </group>
        )
      case "hologram":
        return (
          <group position={[0, -1.7, -3]}>
            <mesh rotation={[Math.PI * 0.15, 0, 0]}>
              <cylinderGeometry args={[0.8, 0.9, 0.1, 32]} />
              <meshStandardMaterial color={customizations.consoleColor} metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.2, 0]} rotation={[Math.PI * 0.15, 0, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial
                color={customizations.hologramColor}
                emissive={customizations.hologramColor}
                emissiveIntensity={0.7}
                transparent={true}
                opacity={0.3}
              />
            </mesh>
          </group>
        )
      case "military":
        return (
          <group position={[0, -1.7, -3]}>
            <mesh rotation={[Math.PI * 0.15, 0, 0]}>
              <boxGeometry args={[2 * aspect, 0.15, 0.3]} />
              <meshStandardMaterial color={customizations.consoleColor} metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.7 * aspect, 0.05, 0]} rotation={[Math.PI * 0.15, 0, 0]}>
              <boxGeometry args={[0.3, 0.05, 0.15]} />
              <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0.7 * aspect, 0.05, 0]} rotation={[Math.PI * 0.15, 0, 0]}>
              <boxGeometry args={[0.3, 0.05, 0.15]} />
              <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        )
      default: // basic
        return (
          <mesh position={[0, -1.7, -3]} rotation={[Math.PI * 0.15, 0, 0]}>
            <boxGeometry args={[2 * aspect, 0.1, 0.3]} />
            <meshStandardMaterial color={customizations.consoleColor} metalness={0.7} roughness={0.3} />
          </mesh>
        )
    }
  }

  // Render different light styles
  const renderLights = () => {
    switch (assets.lightStyle) {
      case "ambient":
        return (
          <>
            <ambientLight intensity={0.8} color={customizations.lightColor} />
            <pointLight position={[0, 1, -2]} color={customizations.lightColor} intensity={0.5} />
          </>
        )
      case "neon":
        return (
          <>
            <pointLight position={[-1.5 * aspect, 1.5, -2]} color={customizations.lightColor} intensity={0.8} />
            <pointLight position={[1.5 * aspect, 1.5, -2]} color={customizations.lightColor} intensity={0.8} />
            <pointLight position={[0, -1.5, -2]} color="#ffffff" intensity={0.3} />
          </>
        )
      case "pulse":
        return (
          <group>
            <PulsingLight position={[-1.5 * aspect, 1.5, -2]} color={customizations.lightColor} />
            <PulsingLight position={[1.5 * aspect, 1.5, -2]} color={customizations.lightColor} />
            <pointLight position={[0, -1.5, -2]} color="#ffffff" intensity={0.3} />
          </group>
        )
      default: // standard
        return (
          <>
            <pointLight position={[-1.5 * aspect, 1.5, -2]} color={customizations.lightColor} intensity={0.5} />
            <pointLight position={[1.5 * aspect, 1.5, -2]} color={customizations.lightColor} intensity={0.5} />
            <pointLight position={[0, -1.5, -2]} color="#ffffff" intensity={0.3} />
          </>
        )
    }
  }

  return (
    <group ref={frameRef}>
      {/* Frame structure */}
      {renderFrame()}

      {/* Console */}
      {renderConsole()}

      {/* Lights */}
      {renderLights()}
    </group>
  )
}

// Componente para luces pulsantes
function PulsingLight({ position, color }) {
  const lightRef = useRef()

  useFrame((state) => {
    if (lightRef.current) {
      const t = state.clock.getElapsedTime()
      lightRef.current.intensity = 0.3 + Math.sin(t * 3) * 0.3
    }
  })

  return <pointLight ref={lightRef} position={position} color={color} intensity={0.5} />
}

// Modificar la función SpaceNavigation para incluir controles de navegación manual y el botón de inicio
export function SpaceNavigation({ onNodeSelect }) {
  const [hoveredNode, setHoveredNode] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [cameraTarget, setCameraTarget] = useState([0, 0, 0])
  const [showCustomization, setShowCustomization] = useState(false)
  const [showNavigation, setShowNavigation] = useState(false)
  const [showIntegratedHUD, setShowIntegratedHUD] = useState(false)
  const [manualControls, setManualControls] = useState({
    x: 0,
    y: 0,
    rotation: 0,
    zoom: 15, // Valor inicial del zoom
  })
  // Estado para controlar la visibilidad de las etiquetas iniciales
  const [showInitialLabels, setShowInitialLabels] = useState(false)
  // Referencia al controlador de órbita
  const orbitControlsRef = useRef(null)

  const { showHUD, customizations, hudStyle, updateCustomization, updateHUDStyle } = useHUD()

  // Mostrar etiquetas iniciales después de un delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialLabels(true)
    }, 3000) // 3 segundos de delay

    return () => clearTimeout(timer)
  }, [])

  const handleNodeHover = (node, type) => {
    setHoveredNode({ ...node, type })
  }

  const handleNodeLeave = () => {
    setHoveredNode(null)
  }

  const handleNodeClick = (node, type) => {
    setSelectedNode({ ...node, type })
    setCameraTarget(node.position)

    // Call the parent callback
    if (onNodeSelect) {
      if (type === "qluster") {
        onNodeSelect("qluster", node)
      } else if (type === "qernium") {
        // For qerniums, we need to create a compatible object for the QerniumPreviewModal
        const qerniumData = {
          id: node.id,
          title: node.title,
          description: node.description,
          bloomLevel: node.bloomLevel,
          actionVerb: node.actionVerb,
          estimatedTime: node.estimatedTime,
          content:
            node.content && node.content.length > 0
              ? {
                  type: node.content[0].type,
                  title: node.content[0].title,
                  description: node.content[0].description,
                  questions:
                    node.content[0].type === "quiz" && node.content[0].content.questions
                      ? node.content[0].content.questions
                      : [],
                  passingScore:
                    node.content[0].type === "quiz" && node.content[0].content.passingScore
                      ? node.content[0].content.passingScore
                      : 70,
                }
              : {},
          skills: node.skills,
          creatorId: node.creatorId,
          creatorName: node.creatorName,
        }
        onNodeSelect("qernium", qerniumData)
      } else if (type === "home") {
        onNodeSelect("home", node)
      }
    }
  }

  const toggleCustomization = () => {
    setShowCustomization(!showCustomization)
  }

  const toggleNavigation = () => {
    setShowNavigation(!showNavigation)
  }

  const toggleIntegratedHUD = () => {
    setShowIntegratedHUD(!showIntegratedHUD)
  }

  const handleManualNavigation = (axis, value) => {
    setManualControls((prev) => ({
      ...prev,
      [axis]: value,
    }))
  }

  const resetNavigation = () => {
    setCameraTarget([0, 0, 0])
    setManualControls({
      x: 0,
      y: 0,
      rotation: 0,
      zoom: 15,
    })

    // Resetear la cámara usando OrbitControls
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset()
    }
  }

  // Funciones para controlar el zoom
  const zoomIn = () => {
    setManualControls((prev) => ({
      ...prev,
      zoom: Math.max(5, prev.zoom - 2), // Acercarse (reducir el valor de zoom)
    }))
  }

  const zoomOut = () => {
    setManualControls((prev) => ({
      ...prev,
      zoom: Math.min(40, prev.zoom + 2), // Alejarse (aumentar el valor de zoom)
    }))
  }

  // Exponer la función toggleHUD al objeto window para que pueda ser llamada desde fuera
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.toggleHUD = toggleIntegratedHUD
    }

    return () => {
      if (typeof window !== "undefined") {
        delete window.toggleHUD
      }
    }
  }, [])

  return (
    <div className="w-full h-full relative">
      <Canvas shadows>
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 30, 50]} />
        <ambientLight intensity={0.2} />

        {/* Main space scene with content */}
        <SpaceScene
          qlusters={mockQlusters}
          qerniums={mockQerniums}
          onNodeHover={handleNodeHover}
          onNodeLeave={handleNodeLeave}
          onNodeClick={handleNodeClick}
          cameraTarget={cameraTarget}
          manualControls={manualControls}
          showInitialLabels={showInitialLabels}
          orbitControlsRef={orbitControlsRef}
        />

        {/* Cockpit overlay - solo se muestra si showHUD es true */}
        {showHUD && <CockpitOverlay customizations={customizations} assets={hudStyle} />}
      </Canvas>

      {/* Controles de zoom flotantes - siempre visibles */}
      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-10 flex flex-col gap-2">
        <Button
          onClick={zoomIn}
          className="bg-black/70 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 h-10 w-10 rounded-full p-0 flex items-center justify-center"
          title="Acercar"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button
          onClick={zoomOut}
          className="bg-black/70 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 h-10 w-10 rounded-full p-0 flex items-center justify-center"
          title="Alejar"
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button
          onClick={resetNavigation}
          className="bg-black/70 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 h-10 w-10 rounded-full p-0 flex items-center justify-center"
          title="Reiniciar vista"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>

      {/* Manual navigation controls - ahora en el centro inferior */}
      {showNavigation && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-75"></div>
            <div className="relative bg-black/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-3">
              <h3 className="text-cyan-300 text-sm font-bold mb-2 text-center">Navegación</h3>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="text-xs text-gray-300 block mb-1 text-center">Horizontal</label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={manualControls.x}
                    onChange={(e) => handleManualNavigation("x", Number.parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="col-span-3">
                  <label className="text-xs text-gray-300 block mb-1 text-center">Vertical</label>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    value={manualControls.y}
                    onChange={(e) => handleManualNavigation("y", Number.parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="col-span-3">
                  <label className="text-xs text-gray-300 block mb-1 text-center">Rotación</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={manualControls.rotation}
                    onChange={(e) => handleManualNavigation("rotation", Number.parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="col-span-3">
                  <label className="text-xs text-gray-300 block mb-1 text-center">Zoom</label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={manualControls.zoom}
                    onChange={(e) => handleManualNavigation("zoom", Number.parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="col-span-3">
                  <Button
                    onClick={resetNavigation}
                    className="w-full bg-cyan-900/50 hover:bg-cyan-800/50 text-cyan-300 border border-cyan-700/50 text-xs"
                    size="sm"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Volver al Centro
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating UI for node information */}
      {hoveredNode && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 max-w-md w-full z-10">
          <div className="relative">
            <div
              className={`absolute -inset-1 bg-gradient-to-r from-${hoveredNode.type === "qluster" ? "cyan" : hoveredNode.type === "home" ? "amber" : "pink"}-500 to-${hoveredNode.type === "qluster" ? "blue" : hoveredNode.type === "home" ? "orange" : "purple"}-500 rounded-lg blur opacity-75`}
            ></div>
            <div className="relative p-4 bg-black/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg">
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full bg-${hoveredNode.type === "qluster" ? "cyan" : hoveredNode.type === "home" ? "amber" : "pink"}-900/30 flex items-center justify-center text-${hoveredNode.type === "qluster" ? "cyan" : hoveredNode.type === "home" ? "amber" : "pink"}-300`}
                >
                  {hoveredNode.type === "qluster" ? (
                    <Layers className="h-5 w-5" />
                  ) : hoveredNode.type === "home" ? (
                    <Rocket className="h-5 w-5" />
                  ) : (
                    <Atom className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg font-bold text-${hoveredNode.type === "qluster" ? "cyan" : hoveredNode.type === "home" ? "amber" : "pink"}-300`}
                  >
                    {hoveredNode.title}
                  </h3>
                  <p className="text-sm text-gray-300">{hoveredNode.description}</p>

                  {hoveredNode.type === "qluster" && (
                    <div className="mt-2 flex items-center gap-2">
                      <Badge className="bg-cyan-900/30 text-cyan-300 border border-cyan-500/50">
                        {hoveredNode.qerniums?.length || 0} Qerniums
                      </Badge>
                      <Badge className="bg-cyan-900/30 text-cyan-300 border border-cyan-500/50">
                        {hoveredNode.progress}% Completado
                      </Badge>
                    </div>
                  )}

                  {hoveredNode.type === "qernium" && (
                    <div className="mt-2 flex items-center gap-2">
                      <Badge
                        className={`${
                          hoveredNode.bloomLevel === "remember"
                            ? "bg-blue-900/30 text-blue-300"
                            : hoveredNode.bloomLevel === "understand"
                              ? "bg-green-900/30 text-green-300"
                              : hoveredNode.bloomLevel === "apply"
                                ? "bg-yellow-900/30 text-yellow-300"
                                : hoveredNode.bloomLevel === "analyze"
                                  ? "bg-orange-900/30 text-orange-300"
                                  : hoveredNode.bloomLevel === "evaluate"
                                    ? "bg-red-900/30 text-red-300"
                                    : "bg-purple-900/30 text-purple-300"
                        }`}
                      >
                        {hoveredNode.bloomLevel?.charAt(0).toUpperCase() + hoveredNode.bloomLevel?.slice(1) || ""}
                      </Badge>
                      <Badge
                        className={`bg-${
                          hoveredNode.status === "completed"
                            ? "green"
                            : hoveredNode.status === "available" || hoveredNode.status === "published"
                              ? "pink"
                              : "gray"
                        }-900/30 text-${
                          hoveredNode.status === "completed"
                            ? "green"
                            : hoveredNode.status === "available" || hoveredNode.status === "published"
                              ? "pink"
                              : "gray"
                        }-300 border border-${
                          hoveredNode.status === "completed"
                            ? "green"
                            : hoveredNode.status === "available" || hoveredNode.status === "published"
                              ? "pink"
                              : "gray"
                        }-500/50`}
                      >
                        {hoveredNode.status === "completed"
                          ? "Completado"
                          : hoveredNode.status === "available" || hoveredNode.status === "published"
                            ? "Disponible"
                            : "Bloqueado"}
                      </Badge>
                    </div>
                  )}

                  {hoveredNode.type === "home" && (
                    <div className="mt-2 flex items-center gap-2">
                      <Badge className="bg-amber-900/30 text-amber-300 border border-amber-500/50">
                        Centro de Navegación
                      </Badge>
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-${hoveredNode.type === "qluster" ? "cyan" : hoveredNode.type === "home" ? "amber" : "pink"}-900/50 text-${hoveredNode.type === "qluster" ? "cyan" : hoveredNode.type === "home" ? "amber" : "pink"}-300 hover:bg-${hoveredNode.type === "qluster" ? "cyan" : hoveredNode.type === "home" ? "amber" : "pink"}-900/20`}
                  onClick={() => handleNodeClick(hoveredNode, hoveredNode.type)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customization button */}
      <Button
        onClick={toggleCustomization}
        className="absolute top-4 right-4 bg-black/70 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 z-10"
        size="sm"
      >
        <Settings className="h-4 w-4 mr-2" />
        Personalizar
      </Button>

      {/* Botones de HUD y Navegación */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Botón de HUD */}
        <div className="relative">
          <div
            className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full blur opacity-75 ${
              showIntegratedHUD ? "animate-pulse" : ""
            }`}
          ></div>
          <Button
            onClick={toggleIntegratedHUD}
            className="relative bg-black hover:bg-gray-900 text-white border border-cyan-500 rounded-full h-14 w-14 flex items-center justify-center"
            title={showIntegratedHUD ? "Ocultar HUD" : "Mostrar HUD"}
          >
            <Monitor className="h-6 w-6" />
          </Button>
        </div>

        {/* Botón de Navegación */}
        <div className="relative">
          <div
            className={`absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75 ${
              showNavigation ? "animate-pulse" : ""
            }`}
          ></div>
          <Button
            onClick={toggleNavigation}
            className="relative bg-black hover:bg-gray-900 text-white border border-blue-500 rounded-full h-14 w-14 flex items-center justify-center"
            title={showNavigation ? "Ocultar Navegación" : "Mostrar Navegación"}
          >
            {showNavigation ? <EyeOff className="h-6 w-6" /> : <Navigation2 className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Integrated HUD */}
      <IntegratedHUD visible={showIntegratedHUD} onClose={toggleIntegratedHUD} />

      {/* Customization panel */}
      {showCustomization && (
        <div className="absolute top-16 right-4 p-4 bg-black/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg z-10 w-64">
          <h3 className="text-cyan-300 font-bold mb-3">Personalizar HUD</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm text-white">Colores</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Marco</label>
                  <input
                    type="color"
                    value={customizations.frameColor}
                    onChange={(e) => updateCustomization("frameColor", e.target.value)}
                    className="w-full h-6 rounded"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Consola</label>
                  <input
                    type="color"
                    value={customizations.consoleColor}
                    onChange={(e) => updateCustomization("consoleColor", e.target.value)}
                    className="w-full h-6 rounded"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Hologramas</label>
                  <input
                    type="color"
                    value={customizations.hologramColor}
                    onChange={(e) => updateCustomization("hologramColor", e.target.value)}
                    className="w-full h-6 rounded"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 block mb-1">Luces</label>
                  <input
                    type="color"
                    value={customizations.lightColor}
                    onChange={(e) => updateCustomization("lightColor", e.target.value)}
                    className="w-full h-6 rounded"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm text-white">Estilo de Marco</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateHUDStyle("frameStyle", "standard")}
                  className={`p-1 border rounded-md ${
                    hudStyle.frameStyle === "standard"
                      ? "border-cyan-500 bg-cyan-900/30"
                      : "border-gray-700 bg-black/50"
                  }`}
                >
                  <div className="text-xs text-center">Estándar</div>
                </button>
                <button
                  onClick={() => updateHUDStyle("frameStyle", "minimal")}
                  className={`p-1 border rounded-md ${
                    hudStyle.frameStyle === "minimal" ? "border-cyan-500 bg-cyan-900/30" : "border-gray-700 bg-black/50"
                  }`}
                >
                  <div className="text-xs text-center">Minimalista</div>
                </button>
                <button
                  onClick={() => updateHUDStyle("frameStyle", "tactical")}
                  className={`p-1 border rounded-md ${
                    hudStyle.frameStyle === "tactical"
                      ? "border-cyan-500 bg-cyan-900/30"
                      : "border-gray-700 bg-black/50"
                  }`}
                >
                  <div className="text-xs text-center">Táctico</div>
                </button>
                <button
                  onClick={() => updateHUDStyle("frameStyle", "futuristic")}
                  className={`p-1 border rounded-md ${
                    hudStyle.frameStyle === "futuristic"
                      ? "border-cyan-500 bg-cyan-900/30"
                      : "border-gray-700 bg-black/50"
                  }`}
                >
                  <div className="text-xs text-center">Futurista</div>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm text-white">Estilo de Consola</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateHUDStyle("consoleStyle", "basic")}
                  className={`p-1 border rounded-md ${
                    hudStyle.consoleStyle === "basic" ? "border-cyan-500 bg-cyan-900/30" : "border-gray-700 bg-black/50"
                  }`}
                >
                  <div className="text-xs text-center">Básico</div>
                </button>
                <button
                  onClick={() => updateHUDStyle("consoleStyle", "touch")}
                  className={`p-1 border rounded-md ${
                    hudStyle.consoleStyle === "touch" ? "border-cyan-500 bg-cyan-900/30" : "border-gray-700 bg-black/50"
                  }`}
                >
                  <div className="text-xs text-center">Táctil</div>
                </button>
                <button
                  onClick={() => updateHUDStyle("consoleStyle", "hologram")}
                  className={`p-1 border rounded-md ${
                    hudStyle.consoleStyle === "hologram"
                      ? "border-cyan-500 bg-cyan-900/30"
                      : "border-gray-700 bg-black/50"
                  }`}
                >
                  <div className="text-xs text-center">Holograma</div>
                </button>
                <button
                  onClick={() => updateHUDStyle("consoleStyle", "military")}
                  className={`p-1 border rounded-md ${
                    hudStyle.consoleStyle === "military"
                      ? "border-cyan-500 bg-cyan-900/30"
                      : "border-gray-700 bg-black/50"
                  }`}
                >
                  <div className="text-xs text-center">Militar</div>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm text-white">Estilo de Luces</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => updateHUDStyle("lightStyle", "standard")}
                  className={`p-1 border rounded-md ${
                    hudStyle.lightStyle === "standard"
                      ? "border-cyan-500 bg-cyan-900/30"
                      : "border-gray-700 bg-black/50"
                  }`}
                >
                  <div className="text-xs text-center">Estándar</div>
                </button>
                <button
                  onClick={() => updateHUDStyle("lightStyle", "ambient")}
                  className={`p-1 border rounded-md ${
                    hudStyle.lightStyle === "ambient" ? "border-cyan-500 bg-cyan-900/30" : "border-gray-700 bg-black/50"
                  }`}
                >
                  <div className="text-xs text-center">Ambiental</div>
                </button>
                <button
                  onClick={() => updateHUDStyle("lightStyle", "neon")}
                  className={`p-1 border rounded-md ${
                    hudStyle.lightStyle === "neon" ? "border-cyan-500 bg-cyan-900/30" : "border-gray-700 bg-black/50"
                  }`}
                >
                  <div className="text-xs text-center">Neón</div>
                </button>
                <button
                  onClick={() => updateHUDStyle("lightStyle", "pulse")}
                  className={`p-1 border rounded-md ${
                    hudStyle.lightStyle === "pulse" ? "border-cyan-500 bg-cyan-900/30" : "border-gray-700 bg-black/50"
                  }`}
                >
                  <div className="text-xs text-center">Pulsante</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Modificar la función SpaceScene para incluir el Qernium Home y mejorar la distribución de los nodos
function SpaceScene({
  qlusters,
  qerniums,
  onNodeHover,
  onNodeLeave,
  onNodeClick,
  cameraTarget,
  manualControls,
  showInitialLabels,
  orbitControlsRef,
}) {
  const { camera } = useThree()
  const sceneRef = useRef()

  // Crear el nodo central "Qernium Home"
  const homeNode = {
    id: "home",
    title: "Centro de Navegación",
    description: "Punto central de referencia y acceso a tareas relevantes",
    position: [0, 0, 0],
    color: "#f59e0b", // Color ámbar para distinguirlo
    type: "home",
  }

  // Animate camera to target position with manual controls
  useFrame(() => {
    // Apply manual controls to camera position
    const targetX = cameraTarget[0] + manualControls.x
    const targetY = cameraTarget[1] + manualControls.y
    const targetZ = cameraTarget[2] + manualControls.zoom // Usar el valor de zoom

    camera.position.lerp(new Vector3(targetX, targetY, targetZ), 0.05)

    // Apply rotation
    if (sceneRef.current) {
      sceneRef.current.rotation.y = THREE.MathUtils.degToRad(manualControls.rotation)
    }
  })

  return (
    <group ref={sceneRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Render home node */}
      <HomeNode
        home={homeNode}
        onHover={() => onNodeHover(homeNode, "home")}
        onLeave={onNodeLeave}
        onClick={() => onNodeClick(homeNode, "home")}
        showInitialLabels={showInitialLabels}
        cameraTarget={cameraTarget}
      />

      {/* Render qlusters */}
      {qlusters.map((qluster) => (
        <QlusterNode
          key={qluster.id}
          qluster={qluster}
          onHover={() => onNodeHover(qluster, "qluster")}
          onLeave={onNodeLeave}
          onClick={() => onNodeClick(qluster, "qluster")}
          showInitialLabels={showInitialLabels}
          cameraTarget={cameraTarget}
        />
      ))}

      {/* Render qerniums */}
      {qerniums.map((qernium) => (
        <QerniumNode
          key={qernium.id}
          qernium={qernium}
          onHover={() => onNodeHover(qernium, "qernium")}
          onLeave={onNodeLeave}
          onClick={() => onNodeClick(qernium, "qernium")}
          showInitialLabels={showInitialLabels}
        />
      ))}

      <OrbitControls
        ref={orbitControlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={40}
        target={new Vector3(...cameraTarget)}
        zoomSpeed={0.5}
        rotateSpeed={0.5}
        panSpeed={0.5}
        dampingFactor={0.1}
        enableDamping={true}
      />
    </group>
  )
}

// Nuevo componente para el nodo central "Home"
function HomeNode({ home, onHover, onLeave, onClick, showInitialLabels, cameraTarget }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const ringsRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [showLabel, setShowLabel] = useState(false)
  const [labelTimer, setLabelTimer] = useState(null)

  // Verificar si el nodo está en el centro de enfoque
  const isInFocus = useMemo(() => {
    if (!cameraTarget) return false
    // Comprobar si este nodo es el objetivo de la cámara
    return (
      Math.abs(cameraTarget[0] - home.position[0]) < 0.1 &&
      Math.abs(cameraTarget[1] - home.position[1]) < 0.1 &&
      Math.abs(cameraTarget[2] - home.position[2]) < 0.1
    )
  }, [cameraTarget, home.position])

  // Gestionar la visibilidad de la etiqueta
  useEffect(() => {
    // Mostrar etiqueta si está en hover o en foco
    if (hovered || isInFocus) {
      setShowLabel(true)

      // Limpiar cualquier temporizador existente
      if (labelTimer) {
        clearTimeout(labelTimer)
        setLabelTimer(null)
      }

      // Si está en foco (no en hover), configurar temporizador para ocultar
      if (isInFocus && !hovered) {
        const timer = setTimeout(() => {
          if (!hovered) {
            // Verificar nuevamente que no esté en hover antes de ocultar
            setShowLabel(false)
          }
        }, 10000) // 10 segundos
        setLabelTimer(timer)
      }
    } else if (!hovered && !isInFocus) {
      // Si no está ni en hover ni en foco, ocultar etiqueta
      setShowLabel(false)
    }

    return () => {
      if (labelTimer) {
        clearTimeout(labelTimer)
      }
    }
  }, [hovered, isInFocus])

  // Animaciones
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime()

      // Rotación lenta
      meshRef.current.rotation.y += 0.002

      // Pulso suave
      const scale = 1 + Math.sin(t * 0.5) * 0.05
      meshRef.current.scale.set(scale, scale, scale)

      // Anillos girando
      if (ringsRef.current) {
        ringsRef.current.rotation.x = t * 0.1
        ringsRef.current.rotation.z = t * 0.15
      }

      // Brillo pulsante
      if (glowRef.current && glowRef.current.material) {
        glowRef.current.material.opacity = 0.2 + Math.sin(t) * 0.1
      }
    }
  })

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    onHover()
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    // Evitamos llamar a onLeave si ya no estamos en hover
    if (hovered) {
      setHovered(false)
      onLeave()
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <group position={home.position}>
      {/* Efecto de brillo */}
      <mesh ref={glowRef} scale={[2.5, 2.5, 2.5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={home.color} transparent opacity={0.2} />
      </mesh>

      {/* Anillos orbitales */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.5, 0.05, 16, 100]} />
          <meshStandardMaterial color={home.color} emissive={home.color} emissiveIntensity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.2, 0.03, 16, 100]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Planeta principal */}
      <mesh ref={meshRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color={home.color}
          emissive={home.color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Etiqueta - mostrar solo cuando showLabel es true */}
      {showLabel && (
        <Html position={[0, 3.5, 0]} center distanceFactor={15} occlude={false}>
          <div className="px-3 py-1 rounded-full bg-amber-900/80 border border-amber-500/50 text-amber-300 text-sm whitespace-nowrap">
            {home.title}
          </div>
        </Html>
      )}

      {/* Indicador de punto central */}
      <pointLight position={[0, 0, 0]} color={home.color} intensity={1} distance={10} />
    </group>
  )
}

// Modificar la función QlusterNode para hacerlos más pequeños y aplicar la lógica de hover
function QlusterNode({ qluster, onHover, onLeave, onClick, showInitialLabels, cameraTarget }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [showLabel, setShowLabel] = useState(false)
  const [labelTimer, setLabelTimer] = useState(null)

  // Verificar si el nodo está en el centro de enfoque
  const isInFocus = useMemo(() => {
    if (!cameraTarget) return false
    // Comprobar si este nodo es el objetivo de la cámara
    return (
      Math.abs(cameraTarget[0] - qluster.position[0]) < 0.1 &&
      Math.abs(cameraTarget[1] - qluster.position[1]) < 0.1 &&
      Math.abs(cameraTarget[2] - qluster.position[2]) < 0.1
    )
  }, [cameraTarget, qluster.position])

  // Gestionar la visibilidad de la etiqueta
  useEffect(() => {
    // Mostrar etiqueta si está en hover o en foco
    if (hovered || isInFocus) {
      setShowLabel(true)

      // Limpiar cualquier temporizador existente
      if (labelTimer) {
        clearTimeout(labelTimer)
        setLabelTimer(null)
      }

      // Si está en foco (no en hover), configurar temporizador para ocultar
      if (isInFocus && !hovered) {
        const timer = setTimeout(() => {
          if (!hovered) {
            // Verificar nuevamente que no esté en hover antes de ocultar
            setShowLabel(false)
          }
        }, 10000) // 10 segundos
        setLabelTimer(timer)
      }
    } else if (!hovered && !isInFocus) {
      // Si no está ni en hover ni en foco, ocultar etiqueta
      setShowLabel(false)
    }

    return () => {
      if (labelTimer) {
        clearTimeout(labelTimer)
      }
    }
  }, [hovered, isInFocus])

  // Pulse animation
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime()
      meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = 0.8 + Math.sin(t * 2) * 0.05

      // Rotación lenta
      meshRef.current.rotation.y += 0.001
    }
  })

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    onHover()
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    // Evitamos llamar a onLeave si ya no estamos en hover
    if (hovered) {
      setHovered(false)
      onLeave()
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    onClick()
  }

  if (!qluster.position) return null

  return (
    <group position={qluster.position}>
      {/* Esfera de área que contiene los Qerniums */}
      <mesh scale={[5, 5, 5]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color={qluster.color} transparent={true} opacity={0.1} side={THREE.BackSide} />
      </mesh>

      {/* Glow effect */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={qluster.color} transparent opacity={0.1} />
      </mesh>

      {/* Main sphere */}
      <mesh ref={meshRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={qluster.color}
          emissive={qluster.color}
          emissiveIntensity={hovered ? 1 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Label - mostrar solo cuando showLabel es true */}
      {showLabel && (
        <Html position={[0, 2.0, 0]} center distanceFactor={10} occlude={false}>
          <div
            className={`px-2 py-1 rounded-full bg-black/80 border border-${qluster.color === "#22d3ee" ? "cyan" : qluster.color === "#ec4899" ? "pink" : qluster.color === "#a855f7" ? "purple" : "amber"}-500/50 text-${qluster.color === "#22d3ee" ? "cyan" : qluster.color === "#ec4899" ? "pink" : qluster.color === "#a855f7" ? "purple" : "amber"}-300 text-xs whitespace-nowrap`}
          >
            {qluster.title}
          </div>
        </Html>
      )}
    </group>
  )
}

// Modificar la función QerniumNode para usar cubos rotados
function QerniumNode({ qernium, onHover, onLeave, onClick, showInitialLabels }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Different appearance based on status
  const getNodeProperties = () => {
    const status = qernium.status === "published" ? "available" : "locked"

    switch (status) {
      case "completed":
        return {
          scale: 0.5,
          color: "#10b981", // green
          emissiveIntensity: 0.7,
          opacity: 1,
        }
      case "available":
        return {
          scale: 0.5,
          color: qernium.color || "#ec4899",
          emissiveIntensity: 0.7,
          opacity: 1,
        }
      case "locked":
        return {
          scale: 0.3,
          color: "#6b7280", // gray
          emissiveIntensity: 0.2,
          opacity: 0.7,
        }
      default:
        return {
          scale: 0.4,
          color: qernium.color || "#ec4899",
          emissiveIntensity: 0.5,
          opacity: 0.9,
        }
    }
  }

  const nodeProps = getNodeProperties()

  // Encontrar el Qluster padre
  const qluster = useMemo(() => {
    if (!qernium.qlusterId) return null
    return mockQlusters.find((q) => q.id === qernium.qlusterId)
  }, [qernium.qlusterId])

  // Calcular posición orbital
  useFrame((state) => {
    if (meshRef.current && qluster) {
      const t = state.clock.getElapsedTime()

      // Cada Qernium tiene una velocidad y radio orbital ligeramente diferente
      // Usamos el ID para generar valores consistentes pero diferentes para cada Qernium
      const qerniumIndex = Number.parseInt(qernium.id.split("-")[2]) || 0
      const angleOffset = (qerniumIndex * Math.PI * 2) / 3 // Distribuir los Qerniums en 120 grados cada uno (360/3)
      const speed = 0.1 + qerniumIndex * 0.02 // Velocidades ligeramente diferentes
      const radius = 3.5 + qerniumIndex * 0.5 // Radios más grandes para separar más los Qerniums
      const height = qerniumIndex * 0.5 - 0.5 // Alturas diferentes

      // Calcular posición orbital
      const angle = t * speed + angleOffset
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius

      // Actualizar posición del Qernium
      meshRef.current.position.set(qluster.position[0] + x, qluster.position[1] + height, qluster.position[2] + z)

      // Actualizar la posición absoluta para las conexiones
      qernium.position = [qluster.position[0] + x, qluster.position[1] + height, qluster.position[2] + z]

      // Rotación del Qernium sobre sí mismo - más dinámica para cubos
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.z += 0.005
    }
  })

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    onHover()
  }

  const handlePointerOut = (e) => {
    e.stopPropagation()
    setHovered(false)
    onLeave()
  }

  const handleClick = (e) => {
    e.stopPropagation()
    onClick()
  }

  if (!qluster || !qluster.position) return null

  return (
    <group>
      {/* Main geometry - using cubes for qerniums */}
      <mesh
        ref={meshRef}
        scale={[nodeProps.scale, nodeProps.scale, nodeProps.scale]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={nodeProps.color}
          emissive={nodeProps.color}
          emissiveIntensity={hovered ? nodeProps.emissiveIntensity * 1.5 : nodeProps.emissiveIntensity}
          roughness={0.3}
          metalness={0.7}
          transparent={qernium.status !== "published"}
          opacity={nodeProps.opacity}
        />
      </mesh>

      {/* Only show label when hovered */}
      {hovered && (
        <Html
          position={[
            meshRef.current?.position.x || 0,
            (meshRef.current?.position.y || 0) + 1.5,
            meshRef.current?.position.z || 0,
          ]}
          center
          distanceFactor={15}
          occlude={false}
        >
          <div className="px-2 py-1 rounded-full bg-black/80 border border-pink-500/50 text-pink-300 text-xs whitespace-nowrap">
            {qernium.title}
          </div>
        </Html>
      )}
    </group>
  )
}
