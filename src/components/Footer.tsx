export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)]/50 pt-16 pb-12 transition-colors">
      <div className="mx-auto w-[min(1140px,calc(100%-48px))]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[var(--border)]">
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <svg viewBox="0 0 40 40" width="28" height="28" fill="none" className="text-[var(--accent)]" aria-hidden="true">
                <path d="M7 22V9a3 3 0 0 1 3-3h13v8H15v9H7Z" fill="currentColor" />
                <path d="M18 7h13a3 3 0 0 1 3 3v13h-8V15h-9V7Z" fill="currentColor" opacity=".75" />
                <path d="M33 18v13a3 3 0 0 1-3 3H17v-8h8v-9h8Z" fill="currentColor" />
                <path d="M22 33H9a3 3 0 0 1-3-3V17h8v8h9v8Z" fill="currentColor" opacity=".75" />
              </svg>
              <span className="font-mono text-base font-bold tracking-wider text-[var(--foreground)] uppercase">
                AGENTFRAME
              </span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed max-w-sm mb-6">
              Give your agents the tools, memory, and room to turn a good thought into finished work. An open harness for what comes next.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational (99.99%)</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--foreground)] mb-4 font-semibold">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--muted-foreground)]">
              <li><a href="#runtime" className="hover:text-[var(--foreground)] transition-colors">Runtime Engine</a></li>
              <li><a href="#quickstart" className="hover:text-[var(--foreground)] transition-colors">Agent SDK</a></li>
              <li><a href="#runtime" className="hover:text-[var(--foreground)] transition-colors">Persistent Workspaces</a></li>
              <li><a href="#controls" className="hover:text-[var(--foreground)] transition-colors">Human Approvals</a></li>
              <li><a href="#pricing" className="hover:text-[var(--foreground)] transition-colors">Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--foreground)] mb-4 font-semibold">
              Developers
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--muted-foreground)]">
              <li><a href="#quickstart" className="hover:text-[var(--foreground)] transition-colors">Documentation</a></li>
              <li><a href="#playground" className="hover:text-[var(--foreground)] transition-colors">Interactive Playground</a></li>
              <li><a href="#runtime" className="hover:text-[var(--foreground)] transition-colors">MCP Protocol Spec</a></li>
              <li><a href="#quickstart" className="hover:text-[var(--foreground)] transition-colors">Field Notes</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors">GitHub ↗</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--foreground)] mb-4 font-semibold">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--muted-foreground)]">
              <li><a href="#top" className="hover:text-[var(--foreground)] transition-colors">About</a></li>
              <li><a href="#controls" className="hover:text-[var(--foreground)] transition-colors">Security & Trust</a></li>
              <li><a href="#pricing" className="hover:text-[var(--foreground)] transition-colors">Careers</a></li>
              <li><a href="#controls" className="hover:text-[var(--foreground)] transition-colors">Privacy Policy</a></li>
              <li><a href="#controls" className="hover:text-[var(--foreground)] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--muted-foreground)]">
          <p>© {new Date().getFullYear()} Agentframe Inc. Built for portfolio excellence.</p>
          <p className="flex items-center gap-4">
            <span>Designed with precision</span>
            <span>•</span>
            <a href="#top" className="hover:text-[var(--foreground)] transition-colors">Back to top ↑</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
