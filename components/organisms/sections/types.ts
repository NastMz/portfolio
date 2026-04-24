import { ContactTerminalFormCopy } from "@/components/organisms/ContactTerminalForm";

export interface NavLink {
  label: string;
  href: string;
}

export interface StatusItem {
  label: string;
  value: string;
  valueClassName?: string;
}

export interface TopBarCopy {
  title: string;
  systemEvents: string[];
  ping: string;
  pingStates?: string[];
  localeSwitchPrefix: string;
}

export interface SidebarCopy {
  monitorTitle: string;
  monitorItems: StatusItem[];
  nav: NavLink[];
  throughputTitle: string;
  throughputLatestLog: string;
  throughputLogs?: string[];
  version: string;
}

export interface HeroCopy {
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

export interface AboutCopy {
  fileLabel: string;
  title: string;
  watermark: string;
  avoidTitle: string;
  avoidItems: string[];
  paragraphs: string[];
  modeBadge: string;
  stanceBadge: string;
}

export interface PrincipleCopy {
  id: string;
  indexLabel: string;
  title: string;
  description: string;
  isCritical?: boolean;
  priorityLabel?: string;
  hint?: string;
}

export interface CaseStudyEntry {
  id: string;
  title: string;
  summary: string;
  problem: string;
  decision: string;
  tags: string[];
  status: string;
  statusClass?: string;
}

export interface ArtifactEntry {
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

export interface DecisionItem {
  id: string;
  statusClass: string;
  status: string;
  context: string;
  title: string;
  body: string;
  tradeoff: string;
}

export interface StackItem {
  id: string;
  category: string;
  name: string;
  detail: string;
}

export interface NoteItem {
  id: string;
  borderClass: string;
  markerClass: string;
  title: string;
  tag: string;
  body: string;
}

export interface ContactCopy {
  eyebrow: string;
  title: string;
  description: string;
  form: ContactTerminalFormCopy;
}

export interface FooterCopy {
  title: string;
  build: string;
  links: NavLink[];
}

export interface FloatingPanelCopy {
  label: string;
}

export interface PortfolioMessagesShape {
  a11y: {
    skipToContent: string;
    localeSwitchLabel: string;
    sidebarNavLabel: string;
    mobileNavLabel: string;
  };
  topBar: TopBarCopy;
  sidebar: SidebarCopy;
  hero: HeroCopy;
  about: AboutCopy;
  principles: {
    title: string;
    items: PrincipleCopy[];
  };
  caseStudies: {
    title: string;
    subtitle: string;
    alias?: string;
    footerHint: string;
    toggleHint: string;
    items: CaseStudyEntry[];
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
    items: ArtifactEntry[];
  };
  decisionLog: {
    title: string;
    alias?: string;
    storeLabel: string;
    tradeoffLabel: string;
    footerHint: string;
    items: DecisionItem[];
  };
  stack: {
    title: string;
    alias?: string;
    footerHint: string;
    items: StackItem[];
  };
  notes: {
    title: string;
    subtitle: string;
    items: NoteItem[];
  };
  contact: ContactCopy;
  footer: FooterCopy;
  floatingPanel: FloatingPanelCopy;
}
