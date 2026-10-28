// >>> CHANGED: new file. ALL inner-page content lives here.
// Every `src` / `cover` / `thumb` / `image` set to null shows a placeholder.
// Replace with real paths, e.g. '/photos/weddings/munnar-01.jpg'. Films: set `youtube` (video ID) or `video` (mp4 path).

const gallery = (n, hue) =>
  Array.from({ length: n }, (_, i) => ({ src: null, hue: hue + ((i * 7) % 24) - 8, alt: `Gallery photo ${i + 1}` }))

const STORY = [
  'Replace this with the story of the shoot: who they are, where it happened and what made the day special.',
  'Write a second paragraph about the moments you captured, the light, the place and the mood of the day.',
]

/* ---------------- Portfolio ---------------- */
export const categories = ['All', 'Weddings', 'Pre-Wedding', 'Couples', 'Portraits', 'Events']

export const projects = [
  { slug: 'journey-of-two-hearts', title: 'A Journey of Two Hearts', category: 'Weddings', kind: 'Wedding Story', location: 'Munnar, Kerala', hue: 22, shape: 'tall', cover: null, hero: null, story: STORY, gallery: gallery(8, 22) },
  { slug: 'golden-vows', title: 'Golden Vows', category: 'Weddings', kind: 'Wedding Story', location: 'Mangalore, Karnataka', hue: 28, shape: 'square', cover: null, hero: null, story: STORY, gallery: gallery(8, 28) },
  { slug: 'before-the-big-day', title: 'Before the Big Day', category: 'Pre-Wedding', kind: 'Pre-Wedding', location: 'Coorg, Karnataka', hue: 16, shape: 'wide', cover: null, hero: null, story: STORY, gallery: gallery(8, 16) },
  { slug: 'lakeside-promise', title: 'Lakeside Promise', category: 'Pre-Wedding', kind: 'Pre-Wedding', location: 'Chikmagalur', hue: 205, shape: 'tall', cover: null, hero: null, story: STORY, gallery: gallery(8, 205) },
  { slug: 'quiet-evenings', title: 'Quiet Evenings', category: 'Couples', kind: 'Couple Session', location: 'Udupi', hue: 24, shape: 'square', cover: null, hero: null, story: STORY, gallery: gallery(8, 24) },
  { slug: 'sunset-together', title: 'Sunset Together', category: 'Couples', kind: 'Couple Session', location: 'Gokarna', hue: 14, shape: 'tall', cover: null, hero: null, story: STORY, gallery: gallery(8, 14) },
  { slug: 'in-her-light', title: 'In Her Light', category: 'Portraits', kind: 'Portrait', location: 'Studio, Mangalore', hue: 30, shape: 'tall', cover: null, hero: null, story: STORY, gallery: gallery(8, 30) },
  { slug: 'the-quiet-gaze', title: 'The Quiet Gaze', category: 'Portraits', kind: 'Portrait', location: 'Moodbidri', hue: 20, shape: 'square', cover: null, hero: null, story: STORY, gallery: gallery(8, 20) },
  { slug: 'mehendi-nights', title: 'Mehendi Nights', category: 'Events', kind: 'Event Coverage', location: 'Bengaluru', hue: 12, shape: 'wide', cover: null, hero: null, story: STORY, gallery: gallery(8, 12) },
  { slug: 'hills-and-vows', title: 'Hills and Vows', category: 'Weddings', kind: 'Wedding Story', location: 'Wayanad, Kerala', hue: 140, shape: 'square', cover: null, hero: null, story: STORY, gallery: gallery(8, 140) },
  { slug: 'first-dance', title: 'First Dance', category: 'Events', kind: 'Event Coverage', location: 'Mysuru', hue: 26, shape: 'tall', cover: null, hero: null, story: STORY, gallery: gallery(8, 26) },
  { slug: 'monsoon-love', title: 'Monsoon Love', category: 'Couples', kind: 'Couple Session', location: 'Sakleshpur', hue: 170, shape: 'wide', cover: null, hero: null, story: STORY, gallery: gallery(8, 170) },
]

/* ---------------- Films ---------------- */
export const filmCategories = ['Wedding Films', 'Pre-Wedding Films', 'Event Films', 'Short Films']

export const reel = { title: 'Showreel', hue: 212, thumb: null, video: null, youtube: null }

export const films = [
  { slug: 'the-beginning', title: 'The Beginning', category: 'Wedding Films', label: 'Wedding Film', duration: '4:32', hue: 212, thumb: null, video: null, youtube: null, featured: true },
  { slug: 'love-in-motion', title: 'Love in Motion', category: 'Wedding Films', label: 'Wedding Film', duration: '3:45', hue: 218, thumb: null, video: null, youtube: null, featured: true },
  { slug: 'beyond-the-vows', title: 'Beyond the Vows', category: 'Pre-Wedding Films', label: 'Pre-Wedding', duration: '2:56', hue: 205, thumb: null, video: null, youtube: null, featured: true },
  { slug: 'moments', title: 'Moments', category: 'Event Films', label: 'Event Film', duration: '4:12', hue: 24, thumb: null, video: null, youtube: null, featured: true },
  { slug: 'forever-starts-here', title: 'Forever Starts Here', category: 'Wedding Films', label: 'Wedding Film', duration: '5:08', hue: 214, thumb: null, video: null, youtube: null },
  { slug: 'two-souls', title: 'Two Souls', category: 'Pre-Wedding Films', label: 'Pre-Wedding', duration: '3:20', hue: 200, thumb: null, video: null, youtube: null },
  { slug: 'the-celebration', title: 'The Celebration', category: 'Event Films', label: 'Event Film', duration: '3:58', hue: 18, thumb: null, video: null, youtube: null },
  { slug: 'a-day-in-frames', title: 'A Day in Frames', category: 'Short Films', label: 'Short Film', duration: '1:30', hue: 222, thumb: null, video: null, youtube: null },
  { slug: 'golden-hour', title: 'Golden Hour', category: 'Short Films', label: 'Short Film', duration: '0:58', hue: 28, thumb: null, video: null, youtube: null },
]

/* ---------------- Services ---------------- */
export const services = [
  { title: 'Wedding Photography', text: 'Candid, emotional and timeless coverage of your special day.', hue: 22 },
  { title: 'Pre-Wedding Photography', text: 'Beautiful stories before the big day.', hue: 150 },
  { title: 'Couple Sessions', text: 'Natural, intimate and full of love.', hue: 26 },
  { title: 'Portrait Photography', text: 'Authentic portraits that tell your story.', hue: 18 },
  { title: 'Event Coverage', text: 'From celebrations to corporate events.', hue: 14 },
  { title: 'Wedding Films', text: 'Cinematic films that bring your story to life.', hue: 214 },
]

/* ---------------- About ---------------- */
export const about = {
  image: null,
  intro: "I'm Adithya, a photographer and filmmaker who believes in authentic moments, natural expressions and the beauty of real stories.",
  philosophy: "Real moments. Real emotions. I believe in capturing what's genuine, not what's staged.",
  approach: ['Candid & Natural', 'Creative Storytelling', 'Attention to Detail', 'Comfortable & Fun'],
  quote: 'Photography is not just about what I see, but how I feel.',
  signature: 'Adithya',
  strip: [
    { src: null, hue: 22, alt: 'Behind the scenes 1' },
    { src: null, hue: 28, alt: 'Behind the scenes 2' },
    { src: null, hue: 16, alt: 'Behind the scenes 3' },
  ],
}

/* ---------------- Contact form ---------------- */
// mode: 'demo'     = no network; shows the thank-you state only (safe default)
//       'whatsapp' = opens WhatsApp with the enquiry text (needs site.contact.whatsapp)
//       'mailto'   = opens the visitor's email app (needs site.contact.email)
// For a real backend, replace the TODO inside src/pages/Contact.jsx.
export const enquiry = {
  mode: 'demo',
  countryCodes: ['+91', '+1', '+44', '+971'],
}

/* ---------------- Journal ---------------- */
export const journalTabs = ['All', 'Tips', 'Wedding Stories', 'Planning', 'Behind the Scenes']

const BODY = [
  'Replace this with your article. Start with the idea you want the reader to take away.',
  'Add the main points, a few examples from your own shoots and any practical advice.',
  'Close with a short note and an invitation to get in touch.',
]

export const posts = [
  { slug: '5-tips-for-stunning-wedding-photos', title: '5 Tips for Stunning Wedding Photos', category: 'Tips', date: '2026-10-12', read: '5 min read', hue: 24, image: null, featured: true, excerpt: 'Simple ways to get more natural, more emotional photographs on your wedding day.', body: BODY },
  { slug: 'prepare-for-a-pre-wedding-shoot', title: 'How to Prepare for a Perfect Pre-Wedding Shoot', category: 'Planning', date: '2026-10-05', read: '4 min read', hue: 18, image: null, excerpt: 'What to wear, when to shoot and how to feel relaxed in front of the camera.', body: BODY },
  { slug: 'magic-of-golden-hour', title: 'The Magic of Golden Hour Photography', category: 'Tips', date: '2026-09-28', read: '4 min read', hue: 30, image: null, excerpt: 'Why the hour after sunrise and before sunset changes everything.', body: BODY },
  { slug: 'a-day-in-my-life', title: 'Behind the Scenes: A Day in My Life', category: 'Behind the Scenes', date: '2026-09-20', read: '4 min read', hue: 14, image: null, excerpt: 'From the first light to the last edit, a day on a wedding shoot.', body: BODY },
  { slug: 'a-munnar-wedding-story', title: 'A Munnar Wedding Story', category: 'Wedding Stories', date: '2026-09-10', read: '6 min read', hue: 150, image: null, excerpt: 'Two families, one hill station and a very long golden evening.', body: BODY },
]

/* ---------------- Privacy ---------------- */
export const privacy = {
  updated: 'April 26, 2025',
  sections: [
    { h: 'Information We Collect', p: 'We collect information you provide through our contact form, including your name, email address, phone number, event details, and any other information you choose to share.' },
    { h: 'How We Use Your Information', p: 'To respond to your enquiries, provide our services, manage bookings, and improve our website and services.' },
    { h: 'Cookies and Tracking', p: 'We use cookies and similar technologies to enhance your experience, analyze website traffic and improve our services.' },
    { h: 'Third-Party Services', p: 'We may use third-party services like Google Analytics, YouTube, and social media platforms, which may collect information according to their own privacy policies.' },
    { h: 'Your Rights', p: 'You can request to access, update or delete your personal information at any time by contacting us.' },
    { h: 'Contact Us', p: 'If you have any questions about this Privacy Policy, please contact us using the details on our Contact page.' },
  ],
}

/* ---------------- Home scroll story ---------------- */
// >>> CHANGED: the 6 photos that "print" out of the camera on Home. Linked to their project pages.
// Replace `cover` on the projects above with real photos (4:5 crop works best) and they appear here automatically.
const EXIF = ['f/1.8 · 1/500 · ISO 100', 'f/2.0 · 1/320 · ISO 100', 'f/2.8 · 1/250 · ISO 200', 'f/1.4 · 1/800 · ISO 100', 'f/2.2 · 1/400 · ISO 160', 'f/1.8 · 1/640 · ISO 100']
export const storyPhotos = projects.slice(0, 2).map((p, i) => ({
      src: p.cover, hue: p.hue, title: p.title, place: p.location, to: `/portfolio/${p.slug}`, exif: EXIF[i],
}))

/* ---------------- Home reels (autoplay + sound) ---------------- */
// >>> CHANGED: put vertical mp4 files (9:16, ~720x1280, under 8 MB each) in /public/reels and set `src`.
// Example: src: '/reels/wedding-teaser.mp4', poster: '/reels/wedding-teaser.jpg'
export const reels = [
  { id: 'r1', title: 'Wedding Teaser', tag: 'Wedding Reel', src: null, poster: null, hue: 212 },
  { id: 'r2', title: 'Pre-Wedding Reel', tag: 'Pre-Wedding', src: null, poster: null, hue: 24 },
  { id: 'r3', title: 'Event Highlights', tag: 'Event Reel', src: null, poster: null, hue: 218 },
  { id: 'r4', title: 'Behind the Lens', tag: 'BTS', src: null, poster: null, hue: 18 },
]