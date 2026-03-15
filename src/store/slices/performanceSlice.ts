import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PerformanceMetrics {
  fps: number | null; // frames per second (null until first reading)
  fcp: number | null; // First Contentful Paint (ms)
  lcp: number | null; // Largest Contentful Paint (ms)
  cls: number | null; // Cumulative Layout Shift
  loadTime: number | null; // total page load time (ms)
  bundleSize: string; // hardcoded bundle estimate
}

interface PerformanceState {
  metrics: PerformanceMetrics;
  isPanelOpen: boolean;
  isPanelMinimized: boolean;
}

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: PerformanceState = {
  metrics: {
    fps: null,
    fcp: null,
    lcp: null,
    cls: null,
    loadTime: null,
    bundleSize: "~272 kb gzipped",
  },
  isPanelOpen: false,
  isPanelMinimized: false,
};

const performanceSlice = createSlice({
  name: "performance",
  initialState,
  reducers: {
    updateMetrics(state, action: PayloadAction<Partial<PerformanceMetrics>>) {
      Object.assign(state.metrics, action.payload);
    },
    togglePanel(state) {
      state.isPanelOpen = !state.isPanelOpen;
    },
    minimizePanel(state) {
      state.isPanelMinimized = true;
    },
    restorePanel(state) {
      state.isPanelMinimized = false;
    },
  },
});

// ─── Actions ──────────────────────────────────────────────────────────────────

export const { updateMetrics, togglePanel, minimizePanel, restorePanel } =
  performanceSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectMetrics = (state: RootState) => state.performance.metrics;
export const selectIsPanelOpen = (state: RootState) =>
  state.performance.isPanelOpen;
export const selectIsPanelMinimized = (state: RootState) =>
  state.performance.isPanelMinimized;

export default performanceSlice.reducer;
