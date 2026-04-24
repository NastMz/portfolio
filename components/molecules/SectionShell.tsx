import type { PropsWithChildren } from "react";

interface SectionShellProps extends PropsWithChildren {
  id?: string;
  title: string;
  subtitle?: string;
}

export function SectionShell({
  id,
  title,
  subtitle,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className="-container border-b border-[var(--portfolio-color-border)] py-12"
    >
      <header className="mb-6">
        <h2 className="text-2xl font-semibold uppercase tracking-[0.08em]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-[var(--portfolio-color-text-muted)]">{subtitle}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}
