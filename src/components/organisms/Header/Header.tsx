import { useScrolled } from '../../../hooks/useScrolled'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectMenuIsOpen, toggleMenu } from '../../../store/slices/menuSlice'
import { NavLink } from '../../molecules/NavLink/NavLink'
import { ThemeToggle } from '../../molecules/ThemeToggle/ThemeToggle'
import { Button } from '../../atoms/Button/Button'
import { Icon } from '../../atoms/Icon/Icon'
import { MobileMenu } from './MobileMenu'
import { cn } from '../../../lib/utils'

const NAV_ITEMS = [
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#terminal',   label: 'Terminal' },
  { href: '#contact',    label: 'Contact' },
]

export function Header() {
  const scrolled = useScrolled()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isMenuOpen = useAppSelector(selectMenuIsOpen)
  const dispatch = useAppDispatch()

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full backdrop-blur-md transition-shadow duration-300',
        'bg-bg-primary/80 border-b border-transparent',
        scrolled && 'shadow-lg shadow-black/20 border-border'
      )}
    >
      <div className="max-w-container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#"
          className="text-text-primary font-semibold text-lg tracking-tight hover:text-accent-primary transition-colors"
          aria-label="Igor Diniz — go to top"
        >
          igor<span className="text-accent-primary">.</span>dev
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(toggleMenu())}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="w-9 h-9 p-0"
            >
              <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && <MobileMenu items={NAV_ITEMS} />}
    </header>
  )
}
