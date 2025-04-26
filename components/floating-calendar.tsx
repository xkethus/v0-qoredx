"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { CalendarModal } from "./calendar-modal"

interface FloatingCalendarProps {
  userId?: string
}

export function FloatingCalendar({ userId = "user-1" }: FloatingCalendarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
        onClick={() => setIsModalOpen(true)}
      >
        <Calendar className="h-4 w-4" />
        <span className="sr-only">Abrir calendario</span>
      </Button>

      <CalendarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userId={userId} />
    </>
  )
}
