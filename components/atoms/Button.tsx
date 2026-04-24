import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

const baseClassName =
  "portfolio-focusable inline-flex items-center justify-center rounded-none border px-5 py-2.5 text-sm font-semibold transition-colors duration-[var(--portfolio-motion-duration)] ease-[var(--portfolio-motion-ease)]";

const variantClassName: Record<Variant, string> = {
  primary:
    "border-[var(--portfolio-color-brand)] bg-[var(--portfolio-color-brand)] text-[var(--portfolio-color-bg)] hover:bg-[var(--portfolio-color-brand-strong)] hover:border-[var(--portfolio-color-brand-strong)]",
  ghost:
    "border-[var(--portfolio-color-border)] bg-transparent text-[var(--portfolio-color-text)] hover:bg-[var(--portfolio-color-surface)]",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseClassName, variantClassName[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export function LinkButton({
  children,
  variant = "primary",
  className,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(baseClassName, variantClassName[variant], className)}
      {...props}
    >
      {children}
    </a>
  );
}
