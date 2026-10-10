import { ArrowUpRight } from 'lucide-react'

export function UseCases() {
  const cases = [
    {
      index: '01',
      title: 'Research & strategy',
      subtitle: 'Give the next decision a useful starting point.',
      bullets: [
        'Compare sources and document the tradeoffs.',
        'Turn the findings into a clear decision brief.'
      ],
      output: 'research-brief.md'
    },
    {
      index: '02',
      title: 'Product & engineering',
      subtitle: 'Take a focused change from the brief to review.',
      bullets: [
        'Read the code and follow its conventions.',
        'Implement the change and check the details.'
      ],
      output: 'command-menu.tsx'
    },
    {
      index: '03',
      title: 'Customer operations',
      subtitle: 'Turn recurring questions into practical next steps.',
      bullets: [
        'Group related feedback and preserve the context.',
        'Prepare a useful handoff for the product team.'
      ],
      output: 'support-brief.md'
    }
  ]

  return (
    <section id="use-cases" className="mx-auto my-28 w-[min(1140px,calc(100%-48px))] scroll-mt-24">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
            USE CASES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[var(--foreground)] leading-tight">
            Put agents to work<br />across your team.
          </h2>
        </div>
        <p className="text-sm md:text-base text-[var(--muted-foreground)] max-w-sm">
          Different tasks. The same tools, context, and room to get the work done.
        </p>
      </header>

      {/* 3 Rows List */}
      <div className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
        {cases.map((item) => (
          <article
            key={item.index}
            className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_0.8fr] gap-6 sm:gap-8 py-8 sm:py-9 items-start hover:bg-[var(--card-hover)]/40 transition-colors px-2 rounded-lg"
          >
            {/* Col 1: Title & Index */}
            <div>
              <span className="block font-mono text-xs text-[var(--accent)] mb-2 font-semibold">
                {item.index}
              </span>
              <h3 className="text-xl font-normal tracking-tight text-[var(--foreground)]">
                {item.title}
              </h3>
            </div>

            {/* Col 2: Description & Bullets */}
            <div>
              <p className="text-sm font-normal text-[var(--foreground)] mb-3">
                {item.subtitle}
              </p>
              <ul className="space-y-1.5 text-xs text-[var(--muted-foreground)] list-disc list-inside">
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            {/* Col 3: Example Output & Link */}
            <div className="flex flex-col items-start md:items-end">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted-foreground)] mb-1">
                EXAMPLE OUTPUT
              </span>
              <code className="font-mono text-xs text-[var(--accent-ink)] font-medium bg-[var(--accent-soft)] px-2 py-0.5 rounded border border-[var(--accent-soft-border)] mb-3">
                {item.output}
              </code>
              <a
                href="#quickstart"
                className="inline-flex items-center gap-1 text-xs text-[var(--foreground)] hover:text-[var(--accent)] transition-colors group"
              >
                <span>Read the field note</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
