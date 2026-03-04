import { ContactSection } from '../../organisms/ContactSection/ContactSection'
import { cn } from '../../../lib/utils'

export function Contact() {
  return <ContactSection />
}

interface SkeletonContactProps {
  className?: string
}

export function SkeletonContact({ className }: SkeletonContactProps) {
  return (
    <section
      className={cn('py-24', className)}
      aria-busy="true"
      aria-label="Loading contact section"
    >
      <div className="animate-pulse max-w-container mx-auto px-6 text-center space-y-10">
        <div className="space-y-4">
          <div className="h-12 w-80 bg-bg-elevated rounded-xl mx-auto" />
          <div className="h-4 w-2/3 bg-bg-elevated rounded-md mx-auto" />
          <div className="h-4 w-1/2 bg-bg-elevated rounded-md mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="p-6 rounded-xl border border-border bg-bg-elevated/50 space-y-3">
              <div className="w-12 h-12 rounded-full bg-bg-secondary mx-auto" />
              <div className="h-4 w-20 bg-bg-secondary rounded-md mx-auto" />
              <div className="h-3 w-28 bg-bg-secondary rounded-md mx-auto" />
            </div>
          ))}
        </div>
        <div className="h-12 w-52 bg-bg-elevated rounded-lg mx-auto" />
      </div>
    </section>
  )
}
