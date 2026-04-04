import {
  getHighlights,
  getPersonalInfo,
  getSkillsByCategory,
  getLanguages,
  getProjects,
  getExperience,
} from '@/lib/portfolio-data'
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
} from '@/components/sections'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateStructuredData } from '@/components/seo/metadata'
import { getProfileImageUrl } from '@/lib/site-config'
import type { Locale } from '@/i18n/config'

interface V1PortfolioPageProps {
  locale: Locale
}

export function V1PortfolioPage({ locale }: V1PortfolioPageProps) {
  const personalInfo = getPersonalInfo(locale)
  const highlights = getHighlights(locale)
  const skillsByCategory = getSkillsByCategory(locale)
  const languages = getLanguages(locale)
  const projects = getProjects(locale)
  const experience = getExperience(locale)

  const profileImage = getProfileImageUrl(personalInfo.profileImage)

  const structuredData = generateStructuredData({
    locale,
    version: 'v1',
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
