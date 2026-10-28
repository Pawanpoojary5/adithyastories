import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function ComingSoon() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = 'Coming soon | Adithya Stories'
  }, [])
  return (
    <section className="soon">
      <p className="soon__path">{pathname}</p>
      <h1>This page is being built.</h1>
      <p>The homepage comes first. This page is next on the list.</p>
      <Link to="/" className="soon__back">Back to home</Link>
    </section>
  )
}