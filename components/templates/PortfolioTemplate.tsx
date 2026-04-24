"use client";

import React from "react";
import { BootOverlay } from "@/components/organisms/BootOverlay";
import { CustomCursor } from "@/components/organisms/CustomCursor";
import { HoverTrace } from "@/components/organisms/HoverTrace";
import { HypeResistanceMetric } from "@/components/organisms/HypeResistanceMetric";
import { SectionNavigation } from "@/components/organisms/SectionNavigation";
import { 
  TopBar, 
  Footer, 
  HeroSection, 
  AboutSection, 
  CorePrinciplesSection, 
  CaseStudiesSection, 
  ArtifactsSection, 
  DecisionLogSection, 
  StackEvaluationSection, 
  NotesSection, 
  ContactSection 
} from "@/components/organisms/sections";
import { PortfolioMessagesShape } from "@/components/organisms/sections/types";
import { CanonicalRouteKey } from "@/lib/site";
import { Locale } from "@/i18n/config";

interface PortfolioTemplateProps {
  locale: Locale;
  routeKey: CanonicalRouteKey;
  copy: PortfolioMessagesShape;
  canonicalSidebarNav: any[];
  localeSwitchHref: string;
  localeSwitchCode: string;
  cvHref: string;
}

export function PortfolioTemplate({
  locale,
  routeKey,
  copy,
  canonicalSidebarNav,
  localeSwitchHref,
  localeSwitchCode,
  cvHref,
}: PortfolioTemplateProps) {
  return (
    <div
      className="portfolio-route portfolio-faithful bg-grid selection:bg-primary selection:text-on-primary relative"
      data-locale={locale}
      id="top"
    >
      <BootOverlay>
        <CustomCursor />
        <HoverTrace />
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
              <HypeResistanceMetric />
            </div>
          </div>
        </div>

        <TopBar
          copy={copy.topBar}
          localeSwitchHref={localeSwitchHref}
          localeSwitchCode={localeSwitchCode}
          localeSwitchLabel={copy.a11y.localeSwitchLabel}
        />
        <SectionNavigation
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
      </BootOverlay>
    </div>
  );
}
