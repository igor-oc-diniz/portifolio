import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "../../atoms/Icon/Icon";
import { TimelineDot } from "../../atoms/TimelineDot/TimelineDot";
import { ExperienceHeader } from "../../molecules/ExperienceHeader/ExperienceHeader";
import { ExperienceMetrics } from "../../molecules/ExperienceMetrics/ExperienceMetrics";
import { ExperienceStack } from "../../molecules/ExperienceStack/ExperienceStack";
import { useExpandable } from "../../../hooks/useExpandable";
import { cn } from "../../../lib/utils";
import type { ExperienceEntry } from "../../../data/experience";

const URL_RE = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

function linkify(text: string) {
  // split() with a capturing group includes the captured parts at odd indices
  return text.split(URL_RE).map((part, i) =>
    i % 2 === 1 ? (
      <a
        key={i}
        href={part.startsWith("http") ? part : `https://${part}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-primary hover:underline"
        onClick={(e) => e.stopPropagation()}
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

interface ExperienceCardProps {
  entry: ExperienceEntry;
  index: number;
}

export function ExperienceCard({ entry, index }: ExperienceCardProps) {
  const { isOpen, toggle } = useExpandable(entry.id);

  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    // Outer layout wrapper for filter transitions
    <motion.div layout className="relative">
      {/* Timeline dot — absolutely positioned to align with the left connector */}
      <div className="absolute -left-[33px] top-[22px] z-10">
        <TimelineDot active={isOpen} highlight={entry.highlight} />
      </div>

      {/* Scroll-triggered entrance */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {/* Card shell */}
        <div
          className={cn(
            "rounded-xl border backdrop-blur-sm bg-bg-elevated/50 overflow-hidden",
            entry.highlight
              ? "border-accent-primary/40 shadow-lg shadow-accent-primary/10"
              : "border-border hover:border-border",
          )}
        >
          <ExperienceHeader entry={entry} isOpen={isOpen} onToggle={toggle} />

          {/* Expandable body */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id={`experience-body-${entry.id}`}
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.35,
                  ease: "easeInOut",
                }}
                style={{ overflow: "hidden" }}
              >
                <div className="px-5 pb-6 space-y-6 border-t border-border/60">
                  {/* Description */}
                  <div className="pt-4 space-y-2">
                    {entry.description.map((description, i) => (
                      <p
                        key={i}
                        className="text-sm text-text-secondary leading-relaxed"
                      >
                        {linkify(description)}
                      </p>
                    ))}
                  </div>

                  {/* Metrics */}
                  <ExperienceMetrics metrics={entry.metrics} />

                  {/* Achievements */}
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wider font-medium mb-3">
                      Achievements
                    </p>
                    <ul className="space-y-2">
                      {entry.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm text-text-secondary"
                        >
                          <Icon
                            name="CircleCheck"
                            size={16}
                            className="text-accent-primary shrink-0 mt-0.5"
                          />
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack */}
                  <ExperienceStack stack={entry.stack} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
