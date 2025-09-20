"use client"

import { useState, useMemo, type ComponentType } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollAnimation } from "@/components/scroll-animation"
import { ExternalLink, Activity, Shield, Users, Clock, File, Package, Layers, Terminal, Globe, Filter, X, ChevronDown, ChevronUp } from "lucide-react"
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
}

interface ProjectsSectionProps {
  readonly projects: readonly Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [showAllTech, setShowAllTech] = useState<boolean>(false)

  // Helper function to check if project has technology
  const projectHasTechnology = (project: Project, tech: string): boolean => {
    if (!project.categories) return false
    
    for (const categoryItems of Object.values(project.categories)) {
      if (Array.isArray(categoryItems) && categoryItems.includes(tech)) {
        return true
      }
    }
    return false
  }

  // Helper function to get projects with specific technology
  const getProjectsWithTech = (tech: string): Project[] => {
    return projects.filter(project => projectHasTechnology(project, tech))
  }

  // Get technologies organized by category
  const technologiesByCategory = useMemo(() => {
    const techByCategory: Record<string, Set<string>> = {}
    
    for (const project of projects) {
      if (!project.categories) continue
      
      for (const [categoryName, categoryItems] of Object.entries(project.categories)) {
        if (categoryName === 'type' || !Array.isArray(categoryItems)) continue
        
        if (!techByCategory[categoryName]) {
          techByCategory[categoryName] = new Set()
        }
        
        for (const tech of categoryItems) {
          techByCategory[categoryName].add(tech)
        }
      }
    }
    
    // Convert Sets to sorted arrays
    const result: Record<string, string[]> = {}
    for (const [category, techSet] of Object.entries(techByCategory)) {
      result[category] = Array.from(techSet).sort((a, b) => a.localeCompare(b))
    }
    
    return result
  }, [projects])

  // Extract all unique technologies from project categories
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>()
    
    for (const techArray of Object.values(technologiesByCategory)) {
      for (const tech of techArray) {
        techSet.add(tech)
      }
    }
    
    return Array.from(techSet).sort((a, b) => a.localeCompare(b))
  }, [technologiesByCategory])

  // Get technologies to display based on selected category
  const technologiesToShow = useMemo(() => {
    if (selectedCategory === "All") {
      // Show all technologies, prioritizing most popular
      const techWithCount = allTechnologies.map(tech => ({
        name: tech,
        count: getProjectsWithTech(tech).length
      }))
      
      const sortedTech = techWithCount.toSorted((a, b) => b.count - a.count)
      
      if (showAllTech) {
        return sortedTech.map(item => item.name)
      } else {
        return sortedTech.slice(0, 12).map(item => item.name)
      }
    } else {
      // Show only technologies from selected category
      return technologiesByCategory[selectedCategory] || []
    }
  }, [selectedCategory, allTechnologies, technologiesByCategory, showAllTech])

  // Extract all category types
  const categoryTypes = useMemo(() => {
    return Object.keys(technologiesByCategory).sort((a, b) => a.localeCompare(b))
  }, [technologiesByCategory])

  // Filter projects based on selected technologies and category
  const filteredProjects = useMemo(() => {
    if (selectedTechnologies.length === 0 && selectedCategory === "All") {
      return projects
    }
    
    return projects.filter(project => {
      if (!project.categories) return false
      
      // If specific technologies are selected, project must have ALL of them
      if (selectedTechnologies.length > 0) {
        return selectedTechnologies.some(tech => projectHasTechnology(project, tech))
      }
      
      // If only category is selected, show all projects with technologies in that category
      if (selectedCategory !== "All") {
        const categoryData = project.categories[selectedCategory as keyof typeof project.categories]
        return Array.isArray(categoryData) && categoryData.length > 0
      }
      
      return false
    })
  }, [projects, selectedTechnologies, selectedCategory])

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies(prev => {
      if (prev.includes(tech)) {
        return prev.filter(t => t !== tech)
      } else {
        return [...prev, tech]
      }
    })
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    // Clear technology filters when changing category
    setSelectedTechnologies([])
    setShowAllTech(false)
  }

  const clearAllFilters = () => {
    setSelectedTechnologies([])
    setSelectedCategory("All")
    setShowAllTech(false)
  }

  const hasActiveFilters = selectedTechnologies.length > 0 || selectedCategory !== "All"

  return (
    <section id="projects" className="container mx-auto py-16 md:py-24 scroll-offset px-4 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <ScrollAnimation animation="slideUp" delay={100}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">Featured projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>
        </ScrollAnimation>

        {/* Advanced Filters */}
        <ScrollAnimation animation="slideUp" delay={150}>
          <div className="mb-8 md:mb-12">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
                  <SelectTrigger className="w-[200px] h-9">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {categoryTypes.map((category) => {
                      const count = projects.filter(project => {
                        return project.categories?.[category as keyof typeof project.categories]
                      }).length
                      
                      return (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)} ({count})
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters & Clear */}
              <div className="flex items-center gap-3">
                {hasActiveFilters && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {filteredProjects.length} of {projects.length} projects
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="h-7 px-2 text-xs"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Technologies Display */}
            {selectedTechnologies.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Selected technologies:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTechnologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="default"
                      className="cursor-pointer hover:bg-primary/80"
                      onClick={() => toggleTechnology(tech)}
                    >
                      {tech}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Filters */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  {selectedCategory === "All" 
                    ? "Technologies (select any to filter):" 
                    : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} technologies:`
                  }
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {technologiesToShow.map((tech) => {
                  const projectsWithTech = getProjectsWithTech(tech)
                  const isSelected = selectedTechnologies.includes(tech)
                  
                  return (
                    <Button
                      key={tech}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTechnology(tech)}
                      className="h-8 text-xs"
                    >
                      {tech} ({projectsWithTech.length})
                    </Button>
                  )
                })}
                
                {selectedCategory === "All" && !showAllTech && allTechnologies.length > technologiesToShow.length && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllTech(true)}
                    className="h-8 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <ChevronDown className="h-3 w-3 mr-1" />
                    +{allTechnologies.length - technologiesToShow.length} more
                  </Button>
                )}
                
                {selectedCategory === "All" && showAllTech && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAllTech(false)}
                    className="h-8 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Show less
                  </Button>
                )}
              </div>
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => {
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
                    <CardDescription className="text-xs md:text-sm leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3 md:space-y-4 flex-grow flex flex-col">
                    {Array.isArray(project.tech) && (
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech) => (
                          <Badge 
                            key={`${project.id}-${tech}`} 
                            variant="outline" 
                            className={`text-xs border-primary/20 hover:bg-primary/5 cursor-pointer transition-colors ${
                              selectedTechnologies.includes(tech) ? 'bg-primary text-primary-foreground border-primary' : ''
                            }`}
                            onClick={() => toggleTechnology(tech)}
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

        {/* Show message when no projects match the filter */}
        {filteredProjects.length === 0 && hasActiveFilters && (
          <ScrollAnimation animation="slideUp" delay={200}>
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-lg mb-2">No projects found</p>
                <p className="text-sm">
                  No projects were found matching your current filters
                </p>
              </div>
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="mt-4"
              >
                View all projects
              </Button>
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  )
}
