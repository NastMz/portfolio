"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Database, TrendingUp, Shield } from "lucide-react"

interface Skill {
  id: string
  name: string
  icon: string
  experience: string
  projects: string
}

interface SkillsByCategory {
  [category: string]: Skill[]
}

interface SkillsSectionProps {
  skillsByCategory: SkillsByCategory
}

export function SkillsSection({ skillsByCategory }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-16 md:py-24 bg-gradient-to-br from-muted/30 to-background dark:from-muted/10 scroll-offset overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4 lg:px-6">
        <ScrollAnimation animation="slideUp" delay={100}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">Habilidades</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 text-sm md:text-base">Experiencia aplicada en producción</p>
          </div>
        </ScrollAnimation>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {Object.entries(skillsByCategory).map(([category, skills], index) => (
            <ScrollAnimation 
              key={category} 
              animation="slideUp" 
              delay={200 + (index * 200)}
            >
              <Card className="p-4 md:p-6 hover:shadow-lg transition-all duration-300 dark:hover:shadow-primary/5 border-border/50 h-full">
                <CardHeader className="pb-3 md:pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
                    <div className="w-1.5 md:w-2 h-6 md:h-8 bg-gradient-to-b from-primary to-secondary rounded-full flex-shrink-0" />
                    <span className="truncate">{category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="p-3 md:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors dark:bg-muted/20 dark:hover:bg-muted/30">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg md:text-xl flex-shrink-0" aria-hidden>{skill.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm md:text-base leading-tight">{skill.name}</div>
                          <div className="text-xs md:text-sm text-muted-foreground leading-tight mt-0.5">{skill.experience}</div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                          {skill.projects}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        {/* Key Highlights */}
        <ScrollAnimation animation="slideUp" delay={600}>
          <div className="mt-12 md:mt-16 grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="text-center p-4 md:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border-blue-200 dark:border-blue-800/50">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Database className="h-5 w-5 md:h-6 md:w-6 text-white" aria-hidden />
              </div>
              <h3 className="font-semibold mb-2 text-sm md:text-base leading-tight">Optimización de bases de datos</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Consultas más rápidas y eficientes en producción</p>
            </Card>

            <Card className="text-center p-4 md:p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border-green-200 dark:border-green-800/50">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-white" aria-hidden />
              </div>
              <h3 className="font-semibold mb-2 text-sm md:text-base leading-tight">Escalabilidad</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Sistemas mantenibles y listos para crecer</p>
            </Card>

            <Card className="text-center p-4 md:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border-purple-200 dark:border-purple-800/50 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-white" aria-hidden />
              </div>
              <h3 className="font-semibold mb-2 text-sm md:text-base leading-tight">Buenas prácticas</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Seguridad, testing y observabilidad</p>
            </Card>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
