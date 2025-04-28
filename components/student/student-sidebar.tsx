"use client"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Rocket,
  Atom,
  Layers,
  Calendar,
  Award,
  Star,
  BookOpen,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { getStudentProgress } from "@/lib/mock-data"

export function StudentSidebar({ open, setOpen }) {
  const studentProgress = getStudentProgress()

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
        animate={{ x: open ? 0 : -300 }}
        transition={{ type: "spring", damping: 20 }}
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-black/80 backdrop-blur-md border-r border-cyan-900/30 pt-16 flex flex-col md:translate-x-0`}
      >
        <div className="px-4 py-4 border-b border-cyan-900/30">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-400">Progreso</h3>
            <Badge className="bg-cyan-900/30 text-cyan-300 border border-cyan-500/50">Nivel 3</Badge>
          </div>
          <Progress
            value={(studentProgress.completedQerniums / studentProgress.totalQerniums) * 100}
            className="h-2 bg-cyan-950/30"
            indicatorClassName="bg-gradient-to-r from-cyan-500 to-pink-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            {studentProgress.completedQerniums} de {studentProgress.totalQerniums} Qerniums completados
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-2">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Navegación</h3>
            <nav className="space-y-1">
              <Link href="/student/dashboard">
                <Button variant="ghost" className="w-full justify-start text-cyan-300 hover:bg-cyan-900/20">
                  <Rocket className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/student/qlusters">
                <Button variant="ghost" className="w-full justify-start text-cyan-300 hover:bg-cyan-900/20">
                  <Layers className="mr-2 h-4 w-4" />
                  Qlusters
                </Button>
              </Link>
              <Link href="/student/qerniums">
                <Button variant="ghost" className="w-full justify-start text-cyan-300 hover:bg-cyan-900/20">
                  <Atom className="mr-2 h-4 w-4" />
                  Qerniums
                </Button>
              </Link>
              <Link href="/student/calendar">
                <Button variant="ghost" className="w-full justify-start text-cyan-300 hover:bg-cyan-900/20">
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendario
                </Button>
              </Link>
            </nav>
          </div>

          <div className="px-3 py-2 mt-4">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Habilidades</h3>
            <div className="space-y-3">
              {studentProgress.skills.map((skill, index) => (
                <div key={index} className="px-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{skill.name}</span>
                    <span className="text-xs font-medium" style={{ color: skill.color }}>
                      Nivel {skill.level}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(skill.level / 5) * 100}%`,
                        backgroundColor: skill.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
              <Link href="/student/skills">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-400 hover:bg-gray-900/20 mt-2"
                >
                  <Sparkles className="mr-2 h-3 w-3" />
                  Ver todas las habilidades
                </Button>
              </Link>
            </div>
          </div>

          <div className="px-3 py-2 mt-4">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Logros</h3>
            <div className="space-y-2">
              {studentProgress.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-2 p-2 rounded-md bg-yellow-900/10 border border-yellow-900/30"
                >
                  <div className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center text-yellow-300">
                    {achievement.icon === "Star" ? (
                      <Star className="h-4 w-4" />
                    ) : achievement.icon === "Atom" ? (
                      <Atom className="h-4 w-4" />
                    ) : (
                      <Award className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-yellow-300">{achievement.title}</p>
                    <p className="text-[10px] text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              ))}
              <Link href="/student/achievements">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-400 hover:bg-gray-900/20 mt-2"
                >
                  <Award className="mr-2 h-3 w-3" />
                  Ver todos los logros
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-cyan-900/30">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg blur opacity-30"></div>
            <Button variant="outline" className="w-full relative border-cyan-900/50 text-cyan-300 hover:bg-cyan-900/20">
              <BookOpen className="mr-2 h-4 w-4" />
              Biblioteca de Recursos
            </Button>
          </div>
        </div>

        {/* Toggle button for mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 -right-4 h-8 w-8 rounded-full bg-cyan-900/50 text-cyan-300 hover:bg-cyan-900/70 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </motion.div>
    </>
  )
}
