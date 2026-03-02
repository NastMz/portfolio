import {
  getHighlights,
  getPersonalInfo,
  getSkillsByCategory,
  getLanguages,
  getProjects,
  getExperience,
} from "@/lib/portfolio-data"
import {
  Header,
  HeroSection,
  AboutSection,
  SkillsSection,
  LanguagesSection,
  ProjectsSection,
  ExperienceSection,
  ContactSection,
  Footer,
} from "@/components/sections"
import { setRequestLocale } from 'next-intl/server'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateStructuredData } from '@/components/seo/metadata'
import { getProfileImageUrl } from '@/lib/site-config'

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
  const highlights = getHighlights(locale)
  const skillsByCategory = getSkillsByCategory(locale)
  const languages = getLanguages(locale)
  const projects = getProjects(locale)
  const experience = getExperience(locale)

  // Generar structured data
  const profileImage = getProfileImageUrl(personalInfo.profileImage)

  const structuredData = generateStructuredData({
    locale,
    name: personalInfo.name,
    title: personalInfo.title,
    description: personalInfo.description,
    image: profileImage,
    email: personalInfo.email,
    github: personalInfo.github,
    linkedin: personalInfo.linkedin,
    location: personalInfo.location,
  })

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-background transition-colors duration-300 enable-sticky" id="top">
        <Header personalInfo={personalInfo} />
        <main className="prevent-overflow">
          <HeroSection personalInfo={personalInfo} highlights={highlights} />
          <AboutSection profileImage={personalInfo.profileImage} />
          <SkillsSection skillsByCategory={skillsByCategory} />
          <LanguagesSection languages={languages} />
          <ProjectsSection projects={projects} />
          <ExperienceSection experience={experience} />
          <ContactSection personalInfo={personalInfo} />
        </main>
        <Footer personalInfo={personalInfo} />
      </div>
    </>
  )
}
