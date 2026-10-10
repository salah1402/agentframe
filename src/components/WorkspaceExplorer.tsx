import { useState } from 'react'
import { Folder, Database, GitBranch, Search, FileText, ChevronDown, CheckCheck, ArrowUpRight } from 'lucide-react'

type FileId = 'brief' | 'decisions' | 'checkpoint' | 'findings'

interface FileItem {
  id: FileId
  name: string
  folder: string
  content: string
}

const FILES: Record<FileId, FileItem> = {
  brief: {
    id: 'brief',
    name: 'brief.md',
    folder: 'workspace',
    content: `# A clearer weekly update

## The outcome
Write a useful product brief.

## Read first
- customer-notes.md
- release-plan.md

## Save the result
/workspace/weekly-brief.md

Keep it short. Link the sources.`
  },
  decisions: {
    id: 'decisions',
    name: 'decisions.json',
    folder: 'memory',
    content: `{
  "agent": "af_curious_one",
  "workspace": "weekly-brief",
  "persistedDecisions": [
    {
      "scope": "architecture",
      "preference": "Keep tool interfaces stateless",
      "recordedAt": "2026-10-10T11:42:00Z"
    },
    {
      "scope": "formatting",
      "preference": "Link direct file line numbers",
      "recordedAt": "2026-10-10T12:05:00Z"
    }
  ]
}`
  },
  checkpoint: {
    id: 'checkpoint',
    name: 'run-0418.json',
    folder: 'checkpoints',
    content: `{
  "runId": "af_run_0418",
  "checkpointId": "cp_stage_2",
  "status": "ready_to_resume",
  "tokensUsed": 1420,
  "lastExecutedTool": "workspace/write_file",
  "nextPendingAction": "human_approval"
}`
  },
  findings: {
    id: 'findings',
    name: 'findings.md',
    folder: 'sources',
    content: `# Customer Feedback Themes

1. Developers prefer local checkpoints over remote state locks.
2. Tool call transparency reduces manual debugging by 80%.
3. Teams want inspectable diffs before writing files.`
  }
}

export function WorkspaceExplorer() {
  const [selectedFile, setSelectedFile] = useState<FileId>('brief')
  const [activeTab, setActiveTab] = useState<'workspace' | 'memory' | 'checkpoints' | 'search'>('workspace')

  return (
    <section id="runtime" className="mx-auto my-28 w-[min(1140px,calc(100%-48px))] scroll-mt-24 border border-[var(--border)] bg-[var(--card)]">
      {/* Header */}
      <header className="p-6 sm:p-8 border-b border-[var(--border)]">
        <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] mb-3">
          #02 / CONTEXT & MEMORY
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-[42px] font-normal tracking-tight text-[var(--foreground)] leading-tight">
          The next run starts with<br />what you already know.
        </h2>
      </header>

      {/* Body: Tabs (Left) & Virtual File Explorer Window (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Capability Tabs */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--border)]">
          <button
            onClick={() => {
              setActiveTab('workspace')
              setSelectedFile('brief')
            }}
            className={`flex items-start gap-4 p-6 sm:p-7 text-left transition-all border-b border-[var(--border)] cursor-pointer ${
              activeTab === 'workspace' ? 'bg-[var(--accent-soft)] text-[var(--foreground)]' : 'hover:bg-[var(--card-hover)] text-[var(--muted-foreground)]'
            }`}
          >
            <Folder className={`w-5 h-5 mt-0.5 shrink-0 ${activeTab === 'workspace' ? 'text-[var(--accent)]' : ''}`} />
            <div>
              <strong className="block font-mono text-xs uppercase tracking-wider mb-1.5 text-[var(--foreground)]">
                Workspace
              </strong>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                Keep briefs, source files, and finished work together. Your agent always knows where to pick things up.
              </p>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab('memory')
              setSelectedFile('decisions')
            }}
            className={`flex items-start gap-4 p-6 sm:p-7 text-left transition-all border-b border-[var(--border)] cursor-pointer ${
              activeTab === 'memory' ? 'bg-[var(--accent-soft)] text-[var(--foreground)]' : 'hover:bg-[var(--card-hover)] text-[var(--muted-foreground)]'
            }`}
          >
            <Database className={`w-5 h-5 mt-0.5 shrink-0 ${activeTab === 'memory' ? 'text-[var(--accent)]' : ''}`} />
            <div>
              <strong className="block font-mono text-xs uppercase tracking-wider mb-1.5 text-[var(--foreground)]">
                Memory
              </strong>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                Save the preferences and decisions that matter. Start the next run with context, not another introduction.
              </p>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab('checkpoints')
              setSelectedFile('checkpoint')
            }}
            className={`flex items-start gap-4 p-6 sm:p-7 text-left transition-all border-b border-[var(--border)] cursor-pointer ${
              activeTab === 'checkpoints' ? 'bg-[var(--accent-soft)] text-[var(--foreground)]' : 'hover:bg-[var(--card-hover)] text-[var(--muted-foreground)]'
            }`}
          >
            <GitBranch className={`w-5 h-5 mt-0.5 shrink-0 ${activeTab === 'checkpoints' ? 'text-[var(--accent)]' : ''}`} />
            <div>
              <strong className="block font-mono text-xs uppercase tracking-wider mb-1.5 text-[var(--foreground)]">
                Checkpoints
              </strong>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                Checkpoint the work as it happens. A paused run can continue with its files, decisions, and next step intact.
              </p>
            </div>
          </button>

          <button
            onClick={() => {
              setActiveTab('search')
              setSelectedFile('findings')
            }}
            className={`flex items-start gap-4 p-6 sm:p-7 text-left transition-all cursor-pointer ${
              activeTab === 'search' ? 'bg-[var(--accent-soft)] text-[var(--foreground)]' : 'hover:bg-[var(--card-hover)] text-[var(--muted-foreground)]'
            }`}
          >
            <Search className={`w-5 h-5 mt-0.5 shrink-0 ${activeTab === 'search' ? 'text-[var(--accent)]' : ''}`} />
            <div>
              <strong className="block font-mono text-xs uppercase tracking-wider mb-1.5 text-[var(--foreground)]">
                Search
              </strong>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                Search across the context you choose. Return the relevant passage with its source, instead of a pile of files.
              </p>
            </div>
          </button>
        </div>

        {/* Right: Interactive Workspace File Explorer Window */}
        <div className="p-6 sm:p-8 flex items-center justify-center bg-[var(--scene-bg)]">
          <div className="w-full rounded-xl border border-[var(--border)] bg-[#0d0e12] overflow-hidden shadow-xl">
            {/* Window title bar */}
            <div className="flex h-10 items-center justify-between border-b border-[var(--border)] bg-[#14151a] px-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono text-xs text-[var(--muted-foreground)]">
                  weekly-brief / workspace
                </span>
              </div>
              <CheckCheck className="w-4 h-4 text-emerald-400" />
            </div>

            {/* Split Pane: File Tree (Left) & File Content (Right) */}
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] min-h-[300px]">
              {/* File Tree */}
              <div className="border-b sm:border-b-0 sm:border-r border-[var(--border)] p-3 font-mono text-xs bg-[#111217]">
                <div className="flex items-center gap-1 text-[10px] text-[var(--muted-foreground)] uppercase mb-3">
                  <ChevronDown className="w-3 h-3" />
                  <span>PROJECT FILES</span>
                </div>

                <div className="space-y-1">
                  {Object.values(FILES).map((file) => (
                    <button
                      key={file.id}
                      onClick={() => setSelectedFile(file.id)}
                      className={`flex items-center gap-1.5 w-full px-2 py-1.5 rounded text-left transition-colors cursor-pointer text-xs ${
                        selectedFile === file.id
                          ? 'bg-[var(--accent-soft)] text-[var(--accent-ink)] font-medium border border-[var(--accent-soft-border)]'
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{file.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Content Pane */}
              <div className="flex flex-col bg-[#0d0e12]">
                <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)] bg-[#14151a]/60 font-mono text-[11px] text-[var(--muted-foreground)]">
                  <span>{FILES[selectedFile].folder} / {FILES[selectedFile].name}</span>
                  <span className="text-[10px] text-emerald-400">synced</span>
                </div>
                <pre className="p-4 sm:p-5 font-mono text-xs leading-relaxed text-neutral-300 overflow-x-auto flex-1">
                  <code>{FILES[selectedFile].content}</code>
                </pre>
              </div>
            </div>

            {/* Window Footer */}
            <div className="flex h-8 items-center justify-between border-t border-[var(--border)] bg-[#14151a] px-4 font-mono text-[9px] uppercase tracking-wider text-[var(--muted-foreground)]">
              <span>3 files available to this run</span>
              <span className="text-[var(--accent)]">PROJECT SCOPE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <a
        href="#controls"
        className="flex items-center justify-center gap-2 p-5 border-t border-[var(--border)] bg-[var(--card)] font-mono text-[11px] uppercase tracking-wider text-[var(--foreground)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] transition-all group"
      >
        <span>A CLOSER LOOK AT DURABLE RUNS</span>
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </section>
  )
}
