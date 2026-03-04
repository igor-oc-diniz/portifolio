import type { OutputLine } from '../../../data/commands'
import { TerminalPrompt }     from '../../atoms/TerminalPrompt/TerminalPrompt'
import { TerminalOutputLine } from '../../atoms/TerminalOutputLine/TerminalOutputLine'

// ─── TerminalOutputBlock ──────────────────────────────────────────────────────
// Renders one terminal entry: an optional prompt + command line, followed by
// the output lines.
//
// When command === '' (e.g. the auto-run banner) the prompt line is omitted so
// the banner appears to float at the top of the session without a leading $-line.

interface TerminalOutputBlockProps {
  command: string        // what the user typed, or '' for auto-run entries
  lines:   OutputLine[]
}

export function TerminalOutputBlock({ command, lines }: TerminalOutputBlockProps) {
  return (
    <div className="mb-2">
      {/* Prompt + typed command (skip for auto-run entries like the banner) */}
      {command !== '' && (
        <div className="flex items-center font-mono text-sm text-[#C9D1D9]">
          <TerminalPrompt />
          <span>{command}</span>
        </div>
      )}

      {/* Output lines */}
      {lines.map((line, i) => (
        <TerminalOutputLine key={i} line={line} />
      ))}
    </div>
  )
}
