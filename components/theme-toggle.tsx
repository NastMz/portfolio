"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [displayTheme, setDisplayTheme] = useState<string | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
    if (mounted) {
      setDisplayTheme(resolvedTheme)
    }
  }, [resolvedTheme, mounted])

  const toggleTheme = () => {
    // Primero cambia el displayTheme para iniciar la animación de salida
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    setDisplayTheme(newTheme)
    
    // Después de que la animación esté a la mitad, cambia el tema real
    setTimeout(() => {
      setTheme(newTheme)
    }, 150)
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
      className="hover:bg-primary/10 transition-colors relative overflow-hidden"
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
