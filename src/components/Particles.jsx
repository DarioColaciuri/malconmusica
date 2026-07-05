import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { CanvasTexture } from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARTICLE_COUNT = 800
const COLORS = ['#C1272D', '#E46314', '#FBA01D', '#FFA81F']

function createStarTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.05, 'rgba(255, 255, 255, 0.95)')
  gradient.addColorStop(0.15, 'rgba(255, 220, 180, 0.7)')
  gradient.addColorStop(0.3, 'rgba(255, 180, 100, 0.3)')
  gradient.addColorStop(0.5, 'rgba(255, 100, 50, 0.1)')
  gradient.addColorStop(0.7, 'rgba(100, 30, 10, 0.02)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  
  return canvas
}

const starTexture = createStarTexture()

export default function Particles({ scrollProgress }) {
  const pointsRef = useRef()
  const materialRef = useRef()
  const sizesRef = useRef()
  
  const { positions, velocities, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      
      const radius = Math.random() * 15 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
      
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
      
      const colorIndex = Math.floor(Math.random() * COLORS.length)
      const color = COLORS[colorIndex]
      const r = parseInt(color.slice(1, 3), 16) / 255
      const g = parseInt(color.slice(3, 5), 16) / 255
      const b = parseInt(color.slice(5, 7), 16) / 255
      colors[i3] = r
      colors[i3 + 1] = g
      colors[i3 + 2] = b
      
      sizes[i] = Math.random() * 0.8 + 0.2
    }
    
    return { positions, velocities, colors, sizes }
  }, [])
  
  sizesRef.current = sizes
  
  const targetPositions = useRef(positions.slice())
  
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion || !scrollProgress) return
    
    const progress = scrollProgress.current
    
    let targetRadius, targetDistribution
    
    if (progress < 0.15) {
      targetRadius = 8 + progress * 20
      targetDistribution = 'random'
    } else if (progress < 0.35) {
      targetRadius = 5 + (progress - 0.15) * 10
      targetDistribution = 'circular'
    } else if (progress < 0.55) {
      targetRadius = 6
      targetDistribution = 'wave'
    } else if (progress < 0.75) {
      targetRadius = 3 + (progress - 0.55) * 30
      targetDistribution = 'rings'
    } else if (progress < 0.9) {
      targetRadius = 10 - (progress - 0.75) * 20
      targetDistribution = 'organic'
    } else {
      targetRadius = 12 + (progress - 0.9) * 30
      targetDistribution = 'dissolve'
    }
    
    const newTargets = new Float32Array(PARTICLE_COUNT * 3)
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const t = i / PARTICLE_COUNT
      
      switch (targetDistribution) {
        case 'random':
          const r1 = (Math.random() - 0.5) * targetRadius * 2
          const r2 = (Math.random() - 0.5) * targetRadius * 2
          const r3 = (Math.random() - 0.5) * targetRadius * 2
          newTargets[i3] = targetPositions.current[i3] + r1 * 0.1
          newTargets[i3 + 1] = targetPositions.current[i3 + 1] + r2 * 0.1
          newTargets[i3 + 2] = targetPositions.current[i3 + 2] + r3 * 0.1
          break
        case 'circular':
          const angle = t * Math.PI * 2 * 8 + Math.sin(progress * 10) * 2
          const circleRadius = targetRadius + Math.sin(t * 20 + progress * 5) * 2
          newTargets[i3] = Math.cos(angle) * circleRadius
          newTargets[i3 + 1] = Math.sin(angle) * circleRadius * 0.6
          newTargets[i3 + 2] = Math.sin(t * Math.PI * 4) * 3
          break
        case 'wave':
          const waveX = (t - 0.5) * 20
          const waveY = Math.sin(t * 20 + progress * 8) * 4
          const waveZ = Math.cos(t * 15) * 3
          newTargets[i3] = waveX
          newTargets[i3 + 1] = waveY
          newTargets[i3 + 2] = waveZ
          break
        case 'rings':
          const ringCount = 3
          const ringIndex = i % ringCount
          const ringR = targetRadius * (ringIndex + 1) / ringCount
          const ringAngle = t * Math.PI * 2 * (ringIndex + 1)
          newTargets[i3] = Math.cos(ringAngle) * ringR
          newTargets[i3 + 1] = Math.sin(ringAngle * 2) * 2
          newTargets[i3 + 2] = Math.sin(ringAngle) * ringR
          break
        case 'organic':
          const noiseX = Math.sin(t * 10 + progress * 3) * 5
          const noiseY = Math.cos(t * 8 + progress * 2) * 4
          const noiseZ = Math.sin(t * 12 + progress * 4) * 6
          newTargets[i3] = noiseX + (Math.random() - 0.5) * 2
          newTargets[i3 + 1] = noiseY + (Math.random() - 0.5) * 2
          newTargets[i3 + 2] = noiseZ + (Math.random() - 0.5) * 2
          break
        case 'dissolve':
          const dissolveFactor = (progress - 0.9) * 10
          const expandX = (Math.random() - 0.5) * targetRadius * dissolveFactor
          const expandY = (Math.random() - 0.5) * targetRadius * dissolveFactor
          const expandZ = (Math.random() - 0.5) * targetRadius * dissolveFactor
          newTargets[i3] = targetPositions.current[i3] + expandX
          newTargets[i3 + 1] = targetPositions.current[i3 + 1] + expandY
          newTargets[i3 + 2] = targetPositions.current[i3 + 2] + expandZ
          break
        default:
          newTargets[i3] = targetPositions.current[i3]
          newTargets[i3 + 1] = targetPositions.current[i3 + 1]
          newTargets[i3 + 2] = targetPositions.current[i3 + 2]
      }
    }
    
    targetPositions.current = newTargets
  }, [scrollProgress])
  
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  const texture = useMemo(() => new CanvasTexture(starTexture), [])
  
  useFrame((state) => {
    if (!pointsRef.current) return
    
    const time = state.clock.elapsedTime
    const posArray = pointsRef.current.geometry.attributes.position.array
    const sizeArray = pointsRef.current.geometry.attributes.size.array
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      
      const dx = targetPositions.current[i3] - posArray[i3]
      const dy = targetPositions.current[i3 + 1] - posArray[i3 + 1]
      const dz = targetPositions.current[i3 + 2] - posArray[i3 + 2]
      
      if (prefersReducedMotion) {
        posArray[i3] = targetPositions.current[i3]
        posArray[i3 + 1] = targetPositions.current[i3 + 1]
        posArray[i3 + 2] = targetPositions.current[i3 + 2]
      } else {
        posArray[i3] += dx * 0.02 + velocities[i3] + Math.sin(time + i) * 0.002
        posArray[i3 + 1] += dy * 0.02 + velocities[i3 + 1] + Math.cos(time + i) * 0.002
        posArray[i3 + 2] += dz * 0.02 + velocities[i3 + 2] + Math.sin(time * 0.5 + i) * 0.002
      }
      
      const twinkle = 0.5 + 0.5 * Math.sin(time * 3 + i * 0.7) * Math.cos(time * 1.7 + i * 0.3)
      sizeArray[i] = sizesRef.current[i] * (0.4 + twinkle * 0.6)
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.geometry.attributes.size.needsUpdate = true
    
    if (materialRef.current && !prefersReducedMotion) {
      materialRef.current.opacity = 0.55 + Math.sin(time * 0.5) * 0.15
    }
  })
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        map={texture}
        size={0.8}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={2}
        depthWrite={false}
      />
    </points>
  )
}
