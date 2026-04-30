import { notFound } from 'next/navigation'
import Link from 'next/link'
import { stories } from '@/lib/stories'

const GRADE_COLORS: Record<string, string> = {
  A: 'var(--grade-a)',
  B: 'var(--grade-b)',
  C: 'var(--grade-c)',
  D: 'var(--grade-d)',
  F: 'var(--grade-f)',
}

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }))
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const story = stories.find((s) => s.slug === slug)
  if (!story) return notFound()

  const color = GRADE_COLORS[story.grade] ?? 'var(--text-primary)'

  return (
    <div>
      {/* Hero */}
      <section
        style={{ paddingTop: 'clamp(3rem, 6vh, 5rem)' }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/stories"
            className="text-xs font-semibold uppercase tracking-wider mb-8 inline-block"
            style={{ color: 'var(--text-muted)' }}
          >
            ← All Stories
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--accent)' }}
            >
              {story.sector}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>·</span>
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color }}
            >
              Grade {story.grade}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>·</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {story.readTime}
            </span>
          </div>

          <div className="flex items-start justify-between gap-6" style={{ position: 'relative' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h1
                className="font-bold mb-4"
                style={{
                  fontFamily: 'var(--font-display), Georgia, serif',
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: 1.05,
                  maxWidth: '18ch',
                }}
              >
                {story.title}
              </h1>
              <p
                className="leading-relaxed"
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.15rem',
                  lineHeight: 1.7,
                  maxWidth: '45ch',
                }}
              >
                {story.subtitle}
              </p>
            </div>

            {/* Massive grade letter */}
            <div
              className="hidden md:block flex-shrink-0"
              style={{
                fontSize: 'clamp(8rem, 18vw, 14rem)',
                fontFamily: 'var(--font-display), Georgia, serif',
                fontWeight: 700,
                color,
                lineHeight: 0.8,
                opacity: 0.5,
                marginTop: '-1rem',
              }}
            >
              {story.grade}
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote band */}
      <section
        className="red-band"
        style={{
          marginTop: 'clamp(2.5rem, 5vh, 4rem)',
          marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
        }}
      >
        <div
          className="max-w-4xl mx-auto px-6"
          style={{ padding: 'clamp(2rem, 4vh, 3rem) 1.5rem' }}
        >
          <blockquote
            className="leading-relaxed"
            style={{
              color: 'var(--on-accent)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 1.7,
              maxWidth: '55ch',
              fontStyle: 'italic',
              fontFamily: 'var(--font-display), Georgia, serif',
            }}
          >
            &ldquo;{story.coverQuote}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Article body */}
      <section style={{ paddingBottom: 'clamp(3rem, 6vh, 5rem)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div style={{ maxWidth: '65ch' }}>
            {story.body.map((paragraph, i) => {
              // Check if this paragraph contains the overall grade line
              const isGradeLine = paragraph.startsWith('Overall grade:')
              const isScoreLine = paragraph.startsWith('Professional Record scores')

              if (isGradeLine) {
                return (
                  <p
                    key={i}
                    className="font-bold"
                    style={{
                      color,
                      fontSize: '1.15rem',
                      lineHeight: 1.7,
                      marginBottom: '1.75rem',
                      fontFamily: 'var(--font-display), Georgia, serif',
                    }}
                  >
                    {paragraph}
                  </p>
                )
              }

              if (isScoreLine) {
                return (
                  <p
                    key={i}
                    className="leading-relaxed"
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      lineHeight: 1.8,
                      marginBottom: '1.75rem',
                      padding: '1.25rem 1.5rem',
                      background: 'var(--bg-secondary)',
                      borderRadius: '4px',
                      border: `1px solid ${color}`,
                    }}
                  >
                    {paragraph}
                  </p>
                )
              }

              return (
                <p
                  key={i}
                  className="leading-relaxed"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    marginBottom: '1.75rem',
                  }}
                >
                  {paragraph}
                </p>
              )
            })}
          </div>
        </div>
      </section>

      {/* Org card CTA */}
      <section style={{ paddingBottom: 'clamp(3rem, 6vh, 5rem)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <hr className="accent" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }} />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                Full scorecard
              </p>
              <p className="font-bold" style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontFamily: 'var(--font-display), Georgia, serif' }}>
                {story.orgName}
              </p>
            </div>
            <Link
              href={`/${story.sectorId}/${story.orgId}`}
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: 'var(--accent)' }}
            >
              View scores →
            </Link>
          </div>
        </div>
      </section>

      {/* More stories */}
      <section style={{ paddingBottom: 'clamp(3rem, 6vh, 5rem)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-6" style={{ color: 'var(--text-muted)' }}>
              More stories
            </p>
            <div className="flex flex-col gap-4">
              {stories
                .filter((s) => s.slug !== story.slug)
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/stories/${s.slug}`}
                    className="flex items-baseline justify-between gap-4 py-3 group"
                    style={{ borderBottom: '1px solid var(--border)' }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-bold"
                        style={{
                          color: GRADE_COLORS[s.grade],
                          fontFamily: 'var(--font-display), Georgia, serif',
                          fontSize: '1.5rem',
                        }}
                      >
                        {s.grade}
                      </span>
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {s.title}
                      </span>
                    </div>
                    <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                      {s.readTime}
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Published date */}
      <div className="max-w-4xl mx-auto px-6" style={{ paddingBottom: '2rem' }}>
        <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
          Published {story.publishedAt} ·{' '}
          <Link href="/methodology" style={{ color: 'var(--accent)' }}>
            Methodology
          </Link>
        </p>
      </div>
    </div>
  )
}
