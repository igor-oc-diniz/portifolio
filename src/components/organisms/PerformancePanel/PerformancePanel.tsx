import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  togglePanel,
  minimizePanel,
  selectIsPanelOpen,
  selectIsPanelMinimized,
  selectMetrics,
} from "../../../store/slices/performanceSlice";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { PerformancePanelHeader } from "../../molecules/PerformancePanelHeader/PerformancePanelHeader";
import { PerformanceMetric } from "../../molecules/PerformanceMetric/PerformanceMetric";

// ─── PerformancePanel ─────────────────────────────────────────────────────────
// Floating card in the bottom-left corner showing real-time runtime metrics.
// Auto-opens 2 s after load (first visit).
// Auto-minimizes on mobile.

export function PerformancePanel() {
  const dispatch = useAppDispatch();
  const isPanelOpen = useAppSelector(selectIsPanelOpen);
  const isMinimized = useAppSelector(selectIsPanelMinimized);
  const metrics = useAppSelector(selectMetrics);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Auto-open 2 s after mount
  useEffect(() => {
    const t = setTimeout(() => dispatch(togglePanel()), 2000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-minimize on mobile
  useEffect(() => {
    if (isMobile && isPanelOpen && !isMinimized) {
      dispatch(minimizePanel());
    }
  }, [isMobile, isPanelOpen, isMinimized, dispatch]);

  return (
    <div className="fixed bottom-6 left-6 z-50 w-56 md:w-64">
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            key="perf-panel"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="rounded-xl border border-border bg-bg-elevated/85 backdrop-blur-md shadow-2xl"
          >
            {/* Header (always visible) */}
            <PerformancePanelHeader />

            {/* Body — collapses when minimized */}
            <AnimatePresence initial={false}>
              {!isMinimized && (
                <motion.div
                  key="panel-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="px-4 pb-4 space-y-3">
                    {/* 2×2 grid: FPS, FCP, LCP, CLS */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                      <PerformanceMetric
                        label="FPS"
                        value={metrics.fps}
                        unit="fps"
                        good={55}
                        warn={30}
                        showBar
                        barMax={60}
                        colorScheme="fps"
                      />
                      <PerformanceMetric
                        label="FCP"
                        value={metrics.fcp}
                        unit="ms"
                        good={1800}
                        warn={3000}
                        showBar
                        barMax={3000}
                      />
                      <PerformanceMetric
                        label="LCP"
                        value={metrics.lcp}
                        unit="ms"
                        good={2500}
                        warn={4000}
                        showBar
                        barMax={4000}
                      />
                      <PerformanceMetric
                        label="CLS"
                        value={metrics.cls}
                        good={0.1}
                        warn={0.25}
                      />
                    </div>

                    {/* Load time — full width */}
                    <PerformanceMetric
                      label="Load"
                      value={metrics.loadTime}
                      unit="ms"
                      good={2000}
                      warn={4000}
                    />

                    {/* Bundle size */}
                    <div className="border-t border-border/50 pt-2.5">
                      <p className="text-[10px] text-text-secondary">
                        Bundle:{" "}
                        <span className="text-text-primary font-medium">
                          {metrics.bundleSize}
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
