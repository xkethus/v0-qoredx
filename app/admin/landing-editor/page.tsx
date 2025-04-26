"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { landingContent } from "@/lib/landing-content"
import { Rocket, Save, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LandingEditor() {
  const [content, setContent] = useState(landingContent)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // En una implementación real, esto guardaría los cambios en la base de datos
    // Por ahora, solo mostramos un mensaje de éxito
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)

    // Aquí se podría implementar la lógica para guardar en la base de datos
    console.log("Contenido guardado:", content)
  }

  const updateHero = (field: string, value: string) => {
    setContent({
      ...content,
      hero: {
        ...content.hero,
        [field]: value,
      },
    })
  }

  const updateFeatures = (field: string, value: string) => {
    setContent({
      ...content,
      features: {
        ...content.features,
        [field]: value,
      },
    })
  }

  const updateFeatureItem = (index: number, field: string, value: string) => {
    const newFeatures = [...content.features.items]
    newFeatures[index] = {
      ...newFeatures[index],
      [field]: value,
    }

    setContent({
      ...content,
      features: {
        ...content.features,
        items: newFeatures,
      },
    })
  }

  const updateCta = (field: string, value: string) => {
    setContent({
      ...content,
      cta: {
        ...content.cta,
        [field]: value,
      },
    })
  }

  const updateFooter = (field: string, value: string) => {
    setContent({
      ...content,
      footer: {
        ...content.footer,
        [field]: value,
      },
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-purple-900/50 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
              <span className="text-purple-300">Qoredx</span> Admin
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
            Editor de Contenido del Landing
          </h1>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
          >
            <Save className="mr-2 h-4 w-4" /> Guardar Cambios
          </Button>
        </div>

        {saved && (
          <Alert className="mb-6 border-green-500 bg-green-950/50">
            <AlertCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-500">Cambios guardados</AlertTitle>
            <AlertDescription className="text-green-400">Los cambios han sido guardados exitosamente.</AlertDescription>
          </Alert>
        )}

        <div className="space-y-8">
          <Tabs defaultValue="hero">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="features">Características</TabsTrigger>
              <TabsTrigger value="cta">CTA</TabsTrigger>
              <TabsTrigger value="footer">Footer</TabsTrigger>
            </TabsList>

            <TabsContent value="hero">
              <Card className="border border-purple-900/50 bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Sección Hero</CardTitle>
                  <CardDescription className="text-gray-400">
                    Edita el contenido principal de la página de inicio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm">Tagline</label>
                    <Input
                      value={content.hero.tagline}
                      onChange={(e) => updateHero("tagline", e.target.value)}
                      className="bg-black/50 border-purple-900/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Título</label>
                    <Input
                      value={content.hero.title}
                      onChange={(e) => updateHero("title", e.target.value)}
                      className="bg-black/50 border-purple-900/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Descripción</label>
                    <Textarea
                      value={content.hero.description}
                      onChange={(e) => updateHero("description", e.target.value)}
                      className="bg-black/50 border-purple-900/50"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features">
              <Card className="border border-purple-900/50 bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Sección de Características</CardTitle>
                  <CardDescription className="text-gray-400">
                    Edita las características destacadas de tu plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm">Título</label>
                    <Input
                      value={content.features.title}
                      onChange={(e) => updateFeatures("title", e.target.value)}
                      className="bg-black/50 border-purple-900/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Subtítulo</label>
                    <Input
                      value={content.features.subtitle}
                      onChange={(e) => updateFeatures("subtitle", e.target.value)}
                      className="bg-black/50 border-purple-900/50"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Características</h3>

                    {content.features.items.map((item, index) => (
                      <div key={index} className="p-4 border border-purple-900/50 rounded-md space-y-3">
                        <div className="space-y-2">
                          <label className="text-sm">Título de la característica {index + 1}</label>
                          <Input
                            value={item.title}
                            onChange={(e) => updateFeatureItem(index, "title", e.target.value)}
                            className="bg-black/50 border-purple-900/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm">Descripción</label>
                          <Textarea
                            value={item.description}
                            onChange={(e) => updateFeatureItem(index, "description", e.target.value)}
                            className="bg-black/50 border-purple-900/50"
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cta">
              <Card className="border border-purple-900/50 bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Sección CTA</CardTitle>
                  <CardDescription className="text-gray-400">Edita la sección de llamada a la acción</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm">Título</label>
                    <Input
                      value={content.cta.title}
                      onChange={(e) => updateCta("title", e.target.value)}
                      className="bg-black/50 border-purple-900/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Descripción</label>
                    <Textarea
                      value={content.cta.description}
                      onChange={(e) => updateCta("description", e.target.value)}
                      className="bg-black/50 border-purple-900/50"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="footer">
              <Card className="border border-purple-900/50 bg-black/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Sección Footer</CardTitle>
                  <CardDescription className="text-gray-400">Edita el contenido del pie de página</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm">Descripción</label>
                    <Textarea
                      value={content.footer.description}
                      onChange={(e) => updateFooter("description", e.target.value)}
                      className="bg-black/50 border-purple-900/50"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
