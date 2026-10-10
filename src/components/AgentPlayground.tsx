import { useState, useEffect, useRef } from 'react'
import { Terminal, ArrowUp, ChevronDown, CheckCircle2, Loader2, Sparkles, Database, FileText } from 'lucide-react'
import confetti from 'canvas-confetti'

interface Scenario {
  id: string
  label: string
  prompt: string
  steps: string[]
  outputFile: string
  executionTime: string
}

const SCENARIOS: Scenario[] = [
  {
    id: 'research',
    label: 'Research an idea',
    prompt: 'Research durable agent patterns. Turn the findings into a clear, useful brief.',
    steps: [
      'Scanning local workspace for context...',
      'Connected to arXiv MCP & GitHub search tools...',
      'Synthesizing architectural patterns & tradeoff analysis...',
      'Drafting structured report to /workspace/weekly-brief.md'
    ],
    outputFile: 'weekly-brief.md',
    executionTime: '2.4s'
  },
  {
    id: 'engineer',
    label: 'Engineer a feature',
    prompt: 'Add keyboard navigation to our command menu. Include a focused accessibility check.',
    steps: [
      'Reading component tree in command-menu.tsx...',
      'Wiring keyboard event listeners (ArrowUp/Down, Enter, Esc)...',
      'Injecting ARIA roles & roving tabindex management...',
      'Running automated axe-core accessibility validation suite...'
    ],
    outputFile: 'command-menu.tsx',
    executionTime: '3.1s'
  },
  {
    id: 'triage',
    label: 'Triage support tickets',
    prompt: 'Review this week’s support tickets. Group the themes and suggest what to fix first.',
    steps: [
      'Fetching unresolved tickets from Zendesk / Slack channel...',
      'Clustering semantic patterns and recurring customer complaints...',
      'Prioritizing high-impact friction points based on ARR impact...',
      'Saving prioritized action plan to support-brief.md'
    ],
    outputFile: 'support-brief.md',
    executionTime: '1.9s'
  }
]

export function AgentPlayground() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'running' | 'completed'>('idle')
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // 3D Tilt State
  const stageRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Interactive Particle Canvas with Mouse Reaction
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle nodes
    const particleCount = 45
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      alpha: number
    }> = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.5 + 0.2
      })
    }

    let mousePos = { x: -1000, y: -1000 }
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
    const onMouseLeave = () => {
      mousePos = { x: -1000, y: -1000 }
    }

    const stageEl = stageRef.current
    if (stageEl) {
      stageEl.addEventListener('mousemove', onMouseMove)
      stageEl.addEventListener('mouseleave', onMouseLeave)
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Distance to cursor
        const dx = mousePos.x - p.x
        const dy = mousePos.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Mouse interaction glow & connection
        let dynamicAlpha = p.alpha
        if (dist < 150) {
          dynamicAlpha = Math.min(1, p.alpha + (1 - dist / 150) * 0.7)
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mousePos.x, mousePos.y)
          ctx.strokeStyle = `rgba(223, 116, 56, ${(1 - dist / 150) * 0.35})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * (dist < 150 ? 1.4 : 1), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240, 137, 78, ${dynamicAlpha})`
        ctx.shadowBlur = dist < 150 ? 8 : 0
        ctx.shadowColor = '#df7438'
        ctx.fill()
        ctx.shadowBlur = 0

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const pdist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (pdist < 90) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - pdist / 90) * 0.08})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      if (stageEl) {
        stageEl.removeEventListener('mousemove', onMouseMove)
        stageEl.removeEventListener('mouseleave', onMouseLeave)
      }
    }
  }, [])

  // 3D Tilt Handler on Stage
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Smooth subtle tilt (-4 to +4 degrees)
    const rotateY = ((x - centerX) / centerX) * 4.5
    const rotateX = -((y - centerY) / centerY) * 4.5
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const handleRun = () => {
    if (status === 'running') return
    setStatus('running')
    setCurrentStepIndex(0)
  }

  useEffect(() => {
    if (status !== 'running') return

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < selectedScenario.steps.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          setStatus('completed')
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#df7438', '#f0894e', '#ffffff']
          })
          return prev
        }
      })
    }, 700)

    return () => clearInterval(interval)
  }, [status, selectedScenario])

  return (
    <section id="playground" className="mx-auto w-[min(1140px,calc(100%-48px))] scroll-mt-24 pt-4">
      {/* Visual Canvas Stage with Mouse Parallax Tilt */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative isolate h-[520px] sm:h-[580px] rounded-t-2xl overflow-hidden border border-b-0 border-[var(--border)] bg-[#090a0d] flex items-center justify-center p-4 cursor-crosshair group"
        style={{ perspective: '1200px' }}
      >
        {/* Ambient atmospheric backdrop image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity contrast-125 transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${tilt.y * 1.5}px, ${-tilt.x * 1.5}px, 0)`,
            backgroundImage: `radial-gradient(ellipse at 50% 20%, rgba(223, 116, 56, 0.2), transparent 70%), linear-gradient(180deg, rgba(9, 10, 13, 0.4) 0%, rgba(9, 10, 13, 0.95) 100%), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')`
          }}
        />

        {/* Interactive Mouse-Reactive Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full pointer-events-none z-0" />

        {/* Hairline Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Center Floating Console with 3D Mouse Tilt */}
        <div
          className="relative z-10 w-full max-w-2xl rounded-2xl border border-[var(--border-light)] bg-[var(--card)]/95 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-200 ease-out cursor-default"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`
          }}
        >
          {/* Header pill indicator */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-[var(--accent)] animate-ping" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--muted-foreground)]">
                Interactive Agent Runtime
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[var(--muted-foreground)]">
                Status: <span className="text-[var(--accent-ink)] font-semibold uppercase">{status}</span>
              </span>
            </div>
          </div>

          {/* Prompt Display Area */}
          <div className="my-5 min-h-[56px] flex items-center">
            {status === 'running' ? (
              <div className="flex items-center gap-3 text-sm text-[var(--accent-ink)] font-mono animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                <span>{selectedScenario.steps[currentStepIndex]}</span>
              </div>
            ) : status === 'completed' ? (
              <div className="flex items-center justify-between w-full p-3 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent)]/30 text-sm">
                <div className="flex items-center gap-2.5 text-[var(--foreground)] font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Finished work saved to <strong className="text-[var(--accent-ink)]">{selectedScenario.outputFile}</strong></span>
                </div>
                <span className="font-mono text-xs text-[var(--muted-foreground)]">Done in {selectedScenario.executionTime}</span>
              </div>
            ) : (
              <p className="text-base sm:text-lg font-normal text-[var(--foreground)] leading-snug">
                {selectedScenario.prompt}
              </p>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[var(--border)]">
            {/* Scenario dropdown selector */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:border-[var(--accent)]/40 hover:bg-[var(--muted)] text-xs text-[var(--foreground)] transition-all cursor-pointer font-medium"
              >
                <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>{selectedScenario.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[var(--muted-foreground)] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 bottom-full mb-2 w-56 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-xl z-30">
                  {SCENARIOS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedScenario(s)
                        setDropdownOpen(false)
                        setStatus('idle')
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                        selectedScenario.id === s.id
                          ? 'bg-[var(--accent-soft)] text-[var(--accent-ink)] font-semibold'
                          : 'text-[var(--foreground)] hover:bg-[var(--muted)]'
                      }`}
                    >
                      <span>{s.label}</span>
                      {selectedScenario.id === s.id && <Sparkles className="w-3 h-3 text-[var(--accent)]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Run Trigger Button with Interactive Pulse */}
            <div className="flex items-center gap-2">
              {status === 'completed' && (
                <button
                  onClick={() => setStatus('idle')}
                  className="h-9 px-3 rounded-lg border border-[var(--border)] text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
                >
                  Reset
                </button>
              )}
              <button
                onClick={handleRun}
                disabled={status === 'running'}
                className="relative inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-[var(--accent)] text-white hover:opacity-90 active:scale-95 disabled:opacity-50 transition-all font-mono text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-lg shadow-[var(--accent)]/25 group/btn overflow-hidden"
                aria-label="Run agent demo"
              >
                {/* Shiny highlight sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                {status === 'running' ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing</span>
                  </>
                ) : (
                  <>
                    <span>Run Agent</span>
                    <ArrowUp className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Telemetry Bottom Status Strip */}
          <div className="mt-3 pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[10px] font-mono text-[var(--muted-foreground)]">
            <div className="flex items-center gap-2">
              <Database className="w-3 h-3 text-[var(--accent)]" />
              <span>Workspace connected: /workspace/{selectedScenario.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-3 h-3" />
              <span>Active memory: decisions.json</span>
            </div>
          </div>
        </div>

        {/* Bottom Banner Tag */}
        <span className="absolute bottom-4 left-0 right-0 text-center font-mono text-[9px] font-normal tracking-[0.1em] text-white/70 uppercase pointer-events-none">
          A LITTLE DIRECTION. A WORLD OF POSSIBILITY.
        </span>
      </div>
    </section>
  )
}
