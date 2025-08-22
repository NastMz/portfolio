"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Code2, Github, Linkedin, Menu, X } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  readonly personalInfo: {
    readonly name: string
    readonly github?: string
    readonly linkedin?: string
  }
}

export function Header({ personalInfo }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border/50" style={{ position: 'sticky' }}>
      <div className="container mx-auto">
        {/* Desktop Header */}
        <div className="flex h-16 items-center px-4 lg:px-6">
          <div className="mr-4 flex">
            <Link href="#top" className="mr-6 flex items-center space-x-2" aria-label="Inicio">
              <div className="relative">
                <Code2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <span className="font-bold text-base sm:text-lg truncate max-w-[150px] sm:max-w-none">{personalInfo.name}</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="#about" className="transition-colors hover:text-primary">Sobre mí</Link>
            <Link href="#skills" className="transition-colors hover:text-primary">Habilidades</Link>
            <Link href="#projects" className="transition-colors hover:text-primary">Proyectos</Link>
            <Link href="#experience" className="transition-colors hover:text-primary">Experiencia</Link>
            <Link href="#contact" className="transition-colors hover:text-primary">Contacto</Link>
          </nav>
          
          <div className="flex flex-1 items-center justify-end space-x-2">
            <ThemeToggle />
            {personalInfo.github && (
              <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 hidden sm:flex" aria-label="GitHub">
                <Link href={personalInfo.github} target="_blank" rel="noreferrer noopener">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {personalInfo.linkedin && (
              <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 hidden sm:flex" aria-label="LinkedIn">
                <Link href={personalInfo.linkedin} target="_blank" rel="noreferrer noopener">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="flex flex-col space-y-4 p-4">
              <Link 
                href="#about" 
                className="text-sm font-medium transition-colors hover:text-primary py-2"
                onClick={closeMenu}
              >
                Sobre mí
              </Link>
              <Link 
                href="#skills" 
                className="text-sm font-medium transition-colors hover:text-primary py-2"
                onClick={closeMenu}
              >
                Habilidades
              </Link>
              <Link 
                href="#projects" 
                className="text-sm font-medium transition-colors hover:text-primary py-2"
                onClick={closeMenu}
              >
                Proyectos
              </Link>
              <Link 
                href="#experience" 
                className="text-sm font-medium transition-colors hover:text-primary py-2"
                onClick={closeMenu}
              >
                Experiencia
              </Link>
              <Link 
                href="#contact" 
                className="text-sm font-medium transition-colors hover:text-primary py-2"
                onClick={closeMenu}
              >
                Contacto
              </Link>
              
              {/* Mobile Social Links */}
              <div className="flex space-x-2 pt-4 border-t">
                {personalInfo.github && (
                  <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10" aria-label="GitHub">
                    <Link href={personalInfo.github} target="_blank" rel="noreferrer noopener">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Link>
                  </Button>
                )}
                {personalInfo.linkedin && (
                  <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10" aria-label="LinkedIn">
                    <Link href={personalInfo.linkedin} target="_blank" rel="noreferrer noopener">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
