import portfolioData from '@/data/portfolio.json'

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

export function getPortfolioData(): PortfolioData {
  return portfolioData as PortfolioData
}

export function getPersonalInfo(): PersonalInfo {
  return portfolioData.personalInfo as PersonalInfo
}

export function getSkills(): Skill[] {
  return portfolioData.skills as Skill[]
}

export function getProjects(): Project[] {
  return portfolioData.projects as Project[]
}

export function getExperience(): Experience[] {
  return portfolioData.experience as Experience[]
}

export function getEducation(): Education[] {
  return portfolioData.education as Education[]
}

export function getCertifications(): string[] {
  return portfolioData.certifications as string[]
}

export function getLanguages(): Language[] {
  return portfolioData.languages as Language[]
}

// Organizar skills por categoría
export function getSkillsByCategory(): Record<string, Skill[]> {
  const skills = getSkills()
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)
}

// Calculate dynamic stats
export function getYearsOfExperience(): number {
  const experience = getExperience()
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

export function getTotalProjects(): number {
  return getProjects().length
}

export function getTotalTechnologies(): number {
  return getSkills().length
}

export function getPublicRepos(): number {
  const projects = getProjects()
  return projects.filter(project => project.github).length
}

// Function to get additional optional stats
export function getAdditionalStats() {
  const projects = getProjects()
  const experience = getExperience()
  
  return {
    // Stats by skill category
    skillCategories: Object.keys(getSkillsByCategory()).length,
    
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
    technologiesByCategory: Object.entries(getSkillsByCategory()).reduce((acc, [category, skills]) => {
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
    const endDate = endPart === 'present' ? currentDate : parseExperienceDate(endPart)
    
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
    'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
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
