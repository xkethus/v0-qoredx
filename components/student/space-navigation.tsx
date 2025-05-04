"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html, Stars } from "@react-three/drei"
import { Vector3 } from "three"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, Atom, Layers, Rocket, User, Map, Zap, Settings } from "lucide-react"
import * as THREE from "three"
import { mockQlusters, mockQerniums } from "@/lib/mock-data"
import { useHUD } from "@/lib/contexts/hud-context"

// Main component for the 3D space navigation
export function SpaceNavigation({ onNodeSelect }) {
  const [hoveredNode, setHoveredNode] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)
  const [cameraTarget, setCameraTarget] = useState([0, 0, 0])
  const [showCustomization, setShowCustomization] = useState(false)

  const { showHUD, customizations, hudStyle, updateCustomization, updateHUDStyle } = useHUD()

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
      }
    }
  }

  const toggleCustomization = () => {
    setShowCustomization(!showCustomization)
  }

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
        />

        {/* Cockpit overlay - solo se muestra si showHUD es true */}
        {showHUD && <CockpitOverlay customizations={customizations} assets={hudStyle} />}
      </Canvas>

      {/* Floating UI for node information */}
      {hoveredNode && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 max-w-md w-full z-10">
          <div className="relative">
            <div
              className={`absolute -inset-1 bg-gradient-to-r from-${hoveredNode.type === "qluster" ? "cyan" : "pink"}-500 to-${hoveredNode.type === "qluster" ? "blue" : "purple"}-500 rounded-lg blur opacity-75`}
            ></div>
            <div className="relative p-4 bg-black/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg">
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full bg-${hoveredNode.type === "qluster" ? "cyan" : "pink"}-900/30 flex items-center justify-center text-${hoveredNode.type === "qluster" ? "cyan" : "pink"}-300`}
                >
                  {hoveredNode.type === "qluster" ? <Layers className="h-5 w-5" /> : <Atom className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold text-${hoveredNode.type === "qluster" ? "cyan" : "pink"}-300`}>
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
                        {hoveredNode.bloomLevel.charAt(0).toUpperCase() + hoveredNode.bloomLevel.slice(1)}
                      </Badge>
                      <Badge
                        className={`bg-${
                          hoveredNode.status === "completed"
                            ? "green"
                            : hoveredNode.status === "available"
                              ? "pink"
                              : "gray"
                        }-900/30 text-${
                          hoveredNode.status === "completed"
                            ? "green"
                            : hoveredNode.status === "available"
                              ? "pink"
                              : "gray"
                        }-300 border border-${
                          hoveredNode.status === "completed"
                            ? "green"
                            : hoveredNode.status === "available"
                              ? "pink"
                              : "gray"
                        }-500/50`}
                      >
                        {hoveredNode.status === "completed"
                          ? "Completado"
                          : hoveredNode.status === "available"
                            ? "Disponible"
                            : "Bloqueado"}
                      </Badge>
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-${hoveredNode.type === "qluster" ? "cyan" : "pink"}-900/50 text-${hoveredNode.type === "qluster" ? "cyan" : "pink"}-300 hover:bg-${hoveredNode.type === "qluster" ? "cyan" : "pink"}-900/20`}
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

// Cockpit overlay component - this is the HUD that frames the content
function CockpitOverlay({ customizations, assets }) {
  const { size, camera } = useThree()
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

  // Sample data for console displays
  const consoleData = [
    {
      id: "physics",
      name: "Física Cuántica",
      icon: <Atom className="h-5 w-5" />,
      color: "#22d3ee",
    },
    {
      id: "space",
      name: "Exploración Espacial",
      icon: <Rocket className="h-5 w-5" />,
      color: "#ec4899",
    },
    {
      id: "ai",
      name: "Inteligencia Artificial",
      icon: <Zap className="h-5 w-5" />,
      color: "#a855f7",
    },
    {
      id: "profile",
      name: "Perfil",
      icon: <User className="h-5 w-5" />,
      color: "#10b981",
    },
    {
      id: "map",
      name: "Mapa",
      icon: <Map className="h-5 w-5" />,
      color: "#f59e0b",
    },
  ]

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

  // Render console buttons
  const renderConsoleButtons = () => {
    return (
      <group position={[0, -1.7, -2.9]}>
        {consoleData.map((console, index) => {
          const spacing = 0.6 * aspect
          const xPos = (index - 2) * spacing

          return (
            <group key={console.id} position={[xPos, 0, 0]}>
              <mesh>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial
                  color={console.color}
                  emissive={console.color}
                  emissiveIntensity={1}
                  transparent={true}
                  opacity={0.7}
                />
              </mesh>
              <Html position={[0, -0.2, 0]} center>
                <div className="text-xs text-white font-bold">{console.name}</div>
              </Html>
            </group>
          )
        })}
      </group>
    )
  }

  return (
    <group ref={frameRef}>
      {/* Frame structure */}
      {renderFrame()}

      {/* Console */}
      {renderConsole()}

      {/* Console buttons */}
      {renderConsoleButtons()}

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

// Space scene component for the 3D space
function SpaceScene({ qlusters, qerniums, onNodeHover, onNodeLeave, onNodeClick, cameraTarget }) {
  const { camera } = useThree()

  // Animate camera to target position
  useFrame(() => {
    camera.position.lerp(new Vector3(cameraTarget[0] + 10, cameraTarget[1] + 5, cameraTarget[2] + 15), 0.05)
  })

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Render qlusters */}
      {qlusters.map((qluster) => (
        <QlusterNode
          key={qluster.id}
          qluster={qluster}
          onHover={() => onNodeHover(qluster, "qluster")}
          onLeave={onNodeLeave}
          onClick={() => onNodeClick(qluster, "qluster")}
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
        />
      ))}

      {/* Render connections between qlusters and their qerniums */}
      {qerniums.map((qernium) => {
        const qluster = qlusters.find((q) => q.id === qernium.qlusterId)
        if (!qluster || !qernium.position || !qluster.position) return null

        return (
          <Connection
            key={`connection-${qernium.id}`}
            start={qluster.position}
            end={qernium.position}
            color={qluster.color}
            status={qernium.status === "published" ? "available" : "locked"}
          />
        )
      })}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={100}
        target={new Vector3(...cameraTarget)}
      />
    </>
  )
}

// Qluster node component
function QlusterNode({ qluster, onHover, onLeave, onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Pulse animation
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime()
      meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = 1 + Math.sin(t * 2) * 0.05
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

  if (!qluster.position) return null

  return (
    <group position={qluster.position}>
      {/* Glow effect */}
      <mesh scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={qluster.color} transparent opacity={0.1} />
      </mesh>

      {/* Main sphere */}
      <mesh ref={meshRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={qluster.color}
          emissive={qluster.color}
          emissiveIntensity={hovered ? 1 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Label */}
      <Html position={[0, 1.5, 0]} center distanceFactor={10} occlude>
        <div
          className={`px-2 py-1 rounded-full bg-black/80 border border-${qluster.color === "#22d3ee" ? "cyan" : qluster.color === "#ec4899" ? "pink" : qluster.color === "#a855f7" ? "purple" : "amber"}-500/50 text-${qluster.color === "#22d3ee" ? "cyan" : qluster.color === "#ec4899" ? "pink" : qluster.color === "#a855f7" ? "purple" : "amber"}-300 text-xs whitespace-nowrap`}
        >
          {qluster.title}
        </div>
      </Html>
    </group>
  )
}

// Qernium node component
function QerniumNode({ qernium, onHover, onLeave, onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Different appearance based on status
  const getNodeProperties = () => {
    const status = qernium.status === "published" ? "available" : "locked"

    switch (status) {
      case "completed":
        return {
          scale: 0.6,
          color: "#10b981", // green
          emissiveIntensity: 0.7,
          opacity: 1,
        }
      case "available":
        return {
          scale: 0.6,
          color: qernium.color || "#ec4899",
          emissiveIntensity: 0.7,
          opacity: 1,
        }
      case "locked":
        return {
          scale: 0.4,
          color: "#6b7280", // gray
          emissiveIntensity: 0.2,
          opacity: 0.7,
        }
      default:
        return {
          scale: 0.5,
          color: qernium.color || "#ec4899",
          emissiveIntensity: 0.5,
          opacity: 0.9,
        }
    }
  }

  const nodeProps = getNodeProperties()

  // Subtle floating animation
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime()
      meshRef.current.position.y = Math.sin(t * 2 + qernium.id.charCodeAt(0)) * 0.1

      if (hovered) {
        meshRef.current.rotation.y += 0.01
      }
    }
  })

  const handlePointerOver = (e) => {
    if (qernium.status !== "published") return
    e.stopPropagation()
    setHovered(true)
    onHover()
  }

  const handlePointerOut = (e) => {
    if (qernium.status !== "published") return
    e.stopPropagation()
    setHovered(false)
    onLeave()
  }

  const handleClick = (e) => {
    if (qernium.status !== "published") return
    e.stopPropagation()
    onClick()
  }

  if (!qernium.position) return null

  return (
    <group position={qernium.position}>
      {/* Glow effect for available and completed qerniums */}
      {qernium.status === "published" && (
        <mesh scale={[nodeProps.scale * 2, nodeProps.scale * 2, nodeProps.scale * 2]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={nodeProps.color} transparent opacity={0.1} />
        </mesh>
      )}

      {/* Main geometry - using octahedron for qerniums */}
      <mesh
        ref={meshRef}
        scale={[nodeProps.scale, nodeProps.scale, nodeProps.scale]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <octahedronGeometry args={[1, 0]} />
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

      {/* Only show label for available and completed qerniums */}
      {qernium.status === "published" && (
        <Html position={[0, 1, 0]} center distanceFactor={15} occlude>
          <div className="relative group">
            <div
              className={`absolute bottom-0 left-0 w-full p-2 bg-black/70 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
            >
              {qernium.title}
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Connection between qluster and qernium
function Connection({ start, end, color, status }) {
  const ref = useRef()

  // Calculate the midpoint with a slight offset for a curved effect
  const mid = useMemo(() => {
    const midPoint = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2 + 0.5, (start[2] + end[2]) / 2]
    return midPoint
  }, [start, end])

  // Create points for the quadratic curve
  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...end),
    )
    return curve.getPoints(20)
  }, [start, mid, end])

  // Determine line appearance based on status
  const getLineProperties = () => {
    switch (status) {
      case "completed":
        return {
          color: "#10b981", // green
          opacity: 0.8,
          lineWidth: 2,
        }
      case "available":
        return {
          color,
          opacity: 0.8,
          lineWidth: 2,
        }
      case "locked":
        return {
          color: "#6b7280", // gray
          opacity: 0.3,
          lineWidth: 1,
        }
      default:
        return {
          color,
          opacity: 0.5,
          lineWidth: 1.5,
        }
    }
  }

  const lineProps = getLineProperties()

  // Animate the line for available and completed connections
  useFrame((state) => {
    if (ref.current && (status === "available" || status === "completed")) {
      if (ref.current.material instanceof THREE.LineDashedMaterial) {
        ref.current.material.dashOffset -= 0.01
        ref.current.computeLineDistances()
      }
    }
  })

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      {status !== "locked" ? (
        <lineDashedMaterial
          color={lineProps.color}
          linewidth={lineProps.lineWidth}
          transparent={true}
          opacity={lineProps.opacity}
          dashSize={0.5}
          gapSize={0.2}
        />
      ) : (
        <lineBasicMaterial
          color={lineProps.color}
          linewidth={lineProps.lineWidth}
          transparent={true}
          opacity={lineProps.opacity}
        />
      )}
    </line>
  )
}
