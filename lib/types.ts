export type Dimension = {
  key: string
  label: string
  citation: string
  description: string
}

export type PrSector = {
  id: string
  name: string
  description: string
  norm_framework: string
  norm_url: string | null
  dimensions: Dimension[]
}

export type SourceLink = {
  url: string
  title: string
}

export type DimensionDetail = {
  rationale: string
  sources: SourceLink[]
}

export type KeyEvent = {
  date: string
  description: string
  type: 'positive' | 'negative' | 'neutral'
  source_url?: string
}

export type PrOrganization = {
  id: string
  name: string
  sector_id: string
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  grade_label: string
  summary: string
  dimension_scores: Record<string, number>
  dimension_details: Record<string, DimensionDetail>
  sources: (string | SourceLink)[]
  key_events: KeyEvent[]
  last_researched_at: string
  created_at: string
  updated_at: string
}

export const GRADE_META: Record<string, { color: string; bg: string; border: string; bar: string; ring: string }> = {
  A: { color: 'text-emerald-400', bg: 'bg-emerald-950/30', border: 'border-emerald-800/40', bar: 'bg-emerald-500', ring: 'ring-emerald-700/30' },
  B: { color: 'text-teal-400',    bg: 'bg-teal-950/30',    border: 'border-teal-800/40',    bar: 'bg-teal-500',    ring: 'ring-teal-700/30'    },
  C: { color: 'text-yellow-400',  bg: 'bg-yellow-950/30',  border: 'border-yellow-800/40',  bar: 'bg-yellow-500',  ring: 'ring-yellow-700/30'  },
  D: { color: 'text-orange-400',  bg: 'bg-orange-950/30',  border: 'border-orange-800/40',  bar: 'bg-orange-500',  ring: 'ring-orange-700/30'  },
  F: { color: 'text-red-400',     bg: 'bg-red-950/30',     border: 'border-red-900/40',     bar: 'bg-red-500',     ring: 'ring-red-700/30'     },
}
