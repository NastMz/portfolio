import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost'

const baseClassName =
  'v2-focusable inline-flex items-center justify-center rounded-none border px-5 py-2.5 text-sm font-semibold transition-colors duration-[var(--v2-motion-duration)] ease-[var(--v2-motion-ease)]'

const variantClassName: Record<Variant, string> = {
  primary:
    'border-[var(--v2-color-brand)] bg-[var(--v2-color-brand)] text-[var(--v2-color-bg)] hover:bg-[var(--v2-color-brand-strong)] hover:border-[var(--v2-color-brand-strong)]',
  ghost:
    'border-[var(--v2-color-border)] bg-transparent text-[var(--v2-color-text)] hover:bg-[var(--v2-color-surface)]',
}

interface CommonProps {
  children: ReactNode
  variant?: Variant
  className?: string
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button className={cn(baseClassName, variantClassName[variant], className)} {...props}>
      {children}
    </button>
  )
}

type LinkButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>

export function LinkButton({ children, variant = 'primary', className, ...props }: LinkButtonProps) {
  return (
    <a className={cn(baseClassName, variantClassName[variant], className)} {...props}>
      {children}
    </a>
  )
}
