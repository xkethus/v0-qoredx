"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"

interface SimpleTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SimpleTextEditor({ value, onChange, placeholder, className }: SimpleTextEditorProps) {
  const [text, setText] = useState(value)

  // Sincronizar con el valor externo
  useEffect(() => {
    setText(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setText(newValue)
    onChange(newValue)
  }

  return (
    <Textarea
      value={text}
      onChange={handleChange}
      placeholder={placeholder}
      className={`min-h-[300px] border-purple-900/50 bg-black/50 focus-visible:ring-purple-500 ${className || ""}`}
    />
  )
}
