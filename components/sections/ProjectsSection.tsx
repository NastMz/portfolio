"use client"

import type { ComponentType } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Github, ExternalLink, Activity, Shield, Users, Clock, File, Package, Layers, Terminal, Globe } from "lucide-react"
import Link from "next/link"

const IconMap = {
  Shield,
  Zap: Activity, // alias
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

interface ProjectMetric {
  label: string
  value: string
  icon?: IconName
}

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  github?: string
  demo?: string
  gradient?: string
  metrics?: ProjectMetric[]
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="container mx-auto py-16 md:py-24 scroll-offset px-4 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <ScrollAnimation animation="slideUp" delay={100}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">Featured projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>
        </ScrollAnimation>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const gradient = project.gradient || "from-primary to-secondary"
            const metrics = project.metrics
            return (
              <ScrollAnimation 
                key={project.id} 
                animation="slideUp" 
                delay={200 + (index * 150)}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 dark:hover:shadow-primary/10 border-border/50 h-full flex flex-col">
                  <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                  <CardHeader className="pb-3 md:pb-4 flex-shrink-0">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="group-hover:text-primary transition-colors text-lg md:text-xl">{project.title}</CardTitle>
                      <div className="flex space-x-1 md:space-x-2 flex-shrink-0">
                        {project.github && (
                          <Button variant="ghost" size="icon" asChild className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-primary/10 h-8 w-8 md:h-10 md:w-10" aria-label="Ver en GitHub">
                            <Link href={project.github} target="_blank" rel="noreferrer noopener">
                              <Github className="h-3 w-3 md:h-4 md:w-4" />
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
                    <CardDescription className="text-xs md:text-sm leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3 md:space-y-4 flex-grow flex flex-col">
                    {Array.isArray(project.tech) && (
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech) => (
                          <Badge key={`${project.id}-${tech}`} variant="outline" className="text-xs border-primary/20 hover:bg-primary/5">
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
    </section>
  )
}
