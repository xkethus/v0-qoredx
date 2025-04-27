"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  LinkIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SimpleRichEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  theme?: "spacepunk" | "default"
}

export default function SimpleRichEditor({
  value,
  onChange,
  placeholder = "Comienza a escribir tu contenido aquí...",
  theme = "default",
}: SimpleRichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  // Asegurarse de que el componente solo se inicialice en el cliente
  useEffect(() => {
    setIsReady(true)

    // Inicializar el contenido si existe
    if (editorRef.current && value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  // Función para ejecutar comandos de formato
  const execCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  // Función para insertar un enlace
  const insertLink = () => {
    const url = prompt("Ingresa la URL del enlace:", "https://")
    if (url) {
      execCommand("createLink", url)
    }
  }

  // Función para manejar cambios en el editor
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  // Función para manejar pegado de texto plano
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    document.execCommand("insertText", false, text)
  }

  return (
    <div
      className={cn(
        "simple-rich-editor border rounded-md overflow-hidden",
        theme === "spacepunk" ? "border-purple-900/50 bg-black/30" : "border-gray-300",
      )}
    >
      <div
        className={cn(
          "toolbar flex flex-wrap gap-1 p-2 border-b",
          theme === "spacepunk" ? "border-purple-900/50 bg-black/50" : "border-gray-200 bg-gray-50",
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={theme === "spacepunk" ? "text-purple-300 hover:bg-purple-900/20 hover:text-purple-200" : ""}
          onClick={() => execCommand("bold")}
        >
          <Bold className="h-4 w-4" />
          <span className="sr-only">Negrita</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={theme === "spacepunk" ? "text-purple-300 hover:bg-purple-900/20 hover:text-purple-200" : ""}
          onClick={() => execCommand("italic")}
        >
          <Italic className="h-4 w-4" />
          <span className="sr-only">Cursiva</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={theme === "spacepunk" ? "text-purple-300 hover:bg-purple-900/20 hover:text-purple-200" : ""}
          onClick={() => execCommand("underline")}
        >
          <Underline className="h-4 w-4" />
          <span className="sr-only">Subrayado</span>
        </Button>
        <div className={cn("h-6 w-px mx-1", theme === "spacepunk" ? "bg-purple-900/50" : "bg-gray-300")} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={theme === "spacepunk" ? "text-purple-300 hover:bg-purple-900/20 hover:text-purple-200" : ""}
          onClick={() => execCommand("formatBlock", "<h1>")}
        >
          <Heading1 className="h-4 w-4" />
          <span className="sr-only">Título 1</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={theme === "spacepunk" ? "text-purple-300 hover:bg-purple-900/20 hover:text-purple-200" : ""}
          onClick={() => execCommand("formatBlock", "<h2>")}
        >
          <Heading2 className="h-4 w-4" />
          <span className="sr-only">Título 2</span>
        </Button>
        <div className={cn("h-6 w-px mx-1", theme === "spacepunk" ? "bg-purple-900/50" : "bg-gray-300")} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={theme === "spacepunk" ? "text-purple-300 hover:bg-purple-900/20 hover:text-purple-200" : ""}
          onClick={() => execCommand("insertUnorderedList")}
        >
          <List className="h-4 w-4" />
          <span className="sr-only">Lista con viñetas</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={theme === "spacepunk" ? "text-purple-300 hover:bg-purple-900/20 hover:text-purple-200" : ""}
          onClick={() => execCommand("insertOrderedList")}
        >
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Lista numerada</span>
        </Button>
        <div className={cn("h-6 w-px mx-1", theme === "spacepunk" ? "bg-purple-900/50" : "bg-gray-300")} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={theme === "spacepunk" ? "text-purple-300 hover:bg-purple-900/20 hover:text-purple-200" : ""}
          onClick={() => execCommand("justifyLeft")}
        >
          <AlignLeft className="h-4 w-4" />
          <span className="sr-only">Alinear a la izquierda</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={theme === "spacepunk" ? "text-purple-300 hover:bg-purple-900/20 hover:text-purple-200" : ""}
          onClick={() => execCommand("justifyCenter")}
        >
          <AlignCenter className="h-4 w-4" />
          <span className="sr-only">Centrar</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={theme === "spacepunk" ? "text-purple-300 hover:bg-purple-900/20 hover:text-purple-200" : ""}
          onClick={() => execCommand("justifyRight")}
        >
          <AlignRight className="h-4 w-4" />
          <span className="sr-only">Alinear a la derecha</span>
        </Button>
        <div className={cn("h-6 w-px mx-1", theme === "spacepunk" ? "bg-purple-900/50" : "bg-gray-300")} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={theme === "spacepunk" ? "text-purple-300 hover:bg-purple-900/20 hover:text-purple-200" : ""}
          onClick={insertLink}
        >
          <LinkIcon className="h-4 w-4" />
          <span className="sr-only">Insertar enlace</span>
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable={isReady}
        onInput={handleInput}
        onPaste={handlePaste}
        className={cn(
          "content min-h-[300px] p-4 focus:outline-none",
          theme === "spacepunk" ? "text-purple-100 font-['Space_Mono',monospace]" : "",
          !value && "before:content-[attr(data-placeholder)] before:text-gray-400 before:pointer-events-none",
        )}
        data-placeholder={placeholder}
      />
      <style jsx global>{`
        .simple-rich-editor .content {
          overflow-y: auto;
          word-break: break-word;
        }
        
        .simple-rich-editor .content:focus {
          outline: none;
        }
        
        .simple-rich-editor .content a {
          color: ${theme === "spacepunk" ? "#a78bfa" : "#2563eb"};
          text-decoration: underline;
        }
        
        .simple-rich-editor .content h1 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .simple-rich-editor .content h2 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .simple-rich-editor .content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        
        .simple-rich-editor .content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
      `}</style>
    </div>
  )
}
