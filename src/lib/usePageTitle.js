import { useEffect } from 'react'

// >>> CHANGED: new file
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Adithya Stories` : 'Adithya Stories | Photography & Cinematic Films'
  }, [title])
}