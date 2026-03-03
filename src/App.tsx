import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { PageLayout } from './components/templates/PageLayout/PageLayout'
import { SkeletonSection } from './components/templates/SkeletonSection/SkeletonSection'

const About = React.lazy(() =>
  import('./components/templates/About/About').then((m) => ({ default: m.About }))
)

function App() {
  return (
    <Provider store={store}>
      <PageLayout>
        <Suspense fallback={<SkeletonSection />}>
          <About />
        </Suspense>
      </PageLayout>
    </Provider>
  )
}

export default App
