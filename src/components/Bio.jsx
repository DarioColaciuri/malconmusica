import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Bio() {
  const sectionRef = useRef()
  const titleRef = useRef()
  const imageRef = useRef()
  const contentRef = useRef()
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      gsap.set([titleRef.current, imageRef.current, contentRef.current], { opacity: 1, y: 0 })
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
      
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 1
          }
        }
      )
      
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1
          }
        }
      )
    })
    
    return () => ctx.revert()
  }, [])
  
  return (
    <section
      ref={sectionRef}
      aria-labelledby="bio-title"
      className="relative min-h-[80vh] flex flex-col items-center justify-center py-16 sm:py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-malcon-bg/20 to-malcon-bg pointer-events-none" />
      
      <h2
        id="bio-title"
        ref={titleRef}
        className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bebas text-malcon-gray tracking-wider mb-8 sm:mb-10"
      >
        <span className="text-malcon-orange-light">Acerca de</span> Nosotros
      </h2>
      
      <div ref={imageRef} className="relative z-10 mb-8 sm:mb-10">
        <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 overflow-hidden blob-morph">
          <img 
            src="/malcon_band.webp" 
            alt="MALCON - Banda de Funk, Retro y Hits"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div ref={contentRef} className="relative z-10 max-w-2xl text-center space-y-4 sm:space-y-6 px-0 sm:px-4">
        <p className="text-malcon-gray/80 text-base sm:text-lg leading-relaxed font-inter">
          MALCON es una banda de funk y retro covers formada en 2022, integrada originalmente por Cony Langone y Malu Vázquez en las voces, junto a Darío Colaciuri en los arreglos y Lautaro Schillaci en la batería. Con el paso de los años, la banda fue evolucionando e incorporó a Agus Sol en la voz y a Diego Sernaque en guitarra, consolidando una propuesta musical con identidad propia.
        </p>
        <p className="text-malcon-gray/80 text-base sm:text-lg leading-relaxed font-inter">
          Actualmente, MALCON se presenta en distintos escenarios de Capital Federal reinterpretando clásicos y hits muy conocidos, pero llevándolos a un terreno completamente distinto. Sus versiones se caracterizan por rearmonizaciones y arreglos influenciados por el jazz fusión y el funk, transformando canciones familiares en experiencias frescas, dinámicas y sorprendentes para el público.
        </p>
        <p className="text-malcon-gray/80 text-base sm:text-lg leading-relaxed font-inter">
          La banda se encuentra actualmente trabajando en la grabación de sus arreglos originales para lanzar próximamente su música en Spotify.
        </p>
      </div>
      
      <div className="relative z-10 mt-10 sm:mt-14 blob-card glassmorphism rounded-2xl p-8 sm:p-12 flex flex-col items-center gap-5 max-w-sm mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-malcon-red/20 blur-2xl rounded-full" />
            <div className="relative rounded-2xl px-5 py-3" style={{ background: 'radial-gradient(ellipse at center, rgba(251,160,29,0.15) 0%, transparent 70%)' }}>
              <img 
                src="/mercadopago.webp" 
                alt="Mercado Pago"
                className="h-12 sm:h-14 object-contain"
              />
            </div>
          </div>
          <p className="text-malcon-gray/70 text-sm sm:text-base font-inter">
            Colaborá con la banda
          </p>
          <p className="text-malcon-orange-light text-lg sm:text-xl font-inter font-semibold tracking-wide bg-malcon-bg/50 px-4 py-2 rounded-lg">
            malconmusica
          </p>
        </div>
      
      <style>{`
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 40% 60% 30% 70% / 50% 40% 60% 30%; }
          75% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
        }
        .blob-morph {
          animation: blob 8s ease-in-out infinite;
          box-shadow: 0 0 0 3px rgba(193, 39, 45, 0.7), 0 0 18px rgba(193, 39, 45, 0.35), 0 0 40px rgba(251, 160, 29, 0.2);
        }
        .blob-card {
          animation: blob 10s ease-in-out infinite;
          box-shadow: 0 0 0 1px rgba(193, 39, 45, 0.2), 0 0 30px rgba(193, 39, 45, 0.1);
        }
      `}</style>
    </section>
  )
}
