"use client";

import { BOOT_REPLAY_EVENT } from "@/components/organisms/boot.constants";

interface BootReplayTitleProps {
  label: string;
}

export function BootReplayTitle({ label }: BootReplayTitleProps) {
  const handleReplay = () => {
    window.dispatchEvent(new CustomEvent(BOOT_REPLAY_EVENT));
  };

  return (
    <button
      className="hover:text-primary transition-colors cursor-pointer"
      onClick={handleReplay}
      type="button"
    >
      {label}
    </button>
  );
}
