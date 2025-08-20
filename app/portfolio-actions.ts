"use server"

import {
  updatePersonalInfo,
  addSkill,
  updateSkill,
  deleteSkill,
  addProject,
  updateProject,
  deleteProject,
  addExperience,
  updateExperience,
  deleteExperience,
  getPortfolioData,
  type PersonalInfo,
  type Skill,
  type Project,
  type Experience,
} from "@/lib/portfolio-db"
import { revalidatePath } from "next/cache"

// Personal Info Actions
export async function updatePersonalInfoAction(formData: FormData) {
  const personalInfo: PersonalInfo = {
    name: formData.get("name") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    location: formData.get("location") as string,
    email: formData.get("email") as string,
    github: formData.get("github") as string,
    linkedin: formData.get("linkedin") as string,
    availability: formData.get("availability") as string,
  }

  try {
    await updatePersonalInfo(personalInfo)
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Failed to update personal info" }
  }
}

// Skill Actions
export async function addSkillAction(formData: FormData) {
  const skill: Omit<Skill, "id"> = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    experience: formData.get("experience") as string,
    projects: formData.get("projects") as string,
    icon: formData.get("icon") as string,
  }

  try {
    await addSkill(skill)
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Failed to add skill" }
  }
}

export async function updateSkillAction(id: string, formData: FormData) {
  const skill: Omit<Skill, "id"> = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    experience: formData.get("experience") as string,
    projects: formData.get("projects") as string,
    icon: formData.get("icon") as string,
  }

  try {
    await updateSkill(id, skill)
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Failed to update skill" }
  }
}

export async function deleteSkillAction(id: string) {
  try {
    await deleteSkill(id)
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete skill" }
  }
}

// Project Actions
export async function addProjectAction(formData: FormData) {
  const techString = formData.get("tech") as string
  const metricsString = formData.get("metrics") as string

  const project: Omit<Project, "id"> = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    tech: techString.split(",").map((t) => t.trim()),
    metrics: JSON.parse(metricsString || "[]"),
    github: formData.get("github") as string,
    demo: formData.get("demo") as string,
    gradient: formData.get("gradient") as string,
  }

  try {
    await addProject(project)
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Failed to add project" }
  }
}

export async function updateProjectAction(id: string, formData: FormData) {
  const techString = formData.get("tech") as string
  const metricsString = formData.get("metrics") as string

  const project: Omit<Project, "id"> = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    tech: techString.split(",").map((t) => t.trim()),
    metrics: JSON.parse(metricsString || "[]"),
    github: formData.get("github") as string,
    demo: formData.get("demo") as string,
    gradient: formData.get("gradient") as string,
  }

  try {
    await updateProject(id, project)
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Failed to update project" }
  }
}

export async function deleteProjectAction(id: string) {
  try {
    await deleteProject(id)
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete project" }
  }
}

// Experience Actions
export async function addExperienceAction(formData: FormData) {
  const achievementsString = formData.get("achievements") as string

  const experience: Omit<Experience, "id"> = {
    title: formData.get("title") as string,
    company: formData.get("company") as string,
    period: formData.get("period") as string,
    location: formData.get("location") as string,
    achievements: achievementsString.split("\n").filter((a) => a.trim()),
    color: formData.get("color") as string,
  }

  try {
    await addExperience(experience)
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Failed to add experience" }
  }
}

export async function updateExperienceAction(id: string, formData: FormData) {
  const achievementsString = formData.get("achievements") as string

  const experience: Omit<Experience, "id"> = {
    title: formData.get("title") as string,
    company: formData.get("company") as string,
    period: formData.get("period") as string,
    location: formData.get("location") as string,
    achievements: achievementsString.split("\n").filter((a) => a.trim()),
    color: formData.get("color") as string,
  }

  try {
    await updateExperience(id, experience)
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Failed to update experience" }
  }
}

export async function deleteExperienceAction(id: string) {
  try {
    await deleteExperience(id)
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete experience" }
  }
}

export async function fetchPortfolioData() {
  return await getPortfolioData()
}
