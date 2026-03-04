import { useRef, useState, useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addHistoryEntry,
  clearTerminal,
  setAnimating,
  selectTerminalHistory,
  selectIsAnimating,
} from '../store/slices/terminalSlice'
import type { TerminalEntry } from '../store/slices/terminalSlice'
import { findCommand, getEasterEggOutput, commands } from '../data/commands'
import type { OutputLine } from '../data/commands'
import { useCommandHistory }    from './useCommandHistory'
import { useTypewriterOutput }  from './useTypewriterOutput'

// ─── Easter-egg triggers ──────────────────────────────────────────────────────

const EASTER_TRIGGERS = new Set(['hire', 'hire me', 'sudo', 'sudo hire me'])

// ─── useTerminal ──────────────────────────────────────────────────────────────
// Main orchestrator for the interactive terminal.
//
// State split:
//   • Redux: completed history, isAnimating, isOpen
//   • Local: live input value, pendingEntry (in-progress animation)
//
// The pendingEntry lives in local state so that partial (animating) lines never
// pollute the Redux store.  It is committed to Redux only when the animation
// finishes.

export function useTerminal() {
  const dispatch     = useAppDispatch()
  const history      = useAppSelector(selectTerminalHistory)
  const isAnimating  = useAppSelector(selectIsAnimating)

  const [input,        setInput]        = useState('')
  const [pendingEntry, setPendingEntry] = useState<{
    command:      string
    visibleLines: OutputLine[]
  } | null>(null)

  const inputRef  = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const didMount  = useRef(false)

  const cmdHistory = useCommandHistory()
  const { animate, cancel } = useTypewriterOutput()

  // ── Auto-scroll ──────────────────────────────────────────────────────────

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    })
  }, [])

  // ── Core run command ─────────────────────────────────────────────────────

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim()

      // Handle clear before anything else
      const firstWord = trimmed.split(' ')[0].toLowerCase()
      const cmd       = findCommand(firstWord)

      if (cmd?.name === 'clear') {
        cancel()
        dispatch(clearTerminal())
        setPendingEntry(null)
        return
      }

      // Resolve output lines
      const isEasterEgg = EASTER_TRIGGERS.has(trimmed.toLowerCase())
      const args        = trimmed.split(' ').slice(1)

      const outputLines: OutputLine[] = isEasterEgg
        ? getEasterEggOutput()
        : cmd
          ? cmd.execute(args)
          : [
              { type: 'error', content: `command not found: ${trimmed}` },
              { type: 'text',  content: '  Type "help" to see available commands.' },
            ]

      // Kick off animation
      dispatch(setAnimating(true))
      setPendingEntry({ command: trimmed, visibleLines: [] })

      animate(
        outputLines,
        (visibleLines) => {
          setPendingEntry((prev) => (prev ? { ...prev, visibleLines } : null))
          scrollToBottom()
        },
        () => {
          const entry: TerminalEntry = {
            id:        `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            command:   trimmed,
            output:    outputLines,
            timestamp: Date.now(),
          }
          dispatch(addHistoryEntry(entry))
          dispatch(setAnimating(false))
          setPendingEntry(null)
          scrollToBottom()
          setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0)
        },
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, cancel, animate, scrollToBottom],
  )

  // ── Auto-run banner on first mount ───────────────────────────────────────

  useEffect(() => {
    if (didMount.current) return
    didMount.current = true

    const bannerCmd = findCommand('banner')
    if (!bannerCmd) return

    const lines = bannerCmd.execute()
    dispatch(setAnimating(true))
    setPendingEntry({ command: '', visibleLines: [] })

    animate(
      lines,
      (visibleLines) => setPendingEntry((prev) => (prev ? { ...prev, visibleLines } : null)),
      () => {
        const entry: TerminalEntry = {
          id:        'banner-init',
          command:   '',
          output:    lines,
          timestamp: Date.now(),
        }
        dispatch(addHistoryEntry(entry))
        dispatch(setAnimating(false))
        setPendingEntry(null)
        setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0)
      },
    )
    // Intentionally empty dep array — runs once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Keyboard handler ─────────────────────────────────────────────────────

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Enter': {
          if (isAnimating) return
          const val = input.trim()
          if (!val) return
          cmdHistory.push(val)
          setInput('')
          runCommand(val)
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          if (isAnimating) return
          setInput(cmdHistory.prev(input))
          break
        }
        case 'ArrowDown': {
          e.preventDefault()
          if (isAnimating) return
          setInput(cmdHistory.next())
          break
        }
        case 'Tab': {
          e.preventDefault()
          if (isAnimating) return
          const partial = input.trim().toLowerCase()
          if (!partial) return
          const allNames = commands.flatMap((c) => [c.name, ...(c.aliases ?? [])])
          const match    = allNames.find((n) => n.startsWith(partial))
          if (match) setInput(match)
          break
        }
        default:
          break
      }
    },
    [input, isAnimating, cmdHistory, runCommand],
  )

  // ── Focus helper ─────────────────────────────────────────────────────────

  const focusInput = useCallback(() => {
    inputRef.current?.focus({ preventScroll: true })
  }, [])

  return {
    input,
    setInput,
    history,
    pendingEntry,
    isAnimating,
    inputRef,
    scrollRef,
    handleKeyDown,
    focusInput,
  }
}
