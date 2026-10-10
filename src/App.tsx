import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { AgentPlayground } from './components/AgentPlayground'
import { PillarsTriad } from './components/PillarsTriad'
import { MetricsAndLogos } from './components/MetricsAndLogos'
import { SdkShowcase } from './components/SdkShowcase'
import { RunJourney } from './components/RunJourney'
import { WorkspaceExplorer } from './components/WorkspaceExplorer'
import { UseCases } from './components/UseCases'
import { ControlExecution } from './components/ControlExecution'
import { Pricing } from './components/Pricing'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { SpotlightCursor } from './components/SpotlightCursor'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)]/30 selection:text-[var(--accent-ink)] transition-colors duration-200">
      <SpotlightCursor />
      <span id="top" />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <AgentPlayground />
        <PillarsTriad />
        <MetricsAndLogos />
        <SdkShowcase />
        <RunJourney />
        <WorkspaceExplorer />
        <UseCases />
        <ControlExecution />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  )
}
