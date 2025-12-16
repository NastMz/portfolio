import portfolioDataEn from '@/data/portfolio-en.json'
import portfolioDataEs from '@/data/portfolio-es.json'

export interface PersonalInfo {
  name: string
  title: string
  description: string
  location: string
  email: string
  phone: string
  github: string
  linkedin: string
  availability: string
  mobility?: {
    travel?: boolean
    relocation?: boolean
    vehicle?: boolean
  }
}

export interface Skill {
  id: string
  name: string
  category: string
  experience: string
  projects: string
  icon: string
}

export type IconName =
  | "Shield"
  | "Zap"
  | "Users"
  | "Activity"
  | "Clock"
  | "File"
  | "Package"
  | "Layers"
  | "Terminal"
  | "Globe"

export interface Project {
  id: string
  title: string
  description?: string
  tech?: string[]
  categories?: {
    languages?: string[]
    frameworks?: string[]
    libraries?: string[]
    databases?: string[]
    devops?: string[]
    tools?: string[]
    styling?: string[]
    protocols?: string[]
    concepts?: string[]
    patterns?: string[]
    algorithms?: string[]
    web?: string[]
    type?: string
  }
  github?: string
  gradient?: string
  demo?: string
  priority?: "featured" | "key" | "other"
  metrics?: Array<{
    label: string
    value: string
    icon?: IconName
  }>
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  location: string
  achievements?: string[]
  color?: string
}

export interface Education {
  id: string
  title: string
  institution: string
  period: string
}

export interface Language {
  language: string
  level: string
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  certifications: string[]
  languages: Language[]
}

import { defaultLocale } from '@/i18n/config'

export function getPortfolioData(locale: string = defaultLocale): PortfolioData {
  return (locale === 'es' ? portfolioDataEs : portfolioDataEn) as PortfolioData
}

export function getPersonalInfo(locale: string = defaultLocale): PersonalInfo {
  return getPortfolioData(locale).personalInfo
}

export function getSkills(locale: string = defaultLocale): Skill[] {
  return getPortfolioData(locale).skills
}

export function getProjects(locale: string = defaultLocale): Project[] {
  return getPortfolioData(locale).projects
}

export function getExperience(locale: string = defaultLocale): Experience[] {
  return getPortfolioData(locale).experience
}

export function getEducation(locale: string = defaultLocale): Education[] {
  return getPortfolioData(locale).education
}

export function getCertifications(locale: string = defaultLocale): string[] {
  return getPortfolioData(locale).certifications
}

export function getLanguages(locale: string = defaultLocale): Language[] {
  return getPortfolioData(locale).languages
}

// Organizar skills por categoría
export function getSkillsByCategory(locale: string = defaultLocale): Record<string, Skill[]> {
  const skills = getSkills(locale)
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)
}

// Calculate dynamic stats
export function getYearsOfExperience(locale: string = defaultLocale): number {
  const experience = getExperience(locale)
  if (experience.length === 0) return 0
  
  // Find the earliest start date
  const startDates = experience.map(exp => {
    const periodParts = exp.period.toLowerCase().split(' – ')
    const startPart = periodParts[0].trim()
    
    // Extract start year (format: "month year" or "year")
    const yearRegex = /(\d{4})/
    const match = yearRegex.exec(startPart)
    return match ? parseInt(match[1]) : new Date().getFullYear()
  })
  
  const earliestYear = Math.min(...startDates)
  const currentYear = new Date().getFullYear()
  
  return currentYear - earliestYear
}

export function getTotalProjects(locale: string = defaultLocale): number {
  return getProjects(locale).length
}

export function getTotalTechnologies(locale: string = defaultLocale): number {
  return getSkills(locale).length
}

export function getPublicRepos(locale: string = defaultLocale): number {
  const projects = getProjects(locale)
  return projects.filter(project => project.github).length
}

// Function to get additional optional stats
export function getAdditionalStats(locale: string = defaultLocale) {
  const projects = getProjects(locale)
  const experience = getExperience(locale)
  
  return {
    // Stats by skill category
    skillCategories: Object.keys(getSkillsByCategory(locale)).length,
    
    // Unique languages/frameworks
    uniqueTechnologies: [...new Set(
      projects.flatMap(p => p.tech || [])
    )].length,
    
    // Projects with live demo
    projectsWithDemo: projects.filter(p => p.demo).length,
    
    // More granular experience years
    experienceMonths: calculateExperienceInMonths(experience),
    
    // Companies worked at
    companiesWorked: [...new Set(experience.map(exp => exp.company))].length,
    
    // Open source vs private projects
    openSourceProjects: projects.filter(p => p.github).length,
    
    // Technologies by category
    technologiesByCategory: Object.entries(getSkillsByCategory(locale)).reduce((acc, [category, skills]) => {
      acc[category] = skills.length
      return acc
    }, {} as Record<string, number>)
  }
}

function calculateExperienceInMonths(experience: Experience[]): number {
  const currentDate = new Date()
  let totalMonths = 0
  
  experience.forEach(exp => {
    const periodParts = exp.period.toLowerCase().split(' – ')
    const startPart = periodParts[0].trim()
    const endPart = periodParts[1]?.trim() || 'present'
    
    // Extract start and end dates
    const startDate = parseExperienceDate(startPart)
    const endDate = (endPart === 'present' || endPart === 'presente') ? currentDate : parseExperienceDate(endPart)
    
    if (startDate && endDate) {
      const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                    (endDate.getMonth() - startDate.getMonth())
      totalMonths += Math.max(0, months)
    }
  })
  
  return totalMonths
}

function parseExperienceDate(dateStr: string): Date | null {
  const months = {
    'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
    'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11,
    // Spanish
    'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
    'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
  }
  
  const yearRegex = /(\d{4})/
  const yearMatch = yearRegex.exec(dateStr)
  
  if (!yearMatch) return null
  
  const year = parseInt(yearMatch[1])
  let month = 0
  
  // Buscar el mes en el string
  for (const [monthName, monthIndex] of Object.entries(months)) {
    if (dateStr.toLowerCase().includes(monthName)) {
      month = monthIndex
      break
    }
  }
  
  return new Date(year, month, 1)
}
