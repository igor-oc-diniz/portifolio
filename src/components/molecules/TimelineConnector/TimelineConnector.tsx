import { motion } from 'framer-motion'

export function TimelineConnector() {
  return (
    <div
      className="absolute left-0 top-0 bottom-0 flex justify-center w-6"
      aria-hidden="true"
    >
      <motion.div
        className="w-px bg-gradient-to-b from-accent-primary via-accent-aurora1 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ transformOrigin: 'top', height: '100%' }}
      />
    </div>
  )
}
