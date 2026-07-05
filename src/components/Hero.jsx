import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollIndicator from './ScrollIndicator'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const logoRef = useRef()
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        const letters = titleRef.current.querySelectorAll('span')
        gsap.set(letters, { opacity: 1, y: 0, scale: 1 })
        gsap.set(subtitleRef.current, { opacity: 1, y: 0 })
        gsap.set(logoRef.current, { opacity: 1, scale: 1 })
        gsap.set(heroRef.current, { opacity: 1, y: 0 })
        return
      }
      
      const letters = titleRef.current.querySelectorAll('span')
      
      gsap.to(letters, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        delay: 0.3
      })
      
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1.2
      })
      
      gsap.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.7)',
        delay: 0.1
      })
      
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        opacity: 0,
        y: -100
      })
    })
    
    return () => ctx.revert()
  }, [])
  
  const title = 'MALCON'
  
  return (
    <section 
      ref={heroRef}
      aria-labelledby="hero-title"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-malcon-bg pointer-events-none" />
      
      <div 
        ref={logoRef}
        className="mb-6 sm:mb-8 opacity-0 scale-50"
      >
        <img 
          src="/malcon.png" 
          alt="MALCON - Banda de Funk, Retro y Hits de Buenos Aires"
          width="96"
          height="96"
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain filter drop-shadow-lg"
        />
      </div>
      
      <h1 
        id="hero-title"
        ref={titleRef}
        className="hero-title text-[12vw] leading-none font-bebas text-transparent bg-clip-text bg-gradient-to-b from-malcon-orange-light via-malcon-orange-dark to-malcon-red text-glow tracking-wider"
        style={{ WebkitTextStroke: '2px rgba(193, 39, 45, 0.8)' }}
      >
        {title.split('').map((letter, i) => (
          <span 
            key={i}
            className="inline-block"
            style={{
              opacity: 0,
              transform: 'translateY(100px) scale(0.5)'
            }}
          >
            {letter}
          </span>
        ))}
        <span className="sr-only"> - Funk / Retro / Hits - Banda de Buenos Aires</span>
      </h1>
      
      <p 
        ref={subtitleRef}
        className="mt-6 sm:mt-8 text-base sm:text-xl md:text-2xl font-inter text-malcon-gray/80 tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-0"
      >
        Funk / Retro / Hits
      </p>
      
      <ScrollIndicator />
    </section>
  )
}