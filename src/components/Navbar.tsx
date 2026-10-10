import { useState } from 'react'
import { ArrowUpRight, Menu, X, Sun, Moon } from 'lucide-react'

interface NavbarProps {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 h-16 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md transition-colors duration-200">
        <div className="mx-auto flex h-16 w-[min(1140px,calc(100%-48px))] items-center justify-between gap-6">
          {/* Brand Logo */}
          <a href="#top" className="inline-flex items-center gap-2.5 group">
            <svg viewBox="0 0 40 40" width="30" height="30" fill="none" className="text-[var(--accent)] transition-transform duration-200 group-hover:scale-105" aria-hidden="true">
              <path d="M7 22V9a3 3 0 0 1 3-3h13v8H15v9H7Z" fill="currentColor" />
              <path d="M18 7h13a3 3 0 0 1 3 3v13h-8V15h-9V7Z" fill="currentColor" opacity=".75" />
              <path d="M33 18v13a3 3 0 0 1-3 3H17v-8h8v-9h8Z" fill="currentColor" />
              <path d="M22 33H9a3 3 0 0 1-3-3V17h8v8h9v8Z" fill="currentColor" opacity=".75" />
            </svg>
            <span className="font-mono text-[16px] font-semibold tracking-[0.08em] text-[var(--foreground)] uppercase">
              AGENTFRAME
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#runtime" className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
              Platform
            </a>
            <a href="#quickstart" className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
              Developers
            </a>
            <a href="#use-cases" className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
              Use Cases
            </a>
            <a href="#controls" className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
              Governance
            </a>
            <a href="#pricing" className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
              Pricing
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border-light)] transition-all cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#playground"
              className="hidden sm:inline-flex items-center gap-1.5 h-8.5 px-4 rounded-lg border border-[var(--accent)] bg-[var(--accent)] text-white font-mono text-[11px] font-medium uppercase tracking-wider shadow-sm hover:opacity-90 hover:translate-y-[-1px] active:translate-y-[1px] transition-all cursor-pointer group"
            >
              <span>Try Agentframe</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-180 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Modal */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden flex justify-end">
          <div className="w-full max-w-sm h-full bg-[var(--card)] border-l border-[var(--border)] p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
                <span className="font-mono text-xs text-[var(--muted-foreground)] uppercase tracking-widest">
                  NAVIGATION
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-md border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col">
                <a
                  href="#runtime"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-[var(--border)] text-base font-medium text-[var(--foreground)] hover:text-[var(--accent)]"
                >
                  <span>Platform</span>
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">01</span>
                </a>
                <a
                  href="#quickstart"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-[var(--border)] text-base font-medium text-[var(--foreground)] hover:text-[var(--accent)]"
                >
                  <span>Developers</span>
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">02</span>
                </a>
                <a
                  href="#use-cases"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-[var(--border)] text-base font-medium text-[var(--foreground)] hover:text-[var(--accent)]"
                >
                  <span>Use Cases</span>
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">03</span>
                </a>
                <a
                  href="#controls"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-[var(--border)] text-base font-medium text-[var(--foreground)] hover:text-[var(--accent)]"
                >
                  <span>Governance</span>
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">04</span>
                </a>
                <a
                  href="#pricing"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-[var(--border)] text-base font-medium text-[var(--foreground)] hover:text-[var(--accent)]"
                >
                  <span>Pricing</span>
                  <span className="font-mono text-xs text-[var(--muted-foreground)]">05</span>
                </a>
              </nav>
            </div>

            <div className="pt-6 border-t border-[var(--border)]">
              <a
                href="#playground"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[var(--accent)] text-white font-mono text-xs font-semibold uppercase tracking-wider"
              >
                <span>Try Agentframe</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <p className="mt-3 text-center text-xs text-[var(--muted-foreground)]">
                Give good ideas somewhere to go.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
