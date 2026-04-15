import type { ReactNode } from "react";

const SHELL_PANEL_TONE = {
  default: "border-zinc-800/80 bg-black/40",
  muted: "border-zinc-800/60 bg-zinc-950/65",
  accent: "border-primary/30 bg-primary/[0.05]",
} as const;

type V2ShellPanelTone = keyof typeof SHELL_PANEL_TONE;

interface V2ShellPanelProps {
  children?: ReactNode;
  tone?: V2ShellPanelTone;
  label?: string;
}

export function V2ShellPanel({
  children,
  tone = "default",
  label,
}: V2ShellPanelProps) {
  return (
    <div className={`border ${SHELL_PANEL_TONE[tone]}`} data-shell-panel={tone}>
      {label ? (
        <div className="flex items-center gap-3 border-b border-inherit px-4 py-3 md:px-6">
          <span className="font-label text-[10px] uppercase tracking-[0.22em] text-primary">
            {label}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-zinc-800/80" />
        </div>
      ) : null}
      <div className="px-4 py-4 md:px-6 md:py-5">{children}</div>
    </div>
  );
}

export type { V2ShellPanelProps, V2ShellPanelTone };
