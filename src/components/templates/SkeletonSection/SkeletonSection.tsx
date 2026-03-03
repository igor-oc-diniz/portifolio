import { cn } from '../../../lib/utils'

interface SkeletonSectionProps {
  className?: string
}

export function SkeletonSection({ className }: SkeletonSectionProps) {
  return (
    <section
      className={cn('py-24 max-w-container mx-auto px-6', className)}
      aria-busy="true"
      aria-label="Loading section"
    >
      <div className="animate-pulse space-y-6">
        {/* Heading placeholder */}
        <div className="h-8 w-48 rounded-lg bg-bg-elevated" />
        {/* Subheading placeholder */}
        <div className="h-4 w-80 rounded-md bg-bg-elevated" />
        {/* Card grid placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 rounded-xl bg-bg-elevated" />
          ))}
        </div>
      </div>
    </section>
  )
}
