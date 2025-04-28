"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Menu, User, Settings, LogOut, Rocket } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function StudentHeader({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-black/50 backdrop-blur-md border-b border-cyan-900/30">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-2 text-cyan-300 hover:bg-cyan-900/20"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link href="/student/dashboard" className="flex items-center">
          <div className="bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full p-1 mr-2">
            <Rocket className="h-5 w-5 text-black" />
          </div>
          <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
            QoreXplorer
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-cyan-300 hover:bg-cyan-900/20">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 bg-black/90 border border-cyan-900/50 text-white" align="end">
            <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-cyan-900/30" />
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start p-3 focus:bg-cyan-900/30 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <Badge className="bg-pink-900/30 text-pink-300 border border-pink-500/50">Nuevo Qernium</Badge>
                  <span className="text-xs text-gray-400 ml-auto">Hace 2 horas</span>
                </div>
                <p className="text-sm mt-1">Se ha añadido un nuevo Qernium: "Entrelazamiento Cuántico"</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3 focus:bg-cyan-900/30 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <Badge className="bg-cyan-900/30 text-cyan-300 border border-cyan-500/50">Recordatorio</Badge>
                  <span className="text-xs text-gray-400 ml-auto">Hace 5 horas</span>
                </div>
                <p className="text-sm mt-1">Tienes una entrega pendiente para mañana en "Física Cuántica"</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3 focus:bg-cyan-900/30 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  <Badge className="bg-purple-900/30 text-purple-300 border border-purple-500/50">Logro</Badge>
                  <span className="text-xs text-gray-400 ml-auto">Ayer</span>
                </div>
                <p className="text-sm mt-1">¡Has desbloqueado el logro "Explorador Cuántico"!</p>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8 border border-cyan-900/50">
                <AvatarImage src="/diverse-student-group.png" alt="@student" />
                <AvatarFallback className="bg-cyan-900/30 text-cyan-300">QX</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-black/90 border border-cyan-900/50 text-white" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">QoreXplorer</p>
                <p className="text-xs leading-none text-muted-foreground">qorexplorer@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-cyan-900/30" />
            <DropdownMenuItem className="text-cyan-300 focus:bg-cyan-900/30 focus:text-cyan-200 cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-cyan-300 focus:bg-cyan-900/30 focus:text-cyan-200 cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-cyan-900/30" />
            <Link href="/">
              <DropdownMenuItem className="text-red-300 focus:bg-red-900/30 focus:text-red-200 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
