import { Header } from './components/sections/Header'
import { Hero } from './components/sections/Hero'
import { Problems } from './components/sections/Problems'
import { Cost } from './components/sections/Cost'
import { Solution } from './components/sections/Solution'
import { Process } from './components/sections/Process'
import { Packages } from './components/sections/Packages'
import { Results } from './components/sections/Results'
import { Trust } from './components/sections/Trust'
import { Objections } from './components/sections/Objections'
import { AuditForm } from './components/sections/AuditForm'
import { Faq, Footer, MobileStickyCta } from './components/sections/Closing'

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Problems />
        <Cost />
        <Solution />
        <Process />
        <Packages />
        <Results />
        <Trust />
        <Objections />
        <AuditForm />
        <Faq />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  )
}
