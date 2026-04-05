import type { Locale } from '@/i18n/config'
import type { V2RouteKey } from '@/features/v2/content/sections'

interface V2PortfolioPageProps {
  locale: Locale
  routeKey?: V2RouteKey
}

function TopBar() {
  return (
    <header className="bg-[#0E0E0E] text-[#FF7CF5] font-headline tracking-tight text-sm uppercase flex justify-between items-center w-full px-6 py-4 max-w-full fixed top-0 z-50 border-b border-zinc-800/30">
      <div className="font-label font-bold text-[#FF7CF5] tracking-tighter text-xl">[SYS_CORE: v4.02]</div>
      <nav aria-label="V2 main navigation" className="hidden md:flex gap-8">
        <a className="text-[#FF7CF5] border-b-0 font-bold hover:bg-[#FF7CF5]/10 transition-none px-2 py-1" href="#hero">
          ARCHIVE
        </a>
        <a className="text-zinc-500 hover:text-zinc-200 hover:bg-[#FF7CF5]/10 transition-none px-2 py-1" href="#decision-log">
          LOGS
        </a>
        <a className="text-zinc-500 hover:text-zinc-200 hover:bg-[#FF7CF5]/10 transition-none px-2 py-1" href="#stack-evaluation">
          STACK
        </a>
        <a className="text-zinc-500 hover:text-zinc-200 hover:bg-[#FF7CF5]/10 transition-none px-2 py-1" href="#contact">
          TERMINAL
        </a>
      </nav>
      <div className="hidden lg:block text-xs font-label">[PING_STATUS: OPERATIONAL]</div>
    </header>
  )
}

function Sidebar() {
  return (
    <aside className="bg-[#0b0b0b] text-[#FF7CF5] font-label text-[9px] uppercase tracking-wider fixed left-0 top-0 h-full w-16 md:w-64 flex flex-col z-40 pt-20 border-r border-zinc-800/30">
      <div className="px-4 mb-8 hidden md:block">
        <div className="font-bold text-primary mb-4">[SYSTEM_MONITOR]</div>
        <div className="space-y-1 text-zinc-500">
          <div className="flex justify-between">
            <span>SYS.STATUS:</span> <span className="text-primary">ACTIVE</span>
          </div>
          <div className="flex justify-between">
            <span>ARCH.MODE:</span> <span className="text-white">MODULAR</span>
          </div>
          <div className="flex justify-between">
            <span>STATE:</span> <span className="text-white">PROD_READY</span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <a className="bg-[#FF7CF5] text-[#580058] p-4 md:p-3 flex items-center gap-4 transition-none" href="#hero">
          <span className="material-symbols-outlined text-lg">terminal</span>
          <span className="hidden md:inline">[OVERVIEW]</span>
        </a>
        <a className="text-zinc-600 p-4 md:p-3 flex items-center gap-4 hover:bg-zinc-800 hover:text-[#FF7CF5] transition-none" href="#identity">
          <span className="material-symbols-outlined text-lg">dns</span>
          <span className="hidden md:inline">[NETWORK]</span>
        </a>
        <a
          className="text-zinc-600 p-4 md:p-3 flex items-center gap-4 hover:bg-zinc-800 hover:text-[#FF7CF5] transition-none"
          href="#decision-log"
        >
          <span className="material-symbols-outlined text-lg">memory</span>
          <span className="hidden md:inline">[RESOURCES]</span>
        </a>
        <a
          className="text-zinc-600 p-4 md:p-3 flex items-center gap-4 hover:bg-zinc-800 hover:text-[#FF7CF5] transition-none"
          href="#stack-evaluation"
        >
          <span className="material-symbols-outlined text-lg">code</span>
          <span className="hidden md:inline">[SHELL]</span>
        </a>
      </div>

      <div className="mt-auto p-4 border-t border-zinc-800/20 bg-black/40">
        <div className="hidden md:block mb-4">
          <div className="text-zinc-600 text-[8px] mb-2">[THROUGHPUT_METRICS]</div>
          <div className="h-1 bg-zinc-900 w-full mb-1">
            <div className="h-full bg-primary bar-anim" />
          </div>
          <div className="h-1 bg-zinc-900 w-full mb-1">
            <div className="h-full bg-zinc-700 w-1/2" />
          </div>
          <div className="text-[8px] text-zinc-700 mt-2 font-label">LATEST_LOG: 200 OK - /api/health</div>
        </div>
        <button className="w-full bg-zinc-800 text-zinc-400 py-2 text-[10px] hidden md:block hover:text-primary transition-none mb-4">
          [INITIATE_CONTACT]
        </button>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-zinc-700">
            <span className="material-symbols-outlined text-sm">info</span>
            <span className="hidden md:inline">[v4.02.0]</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

function HeroSection() {
  return (
    <section className="px-8 md:px-16 py-12 border-b border-zinc-800/20" id="hero">
      <div className="max-w-5xl">
        <div className="font-label text-primary text-sm mb-4 tracking-[0.2em] uppercase">[IDENTITY_VERIFIED]</div>
        <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter mb-4">
          Kevin Martínez — <span className="text-white/20">Systems Architect</span>
        </h1>
        <div className="mb-10">
          <h2 className="font-headline text-2xl md:text-4xl text-zinc-400 mb-2 max-w-3xl leading-tight">
            I design systems for <span className="text-white underline decoration-primary/50 underline-offset-8">when things stop being simple.</span>
          </h2>
          <p className="font-label text-primary/60 text-lg uppercase tracking-tight italic">
            &quot;Scaling isn’t the problem. Uncontrolled complexity is.&quot;
          </p>
        </div>
        <p className="font-body text-lg text-zinc-500 mb-12 max-w-xl border-l-2 border-primary/20 pl-6 py-2">
          Most systems don’t break at scale. They break when no one controls how complexity grows. &quot;Architecture is the art of deciding
          which complexity is worth paying for.&quot;
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          <button className="bg-primary text-on-primary px-8 py-4 font-label text-sm font-bold glitch-hover">VIEW_LOGS</button>
          <button className="border border-outline-variant/30 text-primary px-8 py-4 font-label text-sm font-bold hover:bg-primary/10 transition-none">
            INITIATE_CONTACT
          </button>
          <div className="ml-4 font-label text-[10px] text-zinc-700 hidden lg:block">{'/* latency_sensitive: true */'}</div>
        </div>
      </div>
    </section>
  )
}

function IdentitySection() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-12 px-8 md:px-16 py-24 gap-12 items-start border-b border-zinc-800/20 bg-surface-container-low/50 relative"
      id="identity"
    >
      <div className="lg:col-span-5 lg:-translate-x-4">
        <div className="font-label text-zinc-600 text-xs mb-2 tracking-widest">[FILE: IDENTITY_LOG]</div>
        <h3 className="font-headline text-4xl font-bold">Practical Architecture</h3>
        <div className="mt-8 bg-black/40 border border-zinc-800 p-6 hidden lg:block relative overflow-hidden">
          <div className="absolute -right-4 -top-4 font-label text-[40px] opacity-5 pointer-events-none select-none">ARCH</div>
          <div className="font-label text-[10px] text-primary mb-4">[WHAT_I_AVOID]</div>
          <ul className="font-label text-[10px] space-y-2 text-zinc-500">
            <li>- RESUME-DRIVEN DEVELOPMENT</li>
            <li>- DISTRIBUTED MONOLITHS</li>
            <li>- BLINDLY FOLLOWING MANIFESTOS</li>
            <li>- OVER-ENGINEERED ABSTRACTIONS</li>
          </ul>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-6">
        <p className="font-body text-xl text-zinc-300 leading-relaxed">
          Backend, Architecture, and Decision Making under constraints. I don&apos;t build for hypothetical scale; I build for{' '}
          <span className="text-primary italic">predictable evolution</span>.
        </p>
        <p className="font-body text-zinc-400">
          I work on systems that are already running in production or will be. That means dealing with constraints, legacy decisions,
          and real business impact. Architecture is not about drawing boxes, it is about controlling how complexity evolves over time.
        </p>
        <div className="flex gap-4">
          <div className="bg-surface-container px-3 py-1 border border-outline-variant/20 font-label text-[10px] text-zinc-500">[MODE: OPINIONATED]</div>
          <div className="bg-surface-container px-3 py-1 border border-outline-variant/20 font-label text-[10px] text-zinc-500">[STANCE: ANTI_HYPE]</div>
        </div>
      </div>
    </section>
  )
}

function CorePrinciplesSection() {
  return (
    <section className="px-8 md:px-16 py-32 relative" id="core-principles">
      <div className="absolute right-0 top-1/4 h-[1px] w-64 bg-primary/20 rotate-45 pointer-events-none" />
      <div className="font-label text-primary text-xs mb-16 tracking-widest text-center">[CORE_MANIFESTO]</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <div className="bg-surface-container p-8 border border-outline-variant/10 relative group">
          <div className="absolute top-0 right-0 p-2 font-label text-[10px] text-zinc-700">01</div>
          <h4 className="font-headline text-xl font-bold mb-4 text-zinc-200">Domain over Framework</h4>
          <p className="font-body text-sm text-zinc-500 leading-relaxed">
            Frameworks are implementation details. Business logic should not depend on them. If changing a framework breaks your
            system, the system was never properly designed.
          </p>
        </div>
        <div className="bg-[#1a1919] p-12 border-2 border-primary relative shadow-[0_0_40px_rgba(255,124,245,0.15)] md:-translate-y-8 md:scale-105 z-20">
          <div className="absolute top-0 right-0 p-3 font-label text-[10px] text-primary">02_CRITICAL</div>
          <h4 className="font-headline text-2xl font-bold mb-6 text-primary">Boundaries over Coupling</h4>
          <p className="font-body text-md text-zinc-200 leading-relaxed">
            Shared databases are the original sin of system design. Without clear ownership and contracts, modularity is just an
            illusion.
          </p>
          <div className="mt-8 h-[2px] w-full bg-primary/40" />
          <div className="mt-4 font-label text-[10px] text-primary flex justify-between">
            <span>[PRIORITY: HIGH]</span>
            <span className="italic">{'/* explicit > implicit */'}</span>
          </div>
        </div>
        <div className="bg-surface-container p-8 border border-outline-variant/10 relative">
          <div className="absolute top-0 right-0 p-2 font-label text-[10px] text-zinc-700">03</div>
          <h4 className="font-headline text-xl font-bold mb-4 text-zinc-200">Simplicity before Complexity</h4>
          <p className="font-body text-sm text-zinc-500 leading-relaxed">
            Microservices are not a solution, they are a cost. If a monolith is not modular, distributing it will only amplify the
            problem.
          </p>
        </div>
      </div>
    </section>
  )
}

function FeaturedCaseStudySection() {
  return (
    <section className="px-8 md:px-16 py-24 bg-surface-container-lowest border-y border-zinc-800/30" id="projects">
      <div className="max-w-6xl mx-auto" id="case-study">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <div className="font-label text-primary text-xs mb-4 tracking-widest">[CASE_STUDY: 082]</div>
            <h3 className="font-headline text-4xl md:text-5xl font-bold mb-6">Re-architecting for 10x Load</h3>
            <div className="space-y-6 text-zinc-400 font-body">
              <p>
                <span className="text-zinc-100 font-bold">The Problem:</span> A CRM backend handling business operations and integrations
                started hitting architectural limits as the system grew in complexity and usage.
              </p>
              <p>
                <span className="text-zinc-100 font-bold">The Decisions:</span> Evolved from a traditional Clean Architecture monolith into
                a modular monolith with explicit contracts between modules to reduce coupling and enable controlled growth.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['C# / .NET 8 / .NET 10', 'MySQL / Amazon RDS', 'Dapper / EF Core', 'Docker', 'AWS (Cognito, SNS, S3, SES)'].map((item) => (
                  <span key={item} className="px-3 py-1 bg-surface-container-highest border border-zinc-700 font-label text-[10px]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative bg-surface-container border border-outline-variant/10 p-4">
            <img
              alt="Server racks in a dark data center"
              className="grayscale opacity-50 hover:grayscale-0 transition-all duration-500 w-full h-[400px] object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_hZH3MLDnliSgX-7GCloVm0k9-aQ75LWgtQJd0PfQfhfYKprp5l4Ua4602afm2RNhDlSt_THqdI1a3gMsmjzkrSaekLcj4FeKsLTEKwc92JPoygaFiU4WM7SMOahWHCCEE7y1BZvBsopMP02RYREUXzKav8YuotNRmTGEFrHfH7-7JVlaHHRHYlxsmFeXbIGxOdKQBxfhexFRydhkb1OCMS6O184BwabrNcBFpIn5fyf39P_Rgxd343DhPqgglPyr5s-T75-qeKvH"
            />
            <div className="absolute bottom-8 left-8 bg-black/80 p-6 border-l-4 border-primary backdrop-blur-md">
              <div className="font-label text-[10px] text-primary mb-2">RESULT_REPORT</div>
              <div className="text-3xl font-headline font-bold text-white tracking-tighter">SYSTEM READY FOR CONTROLLED SCALING</div>
              <div className="text-xs text-zinc-500 font-label italic mt-1">(Improved maintainability, reduced coupling, better observability)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DecisionLogSection() {
  return (
    <section className="px-8 md:px-16 py-32 bg-black scanline-magenta border-b border-zinc-900" id="decision-log">
      <div className="flex items-center justify-between mb-12">
        <h3 className="font-headline text-3xl font-bold">Decision Log</h3>
        <div className="h-[1px] flex-1 bg-primary/20 mx-8" />
        <div className="font-label text-zinc-600 text-xs tracking-widest uppercase">[LOG_STORE: PERMANENT]</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {[
          {
            statusClass: 'bg-primary',
            status: '[STATUS: ACCEPTED]',
            context: '[CONTEXT: DOMAIN_MODEL]',
            title: 'CQRS for Domain Evolution',
            body: 'Separated read and write models to better encapsulate business rules and allow independent evolution.',
            tradeoff: 'COMPLEXITY ↑ / DOMAIN CLARITY ↑',
          },
          {
            statusClass: 'bg-error',
            status: '[STATUS: DEPRECATED]',
            context: '[CONTEXT: DATA_ACCESS]',
            title: 'Direct Cross-Module Access',
            body: 'Modules accessing each other\'s data directly caused hidden coupling and fragile behavior.',
            tradeoff: 'SHORT-TERM SPEED ↓ / LONG-TERM STABILITY ↑',
          },
          {
            statusClass: 'bg-tertiary-container',
            status: '[STATUS: ACCEPTED]',
            context: '[CONTEXT: ARCHITECTURE]',
            title: 'Contract-Based Module Boundaries',
            body: 'Introduced explicit contracts to isolate modules and prevent dependency leakage.',
            tradeoff: 'UPFRONT DESIGN COST ↑ / COUPLING ↓',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-[#111111] p-8 border border-zinc-800 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col h-full"
          >
            <div className="flex flex-col gap-2 mb-4">
              <div className={`${item.statusClass} text-black font-label text-[9px] px-2 py-0.5 w-fit font-bold`}>{item.status}</div>
              <div className="bg-zinc-800 text-zinc-300 font-label text-[9px] px-2 py-0.5 w-fit">{item.context}</div>
            </div>
            <h5 className="font-headline font-bold text-xl mb-3 group-hover:text-primary">{item.title}</h5>
            <p className="font-body text-sm text-zinc-500 mb-6">{item.body}</p>
            <div className="mt-auto pt-4 border-t border-zinc-800">
              <div className="font-label text-[9px] text-zinc-400 uppercase">[TRADE-OFF]</div>
              <div className="font-label text-[9px] text-primary mt-1">{item.tradeoff}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <span className="font-label text-[10px] text-zinc-800 italic">{'/* better a monolith than a mess */'}</span>
      </div>
    </section>
  )
}

function StackEvaluationSection() {
  return (
    <section className="px-8 md:px-16 py-24 bg-surface-container-low/30" id="stack-evaluation">
      <div className="font-label text-center text-primary text-xs mb-16 tracking-[0.3em] uppercase">[STACK_EVALUATION_PROTOCOLS]</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-zinc-800/40">
        {[
          { category: '[RUNTIMES]', name: 'C# / .NET', detail: 'Primary environment for backend systems and architectural design' },
          {
            category: '[PERSISTENCE]',
            name: 'PostgreSQL / MySQL',
            detail: 'Relational systems with focus on data modeling and query optimization',
          },
          { category: '[STATE]', name: 'Redis', detail: 'Cache used deliberately, not as a workaround for bad design' },
          { category: '[ORCHESTRATION]', name: 'AWS', detail: 'Used for authentication, messaging and infrastructure support' },
        ].map((item) => (
          <div
            key={item.name}
            className="border border-zinc-800/40 p-10 flex flex-col items-center justify-center group hover:bg-primary/5 transition-none text-center relative overflow-hidden"
          >
            <div className="text-zinc-600 font-label text-[8px] mb-4 uppercase">{item.category}</div>
            <div className="font-headline font-bold text-xl group-hover:text-primary mb-2">{item.name}</div>
            <div className="font-label text-[9px] text-zinc-500 uppercase tracking-tighter">{item.detail}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right">
        <span className="font-label text-[9px] text-zinc-800">{'/* evaluate_stack() returned 0 errors */'}</span>
      </div>
    </section>
  )
}

function NotesSection() {
  return (
    <section className="px-8 md:px-16 py-24" id="notes">
      <h3 className="font-headline text-3xl font-bold mb-12">
        Buffer Overflow <span className="text-zinc-600 font-label text-sm ml-4 uppercase">{'// OPINIONS'}</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative pl-12 border-l border-primary/30">
          <div className="absolute -left-1.5 top-0 w-3 h-3 bg-primary" />
          <h4 className="font-headline text-xl font-bold mb-2">&quot;Microservices aren&apos;t free.&quot;</h4>
          <p className="font-label text-[10px] text-primary/50 mb-4 uppercase tracking-tighter">They don’t remove complexity, they relocate it.</p>
          <p className="font-body text-zinc-400 leading-relaxed">
            The cost of coordination, network latency, and operational overhead is often ignored. If a team cannot manage a monolith,
            splitting it will not solve the problem.
          </p>
        </div>
        <div className="relative pl-12 border-l border-zinc-800">
          <div className="absolute -left-1.5 top-0 w-3 h-3 bg-zinc-800" />
          <h4 className="font-headline text-xl font-bold mb-2">&quot;Architecture is deciding what to leave out.&quot;</h4>
          <p className="font-label text-[10px] text-zinc-600 mb-4 uppercase tracking-tighter">Every abstraction has a cost.</p>
          <p className="font-body text-zinc-400 leading-relaxed">
            Good systems are not defined by how many patterns they use, but by how many unnecessary ones they avoid.
          </p>
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="px-8 md:px-16 py-32 bg-surface-container-lowest flex flex-col items-center text-center" id="contact">
      <div className="w-full max-w-2xl">
        <div className="font-label text-primary text-xs mb-6 tracking-[0.5em] uppercase">[INITIATE_HANDSHAKE]</div>
        <h3 className="font-headline text-4xl md:text-6xl font-bold mb-8">Ready to scale without the drama?</h3>
        <p className="font-body text-zinc-500 mb-12">If you need systems that remain maintainable as they grow, we should talk.</p>
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-label">&gt;</span>
              <input
                className="w-full bg-surface-container border border-outline-variant/20 py-4 pl-10 pr-4 text-white focus:ring-0 focus:border-primary font-label text-xs"
                placeholder="IDENTITY"
                type="text"
              />
            </div>
            <div className="flex-1 relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-label">$</span>
                <input
                  className="w-full bg-surface-container border border-outline-variant/20 py-4 pl-10 pr-4 text-white focus:ring-0 focus:border-primary font-label text-xs"
                  placeholder="ENDPOINT_ADDRESS"
                  type="email"
                />
              </div>
          </div>
          <button className="w-full bg-primary text-on-primary py-5 font-headline font-bold text-xl glitch-hover">SEND_MESSAGE</button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#0E0E0E] text-[#FF7CF5] font-label text-[10px] uppercase w-full px-8 py-12 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-zinc-800/20 relative z-10">
      <div className="mb-8 md:mb-0">
        <div className="text-[#FF7CF5] font-bold mb-2">KEVIN_MARTINEZ_PORTFOLIO</div>
        <div className="text-zinc-700">[BUILD_2024.11] // ALL_RIGHTS_RESERVED</div>
      </div>
      <div className="flex gap-8">
        <a className="text-zinc-700 hover:text-[#FF7CF5] transition-none" href="#">
          LICENSE
        </a>
        <a className="text-zinc-700 hover:text-[#FF7CF5] transition-none" href="#">
          DOCS
        </a>
        <a className="text-zinc-700 hover:text-[#FF7CF5] transition-none" href="#">
          SECURITY_LOGS
        </a>
      </div>
    </footer>
  )
}

function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-low border-t border-zinc-800/50 flex justify-around py-4 z-50">
      <a className="text-primary flex flex-col items-center" href="#hero">
        <span className="material-symbols-outlined">terminal</span>
      </a>
      <a className="text-zinc-500 flex flex-col items-center" href="#identity">
        <span className="material-symbols-outlined">dns</span>
      </a>
      <a className="text-zinc-500 flex flex-col items-center" href="#decision-log">
        <span className="material-symbols-outlined">memory</span>
      </a>
      <a className="text-zinc-500 flex flex-col items-center" href="#stack-evaluation">
        <span className="material-symbols-outlined">code</span>
      </a>
    </nav>
  )
}

export async function V2PortfolioPage({ locale }: V2PortfolioPageProps) {
  return (
    <div className="v2-route v2-faithful bg-grid selection:bg-primary selection:text-on-primary relative" data-locale={locale} id="top">
      <div className="interference-line top-1/4 -left-1/2" />
      <div className="interference-line top-3/4 -left-1/4" />

      <div className="fixed top-24 right-8 z-50 pointer-events-none hidden lg:block">
        <div className="bg-surface-container border border-primary/20 p-2 font-label text-[10px]">
          <div className="text-zinc-600 mb-1">HYPE_RESISTANCE_LEVEL</div>
          <div className="text-primary font-bold">99.98% [NOMINAL]</div>
        </div>
      </div>

      <TopBar />
      <Sidebar />

      <main className="ml-16 md:ml-64 pt-24 pb-24 relative z-10" id="main-content">
        <HeroSection />
        <IdentitySection />
        <CorePrinciplesSection />
        <FeaturedCaseStudySection />
        <DecisionLogSection />
        <StackEvaluationSection />
        <NotesSection />
        <ContactSection />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
