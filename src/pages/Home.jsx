import { useEffect } from 'react'
import Hero from '../components/Hero.jsx'
import PhotosSection from '../components/PhotosSection.jsx'
import ReelsSection from '../components/ReelsSection.jsx'
import AboutTeaser from '../components/AboutTeaser.jsx'
import BookingCta from '../components/BookingCta.jsx'
import SectionIndex from '../components/SectionIndex.jsx'

// >>> CHANGED: Home is now a story: camera + photos (Hero) -> reels -> meet Adithya -> book
export default function Home() {
  useEffect(() => {
    document.title = 'Adithya Stories | Photography & Cinematic Films'
  }, [])
  return (
    <>
      <Hero />
      <PhotosSection />
      <ReelsSection />
      <AboutTeaser />
      <BookingCta />
      <SectionIndex />
    </>
  )
}