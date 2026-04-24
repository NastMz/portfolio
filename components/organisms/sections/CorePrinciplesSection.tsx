import { ShellSectionHeader } from "@/components/molecules/ShellSectionHeader";
import { ShellPanel } from "@/components/molecules/ShellPanel";
import { PrincipleCopy } from "./types";

export function CorePrinciplesSection({
  title,
  items,
}: {
  title: string;
  items: PrincipleCopy[];
}) {
  return (
    <section
      className="relative px-8 py-28 scroll-mt-28 md:px-16"
      id="core-principles"
    >
      <div className="pointer-events-none absolute right-0 top-1/4 h-[1px] w-64 rotate-45 bg-primary/20" />
      <div className="mx-auto max-w-7xl">
        <ShellSectionHeader
          aside="[OVERVIEW_BLOCK: ACTIVE]"
          sourceLabel="// source: [manifest_registry]"
          title={title}
          alias="// principles under constraints"
        />
      </div>
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 items-stretch gap-6 md:grid-cols-2 2xl:grid-cols-4">
        {items.map((item) => (
          <ShellPanel
            key={item.id}
            label={item.indexLabel}
            tone={item.isCritical ? "accent" : "muted"}
          >
            <div
              className={
                item.isCritical
                  ? "mb-4 font-label text-[9px] uppercase tracking-[0.18em] text-primary/75"
                  : "mb-4 font-label text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-500/95"
              }
            >
              {item.isCritical
                ? "// core principles (high priority)"
                : "// foundational principles"}
            </div>
            <h3
              className={
                item.isCritical
                  ? "mb-6 font-headline text-2xl font-bold text-primary"
                  : "mb-4 font-headline text-xl font-extrabold text-zinc-100/95"
              }
            >
              {item.title}
            </h3>
            <p
              className={
                item.isCritical
                  ? "font-body text-md text-zinc-100 leading-relaxed"
                  : "font-body text-sm text-zinc-400/95 leading-relaxed font-medium"
              }
            >
              {item.description}
            </p>
            <div
              className={
                item.isCritical
                  ? "mt-8 h-[2px] w-full bg-primary/40"
                  : "mt-6 h-px w-full bg-zinc-800"
              }
            />
            <div
              className={
                item.isCritical
                  ? "mt-4 flex justify-between gap-4 font-label text-[10px] text-primary"
                  : "mt-4 flex justify-between gap-4 font-label text-[10px] font-medium text-zinc-500/95"
              }
            >
              <span>{item.priorityLabel}</span>
              <span className="text-right italic">{item.hint}</span>
            </div>
          </ShellPanel>
        ))}
      </div>
    </section>
  );
}
