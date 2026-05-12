import { useRef } from 'react'
import Scene from './components/Scene'
import Hero from './components/Hero'
import NewRelease from './components/NewRelease'
import Socials from './components/Socials'

export default function App() {
  const scrollProgressRef = useRef(0)
  
  return (
    <div className="relative bg-malcon-bg">
      <div className="noise-overlay" />
      
      <Scene ref={scrollProgressRef} />
      
      <main className="relative z-10">
        <Hero />
        <NewRelease />
        <Socials />
      </main>
    </div>
  )
}