"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StudentDetailModal } from "@/components/student-detail-modal"
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"

// Datos de ejemplo para estudiantes
const MOCK_STUDENTS = [
  {
    id: "STU001",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    progress: 78,
    attendance: 92,
    gpa: 8.5,
    completedAssignments: 12,
    totalAssignments: 15,
    participation: 85,
    strengths: ["Programación", "Matemáticas", "Trabajo en equipo"],
    areasToImprove: ["Puntualidad", "Documentación"],
    courses: [
      { id: "COURSE1", name: "Física Cuántica 101" },
      { id: "COURSE2", name: "Exploración Espacial" },
    ],
    assignments: [
      {
        id: "ASG001",
        title: "Proyecto Final de Física Cuántica",
        course: "Física Cuántica 101",
        status: "completed",
        dueDate: "15/04/2023",
        grade: 9.2,
      },
      {
        id: "ASG002",
        title: "Análisis de Datos Espaciales",
        course: "Exploración Espacial",
        status: "pending",
        dueDate: "30/04/2023",
      },
      {
        id: "ASG003",
        title: "Ensayo sobre Ética en IA",
        course: "Ética de la IA",
        status: "late",
        dueDate: "10/04/2023",
      },
    ],
  },
  {
    id: "STU002",
    name: "Samantha Lee",
    email: "samantha.lee@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    progress: 92,
    attendance: 98,
    gpa: 9.8,
    completedAssignments: 15,
    totalAssignments: 15,
    participation: 95,
    strengths: ["Investigación", "Presentaciones", "Liderazgo"],
    areasToImprove: ["Trabajo bajo presión"],
    courses: [
      { id: "COURSE2", name: "Exploración Espacial" },
      { id: "COURSE3", name: "Ética de la IA" },
    ],
    assignments: [
      {
        id: "ASG004",
        title: "Presentación sobre Colonización Espacial",
        course: "Exploración Espacial",
        status: "completed",
        dueDate: "12/04/2023",
        grade: 10.0,
      },
      {
        id: "ASG005",
        title: "Debate sobre IA y Privacidad",
        course: "Ética de la IA",
        status: "completed",
        dueDate: "20/04/2023",
        grade: 9.5,
      },
    ],
  },
  {
    id: "STU003",
    name: "Miguel Rodríguez",
    email: "miguel.rodriguez@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "inactive",
    progress: 45,
    attendance: 65,
    gpa: 6.2,
    completedAssignments: 5,
    totalAssignments: 15,
    participation: 40,
    strengths: ["Creatividad", "Resolución de problemas"],
    areasToImprove: ["Asistencia", "Entrega puntual", "Participación"],
    courses: [{ id: "COURSE1", name: "Física Cuántica 101" }],
    assignments: [
      {
        id: "ASG006",
        title: "Proyecto Final de Física Cuántica",
        course: "Física Cuántica 101",
        status: "late",
        dueDate: "15/04/2023",
      },
    ],
  },
]

// Datos de ejemplo para clases
const MOCK_CLASSES = [
  {
    id: "CLASS001",
    name: "Física Cuántica 101",
    students: 24,
    schedule: "Lunes y Miércoles, 10:00 - 12:00",
    room: "Laboratorio A-101",
    progress: 65,
  },
  {
    id: "CLASS002",
    name: "Exploración Espacial",
    students: 18,
    schedule: "Martes y Jueves, 14:00 - 16:00",
    room: "Aula Virtual B-202",
    progress: 78,
  },
  {
    id: "CLASS003",
    name: "Ética de la IA",
    students: 32,
    schedule: "Viernes, 09:00 - 12:00",
    room: "Auditorio C-303",
    progress: 42,
  },
]

export default function ClassroomPage() {
  const [activeTab, setActiveTab] = useState("students")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleStudentClick = (student: any) => {
    setSelectedStudent(student)
    setIsModalOpen(true)
  }

  return (
    <>
      <DashboardHeader heading="Classroom Management" text="Manage your classes and students">
        <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
          <UserPlus className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </DashboardHeader>
      <DashboardShell>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-black/20 border border-purple-900/50">
            <TabsTrigger
              value="students"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              <Users className="mr-2 h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger
              value="classes"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
            >
              <Users className="mr-2 h-4 w-4" />
              Classes
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md border border-purple-900/50 bg-black/50 py-2 pl-8 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              />
            </div>
            <Button variant="outline" size="sm" className="border-purple-900/50 text-purple-300 hover:bg-purple-900/20">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

          <TabsContent value="students" className="space-y-4">
            <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-purple-300">Students</CardTitle>
                <CardDescription>Manage your students and track their progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-purple-900/50">
                  <div className="grid grid-cols-12 gap-2 p-4 text-xs font-medium text-muted-foreground bg-purple-900/10">
                    <div className="col-span-4">STUDENT</div>
                    <div className="col-span-2">STATUS</div>
                    <div className="col-span-2">PROGRESS</div>
                    <div className="col-span-2">ATTENDANCE</div>
                    <div className="col-span-2 text-right">ACTIONS</div>
                  </div>
                  <div className="divide-y divide-purple-900/50">
                    {MOCK_STUDENTS.map((student) => (
                      <div
                        key={student.id}
                        className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-purple-900/10 cursor-pointer"
                        onClick={() => handleStudentClick(student)}
                      >
                        <div className="col-span-4 flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-purple-900/50 text-purple-300">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-muted-foreground">{student.email}</div>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <Badge
                            className={
                              student.status === "active"
                                ? "bg-green-900/30 text-green-300"
                                : "bg-red-900/30 text-red-300"
                            }
                          >
                            {student.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <Progress value={student.progress} className="h-2">
                              <div
                                className={`h-full rounded-full ${
                                  student.progress > 75
                                    ? "bg-green-500"
                                    : student.progress > 50
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              />
                            </Progress>
                            <span className="text-xs">{student.progress}%</span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-1">
                            {student.attendance >= 90 ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : student.attendance >= 70 ? (
                              <Clock className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-xs">{student.attendance}%</span>
                          </div>
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-300">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-4">
            <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-cyan-300">Classes</CardTitle>
                <CardDescription>Manage your classes and track their progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-cyan-900/50">
                  <div className="grid grid-cols-12 gap-2 p-4 text-xs font-medium text-muted-foreground bg-cyan-900/10">
                    <div className="col-span-4">CLASS</div>
                    <div className="col-span-2">STUDENTS</div>
                    <div className="col-span-3">SCHEDULE</div>
                    <div className="col-span-2">PROGRESS</div>
                    <div className="col-span-1 text-right">ACTIONS</div>
                  </div>
                  <div className="divide-y divide-cyan-900/50">
                    {MOCK_CLASSES.map((classItem) => (
                      <div key={classItem.id} className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-cyan-900/10">
                        <div className="col-span-4">
                          <div className="font-medium">{classItem.name}</div>
                          <div className="text-xs text-muted-foreground">{classItem.room}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-cyan-400" />
                            <span>{classItem.students}</span>
                          </div>
                        </div>
                        <div className="col-span-3 text-sm">{classItem.schedule}</div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <Progress value={classItem.progress} className="h-2">
                              <div
                                className={`h-full rounded-full ${
                                  classItem.progress > 75
                                    ? "bg-green-500"
                                    : classItem.progress > 50
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                              />
                            </Progress>
                            <span className="text-xs">{classItem.progress}%</span>
                          </div>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-cyan-300">
                            <ChevronDown className="h-4 w-4" />
                            <span className="sr-only">More details</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardShell>

      {/* Modal de detalle de estudiante */}
      <StudentDetailModal student={selectedStudent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
