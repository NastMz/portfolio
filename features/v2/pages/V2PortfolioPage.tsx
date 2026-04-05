import { getMessages } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import type { V2RouteKey } from '@/features/v2/content/sections'
import { V2ContactTerminalForm, type V2ContactTerminalFormCopy } from '@/features/v2/ui/V2ContactTerminalForm'

interface V2PortfolioPageProps {
  locale: Locale
  routeKey?: V2RouteKey
}

interface V2NavLink {
  label: string
  href: string
}

interface V2StatusItem {
  label: string
  value: string
  valueClassName?: string
}

interface V2TopBarCopy {
  title: string
  nav: V2NavLink[]
  ping: string
  localeSwitchPrefix: string
}

interface V2SidebarCopy {
  monitorTitle: string
  monitorItems: V2StatusItem[]
  nav: V2NavLink[]
  throughputTitle: string
  throughputLatestLog: string
  contactAction: string
  version: string
}

interface V2HeroCopy {
  eyebrow: string
  title: string
  titleMuted: string
  subtitlePrefix: string
  subtitleHighlight: string
  quote: string
  description: string
  primaryCta: string
  secondaryCta: string
  codeHint: string
}

interface V2IdentityCopy {
  fileLabel: string
  title: string
  watermark: string
  avoidTitle: string
  avoidItems: string[]
  leadPrefix: string
  leadEmphasis: string
  body: string
  modeBadge: string
  stanceBadge: string
}

interface V2PrincipleCopy {
  id: string
  indexLabel: string
  title: string
  description: string
  isCritical?: boolean
  priorityLabel?: string
  hint?: string
}

interface V2CaseStudyPoint {
  label: string
  text: string
}

interface V2CaseStudyCopy {
  tag: string
  title: string
  points: V2CaseStudyPoint[]
  stack: string[]
  imageAlt: string
  resultLabel: string
  resultTitle: string
  resultDescription: string
}

interface V2DecisionItem {
  id: string
  statusClass: string
  status: string
  context: string
  title: string
  body: string
  tradeoff: string
}

interface V2StackItem {
  id: string
  category: string
  name: string
  detail: string
}

interface V2NoteItem {
  id: string
  borderClass: string
  markerClass: string
  tagClass: string
  title: string
  tag: string
  body: string
}

interface V2ContactCopy {
  eyebrow: string
  title: string
  description: string
  form: V2ContactTerminalFormCopy
}

interface V2FooterCopy {
  title: string
  build: string
  links: V2NavLink[]
}

interface V2FloatingPanelCopy {
  label: string
  value: string
}

interface V2MessagesShape {
  topBar: V2TopBarCopy
  sidebar: V2SidebarCopy
  hero: V2HeroCopy
  identity: V2IdentityCopy
  principles: {
    title: string
    items: V2PrincipleCopy[]
  }
  caseStudy: V2CaseStudyCopy
  decisionLog: {
    title: string
    storeLabel: string
    tradeoffLabel: string
    footerHint: string
    items: V2DecisionItem[]
  }
  stack: {
    title: string
    footerHint: string
    items: V2StackItem[]
  }
  notes: {
    title: string
    subtitle: string
    items: V2NoteItem[]
  }
  contact: V2ContactCopy
  footer: V2FooterCopy
  floatingPanel: V2FloatingPanelCopy
}

const routePathByKey: Record<V2RouteKey, string> = {
  home: '/v2',
  projects: '/v2/projects',
  contact: '/v2/contact',
}

function resolveV2MessagesShape(messages: unknown): V2MessagesShape {
  const payload = messages as { V2?: V2MessagesShape }

  if (!payload?.V2) {
    throw new Error("Missing 'V2' messages payload for v2 experience")
  }

  return payload.V2
}

function TopBar({ copy, localeSwitchLabel, localeSwitchHref }: { copy: V2TopBarCopy; localeSwitchLabel: string; localeSwitchHref: string }) {
  return (
    <header className="bg-[#0E0E0E] text-[#FF7CF5] font-headline tracking-tight text-sm uppercase flex justify-between items-center w-full px-6 py-4 max-w-full fixed top-0 z-50 border-b border-zinc-800/30">
      <div className="font-label font-bold text-[#FF7CF5] tracking-tighter text-xl">{copy.title}</div>
      <nav aria-label="V2 main navigation" className="hidden md:flex gap-8">
        {copy.nav.map((item, index) => (
          <a
            key={item.href}
            className={
              index === 0
                ? 'text-[#FF7CF5] border-b-0 font-bold hover:bg-[#FF7CF5]/10 transition-none px-2 py-1'
                : 'text-zinc-500 hover:text-zinc-200 hover:bg-[#FF7CF5]/10 transition-none px-2 py-1'
            }
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-3 text-xs font-label">
        <a className="text-primary hover:text-[#FF7CF5] transition-none" href={localeSwitchHref}>
          {localeSwitchLabel}
        </a>
        <span>{copy.ping}</span>
      </div>
    </header>
  )
}

function Sidebar({ copy }: { copy: V2SidebarCopy }) {
  return (
    <aside className="bg-[#0b0b0b] text-[#FF7CF5] font-label text-[9px] uppercase tracking-wider fixed left-0 top-0 h-full w-16 md:w-64 flex flex-col z-40 pt-20 border-r border-zinc-800/30">
      <div className="px-4 mb-8 hidden md:block">
        <div className="font-bold text-primary mb-4">{copy.monitorTitle}</div>
        <div className="space-y-1 text-zinc-500">
          {copy.monitorItems.map((item) => (
            <div key={item.label} className="flex justify-between">
              <span>{item.label}</span>
              <span className={item.valueClassName ?? 'text-white'}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <a className="bg-[#FF7CF5] text-[#580058] p-4 md:p-3 flex items-center gap-4 transition-none" href={copy.nav[0]?.href ?? '#hero'}>
          <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            <path d="M12 18h8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
          <span className="hidden md:inline">{copy.nav[0]?.label}</span>
        </a>
        <a className="text-zinc-600 p-4 md:p-3 flex items-center gap-4 hover:bg-zinc-800 hover:text-[#FF7CF5] transition-none" href={copy.nav[1]?.href ?? '#identity'}>
          <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="12" cy="6" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M6 6v8c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6" stroke="currentColor" strokeWidth="1.6" />
            <path d="M6 10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span className="hidden md:inline">{copy.nav[1]?.label}</span>
        </a>
        <a
          className="text-zinc-600 p-4 md:p-3 flex items-center gap-4 hover:bg-zinc-800 hover:text-[#FF7CF5] transition-none"
          href={copy.nav[2]?.href ?? '#decision-log'}
        >
          <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect height="8" rx="1.2" stroke="currentColor" strokeWidth="1.6" width="12" x="6" y="8" />
            <path d="M9 5v3M15 5v3M9 16v3M15 16v3M4 10h2M4 14h2M18 10h2M18 14h2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
          </svg>
          <span className="hidden md:inline">{copy.nav[2]?.label}</span>
        </a>
        <a
          className="text-zinc-600 p-4 md:p-3 flex items-center gap-4 hover:bg-zinc-800 hover:text-[#FF7CF5] transition-none"
          href={copy.nav[3]?.href ?? '#stack-evaluation'}
        >
          <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          </svg>
          <span className="hidden md:inline">{copy.nav[3]?.label}</span>
        </a>
      </div>

      <div className="mt-auto p-4 border-t border-zinc-800/20 bg-black/40">
        <div className="hidden md:block mb-4">
          <div className="text-zinc-600 text-[8px] mb-2">{copy.throughputTitle}</div>
          <div className="h-1 bg-zinc-900 w-full mb-1">
            <div className="h-full bg-primary bar-anim" />
          </div>
          <div className="h-1 bg-zinc-900 w-full mb-1">
            <div className="h-full bg-zinc-700 w-1/2" />
          </div>
          <div className="text-[8px] text-zinc-700 mt-2 font-label">{copy.throughputLatestLog}</div>
        </div>
        <a
          className="w-full bg-zinc-800 text-zinc-400 py-2 text-[10px] hidden md:block hover:text-primary transition-none mb-4 text-center"
          href="#contact"
        >
          {copy.contactAction}
        </a>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-700">
            <span className="material-symbols-outlined text-sm">info</span>
            <span className="hidden md:inline">{copy.version}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

function HeroSection({ copy }: { copy: V2HeroCopy }) {
  return (
    <section className="px-8 md:px-16 py-12 border-b border-zinc-800/20 scroll-mt-28" id="hero">
      <div className="max-w-5xl">
        <div className="font-label text-primary text-sm mb-4 tracking-[0.2em] uppercase">{copy.eyebrow}</div>
        <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter mb-4">
          {copy.title} — <span className="text-white/20">{copy.titleMuted}</span>
        </h1>
        <div className="mb-10">
          <h2 className="font-headline text-2xl md:text-4xl text-zinc-400 mb-2 max-w-3xl leading-tight">
            {copy.subtitlePrefix}{' '}
            <span className="text-white underline decoration-primary/50 underline-offset-8">{copy.subtitleHighlight}</span>
          </h2>
          <p className="font-label text-primary/60 text-lg uppercase tracking-tight italic">&quot;{copy.quote}&quot;</p>
        </div>
        <p className="font-body text-lg text-zinc-500 mb-12 max-w-xl border-l-2 border-primary/20 pl-6 py-2">{copy.description}</p>
        <div className="flex flex-wrap gap-4 items-center">
          <a className="bg-primary text-on-primary px-8 py-4 font-label text-sm font-bold glitch-hover inline-flex" href="#decision-log">
            {copy.primaryCta}
          </a>
          <a className="border border-outline-variant/30 text-primary px-8 py-4 font-label text-sm font-bold hover:bg-primary/10 transition-none inline-flex" href="#contact">
            {copy.secondaryCta}
          </a>
          <div className="ml-4 font-label text-[10px] text-zinc-700 hidden lg:block">{copy.codeHint}</div>
        </div>
      </div>
    </section>
  )
}

function IdentitySection({ copy }: { copy: V2IdentityCopy }) {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-12 px-8 md:px-16 py-24 gap-12 items-start border-b border-zinc-800/20 bg-surface-container-low/50 relative scroll-mt-28"
      id="identity"
    >
      <div className="lg:col-span-5 lg:-translate-x-4">
        <div className="font-label text-zinc-600 text-xs mb-2 tracking-widest">{copy.fileLabel}</div>
        <h3 className="font-headline text-4xl font-bold">{copy.title}</h3>
        <div className="mt-8 bg-black/40 border border-zinc-800 p-6 hidden lg:block relative overflow-hidden">
          <div className="absolute -right-4 -top-4 font-label text-[40px] opacity-5 pointer-events-none select-none">{copy.watermark}</div>
          <div className="font-label text-[10px] text-primary mb-4">{copy.avoidTitle}</div>
          <ul className="font-label text-[10px] space-y-2 text-zinc-500">
            {copy.avoidItems.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <p className="font-body text-xl text-zinc-300 leading-relaxed">
          {copy.leadPrefix} <span className="text-primary italic">{copy.leadEmphasis}</span>.
        </p>
        <p className="font-body text-zinc-400">{copy.body}</p>
        <div className="flex gap-4">
          <div className="bg-surface-container px-3 py-1 border border-outline-variant/20 font-label text-[10px] text-zinc-500">{copy.modeBadge}</div>
          <div className="bg-surface-container px-3 py-1 border border-outline-variant/20 font-label text-[10px] text-zinc-500">{copy.stanceBadge}</div>
        </div>
      </div>
    </section>
  )
}

function CorePrinciplesSection({ title, items }: { title: string; items: V2PrincipleCopy[] }) {
  return (
    <section className="px-8 md:px-16 py-32 relative scroll-mt-28" id="core-principles">
      <div className="absolute right-0 top-1/4 h-[1px] w-64 bg-primary/20 rotate-45 pointer-events-none" />
      <div className="font-label text-primary text-xs mb-16 tracking-widest text-center">{title}</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {items.map((item) => (
          <div
            key={item.id}
            className={
              item.isCritical
                ? 'bg-[#1a1919] p-12 border-2 border-primary relative shadow-[0_0_40px_rgba(255,124,245,0.15)] md:-translate-y-8 md:scale-105 z-20'
                : 'bg-surface-container p-8 border border-outline-variant/10 relative'
            }
          >
            <div className={item.isCritical ? 'absolute top-0 right-0 p-3 font-label text-[10px] text-primary' : 'absolute top-0 right-0 p-2 font-label text-[10px] text-zinc-700'}>
              {item.indexLabel}
            </div>
            <h4 className={item.isCritical ? 'font-headline text-2xl font-bold mb-6 text-primary' : 'font-headline text-xl font-bold mb-4 text-zinc-200'}>
              {item.title}
            </h4>
            <p className={item.isCritical ? 'font-body text-md text-zinc-200 leading-relaxed' : 'font-body text-sm text-zinc-500 leading-relaxed'}>{item.description}</p>
            {item.isCritical ? (
              <>
                <div className="mt-8 h-[2px] w-full bg-primary/40" />
                <div className="mt-4 font-label text-[10px] text-primary flex justify-between">
                  <span>{item.priorityLabel}</span>
                  <span className="italic">{item.hint}</span>
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}

function FeaturedCaseStudySection({ copy }: { copy: V2CaseStudyCopy }) {
  return (
    <section className="px-8 md:px-16 py-24 bg-surface-container-lowest border-y border-zinc-800/30" id="projects">
      <div className="max-w-6xl mx-auto" id="case-study">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <div className="font-label text-primary text-xs mb-4 tracking-widest">{copy.tag}</div>
            <h3 className="font-headline text-4xl md:text-5xl font-bold mb-6">{copy.title}</h3>
            <div className="space-y-6 text-zinc-400 font-body">
              {copy.points.map((point) => (
                <p key={point.label}>
                  <span className="text-zinc-100 font-bold">{point.label}:</span> {point.text}
                </p>
              ))}
              <div className="flex flex-wrap gap-2 mt-4">
                {copy.stack.map((item) => (
                  <span key={item} className="px-3 py-1 bg-surface-container-highest border border-zinc-700 font-label text-[10px]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative bg-surface-container border border-outline-variant/10 p-4">
            <img
              alt={copy.imageAlt}
              className="grayscale opacity-50 hover:grayscale-0 transition-all duration-500 w-full h-[400px] object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_hZH3MLDnliSgX-7GCloVm0k9-aQ75LWgtQJd0PfQfhfYKprp5l4Ua4602afm2RNhDlSt_THqdI1a3gMsmjzkrSaekLcj4FeKsLTEKwc92JPoygaFiU4WM7SMOahWHCCEE7y1BZvBsopMP02RYREUXzKav8YuotNRmTGEFrHfH7-7JVlaHHRHYlxsmFeXbIGxOdKQBxfhexFRydhkb1OCMS6O184BwabrNcBFpIn5fyf39P_Rgxd343DhPqgglPyr5s-T75-qeKvH"
            />
            <div className="absolute bottom-8 left-8 bg-black/80 p-6 border-l-4 border-primary backdrop-blur-md">
              <div className="font-label text-[10px] text-primary mb-2">{copy.resultLabel}</div>
              <div className="text-3xl font-headline font-bold text-white tracking-tighter">{copy.resultTitle}</div>
              <div className="text-xs text-zinc-500 font-label italic mt-1">{copy.resultDescription}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DecisionLogSection({ copy }: { copy: V2MessagesShape['decisionLog'] }) {
  return (
    <section className="px-8 md:px-16 py-32 bg-black scanline-magenta border-b border-zinc-900 scroll-mt-28" id="decision-log">
      <div className="flex items-center justify-between mb-12">
        <h3 className="font-headline text-3xl font-bold">{copy.title}</h3>
        <div className="h-[1px] flex-1 bg-primary/20 mx-8" />
        <div className="font-label text-zinc-600 text-xs tracking-widest uppercase">{copy.storeLabel}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {copy.items.map((item) => (
          <div
            key={item.id}
            className="bg-[#111111] p-8 border border-zinc-800 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col h-full"
          >
            <div className="flex flex-col gap-2 mb-4">
              <div className={`${item.statusClass} text-black font-label text-[9px] px-2 py-0.5 w-fit font-bold`}>{item.status}</div>
              <div className="bg-zinc-800 text-zinc-300 font-label text-[9px] px-2 py-0.5 w-fit">{item.context}</div>
            </div>
            <h5 className="font-headline font-bold text-xl mb-3 group-hover:text-primary">{item.title}</h5>
            <p className="font-body text-sm text-zinc-500 mb-6">{item.body}</p>
            <div className="mt-auto pt-4 border-t border-zinc-800">
              <div className="font-label text-[9px] text-zinc-400 uppercase">{copy.tradeoffLabel}</div>
              <div className="font-label text-[9px] text-primary mt-1">{item.tradeoff}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <span className="font-label text-[10px] text-zinc-800 italic">{copy.footerHint}</span>
      </div>
    </section>
  )
}

function StackEvaluationSection({ copy }: { copy: V2MessagesShape['stack'] }) {
  return (
    <section className="px-8 md:px-16 py-24 bg-surface-container-low/30 scroll-mt-28" id="stack-evaluation">
      <div className="font-label text-center text-primary text-xs mb-16 tracking-[0.3em] uppercase">{copy.title}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-zinc-800/40">
        {copy.items.map((item) => (
          <div
            key={item.id}
            className="border border-zinc-800/40 p-10 flex flex-col items-center justify-center group hover:bg-primary/5 transition-none text-center relative overflow-hidden"
          >
            <div className="text-zinc-600 font-label text-[8px] mb-4 uppercase">{item.category}</div>
            <div className="font-headline font-bold text-xl group-hover:text-primary mb-2">{item.name}</div>
            <div className="font-label text-[9px] text-zinc-500 uppercase tracking-tighter">{item.detail}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <span className="font-label text-[9px] text-zinc-800">{copy.footerHint}</span>
      </div>
    </section>
  )
}

function NotesSection({ copy }: { copy: V2MessagesShape['notes'] }) {
  return (
    <section className="px-8 md:px-16 py-24" id="notes">
      <h3 className="font-headline text-3xl font-bold mb-12">
        {copy.title} <span className="text-zinc-600 font-label text-sm ml-4 uppercase">{copy.subtitle}</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {copy.items.map((item) => (
          <div key={item.id} className={`relative pl-12 ${item.borderClass}`}>
            <div className={`absolute -left-1.5 top-0 w-3 h-3 ${item.markerClass}`} />
            <h4 className="font-headline text-xl font-bold mb-2">{item.title}</h4>
            <p className={`font-label text-[10px] mb-4 uppercase tracking-tighter ${item.tagClass}`}>{item.tag}</p>
            <p className="font-body text-zinc-400 leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ContactSection({ copy }: { copy: V2ContactCopy }) {
  return (
    <section className="px-8 md:px-16 py-32 bg-surface-container-lowest flex flex-col items-center text-center scroll-mt-28" id="contact">
      <div className="w-full max-w-2xl">
        <div className="font-label text-primary text-xs mb-6 tracking-[0.5em] uppercase">{copy.eyebrow}</div>
        <h3 className="font-headline text-4xl md:text-6xl font-bold mb-8">{copy.title}</h3>
        <p className="font-body text-zinc-500 mb-12">{copy.description}</p>
        <V2ContactTerminalForm copy={copy.form} />
      </div>
    </section>
  )
}

function Footer({ copy }: { copy: V2FooterCopy }) {
  return (
    <footer className="bg-[#0E0E0E] text-[#FF7CF5] font-label text-[10px] uppercase w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-zinc-800/20 relative z-10 scroll-mt-28" id="footer">
      <div className="mb-8 md:mb-0">
        <div className="text-[#FF7CF5] font-bold mb-2">{copy.title}</div>
        <div className="text-zinc-700">{copy.build}</div>
      </div>
      <div className="flex gap-8">
        {copy.links.map((item) => (
          <a key={item.href} className="text-zinc-700 hover:text-[#FF7CF5] transition-none" href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </footer>
  )
}

export async function V2PortfolioPage({ locale, routeKey = 'home' }: V2PortfolioPageProps) {
  const messages = await getMessages()
  const copy = resolveV2MessagesShape(messages)
  const targetLocale: Locale = locale === 'en' ? 'es' : 'en'
  const localeSwitchHref = `/${targetLocale}${routePathByKey[routeKey]}`
  const localeSwitchLabel = `${copy.topBar.localeSwitchPrefix}: ${targetLocale.toUpperCase()}`

  return (
    <div className="v2-route v2-faithful bg-grid selection:bg-primary selection:text-on-primary relative" data-locale={locale} id="top">
      <div className="interference-line top-1/4 -left-1/2" />
      <div className="interference-line top-3/4 -left-1/4" />

      <div className="fixed top-24 right-8 z-50 pointer-events-none hidden lg:block">
        <div className="bg-surface-container border border-primary/20 p-2 font-label text-[10px]">
          <div className="text-zinc-600 mb-1">{copy.floatingPanel.label}</div>
          <div className="text-primary font-bold">{copy.floatingPanel.value}</div>
        </div>
      </div>

      <TopBar copy={copy.topBar} localeSwitchHref={localeSwitchHref} localeSwitchLabel={localeSwitchLabel} />
      <Sidebar copy={copy.sidebar} />

      <main className="ml-16 md:ml-64 pt-24 pb-24 relative z-10" id="main-content">
        <HeroSection copy={copy.hero} />
        <IdentitySection copy={copy.identity} />
        <CorePrinciplesSection items={copy.principles.items} title={copy.principles.title} />
        <FeaturedCaseStudySection copy={copy.caseStudy} />
        <DecisionLogSection copy={copy.decisionLog} />
        <StackEvaluationSection copy={copy.stack} />
        <NotesSection copy={copy.notes} />
        <ContactSection copy={copy.contact} />
      </main>

      <Footer copy={copy.footer} />
    </div>
  )
}
