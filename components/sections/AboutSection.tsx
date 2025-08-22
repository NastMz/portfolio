"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Code2, Database, Cloud, Users, TrendingUp, Shield } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="container mx-auto py-24 scroll-offset">
      <div className="mx-auto max-w-4xl">
        <ScrollAnimation animation="slideUp" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Sobre mí</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollAnimation animation="slideLeft" delay={200}>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Soy desarrollador backend especializado en .NET, con foco en APIs escalables, optimización de bases de
                datos y automatización de despliegues. Me interesa construir soluciones prácticas, mantenibles y con
                buen performance.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                También tengo experiencia con Node.js y Python. Me gusta acompañar a equipos en buenas prácticas,
                revisión de código y diseño limpio.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
                  <Code2 className="h-3 w-3 mr-1" /> Clean Architecture
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                  <Database className="h-3 w-3 mr-1" /> SQL / EF / Dapper
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                  <Cloud className="h-3 w-3 mr-1" /> CI/CD & Docker
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                  <Users className="h-3 w-3 mr-1" /> Team Lead
                </Badge>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slideRight" delay={400}>
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-0 shadow-lg dark:from-primary/10 dark:to-secondary/10">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" aria-hidden />
                  </div>
                  <div>
                    <div className="font-semibold">Orientación a rendimiento</div>
                    <div className="text-sm text-muted-foreground">Optimización de consultas y tiempos de respuesta</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" aria-hidden />
                  </div>
                  <div>
                    <div className="font-semibold">Confiabilidad</div>
                    <div className="text-sm text-muted-foreground">Buenas prácticas, pruebas y observabilidad</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" aria-hidden />
                  </div>
                  <div>
                    <div className="font-semibold">Colaboración</div>
                    <div className="text-sm text-muted-foreground">Mentoría y revisión de código</div>
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
