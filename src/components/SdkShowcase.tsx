import { useState } from 'react'
import { Terminal, Layers, Fingerprint, Copy, Check, ArrowUpRight } from 'lucide-react'

type TabKey = 'sdk' | 'context' | 'permissions'
type Language = 'typescript' | 'python'

const CODE_SNIPPETS: Record<TabKey, Record<Language, { filename: string; code: string }>> = {
  sdk: {
    typescript: {
      filename: 'agent.ts',
      code: `import { Agent } from "agentframe";
import { search, read, write } from "@agentframe/tools";

const researcher = new Agent({
  name: "the-curious-one",
  model: "your-favorite-model",
  tools: [search, read, write],
  instructions: "Find the useful things. Keep the sources close.",
});

const run = await researcher.run({
  task: "Turn this idea into a structured product brief.",
});

console.log(run.output);`
    },
    python: {
      filename: 'agent.py',
      code: `from agentframe import Agent
from agentframe.tools import search, read, write

researcher = Agent(
    name="the-curious-one",
    model="your-favorite-model",
    tools=[search, read, write],
    instructions="Find the useful things. Keep the sources close."
)

run = researcher.run(
    task="Turn this idea into a structured product brief."
)

print(run.output)`
    }
  },
  context: {
    typescript: {
      filename: 'workspace-run.ts',
      code: `import { Workspace, Agent } from "agentframe";

const space = await Workspace.load("weekly-brief");

const agent = new Agent({
  workspace: space,
  memory: space.memory("decisions.json"),
});

// Resume state from the last checkpoint
await agent.continue({
  checkpoint: space.latestCheckpoint(),
  nextStep: "Synthesize tradeoffs"
});`
    },
    python: {
      filename: 'workspace_run.py',
      code: `from agentframe import Workspace, Agent

space = Workspace.load("weekly-brief")

agent = Agent(
    workspace=space,
    memory=space.memory("decisions.json")
)

# Resume state from the last checkpoint
agent.continue_run(
    checkpoint=space.latest_checkpoint(),
    next_step="Synthesize tradeoffs"
)`
    }
  },
  permissions: {
    typescript: {
      filename: 'permissions.ts',
      code: `import { Agent, PermissionPolicy } from "agentframe";

const agent = new Agent({
  tools: [search, read, write, deploy],
  permissions: {
    // Read operations execute without interruption
    "read:*": PermissionPolicy.ALLOW,
    // Sensitive write / deployment operations require explicit human sign-off
    "deploy:*": PermissionPolicy.REQUIRE_APPROVAL,
  }
});`
    },
    python: {
      filename: 'permissions.py',
      code: `from agentframe import Agent, PermissionPolicy

agent = Agent(
    tools=[search, read, write, deploy],
    permissions={
        # Read operations execute without interruption
        "read:*": PermissionPolicy.ALLOW,
        # Sensitive write operations require human sign-off
        "deploy:*": PermissionPolicy.REQUIRE_APPROVAL,
    }
)`
    }
  }
}

export function SdkShowcase() {
  const [activeTab, setActiveTab] = useState<TabKey>('sdk')
  const [language, setLanguage] = useState<Language>('typescript')
  const [copied, setCopied] = useState(false)

  const currentSnippet = CODE_SNIPPETS[activeTab][language]

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="quickstart" className="mx-auto mb-28 w-[min(1140px,calc(100%-48px))] scroll-mt-24 border border-[var(--border)] bg-[var(--card)]">
      {/* Header */}
      <header className="p-6 sm:p-8 border-b border-[var(--border)]">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] mb-3">
          #01 / THE AGENT HARNESS
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[var(--foreground)] leading-tight">
          From an instruction<br />to work you can use.
        </h2>
      </header>

      {/* Body: Tabs (Left) & Code Window (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Capability Tabs */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--border)]">
          {/* Tab 1 */}
          <button
            onClick={() => setActiveTab('sdk')}
            className={`flex items-start gap-4 p-6 sm:p-7 text-left transition-all border-b border-[var(--border)] cursor-pointer ${
              activeTab === 'sdk'
                ? 'bg-[var(--accent-soft)] text-[var(--foreground)]'
                : 'hover:bg-[var(--card-hover)] text-[var(--muted-foreground)]'
            }`}
          >
            <Terminal className={`w-5 h-5 mt-0.5 shrink-0 ${activeTab === 'sdk' ? 'text-[var(--accent)]' : ''}`} />
            <div>
              <strong className="block font-mono text-xs uppercase tracking-wider mb-1.5 text-[var(--foreground)]">
                AGENT SDK
              </strong>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                Describe the job, connect your tools, and make the first call. No orchestration maze.
              </p>
            </div>
          </button>

          {/* Tab 2 */}
          <button
            onClick={() => setActiveTab('context')}
            className={`flex items-start gap-4 p-6 sm:p-7 text-left transition-all border-b border-[var(--border)] cursor-pointer ${
              activeTab === 'context'
                ? 'bg-[var(--accent-soft)] text-[var(--foreground)]'
                : 'hover:bg-[var(--card-hover)] text-[var(--muted-foreground)]'
            }`}
          >
            <Layers className={`w-5 h-5 mt-0.5 shrink-0 ${activeTab === 'context' ? 'text-[var(--accent)]' : ''}`} />
            <div>
              <strong className="block font-mono text-xs uppercase tracking-wider mb-1.5 text-[var(--foreground)]">
                PERSISTENT CONTEXT
              </strong>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                Carry useful context between runs. Your agent should learn the job, not relearn the brief.
              </p>
            </div>
          </button>

          {/* Tab 3 */}
          <button
            onClick={() => setActiveTab('permissions')}
            className={`flex items-start gap-4 p-6 sm:p-7 text-left transition-all cursor-pointer ${
              activeTab === 'permissions'
                ? 'bg-[var(--accent-soft)] text-[var(--foreground)]'
                : 'hover:bg-[var(--card-hover)] text-[var(--muted-foreground)]'
            }`}
          >
            <Fingerprint className={`w-5 h-5 mt-0.5 shrink-0 ${activeTab === 'permissions' ? 'text-[var(--accent)]' : ''}`} />
            <div>
              <strong className="block font-mono text-xs uppercase tracking-wider mb-1.5 text-[var(--foreground)]">
                TOOL PERMISSIONS
              </strong>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                Choose which actions run freely and which ones wait for a person. You set the boundaries.
              </p>
            </div>
          </button>
        </div>

        {/* Right: Windowed Code Viewer */}
        <div className="p-6 sm:p-8 flex items-center justify-center bg-[var(--scene-bg)]">
          <div className="w-full rounded-xl border border-[var(--border)] bg-[#0d0e12] overflow-hidden shadow-xl">
            {/* Window title bar */}
            <div className="flex h-10 items-center justify-between border-b border-[var(--border)] bg-[#14151a] px-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono text-xs text-[var(--muted-foreground)]">
                  {currentSnippet.filename}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Language Switcher */}
                <div className="flex items-center rounded-md border border-[var(--border)] p-0.5 bg-[#0d0e12] text-[10px] font-mono">
                  <button
                    onClick={() => setLanguage('typescript')}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      language === 'typescript' ? 'bg-[var(--accent)] text-white font-semibold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    TS
                  </button>
                  <button
                    onClick={() => setLanguage('python')}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      language === 'python' ? 'bg-[var(--accent)] text-white font-semibold' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    PY
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="grid h-7 w-7 place-items-center rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Code Preformatted Block */}
            <pre className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-neutral-300 overflow-x-auto min-h-[260px]">
              <code>{currentSnippet.code}</code>
            </pre>

            {/* Status Footer */}
            <div className="flex h-8 items-center border-t border-[var(--border)] bg-[#14151a] px-4 font-mono text-[9px] uppercase tracking-wider text-[var(--muted-foreground)]">
              EXAMPLE SDK · BRING YOUR OWN MODEL
            </div>
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <a
        href="#runtime"
        className="flex items-center justify-center gap-2 p-5 border-t border-[var(--border)] bg-[var(--card)] font-mono text-[11px] uppercase tracking-wider text-[var(--foreground)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] transition-all group"
      >
        <span>EXPLORE THE AGENT RUNTIME</span>
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </section>
  )
}
