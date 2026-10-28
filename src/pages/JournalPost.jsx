import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Media from '../components/Media.jsx'
import NotFound from './NotFound.jsx'
import usePageTitle from '../lib/usePageTitle.js'
import { posts } from '../data/content.js'
import { fmtDate } from './Journal.jsx'

// >>> CHANGED: new page (single article)
export default function JournalPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  usePageTitle(post ? post.title : 'Not found')
  if (!post) return <NotFound />

  return (
    <article className="article">
      <Link to="/journal" className="article__back"><ArrowLeft size={15} /> Journal</Link>
      <p className="article__meta">{post.category} · {fmtDate(post.date)} · {post.read}</p>
      <h1 className="article__title">{post.title}</h1>
      <div className="article__img"><Media src={post.image} hue={post.hue} alt={post.title} /></div>
      {post.body.map((t, i) => <p key={i}>{t}</p>)}
    </article>
  )
}