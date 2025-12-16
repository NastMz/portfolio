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
import { setRequestLocale } from 'next-intl/server';

export default async function Portfolio({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  // Obtener datos del JSON
  // Note: These functions are now synchronous but accept locale
  const personalInfo = getPersonalInfo(locale)
  const skillsByCategory = getSkillsByCategory(locale)
  const projects = getProjects(locale)
  const experience = getExperience(locale)

  // Preparar stats para el HeroSection
  const stats = {
    yearsOfExperience: getYearsOfExperience(locale),
    totalProjects: getTotalProjects(locale),
    totalTechnologies: getTotalTechnologies(locale),
    publicRepos: getPublicRepos(locale),
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 enable-sticky" id="top">
      <Header personalInfo={personalInfo} />
      <main className="prevent-overflow">
        <HeroSection personalInfo={personalInfo} stats={stats} />
        <AboutSection />
        <SkillsSection skillsByCategory={skillsByCategory} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experience={experience} />
        <ContactSection personalInfo={personalInfo} />
      </main>
      <Footer personalInfo={personalInfo} />
    </div>
  )
}
