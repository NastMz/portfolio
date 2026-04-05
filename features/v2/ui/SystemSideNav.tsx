interface SystemSideNavItem {
  label: string
  href: string
}

interface SystemSideNavProps {
  title: string
  items: SystemSideNavItem[]
}

export function SystemSideNav({ title, items }: SystemSideNavProps) {
  return (
    <aside className="border border-[var(--v2-color-border)] bg-[var(--v2-color-surface)] p-4">
      <p className="mb-3 text-xs uppercase tracking-[0.12em] text-[var(--v2-color-text-muted)]">{title}</p>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <a className="v2-focusable inline-block rounded-none border border-transparent px-2 py-1 hover:border-[var(--v2-color-border)]" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
