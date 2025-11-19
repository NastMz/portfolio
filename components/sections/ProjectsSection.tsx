"use client"

import { useMemo, type ComponentType } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/scroll-animation"
import { ExternalLink, Activity, Layers, Package } from "lucide-react"
import Link from "next/link"

const IconMap = {
  Activity,
  Layers,
  Package,
} satisfies Record<string, ComponentType<{ className?: string }>>

type IconName = keyof typeof IconMap

interface ProjectMetric {
  label: string
  value: string
  icon?: IconName
}

interface Project {
  id: string
  title: string
  description?: string
  tech?: string[]
  categories?: {
    languages?: string[]
    frameworks?: string[]
    libraries?: string[]
    databases?: string[]
    devops?: string[]
    tools?: string[]
    styling?: string[]
    protocols?: string[]
    concepts?: string[]
    patterns?: string[]
    algorithms?: string[]
    web?: string[]
    type?: string
  }
  github?: string
  demo?: string
  gradient?: string
  metrics?: ProjectMetric[]
  priority?: "featured" | "key" | "other"
}

interface ProjectsSectionProps {
  readonly projects: readonly Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  // Separate projects by priority
  const { featuredProject, keyProjects, otherProjects } = useMemo(() => {
    const featured = projects.find(p => p.priority === "featured")
    const key = projects.filter(p => p.priority === "key")
    const other = projects.filter(p => p.priority === "other")
    return {
      featuredProject: featured,
      keyProjects: key,
      otherProjects: other
    }
  }, [projects])

  return (
    <section id="projects" className="container mx-auto py-16 md:py-24 scroll-offset px-4 lg:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Featured Project - MicroEngine */}
        {featuredProject && (
          <ScrollAnimation animation="slideUp" delay={100}>
            <div className="mb-16 md:mb-20">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">Featured Project</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
              </div>
              <div className="max-w-4xl mx-auto">
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 dark:hover:shadow-primary/10 border-border/50">
                  <div className={`h-3 bg-gradient-to-r ${featuredProject.gradient || "from-primary to-secondary"}`} />
                  <CardHeader className="pb-4 md:pb-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="group-hover:text-primary transition-colors text-2xl md:text-3xl mb-3">
                          {featuredProject.title}
                        </CardTitle>
                        {featuredProject.description && (
                          <CardDescription className="text-base md:text-lg leading-relaxed">
                            {featuredProject.description}
                          </CardDescription>
                        )}
                      </div>
                      {featuredProject.github && (
                        <Button variant="ghost" size="icon" asChild className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-primary/10 h-10 w-10 md:h-12 md:w-12 flex-shrink-0" aria-label="View on GitHub">
                          <Link href={featuredProject.github} target="_blank" rel="noreferrer noopener">
                            <ExternalLink className="h-5 w-5 md:h-6 md:w-6" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 md:space-y-6">
                    {Array.isArray(featuredProject.tech) && featuredProject.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {featuredProject.tech.map((tech) => (
                          <Badge 
                            key={`${featuredProject.id}-${tech}`} 
                            variant="outline" 
                            className="text-sm border-primary/20 hover:bg-primary/5"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {Array.isArray(featuredProject.metrics) && featuredProject.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6 border-t border-border/50">
                        {featuredProject.metrics.map((metric) => {
                          const Icon = metric.icon && IconMap[metric.icon] ? IconMap[metric.icon] : Activity
                          return (
                            <div key={`${featuredProject.id}-${metric.label}`} className="text-center">
                              <Icon className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-2 text-muted-foreground" aria-hidden />
                              <div className="text-base md:text-lg font-semibold">{metric.value}</div>
                              <div className="text-sm text-muted-foreground">{metric.label}</div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollAnimation>
        )}

        {/* Key Architecture Projects */}
        {keyProjects.length > 0 && (
          <ScrollAnimation animation="slideUp" delay={200}>
            <div className="mb-16 md:mb-20">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">Key Architecture Projects</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
                <p className="text-muted-foreground mt-4 text-sm md:text-base">Systems and libraries built with clean architecture principles</p>
              </div>
              <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {keyProjects.map((project, index) => {
                  const gradient = project.gradient || "from-primary to-secondary"
                  const metrics = project.metrics
                  return (
                    <ScrollAnimation 
                      key={project.id} 
                      animation="slideUp" 
                      delay={300 + (index * 100)}
                    >
                      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 dark:hover:shadow-primary/10 border-border/50 h-full flex flex-col">
                        <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                        <CardHeader className="pb-3 md:pb-4 flex-shrink-0">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="group-hover:text-primary transition-colors text-lg md:text-xl">{project.title}</CardTitle>
                            <div className="flex space-x-1 md:space-x-2 flex-shrink-0">
                              {project.github && (
                                <Button variant="ghost" size="icon" asChild className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-primary/10 h-8 w-8 md:h-10 md:w-10" aria-label="View on GitHub">
                                  <Link href={project.github} target="_blank" rel="noreferrer noopener">
                                    <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                                  </Link>
                                </Button>
                              )}
                              {project.demo && (
                                <Button variant="ghost" size="icon" asChild className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-primary/10 h-8 w-8 md:h-10 md:w-10" aria-label="Demo">
                                  <Link href={project.demo} target="_blank" rel="noreferrer noopener">
                                    <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                          {project.description && (
                            <CardDescription className="text-xs md:text-sm leading-relaxed">{project.description}</CardDescription>
                          )}
                        </CardHeader>

                        <CardContent className="space-y-3 md:space-y-4 flex-grow flex flex-col">
                          {Array.isArray(project.tech) && project.tech.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {project.tech.map((tech) => (
                                <Badge 
                                  key={`${project.id}-${tech}`} 
                                  variant="outline" 
                                  className="text-xs border-primary/20 hover:bg-primary/5"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {Array.isArray(metrics) && metrics.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 md:gap-4 pt-3 md:pt-4 border-t border-border/50 mt-auto">
                              {metrics.map((metric) => {
                                const Icon = metric.icon && IconMap[metric.icon] ? IconMap[metric.icon] : Activity
                                return (
                                  <div key={`${project.id}-${metric.label}`} className="text-center">
                                    <Icon className="h-3 w-3 md:h-4 md:w-4 mx-auto mb-1 text-muted-foreground" aria-hidden />
                                    <div className="text-xs md:text-sm font-semibold">{metric.value}</div>
                                    <div className="text-xs text-muted-foreground leading-tight">{metric.label}</div>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </ScrollAnimation>
                  )
                })}
              </div>
            </div>
          </ScrollAnimation>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <ScrollAnimation animation="slideUp" delay={600}>
            <div>
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold tracking-tighter mb-2">Other Projects</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
              </div>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {otherProjects.map((project) => (
                  <Button
                    key={project.id}
                    variant="outline"
                    asChild
                    className="border-primary/20 hover:bg-primary/5"
                  >
                    <Link href={project.github || "#"} target="_blank" rel="noreferrer noopener">
                      {project.title}
                      <ExternalLink className="h-3 w-3 md:h-4 md:w-4 ml-2" />
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  )
}
