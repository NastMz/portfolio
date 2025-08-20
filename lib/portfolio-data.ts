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
  description: string
  tech: string[]
  github: string
  gradient: string
  demo?: string
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
