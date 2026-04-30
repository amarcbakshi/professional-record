'use client'
import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { PrSector, PrOrganization } from '@/lib/types'
import { GRADE_META } from '@/lib/types'

const VALID_SECTORS = ['law-firms', 'tech']

export default function SectorPage() {
  const { sector } = useParams<{ sector: string }>()
  const [sectorData, setSectorData] = useState<PrSector | null>(null)
  const [orgs, setOrgs] = useState<PrOrganization[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    if (!VALID_SECTORS.includes(sector)) return
    async function load() {
      const { data: s } = await supabase.from('pr_sectors').select('*').eq('id', sector).single()
      const { data: o } = await supabase.from('pr_organizations').select('*').eq('sector_id', sector).order('grade').order('name')
      if (s) setSectorData(s)
      if (o) setOrgs(o)
      setLoading(false)
    }
    load()
  }, [sector])

  if (!VALID_SECTORS.includes(sector)) return notFound()

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    )
  }

  if (!sectorData) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Sector not found.</p>
      </div>
    )
  }

  const filtered = filter === 'All' ? orgs : orgs.filter((o) => o.grade === filter)
  const gradeGroups: Record<string, PrOrganization[]> = {}
  for (const org of filtered) {
    if (!gradeGroups[org.grade]) gradeGroups[org.grade] = []
    gradeGroups[org.grade].push(org)
  }

  const gradeCounts = ['A', 'B', 'C', 'D', 'F']
    .map((g) => ({ grade: g, count: orgs.filter((o) => o.grade === g).length }))
    .filter((g) => g.count > 0)

  return (
    <div>
      {/* Header */}
      <div
        className="max-w-7xl mx-auto px-6"
        style={{ paddingTop: 'clamp(3rem, 6vh, 5rem)', paddingBottom: 'clamp(2rem, 4vh, 3rem)' }}
      >
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-wider mb-8 inline-block"
          style={{ color: 'var(--text-muted)' }}
        >
          ← All sectors
        </Link>
        <h1
          className="font-bold mb-4"
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            color: 'var(--text-primary)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.05,
          }}
        >
          {sectorData.name}
        </h1>
        <p
          className="leading-relaxed mb-5"
          style={{ color: 'var(--text-tertiary)', maxWidth: '55ch' }}
        >
          {sectorData.description}
        </p>
        <div className="flex items-center gap-2 text-xs">
          <span style={{ color: 'var(--text-muted)' }}>Norm framework:</span>
          {sectorData.norm_url ? (
            <a
              href={sectorData.norm_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
              style={{ color: 'var(--accent)' }}
            >
              {sectorData.norm_framework} ↗
            </a>
          ) : (
            <span className="font-semibold" style={{ color: 'var(--accent)' }}>{sectorData.norm_framework}</span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <hr className="accent" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }} />
      </div>

      {/* Grade summary */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-baseline gap-10 mb-10">
          {gradeCounts.map(({ grade, count }) => (
            <div key={grade} className="text-center">
              <div
                className="font-bold"
                style={{
                  color: GRADE_META[grade].color,
                  fontFamily: 'var(--font-display), Georgia, serif',
                  fontSize: '3.5rem',
                  lineHeight: 1,
                }}
              >
                {count}
              </div>
              <div
                className="text-xs uppercase tracking-wide mt-1"
                style={{ color: 'var(--text-muted)' }}
              >
                Grade {grade}
              </div>
            </div>
          ))}
          <div
            className="ml-auto text-xs uppercase tracking-wide"
            style={{ color: 'var(--text-muted)' }}
          >
            {orgs.length} organizations rated
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-12">
          {['All', 'A', 'B', 'C', 'D', 'F'].map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
              style={{
                background: filter === g ? 'var(--accent)' : 'transparent',
                color: filter === g ? 'var(--on-accent)' : 'var(--text-muted)',
                border: filter === g ? 'none' : '2px solid var(--border)',
              }}
            >
              {g === 'All' ? 'All' : g}
            </button>
          ))}
        </div>
      </div>

      {/* Org list */}
      <div className="max-w-7xl mx-auto px-6" style={{ paddingBottom: 'clamp(4rem, 8vh, 6rem)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 5vh, 5rem)' }}>
          {['A', 'B', 'C', 'D', 'F'].map((grade) => {
            const group = gradeGroups[grade]
            if (!group || group.length === 0) return null
            const meta = GRADE_META[grade]
            return (
              <div key={grade}>
                {/* Grade group header */}
                <div
                  className="flex items-baseline gap-4 mb-6 pb-3"
                  style={{ borderBottom: `3px solid ${meta.color}` }}
                >
                  <span
                    className="font-bold"
                    style={{
                      color: meta.color,
                      fontFamily: 'var(--font-display), Georgia, serif',
                      fontSize: '3rem',
                      lineHeight: 1,
                    }}
                  >
                    {grade}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    {group[0]?.grade_label}
                  </span>
                  <span
                    className="text-xs ml-auto uppercase tracking-wide"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {group.length} firm{group.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Org rows */}
                {group.map((org) => (
                  <Link key={org.id} href={`/${sector}/${org.id}`} className="group block">
                    <div
                      className="py-7"
                      style={{ borderBottom: '1px solid var(--border)' }}
                    >
                      <div className="flex items-start justify-between gap-8">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-3 mb-3">
                            <h2
                              className="font-bold"
                              style={{ color: 'var(--text-primary)', fontSize: '1.25rem' }}
                            >
                              {org.name}
                            </h2>
                            <span
                              className="text-xs font-bold uppercase tracking-wider"
                              style={{ color: meta.color }}
                            >
                              {org.grade_label}
                            </span>
                          </div>
                          <p
                            className="text-sm leading-relaxed line-clamp-2"
                            style={{ color: 'var(--text-tertiary)', maxWidth: '55ch' }}
                          >
                            {org.summary}
                          </p>
                        </div>

                        {/* Giant grade letter */}
                        <div
                          className="font-bold leading-none flex-shrink-0"
                          style={{
                            color: meta.color,
                            fontFamily: 'var(--font-display), Georgia, serif',
                            fontSize: 'clamp(4rem, 8vw, 7rem)',
                            opacity: 0.7,
                          }}
                        >
                          {org.grade}
                        </div>
                      </div>

                      {/* Score bars — taller */}
                      <div className="mt-5 flex gap-5">
                        {sectorData.dimensions.map((dim) => {
                          const score = org.dimension_scores[dim.key] ?? 0
                          return (
                            <div key={dim.key} className="flex-1">
                              <div
                                className="text-xs mb-2 truncate"
                                style={{ color: 'var(--text-muted)' }}
                              >
                                {dim.label}
                              </div>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <div
                                    key={i}
                                    className="flex-1"
                                    style={{
                                      height: '6px',
                                      background: i <= score ? meta.bar : meta.barMuted,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-6" style={{ paddingBottom: '3rem' }}>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Ratings based on publicly available information as of April 2026.{' '}
            <Link href="/methodology" style={{ color: 'var(--accent)' }}>
              Read the methodology →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
