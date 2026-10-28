import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Media from '../components/Media.jsx'
import usePageTitle from '../lib/usePageTitle.js'
import { categories, projects } from '../data/content.js'

// >>> CHANGED: new page
const PAGE = 8
const pad = (n) => String(n).padStart(2, '0')

export default function Portfolio() {
  usePageTitle('Portfolio')
  const [cat, setCat] = useState('All')
  const [count, setCount] = useState(PAGE)

  const list = useMemo(() => (cat === 'All' ? projects : projects.filter((p) => p.category === cat)), [cat])
  const shown = list.slice(0, count)

  const pick = (c) => { setCat(c); setCount(PAGE) }

  return (
    <>
      <PageHero title={'Photography\nPortfolio'} sub="A curated collection of moments, emotions and stories." hue={20} />

      <section className="sec" aria-label="Portfolio gallery">
        <div className="tabs" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button key={c} type="button" className="tab" aria-pressed={cat === c} onClick={() => pick(c)}>{c}</button>
          ))}
        </div>

        <div className="masonry">
          {shown.map((p) => (
            <Link key={p.slug} to={`/portfolio/${p.slug}`} className={`tile tile--${p.shape}`}>
              <Media src={p.cover} hue={p.hue} alt={p.title} />
              <span className="tile__cap">
                {p.title}
                <small>{p.location}</small>
              </span>
            </Link>
          ))}
        </div>

        <div className="listfoot">
          <p className="count"><b>{pad(shown.length)}</b> / {pad(list.length)}</p>
          {shown.length < list.length && (
            <button type="button" className="pill" onClick={() => setCount((c) => c + PAGE)}>Load More</button>
          )}
        </div>
      </section>
    </>
  )
}