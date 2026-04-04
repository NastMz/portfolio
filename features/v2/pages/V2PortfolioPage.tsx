import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { loadV2Content } from '@/features/v2/content/loaders'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateStructuredData } from '@/components/seo/metadata'
import { Card, LinkButton, Nav, SectionShell } from '@/features/v2/ui'
import { getProfileImageUrl } from '@/lib/site-config'

interface V2PortfolioPageProps {
  locale: Locale
}

export async function V2PortfolioPage({ locale }: V2PortfolioPageProps) {
  const [content, t] = await Promise.all([
    loadV2Content(locale),
    getTranslations({ locale, namespace: 'V2' }),
  ])

  const structuredData = generateStructuredData({
    locale,
    version: 'v2',
    name: 'Kevin Santiago Martinez',
    title: content.hero.title,
    description: content.summary.paragraphs[0],
    image: getProfileImageUrl('/images/profile.jpg'),
    email: 'ksmartinez23@outlook.com',
    github: 'https://github.com/NastMz',
    linkedin: 'https://www.linkedin.com/in/ksmartinez23/',
    location: 'Duitama, Boyacá · Colombia',
    projects: content.projects.items.map((project) => ({
      name: project.title,
      description: project.description,
      url: project.href,
    })),
  })

  return (
    <>
      <StructuredData data={structuredData} />

      <div className="v2-route" id="top">
        <Nav
          locale={locale}
          localeLabel={t('localeSwitch')}
          items={[
            { label: t('nav.summary'), href: '#summary' },
            { label: t('nav.projects'), href: '#projects' },
            { label: t('nav.contact'), href: '#contact' },
          ]}
        />

        <section className="v2-container py-16">
          <p className="mb-4 text-sm uppercase tracking-wider text-[var(--v2-color-text-muted)]">{content.hero.eyebrow}</p>
          <h1 className="text-5xl font-bold leading-tight">{content.hero.title}</h1>
          <p className="mt-5 max-w-3xl text-lg text-[var(--v2-color-text-muted)]">{content.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={content.hero.primaryCta.href}>{content.hero.primaryCta.label}</LinkButton>
            <LinkButton href={content.hero.secondaryCta.href} variant="ghost">
              {content.hero.secondaryCta.label}
            </LinkButton>
          </div>
        </section>

        <SectionShell id="summary" title={content.summary.title}>
          <div className="space-y-4 text-[var(--v2-color-text-muted)]">
            {content.summary.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="projects" title={content.projects.title}>
          <div className="grid gap-4 md:grid-cols-2">
            {content.projects.items.map((project) => (
              <Card key={project.id}>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-[var(--v2-color-text-muted)]">{project.description}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-[var(--v2-color-text-muted)]">
                  {project.stack.join(' · ')}
                </p>
                <a
                  className="v2-focusable mt-4 inline-block text-sm font-semibold text-[var(--v2-color-brand)]"
                  href={project.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {t('projectLink')}
                </a>
              </Card>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="contact" title={content.contact.title} subtitle={content.contact.description}>
          <LinkButton href={content.contact.cta.href}>{content.contact.cta.label}</LinkButton>
        </SectionShell>
      </div>
    </>
  )
}
