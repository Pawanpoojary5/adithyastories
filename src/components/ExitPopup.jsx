import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'

// >>> CHANGED: new file. "Leaving so soon?" popup.
// Shows once per session when: (desktop) the mouse leaves through the top of the window,
// or (mobile/desktop) the visitor switches/minimises the tab and comes back.
// It cannot block closing the browser (no site can). Skipped on /portfolio pages.
const KEY = 'exit-popup-shown'
const MIN_MS = 5000 // visitor must have been on the site at least this long

const seen = () => { try { return sessionStorage.getItem(KEY) === '1' } catch { return false } }
const mark = () => { try { sessionStorage.setItem(KEY, '1') } catch { /* storage blocked */ } }

export default function ExitPopup() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const start = useRef(Date.now())
  const pending = useRef(false)
  const cta = useRef(null)
  const skip = pathname.startsWith('/portfolio')

  const eligible = useCallback(() => !seen() && !skip && Date.now() - start.current >= MIN_MS, [skip])
  const show = useCallback(() => {
    if (!eligible()) return
    mark()
    setOpen(true)
  }, [eligible])

  useEffect(() => {
    const onOut = (e) => { if (e.clientY <= 0 && !e.relatedTarget) show() }
    const onVis = () => {
      if (document.hidden) pending.current = eligible()
      else if (pending.current) { pending.current = false; show() }
    }
    document.addEventListener('mouseout', onOut)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [show, eligible])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    cta.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  return (
    <div className="xp" role="dialog" aria-modal="true" aria-labelledby="xp-title" onClick={() => setOpen(false)}>
      <div className="xp__card paper" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="xp__close" onClick={() => setOpen(false)} aria-label="Close"><X size={18} /></button>
        <h2 id="xp-title" className="xp__title">Leaving so soon?</h2>
        <p className="xp__text">Before you go, take a moment to see my work. Visit the portfolio to see the stories and the effort behind every frame.</p>
        <div className="xp__actions">
          <Link ref={cta} to="/portfolio" className="btn-dark">View Portfolio</Link>
          <button type="button" className="xp__later" onClick={() => setOpen(false)}>Maybe later</button>
        </div>
      </div>
    </div>
  )
}