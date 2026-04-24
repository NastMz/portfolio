import type { ReactNode } from "react";

interface SystemTopBarLink {
  label: string;
  href: string;
}

interface SystemTopBarProps {
  title: string;
  routeLabel: string;
  localeSwitchLabel: string;
  localeHref: string;
  links: SystemTopBarLink[];
  rightSlot?: ReactNode;
}

export function SystemTopBar({
  title,
  routeLabel,
  localeSwitchLabel,
  localeHref,
  links,
  rightSlot,
}: SystemTopBarProps) {
  return (
    <header className="border-b border-[var(--portfolio-color-border)] bg-[var(--portfolio-color-surface-strong)]">
      <nav
        className="-container flex flex-wrap items-center justify-between gap-4 py-4"
        aria-label=" main navigation"
      >
        <div className="flex min-w-[16rem] items-center gap-3">
          <p className="border border-[var(--portfolio-color-border)] px-2 py-1 text-xs uppercase tracking-[0.12em] text-[var(--portfolio-color-text-muted)]">
            {routeLabel}
          </p>
          <p className="text-sm font-semibold uppercase tracking-[0.08em]">
            {title}
          </p>
        </div>

        <ul className="flex flex-wrap items-center gap-2 text-sm text-[var(--portfolio-color-text-muted)]">
          {links.map((link) => (
            <li key={link.href}>
              <a
                className="-focusable rounded-none border border-transparent px-2 py-1 hover:border-[var(--portfolio-color-border)] hover:text-[var(--portfolio-color-text)]"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {rightSlot}
          <a
            className="-focusable rounded-none border border-[var(--portfolio-color-border)] bg-[var(--portfolio-color-bg)] px-3 py-1.5 text-xs uppercase tracking-wide text-[var(--portfolio-color-text)]"
            href={localeHref}
          >
            {localeSwitchLabel}
          </a>
        </div>
      </nav>
    </header>
  );
}
