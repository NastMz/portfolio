'use client'

import { useEffect, useState } from 'react'
import { V2SidebarRotatingLog } from '@/features/v2/ui/V2SidebarRotatingLog'

interface V2NavLink {
  label: string
  href: string
}

type V2NavAnchor = '#overview' | '#systems' | '#artifacts' | '#decision-log' | '#stack' | '#contact'

interface V2StatusItem {
  label: string
  value: string
  valueClassName?: string
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

interface ParsedNavLabel {
  technical: string
  human?: string
}

interface V2SectionNavigationProps {
  brandTitle: string
  copy: V2SidebarCopy
  sidebarNavLabel: string
  mobileNavLabel: string
}

function parseNavLabel(label: string): ParsedNavLabel {
  const [technical, human] = label.split('//').map((part) => part.trim())

  return {
    technical,
    human: human && human.length > 0 ? human : undefined,
  }
}

function renderNavLabel(label: string, className?: string, humanClassName?: string) {
  const parsed = parseNavLabel(label)

  return (
    <span className={className}>
      <span className="block">{parsed.technical}</span>
      {parsed.human ? <span className={`block normal-case tracking-normal ${humanClassName ?? 'text-zinc-500'}`}>{'// '}{parsed.human}</span> : null}
    </span>
  )
}

function renderNavIcon(href: V2NavAnchor, className = 'h-5 w-5') {
  if (href === '#overview') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6l6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="M12 18h8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    )
  }

  if (href === '#systems') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="6" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6 6v8c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6 10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }

  if (href === '#decision-log') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 8h16M4 12h16M4 16h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    )
  }

  if (href === '#artifacts') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 7.5h14v4H5z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 12.5h14V17H5z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 5.5h6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      </svg>
    )
  }

  if (href === '#stack') {
    return (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect height="8" rx="1.2" stroke="currentColor" strokeWidth="1.6" width="12" x="6" y="8" />
        <path d="M9 5v3M15 5v3M9 16v3M15 16v3M4 10h2M4 14h2M18 10h2M18 14h2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 6h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 10.5h7M8.5 13.5H13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  )
}

function toSectionToken(label: string) {
  const parsed = parseNavLabel(label)
  const source = parsed.human ?? parsed.technical

  return source
    .replace(/^[\[\s]+|[\]\s]+$/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase()
}

export function V2SectionNavigation({ brandTitle, copy, sidebarNavLabel, mobileNavLabel }: V2SectionNavigationProps) {
  const [activeHref, setActiveHref] = useState<V2NavAnchor>('#overview')

  useEffect(() => {
    const observedSections = copy.nav
      .map((item) => {
        const sectionId = item.href.replace('#', '')
        const element = document.getElementById(sectionId)

        return element ? { href: item.href as V2NavAnchor, element } : null
      })
      .filter((item): item is { href: V2NavAnchor; element: HTMLElement } => item !== null)

    const resolveActiveSection = () => {
      if (!observedSections.length) {
        return
      }

      const viewportAnchor = window.scrollY + Math.max(window.innerHeight * 0.28, 180)

      let current = observedSections[0].href

      for (const section of observedSections) {
        const absoluteTop = section.element.getBoundingClientRect().top + window.scrollY

        if (viewportAnchor >= absoluteTop) {
          current = section.href
        } else {
          break
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        current = observedSections[observedSections.length - 1].href
      }

      setActiveHref(current)
    }

    const syncFromHash = () => {
      const hash = window.location.hash as V2NavAnchor

      if (copy.nav.some((item) => item.href === hash)) {
        setActiveHref(hash)
        return
      }

      resolveActiveSection()
    }

    syncFromHash()
    window.addEventListener('scroll', resolveActiveSection, { passive: true })
    window.addEventListener('resize', resolveActiveSection)
    window.addEventListener('hashchange', syncFromHash)

    return () => {
      window.removeEventListener('scroll', resolveActiveSection)
      window.removeEventListener('resize', resolveActiveSection)
      window.removeEventListener('hashchange', syncFromHash)
    }
  }, [copy.nav])

  const activeItem = copy.nav.find((item) => item.href === activeHref) ?? copy.nav[0]
  const activeSectionLabel = activeItem ? `[SECTION: ${toSectionToken(activeItem.label)}]` : null

  return (
    <>
      <aside className="bg-[#0b0b0b] text-[#FF7CF5] font-label text-[10px] uppercase tracking-wider fixed left-0 top-0 hidden h-full w-16 md:flex md:w-64 flex-col z-40 pt-20 border-r border-zinc-800/30">
        <div className="px-4 mb-8 hidden md:block">
          <div className="mb-5 border border-zinc-800 bg-black/40 px-3 py-3">
            <div className="text-[8px] tracking-[0.24em] text-zinc-500/95 mb-1 font-medium">[ACTIVE_PORTFOLIO]</div>
            <div className="font-headline text-sm text-primary tracking-tight">[{brandTitle.replace(/\s+/g, '_').toUpperCase()}]</div>
          </div>
          <div className="font-bold text-primary mb-4">{copy.monitorTitle}</div>
          <div className="space-y-1.5 text-zinc-300/85">
            {copy.monitorItems.map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-3">
                <span className="shrink-0 pt-[1px]">{item.label}</span>
                <span className={`${item.valueClassName ?? 'text-white'} max-w-[11rem] text-right leading-tight`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 pb-3 hidden md:block">
          <div className="border border-primary/20 bg-primary/[0.06] px-3 py-2 font-label text-[9px] tracking-[0.14em] text-primary/85 whitespace-nowrap overflow-hidden text-ellipsis">
            {activeSectionLabel}
          </div>
        </div>

        <nav aria-label={sidebarNavLabel} className="flex-1">
          {copy.nav.map((item) => {
            const isActive = item.href === activeHref

            return (
              <a
                key={`${item.href}-${item.label}`}
                aria-current={isActive ? 'location' : undefined}
                className={
                  isActive
                    ? 'border-l-2 border-primary bg-primary/12 text-primary p-3 md:p-3 flex flex-col justify-center items-center gap-1.5 md:flex-row md:justify-start md:items-center md:gap-4 transition-none min-h-16 shadow-[inset_0_0_0_1px_rgba(255,124,245,0.08)]'
                    : 'text-zinc-300/80 p-3 md:p-3 flex flex-col justify-center items-center gap-1.5 md:flex-row md:justify-start md:items-center md:gap-4 hover:bg-zinc-800 hover:text-[#FF7CF5] transition-none min-h-16'
                }
                href={item.href}
                title={item.label}
              >
                {renderNavIcon(item.href as V2NavAnchor)}
                {renderNavLabel(
                  item.label,
                  'text-[8px] leading-[1.08] text-center md:text-left md:text-[10px] md:leading-tight',
                  isActive ? 'text-primary/75 text-[7px] md:text-[9px]' : 'text-zinc-500/95 text-[7px] md:text-[9px] font-medium'
                )}
              </a>
            )
          })}
        </nav>

        <div className="mt-auto p-4 border-t border-zinc-800/20 bg-black/40">
          <div className="mb-4">
            <div className="text-zinc-400 text-[8px] mb-2">{copy.throughputTitle}</div>
            <div className="h-1 bg-zinc-800 w-full mb-1">
              <div className="h-full bg-primary bar-anim bar-anim-fast" />
            </div>
            <div className="h-1 bg-zinc-800 w-full mb-1">
              <div className="h-full bg-zinc-500 bar-anim bar-anim-slow bar-anim-offset" />
            </div>
            <V2SidebarRotatingLog initialLog={copy.throughputLatestLog} logs={copy.throughputLogs} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="material-symbols-outlined text-sm">info</span>
              <span>{copy.version}</span>
            </div>
          </div>
        </div>
      </aside>

      <nav
        aria-label={mobileNavLabel}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800/40 bg-[#0b0b0b]/95 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden"
      >
        <div className="mb-2 px-1 font-label text-[9px] tracking-[0.18em] text-primary/80">{activeSectionLabel}</div>
        <ul className="grid grid-cols-6 gap-1">
          {copy.nav.map((item) => {
            const isActive = item.href === activeHref

            return (
              <li key={`${item.href}-${item.label}`}>
                <a
                  aria-current={isActive ? 'location' : undefined}
                  className={
                    isActive
                      ? 'flex min-h-[4.5rem] flex-col items-center justify-center gap-1 border border-primary/40 bg-primary/10 px-1 py-2 text-primary transition-none shadow-[inset_0_0_0_1px_rgba(255,124,245,0.08)]'
                      : 'flex min-h-[4.5rem] flex-col items-center justify-center gap-1 border border-zinc-800 bg-black/30 px-1 py-2 text-zinc-300/80 transition-none hover:border-primary/30 hover:text-primary'
                  }
                  href={item.href}
                  title={item.label}
                >
                  {renderNavIcon(item.href as V2NavAnchor, 'h-4 w-4')}
                  {renderNavLabel(item.label, 'text-[7px] leading-none text-center', isActive ? 'text-primary/70 text-[6px]' : 'text-zinc-500/95 text-[6px] font-medium')}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
