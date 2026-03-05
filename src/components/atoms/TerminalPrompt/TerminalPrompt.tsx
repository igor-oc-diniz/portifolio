// ─── TerminalPrompt ───────────────────────────────────────────────────────────
// Renders the coloured shell prompt:  igor@portfolio:~/portfolio$

export function TerminalPrompt() {
  return (
    <span className="font-mono text-sm select-none flex-shrink-0" aria-hidden="true">
      <span className="text-[#3FB950]">igor</span>
      <span className="text-[#C9D1D9]">@</span>
      <span className="text-[#79C0FF]">portfolio</span>
      <span className="text-[#C9D1D9]">:</span>
      <span className="text-[#D2A8FF]">~/portfolio</span>
      <span className="text-[#C9D1D9]">$ </span>
    </span>
  )
}
