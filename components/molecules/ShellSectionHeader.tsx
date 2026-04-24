interface ShellSectionHeaderProps {
  title: string;
  alias?: string;
  sourceLabel?: string;
  aside?: string;
}

// Converts a title like "My Section Title" to "[MY_SECTION_TITLE]" for use as an alias in the header.
function formatTitle(title: string) {
  return title
    .toUpperCase()
    .replaceAll(/[^A-Z0-9]+/g, "_") // Replace non-alphanumeric characters with underscores
    .replaceAll(/^_+|_+$/g, "") // Remove leading and trailing underscores
    .replaceAll(/_+/g, "_") // Replace multiple underscores with a single one
    .padStart(2, "_") // Ensure at least two characters for the brackets
    .padEnd(2, "_") // Ensure at least two characters for the brackets
    .replaceAll(/^/, "[") // Add opening bracket at the start
    .replaceAll(/$/, "]"); // Add closing bracket at the end
}

export function ShellSectionHeader({
  title,
  alias,
  sourceLabel,
  aside,
}: ShellSectionHeaderProps) {
  return (
    <header
      className="border-y border-zinc-800/70 bg-black/30 px-4 py-4 md:px-6"
      data-shell-section-header="true"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <div
            aria-hidden="true"
            className="mt-1 hidden w-6 shrink-0 border-t border-primary/40 lg:block"
          />
          <div className="min-w-0">
            {alias ? (
              <p className="font-label text-[10px] uppercase tracking-[0.22em] text-primary">
                {alias}
              </p>
            ) : null}
            <h2 className="mt-2 font-headline text-3xl font-bold text-white md:text-4xl">
              {title.toUpperCase()}
            </h2>
          </div>
        </div>

        {aside ? (
          <p className="font-label text-[10px] uppercase tracking-[0.18em] text-zinc-500/95">
            {aside}
          </p>
        ) : null}
      </div>

      {sourceLabel ? (
        <div className="mt-4 flex items-center gap-3">
          <div aria-hidden="true" className="h-px flex-1 bg-zinc-800/80" />
          <p className="font-label text-[10px] uppercase tracking-[0.18em] text-zinc-500/95">
            {sourceLabel}
          </p>
        </div>
      ) : null}
    </header>
  );
}

export type { ShellSectionHeaderProps };
