import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { PageLayout } from './components/templates/PageLayout/PageLayout'
import { SkeletonHero }       from './components/templates/Hero/Hero'
import { SkeletonAbout }      from './components/templates/About/About'
import { SkeletonSkills }     from './components/templates/Skills/Skills'
import { SkeletonExperience } from './components/templates/Experience/Experience'
import { SkeletonTerminal }   from './components/templates/TerminalSection/TerminalSection'
import { SkeletonContact }    from './components/templates/Contact/Contact'

const Hero = React.lazy(() =>
  import('./components/templates/Hero/Hero').then((m) => ({ default: m.Hero }))
)

const About = React.lazy(() =>
  import('./components/templates/About/About').then((m) => ({ default: m.About }))
)

const Skills = React.lazy(() =>
  import('./components/templates/Skills/Skills').then((m) => ({ default: m.Skills }))
)

const Experience = React.lazy(() =>
  import('./components/templates/Experience/Experience').then((m) => ({ default: m.Experience }))
)

const TerminalSection = React.lazy(() =>
  import('./components/templates/TerminalSection/TerminalSection').then((m) => ({
    default: m.TerminalSection,
  }))
)

const Contact = React.lazy(() =>
  import('./components/templates/Contact/Contact').then((m) => ({ default: m.Contact }))
)

function App() {
  return (
    <Provider store={store}>
      <PageLayout>
        <Suspense fallback={<SkeletonHero />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<SkeletonAbout />}>
          <About />
        </Suspense>
        <Suspense fallback={<SkeletonSkills />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SkeletonExperience />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SkeletonTerminal />}>
          <TerminalSection />
        </Suspense>
        <Suspense fallback={<SkeletonContact />}>
          <Contact />
        </Suspense>
      </PageLayout>
    </Provider>
  )
}

export default App
