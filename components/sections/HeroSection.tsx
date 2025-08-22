"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/scroll-animation"
import {
  Server,
  Calendar,
  CheckCircle,
  Globe,
  Activity,
  MapPin,
  Coffee,
  Rocket,
} from "lucide-react"
import Link from "next/link"

interface Mobility {
  travel?: boolean
  relocation?: boolean
  vehicle?: boolean
}

interface HeroSectionProps {
  personalInfo: {
    title: string
    description: string
    location: string
    availability: string
    mobility?: Mobility
  }
  stats: {
    yearsOfExperience: number
    totalProjects: number
    totalTechnologies: number
    publicRepos: number
  }
}

export function HeroSection({ personalInfo, stats }: HeroSectionProps) {
  const mobility = personalInfo.mobility

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent dark:from-primary/5" />
      <div className="container mx-auto relative py-16 px-4 md:py-24 lg:py-32">
        <div className="flex flex-col items-center text-center space-y-6 md:space-y-8">
          <ScrollAnimation animation="scaleIn" delay={200}>
            <div className="relative">
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl" />
              <div className="relative bg-background border-2 border-primary/20 rounded-full p-4 md:p-6 shadow-2xl dark:shadow-primary/10">
                <Server className="h-12 w-12 md:h-16 md:w-16 text-primary" aria-hidden />
              </div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation animation="slideUp" delay={400}>
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent px-2">
                {personalInfo.title}
              </h1>
              <p className="mx-auto max-w-[650px] md:max-w-[750px] text-muted-foreground text-base sm:text-lg md:text-xl px-4">
                {personalInfo.description}
              </p>
            </div>
          </ScrollAnimation>

          {/* Stats Grid */}
          <ScrollAnimation animation="slideUp" delay={600}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl px-4">
              {[
                { 
                  label: "Años de experiencia", 
                  value: `${stats.yearsOfExperience}+`, 
                  icon: Calendar, 
                  color: "text-blue-600 dark:text-blue-400" 
                },
                { 
                  label: "Proyectos", 
                  value: `${stats.totalProjects}+`, 
                  icon: CheckCircle, 
                  color: "text-green-600 dark:text-green-400" 
                },
                { 
                  label: "Tecnologías", 
                  value: `${stats.totalTechnologies}+`, 
                  icon: Globe, 
                  color: "text-purple-600 dark:text-purple-400" 
                },
                { 
                  label: "Repos públicos", 
                  value: `${stats.publicRepos}+`, 
                  icon: Activity, 
                  color: "text-orange-600 dark:text-orange-400" 
                },
              ].map((stat, index) => (
                <ScrollAnimation 
                  key={stat.label} 
                  animation="scaleIn" 
                  delay={800 + (index * 100)}
                >
                  <Card className="text-center border-0 bg-background/50 backdrop-blur shadow-lg dark:bg-background/20 dark:shadow-primary/5">
                    <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
                      <stat.icon className={`h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 ${stat.color}`} aria-hidden />
                      <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </ScrollAnimation>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeIn" delay={1200}>
            <div className="flex items-center flex-wrap gap-3 md:gap-4 justify-center text-sm text-muted-foreground px-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" aria-hidden />
                <span className="text-xs sm:text-sm">{personalInfo.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Coffee className="h-4 w-4 text-primary flex-shrink-0" aria-hidden />
                <span className="text-xs sm:text-sm">{personalInfo.availability}</span>
              </div>
              {mobility && (
                <>
                  {"travel" in mobility && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                      Viajar: {mobility.travel ? "Sí" : "No"}
                    </Badge>
                  )}
                  {"relocation" in mobility && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                      Reubicación: {mobility.relocation ? "Sí" : "No"}
                    </Badge>
                  )}
                </>
              )}
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slideUp" delay={1400}>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 px-4">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg w-full sm:w-auto">
                <Link href="#projects">
                  <Rocket className="h-4 w-4 mr-2" aria-hidden />
                  Ver proyectos
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-primary/20 hover:bg-primary/5 bg-transparent w-full sm:w-auto">
                <Link href="#contact">Contacto</Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
