"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, Settings, User, LogOut } from "lucide-react"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-b border-purple-900/50 bg-black/50 backdrop-blur-sm">
      <div>
        <h1 className="text-xl font-bold text-purple-300">{heading}</h1>
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="w-full bg-black/20 border-purple-900/50 pl-8 focus:border-purple-500"
          />
        </div>
        <Button variant="outline" size="icon" className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button variant="outline" size="icon" className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8 border border-purple-900/50">
                <AvatarImage src="/mystical-forest-spirit.png" alt="@user" />
                <AvatarFallback className="bg-purple-900/30 text-purple-300">QM</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-black/90 border border-purple-900/50 text-white"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">QoreMaster</p>
                <p className="text-xs leading-none text-muted-foreground">qoremaster@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-purple-900/30" />
            <DropdownMenuItem className="text-purple-300 focus:bg-purple-900/30 focus:text-purple-200 cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-purple-300 focus:bg-purple-900/30 focus:text-purple-200 cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-purple-900/30" />
            <Link href="/">
              <DropdownMenuItem className="text-red-300 focus:bg-red-900/30 focus:text-red-200 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
    </div>
  )
}
