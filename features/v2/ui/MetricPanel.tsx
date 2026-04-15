interface MetricPanelProps {
  label: string;
  value: string;
  detail: string;
}

export function MetricPanel({ label, value, detail }: MetricPanelProps) {
  return (
    <article className="border border-[var(--v2-color-border)] bg-[var(--v2-color-surface)] p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-[var(--v2-color-text-muted)]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-[var(--v2-color-text-muted)]">{detail}</p>
    </article>
  );
}
