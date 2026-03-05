import { useRef, useCallback } from 'react'
import type { OutputLine } from '../data/commands'

// ─── Constants ────────────────────────────────────────────────────────────────

const CHAR_DELAY = 10  // ms between characters  (text / highlight types)
const LINE_DELAY = 40  // ms between instant lines (all other types)

// ─── useTypewriterOutput ──────────────────────────────────────────────────────
// Drives character-by-character animation of terminal output lines.
//
// • "text" and "highlight" lines animate char-by-char at CHAR_DELAY.
// • All other types (accent, error, success, separator, jsx) appear instantly.
// • Lines can opt into a custom delay via `line.delay`.
// • animIdRef lets us cancel a stale animation when a new one starts.
// • Respects prefers-reduced-motion: skips animation entirely.

export function useTypewriterOutput() {
  const animIdRef = useRef(0)

  const animate = useCallback(
    (
      lines:      OutputLine[],
      onProgress: (visible: OutputLine[]) => void,
      onComplete: () => void,
    ) => {
      const id = ++animIdRef.current

      // ── Reduced motion: show everything immediately ───────────────────────
      const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reducedMotion) {
        onProgress([...lines])
        onComplete()
        return
      }

      // ── Animated path ─────────────────────────────────────────────────────
      const visible: OutputLine[] = []
      let lineIndex = 0

      function processNextLine() {
        if (animIdRef.current !== id) return       // stale — a new animation started
        if (lineIndex >= lines.length) {
          onComplete()
          return
        }

        const line = lines[lineIndex++]

        // Only string-typed "text" and "highlight" lines get the typewriter effect
        const isTyped =
          (line.type === 'text' || line.type === 'highlight') &&
          typeof line.content === 'string'

        if (!isTyped) {
          // Instant line
          visible.push(line)
          onProgress([...visible])
          setTimeout(processNextLine, line.delay ?? LINE_DELAY)
          return
        }

        // Character-by-character
        const full   = line.content as string
        let   charIdx = 0
        const slot    = visible.length  // index we'll update in place
        visible.push({ ...line, content: '' })

        function typeNextChar() {
          if (animIdRef.current !== id) return
          if (charIdx >= full.length) {
            setTimeout(processNextLine, line.delay ?? LINE_DELAY)
            return
          }
          visible[slot] = { ...line, content: full.slice(0, ++charIdx) }
          onProgress([...visible])
          setTimeout(typeNextChar, CHAR_DELAY)
        }

        typeNextChar()
      }

      processNextLine()
    },
    [],
  )

  /** Cancel any running animation (increments the animId so callbacks bail). */
  const cancel = useCallback(() => {
    animIdRef.current++
  }, [])

  return { animate, cancel }
}
