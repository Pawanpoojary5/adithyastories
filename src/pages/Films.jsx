import { useEffect, useState } from 'react'
import { Play, X } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Media from '../components/Media.jsx'
import SectionLink from '../components/SectionLink.jsx'
import usePageTitle from '../lib/usePageTitle.js'
import { films, filmCategories, reel } from '../data/content.js'

// >>> CHANGED: new page
function FilmModal({ film, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const yt = film.youtube && `https://www.youtube-nocookie.com/embed/${film.youtube}?autoplay=1&rel=0`

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={film.title} onClick={onClose}>
      <button type="button" className="modal__close" onClick={onClose} aria-label="Close video"><X size={22} /></button>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        {yt ? (
          <iframe src={yt} title={film.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : film.video ? (
          <video src={film.video} poster={film.thumb || undefined} controls autoPlay playsInline />
        ) : (
          <div className="modal__empty">
            <p>{film.title}</p>
            <span>Add a YouTube ID (youtube) or an mp4 path (video) for this film in src/data/content.js</span>
          </div>
        )}
      </div>
    </div>
  )
}

function FilmCard({ film, onOpen }) {
  return (
    <button type="button" className="fcard" onClick={() => onOpen(film)}>
      <span className="fcard__thumb">
        <Media src={film.thumb} hue={film.hue} alt={film.title} />
        <span className="fcard__play"><Play size={16} fill="currentColor" /></span>
      </span>
      <span className="fcard__title">{film.title}</span>
      <span className="fcard__meta">{film.label} · {film.duration}</span>
    </button>
  )
}

export default function Films() {
  usePageTitle('Films')
  const [active, setActive] = useState(null)
  const [cat, setCat] = useState(filmCategories[0])

  const featured = films.filter((f) => f.featured)
  const hero = featured[0]
  const row = featured.slice(1, 4)
  const byCat = films.filter((f) => f.category === cat)

  return (
    <>
      <PageHero title={'Cinematic\nFilms'} sub="Stories in motion. Films that bring your most precious moments to life." hue={212} tone="blue">
        <button type="button" className="pill pill--play" onClick={() => setActive(reel)}><Play size={14} /> Watch Reel</button>
      </PageHero>

      <section className="sec sec--tight films" aria-label="Featured films">
        <button type="button" className="player" onClick={() => setActive(hero)} aria-label={`Play ${hero.title}`}>
          <Media src={hero.thumb} hue={hero.hue} alt={hero.title} />
          <span className="player__shade" />
          <span className="player__play"><Play size={28} fill="currentColor" /></span>
          <span className="player__cap">{hero.title}<small>{hero.label} · {hero.duration}</small></span>
        </button>

        <h2 className="sec__title sec__title--sm">Featured Films</h2>
        <div className="frow">
          {row.map((f) => <FilmCard key={f.slug} film={f} onOpen={setActive} />)}
        </div>

        <h2 className="sec__title sec__title--sm">Film Categories</h2>
        <div className="tabs" role="group" aria-label="Film categories">
          {filmCategories.map((c) => (
            <button key={c} type="button" className="tab tab--blue" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="frow frow--spaced">
          {byCat.map((f) => <FilmCard key={f.slug} film={f} onOpen={setActive} />)}
        </div>
      </section>

      <section className="sec sec--tight" aria-label="Photos">
        <SectionLink to="/#photos" kicker="Prefer stills?">Explore photos</SectionLink>
      </section>

      {active && <FilmModal film={active} onClose={() => setActive(null)} />}
    </>
  )
}