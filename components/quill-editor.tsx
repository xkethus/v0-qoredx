"use client"

import { useEffect, useRef, useState } from "react"
import "quill/dist/quill.snow.css"

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
  theme?: "spacepunk" | "default"
}

export default function QuillEditor({ value, onChange, theme = "default" }: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<any>(null)
  const [isReady, setIsReady] = useState(false)
  const [isQuillLoaded, setIsQuillLoaded] = useState(false)

  // Asegurarse de que el componente solo se inicialice en el cliente
  useEffect(() => {
    setIsReady(true)
  }, [])

  // Inicializar Quill cuando el componente esté listo
  useEffect(() => {
    if (!isReady || !editorRef.current || quillRef.current) return

    // Importar Quill dinámicamente
    const initQuill = async () => {
      try {
        // Importar Quill con un pequeño retraso para asegurar que el DOM esté listo
        setTimeout(async () => {
          try {
            const QuillModule = await import("quill")
            const Quill = QuillModule.default

            // Verificar que el contenedor sigue existiendo
            if (!editorRef.current) {
              console.warn("Quill container no longer exists")
              return
            }

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

            const defaultTheme = {
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
            }

            // Crear nueva instancia de Quill
            quillRef.current = new Quill(editorRef.current, theme === "spacepunk" ? spacepunkTheme : defaultTheme)

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
            if (theme === "spacepunk" && editorRef.current) {
              const editorElement = editorRef.current.querySelector(".ql-editor")
              if (editorElement) {
                editorElement.classList.add("spacepunk-editor")
              }
            }

            setIsQuillLoaded(true)
            console.log("Quill initialized successfully")
          } catch (error) {
            console.error("Error during Quill initialization:", error)
          }
        }, 100)
      } catch (error) {
        console.error("Error importing Quill:", error)
      }
    }

    initQuill()

    // Cleanup function
    return () => {
      if (quillRef.current) {
        // Intentar limpiar correctamente
        try {
          // No llamamos a destroy explícitamente para evitar errores
          quillRef.current = null
        } catch (e) {
          console.error("Error cleaning up Quill:", e)
        }
      }
    }
  }, [isReady, theme, onChange])

  // Actualizar el contenido cuando cambia el valor desde fuera
  useEffect(() => {
    if (quillRef.current && isQuillLoaded && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value
    }
  }, [value, isQuillLoaded])

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
      {/* Añadir un div con altura y borde antes de que Quill se inicialice */}
      <div
        ref={editorRef}
        className={!isQuillLoaded ? "min-h-[300px] border border-purple-900/50 bg-black/50 rounded-md p-4" : ""}
      />
    </div>
  )
}
