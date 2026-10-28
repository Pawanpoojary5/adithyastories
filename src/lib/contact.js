import { Phone, Mail, MessageCircle } from 'lucide-react'
import { site } from '../data/site.js'
import { InstagramIcon, YouTubeIcon } from '../components/Icons.jsx'

// >>> CHANGED: new file. Builds contact cards + social links from site.contact (empty values are skipped).
const digits = (s = '') => s.replace(/\D/g, '')
const handle = (s = '') => s.replace(/^@/, '')

export function contactMethods() {
  const { phone, email, whatsapp, instagram } = site.contact
  return [
    phone && { key: 'call', label: 'Call', value: phone, sub: '(Direct Call)', href: `tel:${phone.replace(/\s/g, '')}`, Icon: Phone },
    email && { key: 'email', label: 'Email', value: email, sub: '(Within 24hrs)', href: `mailto:${email}`, Icon: Mail },
    whatsapp && { key: 'wa', label: 'WhatsApp', value: whatsapp, sub: '(Chat on WhatsApp)', href: `https://wa.me/${digits(whatsapp)}`, Icon: MessageCircle },
    instagram && { key: 'ig', label: 'Instagram', value: `@${handle(instagram)}`, sub: 'Follow for updates', href: `https://instagram.com/${handle(instagram)}`, Icon: InstagramIcon },
  ].filter(Boolean)
}

export function socialLinks() {
  const { whatsapp, instagram, youtube } = site.contact
  return [
    instagram && { key: 'ig', label: 'Instagram', href: `https://instagram.com/${handle(instagram)}`, Icon: InstagramIcon },
    youtube && { key: 'yt', label: 'YouTube', href: youtube, Icon: YouTubeIcon },
    whatsapp && { key: 'wa', label: 'WhatsApp', href: `https://wa.me/${digits(whatsapp)}`, Icon: MessageCircle },
  ].filter(Boolean)
}