import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GradientText } from '../../atoms/GradientText/GradientText'
import { TimelineConnector } from '../../molecules/TimelineConnector/TimelineConnector'
import { ExperienceCard } from '../ExperienceCard/ExperienceCard'
import { experiences, FILTER_TAGS } from '../../../data/experience'
import type { FilterTag } from '../../../data/experience'
import { cn } from '../../../lib/utils'

export function ExperienceSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>('All')

  const filtered =
    activeFilter === 'All'
      ? experiences
      : experiences.filter((e) => e.tags.includes(activeFilter))

  return (
    <section
      id="experience"
      className="py-24 bg-bg-secondary/30"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-container mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2
            id="experience-heading"
            className="text-3xl md:text-4xl font-bold text-text-primary mb-2"
          >
            <GradientText>Professional</GradientText> Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-aurora1 rounded-full mx-auto mt-2 mb-4" />
          <p className="text-text-secondary max-w-xl mx-auto">
            7+ years building high-impact digital products.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true, margin: '-100px' }}
          role="group"
          aria-label="Filter experience by area"
        >
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              aria-pressed={activeFilter === tag}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium border transition-colors',
                activeFilter === tag
                  ? 'bg-accent-primary text-white border-accent-primary'
                  : 'text-text-secondary border-border hover:border-accent-primary/50 hover:text-text-primary bg-transparent'
              )}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-12">
          <TimelineConnector />

          <AnimatePresence mode="popLayout">
            <motion.div className="space-y-6" layout>
              {filtered.map((entry, i) => (
                <ExperienceCard key={entry.id} entry={entry} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-text-secondary text-center py-12"
            >
              No experience found for this filter.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
