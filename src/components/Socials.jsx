import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Youtube } from 'lucide-react'

const SpotifyIcon = ({ className }) => (
  <svg viewBox="0 0 20 20" className={className} aria-hidden="true" fillRule="evenodd" stroke="none" strokeWidth="1">
    <g fill="currentColor">
      <g transform="translate(-140.000000, -7479.000000)">
        <g transform="translate(56.000000, 160.000000)">
          <path d="M99.915,7327.865 C96.692,7325.951 91.375,7325.775 88.297,7326.709 C87.803,7326.858 87.281,7326.58 87.131,7326.085 C86.981,7325.591 87.26,7325.069 87.754,7324.919 C91.287,7323.846 97.159,7324.053 100.87,7326.256 C101.314,7326.52 101.46,7327.094 101.196,7327.538 C100.934,7327.982 100.358,7328.129 99.915,7327.865 L99.915,7327.865 Z M99.81,7330.7 C99.584,7331.067 99.104,7331.182 98.737,7330.957 C96.05,7329.305 91.952,7328.827 88.773,7329.792 C88.36,7329.916 87.925,7329.684 87.8,7329.272 C87.676,7328.86 87.908,7328.425 88.32,7328.3 C91.951,7327.198 96.466,7327.732 99.553,7329.629 C99.92,7329.854 100.035,7330.334 99.81,7330.7 L99.81,7330.7 Z M98.586,7333.423 C98.406,7333.717 98.023,7333.81 97.729,7333.63 C95.381,7332.195 92.425,7331.871 88.944,7332.666 C88.609,7332.743 88.274,7332.533 88.198,7332.197 C88.121,7331.862 88.33,7331.528 88.667,7331.451 C92.476,7330.58 95.743,7330.955 98.379,7332.566 C98.673,7332.746 98.766,7333.129 98.586,7333.423 L98.586,7333.423 Z M94,7319 C88.477,7319 84,7323.477 84,7329 C84,7334.523 88.477,7339 94,7339 C99.523,7339 104,7334.523 104,7329 C104,7323.478 99.523,7319.001 94,7319.001 L94,7319 Z" />
        </g>
      </g>
    </g>
  </svg>
)

const AmazonMusicIcon = ({ className }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="24" cy="24" r="21.5" strokeWidth="1.5" />
    <path d="M32.2807,29.7009c1.112-.451,3.0916-1.0492,3.6872-.3272.6446.7814-.17,2.4769-.92,3.7942" strokeWidth="1.5" />
    <path d="M11.7984,30.2234c1.7586,1.3965,6.9532,3.5343,12.4876,3.5343a17.0029,17.0029,0,0,0,10.1671-3.0789" strokeWidth="1.5" />
    <path d="M20.4043,20.125v3.3a2,2,0,0,0,2,2h0a2,2,0,0,0,2-2v-3.3" strokeWidth="1.5" />
    <line x1="24.4043" y1="23.425" x2="24.4043" y2="25.425" strokeWidth="1.5" />
    <path d="M10.4,22.225a2,2,0,0,1,2-2h0a2,2,0,0,1,2,2v3.2" strokeWidth="1.5" />
    <line x1="10.4001" y1="20.225" x2="10.4001" y2="25.425" strokeWidth="1.5" />
    <path d="M14.4,22.225a2,2,0,0,1,2-2h0a2,2,0,0,1,2,2v3.2" strokeWidth="1.5" />
    <circle cx="31.88" cy="17.675" r="0.7" fill="currentColor" stroke="none" />
    <line x1="31.88" y1="20.125" x2="31.88" y2="25.425" strokeWidth="1.5" />
    <path d="M26.5407,24.9733a2.249,2.249,0,0,0,1.6448.4472h.4487a1.3236,1.3236,0,0,0,1.3222-1.325h0a1.3236,1.3236,0,0,0-1.3222-1.325h-.8974a1.3235,1.3235,0,0,1-1.3221-1.325h0a1.3235,1.3235,0,0,1,1.3221-1.325h.4487a2.2494,2.2494,0,0,1,1.6449.4472" strokeWidth="1.5" />
    <path d="M37.6,24.4176a1.9991,1.9991,0,0,1-1.7366,1.0074h0a2,2,0,0,1-2-2v-1.3a2,2,0,0,1,2-2h0a1.9989,1.9989,0,0,1,1.7346,1.0039" strokeWidth="1.5" />
  </svg>
)

const AudiomackIcon = ({ className }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <line x1="3.5" y1="23.4321" x2="4.7743" y2="23.4321" strokeWidth="1.5" />
    <path d="m44.5,24.374c-2.7703-.0831-3.8507,1.9115-4.7926,3.9892l-1.8007-.9696.9696-16.0953-8.9757,25.4034.1108-21.0541s-5.7068,7.8676-7.4797,12.1615c-1.8838-3.6568-2.5486-7.6182-2.5486-7.6182l-5.4297,6.9534-1.1564-5.2363-3.4423,2.7154s-1.122.0416-2.9673-1.1912" strokeWidth="1.5" />
  </svg>
)

const DeezerIcon = ({ className }) => (
  <svg viewBox="0 0 97.75 97.75" fill="currentColor" className={className} aria-hidden="true">
    <path d="M48.875,0C21.883,0,0,21.882,0,48.875S21.883,97.75,48.875,97.75S97.75,75.868,97.75,48.875S75.867,0,48.875,0z M25.676,69.248H12.365v-4.033h13.311V69.248z M25.676,64.006H12.365V59.97h13.311V64.006z M25.676,58.762H12.365v-4.035h13.311V58.762z M25.676,53.516H12.365v-4.033h13.311V53.516z M25.676,48.271H12.365v-4.034h13.311V48.271z M40.604,69.248H27.291v-4.033h13.313V69.248z M40.604,64.006H27.291V59.97h13.313V64.006z M40.604,58.762H27.291v-4.035h13.313V58.762z M55.531,69.248H42.219v-4.033h13.313L55.531,69.248L55.531,69.248z M55.531,64.006H42.219V59.97h13.313L55.531,64.006L55.531,64.006z M55.531,58.762H42.219v-4.035h13.313L55.531,58.762L55.531,58.762z M55.531,53.516H42.219v-4.033h13.313L55.531,53.516L55.531,53.516z M55.531,48.271H42.219v-4.034h13.313L55.531,48.271L55.531,48.271z M55.531,43.026H42.219v-4.034h13.313L55.531,43.026L55.531,43.026z M55.531,37.783H42.219v-4.035h13.313L55.531,37.783L55.531,37.783z M70.457,69.248H57.145v-4.033h13.313L70.457,69.248L70.457,69.248z M70.457,64.006H57.145V59.97h13.313L70.457,64.006L70.457,64.006z M70.457,58.762H57.145v-4.035h13.313L70.457,58.762L70.457,58.762z M70.457,53.516H57.145v-4.033h13.313L70.457,53.516L70.457,53.516z M70.457,48.271H57.145v-4.034h13.313L70.457,48.271L70.457,48.271z M85.385,69.248H72.072v-4.033h13.312V69.248z M85.385,64.006H72.072V59.97h13.312V64.006z M85.385,58.759H72.072v-4.034h13.312V58.759z M85.385,53.516H72.072V49.48h13.312V53.516z M85.385,48.271H72.072v-4.037h13.312V48.271z M85.385,43.025H72.072v-4.033h13.312V43.025z M85.385,37.78H72.072v-4.033h13.312V37.78z M72.072,32.536v-4.034h13.312v4.034H72.072z" />
  </svg>
)

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
    { icon: SpotifyIcon, label: 'Spotify', url: 'https://open.spotify.com/intl-es/artist/6v2o83K4iBOdfnRWMlDPvU?si=1I52BJQXS-qWrvAFC3JsjA' },
    { icon: Youtube, label: 'YouTube', url: 'https://www.youtube.com/@malconmusica' },
    { icon: AmazonMusicIcon, label: 'Amazon Music', url: 'https://music.amazon.com/artists/B0H1NC7B4M/malcon' },
    { icon: AudiomackIcon, label: 'Audiomack', url: 'https://audiomack.com/malcon-28' },
    { icon: DeezerIcon, label: 'Deezer', url: 'https://www.deezer.com/es/artist/391835081' },
  ]
  
  return (
    <section 
      ref={sectionRef}
      aria-labelledby="socials-title"
      className="relative min-h-[80vh] flex flex-col items-center justify-center py-16 sm:py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-malcon-bg via-transparent to-malcon-bg pointer-events-none" />
      
      <h2 
        id="socials-title"
        ref={titleRef}
        className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bebas text-malcon-gray tracking-wider mb-10 sm:mb-16"
      >
        <span className="text-malcon-orange-light">Seguinos</span>
      </h2>
      
      <nav aria-label="Redes sociales de MALCON" className="relative z-10 grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-6 sm:gap-8 md:gap-16">
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
                <div className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-malcon-bg border-2 border-malcon-gray/20 flex items-center justify-center group-hover:border-malcon-red group-hover:scale-110 transition-all duration-300 ${social.comingSoon ? 'group-hover:scale-100 group-hover:border-malcon-gray/20' : ''}`}>
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-malcon-gray group-hover:text-malcon-red transition-colors duration-300" aria-hidden="true" />
                </div>
              </div>
              <span className={`text-xs sm:text-sm tracking-widest uppercase ${social.comingSoon ? 'text-malcon-gray/40' : 'text-malcon-gray/60 group-hover:text-malcon-orange-light'} transition-colors duration-300`}>
                {social.label}
                {social.comingSoon && ' (próximamente)'}
              </span>
            </a>
          )
        })}
      </nav>
    </section>
  )
}
