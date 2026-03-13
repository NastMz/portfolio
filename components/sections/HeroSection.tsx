"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/scroll-animation"
import {
  Server,
  Globe,
  Database,
  GitBranch,
  MapPin,
  Coffee,
  Rocket,
  Github,
  Linkedin,
  Download,
} from "lucide-react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"

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
    github?: string
    linkedin?: string
    mobility?: Mobility
  }
  highlights?: readonly string[]
}

export function HeroSection({ personalInfo, highlights = [] }: HeroSectionProps) {
  const t = useTranslations('Hero')
  const nav = useTranslations('Nav')
  const locale = useLocale()
  const mobility = personalInfo.mobility

  const cvFileName = locale === 'es' ? 'CV_Kevin_Martinez_ES.pdf' : 'CV_Kevin_Martinez_EN.pdf'
  const cvPath = `/cv/${cvFileName}`

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = cvPath
    link.download = cvFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const highlightCards = [
    { icon: Globe, color: "text-blue-600 dark:text-blue-400" },
    { icon: Database, color: "text-purple-600 dark:text-purple-400" },
    { icon: GitBranch, color: "text-green-600 dark:text-green-400" },
    { icon: Github, color: "text-orange-600 dark:text-orange-400" },
  ] as const

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid-pattern text-primary/15" />
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent px-2 pb-2">
                {personalInfo.title}
              </h1>
              <p className="mx-auto max-w-[650px] md:max-w-[750px] text-muted-foreground text-base sm:text-lg md:text-xl px-4">
                {personalInfo.description}
              </p>
            </div>
          </ScrollAnimation>

          {/* Highlights */}
          {highlights.length > 0 && (
            <ScrollAnimation animation="slideUp" delay={600}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl px-4">
                {highlights.slice(0, 4).map((highlight, index) => {
                  const meta = highlightCards[index] ?? highlightCards[0]
                  const Icon = meta.icon

                  return (
                    <ScrollAnimation
                      key={`highlight-${index}`}
                      animation="scaleIn"
                      delay={800 + (index * 100)}
                    >
                      <Card className="border-0 bg-background/50 backdrop-blur shadow-lg dark:bg-background/20 dark:shadow-primary/5 h-full">
                        <CardContent className="pt-4 md:pt-6 px-4 md:px-6 flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-background/60 border border-primary/10 flex-shrink-0">
                            <Icon className={`h-5 w-5 ${meta.color}`} aria-hidden />
                          </div>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-left">
                            {highlight}
                          </p>
                        </CardContent>
                      </Card>
                    </ScrollAnimation>
                  )
                })}
              </div>
            </ScrollAnimation>
          )}

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
                      {t('mobility.travel')}: {mobility.travel ? t('mobility.yes') : t('mobility.no')}
                    </Badge>
                  )}
                  {"relocation" in mobility && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                       {t('mobility.relocation')}: {mobility.relocation ? t('mobility.yes') : t('mobility.no')}
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
                  {t('actions.viewWork')}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-primary/20 hover:bg-primary/5 bg-transparent w-full sm:w-auto">
                <Link href="#contact">{t('actions.contact')}</Link>
              </Button>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeIn" delay={1550}>
            <div className="flex flex-wrap items-center justify-center gap-2 px-4">
              {personalInfo.github && (
                <Button variant="outline" size="sm" asChild className="border-primary/20 hover:bg-primary/5 bg-transparent">
                  <Link href={personalInfo.github} target="_blank" rel="noreferrer noopener">
                    <Github className="h-4 w-4 mr-2" aria-hidden />
                    GitHub
                  </Link>
                </Button>
              )}
              {personalInfo.linkedin && (
                <Button variant="outline" size="sm" asChild className="border-primary/20 hover:bg-primary/5 bg-transparent">
                  <Link href={personalInfo.linkedin} target="_blank" rel="noreferrer noopener">
                    <Linkedin className="h-4 w-4 mr-2" aria-hidden />
                    LinkedIn
                  </Link>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadCV}
                className="border-primary/20 hover:bg-primary/5 bg-transparent"
              >
                <Download className="h-4 w-4 mr-2" aria-hidden />
                {nav('downloadCV')}
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
