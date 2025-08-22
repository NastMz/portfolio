"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Code2, Github, Linkedin } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  personalInfo: {
    name: string
    github?: string
    linkedin?: string
  }
}

export function Header({ personalInfo }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="#top" className="mr-6 flex items-center space-x-2" aria-label="Inicio">
            <div className="relative">
              <Code2 className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <span className="font-bold text-lg">{personalInfo.name}</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="#about" className="transition-colors hover:text-primary">Sobre mí</Link>
          <Link href="#skills" className="transition-colors hover:text-primary">Habilidades</Link>
          <Link href="#projects" className="transition-colors hover:text-primary">Proyectos</Link>
          <Link href="#experience" className="transition-colors hover:text-primary">Experiencia</Link>
          <Link href="#contact" className="transition-colors hover:text-primary">Contacto</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          {personalInfo.github && (
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10" aria-label="GitHub">
              <Link href={personalInfo.github} target="_blank" rel="noreferrer noopener">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          )}
          {personalInfo.linkedin && (
            <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10" aria-label="LinkedIn">
              <Link href={personalInfo.linkedin} target="_blank" rel="noreferrer noopener">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
