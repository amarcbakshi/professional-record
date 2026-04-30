'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { PrSector, PrOrganization } from '@/lib/types'
import { GRADE_META } from '@/lib/types'

export default function OrgDetailPage() {
  const { sector, orgId } = useParams<{ sector: string; orgId: string }>()
  const [sectorData, setSectorData] = useState<PrSector | null>(null)
  const [org, setOrg] = useState<PrOrganization | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: s }, { data: o }] = await Promise.all([
        supabase.from('pr_sectors').select('*').eq('id', sector).single(),
        supabase.from('pr_organizations').select('*').eq('id', orgId).single(),
      ])
      if (s) setSectorData(s)
      if (o) setOrg(o)
      setLoading(false)
    }
    load()
  }, [sector, orgId])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    )
  }

  if (!org || !sectorData) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Not found.</p>
      </div>
    )
  }

  const meta = GRADE_META[org.grade] ?? GRADE_META['C']
  const scores = sectorData.dimensions.map((d) => org.dimension_scores[d.key] ?? 0).filter(Boolean)
  const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '—'
  const events = Array.isArray(org.key_events) ? org.key_events : []
  const sources = Array.isArray(org.sources) ? org.sources : []

  return (
    <div>
      {/* Hero — dramatic grade letter */}
      <div
        className="max-w-5xl mx-auto px-6"
        style={{ paddingTop: 'clamp(3rem, 6vh, 5rem)' }}
      >
        <Link
          href={`/${sector}`}
          className="text-xs font-semibold uppercase tracking-wider mb-8 inline-block"
          style={{ color: 'var(--text-muted)' }}
        >
          ← Back to {sectorData.name}
        </Link>

        <div className="flex items-start justify-between gap-8" style={{ position: 'relative' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p
              className="font-semibold uppercase mb-3"
              style={{ color: 'var(--accent)', fontSize: '0.65rem', letterSpacing: '0.2em' }}
            >
              {sectorData.name}
            </p>
            <h1
              className="font-bold mb-3"
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                color: 'var(--text-primary)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.05,
              }}
            >
              {org.name}
            </h1>
            <p
              className="font-bold uppercase tracking-wider"
              style={{ color: meta.color, fontSize: '0.8rem' }}
            >
              {org.grade_label}
            </p>
          </div>

          {/* Massive grade letter — the focal point */}
          <div
            className="flex-shrink-0 hidden md:block"
            style={{
              fontSize: 'clamp(8rem, 18vw, 14rem)',
              fontFamily: 'var(--font-display), Georgia, serif',
              fontWeight: 700,
              color: meta.color,
              lineHeight: 0.8,
              opacity: 0.75,
              marginTop: '-1rem',
              marginRight: '-0.5rem',
            }}
          >
            {org.grade}
          </div>
        </div>

        <hr className="accent" style={{ margin: 'clamp(1.5rem, 3vh, 2.5rem) 0' }} />

        <p
          className="leading-relaxed"
          style={{
            color: 'var(--text-secondary)',
            maxWidth: '60ch',
            fontSize: '1.05rem',
            lineHeight: 1.75,
          }}
        >
          {org.summary}
        </p>
      </div>

      {/* Norm framework banner */}
      <div
        className="max-w-5xl mx-auto px-6"
        style={{ paddingTop: 'clamp(2rem, 4vh, 3rem)' }}
      >
        <div
          className="px-5 py-3 flex items-center gap-3"
          style={{
            background: 'var(--bg-secondary)',
            border: '2px solid var(--border)',
          }}
        >
          <span
            className="text-xs uppercase tracking-wider font-semibold"
            style={{ color: 'var(--text-muted)' }}
          >
            Evaluated against
          </span>
          {sectorData.norm_url ? (
            <a
              href={sectorData.norm_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold"
              style={{ color: 'var(--accent)' }}
            >
              {sectorData.norm_framework} ↗
            </a>
          ) : (
            <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
              {sectorData.norm_framework}
            </span>
          )}
        </div>
      </div>

      {/* Scores + Events layout */}
      <div
        className="max-w-5xl mx-auto px-6 grid md:grid-cols-5 gap-12"
        style={{ paddingTop: 'clamp(2.5rem, 5vh, 4rem)', paddingBottom: 'clamp(3rem, 6vh, 5rem)' }}
      >
        {/* Score Breakdown — 3 cols */}
        <div className="md:col-span-3">
          <h2
            className="font-bold mb-8"
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              color: 'var(--text-primary)',
              fontSize: '1.5rem',
            }}
          >
            Score Breakdown
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {sectorData.dimensions.map((dim) => {
              const score = org.dimension_scores[dim.key] ?? 0
              return (
                <div key={dim.key}>
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span
                        className="font-semibold"
                        style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}
                      >
                        {dim.label}
                      </span>
                      <span
                        className="text-xs ml-2 uppercase tracking-wider"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {dim.citation}
                      </span>
                    </div>
                    <span
                      className="font-bold"
                      style={{
                        color: meta.color,
                        fontFamily: 'var(--font-display), Georgia, serif',
                        fontSize: '1.25rem',
                      }}
                    >
                      {score}/5
                    </span>
                  </div>
                  <div className="flex gap-1.5 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="flex-1"
                        style={{
                          height: '8px',
                          background: i <= score ? meta.bar : meta.barMuted,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {dim.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Overall average */}
          <div
            className="mt-10 pt-6 flex items-center justify-between"
            style={{ borderTop: '2px solid var(--border)' }}
          >
            <span className="text-sm font-semibold" style={{ color: 'var(--text-tertiary)' }}>
              Overall average
            </span>
            <div className="flex items-center gap-4">
              <div
                className="w-36 overflow-hidden"
                style={{ height: '8px', background: meta.barMuted }}
              >
                <div
                  style={{
                    height: '100%',
                    background: meta.bar,
                    width: `${(parseFloat(avg) / 5) * 100}%`,
                  }}
                />
              </div>
              <span
                className="font-bold"
                style={{
                  color: meta.color,
                  fontFamily: 'var(--font-display), Georgia, serif',
                  fontSize: '1.5rem',
                }}
              >
                {avg}
              </span>
            </div>
          </div>
        </div>

        {/* Key Events — 2 cols */}
        {events.length > 0 && (
          <div className="md:col-span-2">
            <h2
              className="font-bold mb-8"
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                color: 'var(--text-primary)',
                fontSize: '1.5rem',
              }}
            >
              Key Events
            </h2>
            <div>
              {events.map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-2.5 h-2.5 mt-1.5 flex-shrink-0"
                      style={{
                        background:
                          event.type === 'positive'
                            ? 'var(--grade-a)'
                            : event.type === 'negative'
                              ? 'var(--accent)'
                              : 'var(--text-muted)',
                      }}
                    />
                    {i < events.length - 1 && (
                      <div
                        className="w-px flex-1 min-h-[16px] mt-1"
                        style={{ background: 'var(--border)' }}
                      />
                    )}
                  </div>
                  <div className="pb-6">
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {event.date}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sources */}
      {sources.length > 0 && (
        <div className="max-w-5xl mx-auto px-6" style={{ paddingBottom: 'clamp(3rem, 6vh, 5rem)' }}>
          <hr className="accent" style={{ marginBottom: '2rem' }} />
          <h2
            className="font-bold mb-5"
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              color: 'var(--text-primary)',
              fontSize: '1.25rem',
            }}
          >
            Sources
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {sources.map((src, i) => (
              <li key={i} className="flex items-baseline gap-3">
                <span
                  className="text-xs font-bold flex-shrink-0"
                  style={{ color: 'var(--accent)' }}
                >
                  {i + 1}.
                </span>
                <a
                  href={typeof src === 'string' ? src : (src as { url: string }).url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm break-all"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {typeof src === 'string' ? src : (src as { title?: string; url: string }).title || (src as { url: string }).url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-5xl mx-auto px-6" style={{ paddingBottom: '2rem' }}>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
            Last researched:{' '}
            {new Date(org.last_researched_at).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}{' '}
            ·{' '}
            <Link href="/methodology" style={{ color: 'var(--accent)' }}>
              Methodology
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
