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
      <div className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    )
  }

  if (!org || !sectorData) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
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
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href={`/${sector}`}
        className="text-sm mb-8 inline-block"
        style={{ color: 'var(--text-muted)' }}
      >
        ← Back to {sectorData.name}
      </Link>

      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-start justify-between gap-8">
          <div>
            <p
              className="text-xs font-semibold tracking-[0.15em] uppercase mb-2"
              style={{ color: 'var(--accent)' }}
            >
              {sectorData.name}
            </p>
            <h1
              className="text-4xl font-bold mb-2"
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                color: 'var(--text-primary)',
              }}
            >
              {org.name}
            </h1>
            <p className="text-sm font-semibold" style={{ color: meta.color }}>
              {org.grade_label}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div
              className="leading-none"
              style={{
                fontSize: 'clamp(5rem, 10vw, 8rem)',
                fontFamily: 'var(--font-display), Georgia, serif',
                fontWeight: 700,
                color: meta.color,
                opacity: 0.85,
              }}
            >
              {org.grade}
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {avg} / 5.0 avg
            </div>
          </div>
        </div>

        <hr className="accent" style={{ margin: '1.5rem 0' }} />

        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)', maxWidth: '60ch' }}>
          {org.summary}
        </p>
      </div>

      {/* Norm framework */}
      <div
        className="px-5 py-3 mb-10 flex items-center gap-3"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
        }}
      >
        <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
          Evaluated against
        </span>
        {sectorData.norm_url ? (
          <a
            href={sectorData.norm_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm"
            style={{ color: 'var(--accent)' }}
          >
            {sectorData.norm_framework} ↗
          </a>
        ) : (
          <span className="text-sm" style={{ color: 'var(--accent)' }}>
            {sectorData.norm_framework}
          </span>
        )}
      </div>

      {/* Two-column layout: scores + events */}
      <div className="grid md:grid-cols-5 gap-10 mb-12">
        {/* Score Breakdown — takes 3 cols */}
        <div className="md:col-span-3">
          <h2
            className="text-lg font-bold mb-6"
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              color: 'var(--text-primary)',
            }}
          >
            Score Breakdown
          </h2>
          <div className="space-y-6">
            {sectorData.dimensions.map((dim) => {
              const score = org.dimension_scores[dim.key] ?? 0
              return (
                <div key={dim.key}>
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {dim.label}
                      </span>
                      <span className="text-xs ml-2" style={{ color: 'var(--text-muted)' }}>
                        {dim.citation}
                      </span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: meta.color }}>
                      {score}/5
                    </span>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-2 flex-1"
                        style={{
                          background: i <= score ? meta.bar : meta.barMuted,
                          borderRadius: '1px',
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {dim.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Average bar */}
          <div
            className="mt-8 pt-5 flex items-center justify-between"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Overall average
            </span>
            <div className="flex items-center gap-3">
              <div
                className="w-32 h-2 rounded-full overflow-hidden"
                style={{ background: meta.barMuted }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    background: meta.bar,
                    width: `${(parseFloat(avg) / 5) * 100}%`,
                  }}
                />
              </div>
              <span className="font-bold" style={{ color: meta.color }}>
                {avg} / 5.0
              </span>
            </div>
          </div>
        </div>

        {/* Key Events — takes 2 cols */}
        {events.length > 0 && (
          <div className="md:col-span-2">
            <h2
              className="text-lg font-bold mb-6"
              style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                color: 'var(--text-primary)',
              }}
            >
              Key Events
            </h2>
            <div className="space-y-0">
              {events.map((event, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
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
                  <div className="pb-5">
                    <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
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
        <div className="mb-12">
          <hr style={{ border: 'none', height: '1px', background: 'var(--border)', marginBottom: '1.5rem' }} />
          <h2
            className="text-lg font-bold mb-4"
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              color: 'var(--text-primary)',
            }}
          >
            Sources
          </h2>
          <ul className="space-y-2">
            {sources.map((src, i) => (
              <li key={i} className="flex items-baseline gap-2">
                <span className="text-xs font-medium flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                  {i + 1}.
                </span>
                <a
                  href={typeof src === 'string' ? src : (src as { url: string }).url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm break-all"
                  style={{ color: 'var(--accent)' }}
                >
                  {typeof src === 'string' ? src : (src as { title?: string; url: string }).title || (src as { url: string }).url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
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
  )
}
