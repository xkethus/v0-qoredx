"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Menu, X, Rocket, Search } from "lucide-react"
import { NotificationsPanel } from "@/components/student/notifications-panel"
import Link from "next/link"

export function StudentHeader({ sidebarOpen, setSidebarOpen }) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-black/80 backdrop-blur-md border-b border-cyan-900/30 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-cyan-300"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <Link href="/student/dashboard" className="flex items-center gap-2 ml-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-pink-500 flex items-center justify-center">
            <Rocket className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
            QoreXplorer
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {/* Botón para acceder a la navegación espacial */}
        <Link href="/student/dashboard">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-2 border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20"
          >
            <Rocket className="h-4 w-4" />
            <span>Explorar Espacio</span>
          </Button>
        </Link>

        <Button variant="ghost" size="icon" className="text-cyan-300">
          <Search className="h-5 w-5" />
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-cyan-300 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-pink-500 text-white text-[10px]">
              3
            </Badge>
          </Button>
          {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
        </div>

        <Avatar className="h-8 w-8 border border-cyan-900/50">
          <AvatarImage src="/mystical-forest-spirit.png" alt="Avatar" />
          <AvatarFallback className="bg-cyan-950/50 text-cyan-300">AE</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
