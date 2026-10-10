import { useState } from 'react'
import { CodeXml, Cpu, Terminal, ArrowUpRight } from 'lucide-react'

export function PillarsTriad() {
  const [mousePos, setMousePos] = useState<Record<number, { x: number; y: number }>>({})
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const pillars = [
    {
      icon: CodeXml,
      title: 'Agent SDK',
      description: 'A small, readable API for giving your agent tools, context, and a place to work.',
      href: '#quickstart'
    },
    {
      icon: Cpu,
      title: 'MCP',
      description: 'Connect the tools you already use. Let your agents work across your stack.',
      href: '#runtime'
    },
    {
      icon: Terminal,
      title: 'Persistent memory',
      description: 'Keep decisions and useful context together, from one run to the next.',
      href: '#runtime'
    }
  ]

  const handleMouseMove = (idx: number, e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos((prev) => ({
      ...prev,
      [idx]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }))
  }

  return (
    <div className="mx-auto w-[min(1140px,calc(100%-48px))]">
      <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--border)] bg-[var(--card)] relative">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon
          const pos = mousePos[index] || { x: 0, y: 0 }
          const isHovered = hoveredIdx === index

          return (
            <article
              key={pillar.title}
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
              onMouseMove={(e) => handleMouseMove(index, e)}
              className={`relative overflow-hidden group flex flex-col items-start p-7 sm:p-8 transition-colors duration-200 ${
                index > 0 ? 'border-t md:border-t-0 md:border-l border-[var(--border)]' : ''
              }`}
            >
              {/* Interactive Mouse Spotlight on Card */}
              {isHovered && (
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, rgba(223, 116, 56, 0.12), transparent 75%)`
                  }}
                />
              )}

              <div className="relative z-10 mb-6 p-2 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-soft-border)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:shadow-[0_0_15px_rgba(223,116,56,0.25)]">
                <Icon className="w-5 h-5" />
              </div>

              <h3 className="relative z-10 text-xl font-medium tracking-tight text-[var(--foreground)] mb-2.5 group-hover:text-[var(--accent-ink)] transition-colors">
                {pillar.title}
              </h3>

              <p className="relative z-10 text-sm text-[var(--muted-foreground)] leading-relaxed mb-8 flex-1">
                {pillar.description}
              </p>

              <a
                href={pillar.href}
                className="relative z-10 mt-auto inline-flex items-center gap-1.5 font-mono text-[11px] font-normal uppercase tracking-wider text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors group/link"
              >
                <span>EXPLORE</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </article>
          )
        })}
      </div>
    </div>
  )
}
