import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Media from '../components/Media.jsx'
import usePageTitle from '../lib/usePageTitle.js'
import { about } from '../data/content.js'

// >>> CHANGED: new page
export default function About() {
  usePageTitle('About')
  return (
    <>
      <PageHero title={'Capturing\nReal Emotions'} sub={about.intro} hue={22} image={about.image}>
        <Link to="/portfolio" className="pill">My Journey</Link>
      </PageHero>

      <section className="sec about">
        <div>
          <h2 className="sec__title sec__title--sm">My Philosophy</h2>
          <p className="about__text">{about.philosophy}</p>
          <p className="signature">{about.signature}</p>
        </div>
        <div>
          <h2 className="sec__title sec__title--sm">My Approach</h2>
          <ul className="ticks">
            {about.approach.map((a) => (
              <li key={a}><Check size={13} /> {a}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec--tight" aria-label="Behind the scenes">
        <div className="strip">
          {about.strip.map((s, i) => (
            <div key={i} className="strip__item"><Media src={s.src} hue={s.hue} alt={s.alt} /></div>
          ))}
        </div>
        <blockquote className="quote">
          &ldquo;{about.quote}&rdquo;
          <cite>{about.signature}</cite>
        </blockquote>
      </section>
    </>
  )
}