// >>> CHANGED: new file (brand icons drawn inline so no lucide version issues)
const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const InstagramIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)

export const YouTubeIcon = (p) => (
  <svg {...base} {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
  </svg>
)

export const LogoMark = (p) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" {...p}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3.4" />
    <path d="M12 2l3.2 6.4M22 12l-6.6 2.6M12 22l-3.2-6.4M2 12l6.6-2.6" />
  </svg>
)