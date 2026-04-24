import { HeroCopy } from "./types";
import { renderMetadataLabel } from "./utils";
import type { CanonicalRouteKey } from "@/lib/site";

export function HeroSection({
  copy,
  cvHref,
  routeKey,
}: {
  copy: HeroCopy;
  cvHref: string;
  routeKey: CanonicalRouteKey;
}) {
  const shellEntryLabel = `[ENTRY_POINT: ${routeKey.toUpperCase()}]`;

  return (
    <section
      className="border-b border-zinc-800/30 scroll-mt-28 px-8 pb-14 pt-0 md:px-16 md:pb-16"
      data-shell-entry="true"
      id="hero"
    >
      <div className="max-w-6xl">
        <div className="mb-8 grid gap-6 border border-zinc-800/80 bg-black/35 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:p-6">
          <div>
            <div className="font-label text-[10px] uppercase tracking-[0.24em] text-primary">
              {copy.eyebrow}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div aria-hidden="true" className="h-px w-12 bg-primary/40" />
              <p className="font-label text-[10px] uppercase tracking-[0.18em] text-zinc-500/95">
                {renderMetadataLabel(copy.codeHint)}
              </p>
            </div>
          </div>

          <div className="grid gap-2 text-left md:min-w-[14rem] md:text-right">
            <p className="font-label text-[10px] uppercase tracking-[0.18em] text-zinc-500/95">
              {shellEntryLabel}
            </p>
          </div>
        </div>

        {copy.signals?.length ? (
          <div className="mb-6 flex flex-wrap gap-2">
            {copy.signals.map((signal) => (
              <span
                key={signal}
                className="border border-zinc-800 bg-zinc-950/80 px-2 py-1 font-label text-[9px] uppercase tracking-widest text-zinc-200"
              >
                {signal}
              </span>
            ))}
          </div>
        ) : null}
        <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter mb-4">
          {copy.title} —{" "}
          <span className="text-white/20">{copy.titleMuted}</span>
        </h1>
        <div className="mb-10 max-w-4xl border-l border-primary/30 pl-5 md:pl-6">
          <h2 className="font-headline text-2xl md:text-4xl text-zinc-400 mb-2 max-w-3xl leading-tight">
            {copy.subtitlePrefix}{" "}
            <span className="text-white underline decoration-primary/50 underline-offset-8">
              {copy.subtitleHighlight}
            </span>
          </h2>
          <p className="font-label text-primary/60 text-lg uppercase tracking-tight italic">
            &quot;{copy.quote}&quot;
          </p>
        </div>
        {copy.plainStatement ? (
          <p className="mb-4 font-label text-sm uppercase tracking-[0.18em] text-zinc-300">
            {copy.plainStatement}
          </p>
        ) : null}
        <p className="mb-12 max-w-2xl border-l-2 border-primary/20 pl-6 py-2 font-body text-lg text-zinc-400">
          {copy.description}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            className="inline-flex items-center gap-3 bg-primary px-8 py-4 font-label text-sm font-bold text-on-primary glitch-hover"
            data-cursor="cta"
            href="#systems"
          >
            <span aria-hidden="true">&gt;</span>
            {copy.primaryCta}
          </a>
          <a
            className="inline-flex items-center gap-3 border border-outline-variant/30 px-8 py-4 font-label text-sm font-bold text-primary transition-none hover:bg-primary/10"
            data-cursor="cta"
            href="#contact"
          >
            <span aria-hidden="true">$</span>
            {copy.secondaryCta}
          </a>
          <a
            className="inline-flex items-center gap-3 border border-primary/40 px-8 py-4 font-label text-sm font-bold text-zinc-200 transition-none hover:bg-primary/10"
            data-cursor="cta"
            download
            href={cvHref}
            target="_blank"
          >
            <span aria-hidden="true">#</span>
            {copy.cvCta}
          </a>
          <div className="ml-4 hidden font-label text-[10px] font-medium text-zinc-500/95 lg:block">
            {copy.codeHint}
          </div>
        </div>
      </div>
    </section>
  );
}
