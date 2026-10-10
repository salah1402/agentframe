export function MetricsAndLogos() {
  const metrics = [
    { title: 'Any model', desc: 'Keep your choice of intelligence' },
    { title: 'Every step', desc: 'An inspectable execution history' },
    { title: 'Your tools', desc: 'Connected through open protocols' },
    { title: 'One workspace', desc: 'Context that carries forward' }
  ]

  return (
    <section className="mx-auto my-24 sm:my-32 w-[min(1140px,calc(100%-48px))] border border-[var(--border)] bg-[var(--card)]">
      {/* 4 Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[var(--border)]">
        {metrics.map((metric, i) => (
          <div
            key={metric.title}
            className={`flex flex-col gap-1.5 p-6 text-center ${
              i > 0 ? 'border-l border-[var(--border)]' : ''
            } ${i >= 2 ? 'border-t md:border-t-0' : ''}`}
          >
            <strong className="font-mono text-xl sm:text-2xl font-normal tracking-tight text-[var(--foreground)]">
              {metric.title}
            </strong>
            <span className="text-xs text-[var(--muted-foreground)] leading-normal">
              {metric.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Center Tagline */}
      <div className="py-4 border-b border-[var(--border)] text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted-foreground)]">
          A SHARED FOUNDATION FOR INDEPENDENT TEAMS
        </p>
      </div>

      {/* 4 Client Logos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {/* Layers */}
        <div className="flex h-24 items-center justify-center gap-2.5 text-xl font-semibold tracking-tight text-[var(--foreground)] opacity-75 hover:opacity-100 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="text-[var(--accent)]" aria-hidden="true">
            <path d="m14 3 12 6-12 6L2 9 14 3Zm-12 12 12 6 12-6M2 21l12 6 12-6" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="font-display">Layers</span>
        </div>

        {/* Catalyst */}
        <div className="flex h-24 items-center justify-center gap-2.5 text-xl font-semibold tracking-tight text-[var(--foreground)] opacity-75 hover:opacity-100 transition-opacity border-l border-[var(--border)]">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="text-[var(--accent)]" aria-hidden="true">
            <path d="M14 1v26M1 14h26M5 5l18 18M5 23 23 5" stroke="currentColor" strokeWidth="3" />
          </svg>
          <span className="font-sans lowercase font-bold tracking-tight">catalyst</span>
        </div>

        {/* Quotient */}
        <div className="flex h-24 items-center justify-center gap-2.5 text-xl font-semibold tracking-tight text-[var(--foreground)] opacity-75 hover:opacity-100 transition-opacity border-t md:border-t-0 border-l-0 md:border-l border-[var(--border)]">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="text-[var(--accent)]" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3.5" />
            <path d="m17 17 9 9" stroke="currentColor" strokeWidth="3.5" />
          </svg>
          <span className="font-sans">Quotient</span>
        </div>

        {/* Circooles */}
        <div className="flex h-24 items-center justify-center gap-2.5 text-xl font-semibold tracking-tight text-[var(--foreground)] opacity-75 hover:opacity-100 transition-opacity border-t md:border-t-0 border-l border-[var(--border)]">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="text-[var(--accent)]" aria-hidden="true">
            <circle cx="10" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="18" cy="14" r="8" stroke="currentColor" strokeWidth="2.5" />
          </svg>
          <span className="font-display italic">Circooles</span>
        </div>
      </div>
    </section>
  )
}
