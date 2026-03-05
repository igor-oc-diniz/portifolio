import { ExperienceSection } from '../../organisms/ExperienceSection/ExperienceSection'
import { cn } from '../../../lib/utils'

export function Experience() {
  return <ExperienceSection />
}

interface SkeletonExperienceProps {
  className?: string
}

export function SkeletonExperience({ className }: SkeletonExperienceProps) {
  return (
    <section
      className={cn('py-24 bg-bg-secondary/30', className)}
      aria-busy="true"
      aria-label="Loading experience section"
    >
      <div className="animate-pulse max-w-container mx-auto px-6">
        {/* Section title */}
        <div className="text-center mb-12 space-y-3">
          <div className="h-10 w-72 bg-bg-elevated rounded-lg mx-auto" />
          <div className="h-4 w-56 bg-bg-elevated rounded-md mx-auto" />
        </div>

        {/* Filter pills */}
        <div className="flex justify-center gap-2 mb-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-20 bg-bg-elevated rounded-full" />
          ))}
        </div>

        {/* Timeline */}
        <div className="relative pl-12">
          {/* Connector line */}
          <div className="absolute left-0 top-0 bottom-0 flex justify-center w-6">
            <div className="w-px h-full bg-bg-elevated" />
          </div>

          {/* Cards */}
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="relative">
                {/* Dot */}
                <div className="absolute -left-[33px] top-[22px] w-4 h-4 rounded-full bg-bg-elevated z-10" />
                {/* Card */}
                <div className="rounded-xl border border-border bg-bg-elevated/50 p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-bg-secondary shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-48 bg-bg-secondary rounded-md" />
                      <div className="h-4 w-36 bg-bg-secondary rounded-md" />
                      <div className="h-3 w-64 bg-bg-secondary rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
