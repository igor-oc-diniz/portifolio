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

function parseBold(text: string): ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1
      ? <strong key={i} className="text-[#79C0FF] font-semibold">{part}</strong>
      : part,
  )
}

export function TerminalOutputLine({ line }: TerminalOutputLineProps) {
  const content = typeof line.content === 'string'
    ? parseBold(line.content)
    : line.content as ReactNode

  return (
    <div
      className={cn(
        'font-mono text-sm leading-relaxed whitespace-pre-wrap break-words',
        TYPE_CLASS[line.type] ?? 'text-[#C9D1D9]',
      )}
    >
      {content}
    </div>
  )
}
