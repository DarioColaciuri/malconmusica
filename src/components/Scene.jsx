import { Canvas } from '@react-three/fiber'
import { useRef, forwardRef } from 'react'
import Particles from './Particles'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

const Scene = forwardRef(function Scene(props, ref) {
  const scrollProgressRef = useRef(0)
  
  useEffect(() => {
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress
        if (ref?.current) {
          ref.current = self.progress
        }
      }
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [ref])
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 3, 18], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <Particles scrollProgress={scrollProgressRef} />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.8}
            radius={0.5}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
})

export default Scene
