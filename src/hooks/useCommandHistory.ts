import { useRef, useCallback } from 'react'

const MAX_HISTORY = 50

// ─── useCommandHistory ────────────────────────────────────────────────────────
// Keeps a list of previously entered commands (newest first) and lets the user
// navigate through them with ↑ / ↓.  The cursor is reset to -1 (current input)
// every time a new command is pushed.

export function useCommandHistory() {
  const history = useRef<string[]>([])
  const cursor  = useRef<number>(-1)  // -1 = at the live input line

  /** Push a successfully submitted command onto the history stack. */
  const push = useCallback((cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return
    // Skip consecutive duplicates
    if (history.current[0] === trimmed) return
    history.current = [trimmed, ...history.current].slice(0, MAX_HISTORY)
    cursor.current  = -1
  }, [])

  /** ↑ — step backwards through history.  Returns the entry to display. */
  const prev = useCallback((current: string): string => {
    if (history.current.length === 0) return current
    const next = cursor.current + 1
    if (next >= history.current.length) return history.current[history.current.length - 1]
    cursor.current = next
    return history.current[cursor.current]
  }, [])

  /** ↓ — step forward through history.  Returns '' when we're back at the bottom. */
  const next = useCallback((): string => {
    if (cursor.current <= 0) {
      cursor.current = -1
      return ''
    }
    cursor.current--
    return history.current[cursor.current]
  }, [])

  /** Reset navigation cursor without clearing the stack. */
  const reset = useCallback(() => {
    cursor.current = -1
  }, [])

  return { push, prev, next, reset }
}
