import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// >>> CHANGED: new file. Floating "Book Now" pill. On Home it waits until the pinned photo story is finished.
export default function FloatingBook() {
  const { pathname } = useLocation()
  const [on, setOn] = useState(false)

  useEffect(() => {
    const run = () => {
      const story = document.querySelector('.story')
      const past = !story || story.getBoundingClientRect().bottom < window.innerHeight * 0.9
      setOn(past && window.scrollY > window.innerHeight * 0.4)
    }
    run()
    window.addEventListener('scroll', run, { passive: true })
    window.addEventListener('resize', run)
    return () => {
      window.removeEventListener('scroll', run)
      window.removeEventListener('resize', run)
    }
  }, [pathname])

  if (pathname === '/contact') return null
  return (
    <Link to="/contact" className={`fbook${on ? ' is-on' : ''}`} tabIndex={on ? 0 : -1}>
      <i aria-hidden="true" /> Book Now
    </Link>
  )
}