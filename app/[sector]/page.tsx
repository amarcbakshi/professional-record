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
      <div className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading...</p>
      </div>
    )
  }

  if (!sectorData) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20">
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
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/"
          className="text-sm mb-6 inline-block transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          ← All sectors
        </Link>
        <h1
          className="text-4xl font-bold mb-3"
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            color: 'var(--text-primary)',
          }}
        >
          {sectorData.name}
        </h1>
        <p
          className="leading-relaxed mb-4"
          style={{ color: 'var(--text-tertiary)', maxWidth: '60ch' }}
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
              style={{ color: 'var(--accent)' }}
            >
              {sectorData.norm_framework} ↗
            </a>
          ) : (
            <span style={{ color: 'var(--accent)' }}>{sectorData.norm_framework}</span>
          )}
        </div>
      </div>

      <hr className="accent" style={{ marginBottom: '2rem' }} />

      {/* Grade summary */}
      <div className="flex items-center gap-8 mb-8">
        {gradeCounts.map(({ grade, count }) => (
          <div key={grade} className="text-center">
            <div
              className="text-3xl font-bold"
              style={{ color: GRADE_META[grade].color }}
            >
              {count}
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Grade {grade}
            </div>
          </div>
        ))}
        <div className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
          {orgs.length} organizations rated
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-10">
        {['All', 'A', 'B', 'C', 'D', 'F'].map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className="px-3 py-1.5 text-sm font-medium transition-colors"
            style={{
              background: filter === g ? 'var(--accent)' : 'transparent',
              color: filter === g ? '#fff' : 'var(--text-tertiary)',
              border: filter === g ? 'none' : '1px solid var(--border)',
              borderRadius: '2px',
            }}
          >
            {g === 'All' ? 'All' : `Grade ${g}`}
          </button>
        ))}
      </div>

      {/* Org list */}
      <div className="space-y-12">
        {['A', 'B', 'C', 'D', 'F'].map((grade) => {
          const group = gradeGroups[grade]
          if (!group || group.length === 0) return null
          const meta = GRADE_META[grade]
          return (
            <div key={grade}>
              {/* Grade group header */}
              <div
                className="flex items-baseline gap-3 mb-5 pb-2"
                style={{ borderBottom: `2px solid ${meta.color}` }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{ color: meta.color, fontFamily: 'var(--font-display), Georgia, serif' }}
                >
                  {grade}
                </span>
                <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  {group[0]?.grade_label}
                </span>
                <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>
                  {group.length} firm{group.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Org rows */}
              <div className="space-y-0">
                {group.map((org) => (
                  <Link key={org.id} href={`/${sector}/${org.id}`} className="group block">
                    <div
                      className="py-6 transition-colors"
                      style={{
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-3 mb-2">
                            <h2
                              className="text-lg font-bold transition-colors"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {org.name}
                            </h2>
                            <span
                              className="text-xs font-semibold"
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

                        {/* Large grade letter */}
                        <div
                          className="text-6xl font-bold leading-none flex-shrink-0"
                          style={{
                            color: meta.color,
                            fontFamily: 'var(--font-display), Georgia, serif',
                            opacity: 0.8,
                          }}
                        >
                          {org.grade}
                        </div>
                      </div>

                      {/* Score bars */}
                      <div className="mt-4 flex gap-4">
                        {sectorData.dimensions.map((dim) => {
                          const score = org.dimension_scores[dim.key] ?? 0
                          return (
                            <div key={dim.key} className="flex-1">
                              <div
                                className="text-xs mb-1.5 truncate"
                                style={{ color: 'var(--text-muted)' }}
                              >
                                {dim.label}
                              </div>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <div
                                    key={i}
                                    className="h-1.5 flex-1"
                                    style={{
                                      background: i <= score ? meta.bar : meta.barMuted,
                                      borderRadius: '1px',
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
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-16 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Ratings based on publicly available information as of April 2026.
          Each score reflects the gap between this organization's stated
          professional obligations and its documented behavior.{' '}
          <Link href="/methodology" style={{ color: 'var(--accent)' }}>
            Read the methodology →
          </Link>
        </p>
      </div>
    </div>
  )
}
