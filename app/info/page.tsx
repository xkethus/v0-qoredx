import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket, BookOpen, Users } from "lucide-react"
import { landingContent } from "@/lib/landing-content"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="border-b border-purple-900/50 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
              <span className="text-purple-300">Qoredx</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm text-gray-300 hover:text-purple-400 transition-colors">
              Inicio
            </Link>
            <Link href="#features" className="text-sm text-gray-300 hover:text-purple-400 transition-colors">
              Características
            </Link>
            <Link href="#about" className="text-sm text-gray-300 hover:text-purple-400 transition-colors">
              Acerca de
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="outline"
                className="border-purple-700 text-purple-400 hover:bg-purple-900/20 hover:text-purple-300"
              >
                Log in
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,41,170,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.2),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-cyan-400 bg-cyan-950/50 rounded-full border border-cyan-800/50">
                  {landingContent.hero.tagline}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                    {landingContent.hero.title}
                  </span>
                  <br /> of Knowledge
                </h1>
                <p className="text-lg text-gray-400 max-w-lg">{landingContent.hero.description}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
                  >
                    Launch Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-700 text-purple-400 hover:bg-purple-900/20"
                  >
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg blur-3xl"></div>
              <div className="relative border border-purple-900/50 rounded-lg overflow-hidden bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <div className="p-1 bg-gradient-to-r from-purple-600/20 to-cyan-500/20">
                  <div className="flex items-center gap-2 px-4 py-2">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-gray-400">Dashboard Preview</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid gap-4">
                    <div className="p-4 border border-purple-900/50 rounded-md bg-black/50">
                      <h3 className="text-lg font-medium text-purple-300 mb-2">Today's Schedule</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 border-l-2 border-cyan-500 bg-cyan-950/20 rounded">
                          <span className="text-sm">Quantum Physics 101</span>
                          <span className="text-xs text-cyan-400">09:00 - 10:30</span>
                        </div>
                        <div className="flex justify-between items-center p-2 border-l-2 border-purple-500 bg-purple-950/20 rounded">
                          <span className="text-sm">Space Exploration</span>
                          <span className="text-xs text-purple-400">11:00 - 12:30</span>
                        </div>
                        <div className="flex justify-between items-center p-2 border-l-2 border-pink-500 bg-pink-950/20 rounded">
                          <span className="text-sm">AI Ethics</span>
                          <span className="text-xs text-pink-400">14:00 - 15:30</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 border border-purple-900/50 rounded-md bg-black/50 flex flex-col items-center justify-center text-center">
                        <BookOpen className="h-8 w-8 text-purple-500 mb-2" />
                        <span className="text-xs text-gray-400">Content</span>
                        <span className="text-lg font-medium text-white">24</span>
                      </div>
                      <div className="p-4 border border-cyan-900/50 rounded-md bg-black/50 flex flex-col items-center justify-center text-center">
                        <Users className="h-8 w-8 text-cyan-500 mb-2" />
                        <span className="text-xs text-gray-400">Students</span>
                        <span className="text-lg font-medium text-white">128</span>
                      </div>
                      <div className="p-4 border border-pink-900/50 rounded-md bg-black/50 flex flex-col items-center justify-center text-center">
                        <div className="h-8 w-8 text-pink-500 mb-2 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                            <path d="M9 13h6" />
                            <path d="M9 17h6" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-400">Tests</span>
                        <span className="text-lg font-medium text-white">12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(120,41,170,0.1)_30%,transparent_60%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
              {landingContent.features.title}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{landingContent.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-purple-900/50 rounded-lg bg-black/50 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300">
              <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-purple-400"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M12 18v-6" />
                  <path d="M8 18v-1" />
                  <path d="M16 18v-3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-purple-300">Content Creation</h3>
              <p className="text-gray-400">
                Create and organize your educational content with our intuitive editor. Add text, images, videos, and
                interactive elements.
              </p>
              <Link
                href="/dashboard/add-content"
                className="inline-flex items-center mt-4 text-sm text-purple-400 hover:text-purple-300"
              >
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="p-6 border border-cyan-900/50 rounded-lg bg-black/50 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-900/50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-400"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-cyan-300">Test & Assessment</h3>
              <p className="text-gray-400">
                Create quizzes, assignments, and exams with automated grading. Track student progress and provide
                instant feedback.
              </p>
              <Link
                href="/dashboard/review"
                className="inline-flex items-center mt-4 text-sm text-cyan-400 hover:text-cyan-300"
              >
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="p-6 border border-pink-900/50 rounded-lg bg-black/50 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all duration-300">
              <div className="w-12 h-12 bg-pink-900/50 rounded-lg flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-pink-400"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-pink-300">Classroom Management</h3>
              <p className="text-gray-400">
                Manage students, classes, and schedules effortlessly. Track attendance, communicate with students, and
                organize your teaching.
              </p>
              <Link
                href="/dashboard/classroom"
                className="inline-flex items-center mt-4 text-sm text-pink-400 hover:text-pink-300"
              >
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,41,170,0.3),transparent_70%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
              {landingContent.cta.title}
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">{landingContent.cta.description}</p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white"
              >
                Start Your Journey
                <Rocket className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-900/50 bg-black/50 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="h-6 w-6 text-purple-500" />
                <span className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">
                  Qoredx
                </span>
              </div>
              <p className="text-gray-400 text-sm">{landingContent.footer.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-900/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Qoredx. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-purple-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
