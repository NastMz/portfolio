"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [displayTheme, setDisplayTheme] = useState<string | undefined>(undefined)
  const [isAnimating, setIsAnimating] = useState(false)

  // Inicializar el componente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Sincronizar displayTheme con resolvedTheme solo cuando no estamos animando
  useEffect(() => {
    if (mounted && !isAnimating) {
      setDisplayTheme(resolvedTheme)
    }
  }, [resolvedTheme, mounted, isAnimating])

  const toggleTheme = () => {
    if (isAnimating || !mounted) return // Prevenir múltiples clicks
    
    setIsAnimating(true)
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    
    // Cambiar displayTheme inmediatamente para iniciar la animación
    setDisplayTheme(newTheme)
    
    // Cambiar el tema real después de la mitad de la animación
    const themeTimeout = setTimeout(() => {
      setTheme(newTheme)
    }, 350) // Mitad de 700ms
    
    // Resetear el estado de animación
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false)
    }, 700) // Duración completa de la animación

    // Cleanup en caso de desmontaje
    return () => {
      clearTimeout(themeTimeout)
      clearTimeout(animationTimeout)
    }
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="hover:bg-primary/10 relative" disabled>
        <Sun className="h-5 w-5 absolute transition-all duration-700 ease-out rotate-0 scale-100 opacity-100" />
        <Moon className="h-5 w-5 absolute transition-all duration-700 ease-out rotate-180 scale-0 opacity-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const currentTheme = displayTheme || resolvedTheme

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      disabled={isAnimating}
      className={`hover:bg-primary/10 transition-colors relative overflow-hidden ${
        isAnimating ? 'cursor-wait' : 'cursor-pointer'
      }`}
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun className={`h-5 w-5 absolute inset-0 m-auto transition-all duration-700 ease-out transform-gpu ${
        currentTheme === "dark" 
          ? "rotate-180 scale-75 opacity-0" 
          : "rotate-0 scale-100 opacity-100"
      }`} />
      <Moon className={`h-5 w-5 absolute inset-0 m-auto transition-all duration-700 ease-out transform-gpu ${
        currentTheme === "dark" 
          ? "rotate-0 scale-100 opacity-100" 
          : "rotate-180 scale-75 opacity-0"
      }`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
