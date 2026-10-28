// >>> CHANGED: new file. Shows a real image when `src` is set, otherwise a generated placeholder.
// Parent should be position:relative with a size or aspect-ratio.
export default function Media({ src, alt = '', hue = 22, className = '', style, ...rest }) {
  if (src) {
    return <img className={`media ${className}`} src={src} alt={alt} loading="lazy" style={style} {...rest} />
  }
  return <span className={`media ph ${className}`} style={{ '--h': hue, ...style }} aria-hidden="true" {...rest} />
}