import { Header } from '../../organisms/Header/Header'
import { Footer } from '../../organisms/Footer/Footer'

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen text-text-primary relative z-[1]">
      <Header />
      <main className="flex-1 min-h-screen">{children}</main>
      <Footer />
    </div>
  )
}
