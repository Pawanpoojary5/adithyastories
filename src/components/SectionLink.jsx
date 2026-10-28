import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

// >>> CHANGED: new file. End-of-section "visit" link so people click instead of scrolling.
export default function SectionLink({ to, kicker, children, tone }) {
  return (
    <Link to={to} className={`slink${tone ? ` slink--${tone}` : ''}`}>
      <span className="slink__k">{kicker}</span>
      <span className="slink__t">
        {children}
        <ArrowUpRight size={26} strokeWidth={1.4} />
      </span>
    </Link>
  )
}