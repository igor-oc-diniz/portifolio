import { MetricValue } from "../../atoms/MetricValue/MetricValue";
import { PerformanceBar } from "../../atoms/PerformanceBar/PerformanceBar";

// ─── PerformanceMetric ────────────────────────────────────────────────────────
// Label + animated numeric value + optional progress bar.
// Used for each row inside the PerformancePanel.

interface PerformanceMetricProps {
  label: string;
  value: number | null;
  unit?: string;
  good?: number;
  warn?: number;
  showBar?: boolean;
  barMax?: number; // maximum raw value for bar normalization
  colorScheme?: "score" | "fps";
}

export function PerformanceMetric({
  label,
  value,
  unit,
  good,
  warn,
  showBar = false,
  barMax = 100,
  colorScheme = "score",
}: PerformanceMetricProps) {
  const normalized = value !== null ? Math.min(100, (value / barMax) * 100) : 0;

  return (
    <div className="relative group space-y-0.5">
      <p className="text-[10px] text-text-secondary uppercase tracking-wider font-medium">
        {label}
      </p>
      <MetricValue value={value} unit={unit} good={good} warn={warn} />
      {showBar && value !== null && (
        <div className="pt-0.5">
          <PerformanceBar value={normalized} colorScheme={colorScheme} />
        </div>
      )}
    </div>
  );
}
