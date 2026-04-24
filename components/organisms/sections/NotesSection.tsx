import { ShellSectionHeader } from "@/components/molecules/ShellSectionHeader";
import { ShellPanel } from "@/components/molecules/ShellPanel";
import { PortfolioMessagesShape } from "./types";
import { renderMetadataLabel } from "./utils";

export function NotesSection({ copy }: { copy: PortfolioMessagesShape["notes"] }) {
  return (
    <section className="px-8 py-24 md:px-16" id="notes">
      <ShellSectionHeader
        aside="[FIELD_NOTES: OPEN]"
        sourceLabel={renderMetadataLabel(copy.subtitle)}
        title={copy.title}
        alias="// observations under load"
      />
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {copy.items.map((item) => (
          <ShellPanel key={item.id} label={`[${item.id}]`} tone="muted">
            <div className={`relative pl-12 ${item.borderClass}`}>
              <div
                className={`absolute -left-1.5 top-0 h-3 w-3 ${item.markerClass}`}
              />
              <h3 className="mb-2 font-headline text-xl font-bold">
                {item.title}
              </h3>
              <p className="mb-4 font-label text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-300/95">
                {item.tag}
              </p>
              <p className="font-body leading-relaxed text-zinc-300/95">
                {item.body}
              </p>
            </div>
          </ShellPanel>
        ))}
      </div>
    </section>
  );
}
