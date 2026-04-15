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
    <nav className="border-b border-slate-800 bg-slate-950/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-sky-500 font-black text-lg tracking-tight">PR</span>
          <span className="text-white font-semibold text-sm tracking-tight">Professional Record</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded text-sm transition-colors ${
                pathname.startsWith(link.href)
                  ? 'bg-sky-500/15 text-sky-400 font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
