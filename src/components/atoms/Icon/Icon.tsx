import { icons } from 'lucide-react'
import { cn } from '../../../lib/utils'

export type LucideIconName = keyof typeof icons

export interface IconProps {
  name: LucideIconName
  size?: number
  className?: string
  'aria-hidden'?: boolean
}

export function Icon({ name, size = 20, className, 'aria-hidden': ariaHidden = true }: IconProps) {
  const LucideIcon = icons[name]
  if (!LucideIcon) return null

  return (
    <LucideIcon
      size={size}
      className={cn('shrink-0', className)}
      aria-hidden={ariaHidden}
    />
  )
}
