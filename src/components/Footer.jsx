import { Link } from 'react-router-dom'
import { navLinks, site } from '../data/site.js'
import { socialLinks } from '../lib/contact.js' // >>> CHANGED
import { LogoMark } from './Icons.jsx' // >>> CHANGED

export default function Footer() {
  const socials = socialLinks() // >>> CHANGED
  return (
    <footer className="footer">
      <div className="footer__top">
        <p className="footer__logo"><LogoMark /> <span>ADITHYA STORIES</span></p>
        <nav aria-label="Footer">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
        </nav>
        {socials.length > 0 && (
          <div className="footer__social">
            {socials.map(({ key, label, href, Icon }) => (
              <a key={key} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon /></a>
            ))}
          </div>
        )}
      </div>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
    </footer>
  )
}