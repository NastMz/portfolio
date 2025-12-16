"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollAnimation } from "@/components/scroll-animation"
import { 
  Database, 
  TrendingUp, 
  Shield, 
  Code2, 
  Server, 
  Layout, 
  GitBranch, 
  Container, 
  Cloud,
  Terminal,
  Cpu,
  Globe,
  Layers,
  FileCode
} from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

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

// Map specialized icons or use defaults
const ICON_MAP: Record<string, any> = {
  "C#": Code2,
  ".NET 8 / .NET Core": Server,
  "Backend Architecture": Layers,
  "Systems Design": Cpu,
  "Software Architecture": Layers,
  "Clean Architecture": Shield,
  "REST APIs": Globe,
  "SQL": Database,
  "Entity Framework Core": Database,
  "GitHub Actions / CI/CD": GitBranch,
  "Docker": Container,
  "Azure": Cloud,
  "TypeScript": FileCode,
  "React": Code2,
  "Next.js": Globe,
  "Python": Terminal,
  "PHP": Code2,
  "Java": Code2,
  // Default fallbacks
  "Core Backend": Server,
  "DevOps & Tooling": Container,
  "Also Used": Layout
}

export function SkillsSection({ skillsByCategory }: SkillsSectionProps) {
  const t = useTranslations('Skills')
  const categories = Object.keys(skillsByCategory)

  const getIcon = (name: string) => {
    const Icon = ICON_MAP[name] || Code2
    return <Icon className="w-5 h-5" />
  }

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background" />
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto max-w-5xl px-4 lg:px-6">
        <ScrollAnimation animation="slideUp" delay={100}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">{t('title')}</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>
        </ScrollAnimation>

        <div className="space-y-12">
          {Object.entries(skillsByCategory).map(([category, skills], groupIndex) => (
            <div key={category} className="space-y-6">
              <ScrollAnimation animation="fadeIn" delay={100 + (groupIndex * 100)}>
                <h3 className="text-xl font-semibold flex items-center gap-3 text-muted-foreground/80">
                  <span className="w-8 h-[1px] bg-border" />
                  {category}
                  <span className="flex-1 h-[1px] bg-border" />
                </h3>
              </ScrollAnimation>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <ScrollAnimation 
                    key={`${category}-${skill.name}`}
                    animation="scaleIn" 
                    delay={150 + (index * 50)} 
                  >
                    <Card className="group flex items-center gap-4 p-3 border-border/40 bg-background/50 backdrop-blur-sm hover:bg-background/80 hover:shadow-md hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300">
                      <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300 shrink-0">
                        {getIcon(skill.name)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm md:text-base leading-none mb-1.5 group-hover:text-primary transition-colors truncate">
                          {skill.name}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {skill.experience}
                        </p>
                      </div>
                    </Card>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
