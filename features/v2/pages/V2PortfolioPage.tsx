import Link from 'next/link'
import { getMessages } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import { V2ContactTerminalForm, type V2ContactTerminalFormCopy } from '@/features/v2/ui/V2ContactTerminalForm'
import { V2BootOverlay } from '@/features/v2/ui/V2BootOverlay'
import { V2BootReplayTitle } from '@/features/v2/ui/V2BootReplayTitle'
import { V2CustomCursor } from '@/features/v2/ui/V2CustomCursor'
import { V2HoverTrace } from '@/features/v2/ui/V2HoverTrace'
import { V2HypeResistanceMetric } from '@/features/v2/ui/V2HypeResistanceMetric'
import { V2SectionNavigation } from '@/features/v2/ui/V2SectionNavigation'
import { V2SystemStateDrift } from '@/features/v2/ui/V2SystemStateDrift'
import { getCanonicalRoutePath, type CanonicalRouteKey } from '@/lib/site'

interface V2PortfolioPageProps {
  locale: Locale
  routeKey?: CanonicalRouteKey
}

interface V2NavLink {
  label: string
  href: string
}

type V2NavAnchor = '#overview' | '#systems' | '#artifacts' | '#decision-log' | '#stack' | '#contact'

interface ParsedNavLabel {
  technical: string
  human?: string
}

interface V2StatusItem {
  label: string
  value: string
  valueClassName?: string
}

interface V2TopBarCopy {
  title: string
  systemEvents: string[]
  ping: string
  pingStates?: string[]
  localeSwitchPrefix: string
}

interface V2SidebarCopy {
  monitorTitle: string
  monitorItems: V2StatusItem[]
  nav: V2NavLink[]
  throughputTitle: string
  throughputLatestLog: string
  throughputLogs?: string[]
  version: string
}

interface V2HeroCopy {
  eyebrow: string
  signals?: string[]
  title: string
  titleMuted: string
  subtitlePrefix: string
  subtitleHighlight: string
  quote: string
  plainStatement?: string
  description: string
  primaryCta: string
  secondaryCta: string
  cvCta: string
  codeHint: string
}

interface V2AboutCopy {
  fileLabel: string
  title: string
  watermark: string
  avoidTitle: string
  avoidItems: string[]
  paragraphs: string[]
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

interface V2CaseStudyEntry {
  id: string
  title: string
  summary: string
  problem: string
  decision: string
  tags: string[]
  status: string
  statusClass?: string
}

interface V2ArtifactEntry {
  id: string
  track: string
  name: string
  type: string
  status: string
  description: string
  details: string[]
  stack: string[]
  distribution: string
  distributionHref?: string
  distributionLabel?: string
  repoHref?: string
  intent: string
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
}

const canonicalNavAnchors: V2NavAnchor[] = ['#overview', '#systems', '#artifacts', '#decision-log', '#stack', '#contact']

interface V2MessagesShape {
  topBar: V2TopBarCopy
  sidebar: V2SidebarCopy
  hero: V2HeroCopy
  about: V2AboutCopy
  principles: {
    title: string
    items: V2PrincipleCopy[]
  }
  caseStudies: {
    title: string
    subtitle: string
    alias?: string
    footerHint: string
    toggleHint: string
    items: V2CaseStudyEntry[]
  }
  artifacts: {
    title: string
    alias?: string
    inventoryLabel: string
    buildLogLabel: string
    systemComponentsLabel: string
    systemComponentsAlias?: string
    trackLabel: string
    typeLabel: string
    statusLabel: string
    detailsLabel: string
    stackLabel: string
    distributionLabel: string
    repoLabel: string
    intentLabel: string
    items: V2ArtifactEntry[]
  }
  decisionLog: {
    title: string
    alias?: string
    storeLabel: string
    tradeoffLabel: string
    footerHint: string
    items: V2DecisionItem[]
  }
  stack: {
    title: string
    alias?: string
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

function resolveV2MessagesShape(messages: unknown): V2MessagesShape {
  const payload = messages as { V2?: V2MessagesShape }

  if (!payload?.V2) {
    throw new Error("Missing 'V2' messages payload for v2 experience")
  }

  return payload.V2
}

function parseNavLabel(label: string): ParsedNavLabel {
  const [technical, human] = label.split('//').map((part) => part.trim())

  return {
    technical,
    human: human && human.length > 0 ? `// ${human}` : undefined,
  }
}

function renderNavLabel(label: string, className?: string, humanClassName?: string) {
  const parsed = parseNavLabel(label)

  return (
    <span className={className}>
      <span className="block">{parsed.technical}</span>
      {parsed.human ? <span className={`block normal-case tracking-normal ${humanClassName ?? 'text-zinc-500'}`}>{parsed.human}</span> : null}
    </span>
  )
}

function renderMetadataLabel(label: string) {
  const normalized = label.trim().replace(/^\[|\]$/g, '').toLowerCase()

  return `// source: [${normalized}]`
}

function resolveCanonicalNav(items: V2NavLink[]): V2NavLink[] {
  const byHref = new Map(items.map((item) => [item.href, item]))

  return canonicalNavAnchors.map((href) => {
    const item = byHref.get(href)

    if (!item) {
      throw new Error(`Missing canonical V2 navigation item for ${href}`)
    }

    return item
  })
}

function TopBar({ copy, localeSwitchCode, localeSwitchHref }: { copy: V2TopBarCopy; localeSwitchCode: string; localeSwitchHref: string }) {
  const initialEvent = copy.systemEvents[0] ?? '[STATUS: SYSTEM_STABLE]'

  return (
    <header className="bg-[#0E0E0E] text-[#FF7CF5] font-headline tracking-tight text-sm uppercase flex justify-between items-center w-full px-6 py-4 max-w-full fixed top-0 z-50 border-b border-zinc-800/30">
      <V2BootReplayTitle label={copy.title} />
      <div className="hidden md:flex flex-1 justify-center px-8 pointer-events-none">
        <div className="max-w-[32rem] w-full font-label text-[10px] tracking-[0.18em] text-zinc-500/95 text-center font-medium">
          <V2SystemStateDrift initialState={initialEvent} states={copy.systemEvents} minIntervalMs={4000} intervalWindowMs={4000} />
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs font-label">
        <Link
          aria-label="Switch language"
          className="inline-flex items-center gap-2 border border-primary/30 px-2 py-1 text-primary bg-zinc-900 hover:bg-[#FF7CF5]/10 hover:text-[#FF7CF5] transition-none"
          href={localeSwitchHref}
          scroll={false}
          title="Switch language"
        >
          <span className="text-zinc-500/95 font-medium">{copy.localeSwitchPrefix}</span>
          <span aria-hidden="true">⇄</span>
          {localeSwitchCode}
        </Link>
        <V2SystemStateDrift initialState={copy.ping} states={copy.pingStates} />
      </div>
    </header>
  )
}

function HeroSection({ copy, cvHref }: { copy: V2HeroCopy; cvHref: string }) {
  return (
    <section className="px-8 md:px-16 py-12 border-b border-zinc-800/20 scroll-mt-28" id="hero">
      <div className="max-w-5xl">
        <div className="font-label text-primary text-sm mb-4 tracking-[0.2em] uppercase">{copy.eyebrow}</div>
        {copy.signals?.length ? (
          <div className="mb-4 flex flex-wrap gap-2">
            {copy.signals.map((signal) => (
              <span key={signal} className="bg-zinc-800 text-zinc-200 font-label text-[9px] px-2 py-1 uppercase tracking-widest">
                {signal}
              </span>
            ))}
          </div>
        ) : null}
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
        {copy.plainStatement ? <p className="font-label text-zinc-300 text-sm uppercase tracking-[0.18em] mb-4">{copy.plainStatement}</p> : null}
        <p className="font-body text-lg text-zinc-400 mb-12 max-w-xl border-l-2 border-primary/20 pl-6 py-2">{copy.description}</p>
        <div className="flex flex-wrap gap-4 items-center">
          <a className="bg-primary text-on-primary px-8 py-4 font-label text-sm font-bold glitch-hover inline-flex" data-cursor="cta" href="#systems">
            {copy.primaryCta}
          </a>
          <a
            className="border border-outline-variant/30 text-primary px-8 py-4 font-label text-sm font-bold hover:bg-primary/10 transition-none inline-flex"
            data-cursor="cta"
            href="#contact"
          >
            {copy.secondaryCta}
          </a>
          <a
            className="border border-primary/40 text-zinc-200 px-8 py-4 font-label text-sm font-bold hover:bg-primary/10 transition-none inline-flex"
            data-cursor="cta"
            download
            href={cvHref}
            target="_blank"
          >
            {copy.cvCta}
          </a>
          <div className="ml-4 font-label text-[10px] text-zinc-500/95 hidden lg:block font-medium">{copy.codeHint}</div>
        </div>
      </div>
    </section>
  )
}

function AboutSection({ copy }: { copy: V2AboutCopy }) {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-12 px-8 md:px-16 py-24 gap-12 items-start border-b border-zinc-800/20 bg-surface-container-low/50 relative scroll-mt-28"
      id="identity"
    >
      <div className="lg:col-span-5 lg:-translate-x-4">
        <div className="font-label text-zinc-500/95 text-xs mb-2 tracking-widest font-medium">{copy.fileLabel}</div>
        <h3 className="font-headline text-4xl font-bold">{copy.title}</h3>
        <div className="mt-8 bg-black/40 border border-zinc-800 p-6 hidden lg:block relative overflow-hidden">
          <div className="absolute -right-4 -top-4 font-label text-[40px] opacity-5 pointer-events-none select-none">{copy.watermark}</div>
          <div className="font-label text-[10px] text-primary mb-4">{copy.avoidTitle}</div>
          <ul className="font-label text-[10px] space-y-2 text-zinc-400/90 font-medium">
            {copy.avoidItems.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        {copy.paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 24)}`} className={index === 0 ? 'font-body text-xl text-zinc-200 leading-relaxed' : 'font-body text-zinc-300/95'}>
            {paragraph}
          </p>
        ))}
        <div className="flex gap-4">
          <div className="bg-surface-container px-3 py-1 border border-outline-variant/20 font-label text-[10px] text-zinc-400/90">{copy.modeBadge}</div>
          <div className="bg-surface-container px-3 py-1 border border-outline-variant/20 font-label text-[10px] text-zinc-400/90">{copy.stanceBadge}</div>
        </div>
      </div>
    </section>
  )
}

function CorePrinciplesSection({ title, items }: { title: string; items: V2PrincipleCopy[] }) {
  return (
    <section className="px-8 md:px-16 py-32 relative scroll-mt-28" id="core-principles">
      <div className="absolute right-0 top-1/4 h-[1px] w-64 bg-primary/20 rotate-45 pointer-events-none" />
      <div className="relative z-30 font-label text-primary text-sm mb-24 tracking-widest text-center">{title}</div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 items-stretch md:grid-cols-2 2xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={
              item.isCritical
                ? 'bg-[#1a1919] p-12 border-2 border-primary relative shadow-[0_0_40px_rgba(255,124,245,0.15)] 2xl:-translate-y-8 2xl:scale-105 z-20'
                : 'bg-surface-container p-8 border-2 border-white/20 relative shadow-[0_0_40px_rgba(255,255,255,0.08)] hover:border-white/30 hover:shadow-[0_0_48px_rgba(255,255,255,0.12)] transition-[border-color,box-shadow] duration-200'
            }
          >
            <div className={item.isCritical ? 'absolute top-0 right-0 p-3 font-label text-[10px] text-primary' : 'absolute top-0 right-0 p-2 font-label text-[10px] text-zinc-500/95 font-medium'}>
              {item.indexLabel}
            </div>
            <div className={item.isCritical ? 'mb-4 font-label text-[9px] text-primary/75 tracking-[0.18em] uppercase' : 'mb-4 font-label text-[9px] text-zinc-500/95 tracking-[0.18em] uppercase font-medium'}>
              {item.isCritical ? '// core principles (high priority)' : '// foundational principles'}
            </div>
            <h4 className={item.isCritical ? 'font-headline text-2xl font-bold mb-6 text-primary' : 'font-headline text-xl font-extrabold mb-4 text-zinc-100/95 hover:text-zinc-50'}>
              {item.title}
            </h4>
            <p className={item.isCritical ? 'font-body text-md text-zinc-100 leading-relaxed' : 'font-body text-sm text-zinc-400/95 leading-relaxed font-medium'}>{item.description}</p>
            <>
              <div className={item.isCritical ? 'mt-8 h-[2px] w-full bg-primary/40' : 'mt-6 h-px w-full bg-zinc-800'} />
              <div className={item.isCritical ? 'mt-4 font-label text-[10px] text-primary flex justify-between gap-4' : 'mt-4 font-label text-[10px] text-zinc-500/95 flex justify-between gap-4 font-medium'}>
                <span>{item.priorityLabel}</span>
                <span className="italic text-right">{item.hint}</span>
              </div>
            </>
          </div>
        ))}
      </div>
    </section>
  )
}

function CaseStudiesSection({ copy }: { copy: V2MessagesShape['caseStudies'] }) {
  return (
    <section className="px-8 md:px-16 py-24 bg-surface-container-lowest border-y border-zinc-800/30" id="projects">
      <div className="max-w-6xl mx-auto" id="case-study">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="font-headline text-3xl md:text-4xl font-bold">{copy.title}</h3>
            {copy.alias ? <div className="font-label text-[10px] text-zinc-500/95 tracking-widest uppercase mt-2 font-medium">{copy.alias}</div> : null}
          </div>
          <div className="h-[1px] flex-1 bg-primary/20 mx-8" />
          <div className="font-label text-zinc-500 text-[10px] tracking-[0.18em] lowercase">{renderMetadataLabel(copy.subtitle)}</div>
        </div>

        <div className="space-y-4">
          {copy.items.map((item, index) => (
            <details key={item.id} className="bg-[#111111] border border-zinc-800 open:border-primary/30 group" open={index === 0}>
              <summary className="list-none p-6 md:p-8 cursor-pointer">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="font-label text-[10px] text-primary tracking-widest">[{item.id}]</span>
                      <span
                        className={`${item.statusClass ?? 'bg-zinc-700'} ${item.statusClass === 'bg-error' ? 'text-white' : 'text-black'} font-label text-[9px] px-2 py-0.5 w-fit font-bold`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <h4 className="font-headline text-2xl font-bold mb-2 group-hover:text-primary">{item.title}</h4>
                    <p className="font-body text-zinc-300/95 max-w-3xl">{item.summary}</p>
                  </div>
                  <div className="flex items-center gap-3 border border-zinc-800 bg-black/40 px-3 py-2 text-zinc-400 group-hover:border-primary/30 group-hover:text-primary">
                    <span className="font-label text-[9px] uppercase tracking-[0.24em]">{copy.toggleHint}</span>
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 ease-out group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
                    </svg>
                  </div>
                </div>
              </summary>

              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="px-6 md:px-8 pb-8 border-t border-zinc-800/70">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                      <div>
                        <div className="font-label text-[10px] text-zinc-400 mb-2 uppercase">PROBLEM</div>
                        <p className="font-body text-sm text-zinc-400/95">{item.problem}</p>
                      </div>
                      <div>
                        <div className="font-label text-[10px] text-zinc-400 mb-2 uppercase">DECISION</div>
                        <p className="font-body text-sm text-zinc-400/95">{item.decision}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {item.tags.map((tag) => (
                        <span key={`${item.id}-${tag}`} className="px-3 py-1 bg-surface-container-highest border border-zinc-700 font-label text-[10px] uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-8 text-center">
          <span className="font-label text-[10px] text-zinc-500/95 italic font-medium">{copy.footerHint}</span>
        </div>
      </div>
    </section>
  )
}

function DecisionLogSection({ copy }: { copy: V2MessagesShape['decisionLog'] }) {
  return (
    <section className="px-8 md:px-16 py-32 bg-black scanline-magenta border-b border-zinc-900 scroll-mt-28" id="decision-log">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h3 className="font-headline text-3xl font-bold">{copy.title}</h3>
          {copy.alias ? <div className="font-label text-[10px] text-zinc-500/95 tracking-widest uppercase mt-2 font-medium">{copy.alias}</div> : null}
        </div>
        <div className="h-[1px] flex-1 bg-primary/20 mx-8" />
        <div className="font-label text-zinc-500 text-[10px] tracking-[0.18em] lowercase">{renderMetadataLabel(copy.storeLabel)}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {copy.items.map((item) => (
          <div
            key={item.id}
            className="bg-[#111111] p-8 border border-zinc-800 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col h-full"
          >
            <div className="font-label text-[10px] text-primary tracking-widest mb-3">[{item.id}]</div>
            <div className="flex flex-col gap-2 mb-4">
              <div className={`${item.statusClass} ${item.statusClass === 'bg-primary' ? 'text-black' : 'text-white'} font-label text-[9px] px-2 py-0.5 w-fit font-bold`}>{item.status}</div>
              <div className="bg-zinc-800 text-zinc-300 font-label text-[9px] px-2 py-0.5 w-fit">{item.context}</div>
            </div>
            <h5 className="font-headline font-bold text-xl mb-3 group-hover:text-primary">{item.title}</h5>
            <p className="font-body text-sm text-zinc-400/95 mb-6">{item.body}</p>
            <div className="mt-auto pt-4 border-t border-zinc-800">
              <div className="font-label text-[9px] text-zinc-400 uppercase">{copy.tradeoffLabel}</div>
              <div className="font-label text-[9px] text-primary mt-1">{item.tradeoff}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <span className="font-label text-[10px] text-zinc-500/95 italic font-medium">{copy.footerHint}</span>
      </div>
    </section>
  )
}

function ArtifactsSection({ copy }: { copy: V2MessagesShape['artifacts'] }) {
  const groupedItems = copy.items.reduce<Map<string, V2ArtifactEntry[]>>((groups, item) => {
    const currentItems = groups.get(item.track) ?? []

    currentItems.push(item)
    groups.set(item.track, currentItems)

    return groups
  }, new Map())

  return (
    <section className="px-8 md:px-16 py-24 bg-[#0d0d0d] border-b border-zinc-800/30 scroll-mt-28" id="artifacts">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <div>
            <h3 className="font-headline text-3xl md:text-4xl font-bold">{copy.title}</h3>
            {copy.alias ? <div className="font-label text-[10px] text-zinc-500/95 tracking-widest uppercase mt-2 font-medium">{copy.alias}</div> : null}
          </div>
          <div className="h-[1px] flex-1 bg-primary/20 min-w-20" />
          <div className="font-label text-[10px] text-zinc-500/95 tracking-[0.18em] lowercase font-medium">{renderMetadataLabel(copy.buildLogLabel)}</div>
        </div>

        <div className="border border-zinc-800 bg-black/40">
          <div className="px-6 md:px-8 py-4 border-b border-zinc-800 flex flex-wrap items-center gap-x-8 gap-y-3 bg-zinc-950/35">
            <span className="font-label text-xs md:text-sm text-primary tracking-[0.18em] uppercase font-bold">{copy.inventoryLabel}</span>
            <span className="font-label text-xs md:text-sm text-zinc-400 tracking-[0.18em] uppercase font-semibold">
              {copy.systemComponentsLabel}
              {copy.systemComponentsAlias ? <span className="block text-[10px] md:text-xs text-zinc-500 mt-1">{copy.systemComponentsAlias}</span> : null}
            </span>
          </div>

          {Array.from(groupedItems.entries()).map(([track, items]) => (
            <div key={track} className="border-b border-zinc-800/80 last:border-b-0">
              <div className="px-6 md:px-8 py-4 border-b border-zinc-800/80 bg-zinc-950/70">
                <span className="font-label text-xs md:text-sm text-primary tracking-[0.18em] uppercase font-bold">{copy.trackLabel}: {track}</span>
              </div>

              {items.map((item, index) => (
                <article key={item.id} className={`px-6 md:px-8 py-8 ${index < items.length - 1 ? 'border-b border-zinc-800/80' : ''}`}>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-label text-[10px] text-primary tracking-widest">[{item.id}]</span>
                    <span className="bg-zinc-800 text-zinc-300 font-label text-[9px] px-2 py-0.5 uppercase">
                      {copy.typeLabel}: {item.type}
                    </span>
                    <span className="bg-zinc-800 text-zinc-300 font-label text-[9px] px-2 py-0.5 uppercase">
                      {copy.statusLabel}: {item.status}
                    </span>
                  </div>

                  <h4 className="font-headline text-2xl font-bold mb-2">{item.name}</h4>
                  <p className="font-body text-zinc-300/95 mb-6 max-w-4xl">{item.description}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
                    <div>
                      <div className="font-label text-[10px] text-zinc-500/95 uppercase mb-2 font-medium">{copy.detailsLabel}</div>
                      <ul className="space-y-2">
                        {item.details.map((detail) => (
                          <li key={`${item.id}-${detail}`} className="font-body text-sm text-zinc-400/95 before:content-['>'] before:text-primary before:mr-2">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="font-label text-[10px] text-zinc-500/95 uppercase mb-2 font-medium">{copy.stackLabel}</div>
                        <p className="font-label text-[10px] text-zinc-300 uppercase tracking-wider">{item.stack.join(' · ')}</p>
                      </div>

                      <div className="border-t border-zinc-800 pt-4">
                        <div className="font-label text-[10px] text-zinc-500/95 uppercase mb-1 font-medium">{copy.distributionLabel}</div>
                        {item.distributionHref ? (
                          <a
                            className="inline-flex items-center gap-2 font-label text-[10px] text-primary uppercase tracking-wider border border-primary/30 px-3 py-2 hover:bg-primary/10"
                            data-cursor="cta"
                            href={item.distributionHref}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <span>{item.distributionLabel ?? item.distribution}</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        ) : (
                          <p className="font-label text-[10px] text-zinc-300/90 uppercase tracking-wider">{item.distribution}</p>
                        )}
                      </div>

                      <div className="border-t border-zinc-800 pt-4">
                        <div className="font-label text-[10px] text-zinc-500/95 uppercase mb-1 font-medium">{copy.repoLabel}</div>
                        {item.repoHref ? (
                          <a
                            className="inline-flex items-center gap-2 font-label text-[10px] text-zinc-200 uppercase tracking-wider border border-zinc-700 px-3 py-2 hover:border-primary/30 hover:text-primary"
                            data-cursor="cta"
                            href={item.repoHref}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <span>{item.name}</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        ) : (
                          <p className="font-label text-[10px] text-zinc-300/90 uppercase tracking-wider">—</p>
                        )}
                      </div>

                      <div className="border-t border-zinc-800 pt-4">
                        <div className="font-label text-[10px] text-zinc-500/95 uppercase mb-1 font-medium">{copy.intentLabel}</div>
                        <p className="font-body text-sm text-zinc-300/95">{item.intent}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StackEvaluationSection({ copy }: { copy: V2MessagesShape['stack'] }) {
  return (
    <section className="px-8 md:px-16 py-24 bg-surface-container-low/30 scroll-mt-28" id="stack-evaluation">
      <div className="mb-16 text-center">
        <div className="font-label text-primary text-xs tracking-[0.3em] uppercase">{copy.title}</div>
        {copy.alias ? <div className="font-label text-[10px] text-zinc-500/95 tracking-widest uppercase mt-2 font-medium">{copy.alias}</div> : null}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-zinc-800/40">
        {copy.items.map((item) => (
          <div
            key={item.id}
            className="border border-zinc-800/40 p-10 flex flex-col items-center justify-center group hover:bg-primary/5 transition-none text-center relative overflow-hidden"
          >
            <div className="text-zinc-400/95 font-label text-[9px] mb-4 uppercase tracking-[0.18em] font-medium">{item.category}</div>
            <div className="font-headline font-bold text-xl group-hover:text-primary mb-2">{item.name}</div>
            <div className="font-label text-[10px] text-zinc-300/95 uppercase tracking-[0.14em] font-medium">{item.detail}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <span className="font-label text-[9px] text-zinc-500/95 font-medium">{copy.footerHint}</span>
      </div>
    </section>
  )
}

function NotesSection({ copy }: { copy: V2MessagesShape['notes'] }) {
  return (
    <section className="px-8 md:px-16 py-24" id="notes">
      <h3 className="font-headline text-3xl font-bold mb-12">
        {copy.title} <span className="text-zinc-300/95 font-label text-sm ml-4 uppercase tracking-[0.18em] font-medium">{copy.subtitle}</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {copy.items.map((item) => (
          <div key={item.id} className={`relative pl-12 ${item.borderClass}`}>
            <div className={`absolute -left-1.5 top-0 w-3 h-3 ${item.markerClass}`} />
            <div className="font-label text-[10px] text-primary tracking-widest mb-2">[{item.id}]</div>
            <h4 className="font-headline text-xl font-bold mb-2">{item.title}</h4>
            <p className="font-label text-[10px] mb-4 uppercase tracking-[0.14em] text-zinc-300/95 font-medium">{item.tag}</p>
            <p className="font-body text-zinc-300/95 leading-relaxed">{item.body}</p>
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
        <p className="font-body text-zinc-400 mb-12">{copy.description}</p>
        <V2ContactTerminalForm copy={copy.form} />
      </div>
    </section>
  )
}

function Footer({ copy }: { copy: V2FooterCopy }) {
  const buildStamp = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(new Date())
    .replace(/-/g, '.')

  const dynamicBuild = copy.build.replace(/\[BUILD_[^\]]+\]/, `[BUILD_${buildStamp}]`)

  return (
    <footer
      className="bg-[#0E0E0E] text-[#FF7CF5] font-label text-[10px] uppercase w-full md:w-[calc(100%-16rem)] md:ml-64 px-8 py-12 pb-[calc(7rem+env(safe-area-inset-bottom))] md:pb-12 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-zinc-800/20 relative z-20 scroll-mt-28"
      id="footer"
    >
      <div className="mb-8 md:mb-0">
        <div className="text-[#FF7CF5] font-bold mb-2">{copy.title}</div>
        <div className="text-zinc-500/95 font-medium">{dynamicBuild}</div>
      </div>
      <div className="flex gap-8">
        {copy.links.map((item) => (
          <a
            key={item.href}
            className="text-zinc-400 hover:text-[#FF7CF5] transition-none"
            href={item.href}
            rel="noreferrer"
            target="_blank"
          >
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
  const canonicalSidebarNav = resolveCanonicalNav(copy.sidebar.nav)
  const targetLocale: Locale = locale === 'en' ? 'es' : 'en'
  const localeSwitchHref = getCanonicalRoutePath(targetLocale, routeKey)
  const localeSwitchCode = targetLocale.toUpperCase()
  const cvHref = locale === 'es' ? '/cv/CV_Kevin_Martinez_ES.pdf' : '/cv/CV_Kevin_Martinez_EN.pdf'

  return (
    <div className="v2-route v2-faithful bg-grid selection:bg-primary selection:text-on-primary relative" data-locale={locale} id="top">
      <V2BootOverlay>
        <V2CustomCursor />
        <V2HoverTrace />
        <div className="interference-line top-1/4 -left-1/2" />
        <div className="interference-line top-3/4 -left-1/4" />

        <div className="fixed top-24 right-8 z-50 pointer-events-none hidden lg:block">
          <div className="bg-surface-container border border-primary/20 p-2 font-label text-[10px]">
            <div className="text-zinc-500/95 mb-1 font-medium">{copy.floatingPanel.label}</div>
            <div className="text-primary font-bold">
              <V2HypeResistanceMetric />
            </div>
          </div>
        </div>

        <TopBar copy={copy.topBar} localeSwitchHref={localeSwitchHref} localeSwitchCode={localeSwitchCode} />
        <V2SectionNavigation brandTitle={copy.hero.title} copy={{ ...copy.sidebar, nav: canonicalSidebarNav }} />

        <main className="pt-24 pb-[calc(7rem+env(safe-area-inset-bottom))] md:ml-64 md:pb-24 relative z-10" id="main-content">
          <div className="scroll-mt-28" id="overview" />
          <HeroSection copy={copy.hero} cvHref={cvHref} />
          <AboutSection copy={copy.about} />
          <CorePrinciplesSection items={copy.principles.items} title={copy.principles.title} />
          <div className="scroll-mt-28" id="systems" />
          <CaseStudiesSection copy={copy.caseStudies} />
          <ArtifactsSection copy={copy.artifacts} />
          <DecisionLogSection copy={copy.decisionLog} />
          <div className="scroll-mt-28" id="stack" />
          <StackEvaluationSection copy={copy.stack} />
          <NotesSection copy={copy.notes} />
          <ContactSection copy={copy.contact} />
        </main>

        <Footer copy={copy.footer} />
      </V2BootOverlay>
    </div>
  )
}
