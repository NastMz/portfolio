interface MetricPanelProps {
  label: string;
  value: string;
  detail: string;
}

export function MetricPanel({ label, value, detail }: MetricPanelProps) {
  return (
    <article className="border border-[var(--portfolio-color-border)] bg-[var(--portfolio-color-surface)] p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-[var(--portfolio-color-text-muted)]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-[var(--portfolio-color-text-muted)]">{detail}</p>
    </article>
  );
}
