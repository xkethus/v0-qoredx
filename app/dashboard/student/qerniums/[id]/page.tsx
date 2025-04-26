"use client"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import QerniumViewer from "@/components/qernium-viewer"
import { useToast } from "@/components/ui/use-toast"

export default function StudentQerniumPage() {
  const params = useParams()
  const router = useRouter()
  const qerniumId = params.id as string
  const { toast } = useToast()

  // Mock data para el Qernium
  const qernium = {
    id: qerniumId,
    title: "Identificar principios de la mecánica cuántica",
    description: "Reconocer y enumerar los principios fundamentales que rigen la mecánica cuántica.",
    bloomLevel: "remember",
    actionVerb: "Identificar",
    estimatedTime: 30,
    content: {
      type: "quiz" as const,
      title: "Quiz: Principios de la Mecánica Cuántica",
      description: "Evalúa tu conocimiento sobre los principios fundamentales de la mecánica cuántica.",
      questions: [
        {
          id: "q1",
          question: "¿Cuál es el principio de incertidumbre de Heisenberg?",
          type: "single" as const,
          options: [
            {
              id: "q1-opt1",
              text: "No es posible conocer simultáneamente y con precisión arbitraria la posición y el momento de una partícula.",
              isCorrect: true,
            },
            {
              id: "q1-opt2",
              text: "La energía total de un sistema aislado se conserva.",
              isCorrect: false,
            },
            {
              id: "q1-opt3",
              text: "La materia puede comportarse como onda y como partícula.",
              isCorrect: false,
            },
            {
              id: "q1-opt4",
              text: "La energía está cuantizada en niveles discretos.",
              isCorrect: false,
            },
          ],
          points: 2,
        },
        {
          id: "q2",
          question: "¿Qué establece la ecuación de Schrödinger?",
          type: "single" as const,
          options: [
            {
              id: "q2-opt1",
              text: "La conservación de la energía en sistemas cuánticos.",
              isCorrect: false,
            },
            {
              id: "q2-opt2",
              text: "La evolución temporal de la función de onda de un sistema cuántico.",
              isCorrect: true,
            },
            {
              id: "q2-opt3",
              text: "La relación entre masa y energía.",
              isCorrect: false,
            },
            {
              id: "q2-opt4",
              text: "La cuantización de la carga eléctrica.",
              isCorrect: false,
            },
          ],
          points: 2,
        },
        {
          id: "q3",
          question: "Selecciona todos los principios que son fundamentales en la mecánica cuántica:",
          type: "multiple" as const,
          options: [
            {
              id: "q3-opt1",
              text: "Principio de superposición",
              isCorrect: true,
            },
            {
              id: "q3-opt2",
              text: "Principio de exclusión de Pauli",
              isCorrect: true,
            },
            {
              id: "q3-opt3",
              text: "Principio de relatividad",
              isCorrect: false,
            },
            {
              id: "q3-opt4",
              text: "Principio de correspondencia",
              isCorrect: true,
            },
          ],
          points: 3,
        },
        {
          id: "q4",
          question: "Explica brevemente el concepto de entrelazamiento cuántico:",
          type: "text" as const,
          options: [],
          points: 3,
        },
      ],
      passingScore: 70,
    },
    skills: [
      {
        id: "s1",
        subskillId: "1",
        subskillName: "Análisis de Argumentos",
        skillName: "Pensamiento Crítico",
        skillColor: "purple",
        level: 2,
      },
      {
        id: "s2",
        subskillId: "5",
        subskillName: "Definición de Problemas",
        skillName: "Resolución de Problemas",
        skillColor: "pink",
        level: 3,
      },
    ],
    creatorId: "creator1",
    creatorName: "Dr. Quantum",
  }

  // Mock data para navegación entre Qerniums
  const qlusterQerniums = [
    { id: "prev-qernium", title: "Historia de la Mecánica Cuántica" },
    { id: qerniumId, title: qernium.title },
    { id: "next-qernium", title: "Aplicaciones de la Mecánica Cuántica" },
  ]

  // Encontrar índice actual
  const currentIndex = qlusterQerniums.findIndex((q) => q.id === qerniumId)
  const prevQernium = currentIndex > 0 ? qlusterQerniums[currentIndex - 1] : null
  const nextQernium = currentIndex < qlusterQerniums.length - 1 ? qlusterQerniums[currentIndex + 1] : null

  // Función para manejar la finalización del Qernium
  const handleComplete = (response: any) => {
    console.log("Respuesta recibida:", response)

    toast({
      title: "Qernium completado",
      description: `Has completado este Qernium con una puntuación de ${response.score || "N/A"}%.`,
    })

    // Opcional: redirigir al siguiente Qernium después de un breve retraso
    if (nextQernium) {
      setTimeout(() => {
        router.push(`/dashboard/student/qerniums/${nextQernium.id}`)
      }, 2000)
    }
  }

  // Funciones para navegación
  const goToPrevious = () => {
    if (prevQernium) {
      router.push(`/dashboard/student/qerniums/${prevQernium.id}`)
    }
  }

  const goToNext = () => {
    if (nextQernium) {
      router.push(`/dashboard/student/qerniums/${nextQernium.id}`)
    }
  }

  return (
    <>
      <DashboardHeader
        heading={`Qernium ${currentIndex + 1} de ${qlusterQerniums.length}`}
        text="Completa este Qernium para avanzar en tu aprendizaje"
      >
        <Link href="/dashboard/student/qlusters">
          <Button variant="outline" className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Qluster
          </Button>
        </Link>
      </DashboardHeader>
      <DashboardShell>
        <QerniumViewer
          qernium={qernium}
          onComplete={handleComplete}
          onPrevious={prevQernium ? goToPrevious : undefined}
          onNext={nextQernium ? goToNext : undefined}
          viewOnly={false}
          userRole="qorexplorer"
        />
      </DashboardShell>
    </>
  )
}
