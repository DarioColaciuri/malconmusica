import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Youtube, Music2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Socials() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const iconsRef = useRef([])
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set(titleRef.current, { opacity: 1, y: 0 })
      iconsRef.current.forEach(icon => {
        if (icon) gsap.set(icon, { opacity: 1, y: 0, scale: 1 })
      })
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
      
      iconsRef.current.forEach((icon, i) => {
        if (!icon) return
        gsap.fromTo(icon,
          { opacity: 0, y: 60, scale: 0.5 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'top 30%',
              scrub: 1
            }
          }
        )
      })
    })
    
    return () => ctx.revert()
  }, [])
  
  const socials = [
    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/malconmusica' },
    { icon: Music2, label: 'Spotify', url: '#', comingSoon: true },
    { icon: Youtube, label: 'YouTube', url: 'https://www.youtube.com/@malconmusica' },
  ]
  
  return (
    <section 
      ref={sectionRef}
      aria-labelledby="socials-title"
      className="relative min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-malcon-bg via-transparent to-malcon-bg pointer-events-none" />
      
      <h2 
        id="socials-title"
        ref={titleRef}
        className="relative z-10 text-4xl md:text-5xl font-bebas text-malcon-gray tracking-wider mb-16"
      >
        <span className="text-malcon-orange-light">Follow</span> Us
      </h2>
      
      <nav aria-label="Redes sociales de MALCON" className="relative z-10 flex flex-wrap justify-center gap-8 md:gap-16">
        {socials.map((social, i) => {
          const Icon = social.icon
          return (
            <a
              key={social.label}
              ref={el => iconsRef.current[i] = el}
              href={social.url}
              aria-label={social.comingSoon ? `${social.label} - Próximamente` : `Seguinos en ${social.label}`}
              aria-disabled={social.comingSoon}
              className={`group relative flex flex-col items-center gap-4 ${social.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-malcon-red/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-malcon-bg border-2 border-malcon-gray/20 flex items-center justify-center group-hover:border-malcon-red group-hover:scale-110 transition-all duration-300 ${social.comingSoon ? 'group-hover:scale-100 group-hover:border-malcon-gray/20' : ''}`}>
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-malcon-gray group-hover:text-malcon-red transition-colors duration-300" aria-hidden="true" />
                </div>
              </div>
              <span className={`text-sm tracking-widest uppercase ${social.comingSoon ? 'text-malcon-gray/40' : 'text-malcon-gray/60 group-hover:text-malcon-orange-light'} transition-colors duration-300`}>
                {social.label}
                {social.comingSoon && ' (próximamente)'}
              </span>
            </a>
          )
        })}
      </nav>
      
      <footer className="absolute bottom-8 left-1/2 -translate-x-1/2 text-malcon-gray/30 text-xs tracking-widest">
        © 2026 MALCON. Todos los derechos reservados.
      </footer>
    </section>
  )
}