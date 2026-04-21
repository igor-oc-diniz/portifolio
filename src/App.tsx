import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { PageLayout }       from './components/templates/PageLayout/PageLayout'
import { PageOrchestrator } from './components/templates/PageOrchestrator/PageOrchestrator'
import { RecruiterToggle }  from './components/molecules/RecruiterToggle/RecruiterToggle'
import { PerformancePanel } from './components/organisms/PerformancePanel/PerformancePanel'
import { ModeIndicator }    from './components/atoms/ModeIndicator/ModeIndicator'
import { usePerformanceMetrics } from './hooks/usePerformanceMetrics'
import { ParticleField } from './components/atoms/ParticleField/ParticleField'

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

// Inner component so hooks can access the Redux store
function AppInner() {
  usePerformanceMetrics()

  return (
    <>
      <ParticleField />
      <PageLayout>
        <PageOrchestrator
          sections={{
            hero:       <Suspense fallback={<SkeletonHero />}><Hero /></Suspense>,
            about:      <Suspense fallback={<SkeletonAbout />}><About /></Suspense>,
            skills:     <Suspense fallback={<SkeletonSkills />}><Skills /></Suspense>,
            experience: <Suspense fallback={<SkeletonExperience />}><Experience /></Suspense>,
            terminal:   <Suspense fallback={<SkeletonTerminal />}><TerminalSection /></Suspense>,
            contact:    <Suspense fallback={<SkeletonContact />}><Contact /></Suspense>,
          }}
        />
      </PageLayout>

      {/* Fixed floating UI — outside PageLayout but inside Provider */}
      <RecruiterToggle />
      <PerformancePanel />
      <ModeIndicator />
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  )
}

export default App
