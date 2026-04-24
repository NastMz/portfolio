import { ShellSectionHeader } from "@/components/molecules/ShellSectionHeader";
import { ShellPanel } from "@/components/molecules/ShellPanel";
import { PortfolioMessagesShape } from "./types";
import { renderMetadataLabel } from "./utils";

export function DecisionLogSection({
  copy,
}: {
  copy: PortfolioMessagesShape["decisionLog"];
}) {
  return (
    <section
      className="scanline-magenta border-b border-zinc-900 bg-black px-8 py-32 scroll-mt-28 md:px-16"
      id="decision-log"
    >
      <ShellSectionHeader
        aside="[LOG_STORE: HOT]"
        sourceLabel={renderMetadataLabel(copy.storeLabel)}
        title={copy.title}
        alias={copy.alias}
      />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {copy.items.map((item) => (
          <ShellPanel key={item.id} label={`[${item.id}]`} tone="muted">
            <div className="flex h-full flex-col overflow-hidden border border-zinc-800 bg-[#111111] p-6 transition-all group hover:border-primary/30">
              <div className="font-label text-[10px] text-primary tracking-widest mb-3">
                [{item.id}]
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <div
                  className={`${item.statusClass} ${item.statusClass === "bg-primary" ? "text-black" : "text-white"} font-label text-[9px] px-2 py-0.5 w-fit font-bold`}
                >
                  {item.status}
                </div>
                <div className="bg-zinc-800 text-zinc-300 font-label text-[9px] px-2 py-0.5 w-fit">
                  {item.context}
                </div>
              </div>
              <h3 className="font-headline font-bold text-xl mb-3 group-hover:text-primary">
                {item.title}
              </h3>
              <p className="font-body text-sm text-zinc-400/95 mb-6">
                {item.body}
              </p>
              <div className="mt-auto pt-4 border-t border-zinc-800">
                <div className="font-label text-[9px] text-zinc-400 uppercase">
                  {copy.tradeoffLabel}
                </div>
                <div className="font-label text-[9px] text-primary mt-1">
                  {item.tradeoff}
                </div>
              </div>
            </div>
          </ShellPanel>
        ))}
      </div>
      <div className="mt-8 text-center">
        <span className="font-label text-[10px] text-zinc-500/95 italic font-medium">
          {copy.footerHint}
        </span>
      </div>
    </section>
  );
}
