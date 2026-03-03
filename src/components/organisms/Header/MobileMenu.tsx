import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from '../../molecules/NavLink/NavLink'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { closeMenu, selectMenuIsOpen } from '../../../store/slices/menuSlice'

interface NavItem {
  href: string
  label: string
}

interface MobileMenuProps {
  items: NavItem[]
}

export function MobileMenu({ items }: MobileMenuProps) {
  const isOpen = useAppSelector(selectMenuIsOpen)
  const dispatch = useAppDispatch()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden border-t border-border bg-bg-secondary"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col px-6 py-4 gap-4">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  onClick={() => dispatch(closeMenu())}
                  className="w-full text-base"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
