import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <article
      className={cn(
        "rounded-none border border-[var(--portfolio-color-border)] bg-[var(--portfolio-color-surface)] p-6",
        className,
      )}
      {...props}
    />
  );
}
