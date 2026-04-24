import type { Locale } from "@/i18n/config";

export interface NavItem {
  label: string;
  href: string;
}

interface NavProps {
  locale: Locale;
  items: NavItem[];
  localeLabel: string;
}

export function Nav({ locale, items, localeLabel }: NavProps) {
  const otherLocale: Locale = locale === "en" ? "es" : "en";

  return (
    <header className="border-b border-[var(--portfolio-color-border)] bg-[var(--portfolio-color-surface-strong)]">
      <nav
        className="-container flex flex-wrap items-center justify-between gap-4 py-5"
        aria-label=" main navigation"
      >
        <ul className="flex flex-wrap items-center gap-3 text-sm text-[var(--portfolio-color-text-muted)]">
          {items.map((item) => (
            <li key={item.href}>
              <a
                className="-focusable rounded-none border border-transparent px-2 py-1 hover:border-[var(--portfolio-color-border)] hover:text-[var(--portfolio-color-text)]"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          className="-focusable rounded-none border border-[var(--portfolio-color-border)] bg-[var(--portfolio-color-bg)] px-3 py-1.5 text-xs uppercase tracking-wide text-[var(--portfolio-color-text)]"
          href={`/${otherLocale}`}
        >
          {localeLabel}
        </a>
      </nav>
    </header>
  );
}
