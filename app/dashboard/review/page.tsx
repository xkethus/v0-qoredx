import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { FileText, BarChart, CheckCircle, Clock, AlertCircle, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ReviewPage() {
  // Mock data for tests
  const tests = [
    {
      id: 1,
      title: "Quantum Physics Mid-Term",
      course: "Quantum Physics 101",
      dueDate: "April 30, 2025",
      status: "active",
      submissions: 18,
      totalStudents: 24,
    },
    {
      id: 2,
      title: "Space Exploration Quiz",
      course: "Space Exploration",
      dueDate: "May 5, 2025",
      status: "active",
      submissions: 12,
      totalStudents: 20,
    },
    {
      id: 3,
      title: "AI Ethics Final Exam",
      course: "AI Ethics",
      dueDate: "May 15, 2025",
      status: "scheduled",
      submissions: 0,
      totalStudents: 22,
    },
    {
      id: 4,
      title: "Quantum Physics Quiz 2",
      course: "Quantum Physics 101",
      dueDate: "April 15, 2025",
      status: "completed",
      submissions: 23,
      totalStudents: 24,
    },
    {
      id: 5,
      title: "Space Exploration Mid-Term",
      course: "Space Exploration",
      dueDate: "April 10, 2025",
      status: "completed",
      submissions: 19,
      totalStudents: 20,
    },
  ]

  return (
    <>
      <DashboardHeader heading="Review & Tests" text="Manage and grade student assessments">
        <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
          <Plus className="mr-2 h-4 w-4" /> Create Test
        </Button>
      </DashboardHeader>
      <DashboardShell>
        <Tabs defaultValue="active" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList className="bg-black/20 border border-purple-900/50">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="scheduled"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Scheduled
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-300"
              >
                All
              </TabsTrigger>
            </TabsList>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tests..."
                className="w-full sm:w-[250px] pl-8 border-purple-900/50 bg-black/50 focus-visible:ring-purple-500"
              />
            </div>
          </div>

          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4">
              {tests
                .filter((test) => test.status === "active")
                .map((test) => (
                  <Card
                    key={test.id}
                    className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-cyan-400" />
                            <h3 className="font-medium text-lg text-cyan-300">{test.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{test.course}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-amber-400" />
                            <span className="text-sm">Due: {test.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-sm">
                              {test.submissions} / {test.totalStudents} submitted
                            </span>
                          </div>
                          <Button className="ml-auto bg-cyan-600 hover:bg-cyan-700 text-white">
                            Review Submissions
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="w-full bg-black/50 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-2 rounded-full"
                            style={{ width: `${(test.submissions / test.totalStudents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <div className="grid gap-4">
              {tests
                .filter((test) => test.status === "scheduled")
                .map((test) => (
                  <Card
                    key={test.id}
                    className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-purple-400" />
                            <h3 className="font-medium text-lg text-purple-300">{test.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{test.course}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-purple-400" />
                            <span className="text-sm">Scheduled for: {test.dueDate}</span>
                          </div>
                          <Button className="ml-auto bg-purple-600 hover:bg-purple-700 text-white">Edit Test</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4">
              {tests
                .filter((test) => test.status === "completed")
                .map((test) => (
                  <Card
                    key={test.id}
                    className="border-pink-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.1)]"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-pink-400" />
                            <h3 className="font-medium text-lg text-pink-300">{test.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{test.course}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-sm">
                              {test.submissions} / {test.totalStudents} completed
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart className="h-4 w-4 text-pink-400" />
                            <span className="text-sm">Avg. Score: 82%</span>
                          </div>
                          <Button className="ml-auto bg-pink-600 hover:bg-pink-700 text-white">View Results</Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="w-full bg-black/50 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-pink-500 to-pink-300 h-2 rounded-full"
                            style={{ width: `${(test.submissions / test.totalStudents) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {tests.map((test) => {
                let borderColor = "border-purple-900/50"
                let textColor = "text-purple-300"
                let iconColor = "text-purple-400"
                let buttonColor = "bg-purple-600 hover:bg-purple-700"
                let gradientColor = "from-purple-500 to-purple-300"

                if (test.status === "active") {
                  borderColor = "border-cyan-900/50"
                  textColor = "text-cyan-300"
                  iconColor = "text-cyan-400"
                  buttonColor = "bg-cyan-600 hover:bg-cyan-700"
                  gradientColor = "from-cyan-500 to-cyan-300"
                } else if (test.status === "completed") {
                  borderColor = "border-pink-900/50"
                  textColor = "text-pink-300"
                  iconColor = "text-pink-400"
                  buttonColor = "bg-pink-600 hover:bg-pink-700"
                  gradientColor = "from-pink-500 to-pink-300"
                }

                return (
                  <Card key={test.id} className={`${borderColor} bg-black/50 backdrop-blur-sm`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FileText className={`h-5 w-5 ${iconColor}`} />
                            <h3 className={`font-medium text-lg ${textColor}`}>{test.title}</h3>
                            {test.status === "active" && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-950/50 text-cyan-300 border border-cyan-900/50">
                                Active
                              </span>
                            )}
                            {test.status === "scheduled" && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-purple-950/50 text-purple-300 border border-purple-900/50">
                                Scheduled
                              </span>
                            )}
                            {test.status === "completed" && (
                              <span className="px-2 py-0.5 text-xs rounded-full bg-pink-950/50 text-pink-300 border border-pink-900/50">
                                Completed
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{test.course}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Clock
                              className={
                                test.status === "scheduled" ? "h-4 w-4 text-purple-400" : "h-4 w-4 text-amber-400"
                              }
                            />
                            <span className="text-sm">
                              {test.status === "scheduled" ? `Scheduled for: ${test.dueDate}` : `Due: ${test.dueDate}`}
                            </span>
                          </div>
                          {test.status !== "scheduled" && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400" />
                              <span className="text-sm">
                                {test.submissions} / {test.totalStudents} submitted
                              </span>
                            </div>
                          )}
                          {test.status === "completed" && (
                            <div className="flex items-center gap-2">
                              <BarChart className="h-4 w-4 text-pink-400" />
                              <span className="text-sm">Avg. Score: 82%</span>
                            </div>
                          )}
                          <Button className={`ml-auto ${buttonColor} text-white`}>
                            {test.status === "active"
                              ? "Review Submissions"
                              : test.status === "scheduled"
                                ? "Edit Test"
                                : "View Results"}
                          </Button>
                        </div>
                      </div>
                      {test.status !== "scheduled" && (
                        <div className="mt-4">
                          <div className="w-full bg-black/50 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${gradientColor} h-2 rounded-full`}
                              style={{ width: `${(test.submissions / test.totalStudents) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
          <Card className="border-purple-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-purple-300">Total Tests</CardTitle>
              <CardDescription>All time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
            </CardContent>
          </Card>
          <Card className="border-cyan-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-cyan-300">Active Tests</CardTitle>
              <CardDescription>Currently running</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <div className="flex items-center mt-1">
                <Clock className="h-3 w-3 text-amber-400 mr-1" />
                <p className="text-xs text-muted-foreground">Next due: Apr 30</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-pink-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(236,72,153,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-pink-300">Avg. Score</CardTitle>
              <CardDescription>All tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">78%</div>
              <p className="text-xs text-green-400 mt-1">+5% from last semester</p>
            </CardContent>
          </Card>
          <Card className="border-amber-900/50 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(251,191,36,0.1)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-amber-300">Completion Rate</CardTitle>
              <CardDescription>All students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">92%</div>
              <div className="flex items-center mt-1">
                <AlertCircle className="h-3 w-3 text-amber-400 mr-1" />
                <p className="text-xs text-muted-foreground">8% need attention</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    </>
  )
}
