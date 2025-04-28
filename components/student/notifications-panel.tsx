"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Bell, Check, Clock, Star, BookOpen, Atom } from "lucide-react"

interface NotificationsPanelProps {
  onClose: () => void
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "¡Nuevo Qernium disponible!",
      message: "Se ha añadido un nuevo Qernium sobre Física Cuántica a tu Qluster de Ciencias.",
      time: "Hace 5 minutos",
      read: false,
      type: "qernium",
    },
    {
      id: 2,
      title: "¡Logro desbloqueado!",
      message: "Has ganado el logro 'Explorador Novato' por completar 10 Qerniums.",
      time: "Hace 2 horas",
      read: false,
      type: "achievement",
    },
    {
      id: 3,
      title: "Recordatorio: Entrega pendiente",
      message: "Tienes una entrega pendiente para el Qernium de Matemáticas Avanzadas.",
      time: "Hace 1 día",
      read: true,
      type: "reminder",
    },
    {
      id: 4,
      title: "Comentario del instructor",
      message: "Tu QoreMaster ha dejado un comentario en tu última entrega.",
      time: "Hace 2 días",
      read: true,
      type: "comment",
    },
    {
      id: 5,
      title: "Nueva habilidad desbloqueada",
      message: "Has desbloqueado la habilidad 'Pensamiento Analítico' nivel 2.",
      time: "Hace 3 días",
      read: true,
      type: "skill",
    },
  ]

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "qernium":
        return <Atom className="h-5 w-5 text-cyan-400" />
      case "achievement":
        return <Star className="h-5 w-5 text-pink-400" />
      case "reminder":
        return <Clock className="h-5 w-5 text-amber-400" />
      case "comment":
        return <BookOpen className="h-5 w-5 text-purple-400" />
      case "skill":
        return <Star className="h-5 w-5 text-green-400" />
      default:
        return <Bell className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="fixed top-16 right-0 z-30 w-80 h-[calc(100vh-4rem)] border-l border-cyan-900/30 bg-black/80 backdrop-blur-md">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 border-b border-cyan-900/30">
          <h3 className="text-lg font-medium text-cyan-300 flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notificaciones
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-300"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close notifications</span>
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-md border ${
                  notification.read ? "bg-gray-950/30 border-gray-800/50" : "bg-cyan-950/10 border-cyan-900/30"
                }`}
              >
                <div className="flex gap-3">
                  <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className={`text-sm font-medium ${notification.read ? "text-gray-300" : "text-cyan-300"}`}>
                        {notification.title}
                      </h4>
                      {!notification.read && <div className="w-2 h-2 rounded-full bg-cyan-500"></div>}
                    </div>
                    <p className="text-xs text-gray-400">{notification.message}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{notification.time}</span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-cyan-300 hover:bg-cyan-950/30 hover:text-cyan-200"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Marcar como leído
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-cyan-900/30">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-cyan-900/50 text-cyan-300 hover:bg-cyan-950/30 hover:text-cyan-200"
          >
            Marcar todas como leídas
          </Button>
        </div>
      </div>
    </div>
  )
}
