import { useState } from 'react'
import { LockKeyhole, UserRoundCheck, History, Check, ArrowDown, ShieldCheck, ArrowUpRight, Clock3 } from 'lucide-react'

export function ControlExecution() {
  const [activeTab, setActiveTab] = useState<'permissions' | 'approvals' | 'history'>('permissions')
  const [approved, setApproved] = useState(false)

  return (
    <section id="controls" className="mx-auto my-28 w-[min(1140px,calc(100%-48px))] scroll-mt-24 border border-[var(--border)] bg-[var(--card)]">
      {/* Header */}
      <header className="p-6 sm:p-8 border-b border-[var(--border)]">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] mb-3">
          #03 / CONTROL & EXECUTION
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[var(--foreground)] leading-tight">
          Let agents get on with it.<br />Stay in control.
        </h2>
      </header>

      {/* Body: Tabs (Left) & Live Approval Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Capability Tabs */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--border)]">
          <button
            onClick={() => setActiveTab('permissions')}
            className={`flex items-start gap-4 p-6 sm:p-7 text-left transition-all border-b border-[var(--border)] cursor-pointer ${
              activeTab === 'permissions'
                ? 'bg-[var(--accent-soft)] text-[var(--foreground)]'
                : 'hover:bg-[var(--card-hover)] text-[var(--muted-foreground)]'
            }`}
          >
            <LockKeyhole className={`w-5 h-5 mt-0.5 shrink-0 ${activeTab === 'permissions' ? 'text-[var(--accent)]' : ''}`} />
            <div>
              <strong className="block font-mono text-xs uppercase tracking-wider mb-1.5 text-[var(--foreground)]">
                Tool permissions
              </strong>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                Let routine actions run freely. Give sensitive tools their own permissions, without slowing everything else down.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('approvals')}
            className={`flex items-start gap-4 p-6 sm:p-7 text-left transition-all border-b border-[var(--border)] cursor-pointer ${
              activeTab === 'approvals'
                ? 'bg-[var(--accent-soft)] text-[var(--foreground)]'
                : 'hover:bg-[var(--card-hover)] text-[var(--muted-foreground)]'
            }`}
          >
            <UserRoundCheck className={`w-5 h-5 mt-0.5 shrink-0 ${activeTab === 'approvals' ? 'text-[var(--accent)]' : ''}`} />
            <div>
              <strong className="block font-mono text-xs uppercase tracking-wider mb-1.5 text-[var(--foreground)]">
                Human approvals
              </strong>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                Pause before the decisions you want to review. Approve the next step and let the agent carry on from there.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-start gap-4 p-6 sm:p-7 text-left transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[var(--accent-soft)] text-[var(--foreground)]'
                : 'hover:bg-[var(--card-hover)] text-[var(--muted-foreground)]'
            }`}
          >
            <History className={`w-5 h-5 mt-0.5 shrink-0 ${activeTab === 'history' ? 'text-[var(--accent)]' : ''}`} />
            <div>
              <strong className="block font-mono text-xs uppercase tracking-wider mb-1.5 text-[var(--foreground)]">
                Execution history
              </strong>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                See the inputs, tool calls, and decisions behind each run. Pick up the thread without digging through scattered logs.
              </p>
            </div>
          </button>
        </div>

        {/* Right: Interactive Human Approval Flow Simulator */}
        <div className="p-6 sm:p-8 flex items-center justify-center bg-[var(--scene-bg)]">
          <div className="w-full max-w-md rounded-xl border border-[var(--border)] bg-[#0d0e12] overflow-hidden shadow-xl">
            {/* Header */}
            <div className="flex h-10 items-center justify-between border-b border-[var(--border)] bg-[#14151a] px-4 font-mono text-xs text-[var(--muted-foreground)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
                <span>Tool permissions</span>
              </div>
              <span className="text-[10px]">af_run_0418</span>
            </div>

            {/* Stages Flow */}
            <div className="p-4 sm:p-5 space-y-2.5">
              {/* Step 1 */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] bg-[#111217]">
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-mono">
                    01
                  </span>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      THE TASK
                    </span>
                    <strong className="text-xs font-medium text-[var(--foreground)]">
                      Prepare the weekly brief
                    </strong>
                  </div>
                </div>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Connecting arrow */}
              <div className="flex justify-center text-[var(--muted-foreground)]">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>

              {/* Step 2 */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] bg-[#111217]">
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-mono">
                    02
                  </span>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-[var(--muted-foreground)]">
                      THE WORK
                    </span>
                    <strong className="text-xs font-medium text-[var(--foreground)]">
                      Read, search, and write
                    </strong>
                  </div>
                </div>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>

              {/* Connecting arrow */}
              <div className="flex justify-center text-[var(--muted-foreground)]">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>

              {/* Step 3: Human Gate */}
              <div className={`p-3.5 rounded-lg border transition-all ${
                approved
                  ? 'border-emerald-500/40 bg-emerald-950/20'
                  : 'border-[var(--accent)]/50 bg-[var(--accent-soft)]'
              }`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded bg-[var(--accent)] text-white text-xs font-mono font-bold">
                      03
                    </span>
                    <div>
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-[var(--muted-foreground)]">
                        YOUR CALL
                      </span>
                      <strong className="text-xs font-medium text-[var(--foreground)]">
                        Publishing needs permission
                      </strong>
                    </div>
                  </div>
                  {approved && <Check className="w-4 h-4 text-emerald-400 mt-1" />}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]/50">
                  <code className="font-mono text-[10px] text-[var(--muted-foreground)]">
                    publish → ask first
                  </code>
                  <button
                    onClick={() => setApproved(!approved)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[11px] font-semibold transition-all cursor-pointer ${
                      approved
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                        : 'bg-[var(--accent)] text-white hover:opacity-90'
                    }`}
                  >
                    <UserRoundCheck className="w-3.5 h-3.5" />
                    <span>{approved ? 'Approved ✓' : 'Approve publish'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex h-8 items-center justify-between border-t border-[var(--border)] bg-[#14151a] px-4 font-mono text-[9px] text-[var(--muted-foreground)]">
              <span className="flex items-center gap-1.5">
                <Clock3 className="w-3 h-3 text-[var(--accent)]" />
                {approved ? 'Action approved. Dispatched to team.' : 'Waiting for human sign-off.'}
              </span>
              <span>LOCAL PREVIEW</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <a
        href="#faq"
        className="flex items-center justify-center gap-2 p-5 border-t border-[var(--border)] bg-[var(--card)] font-mono text-[11px] uppercase tracking-wider text-[var(--foreground)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] transition-all group"
      >
        <span>YOUR QUESTIONS, ANSWERED</span>
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </section>
  )
}
