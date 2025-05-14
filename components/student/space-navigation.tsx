"use client"

import { useRef, useState, useMemo, useEffect, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html, Stars } from "@react-three/drei"
import { Vector3 } from "three"
import { Button } from "@/components/ui/button"
import {
  Atom,
  Layers,
  Rocket,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Monitor,
  Navigation2,
  EyeOff,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCw,
} from "lucide-react"
import * as THREE from "three"
import { mockQlusters } from "@/lib/mock-data"
import { useHUD } from "@/lib/contexts/hud-context"
import { IntegratedHUD } from "./integrated-hud"
import { HtmlCockpitOverlay } from "./html-cockpit-overlay"

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

// Componente para el indicador de carga de Qerniums
function QerniumsLoadingIndicator({ position, color }) {
  const groupRef = useRef()
  const [rotation, setRotation] = useState(0)

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime()
      groupRef.current.rotation.y = t * 2
      setRotation(t)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Partículas orbitando */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 1.5
        const x = Math.cos(angle + rotation) * radius
        const z = Math.sin(angle + rotation) * radius
        const scale = 0.1 + Math.sin(rotation * 3 + i) * 0.05

        return (
          <mesh key={i} position={[x, 0, z]} scale={[scale, scale, scale]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
          </mesh>
        )
      })}

      {/* Texto de carga */}
      <Html position={[0, 2, 0]} center>
        <div className="px-3 py-1 rounded-full bg-black/80 border border-cyan-500/50 text-cyan-300 text-xs whitespace-nowrap">
          Cargando Qerniums...
        </div>
      </Html>
    </group>
  )
}

// Modificar la función SpaceNavigation para incluir controles de navegación manual y el botón de inicio
export function SpaceNavigation({ onNodeSelect }) {
  const [hoveredNode, setHoveredNode] = useState(null)
  const [cameraTarget, setCameraTarget] = useState([0, 0, 0])
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
  // Nuevo estado para rastrear el Qluster seleccionado
  const [selectedQlusterId, setSelectedQlusterId] = useState(null)
  // Estado para controlar la carga de Qerniums
  const [loadingQerniums, setLoadingQerniums] = useState(false)

  const { showHUD, customizations, hudStyle } = useHUD()

  // Mostrar etiquetas iniciales después de un delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialLabels(true)
    }, 3000) // 3 segundos de delay

    return () => clearTimeout(timer)
  }, [])

  const handleNodeHover = useCallback((node, type) => {
    setHoveredNode({ ...node, type })
  }, [])

  const handleNodeLeave = useCallback(() => {
    setHoveredNode(null)
  }, [])

  const handleNodeClick = useCallback(
    (node, type) => {
      setCameraTarget(node.position)

      // Si es un Qluster, mostrar/ocultar sus Qerniums
      if (type === "qluster") {
        // Si ya está seleccionado, deseleccionarlo
        if (selectedQlusterId === node.id) {
          setSelectedQlusterId(null)
        } else {
          // Mostrar indicador de carga
          setLoadingQerniums(true)

          // Simular tiempo de carga
          setTimeout(() => {
            setSelectedQlusterId(node.id)
            setLoadingQerniums(false)
          }, 2000) // 2 segundos de "carga"
        }
      }

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
    },
    [onNodeSelect, setCameraTarget, selectedQlusterId],
  )

  const toggleNavigation = () => {
    setShowNavigation(!showNavigation)
  }

  const toggleIntegratedHUD = () => {
    setShowIntegratedHUD(!showIntegratedHUD)
  }

  // Funciones para controlar la navegación
  const handleManualNavigation = (axis, value) => {
    setManualControls((prev) => ({
      ...prev,
      [axis]: value,
    }))
  }

  // Funciones para incrementar/decrementar valores de navegación
  const adjustNavigation = (axis, amount) => {
    setManualControls((prev) => {
      let newValue = prev[axis] + amount

      // Aplicar límites según el eje
      if (axis === "x") {
        newValue = Math.max(-50, Math.min(50, newValue))
      } else if (axis === "y") {
        newValue = Math.max(-30, Math.min(30, newValue))
      } else if (axis === "rotation") {
        newValue = Math.max(-180, Math.min(180, newValue))
      } else if (axis === "zoom") {
        newValue = Math.max(5, Math.min(40, newValue))
      }

      return {
        ...prev,
        [axis]: newValue,
      }
    })
  }

  const resetNavigation = () => {
    setCameraTarget([0, 0, 0])
    setManualControls({
      x: 0,
      y: 0,
      rotation: 0,
      zoom: 15,
    })

    // Deseleccionar cualquier Qluster
    setSelectedQlusterId(null)

    // Resetear la cámara usando OrbitControls
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset()
    }
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

  // Función para renderizar el titular general
  const renderGeneralHeader = () => {
    if (!hoveredNode) return null

    const getTypeIcon = () => {
      switch (hoveredNode.type) {
        case "qluster":
          return <Layers className="h-5 w-5" />
        case "home":
          return <Rocket className="h-5 w-5" />
        case "qernium":
          return <Atom className="h-5 w-5" />
        default:
          return null
      }
    }

    const getTypeColor = () => {
      switch (hoveredNode.type) {
        case "qluster":
          return "cyan"
        case "home":
          return "amber"
        case "qernium":
          return "pink"
        default:
          return "gray"
      }
    }

    const getTypeLabel = () => {
      switch (hoveredNode.type) {
        case "qluster":
          return "Qluster"
        case "home":
          return "Centro de Navegación"
        case "qernium":
          return "Qernium"
        default:
          return "Elemento"
      }
    }

    const color = getTypeColor()

    return (
      <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
        <div className="relative">
          <div
            className={`absolute -inset-1 bg-gradient-to-r from-${color}-500 to-${color === "cyan" ? "blue" : color === "amber" ? "orange" : "purple"}-500 rounded-lg blur opacity-75`}
          ></div>
          <div className="relative px-4 py-2 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full bg-${color}-900/30 flex items-center justify-center text-${color}-300`}
              >
                {getTypeIcon()}
              </div>
              <div>
                <div className={`text-xs uppercase tracking-wider text-${color}-400`}>{getTypeLabel()}</div>
                <h2 className={`text-lg font-bold text-${color}-300`}>{hoveredNode.title}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
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
          manualControls={manualControls}
          showInitialLabels={showInitialLabels}
          orbitControlsRef={orbitControlsRef}
          selectedQlusterId={selectedQlusterId}
          loadingQerniums={loadingQerniums}
        />

        {/* Ya no usamos el CockpitOverlay 3D aquí */}
      </Canvas>

      {/* Nuevo HtmlCockpitOverlay como elemento HTML superpuesto - ahora invisible */}
      {showHUD && <HtmlCockpitOverlay customizations={customizations} assets={hudStyle} />}

      {/* Titular general para el elemento bajo el cursor */}
      {renderGeneralHeader()}

      {/* Ya no mostramos los controles de zoom flotantes aquí */}

      {/* Nuevo panel de navegación horizontal */}
      {showNavigation && (
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-75"></div>
            <div className="relative bg-black/80 backdrop-blur-sm border border-cyan-900/50 rounded-lg p-5 min-w-[600px]">
              {/* Botón para cerrar la interfaz - ahora más grande y visible */}
              <button
                onClick={toggleNavigation}
                className="absolute top-3 right-3 text-gray-400 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all duration-200"
                aria-label="Cerrar navegación"
              >
                <EyeOff className="h-5 w-5" />
              </button>

              {/* Primera fila: todos los controles en línea horizontal */}
              <div className="flex items-center justify-center gap-4 mb-5 px-8">
                {/* Controles horizontales */}
                <Button
                  onClick={() => adjustNavigation("x", -5)}
                  className="bg-black/70 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 h-10 w-10 rounded-full p-0 flex items-center justify-center"
                  title="Izquierda"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Button
                  onClick={() => adjustNavigation("x", 5)}
                  className="bg-black/70 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 h-10 w-10 rounded-full p-0 flex items-center justify-center"
                  title="Derecha"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>

                {/* Separador visual */}
                <div className="h-8 w-px bg-cyan-800/30"></div>

                {/* Controles verticales */}
                <Button
                  onClick={() => adjustNavigation("y", 5)}
                  className="bg-black/70 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 h-10 w-10 rounded-full p-0 flex items-center justify-center"
                  title="Arriba"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
                <Button
                  onClick={() => adjustNavigation("y", -5)}
                  className="bg-black/70 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 h-10 w-10 rounded-full p-0 flex items-center justify-center"
                  title="Abajo"
                >
                  <ArrowDown className="h-5 w-5" />
                </Button>

                {/* Separador visual */}
                <div className="h-8 w-px bg-cyan-800/30"></div>

                {/* Controles de rotación */}
                <Button
                  onClick={() => adjustNavigation("rotation", -15)}
                  className="bg-black/70 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 h-10 w-10 rounded-full p-0 flex items-center justify-center"
                  title="Rotar izquierda"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
                <Button
                  onClick={() => adjustNavigation("rotation", 15)}
                  className="bg-black/70 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 h-10 w-10 rounded-full p-0 flex items-center justify-center"
                  title="Rotar derecha"
                >
                  <RotateCw className="h-5 w-5" />
                </Button>

                {/* Separador visual */}
                <div className="h-8 w-px bg-cyan-800/30"></div>

                {/* Controles de zoom */}
                <Button
                  onClick={() => adjustNavigation("zoom", -2)}
                  className="bg-black/70 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 h-10 w-10 rounded-full p-0 flex items-center justify-center"
                  title="Acercar"
                >
                  <ZoomIn className="h-5 w-5" />
                </Button>
                <Button
                  onClick={() => adjustNavigation("zoom", 2)}
                  className="bg-black/70 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 h-10 w-10 rounded-full p-0 flex items-center justify-center"
                  title="Alejar"
                >
                  <ZoomOut className="h-5 w-5" />
                </Button>
              </div>

              {/* Segunda fila: solo el botón de origen con icono de átomo */}
              <div className="flex justify-center">
                <Button
                  onClick={resetNavigation}
                  className="bg-black/70 border border-cyan-500 text-cyan-300 hover:bg-cyan-900/20 h-10 w-10 rounded-full p-0 flex items-center justify-center"
                  title="Volver al centro"
                >
                  <Atom className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botones flotantes en la esquina inferior derecha */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
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
  selectedQlusterId,
  loadingQerniums,
}) {
  const { camera } = useThree()
  const sceneRef = useRef()

  // Shared geometries
  const sharedGeometries = useMemo(
    () => ({
      sphere: new THREE.SphereGeometry(1, 32, 32),
      box: new THREE.BoxGeometry(1, 1, 1),
      torus: new THREE.TorusGeometry(1, 0.05, 16, 100),
    }),
    [],
  )

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

  // Filtrar los Qerniums para mostrar solo los del Qluster seleccionado
  const visibleQerniums = useMemo(() => {
    if (!selectedQlusterId) return []
    return qerniums.filter((qernium) => qernium.qlusterId === selectedQlusterId)
  }, [qerniums, selectedQlusterId])

  // Encontrar el Qluster seleccionado
  const selectedQluster = useMemo(() => {
    if (!selectedQlusterId) return null
    return qlusters.find((qluster) => qluster.id === selectedQlusterId)
  }, [qlusters, selectedQlusterId])

  // Verificar si hay elementos que comparten la misma posición inicial
  const positionMap = useMemo(() => {
    const map = new Map()

    // Añadir el nodo home
    const homeKey = `${homeNode.position[0]},${homeNode.position[1]},${homeNode.position[2]}`
    map.set(homeKey, [homeNode])

    // Añadir los qlusters
    qlusters.forEach((qluster) => {
      if (qluster.position) {
        const key = `${qluster.position[0]},${qluster.position[1]},${qluster.position[2]}`
        if (map.has(key)) {
          map.get(key).push(qluster)
        } else {
          map.set(key, [qluster])
        }
      }
    })

    // Identificar posiciones compartidas
    const sharedPositions = []
    map.forEach((nodes, key) => {
      if (nodes.length > 1) {
        sharedPositions.push({ position: key, nodes })
      }
    })

    return { map, sharedPositions }
  }, [homeNode, qlusters])

  // Mostrar en consola si hay posiciones compartidas
  useEffect(() => {
    if (positionMap.sharedPositions.length > 0) {
      console.log("Elementos que comparten posición:", positionMap.sharedPositions)
    }
  }, [positionMap])

  return (
    <group ref={sceneRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Render home node */}
      <HomeNode
        home={homeNode}
        onHover={() => onNodeHover(homeNode, "home")}
        onLeave={() => onNodeLeave(homeNode)}
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
          isSelected={qluster.id === selectedQlusterId}
        />
      ))}

      {/* Mostrar indicador de carga si estamos cargando Qerniums */}
      {loadingQerniums && selectedQluster && (
        <QerniumsLoadingIndicator position={selectedQluster.position} color={selectedQluster.color || "#22d3ee"} />
      )}

      {/* Render qerniums - solo para el Qluster seleccionado */}
      {visibleQerniums.map((qernium, index) => (
        <QerniumNode
          key={qernium.id}
          qernium={qernium}
          onHover={() => onNodeHover(qernium, "qernium")}
          onLeave={onNodeLeave}
          onClick={() => onNodeClick(qernium, "qernium")}
          showInitialLabels={showInitialLabels}
          index={index}
          totalQerniums={visibleQerniums.length}
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

      {/* Anillos orbitales - restauramos ambos anillos */}
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

      {/* Indicador de punto central */}
      <pointLight position={[0, 0, 0]} color={home.color} intensity={1} distance={10} />
    </group>
  )
}

// Modificar la función QlusterNode para hacerlos más pequeños y aplicar la lógica de hover
function QlusterNode({ qluster, onHover, onLeave, onClick, showInitialLabels, cameraTarget, isSelected }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

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

  // Pulse animation
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime()

      // Escala base más grande si está seleccionado
      const baseScale = isSelected ? 1.2 : 0.8

      // Pulso más pronunciado si está seleccionado
      const pulseIntensity = isSelected ? 0.1 : 0.05

      meshRef.current.scale.x =
        meshRef.current.scale.y =
        meshRef.current.scale.z =
          baseScale + Math.sin(t * 2) * pulseIntensity

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

  // Color más brillante si está seleccionado
  const emissiveIntensity = isSelected ? 1.2 : hovered ? 1 : 0.5

  return (
    <group position={qluster.position}>
      {/* Esfera de área que contiene los Qerniums - solo visible si está seleccionado */}
      {isSelected && (
        <mesh scale={[5, 5, 5]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={qluster.color} transparent={true} opacity={0.15} side={THREE.BackSide} />
        </mesh>
      )}

      {/* Glow effect - más intenso si está seleccionado */}
      <mesh scale={[isSelected ? 1.5 : 1.2, isSelected ? 1.5 : 1.2, isSelected ? 1.5 : 1.2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={qluster.color} transparent opacity={isSelected ? 0.2 : 0.1} />
      </mesh>

      {/* Main sphere */}
      <mesh ref={meshRef} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={qluster.color}
          emissive={qluster.color}
          emissiveIntensity={emissiveIntensity}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Indicador de selección */}
      {isSelected && (
        <mesh position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.3, 32]} />
          <meshBasicMaterial color={qluster.color} transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  )
}

// Modificar la función QerniumNode para usar cubos rotados y distribuirlos uniformemente
function QerniumNode({ qernium, onHover, onLeave, onClick, showInitialLabels, index, totalQerniums }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  // Replace the existing getNodeProperties function with this memoized version
  const nodeProps = useMemo(() => {
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
  }, [qernium.status, qernium.color])

  // Encontrar el Qluster padre
  const qluster = useMemo(() => {
    if (!qernium.qlusterId) return null
    return mockQlusters.find((q) => q.id === qernium.qlusterId)
  }, [qernium.qlusterId])

  // Efecto de aparición gradual
  useEffect(() => {
    // Simular tiempo de aparición
    const timer = setTimeout(() => {
      setVisible(true)
    }, Math.random() * 1000) // Aparición escalonada entre 0 y 1 segundo

    return () => clearTimeout(timer)
  }, [])

  // Calcular posición orbital con distribución uniforme
  useFrame((state) => {
    if (meshRef.current && qluster) {
      const t = state.clock.getElapsedTime()

      // Distribuir los Qerniums uniformemente en un círculo completo
      // Dividir 360 grados entre el número total de Qerniums
      const angleStep = (Math.PI * 2) / totalQerniums
      const baseAngle = angleStep * index // Posición angular base

      // Radio orbital más grande para una distribución más amplia
      const radius = 5.5 // Aumentado para mayor separación

      // Velocidad de rotación más lenta
      const rotationSpeed = 0.05

      // Altura variable para cada Qernium (distribución en 3D)
      const heightVariation = 1.0 // Mayor variación en altura
      const height = Math.sin(index * (Math.PI / totalQerniums)) * heightVariation

      // Calcular posición orbital
      const angle = baseAngle + t * rotationSpeed
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

      // Efecto de aparición
      if (visible && meshRef.current.material) {
        // Ajustar la opacidad gradualmente
        meshRef.current.material.opacity = Math.min(nodeProps.opacity, meshRef.current.material.opacity + 0.02)
      } else if (meshRef.current.material) {
        meshRef.current.material.opacity = 0.01 // Casi invisible al inicio
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
          transparent={true}
          opacity={visible ? nodeProps.opacity : 0.01}
        />
      </mesh>
    </group>
  )
}
