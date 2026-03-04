import { useEffect, useRef, useState } from 'react'

type Phase = 'typing' | 'pausing' | 'deleting'

interface TypewriterConfig {
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

interface TypewriterResult {
  displayText: string
  currentTitleIndex: number
}

export function useTypewriter(
  titles: string[],
  config: TypewriterConfig = {}
): TypewriterResult {
  const { typingSpeed = 60, deletingSpeed = 35, pauseDuration = 2000 } = config

  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState(reducedMotion ? (titles[0] ?? '') : '')
  const [phase, setPhase] = useState<Phase>('typing')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const clear = () => {
      if (timeoutRef.current !== undefined) clearTimeout(timeoutRef.current)
    }

    // Reduced motion: cycle titles without character animation
    if (reducedMotion) {
      timeoutRef.current = setTimeout(() => {
        setIndex((previousIndex) => {
          const nextIndex = (previousIndex + 1) % titles.length
          setDisplayText(titles[nextIndex])
          return nextIndex
        })
      }, pauseDuration)
      return clear
    }

    const currentTitle = titles[index]

    if (phase === 'typing') {
      if (displayText.length < currentTitle.length) {
        timeoutRef.current = setTimeout(
          () => setDisplayText(currentTitle.slice(0, displayText.length + 1)),
          typingSpeed
        )
      } else {
        timeoutRef.current = setTimeout(() => setPhase('pausing'), 0)
      }
    } else if (phase === 'pausing') {
      timeoutRef.current = setTimeout(() => setPhase('deleting'), pauseDuration)
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(
          () => setDisplayText((currentText) => currentText.slice(0, -1)),
          deletingSpeed
        )
      } else {
        setIndex((previousIndex) => (previousIndex + 1) % titles.length)
        setPhase('typing')
      }
    }

    return clear
    // titles is a stable module-level constant in our usage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayText, phase, index, reducedMotion, typingSpeed, deletingSpeed, pauseDuration])

  return { displayText, currentTitleIndex: index }
}
