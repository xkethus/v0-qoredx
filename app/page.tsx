import Link from "next/link"
import { Rocket, Info, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header - Simplified with just icons */}
      <header className="absolute top-0 right-0 p-6 z-10">
        <nav className="flex items-center space-x-6">
          <Link href="/info" className="text-gray-500 hover:text-purple-400 transition-colors" aria-label="Información">
            <Info className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-gray-500 hover:text-purple-400 transition-colors" aria-label="Contacto">
            <Mail className="h-5 w-5" />
          </Link>
        </nav>
      </header>

      {/* Main Content - Centered and Minimalist */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Centered Logo */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
            Qoredx
          </h1>
        </div>

        {/* Login/Register Card with Animated Border */}
        <div className="w-full max-w-md relative">
          {/* Animated border glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg blur opacity-75 animate-pulse"></div>

          <Tabs defaultValue="login" className="w-full relative">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/70 border border-purple-900/50">
              <TabsTrigger value="login" className="data-[state=active]:bg-purple-900/30">
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-purple-900/30">
                Registrarse
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="border border-purple-900/50 bg-black/70 backdrop-blur-sm relative z-10">
                <CardHeader>
                  <CardTitle className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                    Iniciar Sesión
                  </CardTitle>
                  <CardDescription className="text-gray-500 text-center">Ingresa tus credenciales</CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm text-gray-400">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="nombre@ejemplo.com"
                          className="bg-black/50 border-purple-900/50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="password" className="text-sm text-gray-400">
                            Contraseña
                          </label>
                          <Link href="#" className="text-xs text-gray-500 hover:text-purple-400">
                            ¿Olvidaste?
                          </Link>
                        </div>
                        <Input id="password" type="password" className="bg-black/50 border-purple-900/50" />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-4">
                  <div className="w-full flex justify-center gap-3">
                    <Link href="/dashboard">
                      <Button
                        size="sm"
                        className="px-4 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 shadow-md shadow-purple-700/30"
                      >
                        QoreMaster
                      </Button>
                    </Link>
                    <Link href="/student/dashboard">
                      <Button
                        size="sm"
                        className="px-4 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 shadow-md shadow-cyan-700/30"
                      >
                        QoreXplorer
                      </Button>
                    </Link>
                  </div>
                  <div className="text-xs text-gray-500">Selecciona tu rol para iniciar sesión</div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card className="border border-purple-900/50 bg-black/70 backdrop-blur-sm relative z-10">
                <CardHeader>
                  <CardTitle className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                    Crear Cuenta
                  </CardTitle>
                  <CardDescription className="text-gray-500 text-center">Regístrate para comenzar</CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm text-gray-400">
                          Nombre
                        </label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Tu nombre"
                          className="bg-black/50 border-purple-900/50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="email-register" className="text-sm text-gray-400">
                          Email
                        </label>
                        <Input
                          id="email-register"
                          type="email"
                          placeholder="nombre@ejemplo.com"
                          className="bg-black/50 border-purple-900/50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label htmlFor="password-register" className="text-sm text-gray-400">
                          Contraseña
                        </label>
                        <Input id="password-register" type="password" className="bg-black/50 border-purple-900/50" />
                      </div>

                      {/* Tipo de usuario */}
                      <div className="grid gap-2">
                        <label className="text-sm text-gray-400">Tipo de Usuario</label>
                        <RadioGroup defaultValue="qorexplorer" className="grid grid-cols-1 gap-2">
                          <div className="flex items-center space-x-2 rounded-md border border-purple-900/30 bg-black/30 p-2">
                            <RadioGroupItem value="qorexplorer" id="qorexplorer" className="text-purple-500" />
                            <Label htmlFor="qorexplorer" className="text-sm cursor-pointer flex-1">
                              Qorexplorer <span className="text-xs text-gray-500">(Alumno)</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border border-purple-900/30 bg-black/30 p-2">
                            <RadioGroupItem value="qoremaster" id="qoremaster" className="text-cyan-500" />
                            <Label htmlFor="qoremaster" className="text-sm cursor-pointer flex-1">
                              QoreMaster <span className="text-xs text-gray-500">(Maestro)</span>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 rounded-md border border-purple-900/30 bg-black/30 p-2">
                            <RadioGroupItem value="qorescout" id="qorescout" className="text-pink-500" />
                            <Label htmlFor="qorescout" className="text-sm cursor-pointer flex-1">
                              QoreScout <span className="text-xs text-gray-500">(Coordinador)</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Código de acceso */}
                      <div className="grid gap-2">
                        <label htmlFor="access-code" className="text-sm text-gray-400">
                          Código de Acceso
                        </label>
                        <Input
                          id="access-code"
                          type="text"
                          placeholder="0000"
                          className="bg-black/50 border-purple-900/50"
                        />
                        <p className="text-xs text-gray-500 mt-1">Solicita tu código a un administrador</p>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link href="/dashboard">
                    <Button
                      size="icon"
                      className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 shadow-lg shadow-purple-700/30"
                    >
                      <Rocket className="h-6 w-6" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer - Minimalist */}
      <footer className="py-4">
        <div className="container mx-auto px-4 text-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} Qoredx</p>
        </div>
      </footer>
    </div>
  )
}
