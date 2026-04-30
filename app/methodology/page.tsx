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
  {
    name: 'Media Organizations',
    framework: 'Society of Professional Journalists Code of Ethics + Own Editorial Standards',
    url: 'https://www.spj.org/ethicscode.asp',
    dimensions: [
      { label: 'Editorial Independence', citation: 'SPJ: Act Independently', description: 'Journalists must avoid conflicts of interest and resist pressure from advertisers, donors, owners, or political actors that could compromise editorial judgment.' },
      { label: 'Truth & Accuracy', citation: 'SPJ: Seek Truth', description: 'Journalists should be honest, fair, and courageous in gathering, reporting, and interpreting information. Editorial decisions should be based on journalistic merit, not external pressure.' },
      { label: 'Accountability & Transparency', citation: 'SPJ: Be Accountable', description: 'Journalists should explain ethical choices and processes to audiences. Organizations should acknowledge mistakes and correct them promptly, and disclose conflicts of interest.' },
      { label: 'Minimize Harm', citation: 'SPJ: Minimize Harm', description: 'Ethical journalism treats sources, subjects, colleagues, and members of the public as human beings deserving of respect. Editorial decisions should not be driven by retaliation or appeasement.' },
      { label: 'Newsroom Integrity', citation: 'Own Standards', description: 'Media organizations that publish editorial standards, mission statements, and workforce commitments make binding promises to their journalists and audiences. We evaluate whether those commitments are maintained under pressure.' },
    ],
  },
  {
    name: 'Universities',
    framework: 'AAUP 1940 Statement on Academic Freedom + Own Governance Charters',
    url: 'https://www.aaup.org/report/1940-statement-principles-academic-freedom-and-tenure',
    dimensions: [
      { label: 'Academic Freedom', citation: 'AAUP 1940 Statement', description: 'Teachers are entitled to full freedom in research and in the publication of results. Universities must protect faculty from external interference in teaching and scholarship.' },
      { label: 'Institutional Autonomy', citation: 'AAUP: Governance', description: 'Universities should resist external pressure that compromises institutional decision-making. Governance decisions should follow established processes, not political demands.' },
      { label: 'Due Process', citation: 'AAUP: Tenure', description: 'Faculty and students are entitled to due process protections. Disciplinary actions, terminations, and policy changes should follow established governance procedures.' },
      { label: 'Free Expression', citation: 'Own Policies', description: 'Universities that publish free expression commitments and protest policies make promises to their campus communities. We evaluate whether those policies are applied consistently regardless of viewpoint.' },
      { label: 'Research Independence', citation: 'Own Mission', description: 'Universities committed to advancing knowledge must protect the independence of research programs from political interference, funding coercion, or ideological litmus tests.' },
    ],
  },
  {
    name: 'Consulting Firms',
    framework: 'IMC Code of Ethics + Own Published Standards',
    url: 'https://www.imcusa.org/page/codeofethics',
    dimensions: [
      { label: 'Professional Independence', citation: 'IMC Code: Independence', description: 'Consultants must maintain objectivity and independence in their advice. Recommendations should be based on analysis and evidence, not shaped by political relationships or fear of retaliation.' },
      { label: 'Conflict of Interest Management', citation: 'IMC Code: Conflicts', description: 'Consultants must disclose and manage conflicts of interest. Serving both government and private clients in overlapping domains requires rigorous separation and transparency.' },
      { label: 'Duty to Clients', citation: 'IMC Code: Client Service', description: 'Consultants owe their clients competent, objective advice. Abandoning or altering engagements under political pressure violates the fundamental duty of professional service.' },
      { label: 'Public Interest', citation: 'Own Standards', description: 'Firms that publish commitments to public interest, pro bono work, or social impact make voluntary obligations. We evaluate whether those commitments are maintained or abandoned under pressure.' },
      { label: 'Workforce Commitments', citation: 'Own DEI & HR Policies', description: 'Firms that publish DEI commitments, equitable hiring goals, or workforce protection policies make promises to their employees. We evaluate whether those commitments were maintained under pressure.' },
    ],
  },
  {
    name: 'Accounting Firms',
    framework: 'AICPA Code of Professional Conduct + PCAOB Standards',
    url: 'https://www.aicpa.org/resources/download/aicpa-code-of-professional-conduct',
    dimensions: [
      { label: 'Audit Independence', citation: 'AICPA Rule 101', description: 'Auditors must maintain independence in both fact and appearance. Financial relationships, consulting services, or political entanglements that compromise objectivity violate this core obligation.' },
      { label: 'Due Professional Care', citation: 'AICPA: General Standards', description: 'Members shall exercise due professional care in the performance of professional services. Negligence, inadequate procedures, or failure to detect material misstatements breach this standard.' },
      { label: 'Integrity & Objectivity', citation: 'AICPA Rule 102', description: 'Members shall be free of conflicts of interest and shall not knowingly misrepresent facts or subordinate judgment to others. Political pressure does not excuse departures from objectivity.' },
      { label: 'Public Interest Obligation', citation: 'AICPA: Public Interest', description: 'The accounting profession exists to serve the public interest. Firms that prioritize client retention, political relationships, or revenue over public accountability violate this principle.' },
      { label: 'Quality Control Systems', citation: 'PCAOB Standards', description: 'Firms must maintain quality control systems that ensure consistent audit quality. PCAOB inspection findings, restatements, and enforcement actions indicate systemic failures in these controls.' },
    ],
  },
  {
    name: 'Hospital Systems',
    framework: 'AMA Code of Medical Ethics + Own Mission Statements',
    url: 'https://www.ama-assn.org/delivering-care/ethics/code-medical-ethics-overview',
    dimensions: [
      { label: 'Patient Welfare', citation: 'AMA Opinion 1.1.1', description: "A physician's primary obligation is to the patient. Hospital systems must ensure that financial considerations, political pressures, or institutional interests do not override clinical judgment or patient care." },
      { label: 'Nondiscrimination', citation: 'AMA Opinion 1.1.2', description: 'Physicians and healthcare institutions may not refuse to care for patients based on race, gender, sexual orientation, gender identity, or other personal characteristics. Restricting evidence-based care under political pressure violates this principle.' },
      { label: 'Clinical Autonomy', citation: 'AMA Opinion 1.2.6', description: 'Physicians must be free to exercise clinical judgment. Hospital policies that restrict evidence-based treatment options for non-clinical reasons compromise the physician-patient relationship.' },
      { label: 'Institutional Transparency', citation: 'Own Mission', description: 'Hospital systems that publish mission statements, community benefit commitments, and equity pledges make binding promises. We evaluate whether those commitments are maintained or quietly abandoned.' },
      { label: 'Workforce & Training Equity', citation: 'Own Policies', description: 'Hospitals that commit to diverse hiring, equitable training programs, and inclusive workplace policies make promises to their staff. We evaluate whether those commitments are maintained under external pressure.' },
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
