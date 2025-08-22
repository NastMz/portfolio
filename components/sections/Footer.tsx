"use client"

import { Code2 } from "lucide-react"

interface FooterProps {
  personalInfo: {
    name: string
  }
}

export function Footer({ personalInfo }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/30 dark:bg-muted/10 border-border/50">
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-semibold">{personalInfo.name}</span>
          </div>
          <p className="text-sm text-muted-foreground">Construido con Next.js, Tailwind CSS y ☕ © {year}</p>
        </div>
      </div>
    </footer>
  )
}
