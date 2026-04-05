export default function LocaleNotFound() {
  return (
    <main className="min-h-screen bg-black text-zinc-200 flex items-center justify-center px-6">
      <div className="border border-zinc-800 bg-zinc-950/80 px-8 py-6 max-w-xl w-full">
        <p className="font-mono text-xs text-primary mb-3">[ROUTE_NOT_FOUND]</p>
        <h1 className="text-xl font-semibold mb-2">Missing route target.</h1>
        <p className="text-sm text-zinc-400">The requested locale route is unavailable or disabled by runtime policy.</p>
      </div>
    </main>
  )
}
