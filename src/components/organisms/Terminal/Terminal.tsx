import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectIsOpen, toggleTerminal }   from '../../../store/slices/terminalSlice'
import { useTerminal }    from '../../../hooks/useTerminal'

import { TerminalHeader }      from '../../molecules/TerminalHeader/TerminalHeader'
import { TerminalInput }       from '../../molecules/TerminalInput/TerminalInput'
import { TerminalOutputBlock } from '../../molecules/TerminalOutputBlock/TerminalOutputBlock'
import { TerminalCursor }      from '../../atoms/TerminalCursor/TerminalCursor'

// ─── Terminal ─────────────────────────────────────────────────────────────────
// Full terminal organism.  Orchestrated by useTerminal(); renders the macOS
// chrome, scrollable history, animating pending entry, and the live input row.
//
// The terminal always uses a dark background regardless of the page theme.

export function Terminal() {
  const dispatch = useAppDispatch()
  const isOpen   = useAppSelector(selectIsOpen)

  const {
    input,
    setInput,
    history,
    pendingEntry,
    isAnimating,
    inputRef,
    scrollRef,
    handleKeyDown,
    focusInput,
  } = useTerminal()

  if (!isOpen) {
    return (
      <div className="flex justify-center">
        <button
          onClick={() => dispatch(toggleTerminal())}
          className="font-mono text-sm text-[#3FB950] border border-[#30363D] bg-[#0D1117] hover:border-[#3FB950]/50 px-4 py-2 rounded-lg transition-colors"
        >
          ▶ open terminal
        </button>
      </div>
    )
  }

  return (
    <div
      className="w-full rounded-xl overflow-hidden border border-[#30363D] shadow-2xl bg-[#0D1117] flex flex-col"
      style={{ height: '520px', maxHeight: '70vh' }}
    >
      {/* Window chrome */}
      <TerminalHeader />

      {/* Scrollable output + input area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 terminal-scroll"
        onClick={focusInput}
        role="log"
        aria-label="Terminal output"
        aria-live="polite"
        aria-atomic="false"
      >
        {/* Completed history entries */}
        {history.map((entry) => (
          <TerminalOutputBlock
            key={entry.id}
            command={entry.command}
            lines={entry.output}
          />
        ))}

        {/* In-progress (animating) entry */}
        {pendingEntry && (
          <TerminalOutputBlock
            command={pendingEntry.command}
            lines={pendingEntry.visibleLines}
          />
        )}

        {/* Live input row — hidden while animating */}
        {!isAnimating && (
          <TerminalInput
            value={input}
            onChange={setInput}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
            isAnimating={isAnimating}
          />
        )}

        {/* Cursor-only row shown during animation */}
        {isAnimating && (
          <div className="flex items-center h-6">
            <TerminalCursor isAnimating />
          </div>
        )}
      </div>
    </div>
  )
}
