import { useEffect, useState } from 'react'

// >>> CHANGED: new file. Right-edge quick jump for Home sections (desktop).
const ITEMS = [
  { id: 'top', label: 'Intro' },
  { id: 'photos', label: 'Photos' },
  { id: 'reels', label: 'Reels' },
  { id: 'about', label: 'About' },
  { id: 'book', label: 'Book' },
]

export default function SectionIndex() {
  const [cur, setCur] = useState('top')

  useEffect(() => {
    let raf = 0
    const run = () => {
      raf = 0
      let now = 'top'
      for (const it of ITEMS.slice(1)) {
        const el = document.getElementById(it.id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) now = it.id
      }
      setCur(now)
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const go = (id) => {
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="sidx" aria-label="Jump to section">
      {ITEMS.map((it) => (
        <button key={it.id} type="button" className={cur === it.id ? 'is-on' : ''} onClick={() => go(it.id)} aria-label={`Go to ${it.label}`}>
          <span>{it.label}</span>
          <i />
        </button>
      ))}
    </nav>
  )
}