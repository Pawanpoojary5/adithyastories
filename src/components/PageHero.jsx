import Media from './Media.jsx'

// >>> CHANGED: new file. Shared hero for inner pages. Set `image` to a real photo later.
export default function PageHero({ title, sub, hue = 22, image = null, tone, crumb, children }) {
  const lines = title.split('\n')
  return (
    <section className={`phero${tone ? ` phero--${tone}` : ''}`}>
      <div className="phero__art" aria-hidden="true">
        <Media src={image} hue={hue} />
      </div>
      <div className="phero__shade" aria-hidden="true" />
      <div className="phero__copy">
        {crumb && <div className="phero__crumb">{crumb}</div>}
        <h1 className="phero__title">
          {lines.map((l, i) => (
            <span key={i} className="phero__line">{l}</span>
          ))}
        </h1>
        {sub && <p className="phero__sub">{sub}</p>}
        {children}
      </div>
    </section>
  )
}