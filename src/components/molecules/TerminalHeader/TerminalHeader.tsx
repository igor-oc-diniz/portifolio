import { useAppDispatch } from "../../../store/hooks";
import { toggleTerminal } from "../../../store/slices/terminalSlice";

// ─── TerminalHeader ───────────────────────────────────────────────────────────
// macOS-style window chrome: traffic-light buttons + centered title bar.
// Clicking the red dot dispatches toggleTerminal() to hide the terminal.

export function TerminalHeader() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-[#161B22] border-b border-[#30363D] flex-shrink-0 select-none">
      {/* ── Traffic lights ───────────────────────────────────────────────── */}
      <button
        className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5F57]"
        onClick={() => dispatch(toggleTerminal())}
        aria-label="Close terminal"
        title="Close"
      />
      <button
        className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FFBD2E]"
        aria-label="Minimize terminal (decorative)"
        title="Minimize"
        tabIndex={-1}
      />
      <button
        className="w-3 h-3 rounded-full bg-[#27C840] hover:bg-[#27C840]/80 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#27C840]"
        aria-label="Maximize terminal (decorative)"
        title="Maximize"
        tabIndex={-1}
      />

      {/* ── Title ────────────────────────────────────────────────────────── */}
      <span className="flex-1 text-center text-xs text-[#6E7681] font-mono pointer-events-none">
        igor@portfolio: ~/portfolio
      </span>

      {/* Spacer to keep title visually centred */}
      <span className="w-[3.25rem]" aria-hidden="true" />
    </div>
  );
}
