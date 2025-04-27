import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, MoreHorizontal, Users, Brain } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

interface QlusterCardProps {
  qluster: {
    id: string | number
    title: string
    description: string
    startDate: string
    endDate: string
    classes: string[]
    students: number
    qerniums: number
    progress: number
    status: "draft" | "scheduled" | "active"
    color: "purple" | "cyan" | "pink"
    coverImage?: string | null
  }
}

export function QlusterCard({ qluster }: QlusterCardProps) {
  let borderColor = "border-purple-900/50"
  let shadowColor = "shadow-[0_0_15px_rgba(139,92,246,0.1)]"
  let textColor = "text-purple-300"
  let bgHoverColor = "hover:bg-purple-900/20"
  let bgColor = "bg-purple-900/10"
  let gradientFrom = "from-purple-500"
  let gradientTo = "to-purple-300"

  if (qluster.color === "cyan") {
    borderColor = "border-cyan-900/50"
    shadowColor = "shadow-[0_0_15px_rgba(34,211,238,0.1)]"
    textColor = "text-cyan-300"
    bgHoverColor = "hover:bg-cyan-900/20"
    bgColor = "bg-cyan-900/10"
    gradientFrom = "from-cyan-500"
    gradientTo = "to-cyan-300"
  } else if (qluster.color === "pink") {
    borderColor = "border-pink-900/50"
    shadowColor = "shadow-[0_0_15px_rgba(236,72,153,0.1)]"
    textColor = "text-pink-300"
    bgHoverColor = "hover:bg-pink-900/20"
    bgColor = "bg-pink-900/10"
    gradientFrom = "from-pink-500"
    gradientTo = "to-pink-300"
  }

  // Imagen de portada predeterminada según el color
  const defaultCoverImage =
    qluster.color === "cyan"
      ? "/abstract-color-run.png"
      : qluster.color === "pink"
        ? "/abstract-em.png"
        : "/abstract-geometric-pattern.png"

  return (
    <Card className={`${borderColor} bg-black/50 backdrop-blur-sm ${shadowColor} overflow-hidden`}>
      {/* Imagen de portada */}
      <div className="relative w-full h-32">
        <Image
          src={qluster.coverImage || defaultCoverImage}
          alt={qluster.title}
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
                Editar Qluster
              </DropdownMenuItem>
              <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                Ver Detalles
              </DropdownMenuItem>
              <DropdownMenuItem className={`${textColor} ${bgHoverColor} focus:text-white`}>
                Duplicar Qluster
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 focus:bg-red-900/20 focus:text-red-300">
                Eliminar Qluster
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className={`text-xl ${textColor}`}>{qluster.title}</CardTitle>
        <CardDescription className="line-clamp-1">{qluster.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className={`h-4 w-4 ${textColor}`} />
                <span className="text-sm">Fechas:</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(qluster.startDate).toLocaleDateString()} - {new Date(qluster.endDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Brain className={`h-4 w-4 ${textColor}`} />
                <span className="text-sm">Qerniums:</span>
              </div>
              <span className="text-sm text-muted-foreground">{qluster.qerniums}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Users className={`h-4 w-4 ${textColor}`} />
                <span className="text-sm">Estudiantes:</span>
              </div>
              <span className="text-sm text-muted-foreground">{qluster.students}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BookOpen className={`h-4 w-4 ${textColor}`} />
                <span className="text-sm">Clases:</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {qluster.classes.length > 0 ? qluster.classes.join(", ") : "Sin asignar"}
              </span>
            </div>
          </div>

          {qluster.status !== "draft" && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progreso del qluster</span>
                <span>{qluster.progress}%</span>
              </div>
              <Progress
                value={qluster.progress}
                className="h-2 bg-black/50"
                indicatorClassName={`bg-gradient-to-r ${gradientFrom} ${gradientTo}`}
              />
            </div>
          )}

          <div className="flex justify-between items-center">
            <div>
              {qluster.status === "active" && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-950/50 text-cyan-300 border border-cyan-900/50">
                  Activo
                </span>
              )}
              {qluster.status === "scheduled" && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-purple-950/50 text-purple-300 border border-purple-900/50">
                  Programado
                </span>
              )}
              {qluster.status === "draft" && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50">
                  Borrador
                </span>
              )}
            </div>
            <Link href={`/dashboard/qlusters/${qluster.id}`}>
              <Button size="sm" className={`bg-${qluster.color}-600 hover:bg-${qluster.color}-700 text-white`}>
                Gestionar
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
