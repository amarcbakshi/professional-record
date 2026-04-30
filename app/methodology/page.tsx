import Link from 'next/link'

const sectors = [
  {
    name: 'Law Firms',
    framework: 'ABA Model Rules of Professional Conduct',
    url: 'https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/',
    dimensions: [
      { label: 'Professional Independence', citation: 'Rule 2.1', description: "Lawyers must exercise independent professional judgment and render candid advice. An attorney who shapes legal advice to please a government official, or abandons clients under political pressure, violates this rule." },
      { label: 'Rule of Law Commitment', citation: 'Rule 8.4', description: 'It is professional misconduct to engage in conduct prejudicial to the administration of justice. This includes assisting efforts to intimidate or undermine courts, legal processes, or other members of the profession.' },
      { label: 'Client Representation', citation: 'Rule 1.2', description: "A lawyer shall abide by a client's decisions concerning the objectives of representation. External pressure does not justify abandoning a client or limiting the scope of representation against their wishes." },
      { label: 'Pro Bono Alignment', citation: 'Rule 6.1', description: "Pro bono publici service should be provided to persons of limited means or to charitable, religious, civic, community, governmental, and educational organizations. Pro bono pledged as tribute to government actors to protect a firm's business interests is a perversion of this obligation." },
      { label: 'Firm Independence', citation: 'Preamble', description: "The legal profession's relative autonomy carries with it special responsibilities of self-government. The profession has a responsibility to assure that its regulations are conceived in the public interest and not for the furtherance of parochial or self-interested concerns." },
    ],
  },
  {
    name: 'Tech Companies',
    framework: 'ACM Code of Ethics and Professional Conduct (2018) + Company-Published Principles',
    url: 'https://www.acm.org/code-of-ethics',
    dimensions: [
      { label: 'Stated Values Adherence', citation: 'Own Published Principles', description: "Tech companies routinely publish ethics statements, responsible AI principles, and mission documents. We evaluate whether behavior is consistent with those stated commitments, using the company's own documents as the standard." },
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
    <div>
      {/* Header */}
      <div
        className="max-w-5xl mx-auto px-6"
        style={{ paddingTop: 'clamp(3rem, 6vh, 5rem)' }}
      >
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-wider mb-8 inline-block"
          style={{ color: 'var(--text-muted)' }}
        >
          ← Home
        </Link>

        <h1
          className="font-bold mb-5"
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            color: 'var(--text-primary)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 1.05,
          }}
        >
          Methodology
        </h1>
        <p
          className="leading-relaxed"
          style={{ color: 'var(--text-secondary)', maxWidth: '60ch', fontSize: '1.05rem', lineHeight: 1.75 }}
        >
          Professional Record evaluates institutions against the ethical
          obligations of their own professions, not against external political
          standards. The norms we use were written by professional bodies, ratified
          before any crisis, and apply regardless of the political environment.
        </p>
      </div>

      {/* Core principle — red band, full bleed, committed */}
      <section
        className="red-band"
        style={{ marginTop: 'clamp(2.5rem, 5vh, 4rem)', marginBottom: 'clamp(3rem, 6vh, 5rem)' }}
      >
        <div
          className="max-w-5xl mx-auto px-6"
          style={{ padding: 'clamp(2.5rem, 5vh, 4rem) 1.5rem' }}
        >
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              color: 'var(--on-accent)',
              fontSize: '1.5rem',
            }}
          >
            The core principle
          </h2>
          <p
            className="leading-relaxed"
            style={{ color: 'var(--on-accent)', maxWidth: '55ch', fontSize: '1.05rem', lineHeight: 1.75 }}
          >
            Every organization we rate has published or adopted a set of
            professional obligations. Those documents are the baseline. We do not
            impose external political standards. We hold institutions to what they
            said they would do.
          </p>
        </div>
      </section>

      {/* Scoring scale */}
      <div className="max-w-5xl mx-auto px-6" style={{ paddingBottom: 'clamp(3rem, 6vh, 5rem)' }}>
        <h2
          className="font-bold mb-8"
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            color: 'var(--text-primary)',
            fontSize: '1.5rem',
          }}
        >
          Scoring Scale
        </h2>
        <div>
          {SCALE.map(({ score, label, description }) => (
            <div
              key={score}
              className="flex gap-6 py-5"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div
                className="font-bold flex-shrink-0"
                style={{
                  fontFamily: 'var(--font-display), Georgia, serif',
                  color: 'var(--accent)',
                  fontSize: '2.5rem',
                  lineHeight: 1,
                  width: '2.5rem',
                  textAlign: 'center',
                }}
              >
                {score}
              </div>
              <div>
                <p
                  className="font-semibold mb-1"
                  style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}
                >
                  {label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-5" style={{ color: 'var(--text-muted)' }}>
          Letter grades derived from averages: A ≥ 4.5, B ≥ 3.5, C ≥ 2.5, D ≥ 1.5, F &lt; 1.5.
        </p>
      </div>

      {/* Sector frameworks */}
      {sectors.map((sector) => (
        <div key={sector.name} className="max-w-5xl mx-auto px-6" style={{ paddingBottom: 'clamp(3rem, 6vh, 5rem)' }}>
          <hr className="accent" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }} />
          <h2
            className="font-bold mb-2"
            style={{
              fontFamily: 'var(--font-display), Georgia, serif',
              color: 'var(--text-primary)',
              fontSize: '1.5rem',
            }}
          >
            {sector.name}
          </h2>
          <a
            href={sector.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold mb-8 inline-block"
            style={{ color: 'var(--accent)' }}
          >
            {sector.framework} ↗
          </a>
          <div>
            {sector.dimensions.map((dim) => (
              <div
                key={dim.label}
                className="py-6"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <h3
                    className="font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {dim.label}
                  </h3>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--accent)' }}
                  >
                    {dim.citation}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-tertiary)', maxWidth: '60ch' }}
                >
                  {dim.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Evidence standards */}
      <div className="max-w-5xl mx-auto px-6" style={{ paddingBottom: 'clamp(3rem, 6vh, 5rem)' }}>
        <hr className="accent" style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }} />
        <h2
          className="font-bold mb-5"
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            color: 'var(--text-primary)',
            fontSize: '1.25rem',
          }}
        >
          Evidence standards
        </h2>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: 'var(--text-tertiary)', maxWidth: '60ch' }}
        >
          All scores are based on publicly available information: court filings,
          regulatory records, company announcements, earnings calls, news
          reporting from established outlets, and official statements. We link to
          primary sources wherever possible.
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-tertiary)', maxWidth: '60ch' }}
        >
          We do not score on rumor, anonymous sourcing, or inference. If an
          organization believes a score is factually incorrect, we welcome
          corrections with supporting documentation.
        </p>
      </div>
    </div>
  )
}
