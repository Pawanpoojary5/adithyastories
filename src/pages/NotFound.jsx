import { Link } from 'react-router-dom'
import Media from '../components/Media.jsx'
import usePageTitle from '../lib/usePageTitle.js'

// >>> CHANGED: new page (replaces ComingSoon as the fallback route)
export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="nf">
      <div className="nf__bg" aria-hidden="true"><Media src={null} hue={22} /></div>
      <div className="nf__copy">
        <p className="nf__code">404</p>
        <p className="nf__text">The page you&rsquo;re looking for<br />seems to have vanished.</p>
        <Link to="/" className="pill">Back to Home</Link>
      </div>
    </section>
  )
}