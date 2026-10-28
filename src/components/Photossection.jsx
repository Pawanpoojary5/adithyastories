import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Media from './Media.jsx'
import SectionLink from './SectionLink.jsx'
import { projects } from '../data/content.js'

// Home "Photos" section: every project as a card, then a direct link down to the reels.
export default function PhotosSection() {
  return (
    <section id="photos" className="photos" aria-labelledby="photos-title">
      <header className="photos__head">
        <div>
          <p className="mono rec"><i /> Photos</p>
          <h2 id="photos-title">Moments, developed.</h2>
        </div>
        <Link to="/portfolio" className="photos__all">View full portfolio <ArrowRight size={16} /></Link>
      </header>

      <ul className="photos__grid">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link to={`/portfolio/${p.slug}`} className="pcard" aria-label={`${p.title}, ${p.location}`}>
              <span className="pcard__img"><Media src={p.cover} hue={p.hue} alt={p.title} /></span>
              <b>{p.title}</b>
              <small>{p.location}</small>
            </Link>
          </li>
        ))}
      </ul>

      <SectionLink to="/#reels" kicker="Prefer motion?" tone="blue">Explore reels</SectionLink>
    </section>
  )
}