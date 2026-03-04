import { motion } from 'framer-motion'
import { GradientText } from '../../atoms/GradientText/GradientText'
import { ContactLink } from '../../molecules/ContactLink/ContactLink'
import { Button } from '../../atoms/Button/Button'
import { contactLinks } from '../../../data/contact'

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export function ContactSection() {
  const linkedIn = contactLinks.find((link) => link.label === 'LinkedIn')

  return (
    <section
      id="contact"
      className="py-24"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold mb-4">
            <GradientText animated>Let's Talk?</GradientText>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
            I'm actively seeking opportunities as Senior Software Engineer or Tech Lead.
            If you're looking for someone with solid experience in mobile and web — let's talk!
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto"
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {contactLinks.map((link) => (
            <motion.div key={link.label} variants={itemVariants}>
              <ContactLink {...link} />
            </motion.div>
          ))}
        </motion.div>

        {linkedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Button
              variant="primary"
              size="lg"
              href={linkedIn.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
