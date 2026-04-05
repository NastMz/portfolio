import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <article
      className={cn(
        'rounded-none border border-[var(--v2-color-border)] bg-[var(--v2-color-surface)] p-6',
        className,
      )}
      {...props}
    />
  )
}
