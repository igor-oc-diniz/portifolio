import { AnimatePresence, motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectTheme, toggleTheme } from '../../../store/slices/themeSlice'
import { Button } from '../../atoms/Button/Button'
import { Icon } from '../../atoms/Icon/Icon'

export function ThemeToggle() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)
  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => dispatch(toggleTheme())}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-9 h-9 p-0 overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Icon name={isDark ? 'Sun' : 'Moon'} size={18} />
        </motion.span>
      </AnimatePresence>
    </Button>
  )
}
