"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function SupabaseSetupGuide() {
  const [activeTab, setActiveTab] = useState("mock")

  return (
    <Card className="border-amber-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(251,191,36,0.1)]">
      <CardHeader>
        <CardTitle className="text-xl text-amber-300">Configuración de Supabase</CardTitle>
        <CardDescription>Configura Supabase para habilitar todas las funcionalidades de la aplicación</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 bg-blue-900/20 border-blue-900/50">
          <AlertCircle className="h-4 w-4 text-blue-300" />
          <AlertTitle className="text-blue-300">Información</AlertTitle>
          <AlertDescription>
            Actualmente estás usando una implementación simulada de Supabase. Para habilitar todas las funcionalidades,
            configura Supabase siguiendo las instrucciones a continuación.
          </AlertDescription>
        </Alert>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-black/20 border border-amber-900/50">
            <TabsTrigger
              value="mock"
              className="data-[state=active]:bg-amber-900/20 data-[state=active]:text-amber-300"
            >
              Modo Simulado
            </TabsTrigger>
            <TabsTrigger
              value="setup"
              className="data-[state=active]:bg-amber-900/20 data-[state=active]:text-amber-300"
            >
              Configuración Real
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mock" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-amber-300">Modo Simulado</h3>
              <p className="text-sm text-muted-foreground">
                Actualmente estás usando una implementación simulada de Supabase que funciona completamente en memoria.
                Esto es útil para desarrollo y pruebas, pero tiene las siguientes limitaciones:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Los datos no persisten entre recargas de página</li>
                <li>Funcionalidad limitada para operaciones complejas</li>
                <li>No hay autenticación real</li>
                <li>No hay almacenamiento de archivos</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="setup" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-amber-300">Configuración de Supabase</h3>
              <p className="text-sm text-muted-foreground">
                Sigue estos pasos para configurar Supabase y habilitar todas las funcionalidades:
              </p>

              <div className="space-y-4 mt-4">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-900/20 rounded-full p-1 mt-0.5">
                    <span className="text-amber-300 text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-amber-300">Crear una cuenta en Supabase</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Visita{" "}
                      <Link
                        href="https://supabase.com"
                        target="_blank"
                        className="text-amber-300 hover:underline inline-flex items-center"
                      >
                        supabase.com <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>{" "}
                      y crea una cuenta gratuita.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-amber-900/20 rounded-full p-1 mt-0.5">
                    <span className="text-amber-300 text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-amber-300">Crear un nuevo proyecto</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Crea un nuevo proyecto en Supabase y anota la URL y las claves de API.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-amber-900/20 rounded-full p-1 mt-0.5">
                    <span className="text-amber-300 text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-amber-300">Configurar variables de entorno</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Añade las siguientes variables de entorno a tu proyecto:
                    </p>
                    <div className="mt-2 p-3 bg-black/30 rounded-md font-mono text-xs">
                      <div className="text-green-300">NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co</div>
                      <div className="text-green-300">NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon</div>
                      <div className="text-green-300">SUPABASE_SERVICE_ROLE_KEY=tu-clave-service-role</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-amber-900/20 rounded-full p-1 mt-0.5">
                    <span className="text-amber-300 text-xs font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-amber-300">Ejecutar script de inicialización</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ejecuta el script de inicialización para crear las tablas necesarias:
                    </p>
                    <div className="mt-2 p-3 bg-black/30 rounded-md font-mono text-xs">
                      <div className="text-blue-300">npm run setup-supabase</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="border-amber-900/50 bg-black/50 hover:bg-amber-900/20">
          <Link href="https://supabase.com/docs" target="_blank" className="flex items-center">
            Documentación <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </Button>
        <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
          <Link href="/admin/setup" className="flex items-center">
            Ir a Configuración <CheckCircle2 className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
