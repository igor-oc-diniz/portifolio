import { cn } from '../../../lib/utils'

type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'label'
type TextVariant = 'heading' | 'subheading' | 'body' | 'caption' | 'mono'
type TextColor = 'primary' | 'secondary' | 'accent'

export interface TextProps {
  as?: TextElement
  variant?: TextVariant
  color?: TextColor
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<TextVariant, string> = {
  heading:    'font-bold leading-tight tracking-tight text-4xl',
  subheading: 'font-semibold leading-snug text-xl',
  body:       'font-normal leading-relaxed text-base',
  caption:    'font-normal leading-normal text-sm',
  mono:       'font-mono text-sm leading-relaxed',
}

const colorClasses: Record<TextColor, string> = {
  primary:   'text-text-primary',
  secondary: 'text-text-secondary',
  accent:    'text-accent-primary',
}

export function Text({
  as: Tag = 'p',
  variant = 'body',
  color = 'primary',
  children,
  className,
}: TextProps) {
  return (
    <Tag className={cn(variantClasses[variant], colorClasses[color], className)}>
      {children}
    </Tag>
  )
}
