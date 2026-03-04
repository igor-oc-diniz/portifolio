import { useTypewriter } from '../../../hooks/useTypewriter'
import { cn } from '../../../lib/utils'

interface TypewriterTextProps {
  titles: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export function TypewriterText({
  titles,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseDuration = 2000,
  className,
}: TypewriterTextProps) {
  const { displayText } = useTypewriter(titles, { typingSpeed, deletingSpeed, pauseDuration })

  return (
    <span className={cn('inline-flex items-center', className)}>
      <span aria-live="polite" aria-atomic="true">
        {displayText}
      </span>
      <span
        className="ml-0.5 inline-block w-px h-[1em] bg-current animate-pulse"
        aria-hidden="true"
      />
    </span>
  )
}
