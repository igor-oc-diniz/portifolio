import type { ReactNode } from 'react'
import { cn } from '../../../lib/utils'
import type { OutputLine } from '../../../data/commands'

// ─── TerminalOutputLine ───────────────────────────────────────────────────────
// Renders a single terminal output line with the correct colour for its type.

interface TerminalOutputLineProps {
  line: OutputLine
}

const TYPE_CLASS: Record<string, string> = {
  text:      'text-[#C9D1D9]',
  highlight: 'text-[#79C0FF]',
  accent:    'text-[#3FB950]',
  error:     'text-[#F85149]',
  success:   'text-[#3FB950] font-medium',
  separator: 'text-[#30363D]',
  jsx:       'text-[#C9D1D9]',
}

export function TerminalOutputLine({ line }: TerminalOutputLineProps) {
  return (
    <div
      className={cn(
        'font-mono text-sm leading-relaxed whitespace-pre-wrap break-words',
        TYPE_CLASS[line.type] ?? 'text-[#C9D1D9]',
      )}
    >
      {line.content as ReactNode}
    </div>
  )
}
