import { ShellSectionHeader } from "@/components/molecules/ShellSectionHeader";
import { ShellPanel } from "@/components/molecules/ShellPanel";
import { PortfolioMessagesShape } from "./types";
import { renderMetadataLabel } from "./utils";

export function StackEvaluationSection({ copy }: { copy: PortfolioMessagesShape["stack"] }) {
  return (
    <section
      className="bg-surface-container-low/30 px-8 py-24 scroll-mt-28 md:px-16"
      id="stack-evaluation"
    >
      <ShellSectionHeader
        aside="[STACK_AUDIT: CURRENT]"
        sourceLabel={renderMetadataLabel("stack: evolving")}
        title={copy.title}
        alias={copy.alias}
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.items.map((item) => (
          <ShellPanel key={item.id} label={item.category} tone="muted">
            <div className="flex min-h-40 flex-col items-center justify-center text-center group">
              <div className="mb-2 font-headline text-xl font-bold group-hover:text-primary">
                {item.name}
              </div>
              <div className="font-label text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-300/95">
                {item.detail}
              </div>
            </div>
          </ShellPanel>
        ))}
      </div>
      <div className="mt-4 text-right">
        <span className="font-label text-[9px] text-zinc-500/95 font-medium">
          {copy.footerHint}
        </span>
      </div>
    </section>
  );
}
