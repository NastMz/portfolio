"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Code2, Database, Cloud, Users, TrendingUp, Shield } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="container mx-auto py-16 md:py-24 scroll-offset px-4 lg:px-6">
      <div className="mx-auto max-w-4xl">
        <ScrollAnimation animation="slideUp" delay={100}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">About me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <ScrollAnimation animation="slideLeft" delay={200}>
            <div className="space-y-4 md:space-y-6">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                I&apos;m a backend engineer specializing in .NET and C#, focused on building APIs, modular backends, and clean architecture. 
                I work with SQL databases and practical DevOps tools like Docker and CI/CD pipelines to deliver reliable systems.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                I care about maintainability, modularity, and clear architecture more than just shipping code. I enjoy code reviews, 
                documentation, and sharing knowledge with teams. I use AI-assisted development tools like Copilot, but I always review 
                and validate the code manually—design and validation remain my responsibility.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                <Badge variant="secondary" className="px-2 md:px-3 py-1 bg-primary/10 text-primary border-primary/20 text-xs">
                  <Code2 className="h-3 w-3 mr-1" /> Clean Architecture
                </Badge>
                <Badge variant="secondary" className="px-2 md:px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 text-xs">
                  <Database className="h-3 w-3 mr-1" /> Backend Systems
                </Badge>
                <Badge variant="secondary" className="px-2 md:px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-xs">
                  <Cloud className="h-3 w-3 mr-1" /> .NET & C#
                </Badge>
                <Badge variant="secondary" className="px-2 md:px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 text-xs">
                  <Users className="h-3 w-3 mr-1" /> Systems Design
                </Badge>
                <Badge variant="secondary" className="px-2 md:px-3 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20 text-xs">
                  <Code2 className="h-3 w-3 mr-1" /> AI-Assisted Development
                </Badge>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slideRight" delay={400}>
            <Card className="p-4 md:p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-0 shadow-lg dark:from-primary/10 dark:to-secondary/10">
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-primary" aria-hidden />
                  </div>
                  <div>
                    <div className="font-semibold text-sm md:text-base">Modular design</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Systems built for long-term maintainability</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" aria-hidden />
                  </div>
                  <div>
                    <div className="font-semibold text-sm md:text-base">Code quality</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Testing, reviews, and validation</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 md:h-6 md:w-6 text-purple-600 dark:text-purple-400" aria-hidden />
                  </div>
                  <div>
                    <div className="font-semibold text-sm md:text-base">Knowledge sharing</div>
                    <div className="text-xs md:text-sm text-muted-foreground">Mentoring, documentation, and reviews</div>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
