'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/law-firms', label: 'Law Firms' },
  { href: '/tech', label: 'Tech Companies' },
  { href: '/methodology', label: 'Methodology' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-primary)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <span
            className="font-bold text-xl tracking-tight"
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              color: 'var(--accent)',
            }}
          >
            PR
          </span>
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Professional Record
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => {
            const active = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm transition-colors"
                style={{
                  color: active ? 'var(--accent)' : 'var(--text-secondary)',
                  fontWeight: active ? 600 : 400,
                  textDecoration: active ? 'underline' : 'none',
                  textDecorationColor: active ? 'var(--accent)' : 'transparent',
                  textUnderlineOffset: '4px',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
