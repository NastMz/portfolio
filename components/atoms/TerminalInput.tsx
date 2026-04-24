interface TerminalInputProps {
  label: string;
  value: string;
}

export function TerminalInput({ label, value }: TerminalInputProps) {
  return (
    <div className="border border-[var(--portfolio-color-border)] bg-[var(--portfolio-color-bg)] px-3 py-2">
      <p className="text-xs uppercase tracking-[0.12em] text-[var(--portfolio-color-text-muted)]">
        {label}
      </p>
      <p className="mt-1 font-mono text-sm text-[var(--portfolio-color-text)]">
        {value}
      </p>
    </div>
  );
}
