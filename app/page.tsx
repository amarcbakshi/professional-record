import Link from 'next/link'

const sectors = [
  {
    href: '/law-firms',
    name: 'Law Firms',
    framework: 'ABA Model Rules of Professional Conduct',
    description:
      "Are America's top law firms upholding their professional obligations under the ABA rules, or capitulating to political pressure in ways that violate their core duties to clients, courts, and the profession?",
    gradeCount: { A: 4, B: 0, C: 0, D: 8, F: 1 },
  },
  {
    href: '/tech',
    name: 'Tech Companies',
    framework: 'ACM Code of Ethics + Own Published Principles',
    description:
      'Are major tech companies living up to their own AI ethics commitments, content integrity policies, and workforce obligations, or abandoning them under political and financial pressure?',
    gradeCount: { A: 0, B: 0, C: 3, D: 3, F: 0 },
  },
]

const GRADE_DOT_COLORS: Record<string, string> = {
  A: 'var(--grade-a)',
  B: 'var(--grade-b)',
  C: 'var(--grade-c)',
  D: 'var(--grade-d)',
  F: 'var(--grade-f)',
}

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Hero */}
      <section className="pt-20 pb-16">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
          style={{ color: 'var(--accent)' }}
        >
          Professional Record
        </p>
        <h1
          className="leading-[1.05] mb-8"
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            color: 'var(--text-primary)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            maxWidth: '20ch',
          }}
        >
          Holding institutions to the standards of their{' '}
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>own</em>{' '}
          profession.
        </h1>

        <hr className="accent" style={{ maxWidth: '100%', marginBottom: '2rem' }} />

        <div style={{ maxWidth: '65ch' }}>
          <p
            className="text-lg leading-relaxed mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            Every major profession has published, codified ethical obligations.
            Law firms have the ABA Model Rules. Tech companies have the ACM Code
            of Ethics and their own stated principles. Universities have AAUP
            academic freedom commitments.
          </p>
          <p className="leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
            This is not a political scorecard. The standards here are the
            institutions' own, established before any crisis, by their own
            professional bodies. The question we ask is simple:{' '}
            <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              are you living up to what you said you would do?
            </strong>
          </p>
        </div>
      </section>

      {/* Sector cards — asymmetric grid inspired by OUTFIT */}
      <section className="pb-16">
        <div className="grid md:grid-cols-2 gap-px" style={{ background: 'var(--border)' }}>
          {sectors.map((sector) => (
            <Link
              key={sector.href}
              href={sector.href}
              className="group block"
              style={{ background: 'var(--bg-primary)' }}
            >
              <div className="p-8 md:p-10">
                <p
                  className="text-xs font-semibold tracking-[0.15em] uppercase mb-3"
                  style={{ color: 'var(--accent)' }}
                >
                  Sector
                </p>
                <h2
                  className="text-2xl font-bold mb-2 transition-colors"
                  style={{
                    fontFamily: 'var(--font-display), Georgia, serif',
                    color: 'var(--text-primary)',
                  }}
                >
                  {sector.name}
                </h2>
                <p className="text-xs mb-5" style={{ color: 'var(--accent)' }}>
                  {sector.framework}
                </p>
                <p
                  className="text-sm leading-relaxed mb-8"
                  style={{ color: 'var(--text-tertiary)', maxWidth: '45ch' }}
                >
                  {sector.description}
                </p>

                {/* Grade distribution — dots + numbers */}
                <div className="flex items-center gap-5 mb-6">
                  {Object.entries(sector.gradeCount)
                    .filter(([, n]) => n > 0)
                    .map(([g, n]) => (
                      <div key={g} className="flex items-center gap-2">
                        <span
                          className="text-2xl font-bold"
                          style={{ color: GRADE_DOT_COLORS[g] }}
                        >
                          {n}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Grade {g}
                        </span>
                      </div>
                    ))}
                </div>

                <span
                  className="text-sm font-medium transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  View all ratings →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Methodology teaser */}
      <section className="pb-16">
        <hr className="accent" style={{ marginBottom: '2rem' }} />
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div style={{ maxWidth: '55ch' }}>
            <h3
              className="text-lg font-bold mb-3"
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                color: 'var(--text-primary)',
              }}
            >
              How we score
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              Each sector is scored against its own governing norms, not external
              political standards. Dimensions are derived directly from the
              published ethics documents of professional bodies. Grades reflect the
              gap between stated obligations and revealed behavior, based entirely
              on public reporting and documentation.
            </p>
          </div>
          <Link
            href="/methodology"
            className="flex-shrink-0 text-sm font-medium"
            style={{ color: 'var(--accent)' }}
          >
            Read methodology →
          </Link>
        </div>
      </section>

      {/* Footer line */}
      <footer className="pb-12">
        <hr style={{ border: 'none', height: '1px', background: 'var(--border)', marginBottom: '1.5rem' }} />
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Professional Record is an independent project. All ratings are based
            on publicly available information as of April 2026.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
