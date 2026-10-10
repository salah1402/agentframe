import { useState } from 'react'
import { FileText, Search, Database, Wrench, Check, CheckCheck, ArrowRight } from 'lucide-react'

export function RunJourney() {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2>(1)

  const stepsData = [
    {
      index: '01',
      title: 'Define the job',
      description: 'Start with an outcome, not a script. Give your agent the brief and the boundaries; it can work out the next useful step.',
      telemetry: 'INPUT / brief.md'
    },
    {
      index: '02',
      title: 'Connect the work',
      description: 'The right tool, with the right context. Search sources, recall decisions, and keep every action attached to the same run.',
      telemetry: 'EXECUTION / 3 connected tools'
    },
    {
      index: '03',
      title: 'Keep the result',
      description: 'Finish with something you can use. The artifact, its sources, and the decisions behind it stay together in your workspace.',
      telemetry: 'OUTPUT / weekly-brief.md'
    }
  ]

  return (
    <section id="run-journey" className="mx-auto my-28 w-[min(1140px,calc(100%-48px))] scroll-mt-24">
      {/* Section Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] mb-3">
            ONE RUN. NOTHING LOST ALONG THE WAY.
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[var(--foreground)] leading-tight">
            One instruction.<br />A connected chain of work.
          </h2>
        </div>
        <p className="text-sm md:text-base text-[var(--muted-foreground)] max-w-sm">
          The brief becomes a plan.<br />The plan becomes something useful.
        </p>
      </header>

      {/* Main Interactive Stage Box */}
      <div className="border border-[var(--border)] bg-[var(--card)] rounded-xl overflow-hidden shadow-sm">
        {/* Visual Pipeline Area */}
        <div className="relative p-6 sm:p-10 min-h-[380px] bg-[var(--scene-bg)] flex items-center justify-center">
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_auto_1.1fr_auto_1fr] items-center gap-4 sm:gap-6 relative">

            {/* STAGE 1: brief.md Card */}
            <div
              onClick={() => setActiveStep(0)}
              className={`relative z-10 flex flex-col p-5 rounded-xl border bg-[var(--card)] cursor-pointer transition-all duration-300 shadow-md ${
                activeStep === 0
                  ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/30 scale-[1.02] opacity-100'
                  : 'border-[var(--border)] opacity-60 hover:opacity-90 hover:border-[var(--border-light)]'
              }`}
            >
              <div className="w-full flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--muted-foreground)]">
                  <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>brief.md</span>
                </div>
                <span className={`h-1.5 w-1.5 rounded-full ${activeStep === 0 ? 'bg-[var(--accent)] animate-ping' : 'bg-[var(--border-light)]'}`} />
              </div>

              <div className="my-5 text-left">
                <p className="text-sm font-medium text-[var(--foreground)] leading-snug">
                  What did we learn from customers <strong>this week?</strong>
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[10px] font-mono text-[var(--muted-foreground)]">
                <span>ONE CLEAR OUTCOME</span>
                <ArrowRight className="w-3 h-3 text-[var(--accent)]" />
              </div>
            </div>

            {/* CONNECTOR 1: Stage 1 -> Stage 2 (Between Cards) */}
            <div className="hidden md:flex flex-col items-center justify-center w-12 sm:w-16 shrink-0 relative">
              <svg viewBox="0 0 60 20" className="w-full h-5 overflow-visible" fill="none">
                <path
                  d="M 0 10 L 60 10"
                  stroke={activeStep >= 1 ? 'var(--accent)' : 'var(--border-light)'}
                  strokeWidth={activeStep >= 1 ? '2' : '1.5'}
                  strokeDasharray={activeStep >= 1 ? '5 5' : '3 4'}
                  className={activeStep >= 1 ? 'animate-path-travel' : ''}
                />
              </svg>
              <div className={`mt-1 h-1.5 w-1.5 rounded-full transition-colors ${activeStep >= 1 ? 'bg-[var(--accent)]' : 'bg-transparent'}`} />
            </div>

            {/* STAGE 2: Tool Execution Circuit Node */}
            <div
              onClick={() => setActiveStep(1)}
              className={`relative z-10 flex flex-col items-center justify-center p-5 rounded-xl border bg-[var(--card)] cursor-pointer transition-all duration-300 shadow-md ${
                activeStep === 1
                  ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/30 scale-[1.02] opacity-100'
                  : 'border-[var(--border)] opacity-60 hover:opacity-90 hover:border-[var(--border-light)]'
              }`}
            >
              <div className="w-full flex items-center justify-between pb-2 border-b border-[var(--border)]">
                <span className="font-mono text-xs text-[var(--muted-foreground)]">
                  Tool execution
                </span>
                <span className={`h-1.5 w-1.5 rounded-full ${activeStep === 1 ? 'bg-amber-400 animate-ping' : 'bg-[var(--border-light)]'}`} />
              </div>

              {/* Internal Circuit Layout */}
              <div className="relative w-full py-4 flex flex-col items-center">
                {/* Top Tools Row: Search & Memory */}
                <div className="flex items-center justify-between w-full px-2 mb-2">
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--background)] border border-[var(--border)] text-[10px] font-mono text-[var(--foreground)] shadow-xs">
                    <Search className="w-3 h-3 text-[var(--accent)]" />
                    <span>Search</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--background)] border border-[var(--border)] text-[10px] font-mono text-[var(--foreground)] shadow-xs">
                    <Database className="w-3 h-3 text-[var(--accent)]" />
                    <span>Memory</span>
                  </div>
                </div>

                {/* Circuit SVG connecting Search/Memory to Center Wrench */}
                <div className="relative flex items-center justify-center my-1">
                  <div className={`p-2.5 rounded-lg border transition-all ${
                    activeStep === 1
                      ? 'bg-[var(--accent-soft)] border-[var(--accent)]/40 text-[var(--accent-ink)] shadow-[0_0_12px_rgba(223,116,56,0.25)]'
                      : 'bg-[var(--background)] border-[var(--border)] text-[var(--muted-foreground)]'
                  }`}>
                    <Wrench className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Tool: Write */}
                <div className="mt-2 flex items-center justify-center">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[var(--background)] border border-[var(--border)] text-[10px] font-mono text-[var(--foreground)] shadow-xs">
                    <FileText className="w-3 h-3 text-[var(--accent)]" />
                    <span>Write</span>
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="w-full pt-3 border-t border-[var(--border)] flex items-center justify-between text-[10px] font-mono text-[var(--muted-foreground)]">
                <span>THE NEXT USEFUL STEP</span>
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
            </div>

            {/* CONNECTOR 2: Stage 2 -> Stage 3 (Between Cards) */}
            <div className="hidden md:flex flex-col items-center justify-center w-12 sm:w-16 shrink-0 relative">
              <svg viewBox="0 0 60 20" className="w-full h-5 overflow-visible" fill="none">
                <path
                  d="M 0 10 L 60 10"
                  stroke={activeStep === 2 ? 'var(--accent)' : 'var(--border-light)'}
                  strokeWidth={activeStep === 2 ? '2' : '1.5'}
                  strokeDasharray={activeStep === 2 ? '5 5' : '3 4'}
                  className={activeStep === 2 ? 'animate-path-travel' : ''}
                />
              </svg>
              <div className={`mt-1 h-1.5 w-1.5 rounded-full transition-colors ${activeStep === 2 ? 'bg-[var(--accent)]' : 'bg-transparent'}`} />
            </div>

            {/* STAGE 3: weekly-brief.md Artifact */}
            <div
              onClick={() => setActiveStep(2)}
              className={`relative z-10 flex flex-col p-5 rounded-xl border bg-[var(--card)] cursor-pointer transition-all duration-300 shadow-md ${
                activeStep === 2
                  ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/30 scale-[1.02] opacity-100'
                  : 'border-[var(--border)] opacity-60 hover:opacity-90 hover:border-[var(--border-light)]'
              }`}
            >
              <div className="w-full flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                  <FileText className="w-3.5 h-3.5" />
                  <span>weekly-brief.md</span>
                </div>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>

              <div className="my-3 text-left w-full text-xs space-y-1.5 text-[var(--foreground)]">
                <strong className="block text-sm font-semibold mb-2">The useful things.</strong>
                <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                  <span className="font-mono text-[9px] text-[var(--accent)]">01</span>
                  <span>The customer pattern</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                  <span className="font-mono text-[9px] text-[var(--accent)]">02</span>
                  <span>The evidence behind it</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                  <span className="font-mono text-[9px] text-[var(--accent)]">03</span>
                  <span>What to do next</span>
                </div>
              </div>

              <div className="w-full pt-3 border-t border-[var(--border)] flex items-center justify-between text-[10px] font-mono text-[var(--muted-foreground)]">
                <span>SAVED TO WORKSPACE</span>
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Step Switcher Tabs at Bottom */}
        <div className="grid grid-cols-3 border-t border-[var(--border)] bg-[var(--card)]">
          {stepsData.map((step, idx) => (
            <button
              key={step.index}
              onClick={() => setActiveStep(idx as 0 | 1 | 2)}
              className={`flex items-center justify-between p-4 sm:p-5 text-left transition-colors cursor-pointer ${
                idx > 0 ? 'border-l border-[var(--border)]' : ''
              } ${
                activeStep === idx
                  ? 'bg-[var(--accent-soft)] border-b-2 border-b-[var(--accent)] text-[var(--foreground)]'
                  : 'hover:bg-[var(--card-hover)] text-[var(--muted-foreground)]'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                  {step.index}
                </span>
                <strong className="font-mono text-xs sm:text-sm font-medium tracking-wide">
                  {step.title}
                </strong>
              </div>
              <ArrowRight className={`hidden sm:block w-3.5 h-3.5 transition-transform ${activeStep === idx ? 'text-[var(--accent)] translate-x-1' : 'opacity-40'}`} />
            </button>
          ))}
        </div>

        {/* Step Summary Footer */}
        <div className="p-5 sm:p-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[var(--card)]">
          <p className="text-sm text-[var(--muted-foreground)] max-w-xl">
            {stepsData[activeStep].description}
          </p>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] shrink-0 px-2.5 py-1 rounded-md bg-[var(--accent-soft)] border border-[var(--accent-soft-border)]">
            {stepsData[activeStep].telemetry}
          </span>
        </div>
      </div>
    </section>
  )
}
