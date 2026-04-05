interface TerminalInputProps {
  label: string
  value: string
}

export function TerminalInput({ label, value }: TerminalInputProps) {
  return (
    <div className="border border-[var(--v2-color-border)] bg-[var(--v2-color-bg)] px-3 py-2">
      <p className="text-xs uppercase tracking-[0.12em] text-[var(--v2-color-text-muted)]">{label}</p>
      <p className="mt-1 font-mono text-sm text-[var(--v2-color-text)]">{value}</p>
    </div>
  )
}
