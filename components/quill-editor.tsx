"use client"

import { useEffect, useRef } from "react"
import "quill/dist/quill.snow.css"

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
  theme?: "spacepunk" | "default"
}

export default function QuillEditor({ value, onChange, theme = "default" }: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<any>(null)
  const isInitializedRef = useRef(false)

  useEffect(() => {
    if (!editorRef.current || isInitializedRef.current) return

    // Importar Quill dinámicamente
    const initQuill = async () => {
      try {
        const Quill = (await import("quill")).default

        // Configurar los temas personalizados
        const spacepunkTheme = {
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image", "code-block"],
              ["clean"],
            ],
          },
          placeholder: "Comienza a escribir tu contenido aquí...",
          theme: "snow",
        }

        // Crear nueva instancia de Quill
        quillRef.current = new Quill(
          editorRef.current,
          theme === "spacepunk"
            ? spacepunkTheme
            : {
                modules: {
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline"],
                    ["link", "image"],
                    ["clean"],
                  ],
                },
                placeholder: "Comienza a escribir tu contenido aquí...",
                theme: "snow",
              },
        )

        // Establecer el contenido inicial
        if (value) {
          quillRef.current.root.innerHTML = value
        }

        // Manejar cambios
        quillRef.current.on("text-change", () => {
          const html = quillRef.current.root.innerHTML
          onChange(html)
        })

        // Personalizar los estilos para el tema spacepunk
        if (theme === "spacepunk") {
          const editorElement = editorRef.current.querySelector(".ql-editor")
          if (editorElement) {
            editorElement.classList.add("spacepunk-editor")
          }
        }

        isInitializedRef.current = true
      } catch (error) {
        console.error("Error initializing Quill:", error)
      }
    }

    initQuill()

    // Cleanup function
    return () => {
      // No llamamos a destroy aquí, solo limpiamos la referencia
      quillRef.current = null
      isInitializedRef.current = false
    }
  }, [theme])

  // Actualizar el contenido cuando cambia el valor desde fuera
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value
    }
  }, [value])

  return (
    <div className="quill-container">
      <style jsx global>{`
        .quill-container .ql-toolbar {
          background-color: rgba(0, 0, 0, 0.5);
          border-color: rgba(139, 92, 246, 0.5);
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
        }
        
        .quill-container .ql-container {
          border-color: rgba(139, 92, 246, 0.5);
          background-color: rgba(0, 0, 0, 0.3);
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          min-height: 300px;
        }
        
        .quill-container .ql-editor {
          min-height: 300px;
          color: #e2e8f0;
        }
        
        .quill-container .spacepunk-editor {
          font-family: 'Space Mono', monospace;
          color: #d8b4fe;
        }
        
        .quill-container .ql-snow .ql-stroke {
          stroke: #a78bfa;
        }
        
        .quill-container .ql-snow .ql-fill {
          fill: #a78bfa;
        }
        
        .quill-container .ql-snow .ql-picker {
          color: #a78bfa;
        }
        
        .quill-container .ql-snow .ql-picker-options {
          background-color: rgba(0, 0, 0, 0.9);
          border-color: rgba(139, 92, 246, 0.5);
        }
      `}</style>
      <div ref={editorRef} />
    </div>
  )
}
