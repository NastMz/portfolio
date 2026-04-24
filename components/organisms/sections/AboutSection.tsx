import { ShellSectionHeader } from "@/components/molecules/ShellSectionHeader";
import { ShellPanel } from "@/components/molecules/ShellPanel";
import { AboutCopy } from "./types";
import { renderMetadataLabel } from "./utils";

export function AboutSection({ copy }: { copy: AboutCopy }) {
  return (
    <section
      className="grid grid-cols-1 gap-8 border-b border-zinc-800/20 bg-surface-container-low/50 px-8 py-24 lg:grid-cols-12 lg:items-start md:px-16"
      id="identity"
    >
      <div className="lg:col-span-5 lg:-translate-x-4">
        <ShellSectionHeader
          aside={copy.stanceBadge}
          sourceLabel={copy.modeBadge}
          title={copy.title}
          alias={copy.fileLabel}
        />
        <div className="mt-6 hidden lg:block">
          <ShellPanel label={copy.avoidTitle} tone="muted">
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute -right-4 -top-4 select-none font-label text-[40px] opacity-5">
                {copy.watermark}
              </div>
              <ul className="space-y-2 font-label text-[10px] font-medium text-zinc-400/90">
                {copy.avoidItems.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </ShellPanel>
        </div>
      </div>
      <div className="space-y-6 lg:col-span-7">
        <ShellPanel
          label={renderMetadataLabel(copy.fileLabel)}
          tone="default"
        >
          <div className="space-y-6">
            {copy.paragraphs.map((paragraph, index) => (
              <p
                key={`${index}-${paragraph.slice(0, 24)}`}
                className={
                  index === 0
                    ? "font-body text-xl leading-relaxed text-zinc-200"
                    : "font-body text-zinc-300/95"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </ShellPanel>
        <div className="flex flex-wrap gap-4">
          <div className="border border-outline-variant/20 bg-surface-container px-3 py-1 font-label text-[10px] text-zinc-400/90">
            {copy.modeBadge}
          </div>
          <div className="border border-outline-variant/20 bg-surface-container px-3 py-1 font-label text-[10px] text-zinc-400/90">
            {copy.stanceBadge}
          </div>
        </div>
      </div>
    </section>
  );
}
