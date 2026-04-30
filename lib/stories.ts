export interface Story {
  slug: string
  title: string
  subtitle: string
  sector: string
  sectorId: string
  orgName: string
  orgId: string
  grade: string
  gradeType: 'honor' | 'mixed' | 'shame'
  publishedAt: string
  readTime: string
  coverQuote: string
  body: string[]
}

export const stories: Story[] = [
  {
    slug: 'associated-press-held-the-line',
    title: 'The Wire Service That Held the Line',
    subtitle: 'How the Associated Press maintained its editorial independence when others folded',
    sector: 'Media Organizations',
    sectorId: 'media',
    orgName: 'Associated Press',
    orgId: '0b6be234-2967-4d20-85ca-b18df109eae0',
    grade: 'A',
    gradeType: 'honor',
    publishedAt: 'April 2026',
    readTime: '6 min read',
    coverQuote: 'The AP\'s record is not perfect. But it is the record of an organization that, when tested, did what it said it would do.',
    body: [
      'In a year when media organizations across the country faced extraordinary pressure to soften coverage, abandon editorial positions, and accommodate political power, the Associated Press did something remarkable: it continued doing its job.',

      'That might sound like a low bar. It isn\'t. When the Washington Post killed a presidential endorsement at the direction of its owner, when CBS News overhauled its editorial leadership under corporate pressure, when newsrooms across the country pulled punches and hedged their coverage, the AP\'s refusal to flinch was a genuine act of institutional courage.',

      'The AP operates under the Society of Professional Journalists Code of Ethics, which demands that journalists "act independently" and "avoid conflicts of interest." These are not aspirational principles. They are professional obligations, the equivalent of a doctor\'s duty to patients or a lawyer\'s duty to clients. When an organization adopts them, it makes a binding commitment.',

      'What makes the AP\'s record distinctive is not a single dramatic stand. It is the accumulation of ordinary decisions made correctly under extraordinary pressure. Reporters continued covering sensitive government stories. Editors continued making news judgments based on journalistic merit. The organization continued operating its global newsgathering network without documented instances of self-censorship or editorial interference.',

      'In January 2025, when pressure campaigns targeted individual AP reporters, the organization defended them. In March, the AP won the SPJ Ethics Award for its sustained commitment to independent journalism. In April, it continued operations in sensitive regions where other outlets had pulled back.',

      'The structural reasons for the AP\'s resilience are worth understanding. As a nonprofit cooperative owned by its member newspapers, the AP lacks the single-owner vulnerability that compromised other outlets. There is no Jeff Bezos who can kill an endorsement, no corporate parent restructuring editorial leadership for strategic reasons. The AP\'s governance model is itself a form of institutional defense.',

      'But structure alone doesn\'t explain the result. Plenty of organizations with sound governance structures folded under pressure in 2025. The AP\'s resilience also reflects a deeply embedded editorial culture, one that treats independence not as a luxury to be enjoyed in comfortable times but as a non-negotiable obligation that matters most when it is hardest to uphold.',

      'Professional Record scores the AP a 5 out of 5 on Editorial Independence, Truth & Accuracy, and Newsroom Integrity. A 5 on Minimize Harm. A 4 on Accountability & Transparency, the sole dimension where modest improvement is possible in its public-facing explanation of editorial processes.',

      'Overall grade: A. Professional obligations upheld.',

      'The AP\'s record is not a story of heroism. It is a story of professionalism. The organization adopted a set of ethical obligations, and when the pressure came, it honored them. That this qualifies as exceptional tells you everything you need to know about the state of American media in 2025.',
    ],
  },
  {
    slug: 'harvard-billion-dollar-question',
    title: 'Harvard\'s Billion-Dollar Question',
    subtitle: 'When the federal government froze hundreds of millions in grants, the university fought back — and then made deals',
    sector: 'Universities',
    sectorId: 'universities',
    orgName: 'Harvard University',
    orgId: '85f27ff5-308b-4aa7-9ba6-fee611747939',
    grade: 'C',
    gradeType: 'mixed',
    publishedAt: 'April 2026',
    readTime: '7 min read',
    coverQuote: 'Harvard\'s response reveals an institution caught between its principles and its budget — fighting on some fronts while quietly conceding on others.',
    body: [
      'Harvard University sits at the center of a question that every American institution now faces: when the federal government uses funding as leverage to reshape institutional behavior, how much should you resist?',

      'The numbers are staggering. In January 2025, the federal government froze hundreds of millions of dollars in grants and contracts to Harvard, creating immediate pressure on research operations across the university. Labs that depended on federal funding faced disruption. Graduate students on federal fellowships faced uncertainty. Research programs years in the making were suddenly at risk.',

      'Harvard\'s initial response was assertive. The university publicly affirmed its commitment to institutional independence. It contested several federal demands through legal channels. Its president issued statements framing the conflict not as a political dispute but as a matter of academic principle, invoking the AAUP\'s 1940 Statement on Academic Freedom and Harvard\'s own centuries-old governance traditions.',

      'This was the right framework. The AAUP principles, which Harvard has endorsed, are clear: universities must protect faculty from external interference in teaching and scholarship. Governance decisions should follow established processes, not political demands. These are not political positions. They are professional obligations.',

      'But Harvard\'s record from there becomes more complicated. While continuing to resist on some fronts, the university made concessions on others. Administrative and policy changes were implemented that, while perhaps individually defensible, collectively represented a significant accommodation to external pressure. The resulting partial restoration of funding came at a cost to the principles Harvard had initially invoked.',

      'The contrast with the University of California system is instructive. When UC faced $584 million in federal funding cuts, it pursued legal action, won a preliminary injunction, and publicly defended its governance independence without making the kind of bilateral concessions Harvard accepted. UC\'s approach was harder and riskier. It was also more consistent with the principles both institutions claimed to uphold.',

      'Harvard\'s defenders would note that the university faced more sustained and targeted pressure than almost any other institution. That its response was more assertive than many peer institutions, including Columbia, which made sweeping concessions. That the concessions it made were strategic, preserving core academic operations while yielding on less central matters.',

      'These points have merit. But they also illustrate the central challenge of Harvard\'s position. The AAUP principles do not contain a clause that permits accommodation when the pressure is sufficiently intense. Institutional autonomy is not a sliding scale that adjusts based on the size of the budget at stake.',

      'Professional Record scores Harvard a 3 out of 5 across all five dimensions: Academic Freedom, Institutional Autonomy, Due Process, Free Expression, and Research Independence. This reflects a genuinely mixed record, one that includes both principled resistance and significant accommodation.',

      'Overall grade: C. Mixed record.',

      'Harvard\'s story is ultimately the story of an institution that knew what it should do, said what it should do, and then partially did it. The university deserves credit for fighting. But professional obligations are not graded on a curve. The question is not whether Harvard did better than Columbia. The question is whether Harvard did what Harvard said it would do.',

      'On that question, the record is mixed.',
    ],
  },
  {
    slug: 'paul-weiss-first-to-fold',
    title: 'First to Fold',
    subtitle: 'How Paul Weiss set the template for professional capitulation — and paid the price',
    sector: 'Law Firms',
    sectorId: 'law-firms',
    orgName: 'Paul Weiss',
    orgId: '6943c887-a18b-470f-809e-fe095759bca8',
    grade: 'F',
    gradeType: 'shame',
    publishedAt: 'April 2026',
    readTime: '8 min read',
    coverQuote: 'Paul Weiss didn\'t just violate its professional obligations. It created a template for how an entire profession could be brought to heel.',
    body: [
      'On March 14, 2025, an executive order was issued targeting Paul Weiss, Rifkind, Wharton & Garrison, one of the most prestigious law firms in the United States. The order threatened to strip the firm of government contracts and security clearances. Six days later, Paul Weiss capitulated.',

      'The terms of the deal were extraordinary. Paul Weiss pledged $40 million in pro bono legal services to causes designated by the administration. It agreed to roll back its diversity, equity, and inclusion initiatives. In exchange, the executive order was revoked.',

      'Every element of this deal violated the professional obligations that Paul Weiss, as a law firm, had adopted.',

      'Start with pro bono. ABA Model Rule 6.1 states that pro bono publico service should be provided "to persons of limited means" or to charitable, civic, and educational organizations. The rule exists because the legal profession has a special obligation to ensure access to justice for those who cannot afford it. Pro bono is not a discretionary budget line. It is a professional duty.',

      'What Paul Weiss agreed to was not pro bono in any meaningful sense. It was tribute. The $40 million was not directed at underserved communities or access to justice. It was pledged to causes selected by the government in exchange for the removal of a political threat. This is the opposite of what Rule 6.1 requires. It is pro bono as political currency.',

      'Then there is professional independence. ABA Model Rule 2.1 requires lawyers to "exercise independent professional judgment and render candid advice." The Preamble to the Model Rules states that the legal profession\'s "relative autonomy carries with it special responsibilities of self-government" and that the profession must ensure its regulations "are conceived in the public interest and not for the furtherance of parochial or self-interested concerns."',

      'Paul Weiss\'s deal was the opposite of independence. It was a negotiated surrender of professional autonomy in exchange for the removal of a business threat. The firm did not exercise independent judgment. It responded to coercion with compliance, and in doing so, it subordinated its professional obligations to its commercial interests.',

      'The consequences were immediate and devastating. Karen Dunn, who had led Google\'s antitrust defense, departed along with Jeannie Rhee, William Isaacson, and Jessica Phillips. They formed Dunn Isaacson Rhee LLP, taking the Google defense with them. By June, the partner exodus had reached seven departures. The firm\'s litigation practice was significantly weakened.',

      'But the worst consequence was not internal. It was external. Paul Weiss\'s deal set the template. Within weeks, eight more firms followed with similar arrangements, triggering nearly $1 billion in total pro bono pledges to the administration. What had been one firm\'s capitulation became an industry pattern.',

      'California\'s Attorney General publicly condemned the deal as undermining the independence of the legal profession. Legal ethics scholars described it as unprecedented. But the pattern held. Paul Weiss had demonstrated that the pressure worked, and the profession\'s defenses crumbled.',

      'Professional Record scores Paul Weiss a 1 out of 5 on every dimension: Professional Independence, Rule of Law Commitment, Client Representation, Pro Bono Alignment, and Firm Independence. A score of 1 means "obligation abandoned," and in every case, the evidence supports that assessment.',

      'Overall grade: F. Violated its obligations.',

      'There is a particular cruelty in what happened at Paul Weiss. The firm\'s partners included some of the finest lawyers in the country. Its pro bono tradition was, before March 2025, genuinely distinguished. The people who built that tradition spent careers demonstrating that the legal profession\'s independence was not for sale.',

      'And then, in six days, the firm sold it. Not because it lacked the resources to resist. Not because the legal arguments were weak. But because the business risk was too high, and the partners who might have insisted on principle were overruled by those who prioritized the firm\'s commercial position.',

      'Paul Weiss did not just fail its own professional obligations. It created the playbook for an entire profession\'s capitulation. That is why the grade is F. Not because Paul Weiss was the worst law firm in America, but because it was the first to demonstrate how easy it was to make the rest of them fold.',
    ],
  },
]
