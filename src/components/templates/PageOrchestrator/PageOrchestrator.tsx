import type { ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useSectionOrder } from "../../../hooks/useSectionOrder";
import { useAppSelector } from "../../../store/hooks";
import { selectIsRecruiterActive } from "../../../store/slices/recruiterSlice";
import { RecruiterBanner } from "../../organisms/RecruiterBanner/RecruiterBanner";
import type { SectionId } from "../../../store/slices/recruiterSlice";

// ─── PageOrchestrator ─────────────────────────────────────────────────────────
// Controls section rendering order based on the active mode (default / recruiter).
// Each section is wrapped in a motion.div with a stable layoutId so Framer Motion
// can animate reordering smoothly.

interface PageOrchestratorProps {
  sections: Record<SectionId, ReactNode>;
}

const reducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const TRANSITION = reducedMotion
  ? { duration: 0 }
  : { duration: 0.5, ease: "easeInOut" as const };

export function PageOrchestrator({ sections }: PageOrchestratorProps) {
  const order = useSectionOrder();
  const isRecruiterActive = useAppSelector(selectIsRecruiterActive);

  return (
    <LayoutGroup>
      {/* Recruiter banner — slides in above all sections */}
      <AnimatePresence>
        {isRecruiterActive && (
          <motion.div
            key="recruiter-banner"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.3, ease: "easeInOut" }
            }
            style={{ overflow: "hidden", paddingTop: 28 }}
          >
            <RecruiterBanner />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sections in dynamic order */}
      {order.map((id) => (
        <motion.div key={id} layoutId={id} layout transition={TRANSITION}>
          {sections[id]}
        </motion.div>
      ))}
    </LayoutGroup>
  );
}
