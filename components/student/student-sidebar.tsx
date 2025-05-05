"use client"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Rocket, Atom, Layers, Calendar, ChevronRight, ChevronLeft } from "lucide-react"
import { useState } from "react"

export function StudentSidebar({ open, setOpen }) {
  // Iniciar colapsado por defecto
  const [isCollapsed, setIsCollapsed] = useState(true)

  // Función para alternar entre estado expandido y colapsado
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{
          x: open ? 0 : -300,
          width: isCollapsed ? 80 : 256,
        }}
        transition={{ type: "spring", damping: 20 }}
        className={`fixed top-0 left-0 z-40 h-full bg-black/80 backdrop-blur-md border-r border-cyan-900/30 pt-16 flex flex-col md:translate-x-0`}
      >
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-2 mt-4">
            {!isCollapsed && (
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Navegación</h3>
            )}
            <nav className="space-y-1">
              <Link href="/student/dashboard">
                <Button
                  variant="ghost"
                  className={`${isCollapsed ? "w-12 justify-center px-0" : "w-full justify-start"} text-cyan-300 hover:bg-cyan-900/20`}
                >
                  <Rocket className={`${isCollapsed ? "" : "mr-2"} h-4 w-4`} />
                  {!isCollapsed && "Dashboard"}
                </Button>
              </Link>
              <Link href="/student/qlusters">
                <Button
                  variant="ghost"
                  className={`${isCollapsed ? "w-12 justify-center px-0" : "w-full justify-start"} text-cyan-300 hover:bg-cyan-900/20`}
                >
                  <Layers className={`${isCollapsed ? "" : "mr-2"} h-4 w-4`} />
                  {!isCollapsed && "Qlusters"}
                </Button>
              </Link>
              <Link href="/student/qerniums">
                <Button
                  variant="ghost"
                  className={`${isCollapsed ? "w-12 justify-center px-0" : "w-full justify-start"} text-cyan-300 hover:bg-cyan-900/20`}
                >
                  <Atom className={`${isCollapsed ? "" : "mr-2"} h-4 w-4`} />
                  {!isCollapsed && "Qerniums"}
                </Button>
              </Link>
              <Link href="/student/calendar">
                <Button
                  variant="ghost"
                  className={`${isCollapsed ? "w-12 justify-center px-0" : "w-full justify-start"} text-cyan-300 hover:bg-cyan-900/20`}
                >
                  <Calendar className={`${isCollapsed ? "" : "mr-2"} h-4 w-4`} />
                  {!isCollapsed && "Calendario"}
                </Button>
              </Link>
            </nav>
          </div>
        </div>

        {/* Toggle collapse button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 -right-4 h-8 w-8 rounded-full bg-cyan-900/50 text-cyan-300 hover:bg-cyan-900/70"
          onClick={toggleCollapse}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </motion.div>
    </>
  )
}
