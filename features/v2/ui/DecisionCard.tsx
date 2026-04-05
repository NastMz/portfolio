import { DocCard } from './DocCard'

interface DecisionCardProps {
  title: string
  context: string
  decision: string
  tradeoff: string
}

export function DecisionCard({ title, context, decision, tradeoff }: DecisionCardProps) {
  return (
    <DocCard title={title} eyebrow="Decision log">
      <p>{context}</p>
      <p className="text-[var(--v2-color-text)]">{decision}</p>
      <p>{tradeoff}</p>
    </DocCard>
  )
}
