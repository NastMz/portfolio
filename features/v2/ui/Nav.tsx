import type { Locale } from '@/i18n/config'

export interface V2NavItem {
  label: string
  href: string
}

interface V2NavProps {
  locale: Locale
  items: V2NavItem[]
  localeLabel: string
}

export function Nav({ locale, items, localeLabel }: V2NavProps) {
  const otherLocale: Locale = locale === 'en' ? 'es' : 'en'

  return (
    <header className="border-b border-[var(--v2-color-border)] bg-[color-mix(in_srgb,var(--v2-color-bg),black_12%)]">
      <nav className="v2-container flex flex-wrap items-center justify-between gap-4 py-5" aria-label="V2 main navigation">
        <ul className="flex flex-wrap items-center gap-3 text-sm text-[var(--v2-color-text-muted)]">
          {items.map((item) => (
            <li key={item.href}>
              <a className="v2-focusable rounded-md px-2 py-1 hover:text-[var(--v2-color-text)]" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          className="v2-focusable rounded-md border border-[var(--v2-color-border)] px-3 py-1.5 text-xs uppercase tracking-wide text-[var(--v2-color-text)]"
          href={`/${otherLocale}/v2`}
        >
          {localeLabel}
        </a>
      </nav>
    </header>
  )
}
