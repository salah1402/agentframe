import { useState } from 'react'
import { ChevronDown, Copy, Check, Terminal, ArrowRight } from 'lucide-react'

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const [copied, setCopied] = useState(false)

  const faqs = [
    {
      q: 'What is an agent harness, and why do I need one?',
      a: 'Most agent failures happen not because the LLM is incapable, but because the runtime lacks state continuity, tool sandboxing, and persistent memory. Agentframe acts as the operational harness: managing files, recording decisions, validating tool calls, and maintaining checkpoints across multi-step executions.'
    },
    {
      q: 'How does Agentframe integrate with Model Context Protocol (MCP)?',
      a: 'Agentframe natively speaks the Model Context Protocol (MCP). Any MCP server—such as Postgres, GitHub, Slack, Puppeteer, or custom internal APIs—can be plugged directly into an Agentframe instance with standard JSON configuration.'
    },
    {
      q: 'Can I bring my own LLM models (OpenAI, Anthropic, Google, Ollama)?',
      a: 'Yes. Agentframe is strictly model-agnostic. You can route complex planning to Claude 3.7 or GPT-4o, run fast tool executions on lightweight models, or keep sensitive workloads entirely local with Ollama or vLLM.'
    },
    {
      q: 'Where are workspaces and persistent memories stored?',
      a: 'By default, all workspace artifacts, checkpoints, and decision logs are saved locally on your filesystem and tracked in an embedded SQLite database. For team tiers, state can be synced to private cloud buckets or VPC clusters.'
    },
    {
      q: 'How do human approvals work in practice?',
      a: 'You define permission policies per tool. Safe operations (e.g., search, read, calculate) run autonomously. High-impact operations (e.g., git push, deploy, database write, email send) pause the run and notify your console, CLI, or Slack channel for manual review.'
    }
  ]

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm i agentframe')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="faq" className="mx-auto my-28 w-[min(1140px,calc(100%-48px))] scroll-mt-24">
      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] mb-2 block">
            COMMON QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[var(--foreground)]">
            Everything you need to know.
          </h2>
        </div>

        <div className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i
            return (
              <div key={i} className="py-5">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex items-center justify-between w-full text-left font-medium text-base sm:text-lg text-[var(--foreground)] hover:text-[var(--accent)] transition-colors cursor-pointer gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[var(--accent)]' : 'text-[var(--muted-foreground)]'}`} />
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm text-[var(--muted-foreground)] leading-relaxed pr-6">
                    {faq.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Pre-footer High Impact Banner */}
      <div className="mt-28 p-8 sm:p-14 rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[var(--card)] to-[var(--background)] text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-[var(--accent)]/15 blur-[90px] rounded-full pointer-events-none" />

        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] block mb-3">
          GET STARTED TODAY
        </span>
        <h2 className="text-4xl sm:text-6xl font-normal tracking-tight text-[var(--foreground)] max-w-2xl mx-auto leading-tight">
          Give good ideas<br />somewhere to go.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[var(--muted-foreground)] max-w-lg mx-auto">
          Ready to give your agents a real harness? Start building in less than two minutes.
        </p>

        {/* Quick terminal install box */}
        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl border border-[var(--border)] bg-[#0d0e12] font-mono text-xs shadow-inner">
            <Terminal className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-neutral-300">npm i agentframe</span>
            <button
              onClick={handleCopyInstall}
              className="ml-2 p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Copy install command"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#playground"
            className="inline-flex items-center gap-2 h-10 px-6 rounded-lg bg-[var(--accent)] text-white font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 shadow-lg shadow-[var(--accent)]/20 transition-all cursor-pointer"
          >
            <span>Start Building Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="#quickstart"
            className="inline-flex items-center h-10 px-5 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] font-mono text-xs font-medium uppercase tracking-wider hover:bg-[var(--muted)] transition-all cursor-pointer"
          >
            Read Documentation
          </a>
        </div>
      </div>
    </section>
  )
}
