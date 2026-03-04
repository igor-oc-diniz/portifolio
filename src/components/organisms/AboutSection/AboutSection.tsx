import { motion } from 'framer-motion'
import { Icon } from '../../atoms/Icon/Icon'
import { GradientText } from '../../atoms/GradientText/GradientText'
import { profile } from '../../../data/profile'

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Subtle background blob */}
      <div
        className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-accent-aurora2/5 blur-3xl -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="relative">
              <div
                className="w-72 h-72 rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 20px 60px -10px var(--accent-primary)30' }}
              >
                {/* Profile photo placeholder — replace src with real image */}
                <div className="w-full h-full bg-gradient-to-br from-accent-primary/20 via-accent-aurora1/10 to-accent-aurora2/20 flex items-center justify-center border border-border rounded-2xl">
                  <Icon name="User" size={80} className="text-accent-primary/40" />
                </div>
              </div>

              {/* Availability badge */}
              {profile.available && (
                <div className="absolute -bottom-4 -right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-bg-elevated border border-border text-sm font-medium text-text-secondary shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  Open to opportunities
                </div>
              )}
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2
              id="about-heading"
              className="text-3xl md:text-4xl font-bold text-text-primary mb-2"
            >
              About <GradientText>Me</GradientText>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-aurora1 rounded-full mb-6" />

            <div className="space-y-4 text-text-secondary leading-relaxed mb-8">
              {profile.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Quick facts grid */}
            <div className="grid grid-cols-2 gap-3">
              {profile.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-bg-elevated/50 border border-border"
                >
                  <Icon name={fact.icon} size={16} className="text-accent-primary shrink-0" />
                  <span className="text-sm text-text-secondary">{fact.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
