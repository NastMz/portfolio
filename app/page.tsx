"use client"

import type { ComponentType } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  getPersonalInfo,
  getSkillsByCategory,
  getProjects,
  getExperience,
} from "@/lib/portfolio-data"
import {
  Code2,
  Database,
  Server,
  Cloud,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  Coffee,
  Rocket,
  Shield,
  Activity,
  CheckCircle,
  Clock,
  File,
  Package,
  Layers,
  Terminal,
  Globe,
} from "lucide-react"
import Link from "next/link"

// --- Utilidades ---
const year = new Date().getFullYear()

const IconMap = {
  Shield,
  Zap: TrendingUp, // alias
  Users,
  Activity,
  Clock,
  File,
  Package,
  Layers,
  Terminal,
  Globe,
} satisfies Record<string, ComponentType<{ className?: string }>>

type IconName = keyof typeof IconMap

export default function Portfolio() {
  // Obtener datos del JSON
  const personalInfo = getPersonalInfo()
  const skillsByCategory = getSkillsByCategory()
  const projects = getProjects()
  const experience = getExperience()

  // Stats conservadoras
  const stats = [
    { label: "Años de experiencia", value: "4+", icon: Calendar, color: "text-blue-600 dark:text-blue-400" },
    { label: "Proyectos", value: "10+", icon: CheckCircle, color: "text-green-600 dark:text-green-400" },
    { label: "Tecnologías", value: "15+", icon: Globe, color: "text-purple-600 dark:text-purple-400" },
    { label: "Repos públicos", value: "4+", icon: Activity, color: "text-orange-600 dark:text-orange-400" },
  ] as const

  const mobility = (personalInfo as any).mobility as
    | { travel?: boolean; relocation?: boolean; vehicle?: boolean }
    | undefined

  return (
    <div className="min-h-screen bg-background transition-colors duration-300" id="top">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="#top" className="mr-6 flex items-center space-x-2" aria-label="Inicio">
              <div className="relative">
                <Code2 className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className="font-bold text-lg">{personalInfo.name}</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#about" className="transition-colors hover:text-primary">Sobre mí</Link>
            <Link href="#skills" className="transition-colors hover:text-primary">Habilidades</Link>
            <Link href="#projects" className="transition-colors hover:text-primary">Proyectos</Link>
            <Link href="#experience" className="transition-colors hover:text-primary">Experiencia</Link>
            <Link href="#contact" className="transition-colors hover:text-primary">Contacto</Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
            {personalInfo.github && (
              <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10" aria-label="GitHub">
                <Link href={personalInfo.github} target="_blank" rel="noreferrer noopener">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {personalInfo.linkedin && (
              <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10" aria-label="LinkedIn">
                <Link href={personalInfo.linkedin} target="_blank" rel="noreferrer noopener">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent dark:from-primary/5" />
        <div className="container relative py-24 md:py-32">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl" />
              <div className="relative bg-background border-2 border-primary/20 rounded-full p-6 shadow-2xl dark:shadow-primary/10">
                <Server className="h-16 w-16 text-primary" aria-hidden />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                {personalInfo.title}
              </h1>
              <p className="mx-auto max-w-[750px] text-muted-foreground text-lg md:text-xl">
                {personalInfo.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
              {stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="text-center border-0 bg-background/50 backdrop-blur shadow-lg dark:bg-background/20 dark:shadow-primary/5"
                >
                  <CardContent className="pt-6">
                    <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} aria-hidden />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex items-center flex-wrap gap-4 justify-center text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" aria-hidden />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Coffee className="h-4 w-4 text-primary" aria-hidden />
                <span>{personalInfo.availability}</span>
              </div>
              {mobility && (
                <>
                  {"travel" in mobility && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      Viajar: {mobility.travel ? "Sí" : "No"}
                    </Badge>
                  )}
                  {"relocation" in mobility && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      Reubicación: {mobility.relocation ? "Sí" : "No"}
                    </Badge>
                  )}
                </>
              )}
            </div>

            <div className="flex space-x-4">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg">
                <Link href="#projects">
                  <Rocket className="h-4 w-4 mr-2" aria-hidden />
                  Ver proyectos
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-primary/20 hover:bg-primary/5 bg-transparent">
                <Link href="#contact">Contacto</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Sobre mí</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Soy desarrollador backend especializado en .NET, con foco en APIs escalables, optimización de bases de
                datos y automatización de despliegues. Me interesa construir soluciones prácticas, mantenibles y con
                buen performance.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                También tengo experiencia con Node.js y Python. Me gusta acompañar a equipos en buenas prácticas,
                revisión de código y diseño limpio.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
                  <Code2 className="h-3 w-3 mr-1" /> Clean Architecture
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                  <Database className="h-3 w-3 mr-1" /> SQL / EF / Dapper
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                  <Cloud className="h-3 w-3 mr-1" /> CI/CD & Docker
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                  <Users className="h-3 w-3 mr-1" /> Team Lead
                </Badge>
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-0 shadow-lg dark:from-primary/10 dark:to-secondary/10">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" aria-hidden />
                  </div>
                  <div>
                    <div className="font-semibold">Orientación a rendimiento</div>
                    <div className="text-sm text-muted-foreground">Optimización de consultas y tiempos de respuesta</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" aria-hidden />
                  </div>
                  <div>
                    <div className="font-semibold">Confiabilidad</div>
                    <div className="text-sm text-muted-foreground">Buenas prácticas, pruebas y observabilidad</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" aria-hidden />
                  </div>
                  <div>
                    <div className="font-semibold">Colaboración</div>
                    <div className="text-sm text-muted-foreground">Mentoría y revisión de código</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gradient-to-br from-muted/30 to-background dark:from-muted/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Habilidades</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4">Experiencia aplicada en producción</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <Card key={category} className="p-6 hover:shadow-lg transition-all duration-300 dark:hover:shadow-primary/5 border-border/50">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
                    <span>{category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill: any) => (
                    <div key={skill.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors dark:bg-muted/20 dark:hover:bg-muted/30">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg" aria-hidden>{skill.icon}</span>
                        <div>
                          <div className="font-semibold">{skill.name}</div>
                          <div className="text-sm text-muted-foreground">{skill.experience}</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                        {skill.projects}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Highlights */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800/50">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="h-6 w-6 text-white" aria-hidden />
              </div>
              <h3 className="font-semibold mb-2">Optimización de bases de datos</h3>
              <p className="text-sm text-muted-foreground">Consultas más rápidas y eficientes en producción</p>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200 dark:border-green-800/50">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" aria-hidden />
              </div>
              <h3 className="font-semibold mb-2">Escalabilidad</h3>
              <p className="text-sm text-muted-foreground">Sistemas mantenibles y listos para crecer</p>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-800/50">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" aria-hidden />
              </div>
              <h3 className="font-semibold mb-2">Buenas prácticas</h3>
              <p className="text-sm text-muted-foreground">Seguridad, testing y observabilidad</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Proyectos destacados</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: any) => {
              const gradient = project.gradient || "from-primary to-secondary"
              const metrics = project.metrics as Array<{ label: string; value: string; icon?: IconName }>
              return (
                <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 dark:hover:shadow-primary/10 border-border/50">
                  <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                      <div className="flex space-x-2">
                        {project.github && (
                          <Button variant="ghost" size="icon" asChild className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-primary/10" aria-label="Ver en GitHub">
                            <Link href={project.github} target="_blank" rel="noreferrer noopener">
                              <Github className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                        {project.demo && (
                          <Button variant="ghost" size="icon" asChild className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-primary/10" aria-label="Demo">
                            <Link href={project.demo} target="_blank" rel="noreferrer noopener">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {Array.isArray(project.tech) && (
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech: string) => (
                          <Badge key={`${project.id}-${tech}`} variant="outline" className="text-xs border-primary/20 hover:bg-primary/5">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {Array.isArray(metrics) && metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                        {metrics.map((metric) => {
                          const Icon = metric.icon && IconMap[metric.icon] ? IconMap[metric.icon] : Activity
                          return (
                            <div key={`${project.id}-${metric.label}`} className="text-center">
                              <Icon className="h-4 w-4 mx-auto mb-1 text-muted-foreground" aria-hidden />
                              <div className="text-sm font-semibold">{metric.value}</div>
                              <div className="text-xs text-muted-foreground">{metric.label}</div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-gradient-to-br from-muted/30 to-background dark:from-muted/10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Experiencia</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />

            <div className="space-y-12">
              {experience.map((job: any) => (
                <div key={job.id} className="relative flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-background border-4 border-primary/20 rounded-full flex items-center justify-center shadow-lg dark:shadow-primary/10">
                    <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full" />
                  </div>

                  <Card className={`flex-1 border-l-4 ${job.color || "border-l-primary"} hover:shadow-lg transition-shadow dark:hover:shadow-primary/5 border-border/50`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="text-base font-medium text-primary">{job.company}</CardDescription>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="font-medium">{job.period}</div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" aria-hidden />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {Array.isArray(job.achievements) && job.achievements.length > 0 && (
                        <ul className="space-y-3">
                          {job.achievements.map((achievement: string, i: number) => (
                            <li key={`${job.id}-achievement-${i}`} className="flex items-start space-x-3">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" aria-hidden />
                              <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Conversemos</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground text-lg">Abierto a nuevas oportunidades y colaboraciones.</p>
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-0 shadow-lg dark:from-primary/10 dark:to-secondary/10">
            <div className="flex justify-center flex-wrap gap-4 mb-8">
              {personalInfo.email && (
                <Button size="lg" asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg">
                  <Link href={`mailto:${personalInfo.email}`}>
                    <Mail className="h-5 w-5 mr-2" aria-hidden />
                    Enviar correo
                  </Link>
                </Button>
              )}
              {personalInfo.linkedin && (
                <Button variant="outline" size="lg" asChild className="border-primary/20 hover:bg-primary/5 bg-transparent">
                  <Link href={personalInfo.linkedin} target="_blank" rel="noreferrer noopener">
                    <Linkedin className="h-5 w-5 mr-2" aria-hidden />
                    LinkedIn
                  </Link>
                </Button>
              )}
              {personalInfo.github && (
                <Button variant="outline" size="lg" asChild className="border-primary/20 hover:bg-primary/5 bg-transparent">
                  <Link href={personalInfo.github} target="_blank" rel="noreferrer noopener">
                    <Github className="h-5 w-5 mr-2" aria-hidden />
                    GitHub
                  </Link>
                </Button>
              )}
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Suele responder en 24 horas</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 dark:bg-muted/10 border-border/50">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-semibold">{personalInfo.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">Construido con Next.js, Tailwind CSS y ☕ © {year}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
