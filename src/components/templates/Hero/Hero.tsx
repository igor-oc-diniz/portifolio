import { HeroSection } from '../../organisms/HeroSection/HeroSection'
import { cn } from '../../../lib/utils'

export function Hero() {
  return <HeroSection />
}

interface SkeletonHeroProps {
  className?: string
}

export function SkeletonHero({ className }: SkeletonHeroProps) {
  return (
    <section
      className={cn(
        'min-h-screen flex flex-col items-center justify-center px-6',
        className
      )}
      aria-busy="true"
      aria-label="Loading hero section"
    >
      <div className="animate-pulse max-w-container w-full text-center space-y-6">
        <div className="h-5 w-32 bg-bg-elevated rounded-full mx-auto" />
        <div className="h-16 md:h-20 w-4/5 bg-bg-elevated rounded-xl mx-auto" />
        <div className="h-10 w-64 bg-bg-elevated rounded-lg mx-auto" />
        <div className="h-4 w-2/3 bg-bg-elevated rounded-md mx-auto" />
        <div className="h-4 w-1/2 bg-bg-elevated rounded-md mx-auto" />
        <div className="flex gap-4 justify-center pt-2">
          <div className="h-12 w-44 bg-bg-elevated rounded-lg" />
          <div className="h-12 w-44 bg-bg-elevated rounded-lg" />
        </div>
        <div className="h-8 w-32 bg-bg-elevated rounded-full mx-auto" />
      </div>
    </section>
  )
}
