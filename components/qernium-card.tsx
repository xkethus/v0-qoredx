import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, MoreHorizontal, Zap, CuboidIcon as Cube, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"

interface QerniumCardProps {
  qernium: {
    id: string | number
    title: string
    description: string
    bloomLevel: string
    actionVerb: string
    status: "published" | "draft"
    estimatedTime: number
    qlusters: string[]
    color: "purple" | "cyan" | "pink" | "amber"
    coverImage?: string | null
  }
}

export function QerniumCard({ qernium }: QerniumCardProps) {
  let borderColor = "border-purple-900/50"
  let shadowColor = "shadow-[0_0_15px_rgba(139,92,246,0.1)]"
  let textColor = "text-purple-300"
  let bgHoverColor = "hover:bg-purple-900/20"

  if (qernium.color === "cyan") {
    borderColor = "border-cyan-900/50"
    shadowColor = "shadow-[0_0_15px_rgba(34,211,238,0.1)]"
    textColor = "text-cyan-300"
    bgHoverColor = "hover:bg-cyan-900/20"
  } else if (qernium.color === "pink") {
    borderColor = "border-pink-900/50"
    shadowColor = "shadow-[0_0_15px_rgba(236,72,153,0.1)]"
    textColor = "text-pink-300"
    bgHoverColor = "hover:bg-pink-900/20"
  } else if (qernium.color === "amber") {
    borderColor = "border-amber-900/50"
    shadowColor = "shadow-[0_0_15px_rgba(251,191,36,0.1)]"
    textColor = "text-amber-300"
    bgHoverColor = "hover:bg-amber-900/20"
  }

  // Función para obtener el color de fondo según el nivel de Bloom
  const getBloomLevelColor = (level: string) => {
    switch (level) {
      case "remember":
        return "bg-blue-900/30 text-blue-300"
      case "understand":
        return "bg-green-900/30 text-green-300"
      case "apply":
        return "bg-yellow-900/30 text-yellow-300"
      case "analyze":
        return "bg-orange-900/30 text-orange-300"
      case "evaluate":
        return "bg-red-900/30 text-red-300"
      case "create":
        return "bg-purple-900/30 text-purple-300"
      default:
        return "bg-gray-900/30 text-gray-300"
    }
  }

  // Función para obtener el nombre del nivel de Bloom en español
  const getBloomLevelName = (level: string) => {
    switch (level) {
      case "remember":
        return "Recordar"
      case "understand":
        return "Comprender"
      case "apply":
        return "Aplicar"
      case "analyze":
        return "Analizar"
      case "evaluate":
        return "Evaluar"
      case "create":
        return "Crear"
      default:
        return level
    }
  }

  // Imagen de portada predeterminada según el color y nivel de Bloom
  const defaultCoverImage =
    qernium.color === "cyan"
      ? "/abstract-color-run.png"
      : qernium.color === "pink"
        ? "/abstract-em.png"
        : qernium.color === "amber"
          ? "/abstract-dl.png"
          : "/abstract-geometric-pattern.png"

  return (
    <Card className={`${borderColor} bg-black/50 backdrop-blur-sm ${shadowColor} overflow-hidden`}>
      {/* Imagen de portada */}
      <div className="relative w-full h-32">
        <Image
          src={qernium.coverImage || defaultCoverImage}
          alt={qernium.title}
          fill
          className="object-cover"
          priority
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent`}></div>
        <div className="absolute bottom-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 bg-black/50 text-white hover:bg-black/70">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Menú</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 border-purple-900/50">
              <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                Editar Qernium
              </DropdownMenuItem>
              <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                Ver Detalles
              </DropdownMenuItem>
              <Link href={`/dashboard/qerniums/preview/${qernium.id}`} passHref>
                <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                  Vista Previa
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                Duplicar Qernium
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 focus:bg-red-900/20 focus:text-red-300">
                Eliminar Qernium
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className={`text-xl ${textColor}`}>{qernium.title}</CardTitle>
        <CardDescription className="line-clamp-2">{qernium.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Brain className={`h-4 w-4 ${textColor}`} />
                <span className="text-sm">Nivel Bloom:</span>
              </div>
              <Badge className={getBloomLevelColor(qernium.bloomLevel)}>{getBloomLevelName(qernium.bloomLevel)}</Badge>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Zap className={`h-4 w-4 ${textColor}`} />
                <span className="text-sm">Verbo de acción:</span>
              </div>
              <span className="text-sm text-muted-foreground">{qernium.actionVerb}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Cube className={`h-4 w-4 ${textColor}`} />
                <span className="text-sm">Qlusters:</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {qernium.qlusters.length > 0 ? qernium.qlusters.length : "Ninguno"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${textColor}`}
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-sm">Tiempo estimado:</span>
              </div>
              <span className="text-sm text-muted-foreground">{qernium.estimatedTime} min</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              {qernium.status === "published" && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-green-950/50 text-green-300 border border-green-900/50">
                  Publicado
                </span>
              )}
              {qernium.status === "draft" && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50">
                  Borrador
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Link href={`/dashboard/qerniums/preview/${qernium.id}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className={`border-${qernium.color}-900/50 text-${qernium.color}-300 hover:bg-${qernium.color}-900/20`}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/dashboard/qerniums/${qernium.id}`}>
                <Button size="sm" className={`bg-${qernium.color}-600 hover:bg-${qernium.color}-700 text-white`}>
                  Gestionar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
