import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, Volume2, VolumeX } from 'lucide-react'
import Media from './Media.jsx'
import SectionLink from './SectionLink.jsx'
import { reels } from '../data/content.js'
import { setBlocked, toggleMute, useSound } from '../lib/sound.js'

// >>> CHANGED: new file. Reels play when scrolled into view; the hovered (or most visible) one gets the sound.
// Browsers block audible autoplay until the visitor has clicked/tapped once. Until then reels play muted and
// switch to sound automatically on the first click/tap/key. Mute button works any time.
function ReelCard({ reel, active, onHover, onRatio }) {
  const box = useRef(null)
  const vid = useRef(null)
  const [inView, setInView] = useState(false)
  const [tabHidden, setTabHidden] = useState(() => document.hidden)
  const snd = useSound()
  const audible = active && !snd.muted && !snd.blocked
  const playing = inView && !tabHidden

  useEffect(() => {
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { setInView(e.intersectionRatio > 0.3); onRatio(reel.id, e.intersectionRatio) },
      { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1] }
    )
    io.observe(el)
    return () => { io.disconnect(); onRatio(reel.id, 0) }
  }, [reel.id, onRatio])

  useEffect(() => {
    const on = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', on)
    return () => document.removeEventListener('visibilitychange', on)
  }, [])

  useEffect(() => {
    const v = vid.current
    if (!v) return
    v.muted = !audible
    if (playing) {
      const p = v.play()
      if (p && p.catch) {
        p.catch(() => {
          v.muted = true
          v.play().catch(() => {})
          if (audible) setBlocked(true)
        })
      }
    } else {
      v.pause()
    }
  }, [playing, audible, reel.src])

  return (
    <article
      ref={box}
      className={`reel${active ? ' is-active' : ''}`}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(reel.id)}
      onPointerLeave={() => onHover(null)}
    >
      {reel.src ? (
        <video ref={vid} className="reel__vid" src={reel.src} poster={reel.poster || undefined} loop playsInline preload="metadata" aria-label={reel.title} />
      ) : (
        <div className="reel__ph">
          <Media src={reel.poster} hue={reel.hue} alt={reel.title} />
          <span className="reel__ph-note"><Play size={14} /> Add reel video in content.js</span>
        </div>
      )}
      <div className="reel__shade" />
      {playing && <span className="reel__rec"><i /> REC</span>}
      <button type="button" className="reel__mute" onClick={toggleMute} aria-pressed={snd.muted} aria-label={snd.muted ? 'Unmute reels' : 'Mute reels'}>
        {snd.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      <div className="reel__cap">
        <small>{reel.tag}</small>
        <strong>{reel.title}</strong>
      </div>
      {audible && playing && <span className="reel__eq" aria-hidden="true"><i /><i /><i /><i /></span>}
    </article>
  )
}

export default function ReelsSection() {
  const [hover, setHover] = useState(null)
  const [scrollActive, setScrollActive] = useState(null)
  const ratios = useRef({})
  const snd = useSound()

  const onRatio = useCallback((id, r) => {
    ratios.current[id] = r
    let best = null
    let br = 0.499
    for (const [k, v] of Object.entries(ratios.current)) {
      if (v > br) { best = k; br = v }
    }
    setScrollActive(best)
  }, [])

  const active = hover ?? scrollActive

  return (
    <section id="reels" className="reels grain" aria-labelledby="reels-title">
      <header className="reels__head">
        <div>
          <p className="mono rec"><i /> REC · Reels</p>
          <h2 id="reels-title">Stories that move.</h2>
          <p className="reels__sub">Scroll to play. Hover a reel to hear it.</p>
        </div>
        <div className="reels__ctrl">
          <button type="button" className="sound" onClick={toggleMute} aria-pressed={snd.muted}>
            {snd.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {snd.muted ? 'Muted' : 'Sound on'}
          </button>
          {snd.blocked && !snd.muted && <span className="sound__hint"><i /> Tap anywhere for sound</span>}
        </div>
      </header>

      <div className="reels__row">
        {reels.map((r) => (
          <ReelCard key={r.id} reel={r} active={active === r.id} onHover={setHover} onRatio={onRatio} />
        ))}
      </div>

      <SectionLink to="/films" kicker="Wanna see more videos?" tone="blue">Click here, watch all films</SectionLink>
    </section>
  )
}