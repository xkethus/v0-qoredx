"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
  theme?: "spacepunk" | "default"
  placeholder?: string
  forceReinitialize?: boolean
}

export default function QuillEditor({
  value,
  onChange,
  theme = "default",
  placeholder = "Comienza a escribir tu contenido aquí...",
  forceReinitialize = false,
}: QuillEditorProps) {
  // Referencias y estados
  const editorRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<any>(null)
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isEditorReady, setIsEditorReady] = useState(false)
  const [editorId] = useState(`quill-editor-${Math.random().toString(36).substring(2, 9)}`)
  const [isVisible, setIsVisible] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const initializationAttemptsRef = useRef(0) // Use ref instead of state to avoid re-renders

  // Detectar cuando el script de Quill está cargado
  const handleScriptLoad = () => {
    console.log("Quill script loaded")
    setIsScriptLoaded(true)
  }

  // Detectar visibilidad del componente
  useEffect(() => {
    if (!editorRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    observer.observe(editorRef.current)

    return () => {
      if (editorRef.current) {
        observer.unobserve(editorRef.current)
      }
    }
  }, [])

  // Limpiar Quill al desmontar
  useEffect(() => {
    return () => {
      if (quillRef.current) {
        console.log("Cleaning up Quill instance")
        quillRef.current = null
        setIsInitialized(false)
        setIsEditorReady(false)
      }
    }
  }, [])

  // Forzar reinicialización cuando cambia forceReinitialize
  useEffect(() => {
    if (forceReinitialize && isInitialized) {
      console.log("Forcing reinitialization of Quill")
      if (quillRef.current) {
        quillRef.current = null
      }
      setIsInitialized(false)
      setIsEditorReady(false)
      initializationAttemptsRef.current = 0
    }
  }, [forceReinitialize, isInitialized])

  // Inicializar Quill cuando todo esté listo
  useEffect(() => {
    // Solo inicializar si el script está cargado, el componente es visible y no está ya inicializado
    if (!isScriptLoaded || !isVisible || isInitialized) return

    const initializeQuill = () => {
      try {
        // Verificar que Quill está disponible
        const Quill = (window as any).Quill
        if (!Quill) {
          console.error("Quill is not available")
          return false
        }

        // Verificar que el elemento del editor existe
        const editorElement = document.getElementById(editorId)
        if (!editorElement) {
          console.error("Editor element not found:", editorId)
          return false
        }

        // Verificar si ya existe una instancia de Quill en este elemento
        if (editorElement.querySelector(".ql-editor")) {
          console.log("Quill already initialized on this element, cleaning up")
          // Limpiar el contenido del elemento para evitar duplicados
          editorElement.innerHTML = ""
        }

        // Configuración completa para el editor
        const editorConfig = {
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ size: ["small", false, "large", "huge"] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              ["blockquote", "code-block"],
              ["link", "image", "video"],
              ["clean"],
            ],
          },
          placeholder,
          theme: "snow",
        }

        // Crear nueva instancia de Quill
        quillRef.current = new Quill(editorElement, editorConfig)

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
        if (theme === "spacepunk" && editorElement) {
          const editorContent = editorElement.querySelector(".ql-editor")
          if (editorContent) {
            editorContent.classList.add("spacepunk-editor")
          }
        }

        console.log("Quill initialized successfully")
        setIsInitialized(true)
        setIsEditorReady(true)
        return true
      } catch (error) {
        console.error("Error initializing Quill:", error)
        return false
      }
    }

    // Intentar inicializar con reintento
    const attemptInitialization = () => {
      // Limitar el número de intentos para evitar bucles infinitos
      if (initializationAttemptsRef.current > 10) {
        console.error("Failed to initialize Quill after multiple attempts")
        return
      }

      initializationAttemptsRef.current += 1
      const success = initializeQuill()

      if (!success && isVisible && isScriptLoaded && !isInitialized) {
        // Reintentar después de un breve retraso
        setTimeout(attemptInitialization, 200)
      }
    }

    // Comenzar el proceso de inicialización
    attemptInitialization()
  }, [isScriptLoaded, isVisible, value, onChange, placeholder, theme, editorId, isInitialized])

  // Actualizar el contenido cuando cambia el valor desde fuera
  useEffect(() => {
    if (quillRef.current && isEditorReady && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value
    }
  }, [value, isEditorReady])

  return (
    <div className="quill-container">
      {/* Cargar Quill desde CDN */}
      <Script src="https://cdn.quilljs.com/1.3.6/quill.min.js" onLoad={handleScriptLoad} strategy="afterInteractive" />
      <link rel="stylesheet" href="https://cdn.quilljs.com/1.3.6/quill.snow.css" />

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
        
        /* Estilos adicionales para mejorar la apariencia del editor */
        .quill-container .ql-snow .ql-tooltip {
          background-color: rgba(0, 0, 0, 0.8);
          border-color: rgba(139, 92, 246, 0.5);
          color: #e2e8f0;
        }
        
        .quill-container .ql-snow .ql-tooltip input[type=text] {
          background-color: rgba(0, 0, 0, 0.5);
          border-color: rgba(139, 92, 246, 0.5);
          color: #e2e8f0;
        }
        
        .quill-container .ql-snow .ql-tooltip a.ql-action,
        .quill-container .ql-snow .ql-tooltip a.ql-remove {
          color: #a78bfa;
        }
        
        .quill-container .ql-snow .ql-picker.ql-expanded .ql-picker-options {
          background-color: rgba(0, 0, 0, 0.9);
          border-color: rgba(139, 92, 246, 0.5);
        }
        
        .quill-container .ql-snow .ql-picker.ql-expanded .ql-picker-label {
          border-color: rgba(139, 92, 246, 0.5);
        }
      `}</style>

      {/* Contenedor del editor con ID único */}
      <div ref={editorRef} className="relative min-h-[300px]">
        {!isEditorReady && (
          <div className="absolute inset-0 border border-purple-900/50 bg-black/50 rounded-md p-4 flex items-center justify-center z-10">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent"></div>
          </div>
        )}
        <div id={editorId} className="min-h-[300px]"></div>
      </div>
    </div>
  )
}
