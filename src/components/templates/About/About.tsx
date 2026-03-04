import { AboutSection } from '../../organisms/AboutSection/AboutSection'
import { cn } from '../../../lib/utils'

export function About() {
  return <AboutSection />
}

interface SkeletonAboutProps {
  className?: string
}

export function SkeletonAbout({ className }: SkeletonAboutProps) {
  return (
    <section
      className={cn('py-24 max-w-container mx-auto px-6', className)}
      aria-busy="true"
      aria-label="Loading about section"
    >
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Photo placeholder */}
        <div className="flex justify-center md:justify-start">
          <div className="w-72 h-72 rounded-2xl bg-bg-elevated" />
        </div>

        {/* Text placeholder */}
        <div className="space-y-4">
          <div className="h-10 w-48 bg-bg-elevated rounded-lg" />
          <div className="h-1 w-16 bg-bg-elevated rounded-full" />
          <div className="space-y-3 pt-2">
            <div className="h-4 w-full bg-bg-elevated rounded-md" />
            <div className="h-4 w-5/6 bg-bg-elevated rounded-md" />
            <div className="h-4 w-full bg-bg-elevated rounded-md" />
            <div className="h-4 w-4/5 bg-bg-elevated rounded-md" />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-12 bg-bg-elevated rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
