import { ShellSectionHeader } from "@/components/molecules/ShellSectionHeader";
import { ShellPanel } from "@/components/molecules/ShellPanel";
import { PortfolioMessagesShape } from "./types";
import { renderMetadataLabel } from "./utils";

export function CaseStudiesSection({
  copy,
}: {
  copy: PortfolioMessagesShape["caseStudies"];
}) {
  return (
    <section
      className="border-y border-zinc-800/30 bg-surface-container-lowest px-8 py-24 md:px-16"
      id="projects"
    >
      <div className="max-w-6xl mx-auto" id="case-study">
        <ShellSectionHeader
          aside="[SYSTEM_RECORDS: LIVE]"
          sourceLabel={renderMetadataLabel(copy.subtitle)}
          title={copy.title}
          alias={copy.alias}
        />

        <div className="mt-8 space-y-4">
          {copy.items.map((item, index) => (
            <ShellPanel key={item.id} label={`[${item.id}]`} tone={"muted"}>
              <details
                className="group border border-transparent p-4 open:border-primary/30"
                open={index === 0}
              >
                <summary className="list-none cursor-pointer p-2 md:p-3">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="text-left max-w-full lg:max-w-3xl leading-tight">
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span
                          className={`${item.statusClass ?? "bg-zinc-700"} ${item.statusClass === "bg-error" ? "text-white" : "text-black"} w-fit px-2 py-0.5 font-label text-[9px] font-bold`}
                        >
                          {item.status}
                        </span>
                        <span className="font-label text-[9px] uppercase tracking-[0.18em] text-zinc-500/95">
                          {"// record: summary"}
                        </span>
                      </div>
                      <h3 className="mb-2 font-headline text-2xl font-bold group-hover:text-primary">
                        {item.title}
                      </h3>
                      <p className="max-w-3xl font-body text-zinc-300/95">
                        {item.summary}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 border border-zinc-800 bg-black/40 px-3 py-2 text-zinc-400 group-hover:border-primary/30 group-hover:text-primary">
                      <span className="font-label text-[9px] uppercase tracking-[0.24em]">
                        {copy.toggleHint}
                      </span>
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 ease-out group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.8"
                        />
                      </svg>
                    </div>
                  </div>
                </summary>

                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="border-t border-zinc-800/70 px-2 pb-3 md:px-3 md:pb-4">
                      <div className="grid grid-cols-1 gap-8 pt-6 md:grid-cols-2">
                        <div>
                          <div className="mb-2 font-label text-[10px] uppercase text-zinc-400">
                            PROBLEM
                          </div>
                          <p className="font-body text-sm text-zinc-400/95">
                            {item.problem}
                          </p>
                        </div>
                        <div>
                          <div className="mb-2 font-label text-[10px] uppercase text-zinc-400">
                            DECISION
                          </div>
                          <p className="font-body text-sm text-zinc-400/95">
                            {item.decision}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={`${item.id}-${tag}`}
                            className="border border-zinc-700 bg-surface-container-highest px-3 py-1 font-label text-[10px] uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </ShellPanel>
          ))}
        </div>

        <div className="mt-8 text-center">
          <span className="font-label text-[10px] text-zinc-500/95 italic font-medium">
            {copy.footerHint}
          </span>
        </div>
      </div>
    </section>
  );
}
