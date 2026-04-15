'use client'
import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { PrSector, PrOrganization } from '@/lib/types'
import { GRADE_META } from '@/lib/types'

const VALID_SECTORS = ['law-firms', 'tech']

function avgScore(org: PrOrganization, sector: PrSector): number {
  const scores = sector.dimensions.map((d) => org.dimension_scores[d.key] ?? 0).filter(Boolean)
  if (!scores.length) return 0
  return scores.reduce((a, b) => a + b, 0) / scores.length
}

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
  if (loading) return <div className="max-w-5xl mx-auto px-4 py-10 text-slate-500">Loading...</div>
  if (!sectorData) return <div className="max-w-5xl mx-auto px-4 py-10 text-slate-500">Sector not found.</div>

  const filtered = filter === 'All' ? orgs : orgs.filter((o) => o.grade === filter)
  const gradeGroups: Record<string, PrOrganization[]> = {}
  for (const org of filtered) {
    if (!gradeGroups[org.grade]) gradeGroups[org.grade] = []
    gradeGroups[org.grade].push(org)
  }

  const gradeCounts = ['A', 'B', 'C', 'D', 'F'].map((g) => ({
    grade: g,
    count: orgs.filter((o) => o.grade === g).length,
  })).filter((g) => g.count > 0)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <Link href="/" className="text-slate-500 hover:text-slate-300 text-sm mb-5 inline-block">← All sectors</Link>
        <h1 className="text-3xl font-bold text-white mb-2">{sectorData.name}</h1>
        <p className="text-slate-400 max-w-2xl leading-relaxed mb-4">{sectorData.description}</p>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Norm framework:</span>
          {sectorData.norm_url ? (
            <a href={sectorData.norm_url} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-400">
              {sectorData.norm_framework} ↗
            </a>
          ) : (
            <span className="text-sky-500">{sectorData.norm_framework}</span>
          )}
        </div>
      </div>

      {/* Grade summary bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-8 flex items-center gap-8">
        {gradeCounts.map(({ grade, count }) => {
          const meta = GRADE_META[grade]
          return (
            <div key={grade} className="text-center">
              <div className={`text-3xl font-black ${meta.color}`}>{count}</div>
              <div className="text-slate-500 text-xs mt-0.5">Grade {grade}</div>
            </div>
          )
        })}
        <div className="ml-auto text-slate-600 text-xs">{orgs.length} organizations rated</div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-8">
        {['All', 'A', 'B', 'C', 'D', 'F'].map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              filter === g ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {g === 'All' ? 'All' : `Grade ${g}`}
          </button>
        ))}
      </div>

      {/* Org list */}
      <div className="space-y-10">
        {['A', 'B', 'C', 'D', 'F'].map((grade) => {
          const group = gradeGroups[grade]
          if (!group || group.length === 0) return null
          const meta = GRADE_META[grade]
          return (
            <div key={grade}>
              <div className="flex items-baseline gap-3 mb-4 border-b border-slate-800 pb-2">
                <span className={`text-2xl font-black ${meta.color}`}>{grade}</span>
                <span className="text-slate-400 text-sm">{group[0]?.grade_label}</span>
                <span className="text-slate-700 text-xs ml-auto">{group.length} firm{group.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="space-y-3">
                {group.map((org) => (
                  <Link key={org.id} href={`/${sector}/${org.id}`} className="block group">
                    <div className={`${meta.bg} border ${meta.border} rounded-xl p-5 hover:brightness-110 transition-all`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-white font-semibold group-hover:text-sky-300 transition-colors">{org.name}</h2>
                            <span className={`text-xs font-semibold ${meta.color}`}>{org.grade_label}</span>
                          </div>
                          <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{org.summary}</p>
                        </div>
                        <div className={`ml-6 text-5xl font-black ${meta.color} leading-none flex-shrink-0`}>{org.grade}</div>
                      </div>

                      {/* Score bars */}
                      <div className="mt-4 flex gap-3">
                        {sectorData.dimensions.map((dim) => {
                          const score = org.dimension_scores[dim.key] ?? 0
                          return (
                            <div key={dim.key} className="flex-1">
                              <div className="text-slate-600 text-xs mb-1 truncate">{dim.label}</div>
                              <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((i) => (
                                  <div key={i} className={`h-1.5 flex-1 rounded-sm ${i <= score ? meta.bar : 'bg-slate-800'}`} />
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

      <div className="mt-12 border-t border-slate-800 pt-6">
        <p className="text-slate-700 text-xs">
          Ratings based on publicly available information as of April 2026. Each score reflects the gap between this organization&apos;s stated professional obligations and its documented behavior.{' '}
          <Link href="/methodology" className="text-sky-700 hover:text-sky-500">Read the methodology →</Link>
        </p>
      </div>
    </div>
  )
}
