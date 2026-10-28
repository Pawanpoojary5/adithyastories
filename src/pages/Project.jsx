import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Media from '../components/Media.jsx'
import SectionLink from '../components/SectionLink.jsx'
import NotFound from './NotFound.jsx'
import usePageTitle from '../lib/usePageTitle.js'
import { projects } from '../data/content.js'

// >>> CHANGED: new page (single project / story)
const SHAPES = ['tall', 'wide', 'square', 'square', 'tall', 'wide']

export default function Project() {
  const { slug } = useParams()
  const i = projects.findIndex((p) => p.slug === slug)
  const p = projects[i]
  usePageTitle(p ? p.title : 'Not found')
  if (!p) return <NotFound />

  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]

  return (
    <>
      <PageHero
        title={p.title.split(' ').length > 3 ? p.title.replace(/ (of|and|the) /i, '\n$1 ') : p.title}
        sub={`${p.location}  ·  ${p.kind}`}
        hue={p.hue}
        image={p.hero}
        crumb={<><Link to="/portfolio">Portfolio</Link> / {p.category}</>}
      >
        <Link to="/films" className="pill pill--play"><Play size={14} /> Watch Film</Link>
      </PageHero>

      <section className="sec story">
        <div>
          <h2 className="sec__title">The Story</h2>
          {p.story.map((t, k) => <p key={k} className="story__text">{t}</p>)}
        </div>
        <div className="story__img">
          <Media src={p.cover} hue={p.hue} alt={p.title} />
        </div>
      </section>

      <section className="sec sec--tight" aria-label="Gallery">
        <div className="masonry">
          {p.gallery.map((g, k) => (
            <figure key={k} className={`tile tile--${SHAPES[k % SHAPES.length]}`}>
              <Media src={g.src} hue={g.hue} alt={g.alt} />
            </figure>
          ))}
        </div>
      </section>

      <section className="sec sec--tight" aria-label="Reels">
        <SectionLink to="/#reels" kicker="Prefer motion?" tone="blue">Explore reels</SectionLink>
      </section>

      <nav className="sec pn" aria-label="More projects">
        <Link to={`/portfolio/${prev.slug}`}><ArrowLeft size={16} /> Previous Project</Link>
        <Link to={`/portfolio/${next.slug}`}>Next Project <ArrowRight size={16} /></Link>
      </nav>
    </>
  )
}