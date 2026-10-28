import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
// >>> CHANGED: all pages
import Portfolio from './pages/Portfolio.jsx'
import Project from './pages/Project.jsx'
import Films from './pages/Films.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Journal from './pages/Journal.jsx'
import JournalPost from './pages/JournalPost.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import NotFound from './pages/NotFound.jsx'
import ExitPopup from './components/ExitPopup.jsx' // >>> CHANGED
import FloatingBook from './components/FloatingBook.jsx' // >>> CHANGED

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // wait for the target section to mount, then scroll to it
    let tries = 0
    const t = setInterval(() => {
      const el = document.getElementById(hash.slice(1))
      if (el || ++tries > 20) {
        clearInterval(t)
        el?.scrollIntoView({ behavior: 'smooth' })
      }
    }, 50)
    return () => clearInterval(t)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* >>> CHANGED */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<Project />} />
          <Route path="/films" element={<Films />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ExitPopup /> {/* >>> CHANGED */}
      <FloatingBook /> {/* >>> CHANGED */}
    </>
  )
}