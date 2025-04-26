"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Atom,
  BookOpen,
  Calendar,
  CuboidIcon as Cube,
  LayoutDashboard,
  Library,
  LineChart,
  Microscope,
  Network,
  Settings,
  Users,
} from "lucide-react"

interface DashboardNavProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
}

export function DashboardNav({ className, isCollapsed, ...props }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
      variant: "default",
    },
    {
      title: "Calendario",
      href: "/dashboard/calendar",
      icon: <Calendar className="h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "Estudiantes",
      href: "/dashboard/classroom",
      icon: <Users className="h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "Clases",
      href: "/dashboard/classes",
      icon: <Library className="h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "QorePlex",
      href: "/dashboard/qoreplex",
      icon: <Network className="h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "Qernex",
      href: "/dashboard/qernex",
      icon: <Microscope className="h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "Qlusters",
      href: "/dashboard/qlusters",
      icon: <Cube className="h-4 w-4" />,
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
      title: "Analíticas",
      href: "/dashboard/analytics",
      icon: <LineChart className="h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "Configuración",
      href: "/dashboard/settings",
      icon: <Settings className="h-4 w-4" />,
      variant: "ghost",
    },
    {
      title: "Admin",
      href: "/admin/landing-editor",
      icon: <Settings className="h-4 w-4" />,
      variant: "ghost",
    },
  ]

  return (
    <nav className={cn("grid items-start gap-2", className)} {...props}>
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
                : "hover:bg-purple-900/20 hover:text-purple-300",
              isCollapsed ? "justify-center" : "justify-start",
              "h-9",
            )}
          >
            {item.icon}
            {!isCollapsed && <span className="ml-2">{item.title}</span>}
          </Link>
        )
      })}
    </nav>
  )
}
