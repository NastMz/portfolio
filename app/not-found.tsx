export default function AppNotFound() {
  return (
    <main className="min-h-screen bg-black text-zinc-200 flex items-center justify-center px-6">
      <div className="border border-zinc-800 bg-zinc-950/80 px-8 py-6 max-w-xl w-full">
        <p className="font-mono text-xs text-primary mb-3">[APP_NOT_FOUND]</p>
        <h1 className="text-xl font-semibold mb-2">Route not found.</h1>
        <p className="text-sm text-zinc-400">
          The requested path does not map to an available localized route.
        </p>
      </div>
    </main>
  );
}
