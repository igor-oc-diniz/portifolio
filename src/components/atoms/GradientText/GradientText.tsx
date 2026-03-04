import { cn } from '../../../lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  animated?: boolean
}

export function GradientText({ children, className, animated = false }: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-accent-aurora1 to-accent-aurora2',
        animated && 'animate-gradient-shift',
        className
      )}
      style={animated ? { backgroundSize: '200% auto' } : undefined}
    >
      {children}
    </span>
  )
}
