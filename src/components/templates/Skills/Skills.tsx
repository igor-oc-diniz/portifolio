import { SkillsSection } from '../../organisms/SkillsSection/SkillsSection'
import { cn } from '../../../lib/utils'

export function Skills() {
  return <SkillsSection />
}

interface SkeletonSkillsProps {
  className?: string
}

export function SkeletonSkills({ className }: SkeletonSkillsProps) {
  return (
    <section
      className={cn('py-24 bg-bg-secondary/30', className)}
      aria-busy="true"
      aria-label="Loading skills section"
    >
      <div className="animate-pulse max-w-container mx-auto px-6">
        <div className="text-center mb-12 space-y-3">
          <div className="h-10 w-72 bg-bg-elevated rounded-lg mx-auto" />
          <div className="h-4 w-96 bg-bg-elevated rounded-md mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-5 rounded-xl border border-border bg-bg-elevated/50 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-bg-secondary" />
                <div className="h-4 w-20 bg-bg-secondary rounded-md" />
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="h-6 w-16 bg-bg-secondary rounded-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
