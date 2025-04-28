"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Rocket, BookOpen, Users, LogOut, Menu, X, Layers, Atom, LayoutDashboard, Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

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
            <DashboardNav isCollapsed={isCollapsed} isTextVisible={isTextVisible} />
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

function DashboardNav({ isCollapsed, isTextVisible }: { isCollapsed: boolean; isTextVisible: boolean }) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
      variant: "default",
    },
    {
      title: "Estudiantes",
      href: "/dashboard/classroom",
      icon: <Users className="h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "Qlusters",
      href: "/dashboard/qlusters",
      icon: <Layers className="h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "Qerniums",
      href: "/dashboard/qerniums",
      icon: <Atom className="h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "Contenidos",
      href: "/dashboard/add-content",
      icon: <BookOpen className="h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "Habilidades",
      href: "/dashboard/skills",
      icon: <Sparkles className="h-4 w-4 text-yellow-400" />,
      variant: "ghost",
      highlight: true, // Mantener el resaltado para que sea visible
    },
    {
      title: "Admin",
      href: "/admin/landing-editor",
      icon: (
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
          className="h-4 w-4"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      variant: "ghost",
    },
  ]

  return (
    <nav className="grid items-start gap-2 px-2">
      {navItems.map((item, index) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              buttonVariants({
                variant: isActive ? "default" : "ghost",
                size: "sm",
              }),
              isActive
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
                : item.highlight
                  ? "border border-yellow-500/50 text-yellow-400 hover:bg-yellow-900/20"
                  : "hover:bg-purple-900/20 hover:text-purple-300",
              isCollapsed ? "justify-center" : "justify-start",
              "h-9",
            )}
          >
            {item.icon}
            {!isCollapsed && (
              <span className={`ml-2 transition-opacity duration-300 ${isTextVisible ? "opacity-100" : "opacity-0"}`}>
                {item.title}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
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
