"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <html>
      <body>
        <main className="min-h-screen bg-black text-zinc-200 flex items-center justify-center px-6">
          <div className="border border-zinc-800 bg-zinc-950/80 px-8 py-6 max-w-xl w-full">
            <p className="font-mono text-xs text-error mb-3">
              [GLOBAL_RUNTIME_ERROR]
            </p>
            <h1 className="text-xl font-semibold mb-2">
              Unhandled application error.
            </h1>
            <p className="text-sm text-zinc-400 mb-4">
              A global route boundary was triggered. Retry and inspect server
              logs.
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
      </body>
    </html>
  );
}
