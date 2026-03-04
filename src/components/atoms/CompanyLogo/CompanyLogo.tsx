import { cn } from '../../../lib/utils'

interface CompanyLogoProps {
  name: string
  src?: string
  size?: 'sm' | 'md'
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
}

export function CompanyLogo({ name, src, size = 'md' }: CompanyLogoProps) {
  const initials = name.slice(0, 2).toUpperCase()

  return (
    <div
      className={cn(
        'rounded-xl border border-border flex items-center justify-center shrink-0 overflow-hidden',
        sizeClasses[size]
      )}
    >
      {src ? (
        <img
          src={src}
          alt={`${name} logo`}
          className="w-full h-full object-contain p-1"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-accent-primary/20 font-bold text-accent-primary select-none">
          {initials}
        </div>
      )}
    </div>
  )
}
