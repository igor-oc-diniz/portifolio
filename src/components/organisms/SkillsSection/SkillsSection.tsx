import { motion } from 'framer-motion'
import { GradientText } from '../../atoms/GradientText/GradientText'
import { SkillGroup } from '../../molecules/SkillGroup/SkillGroup'
import { skillCategories } from '../../../data/skills'

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24 bg-bg-secondary/30"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2
            id="skills-heading"
            className="text-3xl md:text-4xl font-bold text-text-primary mb-2"
          >
            <GradientText>Skills</GradientText> &amp; Tecnologias
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-primary to-accent-aurora1 rounded-full mx-auto mt-2 mb-4" />
          <p className="text-text-secondary max-w-xl mx-auto">
            Stack técnica que uso para criar produtos digitais de alto impacto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <SkillGroup key={category.label} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
