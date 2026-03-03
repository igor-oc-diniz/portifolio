import { motion } from 'framer-motion'
import { cn } from '../../../lib/utils'
import type { ButtonProps } from './Button.types'

const variantClasses = {
  primary:
    'bg-accent-primary text-white hover:opacity-90',
  secondary:
    'bg-bg-elevated text-text-primary hover:bg-bg-secondary border border-border',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-elevated',
  outline:
    'bg-transparent border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2.5',
}

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    />
  </svg>
)

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  href,
  children,
  onClick,
  disabled,
  className,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading

  const classes = cn(
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
    variantClasses[variant],
    sizeClasses[size],
    isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )

  const content = loading ? (
    <>
      <Spinner />
      <span>{children}</span>
    </>
  ) : (
    <>
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        aria-busy={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  )
}
