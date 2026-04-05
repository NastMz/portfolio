import type { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

interface DocCardProps extends PropsWithChildren {
  title: string
  eyebrow?: string
  className?: string
}

export function DocCard({ title, eyebrow, className, children }: DocCardProps) {
  return (
    <article className={cn('border border-[var(--v2-color-border)] bg-[var(--v2-color-surface)] p-5', className)}>
      {eyebrow ? (
        <p className="mb-2 text-xs uppercase tracking-[0.12em] text-[var(--v2-color-text-muted)]">{eyebrow}</p>
      ) : null}
      <h3 className="text-lg font-semibold uppercase tracking-[0.06em]">{title}</h3>
      <div className="mt-3 space-y-3 text-sm text-[var(--v2-color-text-muted)]">{children}</div>
    </article>
  )
}
