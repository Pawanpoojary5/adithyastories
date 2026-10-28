import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import usePageTitle from '../lib/usePageTitle.js'
import { contactMethods } from '../lib/contact.js'
import { site } from '../data/site.js'
import { enquiry, services } from '../data/content.js'

// >>> CHANGED: new page
export default function Contact() {
  usePageTitle('Contact')
  const [params] = useSearchParams()
  const [sent, setSent] = useState(false)
  const methods = contactMethods()
  const preset = params.get('service') || ''

  const onSubmit = (e) => {
    e.preventDefault()
    const d = Object.fromEntries(new FormData(e.currentTarget))
    const text = [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Phone: ${d.code} ${d.phone}`,
      `Service: ${d.service}`,
      d.date && `Event date: ${d.date}`,
      d.location && `Location: ${d.location}`,
      `Message: ${d.message}`,
    ].filter(Boolean).join('\n')

    // TODO: for a real backend, POST `d` to your API here (e.g. fetch('/api/enquiry', ...)).
    if (enquiry.mode === 'whatsapp' && site.contact.whatsapp) {
      window.open(`https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    } else if (enquiry.mode === 'mailto' && site.contact.email) {
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent('New enquiry')}&body=${encodeURIComponent(text)}`
    }
    setSent(true)
  }

  return (
    <>
      <PageHero title={'Let\u2019s Create\nSomething Beautiful'} sub="Have a project in mind? I'd love to hear from you. Get in touch and let's bring your vision to life." hue={205} />

      <section className="sec sec--tight">
        {methods.length > 0 && (
          <ul className="cm">
            {methods.map(({ key, label, value, sub, href, Icon }) => (
              <li key={key}>
                <a href={href} target={key === 'call' || key === 'email' ? undefined : '_blank'} rel="noopener noreferrer">
                  <span className="cm__icon"><Icon size={18} /></span>
                  <span className="cm__text"><b>{label}</b><span>{value}</span><small>{sub}</small></span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="paper formcard">
          <h2 className="formcard__title">Send a Message</h2>
          {sent ? (
            <div className="formcard__done" role="status">
              <p>Thank you!</p>
              <span>We&rsquo;ll get back to you within 24 hours.</span>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="form">
              <label className="field"><span>Name *</span><input name="name" required autoComplete="name" placeholder="Your name" /></label>
              <label className="field"><span>Email *</span><input name="email" type="email" required autoComplete="email" placeholder="your@email.com" /></label>
              <div className="field">
                <span>Phone Number *</span>
                <div className="phone">
                  <select name="code" aria-label="Country code" defaultValue={enquiry.countryCodes[0]}>
                    {enquiry.countryCodes.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <input name="phone" type="tel" required autoComplete="tel-national" placeholder="Phone number" aria-label="Phone number" />
                </div>
              </div>
              <label className="field">
                <span>Service Required *</span>
                <select name="service" required defaultValue={preset}>
                  <option value="" disabled>Select service</option>
                  {services.map((s) => <option key={s.title}>{s.title}</option>)}
                </select>
              </label>
              <label className="field"><span>Event Date</span><input name="date" type="date" /></label>
              <label className="field"><span>Event Location</span><input name="location" placeholder="City, venue or location" /></label>
              <label className="field field--full"><span>Message *</span><textarea name="message" rows="4" required placeholder="Tell me about your vision..." /></label>
              <label className="check field--full">
                <input type="checkbox" required /> <span>I agree to the <Link to="/privacy">privacy policy</Link></span>
              </label>
              <button type="submit" className="btn-dark field--full">Send Message</button>
              <p className="form__note field--full">We&rsquo;ll get back to you within 24 hours. Thank you!</p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}