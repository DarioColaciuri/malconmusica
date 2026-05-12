import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function NewRelease() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const cardRef = useRef()
  const glowRef = useRef()
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set([titleRef.current, cardRef.current], { opacity: 1, y: 0, scale: 1 })
      return
    }
    
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
          }
        }
      )
      
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1
          }
        }
      )
      
      gsap.to(glowRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        scale: 1.5,
        opacity: 0.3
      })
    })
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section 
      ref={sectionRef}
      aria-labelledby="release-title"
      className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
    >
      <div 
        ref={glowRef}
        className="absolute w-[600px] h-[600px] bg-malcon-red/20 rounded-full blur-[150px] pointer-events-none"
      />
      
      <h2 
        id="release-title"
        ref={titleRef}
        className="relative z-10 text-4xl md:text-5xl font-bebas text-malcon-gray tracking-wider mb-12"
      >
        <span className="text-malcon-orange-light">Latest</span> Release
      </h2>
      
      <article 
        ref={cardRef}
        className="relative z-10 glassmorphism rounded-2xl p-1 max-w-lg w-full box-glow group"
      >
        <div className="relative bg-gradient-to-br from-malcon-bg/80 to-malcon-bg/40 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-malcon-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <img 
                  src="/portada.png" 
                  alt="Maldita noche - Yo te diré - MALCON"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bebas text-malcon-gray tracking-wide">Maldita noche - Yo te diré</h3>
                <p className="text-malcon-gray/60 text-sm mt-1">MALCON • 2026</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-3 bg-malcon-gray/10 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-malcon-red to-malcon-orange-dark rounded-full" />
              </div>
              <p className="text-malcon-gray/50 text-sm text-center">Escuchalo en Spotify</p>
            </div>
            
            <a 
              href="https://open.spotify.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full mt-6 py-4 bg-gradient-to-r from-malcon-red to-malcon-orange-dark rounded-lg font-inter font-medium text-white uppercase tracking-wider text-sm hover:opacity-90 transition-opacity text-center group-hover:scale-[1.02] transition-transform"
            >
              Escuchar Ahora
            </a>
          </div>
        </div>
      </article>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-malcon-bg to-transparent pointer-events-none" />
    </section>
  )
}