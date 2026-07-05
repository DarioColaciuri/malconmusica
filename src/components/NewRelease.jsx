import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function NewRelease() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const cardRef = useRef()
  const card2Ref = useRef()
  const glowRef = useRef()
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set([titleRef.current, cardRef.current, card2Ref.current], { opacity: 1, y: 0, scale: 1 })
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
      
      gsap.fromTo(card2Ref.current,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            end: 'top 35%',
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
      className="relative min-h-screen flex flex-col items-center justify-center py-16 sm:py-20 px-4 overflow-hidden"
    >
      <div 
        ref={glowRef}
        className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] bg-malcon-red/20 rounded-full blur-[80px] sm:blur-[120px] md:blur-[150px] pointer-events-none"
      />
      
      <h2 
        id="release-title"
        ref={titleRef}
        className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bebas text-malcon-gray tracking-wider mb-8 sm:mb-12"
      >
        <span className="text-malcon-orange-light">Lanzamientos</span>
      </h2>
      
      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 w-full max-w-lg">
      
      <article 
        ref={cardRef}
        className="glassmorphism rounded-2xl p-1 w-full box-glow group"
      >
        <div className="relative bg-gradient-to-br from-malcon-bg/80 to-malcon-bg/40 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-malcon-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-4 sm:p-8">
            <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <a 
                href="https://open.spotify.com/intl-es/track/0SUVOa4Ao2VmANlqfURzHS?si=4ca50f463de84d0f" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0 block"
              >
                <img 
                  src="https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02ee84c90a74958ef6db8ed7af" 
                  alt="Maldita noche - Yo te diré - MALCON"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="white" />
                </div>
              </a>
              <div>
                <h3 className="text-xl sm:text-2xl font-bebas text-malcon-gray tracking-wide">Maldita noche - Yo te diré</h3>
                <p className="text-malcon-gray/60 text-xs sm:text-sm mt-1">MALCON • 2026</p>
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <div className="h-2.5 sm:h-3 bg-malcon-gray/10 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-malcon-red to-malcon-orange-dark rounded-full" />
              </div>
              <p className="text-malcon-gray/50 text-xs sm:text-sm text-center">Escuchalo en Spotify</p>
            </div>
            
            <a 
              href="https://open.spotify.com/intl-es/track/0SUVOa4Ao2VmANlqfURzHS?si=4ca50f463de84d0f" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full mt-4 sm:mt-6 py-3 sm:py-4 bg-gradient-to-r from-malcon-red to-malcon-orange-dark rounded-lg font-inter font-medium text-white uppercase tracking-wider text-xs sm:text-sm hover:opacity-90 transition-opacity text-center group-hover:scale-[1.02] transition-transform"
            >
              Escuchar Ahora
            </a>
          </div>
        </div>
      </article>
      
      <article 
        ref={card2Ref}
        className="glassmorphism rounded-2xl p-1 w-full box-glow group"
      >
        <div className="relative bg-gradient-to-br from-malcon-bg/80 to-malcon-bg/40 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-malcon-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative p-4 sm:p-8">
            <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <a 
                href="https://open.spotify.com/intl-es/track/3VN6TAfz1CQZc3MPgaKIau?si=21fe4dbc627a4af7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0 block"
              >
                <img 
                  src="https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e020f6d02506965b49a35d5c56e" 
                  alt="Dejaría Todo / Hasta Que Me Olvides / Vuelve - MALCON"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="white" />
                </div>
              </a>
              <div>
                <h3 className="text-xl sm:text-2xl font-bebas text-malcon-gray tracking-wide">Dejaría Todo / Hasta Que Me Olvides / Vuelve</h3>
                <p className="text-malcon-gray/60 text-xs sm:text-sm mt-1">MALCON • 2026</p>
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <div className="h-2.5 sm:h-3 bg-malcon-gray/10 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-malcon-red to-malcon-orange-dark rounded-full" />
              </div>
              <p className="text-malcon-gray/50 text-xs sm:text-sm text-center">Escuchalo en Spotify</p>
            </div>
            
            <a 
              href="https://open.spotify.com/intl-es/track/3VN6TAfz1CQZc3MPgaKIau?si=21fe4dbc627a4af7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full mt-4 sm:mt-6 py-3 sm:py-4 bg-gradient-to-r from-malcon-red to-malcon-orange-dark rounded-lg font-inter font-medium text-white uppercase tracking-wider text-xs sm:text-sm hover:opacity-90 transition-opacity text-center group-hover:scale-[1.02] transition-transform"
            >
              Escuchar Ahora
            </a>
          </div>
        </div>
      </article>
      
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-malcon-bg to-transparent pointer-events-none" />
    </section>
  )
}