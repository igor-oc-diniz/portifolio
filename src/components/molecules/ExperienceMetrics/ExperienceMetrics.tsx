import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { MetricChip } from "../../atoms/MetricChip/MetricChip";
import type { Metric } from "../../../data/experience";

interface ExperienceMetricsProps {
  metrics: Metric[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function ExperienceMetrics({ metrics }: ExperienceMetricsProps) {
  return (
    <div>
      <p className="text-xs text-text-secondary uppercase tracking-wider font-medium mb-3">
        Impact
      </p>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {metrics.map((metric) => (
          <motion.div key={metric.label} variants={itemVariants}>
            <MetricChip
              label={metric.label}
              value={metric.value}
              icon={metric.icon}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
