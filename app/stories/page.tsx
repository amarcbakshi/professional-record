import Link from 'next/link'
import { stories } from '@/lib/stories'

const GRADE_COLORS: Record<string, string> = {
  A: 'var(--grade-a)',
  B: 'var(--grade-b)',
  C: 'var(--grade-c)',
  D: 'var(--grade-d)',
  F: 'var(--grade-f)',
}

export default function StoriesPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ paddingTop: 'clamp(3rem, 6vh, 5rem)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wider mb-8 inline-block"
            style={{ color: 'var(--text-muted)' }}
          >
            ← Home
          </Link>
          <h1
            className="font-bold mb-5"
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              color: 'var(--text-primary)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: 1.05,
            }}
          >
            Stories
          </h1>
          <p
            className="leading-relaxed"
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '55ch',
              fontSize: '1.05rem',
              lineHeight: 1.75,
            }}
          >
            Long-form investigations into how specific institutions upheld or
            abandoned the professional obligations they adopted. Recognition
            where it is earned. Accountability where it is due.
          </p>
        </div>
      </section>

      {/* Story cards */}
      <section
        style={{
          paddingTop: 'clamp(3rem, 6vh, 5rem)',
          paddingBottom: 'clamp(4rem, 8vh, 6rem)',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          {stories.map((story, i) => (
            <Link key={story.slug} href={`/stories/${story.slug}`} className="group block">
              <article
                style={{
                  borderTop: i === 0 ? '5px solid var(--accent)' : '1px solid var(--border)',
                  paddingTop: 'clamp(2rem, 4vh, 3rem)',
                  paddingBottom: 'clamp(2rem, 4vh, 3rem)',
                }}
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: 'var(--accent)' }}
                      >
                        {story.sector}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        ·
                      </span>
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: GRADE_COLORS[story.grade] }}
                      >
                        Grade {story.grade}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        ·
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {story.readTime}
                      </span>
                    </div>
                    <h2
                      className="font-bold mb-3"
                      style={{
                        fontFamily: 'var(--font-display), Georgia, serif',
                        color: 'var(--text-primary)',
                        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                        lineHeight: 1.15,
                      }}
                    >
                      {story.title}
                    </h2>
                    <p
                      className="leading-relaxed mb-4"
                      style={{
                        color: 'var(--text-tertiary)',
                        maxWidth: '50ch',
                        fontSize: '0.95rem',
                      }}
                    >
                      {story.subtitle}
                    </p>
                    <span
                      className="text-sm font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--accent)' }}
                    >
                      Read →
                    </span>
                  </div>

                  {/* Grade letter */}
                  <div
                    className="hidden md:block flex-shrink-0"
                    style={{
                      fontSize: 'clamp(5rem, 10vw, 8rem)',
                      fontFamily: 'var(--font-display), Georgia, serif',
                      fontWeight: 700,
                      color: GRADE_COLORS[story.grade],
                      lineHeight: 0.85,
                      opacity: 0.6,
                    }}
                  >
                    {story.grade}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="max-w-5xl mx-auto px-6" style={{ paddingBottom: '2rem' }}>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
            All stories based on publicly available information.{' '}
            <Link href="/methodology" style={{ color: 'var(--accent)' }}>
              Read the methodology →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
