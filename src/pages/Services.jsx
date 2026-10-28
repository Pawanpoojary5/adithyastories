import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import Media from '../components/Media.jsx'
import usePageTitle from '../lib/usePageTitle.js'
import { services } from '../data/content.js'

// >>> CHANGED: new page. Each card opens Contact with the service preselected.
export default function Services() {
  usePageTitle('Services')
  return (
    <>
      <PageHero title="Our Services" sub="Thoughtfully crafted services for every chapter of your story." hue={26} />
      <section className="sec sec--tight" aria-label="Services">
        <ul className="svc-list">
          {services.map((s) => (
            <li key={s.title}>
              <Link to={`/contact?service=${encodeURIComponent(s.title)}`} className="svc">
                <span className="svc__img"><Media src={s.image} hue={s.hue} alt={s.title} /></span>
                <span className="svc__body">
                  <strong>{s.title}</strong>
                  <span>{s.text}</span>
                  <em>Learn More <ArrowRight size={13} /></em>
                </span>
                <ChevronRight size={18} className="svc__chev" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}