import Link from 'next/link'

const sectors = [
  {
    href: '/law-firms',
    name: 'Law Firms',
    framework: 'ABA Model Rules of Professional Conduct',
    description: 'Are America\'s top law firms upholding their professional obligations under the ABA rules — or capitulating to political pressure in ways that violate their core duties to clients, courts, and the profession?',
    orgs: ['Perkins Coie', 'WilmerHale', 'Jenner & Block', 'Paul Weiss', 'Skadden', 'Kirkland & Ellis'],
    gradeCount: { A: 4, B: 0, C: 0, D: 8, F: 1 },
  },
  {
    href: '/tech',
    name: 'Tech Companies',
    framework: 'ACM Code of Ethics + Own Published Principles',
    description: 'Are major tech companies living up to their own AI ethics commitments, content integrity policies, and workforce obligations — or abandoning them under political and financial pressure?',
    orgs: ['Microsoft', 'Apple', 'Google', 'Meta', 'Amazon', 'Palantir'],
    gradeCount: { A: 0, B: 0, C: 3, D: 3, F: 0 },
  },
]

const GRADE_COLORS: Record<string, string> = {
  A: 'text-emerald-400', B: 'text-teal-400', C: 'text-yellow-400', D: 'text-orange-400', F: 'text-red-400',
}

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">

      {/* Hero */}
      <div className="mb-16 max-w-3xl">
        <p className="text-sky-500 text-sm font-medium tracking-widest uppercase mb-5">Professional Record</p>
        <h1 className="text-5xl font-bold text-white leading-tight mb-6">
          Holding institutions to the standards<br />
          of their <em className="not-italic text-sky-400">own</em> profession.
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed mb-4">
          Every major profession has published, codified ethical obligations. Law firms have the ABA Model Rules. Tech companies have the ACM Code of Ethics and their own stated principles. Universities have AAUP academic freedom commitments.
        </p>
        <p className="text-slate-400 leading-relaxed">
          This is not a political scorecard. The standards here are the institutions&rsquo; own — established before any crisis, by their own professional bodies. The question we ask is simple: <strong className="text-slate-200">are you living up to what you said you would do?</strong>
        </p>
      </div>

      {/* Sector cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {sectors.map((sector) => (
          <Link key={sector.href} href={sector.href} className="group bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-sky-700/50 transition-all">
            <div className="mb-5">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Sector</p>
              <h2 className="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors">{sector.name}</h2>
              <p className="text-sky-600 text-xs mt-1">{sector.framework}</p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{sector.description}</p>

            {/* Grade distribution */}
            <div className="flex items-center gap-4 mb-5">
              {Object.entries(sector.gradeCount).filter(([, n]) => n > 0).map(([g, n]) => (
                <div key={g} className="text-center">
                  <div className={`text-xl font-black ${GRADE_COLORS[g]}`}>{n}</div>
                  <div className="text-slate-600 text-xs">Grade {g}</div>
                </div>
              ))}
            </div>

            <div className="text-sky-500 text-sm font-medium group-hover:text-sky-400">
              View all ratings →
            </div>
          </Link>
        ))}
      </div>

      {/* Methodology teaser */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 mb-10">
        <div className="flex items-start justify-between">
          <div className="max-w-2xl">
            <h3 className="text-white font-semibold text-lg mb-2">How we score</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Each sector is scored against its own governing norms — not external political standards. Dimensions are derived directly from the published ethics documents of professional bodies. We cite specific rules and commitments for every score. Grades reflect the gap between stated obligations and revealed behavior, based entirely on public reporting and documentation.
            </p>
          </div>
          <Link href="/methodology" className="ml-6 flex-shrink-0 text-sky-500 text-sm hover:text-sky-400 whitespace-nowrap mt-1">
            Read methodology →
          </Link>
        </div>
      </div>

      <p className="text-slate-700 text-xs text-center">
        Professional Record is an independent project. All ratings are based on publicly available information as of April 2026.
      </p>
    </div>
  )
}
