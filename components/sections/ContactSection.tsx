"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Mail, Github, Linkedin } from "lucide-react"
import Link from "next/link"

interface ContactSectionProps {
  personalInfo: {
    email?: string
    github?: string
    linkedin?: string
  }
}

export function ContactSection({ personalInfo }: ContactSectionProps) {
  return (
    <section id="contact" className="container mx-auto py-16 md:py-24 scroll-offset px-4 lg:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <ScrollAnimation animation="slideUp" delay={100}>
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">Conversemos</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground text-base md:text-lg">Abierto a nuevas oportunidades y colaboraciones.</p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="scaleIn" delay={300}>
          <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-0 shadow-lg dark:from-primary/10 dark:to-secondary/10">
            <div className="flex justify-center flex-col sm:flex-row flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
              {personalInfo.email && (
                <Button size="lg" asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg w-full sm:w-auto">
                  <Link href={`mailto:${personalInfo.email}`}>
                    <Mail className="h-4 w-4 md:h-5 md:w-5 mr-2" aria-hidden />
                    Enviar correo
                  </Link>
                </Button>
              )}
              {personalInfo.linkedin && (
                <Button variant="outline" size="lg" asChild className="border-primary/20 hover:bg-primary/5 bg-transparent w-full sm:w-auto">
                  <Link href={personalInfo.linkedin} target="_blank" rel="noreferrer noopener">
                    <Linkedin className="h-4 w-4 md:h-5 md:w-5 mr-2" aria-hidden />
                    LinkedIn
                  </Link>
                </Button>
              )}
              {personalInfo.github && (
                <Button variant="outline" size="lg" asChild className="border-primary/20 hover:bg-primary/5 bg-transparent w-full sm:w-auto">
                  <Link href={personalInfo.github} target="_blank" rel="noreferrer noopener">
                    <Github className="h-4 w-4 md:h-5 md:w-5 mr-2" aria-hidden />
                    GitHub
                  </Link>
                </Button>
              )}
            </div>

            <div className="text-xs md:text-sm text-muted-foreground">
              <p>Suele responder en 24 horas</p>
            </div>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  )
}
