"use client"

import {
  getPersonalInfo,
  getSkillsByCategory,
  getProjects,
  getExperience,
  getYearsOfExperience,
  getTotalProjects,
  getTotalTechnologies,
  getPublicRepos,
} from "@/lib/portfolio-data"
import {
  Header,
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
  Footer,
} from "@/components/sections"

export default function Portfolio() {
  // Obtener datos del JSON
  const personalInfo = getPersonalInfo()
  const skillsByCategory = getSkillsByCategory()
  const projects = getProjects()
  const experience = getExperience()

  // Preparar stats para el HeroSection
  const stats = {
    yearsOfExperience: getYearsOfExperience(),
    totalProjects: getTotalProjects(),
    totalTechnologies: getTotalTechnologies(),
    publicRepos: getPublicRepos(),
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300" id="top">
      <Header personalInfo={personalInfo} />
      <HeroSection personalInfo={personalInfo} stats={stats} />
      <AboutSection />
      <SkillsSection skillsByCategory={skillsByCategory} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experience={experience} />
      <ContactSection personalInfo={personalInfo} />
      <Footer personalInfo={personalInfo} />
    </div>
  )
}
