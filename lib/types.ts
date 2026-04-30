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

export type KeyEvent = {
  date: string
  description: string
  type: 'positive' | 'negative' | 'neutral'
}

export type PrOrganization = {
  id: string
  name: string
  sector_id: string
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  grade_label: string
  summary: string
  dimension_scores: Record<string, number>
  sources: string[]
  key_events: KeyEvent[]
  last_researched_at: string
  created_at: string
  updated_at: string
}

/* Grade visuals tuned for light cream background */
export const GRADE_META: Record<string, {
  color: string
  bg: string
  border: string
  bar: string
  barMuted: string
  ring: string
}> = {
  A: {
    color: 'var(--grade-a)',
    bg: 'var(--grade-a-bg)',
    border: 'var(--grade-a)',
    bar: 'var(--grade-a)',
    barMuted: 'var(--grade-a-bg)',
    ring: 'var(--grade-a)',
  },
  B: {
    color: 'var(--grade-b)',
    bg: 'var(--grade-b-bg)',
    border: 'var(--grade-b)',
    bar: 'var(--grade-b)',
    barMuted: 'var(--grade-b-bg)',
    ring: 'var(--grade-b)',
  },
  C: {
    color: 'var(--grade-c)',
    bg: 'var(--grade-c-bg)',
    border: 'var(--grade-c)',
    bar: 'var(--grade-c)',
    barMuted: 'var(--grade-c-bg)',
    ring: 'var(--grade-c)',
  },
  D: {
    color: 'var(--grade-d)',
    bg: 'var(--grade-d-bg)',
    border: 'var(--grade-d)',
    bar: 'var(--grade-d)',
    barMuted: 'var(--grade-d-bg)',
    ring: 'var(--grade-d)',
  },
  F: {
    color: 'var(--grade-f)',
    bg: 'var(--grade-f-bg)',
    border: 'var(--grade-f)',
    bar: 'var(--grade-f)',
    barMuted: 'var(--grade-f-bg)',
    ring: 'var(--grade-f)',
  },
}
