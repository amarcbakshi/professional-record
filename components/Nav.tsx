'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/law-firms', label: 'Law Firms' },
  { href: '/tech', label: 'Tech' },
  { href: '/methodology', label: 'Methodology' },
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
          <div className="flex items-center gap-0">
            {links.map((link) => {
              const active = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
                  style={{
                    color: active ? 'var(--accent)' : 'var(--text-tertiary)',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
