"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/scroll-animation"
import { CheckCircle, MapPin } from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  period: string
  location: string
  achievements?: string[]
  color?: string
}

interface ExperienceSectionProps {
  experience: Job[]
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-16 md:py-24 bg-gradient-to-br from-muted/30 to-background dark:from-muted/10 scroll-offset">
      <div className="container mx-auto max-w-4xl px-4 lg:px-6">
        <ScrollAnimation animation="slideUp" delay={100}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">Experiencia</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>
        </ScrollAnimation>

        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />

          <div className="space-y-8 md:space-y-12">
            {experience.map((job, index) => (
              <ScrollAnimation 
                key={job.id} 
                animation="slideLeft" 
                delay={200 + (index * 150)}
              >
                <div className="relative flex items-start space-x-4 md:space-x-6">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-background border-4 border-primary/20 rounded-full flex items-center justify-center shadow-lg dark:shadow-primary/10">
                    <div className="w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r from-primary to-secondary rounded-full" />
                  </div>

                  <Card className={`flex-1 border-l-4 ${job.color || "border-l-primary"} hover:shadow-lg transition-shadow dark:hover:shadow-primary/5 border-border/50`}>
                    <CardHeader className="pb-3 md:pb-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg md:text-xl">{job.title}</CardTitle>
                          <CardDescription className="text-sm md:text-base font-medium text-primary">{job.company}</CardDescription>
                        </div>
                        <div className="text-left sm:text-right text-xs md:text-sm text-muted-foreground flex-shrink-0">
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
                        <ul className="space-y-2 md:space-y-3">
                          {job.achievements.map((achievement, i) => (
                            <li key={`${job.id}-achievement-${i}`} className="flex items-start space-x-2 md:space-x-3">
                              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mt-0.5 md:mt-1 flex-shrink-0" aria-hidden />
                              <span className="text-muted-foreground leading-relaxed text-xs md:text-sm">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
