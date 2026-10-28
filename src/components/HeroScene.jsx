import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { heroPhotos } from '../data/site.js'

const { clamp, damp } = THREE.MathUtils

/* ---------- Placeholder photo art (replaced when `src` is set in site.js) ---------- */
function makePlaceholderTexture(hue, seed) {
  const c = document.createElement('canvas')
  c.width = 320
  c.height = 400
  const g = c.getContext('2d')
  const sky = g.createLinearGradient(0, 0, 0, 400)
  sky.addColorStop(0, `hsl(${hue - 8}, 70%, 16%)`)
  sky.addColorStop(0.55, `hsl(${hue}, 85%, 46%)`)
  sky.addColorStop(1, `hsl(${hue + 14}, 90%, 62%)`)
  g.fillStyle = sky
  g.fillRect(0, 0, 320, 400)
  const sun = g.createRadialGradient(160, 235, 4, 160, 235, 130)
  sun.addColorStop(0, 'rgba(255,240,200,.95)')
  sun.addColorStop(0.25, 'rgba(255,190,100,.6)')
  sun.addColorStop(1, 'rgba(255,140,40,0)')
  g.fillStyle = sun
  g.fillRect(0, 0, 320, 400)
  g.fillStyle = '#120704'
  g.beginPath()
  g.moveTo(0, 400)
  for (let x = 0; x <= 320; x += 20) g.lineTo(x, 310 + Math.sin(x * 0.03 + seed) * 18)
  g.lineTo(320, 400)
  g.closePath()
  g.fill()
  g.fillStyle = '#0a0403'
  const px = 138 + (seed % 3) * 14
  g.beginPath(); g.ellipse(px, 268, 7, 8, 0, 0, 7); g.fill(); g.fillRect(px - 8, 276, 16, 48)
  g.beginPath(); g.ellipse(px + 24, 272, 7, 8, 0, 0, 7); g.fill(); g.fillRect(px + 16, 280, 16, 44)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 4
  return t
}

function PhotoFrame({ photo, index, position, rotation, scale = 1, motion }) {
  const map = useMemo(() => {
    if (photo.src) {
      const t = new THREE.TextureLoader().load(photo.src)
      t.colorSpace = THREE.SRGBColorSpace
      return t
    }
    return makePlaceholderTexture(photo.hue, index)
  }, [photo, index])
  useEffect(() => () => map.dispose(), [map])

  const w = 1.15
  const h = 1.45
  return (
    <Float speed={motion ? 1.1 + index * 0.15 : 0} rotationIntensity={motion ? 0.35 : 0} floatIntensity={motion ? 0.7 : 0}>
      <group position={position} rotation={rotation} scale={scale}>
        <mesh position={[0, -0.06, 0]}>
          <planeGeometry args={[w + 0.14, h + 0.26]} />
          <meshStandardMaterial color="#efe3cf" roughness={0.7} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.04, 0.01]}>
          <planeGeometry args={[w, h]} />
          <meshStandardMaterial map={map} emissiveMap={map} emissive="#ffffff" emissiveIntensity={0.55} roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  )
}

/* ---------- Stylised camera (swap for a GLB later with useGLTF) ---------- */
function CameraModel() {
  const metal = { color: '#171717', metalness: 0.95, roughness: 0.3 }
  const leather = { color: '#1a120d', metalness: 0.1, roughness: 0.85 }
  const rot = [Math.PI / 2, 0, 0]
  return (
    <group>
      <RoundedBox args={[2.5, 1.4, 1.0]} radius={0.14} smoothness={4}><meshStandardMaterial {...leather} /></RoundedBox>
      <RoundedBox args={[2.5, 0.32, 1.0]} radius={0.1} smoothness={4} position={[0, 0.78, 0]}><meshStandardMaterial {...metal} /></RoundedBox>
      <RoundedBox args={[0.85, 0.42, 0.8]} radius={0.1} smoothness={4} position={[-0.15, 1.1, -0.05]}><meshStandardMaterial {...metal} /></RoundedBox>
      <RoundedBox args={[0.55, 1.3, 0.5]} radius={0.2} smoothness={4} position={[1.05, 0, 0.55]}><meshStandardMaterial {...leather} /></RoundedBox>
      <mesh position={[0.95, 0.98, 0.15]}><cylinderGeometry args={[0.1, 0.1, 0.12, 24]} /><meshStandardMaterial color="#ff9a3c" metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[0.55, 0.98, 0.1]}><cylinderGeometry args={[0.17, 0.17, 0.12, 32]} /><meshStandardMaterial {...metal} /></mesh>

      <mesh rotation={rot} position={[0, 0, 0.55]}><cylinderGeometry args={[0.78, 0.78, 0.2, 64]} /><meshStandardMaterial {...metal} /></mesh>
      <mesh rotation={rot} position={[0, 0, 1.05]}><cylinderGeometry args={[0.7, 0.72, 0.8, 64]} /><meshStandardMaterial color="#0d0d0d" metalness={0.9} roughness={0.4} /></mesh>
      {[0.82, 0.98, 1.14, 1.3].map((z) => (
        <mesh key={z} position={[0, 0, z]}><torusGeometry args={[0.72, 0.03, 12, 80]} /><meshStandardMaterial color="#090909" metalness={0.5} roughness={0.7} /></mesh>
      ))}
      <mesh position={[0, 0, 1.46]}><torusGeometry args={[0.68, 0.025, 16, 96]} /><meshStandardMaterial color="#ff9a3c" emissive="#ff7a1a" emissiveIntensity={1.4} /></mesh>
      <mesh position={[0, 0, 1.45]}><circleGeometry args={[0.62, 64]} /><meshPhysicalMaterial color="#04070b" roughness={0.04} metalness={0.3} clearcoat={1} envMapIntensity={2.4} /></mesh>
      {[0.46, 0.32, 0.18].map((r, i) => (
        <mesh key={r} position={[0, 0, 1.455 + i * 0.004]}><torusGeometry args={[r, 0.012, 12, 64]} /><meshStandardMaterial color="#1c2430" metalness={0.9} roughness={0.2} /></mesh>
      ))}
      <mesh position={[-0.22, 0.2, 1.47]}><circleGeometry args={[0.1, 32]} /><meshBasicMaterial color="#ff9a3c" transparent opacity={0.55} toneMapped={false} /></mesh>
    </group>
  )
}

function Halo({ motion }) {
  const ref = useRef()
  useFrame((_, dt) => {
    if (motion && ref.current) ref.current.rotation.z += dt * 0.08
  })
  return (
    <group rotation={[1.15, 0.2, 0.35]}>
      <group ref={ref}>
        <mesh><torusGeometry args={[3.0, 0.012, 16, 220]} /><meshBasicMaterial color="#ffb066" toneMapped={false} /></mesh>
        <mesh><torusGeometry args={[3.0, 0.07, 16, 220]} /><meshBasicMaterial color="#ff8a2a" transparent opacity={0.12} toneMapped={false} /></mesh>
      </group>
    </group>
  )
}

/* ---------- Pointer + scroll rig ---------- */
const SPOTS = [
  { p: [-3.1, 1.4, -0.6], r: [0.1, 0.5, 0.25] },
  { p: [-2.7, -1.5, 0.4], r: [-0.1, 0.4, -0.2] },
  { p: [3.2, 1.7, -0.4], r: [0.1, -0.5, -0.22] },
  { p: [3.3, -1.2, 0.2], r: [-0.05, -0.45, 0.2] },
  { p: [0.3, 2.4, -1.3], r: [0.2, 0.1, 0.12] },
  { p: [0.7, -2.4, 0.8], r: [-0.2, -0.15, -0.1] },
]

function Rig({ motion, progress }) {
  const group = useRef()
  const outer = useRef() // >>> CHANGED
  const pointer = useRef({ x: 0, y: 0 })
  const moved = useRef(false)
  const { viewport } = useThree()
  const portrait = viewport.width / viewport.height < 1.0

  // mouse + touch (touchmove keeps firing while the page scrolls, pointermove does not)
  useEffect(() => {
    const set = (x, y) => {
      moved.current = true
      pointer.current.x = (x / window.innerWidth) * 2 - 1
      pointer.current.y = (y / window.innerHeight) * 2 - 1
    }
    const onMove = (e) => set(e.clientX, e.clientY)
    const onTouch = (e) => { const t = e.touches[0]; if (t) set(t.clientX, t.clientY) }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    // idle sway until the user moves/touches, so it feels alive on phones too
    const t = state.clock.elapsedTime
    const px = motion ? (moved.current ? pointer.current.x : Math.sin(t * 0.5) * 0.7) : 0
    const py = motion ? (moved.current ? pointer.current.y : Math.cos(t * 0.4) * 0.35) : 0

    // >>> CHANGED: story mode. Over the first part of the scroll story the camera turns to face you and the view pushes in until the lens fills the screen.
    if (progress) {
      const p = motion ? progress.current : 0
      const q = 1 - Math.pow(1 - clamp(p / 0.8, 0, 1), 3)
      const aspect = viewport.width / viewport.height
      const zEnd = scale * 1.46 + (scale * 2.185) / Math.min(1, aspect)
      g.rotation.y = damp(g.rotation.y, (-0.45 + px * 0.3) * (1 - q), 6, dt)
      g.rotation.x = damp(g.rotation.x, (0.08 + py * 0.15) * (1 - q), 6, dt)
      g.position.y = damp(g.position.y, 0, 4, dt)
      state.camera.position.z = damp(state.camera.position.z, 9 - q * (9 - zEnd), 9, dt)
      if (outer.current) {
        outer.current.position.x = damp(outer.current.position.x, pos[0] * (1 - q), 9, dt)
        outer.current.position.y = damp(outer.current.position.y, pos[1] * (1 - q), 9, dt)
      }
      return
    }

    const p = motion ? clamp(window.scrollY / window.innerHeight, 0, 1) : 0
    g.rotation.y = damp(g.rotation.y, -0.45 + px * 0.3 + p * 0.9, 4, dt)
    g.rotation.x = damp(g.rotation.x, 0.08 + py * 0.15, 4, dt)
    g.position.y = damp(g.position.y, p * 1.4, 4, dt)
    state.camera.position.z = damp(state.camera.position.z, 9 + p * 1.8, 3, dt)
  })

  const scale = portrait ? 0.5 : clamp(viewport.width / 11, 0.5, 1.15)
  const pos = portrait ? [0, viewport.height * 0.2, 0] : [viewport.width * 0.2, 0, 0]
  const spots = [SPOTS[0], SPOTS[3]]
  const spread = portrait ? [0.72, 0.8, 1] : [1, 1, 1]

  return (
    <group ref={outer} position={pos} scale={scale}>
      <group ref={group}>
        <CameraModel />
        <Halo motion={motion} />
        {spots.map((s, i) => (
          <PhotoFrame
            key={i}
            index={i}
            photo={heroPhotos[i % heroPhotos.length]}
            position={s.p.map((v, k) => v * spread[k])}
            rotation={s.r}
            motion={motion}
          />
        ))}
      </group>
    </group>
  )
}

export default function HeroScene({ active, onReady, progress }) {
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [small] = useState(() => window.innerWidth < 768)

  return (
    <Canvas
      dpr={small ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 35 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      frameloop={!active ? 'never' : reduced ? 'demand' : 'always'}
      onCreated={() => onReady?.()}
    >
      <ambientLight intensity={0.25} />
      <spotLight position={[-5, 6, 6]} angle={0.5} penumbra={1} intensity={200} color="#ffa04d" />
      <pointLight position={[3, 1, 5]} intensity={60} color="#ff7a1a" />
      <directionalLight position={[4, 3, -4]} intensity={2} color="#ffd2a0" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} color="#ff8a2a" position={[-5, 2, -1]} scale={[6, 4, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2.5} color="#ffd9b0" position={[4, 4, 3]} scale={[8, 1, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={3} color="#ff6a10" position={[0, 0, -6]} scale={6} target={[0, 0, 0]} />
      </Environment>
      <Rig motion={!reduced} progress={progress} />
    </Canvas>
  )
}