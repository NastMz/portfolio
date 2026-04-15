import Link from "next/link";
import { getMessages } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import {
  V2ContactTerminalForm,
  type V2ContactTerminalFormCopy,
} from "@/features/v2/ui/V2ContactTerminalForm";
import { V2BootOverlay } from "@/features/v2/ui/V2BootOverlay";
import { V2BootReplayTitle } from "@/features/v2/ui/V2BootReplayTitle";
import { V2CustomCursor } from "@/features/v2/ui/V2CustomCursor";
import { V2HoverTrace } from "@/features/v2/ui/V2HoverTrace";
import { V2HypeResistanceMetric } from "@/features/v2/ui/V2HypeResistanceMetric";
import { V2ShellPanel } from "@/features/v2/ui/V2ShellPanel";
import { V2ShellSectionHeader } from "@/features/v2/ui/V2ShellSectionHeader";
import { V2SectionNavigation } from "@/features/v2/ui/V2SectionNavigation";
import { V2SystemStateDrift } from "@/features/v2/ui/V2SystemStateDrift";
import { getCanonicalRoutePath, type CanonicalRouteKey } from "@/lib/site";

interface V2PortfolioPageProps {
  locale: Locale;
  routeKey?: CanonicalRouteKey;
}

interface V2NavLink {
  label: string;
  href: string;
}

type V2NavAnchor =
  | "#overview"
  | "#systems"
  | "#artifacts"
  | "#decision-log"
  | "#stack"
  | "#contact";

interface ParsedNavLabel {
  technical: string;
  human?: string;
}

interface V2StatusItem {
  label: string;
  value: string;
  valueClassName?: string;
}

interface V2TopBarCopy {
  title: string;
  systemEvents: string[];
  ping: string;
  pingStates?: string[];
  localeSwitchPrefix: string;
}

interface V2SidebarCopy {
  monitorTitle: string;
  monitorItems: V2StatusItem[];
  nav: V2NavLink[];
  throughputTitle: string;
  throughputLatestLog: string;
  throughputLogs?: string[];
  version: string;
}

interface V2HeroCopy {
  eyebrow: string;
  signals?: string[];
  title: string;
  titleMuted: string;
  subtitlePrefix: string;
  subtitleHighlight: string;
  quote: string;
  plainStatement?: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  cvCta: string;
  codeHint: string;
}

interface V2AboutCopy {
  fileLabel: string;
  title: string;
  watermark: string;
  avoidTitle: string;
  avoidItems: string[];
  paragraphs: string[];
  modeBadge: string;
  stanceBadge: string;
}

interface V2PrincipleCopy {
  id: string;
  indexLabel: string;
  title: string;
  description: string;
  isCritical?: boolean;
  priorityLabel?: string;
  hint?: string;
}

interface V2CaseStudyEntry {
  id: string;
  title: string;
  summary: string;
  problem: string;
  decision: string;
  tags: string[];
  status: string;
  statusClass?: string;
}

interface V2ArtifactEntry {
  id: string;
  track: string;
  name: string;
  type: string;
  status: string;
  description: string;
  details: string[];
  stack: string[];
  distribution: string;
  distributionHref?: string;
  distributionLabel?: string;
  repoHref?: string;
  intent: string;
}

interface V2DecisionItem {
  id: string;
  statusClass: string;
  status: string;
  context: string;
  title: string;
  body: string;
  tradeoff: string;
}

interface V2StackItem {
  id: string;
  category: string;
  name: string;
  detail: string;
}

interface V2NoteItem {
  id: string;
  borderClass: string;
  markerClass: string;
  title: string;
  tag: string;
  body: string;
}

interface V2ContactCopy {
  eyebrow: string;
  title: string;
  description: string;
  form: V2ContactTerminalFormCopy;
}

interface V2FooterCopy {
  title: string;
  build: string;
  links: V2NavLink[];
}

interface V2FloatingPanelCopy {
  label: string;
}

const canonicalNavAnchors: V2NavAnchor[] = [
  "#overview",
  "#systems",
  "#artifacts",
  "#decision-log",
  "#stack",
  "#contact",
];

interface V2MessagesShape {
  a11y: {
    skipToContent: string;
    localeSwitchLabel: string;
    sidebarNavLabel: string;
    mobileNavLabel: string;
  };
  topBar: V2TopBarCopy;
  sidebar: V2SidebarCopy;
  hero: V2HeroCopy;
  about: V2AboutCopy;
  principles: {
    title: string;
    items: V2PrincipleCopy[];
  };
  caseStudies: {
    title: string;
    subtitle: string;
    alias?: string;
    footerHint: string;
    toggleHint: string;
    items: V2CaseStudyEntry[];
  };
  artifacts: {
    title: string;
    alias?: string;
    inventoryLabel: string;
    buildLogLabel: string;
    systemComponentsLabel: string;
    systemComponentsAlias?: string;
    trackLabel: string;
    typeLabel: string;
    statusLabel: string;
    detailsLabel: string;
    stackLabel: string;
    distributionLabel: string;
    repoLabel: string;
    intentLabel: string;
    items: V2ArtifactEntry[];
  };
  decisionLog: {
    title: string;
    alias?: string;
    storeLabel: string;
    tradeoffLabel: string;
    footerHint: string;
    items: V2DecisionItem[];
  };
  stack: {
    title: string;
    alias?: string;
    footerHint: string;
    items: V2StackItem[];
  };
  notes: {
    title: string;
    subtitle: string;
    items: V2NoteItem[];
  };
  contact: V2ContactCopy;
  footer: V2FooterCopy;
  floatingPanel: V2FloatingPanelCopy;
}

function resolveV2MessagesShape(messages: unknown): V2MessagesShape {
  const payload = messages as { V2?: V2MessagesShape };

  if (!payload?.V2) {
    throw new Error("Missing 'V2' messages payload for v2 experience");
  }

  return payload.V2;
}

function parseNavLabel(label: string): ParsedNavLabel {
  const [technical, human] = label.split("//").map((part) => part.trim());

  return {
    technical,
    human: human && human.length > 0 ? `// ${human}` : undefined,
  };
}

function renderNavLabel(
  label: string,
  className?: string,
  humanClassName?: string,
) {
  const parsed = parseNavLabel(label);

  return (
    <span className={className}>
      <span className="block">{parsed.technical}</span>
      {parsed.human ? (
        <span
          className={`block normal-case tracking-normal ${humanClassName ?? "text-zinc-500"}`}
        >
          {parsed.human}
        </span>
      ) : null}
    </span>
  );
}

function renderMetadataLabel(label: string) {
  const normalized = label
    .replace(/\/\//g, "")
    .replace(/^\[|\]$/g, "")
    .trim()
    .toLowerCase();

  return `// source: [${normalized}]`;
}

function resolveCanonicalNav(items: V2NavLink[]): V2NavLink[] {
  const byHref = new Map(items.map((item) => [item.href, item]));

  return canonicalNavAnchors.map((href) => {
    const item = byHref.get(href);

    if (!item) {
      throw new Error(`Missing canonical V2 navigation item for ${href}`);
    }

    return item;
  });
}

function TopBar({
  copy,
  localeSwitchCode,
  localeSwitchHref,
  localeSwitchLabel,
}: {
  copy: V2TopBarCopy;
  localeSwitchCode: string;
  localeSwitchHref: string;
  localeSwitchLabel: string;
}) {
  const initialEvent = copy.systemEvents[0] ?? "[STATUS: SYSTEM_STABLE]";

  return (
    <header className="bg-[#0E0E0E] text-[#FF7CF5] font-headline tracking-tight text-sm uppercase flex justify-between items-center w-full px-6 py-4 max-w-full fixed top-0 z-50 border-b border-zinc-800/30">
      <V2BootReplayTitle label={copy.title} />
      <div className="hidden md:flex flex-1 justify-center px-8 pointer-events-none">
        <div className="max-w-[32rem] w-full font-label text-[10px] tracking-[0.18em] text-zinc-500/95 text-center font-medium">
          <V2SystemStateDrift
            initialState={initialEvent}
            states={copy.systemEvents}
            minIntervalMs={4000}
            intervalWindowMs={4000}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs font-label">
        <Link
          aria-label={localeSwitchLabel}
          className="inline-flex items-center gap-2 border border-primary/30 px-2 py-1 text-primary bg-zinc-900 hover:bg-[#FF7CF5]/10 hover:text-[#FF7CF5] transition-none"
          href={localeSwitchHref}
          scroll={false}
          title={localeSwitchLabel}
        >
          <span className="text-zinc-500/95 font-medium">
            {copy.localeSwitchPrefix}
          </span>
          <span aria-hidden="true">⇄</span>
          {localeSwitchCode}
        </Link>
        <V2SystemStateDrift initialState={copy.ping} states={copy.pingStates} />
      </div>
    </header>
  );
}

function HeroSection({
  copy,
  cvHref,
  routeKey,
}: {
  copy: V2HeroCopy;
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

function AboutSection({ copy }: { copy: V2AboutCopy }) {
  return (
    <section
      className="grid grid-cols-1 gap-8 border-b border-zinc-800/20 bg-surface-container-low/50 px-8 py-24 lg:grid-cols-12 lg:items-start md:px-16"
      id="identity"
    >
      <div className="lg:col-span-5 lg:-translate-x-4">
        <V2ShellSectionHeader
          aside={copy.stanceBadge}
          sourceLabel={copy.modeBadge}
          title={copy.title}
          alias={copy.fileLabel}
        />
        <div className="mt-6 hidden lg:block">
          <V2ShellPanel label={copy.avoidTitle} tone="muted">
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
          </V2ShellPanel>
        </div>
      </div>
      <div className="space-y-6 lg:col-span-7">
        <V2ShellPanel
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
        </V2ShellPanel>
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

function CorePrinciplesSection({
  title,
  items,
}: {
  title: string;
  items: V2PrincipleCopy[];
}) {
  return (
    <section
      className="relative px-8 py-28 scroll-mt-28 md:px-16"
      id="core-principles"
    >
      <div className="pointer-events-none absolute right-0 top-1/4 h-[1px] w-64 rotate-45 bg-primary/20" />
      <div className="mx-auto max-w-7xl">
        <V2ShellSectionHeader
          aside="[OVERVIEW_BLOCK: ACTIVE]"
          sourceLabel="// source: [manifest_registry]"
          title={title}
          alias="// principles under constraints"
        />
      </div>
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 items-stretch gap-6 md:grid-cols-2 2xl:grid-cols-4">
        {items.map((item) => (
          <V2ShellPanel
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
          </V2ShellPanel>
        ))}
      </div>
    </section>
  );
}

function CaseStudiesSection({
  copy,
}: {
  copy: V2MessagesShape["caseStudies"];
}) {
  return (
    <section
      className="border-y border-zinc-800/30 bg-surface-container-lowest px-8 py-24 md:px-16"
      id="projects"
    >
      <div className="max-w-6xl mx-auto" id="case-study">
        <V2ShellSectionHeader
          aside="[SYSTEM_RECORDS: LIVE]"
          sourceLabel={renderMetadataLabel(copy.subtitle)}
          title={copy.title}
          alias={copy.alias}
        />

        <div className="mt-8 space-y-4">
          {copy.items.map((item, index) => (
            <V2ShellPanel key={item.id} label={`[${item.id}]`} tone={"muted"}>
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
            </V2ShellPanel>
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

function DecisionLogSection({
  copy,
}: {
  copy: V2MessagesShape["decisionLog"];
}) {
  return (
    <section
      className="scanline-magenta border-b border-zinc-900 bg-black px-8 py-32 scroll-mt-28 md:px-16"
      id="decision-log"
    >
      <V2ShellSectionHeader
        aside="[LOG_STORE: HOT]"
        sourceLabel={renderMetadataLabel(copy.storeLabel)}
        title={copy.title}
        alias={copy.alias}
      />
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {copy.items.map((item) => (
          <V2ShellPanel key={item.id} label={`[${item.id}]`} tone="muted">
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
          </V2ShellPanel>
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

function ArtifactsSection({ copy }: { copy: V2MessagesShape["artifacts"] }) {
  const groupedItems = copy.items.reduce<Map<string, V2ArtifactEntry[]>>(
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
        <V2ShellSectionHeader
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

function StackEvaluationSection({ copy }: { copy: V2MessagesShape["stack"] }) {
  return (
    <section
      className="bg-surface-container-low/30 px-8 py-24 scroll-mt-28 md:px-16"
      id="stack-evaluation"
    >
      <V2ShellSectionHeader
        aside="[STACK_AUDIT: CURRENT]"
        sourceLabel={renderMetadataLabel("stack: evolving")}
        title={copy.title}
        alias={copy.alias}
      />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {copy.items.map((item) => (
          <V2ShellPanel key={item.id} label={item.category} tone="muted">
            <div className="flex min-h-40 flex-col items-center justify-center text-center group">
              <div className="mb-2 font-headline text-xl font-bold group-hover:text-primary">
                {item.name}
              </div>
              <div className="font-label text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-300/95">
                {item.detail}
              </div>
            </div>
          </V2ShellPanel>
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

function NotesSection({ copy }: { copy: V2MessagesShape["notes"] }) {
  return (
    <section className="px-8 py-24 md:px-16" id="notes">
      <V2ShellSectionHeader
        aside="[FIELD_NOTES: OPEN]"
        sourceLabel={renderMetadataLabel(copy.subtitle)}
        title={copy.title}
        alias="// observations under load"
      />
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {copy.items.map((item) => (
          <V2ShellPanel key={item.id} label={`[${item.id}]`} tone="muted">
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
          </V2ShellPanel>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ copy }: { copy: V2ContactCopy }) {
  return (
    <section
      className="flex flex-col items-center bg-surface-container-lowest px-8 py-32 text-center scroll-mt-28 md:px-16"
      id="contact"
    >
      <div className="w-full max-w-2xl">
        <V2ShellSectionHeader
          sourceLabel={renderMetadataLabel(copy.eyebrow)}
          title={copy.title}
          alias="// initiate terminal handshake"
        />
        <div className="mt-8">
          <V2ShellPanel label="[CONTACT_PROTOCOL]" tone="accent">
            <p className="text-lg mb-8 font-body text-zinc-400">
              {copy.description}
            </p>
            <V2ContactTerminalForm copy={copy.form} />
          </V2ShellPanel>
        </div>
      </div>
    </section>
  );
}

function Footer({ copy }: { copy: V2FooterCopy }) {
  const buildStamp = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .replace(/-/g, ".");

  const dynamicBuild = copy.build.replace(
    /\[BUILD_[^\]]+\]/,
    `[BUILD_${buildStamp}]`,
  );

  return (
    <footer
      className="bg-[#0E0E0E] text-[#FF7CF5] font-label text-[10px] uppercase w-full md:w-[calc(100%-16rem)] md:ml-64 px-8 py-12 pb-[calc(7rem+env(safe-area-inset-bottom))] md:pb-12 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-zinc-800/20 relative z-20 scroll-mt-28"
      id="footer"
    >
      <div className="mb-8 md:mb-0">
        <div className="text-[#FF7CF5] font-bold mb-2">{copy.title}</div>
        <div className="text-zinc-500/95 font-medium">{dynamicBuild}</div>
      </div>
      <div className="flex gap-8">
        {copy.links.map((item) => (
          <a
            key={item.href}
            className="text-zinc-400 hover:text-[#FF7CF5] transition-none"
            href={item.href}
            rel="noreferrer"
            target="_blank"
          >
            {item.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

export async function V2PortfolioPage({
  locale,
  routeKey = "home",
}: V2PortfolioPageProps) {
  const messages = await getMessages();
  const copy = resolveV2MessagesShape(messages);
  const canonicalSidebarNav = resolveCanonicalNav(copy.sidebar.nav);
  const targetLocale: Locale = locale === "en" ? "es" : "en";
  const localeSwitchHref = getCanonicalRoutePath(targetLocale, routeKey);
  const localeSwitchCode = targetLocale.toUpperCase();
  const cvHref =
    locale === "es"
      ? "/cv/CV_Kevin_Martinez_ES.pdf"
      : "/cv/CV_Kevin_Martinez_EN.pdf";

  return (
    <div
      className="v2-route v2-faithful bg-grid selection:bg-primary selection:text-on-primary relative"
      data-locale={locale}
      id="top"
    >
      <V2BootOverlay>
        <V2CustomCursor />
        <V2HoverTrace />
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-black focus:px-4 focus:py-3 focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          href="#main-content"
        >
          {copy.a11y.skipToContent}
        </a>
        <div className="interference-line top-1/4 -left-1/2" />
        <div className="interference-line top-3/4 -left-1/4" />

        <div className="fixed top-20 right-2 z-50 pointer-events-none hidden lg:block">
          <div className="bg-surface-container border border-primary/20 p-2 font-label text-[10px]">
            <div className="text-zinc-500/95 mb-1 font-medium">
              {copy.floatingPanel.label}
            </div>
            <div className="text-primary font-bold">
              <V2HypeResistanceMetric />
            </div>
          </div>
        </div>

        <TopBar
          copy={copy.topBar}
          localeSwitchHref={localeSwitchHref}
          localeSwitchCode={localeSwitchCode}
          localeSwitchLabel={copy.a11y.localeSwitchLabel}
        />
        <V2SectionNavigation
          brandTitle={copy.hero.title}
          copy={{ ...copy.sidebar, nav: canonicalSidebarNav }}
          mobileNavLabel={copy.a11y.mobileNavLabel}
          sidebarNavLabel={copy.a11y.sidebarNavLabel}
        />

        <main
          className="pt-24 pb-[calc(7rem+env(safe-area-inset-bottom))] md:ml-64 md:pb-24 relative z-10"
          id="main-content"
          tabIndex={-1}
        >
          <div className="scroll-mt-28" id="overview" />
          <HeroSection copy={copy.hero} cvHref={cvHref} routeKey={routeKey} />
          <AboutSection copy={copy.about} />
          <CorePrinciplesSection
            items={copy.principles.items}
            title={copy.principles.title}
          />
          <div className="scroll-mt-28" id="systems" />
          <CaseStudiesSection copy={copy.caseStudies} />
          <ArtifactsSection copy={copy.artifacts} />
          <DecisionLogSection copy={copy.decisionLog} />
          <div className="scroll-mt-28" id="stack" />
          <StackEvaluationSection copy={copy.stack} />
          <NotesSection copy={copy.notes} />
          <ContactSection copy={copy.contact} />
        </main>

        <Footer copy={copy.footer} />
      </V2BootOverlay>
    </div>
  );
}
