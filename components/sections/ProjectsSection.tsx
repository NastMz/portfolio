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
    <section id="projects" className="container mx-auto py-24 scroll-offset">
      <div className="mx-auto max-w-7xl">
        <ScrollAnimation animation="slideUp" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Proyectos destacados</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>
        </ScrollAnimation>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const gradient = project.gradient || "from-primary to-secondary"
            const metrics = project.metrics
            return (
              <ScrollAnimation 
                key={project.id} 
                animation="slideUp" 
                delay={200 + (index * 150)}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 dark:hover:shadow-primary/10 border-border/50">
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
                        {project.tech.map((tech) => (
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
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}
