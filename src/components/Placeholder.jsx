import { useId } from 'react'

// Reusable image placeholder. Draws a small sunset / couple / portrait scene as SVG.
// It fills its parent (parent must be position: relative with a size).
// Used until you set a real image path. scene: 'sun' | 'duo' | 'face'
export default function Placeholder({ scene = 'sun', hue = 22 }) {
  const id = useId().replace(/:/g, '')
  const sky = `hsl(${hue} 80% 55%)`
  const skyTop = `hsl(${hue - 6} 70% 12%)`
  const warm = `hsl(${hue + 14} 95% 66%)`
  const ground = `hsl(${hue - 8} 55% 5%)`

  return (
    <svg
      className="ph"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`s${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={skyTop} />
          <stop offset="0.62" stopColor={sky} />
          <stop offset="1" stopColor={warm} />
        </linearGradient>
        <radialGradient id={`g${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff4d6" stopOpacity="0.95" />
          <stop offset="0.35" stopColor={warm} stopOpacity="0.55" />
          <stop offset="1" stopColor={warm} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#s${id})`} />

      {scene === 'sun' && (
        <>
          <circle cx="250" cy="300" r="150" fill={`url(#g${id})`} />
          <path d="M0 360 L90 290 L170 350 L260 270 L400 360 V500 H0Z" fill={`hsl(${hue - 4} 45% 9%)`} opacity="0.85" />
          <path d="M0 420 L110 350 L210 410 L320 340 L400 400 V500 H0Z" fill={ground} />
        </>
      )}

      {scene === 'duo' && (
        <>
          <circle cx="200" cy="270" r="170" fill={`url(#g${id})`} />
          <path d="M0 400 L120 340 L240 390 L400 330 V500 H0Z" fill={`hsl(${hue - 4} 45% 9%)`} opacity="0.8" />
          <rect y="410" width="400" height="90" fill={ground} />
          {/* two figures */}
          <circle cx="172" cy="298" r="15" fill={ground} />
          <path d="M150 322 q22 -8 44 0 l10 110 h-64z" fill={ground} />
          <circle cx="226" cy="308" r="13" fill={ground} />
          <path d="M207 330 q19 -7 38 0 l8 102 h-54z" fill={ground} />
        </>
      )}

      {scene === 'face' && (
        <>
          <rect width="400" height="500" fill={`hsl(${hue} 50% 7%)`} opacity="0.55" />
          <circle cx="230" cy="220" r="200" fill={`url(#g${id})`} opacity="0.8" />
          <circle cx="200" cy="215" r="62" fill={ground} />
          <path d="M60 500 q10 -150 140 -160 q130 10 140 160z" fill={ground} />
        </>
      )}
    </svg>
  )
}