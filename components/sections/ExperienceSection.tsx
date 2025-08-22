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
    <section id="experience" className="py-24 bg-gradient-to-br from-muted/30 to-background dark:from-muted/10 scroll-offset">
      <div className="container mx-auto max-w-4xl">
        <ScrollAnimation animation="slideUp" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Experiencia</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>
        </ScrollAnimation>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />

          <div className="space-y-12">
            {experience.map((job, index) => (
              <ScrollAnimation 
                key={job.id} 
                animation="slideLeft" 
                delay={200 + (index * 150)}
              >
                <div className="relative flex items-start space-x-6">
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
                          {job.achievements.map((achievement, i) => (
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
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
