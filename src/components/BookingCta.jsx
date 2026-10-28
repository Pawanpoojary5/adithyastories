import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { contactMethods } from '../lib/contact.js'

// >>> CHANGED: new file. Final booking section on Home (id="book").
export default function BookingCta() {
  const wa = contactMethods().find((m) => m.key === 'wa')
  const waHref = wa ? `${wa.href}?text=${encodeURIComponent("Hi Adithya, I'd like to book a shoot.")}` : null

  return (
    <section id="book" className="book grain" aria-labelledby="book-title">
      <div className="book__leak" aria-hidden="true" />
      <p className="mono">Now booking · weddings, pre-weddings, portraits &amp; reels</p>
      <h2 id="book-title" className="book__title">Your story<br />is next.</h2>
      <p className="book__text">Tell me the date and the dream. I&rsquo;ll take care of the frames.</p>
      <div className="book__actions">
        <Link to="/contact" className="book__btn">
          <span className="book__ring" aria-hidden="true" />
          Book Now
        </Link>
        {waHref && (
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="book__wa">
            <MessageCircle size={16} /> WhatsApp me
          </a>
        )}
      </div>
    </section>
  )
}