'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sectorLinks = [
  { href: '/law-firms', label: 'Law Firms' },
  { href: '/tech', label: 'Tech' },
  { href: '/media', label: 'Media' },
  { href: '/universities', label: 'Universities' },
  { href: '/consulting', label: 'Consulting' },
  { href: '/accounting', label: 'Accounting' },
  { href: '/hospitals', label: 'Hospitals' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <>
      {/* Red flag line */}
      <div style={{ height: '4px', background: 'var(--accent)' }} />
      <nav
        className="sticky top-0 z-50"
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-primary)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-3">
            <span
              className="font-bold tracking-tight"
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                color: 'var(--accent)',
                fontSize: '1.75rem',
                lineHeight: 1,
              }}
            >
              PR
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-0">
            {sectorLinks.map((link) => {
              const active = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2.5 py-2 font-semibold uppercase transition-colors"
                  style={{
                    color: active ? 'var(--accent)' : 'var(--text-tertiary)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
            <span style={{ color: 'var(--border)', margin: '0 0.25rem' }}>|</span>
            <Link
              href="/methodology"
              className="px-2.5 py-2 font-semibold uppercase transition-colors"
              style={{
                color: pathname.startsWith('/methodology') ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
              }}
            >
              Methodology
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
