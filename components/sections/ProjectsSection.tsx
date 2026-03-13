"use client"

import { useMemo, type ComponentType } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/scroll-animation"
import { 
  ExternalLink, 
  Activity, 
  Layers, 
  Package, 
  File, 
  Shield, 
  Zap, 
  Users, 
  Clock, 
  Terminal, 
  Globe, 
  TrendingUp, 
  Database, 
  Github
} from "lucide-react"
import Link from "next/link"
import { type Project } from "@/lib/portfolio-data"
import { useTranslations } from "next-intl"

const IconMap = {
  Activity,
  Layers,
  Package,
  File,
  Shield,
  Zap,
  Users,
  Clock,
  Terminal,
  Globe,
  TrendingUp,
  Database
} satisfies Record<string, ComponentType<{ className?: string }>>

type IconName = keyof typeof IconMap

interface ProjectsSectionProps {
  readonly projects: readonly Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const t = useTranslations('Projects')
  
  // Separate projects by priority
  const { featuredProjects, keyProjects, otherProjects } = useMemo(() => {
    const featured = projects.filter(p => p.priority === "featured")
    const key = projects.filter(p => p.priority === "key")
    const other = projects.filter(p => p.priority === "other")
    return {
      featuredProjects: featured,
      keyProjects: key,
      otherProjects: other
    }
  }, [projects])

  return (
    <section id="projects" className="relative py-16 md:py-24 scroll-offset px-4 lg:px-6 bg-background overflow-hidden section-transition">
      <div className="absolute inset-0 bg-grid-pattern text-primary/5" />
      <div className="relative container mx-auto">
        <div className="mx-auto max-w-7xl">
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16 md:mb-20">
            <ScrollAnimation animation="slideUp" delay={100}>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">{t('title')}</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
              </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {featuredProjects.map((project, index) => (
                <ScrollAnimation key={project.id} animation="slideUp" delay={100 + (index * 100)}>
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 dark:hover:shadow-primary/10 border-border/50 h-full flex flex-col">
                    <div className={`h-3 bg-gradient-to-r ${project.gradient || "from-primary to-secondary"}`} />
                    <CardHeader className="pb-4 md:pb-6 flex-shrink-0">
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <CardTitle className="group-hover:text-primary transition-colors text-2xl md:text-3xl">
                          {project.title}
                        </CardTitle>
                        <div className="flex gap-2 flex-shrink-0">
                          {project.github && (
                            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 h-10 w-10 md:h-12 md:w-12" aria-label="View on GitHub">
                              <Link href={project.github} target="_blank" rel="noreferrer noopener">
                                <Github className="h-5 w-5 md:h-6 md:w-6" />
                              </Link>
                            </Button>
                          )}
                          {project.demo && (
                            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 h-10 w-10 md:h-12 md:w-12" aria-label="View Demo">
                              <Link href={project.demo} target="_blank" rel="noreferrer noopener">
                                <Globe className="h-5 w-5 md:h-6 md:w-6" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                      {project.description && (
                        <CardDescription className="text-base md:text-lg leading-relaxed">
                          {project.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4 md:space-y-6 flex-grow flex flex-col">
                      {Array.isArray(project.tech) && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <Badge 
                              key={`${project.id}-${tech}`} 
                              variant="outline" 
                              className="text-sm border-primary/20 hover:bg-primary/5"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {Array.isArray(project.metrics) && project.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6 border-t border-border/50 mt-auto">
                          {project.metrics.map((metric) => {
                            // Safe cast because we know the data might have icons relevant to the map
                            const Icon = metric.icon && IconMap[metric.icon as IconName] ? IconMap[metric.icon as IconName] : Activity
                            return (
                              <div key={`${project.id}-${metric.label}`} className="text-center">
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
                </ScrollAnimation>
              ))}
            </div>
          </div>
        )}

        {/* Key Architecture Projects */}
        {keyProjects.length > 0 && (
          <ScrollAnimation animation="slideUp" delay={200}>
            <div className="mb-16 md:mb-20">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">{t('subtitle')}</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
                <p className="text-muted-foreground mt-4 text-sm md:text-base">{t('description')}</p>
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
                          <div className="flex items-center justify-between gap-2">
                            <CardTitle className="group-hover:text-primary transition-colors text-lg md:text-xl">{project.title}</CardTitle>
                            <div className="flex space-x-1 md:space-x-2 flex-shrink-0">
                              {project.github && (
                                <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 h-8 w-10 md:h-10 md:w-12" aria-label="View on GitHub">
                                  <Link href={project.github} target="_blank" rel="noreferrer noopener">
                                    <Github className="h-4 w-4" />
                                  </Link>
                                </Button>
                              )}
                              {project.demo && (
                                <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 h-8 w-10 md:h-10 md:w-12" aria-label="Demo">
                                  <Link href={project.demo} target="_blank" rel="noreferrer noopener">
                                    <Globe className="h-4 w-4" />
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
                                const Icon = metric.icon && IconMap[metric.icon as IconName] ? IconMap[metric.icon as IconName] : Activity
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
                <h3 className="text-xl md:text-2xl font-bold tracking-tighter mb-2">{t('viewAll')}</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-all duration-300 dark:hover:shadow-primary/10 border-border/50 bg-card/50 flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base md:text-lg">{project.title}</CardTitle>
                        <div className="flex gap-1">
                          {project.github && (
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:bg-primary/10" aria-label="GitHub">
                              <Link href={project.github} target="_blank" rel="noreferrer noopener">
                                <Github className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                          {project.demo && (
                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:bg-primary/10" aria-label="Demo">
                              <Link href={project.demo} target="_blank" rel="noreferrer noopener">
                                <Globe className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                      {project.description && (
                        <CardDescription className="text-xs line-clamp-2">{project.description}</CardDescription>
                      )}
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        )}
        </div>
      </div>
    </section>
  )
}
