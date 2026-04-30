import Link from 'next/link'

const sectors = [
  {
    href: '/law-firms',
    name: 'Law Firms',
    framework: 'ABA Model Rules of Professional Conduct',
    description:
      "Are America's top law firms upholding their professional obligations under the ABA rules, or capitulating to political pressure in ways that violate their core duties to clients, courts, and the profession?",
    count: 13,
    gradeCount: { A: 4, D: 8, F: 1 },
  },
  {
    href: '/tech',
    name: 'Tech Companies',
    framework: 'ACM Code of Ethics + Own Published Principles',
    description:
      'Are major tech companies living up to their own AI ethics commitments, content integrity policies, and workforce obligations, or abandoning them under political and financial pressure?',
    count: 6,
    gradeCount: { C: 3, D: 3 },
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
    <div>
      {/* Hero — dramatic scale */}
      <section style={{ padding: 'clamp(4rem, 10vh, 8rem) 0 clamp(3rem, 8vh, 6rem)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <p
            className="font-semibold uppercase mb-8"
            style={{
              color: 'var(--accent)',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
            }}
          >
            Professional Record
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              color: 'var(--text-primary)',
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              fontWeight: 700,
              lineHeight: 1,
              maxWidth: '16ch',
              marginBottom: 'clamp(2rem, 5vh, 4rem)',
            }}
          >
            Holding institutions to the standards of their{' '}
            <em
              style={{
                color: 'var(--accent)',
                fontStyle: 'italic',
              }}
            >
              own
            </em>{' '}
            profession.
          </h1>
        </div>
      </section>

      {/* Red band — committed, full-bleed */}
      <section className="red-band">
        <div
          className="max-w-7xl mx-auto px-6"
          style={{ padding: 'clamp(2.5rem, 5vh, 4rem) 1.5rem' }}
        >
          <div style={{ maxWidth: '60ch' }}>
            <p
              className="leading-relaxed"
              style={{
                color: 'var(--on-accent)',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                lineHeight: 1.7,
              }}
            >
              Every major profession has published, codified ethical obligations.
              Law firms have the ABA Model Rules. Tech companies have the ACM Code
              of Ethics and their own stated principles. This is not a political
              scorecard. The question is simple:{' '}
              <strong style={{ fontWeight: 700 }}>
                are you living up to what you said you would do?
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* Sector sections — full-width, stacked */}
      <section style={{ paddingTop: 'clamp(4rem, 8vh, 7rem)' }}>
        {sectors.map((sector, i) => (
          <Link
            key={sector.href}
            href={sector.href}
            className="group block"
            style={{
              borderBottom: i < sectors.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div
              className="max-w-7xl mx-auto px-6"
              style={{ padding: 'clamp(3rem, 6vh, 5rem) 1.5rem' }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                <div className="flex-1">
                  <p
                    className="font-semibold uppercase mb-3"
                    style={{
                      color: 'var(--accent)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                    }}
                  >
                    {sector.framework}
                  </p>
                  <h2
                    className="font-bold mb-4"
                    style={{
                      fontFamily: 'var(--font-display), Georgia, serif',
                      color: 'var(--text-primary)',
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      lineHeight: 1.1,
                    }}
                  >
                    {sector.name}
                  </h2>
                  <p
                    className="leading-relaxed"
                    style={{
                      color: 'var(--text-tertiary)',
                      maxWidth: '50ch',
                      fontSize: '0.95rem',
                    }}
                  >
                    {sector.description}
                  </p>

                  {/* Grade distribution */}
                  <div className="flex items-center gap-8 mt-8">
                    {Object.entries(sector.gradeCount)
                      .filter(([, n]) => n > 0)
                      .map(([g, n]) => (
                        <div key={g} className="flex items-baseline gap-2">
                          <span
                            className="font-bold"
                            style={{
                              color: GRADE_DOT_COLORS[g],
                              fontFamily: 'var(--font-display), Georgia, serif',
                              fontSize: '2.5rem',
                              lineHeight: 1,
                            }}
                          >
                            {n}
                          </span>
                          <span
                            className="text-xs uppercase tracking-wide"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {g}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Large count on the right */}
                <div
                  className="hidden md:block flex-shrink-0"
                  style={{
                    fontSize: 'clamp(6rem, 12vw, 10rem)',
                    fontFamily: 'var(--font-display), Georgia, serif',
                    fontWeight: 700,
                    color: 'var(--border)',
                    lineHeight: 0.85,
                  }}
                >
                  {sector.count}
                </div>
              </div>

              <div className="mt-8">
                <span
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--accent)' }}
                >
                  View all ratings →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* How we score */}
      <section style={{ paddingTop: 'clamp(4rem, 8vh, 6rem)', paddingBottom: 'clamp(2rem, 4vh, 3rem)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <hr className="accent" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }} />
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div style={{ maxWidth: '55ch' }}>
              <h3
                className="font-bold mb-3"
                style={{
                  fontFamily: 'var(--font-display), Georgia, serif',
                  color: 'var(--text-primary)',
                  fontSize: '1.25rem',
                }}
              >
                How we score
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                Each sector is scored against its own governing norms, not external
                political standards. Dimensions are derived directly from the
                published ethics documents of professional bodies. Grades reflect the
                gap between stated obligations and revealed behavior.
              </p>
            </div>
            <Link
              href="/methodology"
              className="flex-shrink-0 text-sm font-semibold uppercase tracking-wider"
              style={{ color: 'var(--accent)' }}
            >
              Methodology →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ paddingBottom: 'clamp(2rem, 4vh, 3rem)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <hr style={{ border: 'none', height: '1px', background: 'var(--border)', marginBottom: '1.5rem' }} />
          <div className="flex flex-col md:flex-row md:justify-between gap-2">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Professional Record is an independent project. All ratings based
              on publicly available information as of April 2026.
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
