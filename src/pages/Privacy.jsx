import PageHero from '../components/PageHero.jsx'
import usePageTitle from '../lib/usePageTitle.js'
import { privacy } from '../data/content.js'

// >>> CHANGED: new page. Placeholder policy text: have it reviewed before launch.
export default function Privacy() {
  usePageTitle('Privacy Policy')
  return (
    <>
      <PageHero title="Privacy Policy" sub={`Last updated: ${privacy.updated}`} hue={20} />
      <section className="sec sec--tight legal">
        <ol>
          {privacy.sections.map((s) => (
            <li key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}