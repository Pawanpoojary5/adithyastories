// All editable content for the homepage lives here.

export const site = {
  name: 'Adithya Stories',
  url: 'https://adithyastories.netlify.app',
  intro:
    "I'm Adithya, a photographer and filmmaker capturing real emotions, timeless moments and beautiful stories.",
  // >>> CHANGED: short hero tagline (Board 2)
  tagline: "Cinematic photography & films for life's most meaningful moments.",
  // Fill these in with real details. Empty values are hidden from the UI.
  // >>> CHANGED: PLACEHOLDERS from the design board. Replace with real details; empty values are hidden.
  contact: { phone: '+91 98765 43210', email: 'adithya@stories.com', whatsapp: '+91 98765 43210', instagram: 'adithya_stories', youtube: '' },
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Films', to: '/films' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Journal', to: '/journal' },
  { label: 'Contact', to: '/contact' },
]

// Floating photos in the 3D hero.
// PLACEHOLDERS: set `src` to a real image (e.g. '/photos/hero-1.jpg', 4:5 portrait crop,
// ~800x1000px) to replace the generated sunset art. Put files in /public/photos.
export const heroPhotos = [
  { src: null, hue: 24, alt: 'Placeholder photograph 1' },
  { src: null, hue: 16, alt: 'Placeholder photograph 2' },
  { src: null, hue: 30, alt: 'Placeholder photograph 3' },
  { src: null, hue: 12, alt: 'Placeholder photograph 4' },
  { src: null, hue: 28, alt: 'Placeholder photograph 5' },
  { src: null, hue: 20, alt: 'Placeholder photograph 6' },
]

// PLACEHOLDERS: set `image` to a real photo path (3:4 portrait) to replace the gradient.
export const featuredWorks = [
  { title: 'Weddings', to: '/portfolio', image: null, alt: '', hue: 22 },
  { title: 'Pre-Wedding', to: '/portfolio', image: null, alt: '', hue: 14 },
  { title: 'Couples', to: '/portfolio', image: null, alt: '', hue: 30 },
  { title: 'Portraits', to: '/portfolio', image: null, alt: '', hue: 18 },
]
// >>> CHANGED: "Meet Adithya" section on Home. `image` lives in /public/photos (currently a small 96px photo, so it is
// shown as a photographer ID card). Replace the file with a big portrait later for a larger layout.
export const aboutTeaser = {
  title: "Hi, I'm Adithya.",
  roles: ['Photographer', 'Reel shooter', 'Storyteller'],
  text: 'I capture real emotions, genuine moments and the small things people forget to notice. Weddings, pre-weddings, portraits and reels, shot to feel like memories, not poses.',
  image: '/photos/adithya.png',
  alt: 'Adithya with his camera by the sea',
  stats: [
    { value: '10+', label: 'Years' },
    { value: '100+', label: 'Happy Clients' },
    { value: '300+', label: 'Projects' },
  ],
}