export interface BadgeProps {
  variant?: 'default' | 'accent' | 'success' | 'warning'
  size?: 'sm' | 'md'
  children: React.ReactNode
  className?: string
}
