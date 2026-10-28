import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { site } from '../data/site.js'

const HeroScene = lazy(() => import('./HeroScene.jsx'))

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

// If WebGL crashes, the CSS glow behind the canvas stays as the fallback.
class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

/* Pinned intro. P = 0..1 over the pinned height.
   0.00-0.80  camera pushes in until the lens fills the screen (HeroScene reads progress)
   0.70-0.98  soft shutter flash, then the pin ends and the Photos section scrolls in */
const FLASH_AT = 0.84
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))

export default function Hero() {
  const wrap = useRef(null)
  const canvasBox = useRef(null)
  const copy = useRef(null)
  const cue = useRef(null)
  const flash = useRef(null)
  const progress = useRef(0)

  const [webgl] = useState(hasWebGL)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [inView, setInView] = useState(true)
  const [early, setEarly] = useState(true)
  const [ready, setReady] = useState(false)

  // Pause 3D rendering when the hero is off-screen or after the flash.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 })
    if (wrap.current) io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced) return
    let raf = 0
    let lastEarly = true

    const update = () => {
      raf = 0
      const w = wrap.current
      if (!w) return
      const r = w.getBoundingClientRect()
      const total = Math.max(1, r.height - window.innerHeight)
      const P = clamp(-r.top / total)
      progress.current = P

      if (copy.current) {
        const c = clamp(P / 0.12)
        copy.current.style.opacity = String(1 - c)
        copy.current.style.transform = `translateY(${-c * 40}px)`
      }
      if (cue.current) cue.current.style.opacity = String(1 - clamp(P / 0.04))
      if (canvasBox.current) canvasBox.current.style.opacity = P > FLASH_AT ? String(1 - clamp((P - FLASH_AT) / 0.03)) : ''
      if (flash.current) flash.current.style.opacity = String(0.5 * Math.pow(clamp(1 - Math.abs(P - FLASH_AT) / 0.14), 1.4))

      const e = P < 0.95
      if (e !== lastEarly) { lastEarly = e; setEarly(e) }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced])

  return (
    <section className={`hstory${reduced ? ' hstory--static' : ''}`} ref={wrap} aria-label="Introduction">
      <div className="hstory__stick">
        <div className="hero">
          <div className="hero__frame">
            <div className="hero__glow" aria-hidden="true" />

            {webgl && (
              <div className={`hero__canvas${ready ? ' is-ready' : ''}`} ref={canvasBox} aria-hidden="true">
                <SceneBoundary>
                  <Suspense fallback={null}>
                    <HeroScene active={inView && early} onReady={() => setReady(true)} progress={reduced ? undefined : progress} />
                  </Suspense>
                </SceneBoundary>
              </div>
            )}

            <div className="hero__shade" aria-hidden="true" />

            <div className="hero__copy" ref={copy}>
              <h1 className="hero__title">
                <span className="line"><span style={{ '--i': 0 }}>More Than</span></span>
                <span className="line"><span style={{ '--i': 1 }}>Photos</span></span>
                <span className="line"><span style={{ '--i': 2 }}>It&rsquo;s Your Story</span></span>
              </h1>
              <p className="hero__intro">{site.tagline}</p>
              <a href="#photos" className="btn-explore">
                <span className="btn-explore__icon"><ArrowRight size={16} /></span>
                Explore
              </a>
            </div>

            <p className="hero__scroll" ref={cue} aria-hidden="true"><span />Scroll</p>

            {!reduced && <div className="flash" ref={flash} aria-hidden="true" />}
          </div>
        </div>
      </div>
    </section>
  )
}