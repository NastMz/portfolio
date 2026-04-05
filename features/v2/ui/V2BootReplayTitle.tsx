'use client'

import { V2_BOOT_REPLAY_EVENT } from '@/features/v2/ui/v2Boot.constants'

interface V2BootReplayTitleProps {
  label: string
}

export function V2BootReplayTitle({ label }: V2BootReplayTitleProps) {
  return (
    <button
      className="v2-boot-replay-title v2-focusable font-label font-bold text-[#FF7CF5] tracking-tighter text-[10px] md:text-base"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(V2_BOOT_REPLAY_EVENT))
      }}
      type="button"
    >
      {label}
    </button>
  )
}
