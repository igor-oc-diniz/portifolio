import { motion } from 'framer-motion'
import { GradientText } from '../../atoms/GradientText/GradientText'
import { Terminal }     from '../../organisms/Terminal/Terminal'

// ─── TerminalSection ──────────────────────────────────────────────────────────
// Page section wrapping the interactive terminal.

export function TerminalSection() {
  return (
    <section
      id="terminal"
      className="py-24 bg-bg-primary"
      aria-labelledby="terminal-heading"
    >
      <div className="max-w-container mx-auto px-6">
        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2
            id="terminal-heading"
            className="text-3xl md:text-4xl font-bold text-text-primary mb-2"
          >
            <GradientText>Interactive</GradientText> Terminal
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-aurora1 rounded-full mx-auto mt-2 mb-4" />
          <p className="text-text-secondary max-w-xl mx-auto">
            Explore my profile like a developer — type{' '}
            <code className="text-[#3FB950] bg-[#161B22] px-1.5 py-0.5 rounded text-sm font-mono">
              help
            </code>{' '}
            to get started.
          </p>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  )
}

// ─── SkeletonTerminal ─────────────────────────────────────────────────────────
// Suspense fallback shown while the TerminalSection chunk is loading.

export function SkeletonTerminal() {
  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-container mx-auto px-6">
        <div className="text-center mb-10">
          <div className="h-9 w-72 bg-bg-elevated rounded-lg mx-auto animate-pulse" />
          <div className="w-16 h-1 bg-bg-elevated rounded-full mx-auto mt-4 mb-4" />
          <div className="h-5 w-96 bg-bg-elevated rounded mx-auto animate-pulse" />
        </div>
        <div className="w-full rounded-xl h-[520px] bg-[#0D1117] border border-[#30363D] animate-pulse" />
      </div>
    </section>
  )
}
