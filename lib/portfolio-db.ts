import { promises as fs } from "fs"
import path from "path"

export interface Skill {
  id: string
  name: string
  category: string
  experience: string
  projects: string
  icon: string
}

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  metrics: {
    label: string
    value: string
    icon: string
  }[]
  github: string
  demo: string
  gradient: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  location: string
  achievements: string[]
  color: string
}

export interface PersonalInfo {
  name: string
  title: string
  description: string
  location: string
  email: string
  github: string
  linkedin: string
  availability: string
}

export interface PortfolioData {
  personalInfo: PersonalInfo
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
}

const DB_PATH = path.join(process.cwd(), "data", "portfolio.json")

const defaultData: PortfolioData = {
  personalInfo: {
    name: "Alex Johnson",
    title: "Backend Developer",
    description:
      "Building scalable, high-performance server-side applications and APIs that power modern web experiences.",
    location: "San Francisco, CA",
    email: "alex.johnson@email.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    availability: "Available for hire",
  },
  skills: [
    {
      id: "1",
      name: "Node.js",
      category: "Languages & Runtime",
      experience: "5+ years",
      projects: "25+ projects",
      icon: "🟢",
    },
    {
      id: "2",
      name: "PostgreSQL",
      category: "Databases",
      experience: "5+ years",
      projects: "Production scale",
      icon: "🐘",
    },
  ],
  projects: [
    {
      id: "1",
      title: "E-commerce API Platform",
      description:
        "Scalable microservices architecture handling 10M+ requests daily with real-time inventory management and payment processing.",
      tech: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
      metrics: [
        { label: "Uptime", value: "99.9%", icon: "Shield" },
        { label: "Response Time", value: "<200ms", icon: "Zap" },
        { label: "Daily Users", value: "500K+", icon: "Users" },
      ],
      github: "#",
      demo: "#",
      gradient: "from-blue-500 to-purple-600",
    },
  ],
  experience: [
    {
      id: "1",
      title: "Senior Backend Engineer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      location: "San Francisco, CA",
      achievements: [
        "Led migration to microservices architecture, reducing deployment time by 60%",
        "Optimized database queries resulting in 40% performance improvement",
        "Mentored 5 junior developers and established code review processes",
      ],
      color: "border-l-blue-500",
    },
  ],
}

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const data = await fs.readFile(DB_PATH, "utf8")
    return JSON.parse(data)
  } catch (error) {
    return defaultData
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  const dataDir = path.dirname(DB_PATH)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }

  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
}

export async function updatePersonalInfo(info: PersonalInfo): Promise<void> {
  const data = await getPortfolioData()
  data.personalInfo = info
  await savePortfolioData(data)
}

export async function addSkill(skill: Omit<Skill, "id">): Promise<void> {
  const data = await getPortfolioData()
  const newSkill: Skill = {
    ...skill,
    id: Date.now().toString(),
  }
  data.skills.push(newSkill)
  await savePortfolioData(data)
}

export async function updateSkill(id: string, skill: Omit<Skill, "id">): Promise<void> {
  const data = await getPortfolioData()
  const index = data.skills.findIndex((s) => s.id === id)
  if (index !== -1) {
    data.skills[index] = { ...skill, id }
    await savePortfolioData(data)
  }
}

export async function deleteSkill(id: string): Promise<void> {
  const data = await getPortfolioData()
  data.skills = data.skills.filter((s) => s.id !== id)
  await savePortfolioData(data)
}

export async function addProject(project: Omit<Project, "id">): Promise<void> {
  const data = await getPortfolioData()
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
  }
  data.projects.push(newProject)
  await savePortfolioData(data)
}

export async function updateProject(id: string, project: Omit<Project, "id">): Promise<void> {
  const data = await getPortfolioData()
  const index = data.projects.findIndex((p) => p.id === id)
  if (index !== -1) {
    data.projects[index] = { ...project, id }
    await savePortfolioData(data)
  }
}

export async function deleteProject(id: string): Promise<void> {
  const data = await getPortfolioData()
  data.projects = data.projects.filter((p) => p.id !== id)
  await savePortfolioData(data)
}

export async function addExperience(experience: Omit<Experience, "id">): Promise<void> {
  const data = await getPortfolioData()
  const newExperience: Experience = {
    ...experience,
    id: Date.now().toString(),
  }
  data.experience.push(newExperience)
  await savePortfolioData(data)
}

export async function updateExperience(id: string, experience: Omit<Experience, "id">): Promise<void> {
  const data = await getPortfolioData()
  const index = data.experience.findIndex((e) => e.id === id)
  if (index !== -1) {
    data.experience[index] = { ...experience, id }
    await savePortfolioData(data)
  }
}

export async function deleteExperience(id: string): Promise<void> {
  const data = await getPortfolioData()
  data.experience = data.experience.filter((e) => e.id !== id)
  await savePortfolioData(data)
}
