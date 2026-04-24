import { FooterCopy } from "./types";

export function Footer({ copy }: { copy: FooterCopy }) {
  const buildStamp = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .replace(/-/g, ".");

  const dynamicBuild = copy.build.replace(
    /\[BUILD_[^\]]+\]/,
    `[BUILD_${buildStamp}]`,
  );

  return (
    <footer
      className="bg-[#0E0E0E] text-[#FF7CF5] font-label text-[10px] uppercase w-full md:w-[calc(100%-16rem)] md:ml-64 px-8 py-12 pb-[calc(7rem+env(safe-area-inset-bottom))] md:pb-12 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-zinc-800/20 relative z-20 scroll-mt-28"
      id="footer"
    >
      <div className="mb-8 md:mb-0">
        <div className="text-[#FF7CF5] font-bold mb-2">{copy.title}</div>
        <div className="text-zinc-500/95 font-medium">{dynamicBuild}</div>
      </div>
      <div className="flex gap-8">
        {copy.links.map((item) => (
          <a
            key={item.href}
            className="text-zinc-400 hover:text-[#FF7CF5] transition-none"
            href={item.href}
            rel="noreferrer"
            target="_blank"
          >
            {item.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
