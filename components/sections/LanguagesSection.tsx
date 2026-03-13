"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Languages as LanguagesIcon } from "lucide-react"
import { useTranslations } from "next-intl"

interface Language {
  language: string
  level: string
}

interface LanguagesSectionProps {
  readonly languages: readonly Language[]
}

export function LanguagesSection({ languages }: LanguagesSectionProps) {
  const t = useTranslations("Languages")

  if (!Array.isArray(languages) || languages.length === 0) return null

  return (
    <section id="languages" className="relative py-16 md:py-24 scroll-offset px-4 lg:px-6 bg-muted/30 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern text-primary/20 pointer-events-none" />
      <div className="container relative mx-auto max-w-3xl">
        <ScrollAnimation animation="slideUp" delay={100}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">{t("title")}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 text-sm md:text-base">{t("subtitle")}</p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {languages.map((lang, index) => (
            <ScrollAnimation key={`${lang.language}-${lang.level}`} animation="scaleIn" delay={200 + (index * 100)}>
              <Card className="border-border/50 hover:shadow-xl transition-all duration-300 dark:hover:shadow-primary/5 bg-background/80 backdrop-blur-sm group">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <LanguagesIcon className="h-8 w-8 text-primary" aria-hidden />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl font-bold">{lang.language}</div>
                    <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10">
                      {lang.level}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

