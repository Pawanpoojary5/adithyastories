import { aboutTeaser as a } from '../data/site.js'
import SectionLink from './SectionLink.jsx'

// >>> CHANGED: rewritten as "Meet Adithya" (id="about"). Photo = /public/photos/adithya.png, shown as a photographer ID card.
export default function AboutTeaser() {
  return (
    <section id="about" className="meet" aria-labelledby="meet-title">
      <figure className="idcard">
        <span className="idcard__tape" aria-hidden="true" />
        <span className="idcard__slot" aria-hidden="true" />
        <div className="idcard__photo">
          {a.image ? <img src={a.image} alt={a.alt} /> : <span className="ph" style={{ '--h': 24 }} aria-hidden="true" />}
        </div>
        <figcaption>
          <b>ADITHYA</b>
          <span>PHOTOGRAPHER · FILMMAKER</span>
          <i className="idcard__bars" aria-hidden="true" />
        </figcaption>
      </figure>

      <div className="meet__body">
        <p className="mono meet__roles">{a.roles.join('  /  ')}</p>
        <h2 id="meet-title" className="meet__title">{a.title}</h2>
        <p className="meet__text">{a.text}</p>

        <dl className="meet__stats">
          {a.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>

        <SectionLink to="/about" kicker="Want to know the person behind the lens?">Read my story</SectionLink>
      </div>
    </section>
  )
}