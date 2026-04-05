import { cn } from '@/lib/utils'

type SignalKind = 'ok' | 'warn' | 'info'

const signalClassName: Record<SignalKind, string> = {
  ok: 'border-[var(--v2-color-signal-ok)] text-[var(--v2-color-signal-ok)]',
  warn: 'border-[var(--v2-color-signal-warn)] text-[var(--v2-color-signal-warn)]',
  info: 'border-[var(--v2-color-signal-info)] text-[var(--v2-color-signal-info)]',
}

interface SignalBadgeProps {
  kind?: SignalKind
  children: string
  className?: string
}

export function SignalBadge({ kind = 'info', children, className }: SignalBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border bg-transparent px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em]',
        signalClassName[kind],
        className,
      )}
    >
      {children}
    </span>
  )
}
