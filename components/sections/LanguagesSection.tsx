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
    <section id="languages" className="container mx-auto py-16 md:py-24 scroll-offset px-4 lg:px-6">
      <div className="mx-auto max-w-4xl">
        <ScrollAnimation animation="slideUp" delay={100}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">{t("title")}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 text-sm md:text-base">{t("subtitle")}</p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((lang, index) => (
            <ScrollAnimation key={`${lang.language}-${lang.level}`} animation="scaleIn" delay={200 + (index * 100)}>
              <Card className="border-border/50 hover:shadow-lg transition-shadow dark:hover:shadow-primary/5">
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <LanguagesIcon className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{lang.language}</div>
                      <div className="text-sm text-muted-foreground truncate">{lang.level}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-primary/20 flex-shrink-0">
                    {lang.level}
                  </Badge>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

