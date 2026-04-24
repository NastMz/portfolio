import { ShellSectionHeader } from "@/components/molecules/ShellSectionHeader";
import { ArtifactEntry, PortfolioMessagesShape } from "./types";
import { renderMetadataLabel } from "./utils";

export function ArtifactsSection({ copy }: { copy: PortfolioMessagesShape["artifacts"] }) {
  const groupedItems = copy.items.reduce<Map<string, ArtifactEntry[]>>(
    (groups, item) => {
      const currentItems = groups.get(item.track) ?? [];

      currentItems.push(item);
      groups.set(item.track, currentItems);

      return groups;
    },
    new Map(),
  );

  return (
    <section
      className="border-b border-zinc-800/30 bg-[#0d0d0d] px-8 py-24 scroll-mt-28 md:px-16"
      id="artifacts"
    >
      <div className="max-w-6xl mx-auto">
        <ShellSectionHeader
          aside="[INVENTORY_MODE: ACTIVE]"
          sourceLabel={renderMetadataLabel(copy.buildLogLabel)}
          title={copy.title}
          alias={copy.alias}
        />

        <div className="mt-8 border border-zinc-800 bg-black/40">
          <div className="px-6 md:px-8 py-4 border-b border-zinc-800 flex flex-wrap items-center gap-x-8 gap-y-3 bg-zinc-950/35">
            <span className="font-label text-xs md:text-sm text-primary tracking-[0.18em] uppercase font-bold">
              {copy.inventoryLabel}
            </span>
            <span className="font-label text-xs md:text-sm text-zinc-400 tracking-[0.18em] uppercase font-semibold">
              {copy.systemComponentsLabel}
              {copy.systemComponentsAlias ? (
                <span className="block text-[10px] md:text-xs text-zinc-500 mt-1">
                  {copy.systemComponentsAlias}
                </span>
              ) : null}
            </span>
          </div>

          {Array.from(groupedItems.entries()).map(([track, items]) => (
            <div
              key={track}
              className="border-b border-zinc-800/80 last:border-b-0"
            >
              <div className="px-6 md:px-8 py-4 border-b border-zinc-800/80 bg-zinc-950/70">
                <span className="font-label text-xs md:text-sm text-primary tracking-[0.18em] uppercase font-bold">
                  {copy.trackLabel}: {track}
                </span>
              </div>

              {items.map((item, index) => (
                <article
                  key={item.id}
                  className={`px-6 md:px-8 py-8 ${index < items.length - 1 ? "border-b border-zinc-800/80" : ""}`}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="font-label text-[10px] text-primary tracking-widest">
                      [{item.id}]
                    </span>
                    <span className="bg-zinc-800 text-zinc-300 font-label text-[9px] px-2 py-0.5 uppercase">
                      {copy.typeLabel}: {item.type}
                    </span>
                    <span className="bg-zinc-800 text-zinc-300 font-label text-[9px] px-2 py-0.5 uppercase">
                      {copy.statusLabel}: {item.status}
                    </span>
                  </div>

                  <h3 className="font-headline text-2xl font-bold mb-2">
                    {item.name}
                  </h3>
                  <p className="font-body text-zinc-300/95 mb-6 max-w-4xl">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
                    <div>
                      <div className="font-label text-[10px] text-zinc-500/95 uppercase mb-2 font-medium">
                        {copy.detailsLabel}
                      </div>
                      <ul className="space-y-2">
                        {item.details.map((detail) => (
                          <li
                            key={`${item.id}-${detail}`}
                            className="font-body text-sm text-zinc-400/95 before:content-['>'] before:text-primary before:mr-2"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="font-label text-[10px] text-zinc-500/95 uppercase mb-2 font-medium">
                          {copy.stackLabel}
                        </div>
                        <p className="font-label text-[10px] text-zinc-300 uppercase tracking-wider">
                          {item.stack.join(" · ")}
                        </p>
                      </div>

                      <div className="border-t border-zinc-800 pt-4">
                        <div className="font-label text-[10px] text-zinc-500/95 uppercase mb-1 font-medium">
                          {copy.distributionLabel}
                        </div>
                        {item.distributionHref ? (
                          <a
                            className="inline-flex items-center gap-2 font-label text-[10px] text-primary uppercase tracking-wider border border-primary/30 px-3 py-2 hover:bg-primary/10"
                            data-cursor="cta"
                            href={item.distributionHref}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <span>
                              {item.distributionLabel ?? item.distribution}
                            </span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        ) : (
                          <p className="font-label text-[10px] text-zinc-300/90 uppercase tracking-wider">
                            {item.distribution}
                          </p>
                        )}
                      </div>

                      <div className="border-t border-zinc-800 pt-4">
                        <div className="font-label text-[10px] text-zinc-500/95 uppercase mb-1 font-medium">
                          {copy.repoLabel}
                        </div>
                        {item.repoHref ? (
                          <a
                            className="inline-flex items-center gap-2 font-label text-[10px] text-zinc-200 uppercase tracking-wider border border-zinc-700 px-3 py-2 hover:border-primary/30 hover:text-primary"
                            data-cursor="cta"
                            href={item.repoHref}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <span>{item.name}</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        ) : (
                          <p className="font-label text-[10px] text-zinc-300/90 uppercase tracking-wider">
                            —
                          </p>
                        )}
                      </div>

                      <div className="border-t border-zinc-800 pt-4">
                        <div className="font-label text-[10px] text-zinc-500/95 uppercase mb-1 font-medium">
                          {copy.intentLabel}
                        </div>
                        <p className="font-body text-sm text-zinc-300/95">
                          {item.intent}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
