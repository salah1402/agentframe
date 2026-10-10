import { useState } from 'react'
import { Check, Sparkles, ArrowRight } from 'lucide-react'

export function Pricing() {
  const [annual, setAnnual] = useState(true)
  const [cardMousePos, setCardMousePos] = useState<Record<string, { x: number; y: number }>>({})
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const plans = [
    {
      name: 'Developer',
      price: '$0',
      period: 'forever free',
      description: 'Everything you need to run durable, stateful agents on your local machine.',
      features: [
        '5 persistent workspaces',
        'Local SQLite context & memory',
        'Unlimited MCP tool connections',
        'Inspectable run logs & checkpoints',
        'Community Discord & GitHub support'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Team',
      price: annual ? '$39' : '$49',
      period: 'per seat / month',
      description: 'Shared harnesses, team tool registries, and human approval governance.',
      features: [
        'Unlimited shared workspaces',
        'Cloud MCP server registry',
        'Human-in-the-loop approvals',
        'Branchable checkpoint history',
        'Role-based tool access control',
        'Priority Slack & email support'
      ],
      cta: 'Start 14-day Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'billed annually',
      description: 'Dedicated infrastructure, VPC isolation, and compliance guarantees.',
      features: [
        'Private VPC or on-prem deployment',
        'Custom fine-tuned harness models',
        'SSO, SAML & SOC 2 compliance package',
        'Immutable audit logs & telemetry export',
        '99.99% uptime SLA & dedicated engineer'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const handleCardMouseMove = (name: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setCardMousePos((prev) => ({
      ...prev,
      [name]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }))
  }

  return (
    <section id="pricing" className="mx-auto my-28 w-[min(1140px,calc(100%-48px))] scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] mb-2 block">
          TRANSPARENT PLANS
        </span>
        <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-[var(--foreground)]">
          Simple, honest pricing.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[var(--muted-foreground)]">
          Start for free, then scale as your agents take on real work.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-full border border-[var(--border)] bg-[var(--card)] shadow-inner">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              !annual ? 'bg-[var(--accent)] text-white font-semibold shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              annual ? 'bg-[var(--accent)] text-white font-semibold shadow-sm' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <span>Annual</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-white/20 text-white">
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid with Mouse Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isHovered = hoveredCard === plan.name
          const pos = cardMousePos[plan.name] || { x: 0, y: 0 }

          return (
            <div
              key={plan.name}
              onMouseEnter={() => setHoveredCard(plan.name)}
              onMouseLeave={() => setHoveredCard(null)}
              onMouseMove={(e) => handleCardMouseMove(plan.name, e)}
              className={`relative flex flex-col p-7 sm:p-8 rounded-2xl border transition-all duration-300 overflow-hidden ${
                plan.popular
                  ? 'border-[var(--accent)] bg-[var(--card)] shadow-2xl ring-1 ring-[var(--accent)]/40 hover:shadow-[0_0_35px_rgba(223,116,56,0.25)]'
                  : 'border-[var(--border)] bg-[var(--card)] hover:border-[var(--border-light)] hover:shadow-xl'
              }`}
            >
              {/* Interactive Mouse Spotlight on Card */}
              {isHovered && (
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                  style={{
                    background: `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, rgba(223, 116, 56, 0.14), transparent 75%)`
                  }}
                />
              )}

              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[var(--accent)] text-white font-mono text-[10px] font-semibold uppercase tracking-wider shadow-md">
                  <Sparkles className="w-3 h-3" /> MOST POPULAR
                </div>
              )}

              <div className="relative z-10 mb-6">
                <h3 className="text-lg font-medium text-[var(--foreground)]">{plan.name}</h3>
                <p className="mt-1 text-xs text-[var(--muted-foreground)] leading-relaxed min-h-[36px]">
                  {plan.description}
                </p>
              </div>

              <div className="relative z-10 mb-6 pb-6 border-b border-[var(--border)]">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-normal font-mono tracking-tight text-[var(--foreground)]">
                    {plan.price}
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)]">/{plan.period}</span>
                </div>
              </div>

              <ul className="relative z-10 space-y-3 mb-8 flex-1 text-xs text-[var(--foreground)]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`relative z-10 w-full py-2.5 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer group overflow-hidden ${
                  plan.popular
                    ? 'bg-[var(--accent)] text-white hover:opacity-90 shadow-md shadow-[var(--accent)]/20'
                    : 'border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)] hover:border-[var(--border-light)]'
                }`}
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <span>{plan.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
