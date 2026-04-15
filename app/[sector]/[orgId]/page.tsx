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

  if (loading) return <div className="max-w-3xl mx-auto px-4 py-10 text-slate-500">Loading...</div>
  if (!org || !sectorData) return <div className="max-w-3xl mx-auto px-4 py-10 text-slate-500">Not found.</div>

  const meta = GRADE_META[org.grade] ?? GRADE_META['C']
  const scores = sectorData.dimensions.map((d) => org.dimension_scores[d.key] ?? 0).filter(Boolean)
  const avg = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '—'
  const events = Array.isArray(org.key_events) ? org.key_events : []
  const sources = Array.isArray(org.sources) ? org.sources : []

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href={`/${sector}`} className="text-slate-500 hover:text-slate-300 text-sm mb-6 inline-block">
        ← Back to {sectorData.name}
      </Link>

      {/* Hero card */}
      <div className={`${meta.bg} border ${meta.border} rounded-2xl p-8 mb-6`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">{sectorData.name}</p>
            <h1 className="text-3xl font-bold text-white mb-1">{org.name}</h1>
            <p className={`text-sm font-semibold ${meta.color}`}>{org.grade_label}</p>
          </div>
          <div className="text-right">
            <div className={`text-8xl font-black leading-none ${meta.color}`}>{org.grade}</div>
            <div className="text-slate-500 text-xs mt-1">{avg} / 5.0 avg</div>
          </div>
        </div>
        <p className="text-slate-300 leading-relaxed mt-5">{org.summary}</p>
      </div>

      {/* Norm framework banner */}
      <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl px-5 py-3 mb-6 flex items-center gap-3">
        <span className="text-slate-500 text-xs uppercase tracking-wide">Evaluated against</span>
        {sectorData.norm_url ? (
          <a href={sectorData.norm_url} target="_blank" rel="noopener noreferrer" className="text-sky-400 text-sm hover:text-sky-300">
            {sectorData.norm_framework} ↗
          </a>
        ) : (
          <span className="text-sky-400 text-sm">{sectorData.norm_framework}</span>
        )}
      </div>

      {/* Dimension scores */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <h2 className="text-white font-semibold text-lg mb-6">Score Breakdown</h2>
        <div className="space-y-6">
          {sectorData.dimensions.map((dim) => {
            const score = org.dimension_scores[dim.key] ?? 0
            return (
              <div key={dim.key}>
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="text-white text-sm font-medium">{dim.label}</span>
                    <span className="text-slate-600 text-xs ml-2">{dim.citation}</span>
                  </div>
                  <span className={`text-sm font-bold ${meta.color}`}>{score}/5</span>
                </div>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`h-2 flex-1 rounded ${i <= score ? meta.bar : 'bg-slate-800'}`} />
                  ))}
                </div>
                <p className="text-slate-600 text-xs">{dim.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
          <span className="text-slate-400 text-sm">Overall average</span>
          <div className="flex items-center gap-3">
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full ${meta.bar} rounded-full`} style={{ width: `${(parseFloat(avg) / 5) * 100}%` }} />
            </div>
            <span className={`font-bold ${meta.color}`}>{avg} / 5.0</span>
          </div>
        </div>
      </div>

      {/* Key events timeline */}
      {events.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold text-lg mb-5">Key Events</h2>
          <div className="space-y-0">
            {events.map((event, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${
                    event.type === 'positive' ? 'bg-emerald-500' :
                    event.type === 'negative' ? 'bg-red-500' : 'bg-slate-500'
                  }`} />
                  {i < events.length - 1 && <div className="w-px flex-1 bg-slate-800 min-h-[20px] mt-1" />}
                </div>
                <div className="pb-5">
                  <p className="text-slate-500 text-xs mb-1">{event.date}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-semibold text-lg mb-4">Sources</h2>
          <ul className="space-y-2">
            {sources.map((src, i) => (
              <li key={i}>
                <a href={src} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-400 text-sm break-all">
                  {src}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-slate-700 text-xs text-center">
        Last researched: {new Date(org.last_researched_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} ·{' '}
        <Link href="/methodology" className="hover:text-slate-500">Methodology</Link>
      </p>
    </div>
  )
}
