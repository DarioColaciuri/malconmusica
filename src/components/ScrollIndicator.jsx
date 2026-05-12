import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function ScrollIndicator() {
  const indicatorRef = useRef()
  const textRef = useRef()
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(indicatorRef.current, {
        y: 10,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })
      
      let opacity = 1
      const checkScroll = () => {
        if (window.scrollY > 100) {
          if (opacity === 1) {
            gsap.to([indicatorRef.current, textRef.current], {
              opacity: 0,
              duration: 0.5
            })
            opacity = 0
          }
        } else {
          if (opacity === 0) {
            gsap.to([indicatorRef.current, textRef.current], {
              opacity: 1,
              duration: 0.5
            })
            opacity = 1
          }
        }
      }
      
      window.addEventListener('scroll', checkScroll)
      
      return () => {
        window.removeEventListener('scroll', checkScroll)
      }
    })
    
    return () => ctx.revert()
  }, [])
  
  return (
    <div 
      ref={indicatorRef}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
    >
      <span 
        ref={textRef}
        className="text-xs text-malcon-gray/60 tracking-[0.3em] uppercase"
      >
        Scroll
      </span>
      <div className="w-6 h-10 rounded-full border-2 border-malcon-gray/30 flex justify-center pt-2">
        <div className="w-1.5 h-3 bg-malcon-red rounded-full animate-bounce-slow" />
      </div>
    </div>
  )
}