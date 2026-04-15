"use client";

import { useEffect } from "react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black text-zinc-200 flex items-center justify-center px-6">
      <div className="border border-zinc-800 bg-zinc-950/80 px-8 py-6 max-w-xl w-full">
        <p className="font-mono text-xs text-error mb-3">[RUNTIME_ERROR]</p>
        <h1 className="text-xl font-semibold mb-2">Route rendering failed.</h1>
        <p className="text-sm text-zinc-400 mb-4">
          A localized route crashed during render. Retry to recover.
        </p>
        <button
          className="border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
          onClick={reset}
          type="button"
        >
          RETRY
        </button>
      </div>
    </main>
  );
}
