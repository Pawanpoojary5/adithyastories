import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { featuredWorks } from '../data/site.js'

function onMove(e) {
  if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
}
const onLeave = (e) => { e.currentTarget.style.transform = '' }

export default function FeaturedWorks() {
  const list = useRef(null)

  useEffect(() => {
    const items = list.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        }),
      { threshold: 0.15 }
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="featured" id="featured" aria-labelledby="featured-title">
      <div className="featured__head">
        <h2 id="featured-title">Featured Works</h2>
        <Link to="/portfolio" className="featured__all">View portfolio</Link>
      </div>

      <ul className="featured__grid" ref={list}>
        {featuredWorks.map((w, i) => (
          <li key={w.title} className="reveal" style={{ '--d': `${i * 90}ms` }}>
            <Link to={w.to} className="work" onPointerMove={onMove} onPointerLeave={onLeave}>
              {w.image ? (
                <img className="work__img" src={w.image} alt={w.alt} loading="lazy" />
              ) : (
                <span className="work__img work__ph" style={{ '--h': w.hue }} aria-hidden="true" />
              )}
              <span className="work__cap">
                <span className="work__title">{w.title}</span>
                {!w.image && <span className="work__tag">Placeholder image</span>}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}