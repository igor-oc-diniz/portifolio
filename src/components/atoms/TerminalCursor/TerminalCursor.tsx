import { cn } from '../../../lib/utils'

// ─── TerminalCursor ───────────────────────────────────────────────────────────
// Renders a blinking block cursor (│).
// While isAnimating the blink is paused so the cursor stays solid — giving a
// visual cue that output is still being typed.

interface TerminalCursorProps {
  isAnimating?: boolean
  className?:   string
}

export function TerminalCursor({ isAnimating = false, className }: TerminalCursorProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block w-[0.55em] h-[1.1em] bg-[#3FB950] align-middle ml-px',
        isAnimating ? 'opacity-100' : 'terminal-cursor-blink',
        className,
      )}
    />
  )
}
