"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Award, Clock, ArrowRight, Layers } from "lucide-react"
import { getQerniumsByQluster } from "@/lib/mock-data"

export function QlusterInfoModal({ isOpen, onClose, qluster }) {
  const [activeTab, setActiveTab] = useState("info")

  if (!qluster) return null

  const qerniums = getQerniumsByQluster(qluster.id)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-black/90 border border-purple-900/50 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${qluster.color}20`, color: qluster.color }}
            >
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl">{qluster.title}</DialogTitle>
              <DialogDescription className="text-gray-400">{qluster.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex border-b border-purple-900/30 mb-4">
          <button
            className={`px-4 py-2 ${activeTab === "info" ? "border-b-2 border-purple-500 text-purple-400" : "text-gray-500"}`}
            onClick={() => setActiveTab("info")}
          >
            Información
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "qerniums" ? "border-b-2 border-purple-500 text-purple-400" : "text-gray-500"}`}
            onClick={() => setActiveTab("qerniums")}
          >
            Qerniums
          </button>
        </div>

        {activeTab === "info" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-purple-400" />
                <span className="text-gray-400">Inicio:</span>
                <span>{new Date(qluster.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-purple-400" />
                <span className="text-gray-400">Fin:</span>
                <span>{new Date(qluster.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-purple-400" />
                <span className="text-gray-400">Inscripción:</span>
                <span>{qluster.autoEnroll ? "Automática" : "Manual"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-purple-400" />
                <span className="text-gray-400">Certificado:</span>
                <span>{qluster.certificate ? "Disponible" : "No disponible"}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Progreso</span>
                <span className="text-sm font-medium">{qluster.progress}%</span>
              </div>
              <Progress
                value={qluster.progress}
                className="h-2 bg-purple-950/30"
                indicatorClassName="bg-gradient-to-r from-purple-600 to-cyan-500"
              />
            </div>

            <div className="flex justify-between items-center mt-6">
              <div>
                <Badge className="bg-purple-900/30 text-purple-300 border border-purple-500/50">
                  {qluster.status ? qluster.status.charAt(0).toUpperCase() + qluster.status.slice(1) : "Desconocido"}
                </Badge>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
                Continuar <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {activeTab === "qerniums" && (
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {qerniums.map((qernium) => (
              <Card
                key={qernium.id}
                className="bg-black/50 border border-purple-900/30 hover:border-purple-500/50 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center mt-1"
                      style={{
                        backgroundColor: `${qernium.color || qluster.color}20`,
                        color: qernium.color || qluster.color,
                      }}
                    >
                      <span className="text-xs font-bold">
                        {qernium.bloomLevel ? qernium.bloomLevel.charAt(0).toUpperCase() : "N"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{qernium.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{qernium.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          className={`text-xs ${
                            !qernium.bloomLevel
                              ? "bg-purple-900/30 text-purple-300"
                              : qernium.bloomLevel === "remember"
                                ? "bg-blue-900/30 text-blue-300"
                                : qernium.bloomLevel === "understand"
                                  ? "bg-green-900/30 text-green-300"
                                  : qernium.bloomLevel === "apply"
                                    ? "bg-yellow-900/30 text-yellow-300"
                                    : qernium.bloomLevel === "analyze"
                                      ? "bg-orange-900/30 text-orange-300"
                                      : qernium.bloomLevel === "evaluate"
                                        ? "bg-red-900/30 text-red-300"
                                        : "bg-purple-900/30 text-purple-300"
                          }`}
                        >
                          {qernium.bloomLevel
                            ? qernium.bloomLevel.charAt(0).toUpperCase() + qernium.bloomLevel.slice(1)
                            : "No definido"}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {qernium.estimatedTime} min
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
