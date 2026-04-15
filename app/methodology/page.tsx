import Link from 'next/link'

const sectors = [
  {
    name: 'Law Firms',
    framework: 'ABA Model Rules of Professional Conduct',
    url: 'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/',
    dimensions: [
      { label: 'Professional Independence', citation: 'Rule 2.1', description: 'Lawyers must exercise independent professional judgment and render candid advice. An attorney who shapes legal advice to please a government official — or abandons clients under political pressure — violates this rule.' },
      { label: 'Rule of Law Commitment', citation: 'Rule 8.4', description: 'It is professional misconduct to engage in conduct prejudicial to the administration of justice. This includes assisting efforts to intimidate or undermine courts, legal processes, or other members of the profession.' },
      { label: 'Client Representation', citation: 'Rule 1.2', description: 'A lawyer shall abide by a client\'s decisions concerning the objectives of representation. External pressure — including from government actors — does not justify abandoning a client or limiting the scope of representation against their wishes.' },
      { label: 'Pro Bono Alignment', citation: 'Rule 6.1', description: 'Pro bono publici service should be provided to persons of limited means or to charitable, religious, civic, community, governmental, and educational organizations. Pro bono pledged as tribute to government actors to protect a firm\'s business interests is a perversion of this obligation.' },
      { label: 'Firm Independence', citation: 'Preamble', description: 'The legal profession\'s relative autonomy carries with it special responsibilities of self-government. The profession has a responsibility to assure that its regulations are conceived in the public interest and not for the furtherance of parochial or self-interested concerns.' },
    ],
  },
  {
    name: 'Tech Companies',
    framework: 'ACM Code of Ethics and Professional Conduct (2018) + Company-Published Principles',
    url: 'https://www.acm.org/code-of-ethics',
    dimensions: [
      { label: 'Stated Values Adherence', citation: 'Own Published Principles', description: 'Tech companies routinely publish ethics statements, responsible AI principles, and mission documents. We evaluate whether behavior is consistent with those stated commitments — using the company\'s own documents as the standard.' },
      { label: 'User Trust & Privacy', citation: 'ACM Code §1.6', description: 'Computing professionals should respect privacy. Organizations must be transparent about their data practices and not facilitate government access to user data outside proper legal process.' },
      { label: 'Content & Platform Integrity', citation: 'Own Content Policies', description: 'Companies that publish content moderation policies commit to applying them consistently. We evaluate whether policies are applied based on stated principles or adjusted based on political relationships.' },
      { label: 'Workforce Commitments', citation: 'Own DEI & HR Policies', description: 'Companies that publish DEI commitments, equitable hiring goals, or workforce protection policies make voluntary, binding commitments to their employees. We evaluate whether those commitments were maintained or abandoned under pressure.' },
      { label: 'AI Ethics', citation: 'Own AI Principles + ACM Code §2', description: 'Companies that publish AI safety principles, bias commitments, or responsible deployment frameworks make public commitments we evaluate against their product and research decisions.' },
    ],
  },
]

const SCALE = [
  { score: '5', label: 'Full compliance', description: 'Organization actively upholds this obligation; no documented violations; demonstrated commitment under pressure.' },
  { score: '4', label: 'Mostly upheld', description: 'Organization largely complies; minor gaps or ambiguities; no significant violations.' },
  { score: '3', label: 'Mixed record', description: 'Meaningful compliance in some areas, documented failures in others; the obligation is partially honored.' },
  { score: '2', label: 'Significant violations', description: 'Organization has materially breached this obligation; the gap between stated duty and documented behavior is clear.' },
  { score: '1', label: 'Obligation abandoned', description: 'Organization has effectively abandoned this obligation; the breach is significant, documented, and not corrected.' },
]

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="text-slate-500 hover:text-slate-300 text-sm mb-6 inline-block">← Home</Link>

      <h1 className="text-3xl font-bold text-white mb-3">Methodology</h1>
      <p className="text-slate-400 leading-relaxed mb-10">
        Professional Record evaluates institutions against the ethical obligations of their own professions — not against external political standards. The norms we use were written by professional bodies, ratified before any crisis, and apply regardless of the political environment. Our job is to document the gap between stated obligation and revealed behavior.
      </p>

      {/* Core principle */}
      <div className="bg-sky-950/40 border border-sky-800/30 rounded-2xl p-6 mb-10">
        <h2 className="text-sky-400 font-semibold mb-3">The core principle</h2>
        <p className="text-slate-300 leading-relaxed">
          Every organization we rate has published or adopted a set of professional obligations. Those documents — ABA Model Rules, ACM Code of Ethics, a company&rsquo;s own AI principles — are the baseline. We do not impose external political standards. We hold institutions to what they said they would do.
        </p>
      </div>

      {/* Scoring scale */}
      <div className="mb-10">
        <h2 className="text-white font-semibold text-xl mb-5">Scoring Scale (1–5 per dimension)</h2>
        <div className="space-y-3">
          {SCALE.map(({ score, label, description }) => (
            <div key={score} className="flex gap-4 bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-black text-white w-6 flex-shrink-0">{score}</div>
              <div>
                <p className="text-white text-sm font-medium mb-1">{label}</p>
                <p className="text-slate-500 text-sm">{description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-slate-600 text-xs mt-4">
          Letter grades are derived from average scores: A ≥ 4.5, B ≥ 3.5, C ≥ 2.5, D ≥ 1.5, F &lt; 1.5. Scores may be adjusted for systemic or disqualifying violations.
        </p>
      </div>

      {/* Sector frameworks */}
      {sectors.map((sector) => (
        <div key={sector.name} className="mb-10">
          <h2 className="text-white font-semibold text-xl mb-2">{sector.name}</h2>
          <a href={sector.url} target="_blank" rel="noopener noreferrer" className="text-sky-500 text-sm hover:text-sky-400 mb-5 inline-block">
            {sector.framework} ↗
          </a>
          <div className="space-y-4">
            {sector.dimensions.map((dim) => (
              <div key={dim.label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-white font-medium">{dim.label}</h3>
                  <span className="text-sky-600 text-xs">{dim.citation}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{dim.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Evidence standards */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold text-lg mb-4">Evidence standards</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-3">
          All scores are based on publicly available information: court filings, regulatory records, company announcements, earnings calls, news reporting from established outlets, and official statements. We link to primary sources wherever possible.
        </p>
        <p className="text-slate-400 text-sm leading-relaxed">
          We do not score on rumor, anonymous sourcing, or inference. If an organization believes a score is factually incorrect, we welcome corrections with supporting documentation.
        </p>
      </div>
    </div>
  )
}
