"use client"

import type React from "react"

import Link from "next/link"
import { Rocket, BookOpen, FileText, Users, Settings, LogOut, Menu, X, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeProvider } from "@/components/theme-provider"
import { useState, useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-black text-white flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardNavbar />
          <main className="flex-1 p-6 bg-[radial-gradient(ellipse_at_top,rgba(120,41,170,0.1),transparent_50%)]">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true) // Inicialmente contraído
  const [isTextVisible, setIsTextVisible] = useState(false)

  // Efecto para manejar la visibilidad del texto con un pequeño retraso para el fade-in
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (!isCollapsed) {
      timeout = setTimeout(() => {
        setIsTextVisible(true)
      }, 50)
    } else {
      setIsTextVisible(false)
    }
    return () => clearTimeout(timeout)
  }, [isCollapsed])

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/80 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* Mobile sidebar toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 bottom-0 left-0 z-40 border-r border-purple-900/50 bg-black/90 backdrop-blur-sm transition-all duration-300 md:translate-x-0 md:static md:z-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "w-16" : "w-64"}
      `}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b border-purple-900/50 px-4 justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-purple-500" />
              {!isCollapsed && (
                <span
                  className={`text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400 transition-opacity duration-300 ${
                    isTextVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Q<span className="text-purple-300">oredx</span>
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex h-8 w-8 text-purple-300 hover:bg-purple-900/20"
            >
              {isCollapsed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              )}
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-purple-300 transition-all hover:text-purple-50 hover:bg-purple-900/20 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="9" />
                  <rect x="14" y="3" width="7" height="5" />
                  <rect x="14" y="12" width="7" height="9" />
                  <rect x="3" y="16" width="7" height="5" />
                </svg>
                {!isCollapsed && (
                  <span className={`transition-opacity duration-300 ${isTextVisible ? "opacity-100" : "opacity-0"}`}>
                    Dashboard
                  </span>
                )}
              </Link>
              <Link
                href="/dashboard/courses"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-purple-300 transition-all hover:text-purple-50 hover:bg-purple-900/20 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <Layers className="h-5 w-5" />
                {!isCollapsed && (
                  <span className={`transition-opacity duration-300 ${isTextVisible ? "opacity-100" : "opacity-0"}`}>
                    Cursos
                  </span>
                )}
              </Link>
              <Link
                href="/dashboard/add-content"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-purple-300 transition-all hover:text-purple-50 hover:bg-purple-900/20 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <BookOpen className="h-5 w-5" />
                {!isCollapsed && (
                  <span className={`transition-opacity duration-300 ${isTextVisible ? "opacity-100" : "opacity-0"}`}>
                    Contenido
                  </span>
                )}
              </Link>
              <Link
                href="/dashboard/skills"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-purple-300 transition-all hover:text-purple-50 hover:bg-purple-900/20 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="m12 14 4-4" />
                  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
                  <path d="M3 15a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4Z" />
                  <path d="M17 14v.01" />
                  <path d="M14 14v.01" />
                  <path d="M14 17v.01" />
                  <path d="M17 17v.01" />
                </svg>
                {!isCollapsed && (
                  <span className={`transition-opacity duration-300 ${isTextVisible ? "opacity-100" : "opacity-0"}`}>
                    Habilidades
                  </span>
                )}
              </Link>
              <Link
                href="/dashboard/review"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-purple-300 transition-all hover:text-purple-50 hover:bg-purple-900/20 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <FileText className="h-5 w-5" />
                {!isCollapsed && (
                  <span className={`transition-opacity duration-300 ${isTextVisible ? "opacity-100" : "opacity-0"}`}>
                    Tests & Review
                  </span>
                )}
              </Link>
              <Link
                href="/dashboard/classroom"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-purple-300 transition-all hover:text-purple-50 hover:bg-purple-900/20 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <Users className="h-5 w-5" />
                {!isCollapsed && (
                  <span className={`transition-opacity duration-300 ${isTextVisible ? "opacity-100" : "opacity-0"}`}>
                    Classroom
                  </span>
                )}
              </Link>
              <Link
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-purple-300 transition-all hover:text-purple-50 hover:bg-purple-900/20 ${
                  isCollapsed ? "justify-center" : ""
                }`}
              >
                <Settings className="h-5 w-5" />
                {!isCollapsed && (
                  <span className={`transition-opacity duration-300 ${isTextVisible ? "opacity-100" : "opacity-0"}`}>
                    Settings
                  </span>
                )}
              </Link>
            </nav>
          </div>
          <div className={`mt-auto p-4 border-t border-purple-900/50 ${isCollapsed ? "flex justify-center" : ""}`}>
            {!isCollapsed ? (
              <>
                <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                  <Avatar className="h-9 w-9 border border-purple-900/50">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                    <AvatarFallback className="bg-purple-950/50 text-purple-300">PF</AvatarFallback>
                  </Avatar>
                  <div
                    className={`flex flex-col transition-opacity duration-300 ${isTextVisible ? "opacity-100" : "opacity-0"}`}
                  >
                    <span className="text-sm font-medium">Professor Flux</span>
                    <span className="text-xs text-muted-foreground">professor@qoredx.com</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className={`w-full justify-start mt-2 text-purple-300 hover:text-purple-50 hover:bg-purple-900/20 transition-opacity duration-300 ${isTextVisible ? "opacity-100" : "opacity-0"}`}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </>
            ) : (
              <Avatar className="h-9 w-9 border border-purple-900/50">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                <AvatarFallback className="bg-purple-950/50 text-purple-300">PF</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

function DashboardNavbar() {
  return (
    <header className="h-14 border-b border-purple-900/50 bg-black/50 backdrop-blur-sm px-6 flex items-center md:pl-0">
      <div className="ml-auto flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
        >
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
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="sr-only">Notifications</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 border-purple-900/50 text-purple-300 hover:bg-purple-900/20"
        >
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
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </header>
  )
}
