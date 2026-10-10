import { useState } from 'react'
import { ArrowRight, Sparkles, Terminal } from 'lucide-react'

export function Hero() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    const x = (clientX / innerWidth - 0.5) * 20
    const y = (clientY / innerHeight - 0.5) * 20
    setMouseOffset({ x, y })
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative mx-auto w-[min(1140px,calc(100%-48px))] pt-16 md:pt-24 pb-12 md:pb-16 text-center select-none"
    >
      {/* Background glow orbs responding to mouse movement */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[340px] bg-[var(--accent)]/12 blur-[130px] rounded-full pointer-events-none -z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mouseOffset.x * 1.5}px), calc(-50% + ${mouseOffset.y * 1.5}px))`
        }}
      />
      <div
        className="absolute top-1/4 left-1/3 w-[300px] h-[200px] bg-amber-500/8 blur-[100px] rounded-full pointer-events-none -z-10 transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${mouseOffset.x * -1}px, ${mouseOffset.y * -1}px)`
        }}
      />

      {/* Announcement Pill with Shimmer */}
      <div className="inline-flex items-center">
        <a
          href="#runtime"
          className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--card)] px-3.5 py-1 text-xs text-[var(--foreground)] hover:border-[var(--accent)]/50 hover:shadow-[0_0_20px_rgba(223,116,56,0.15)] transition-all group"
        >
          {/* Shimmer line effect on hover */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="flex items-center gap-1 font-mono text-[10px] font-medium uppercase px-2 py-0.5 rounded-full bg-[var(--accent)] text-white shadow-sm">
            <Sparkles className="w-2.5 h-2.5" /> NEW
          </span>
          <span className="text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
            Persistent workspaces. Pick up where you left off.
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-[var(--muted-foreground)] group-hover:translate-x-0.5 group-hover:text-[var(--accent)] transition-all" />
        </a>
      </div>

      {/* Main Editorial Headline with Parallax depth */}
      <h1
        className="mt-8 mx-auto max-w-4xl text-5xl sm:text-7xl md:text-[80px] font-normal tracking-[-0.035em] leading-[1.08] text-[var(--foreground)] transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`
        }}
      >
        A home for{' '}
        <span className="font-display italic font-normal text-[var(--accent-ink)] drop-shadow-[0_4px_16px_rgba(223,116,56,0.25)]">
          agents
        </span>
        <br className="hidden sm:inline" /> that see it{' '}
        <span className="font-display italic font-normal text-[var(--accent-ink)] drop-shadow-[0_4px_16px_rgba(223,116,56,0.25)]">
          through.
        </span>
      </h1>

      {/* Subhead description */}
      <p
        className="mt-6 mx-auto max-w-2xl text-lg sm:text-xl text-[var(--muted-foreground)] leading-relaxed font-normal transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.2}px, ${mouseOffset.y * 0.2}px, 0)`
        }}
      >
        Tools, memory, and execution in one dependable harness.
        <br className="hidden sm:inline" /> From the first instruction to the finished work.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
        <a
          href="#playground"
          className="relative inline-flex items-center justify-center gap-2 h-10 px-5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] font-mono text-[11px] font-medium uppercase tracking-wider hover:bg-[var(--muted)] hover:border-[var(--accent)]/40 hover:-translate-y-0.5 transition-all shadow-sm cursor-pointer group overflow-hidden"
        >
          <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>See it in action</span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </a>
        <a
          href="#quickstart"
          className="relative inline-flex items-center justify-center gap-2 h-10 px-6 rounded-lg border border-[var(--accent)] bg-[var(--accent)] text-white font-mono text-[11px] font-medium uppercase tracking-wider hover:opacity-95 hover:shadow-[0_0_24px_rgba(223,116,56,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md shadow-[var(--accent)]/20 cursor-pointer group overflow-hidden"
        >
          <span>Start building</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </a>
      </div>
    </section>
  )
}
