import { useRef } from 'react'
import Scene from './components/Scene'
import Hero from './components/Hero'
import NewRelease from './components/NewRelease'
import Bio from './components/Bio'
import Socials from './components/Socials'

export default function App() {
  const scrollProgressRef = useRef(0)
  
  return (
    <div className="relative bg-malcon-bg">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-malcon-red focus:text-white focus:rounded-lg"
      >
        Saltar al contenido
      </a>
      
      <div className="noise-overlay" />
      
      <Scene ref={scrollProgressRef} />
      
      <main id="main-content" className="relative z-10">
        <Hero />
        <NewRelease />
        <Bio />
        <Socials />
      </main>
    </div>
  )
}