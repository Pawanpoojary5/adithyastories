import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Media from '../components/Media.jsx'
import usePageTitle from '../lib/usePageTitle.js'
import { journalTabs, posts } from '../data/content.js'

// >>> CHANGED: new page
export const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Journal() {
  usePageTitle('Journal')
  const [tab, setTab] = useState('All')
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const list = tab === 'All' ? posts : posts.filter((p) => p.category === tab)
  const feature = list.find((p) => p.featured) || list[0]
  const rest = list.filter((p) => p !== feature)

  const subscribe = (e) => {
    e.preventDefault()
    // TODO: send `email` to your newsletter service here.
    setDone(true)
    setEmail('')
  }

  return (
    <>
      <PageHero title="Journal" sub="Tips, stories and inspiration from the world of photography and beyond." hue={30} />

      <div className="sheet">
        <div className="tabs" role="group" aria-label="Filter articles">
          {journalTabs.map((t) => (
            <button key={t} type="button" className="tab" aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        {feature ? (
          <Link to={`/journal/${feature.slug}`} className="pfeature">
            <span className="pfeature__img"><Media src={feature.image} hue={feature.hue} alt={feature.title} /></span>
            <span className="pfeature__body">
              <small>Featured</small>
              <strong>{feature.title}</strong>
              <span>{fmtDate(feature.date)} · {feature.read}</span>
              <em>Read More →</em>
            </span>
          </Link>
        ) : (
          <p className="empty">No articles in this category yet.</p>
        )}

        {rest.length > 0 && <h2 className="sheet__h">Latest Articles</h2>}
        <ul className="prows">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link to={`/journal/${p.slug}`} className="prow">
                <span className="prow__img"><Media src={p.image} hue={p.hue} alt={p.title} /></span>
                <span className="prow__body">
                  <strong>{p.title}</strong>
                  <small>{fmtDate(p.date)} · {p.read}</small>
                </span>
                <ChevronRight size={16} />
              </Link>
            </li>
          ))}
        </ul>

        <form className="news" onSubmit={subscribe}>
          <p>Get the latest stories and tips</p>
          {done ? (
            <span role="status" className="news__done">Thanks for subscribing!</span>
          ) : (
            <div className="news__row">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" aria-label="Email address" />
              <button type="submit" className="btn-dark">Subscribe</button>
            </div>
          )}
        </form>
      </div>
    </>
  )
}