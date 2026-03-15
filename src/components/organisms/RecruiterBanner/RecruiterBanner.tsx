import { Icon } from "../../atoms/Icon/Icon";
import { useRecruiterMode } from "../../../hooks/useRecruiterMode";

// ─── RecruiterBanner ──────────────────────────────────────────────────────────
// Accent stripe rendered at the very top of the content area when Recruiter Mode
// is active — just below the sticky Header.
// Animation is handled by the parent PageOrchestrator (AnimatePresence wrapper).

export function RecruiterBanner() {
  const { deactivate } = useRecruiterMode();

  return (
    <div className="w-full border-b border-accent-primary/40 bg-gradient-to-r from-accent-primary/10 via-accent-primary/5 to-transparent">
      <div className="max-w-container mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
        <p className="text-sm text-text-primary">
          👋 Hi, recruiter! This view has been optimized for you — most relevant
          info is at the top.
        </p>
        <button
          onClick={deactivate}
          className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary rounded"
          aria-label="Deactivate Recruiter Mode"
        >
          <Icon name="X" size={13} />
          Deactivate
        </button>
      </div>
    </div>
  );
}
