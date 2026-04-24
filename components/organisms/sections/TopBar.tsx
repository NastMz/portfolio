"use client";

import Link from "next/link";
import { BootReplayTitle } from "@/components/molecules/BootReplayTitle";
import { SystemStateDrift } from "@/components/molecules/SystemStateDrift";
import { TopBarCopy } from "./types";

export function TopBar({
  copy,
  localeSwitchCode,
  localeSwitchHref,
  localeSwitchLabel,
}: {
  copy: TopBarCopy;
  localeSwitchCode: string;
  localeSwitchHref: string;
  localeSwitchLabel: string;
}) {
  const initialEvent = copy.systemEvents[0] ?? "[STATUS: SYSTEM_STABLE]";

  return (
    <header className="bg-[#0E0E0E] text-[#FF7CF5] font-headline tracking-tight text-sm uppercase flex justify-between items-center w-full px-6 py-4 max-w-full fixed top-0 z-50 border-b border-zinc-800/30">
      <BootReplayTitle label={copy.title} />
      <div className="hidden md:flex flex-1 justify-center px-8 pointer-events-none">
        <div className="max-w-[32rem] w-full font-label text-[10px] tracking-[0.18em] text-zinc-500/95 text-center font-medium">
          <SystemStateDrift
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
        <SystemStateDrift initialState={copy.ping} states={copy.pingStates} />
      </div>
    </header>
  );
}
