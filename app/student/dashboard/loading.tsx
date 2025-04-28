import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full blur opacity-75 animate-pulse"></div>
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
      <p className="mt-4 text-cyan-400 animate-pulse">Cargando cosmos educativo...</p>
    </div>
  )
}
