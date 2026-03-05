import type { RefObject } from 'react'
import { TerminalPrompt } from '../../atoms/TerminalPrompt/TerminalPrompt'
import { TerminalCursor } from '../../atoms/TerminalCursor/TerminalCursor'

// ─── TerminalInput ────────────────────────────────────────────────────────────
// Invisible real <input> overlaid on a mirrored visual display.
// The real input is fully transparent (opacity-0) but captures all keyboard
// events — the mirrored <span> + <TerminalCursor> show what the user typed.

interface TerminalInputProps {
  value:       string
  onChange:    (v: string) => void
  onKeyDown:   (e: React.KeyboardEvent<HTMLInputElement>) => void
  inputRef:    RefObject<HTMLInputElement | null>
  isAnimating: boolean
}

export function TerminalInput({
  value,
  onChange,
  onKeyDown,
  inputRef,
  isAnimating,
}: TerminalInputProps) {
  return (
    <div className="relative flex items-center font-mono text-sm text-[#C9D1D9] min-h-[1.5rem] py-0.5">
      <TerminalPrompt />

      {/* Visual display of current input + cursor */}
      <span className="relative inline-flex items-center min-w-0">
        <span className="whitespace-pre">{value}</span>
        {!isAnimating && <TerminalCursor />}
      </span>

      {/* Transparent real input — captures events, never visible */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={isAnimating}
        className="absolute inset-0 opacity-0 w-full h-full cursor-text caret-transparent"
        aria-label="Terminal input"
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  )
}
