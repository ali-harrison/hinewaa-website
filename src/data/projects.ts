export interface Project {
  slug: string
  category: string
  title: string
  summary: string
  challenge: string
  approach: string
  outcome: string
  pullQuote: string
  client: string
  sector: string
  year: string
  services: string[]
}

export const projects: Project[] = [
  {
    slug: 'iwi-governance-framework',
    category: 'Strategic Design',
    title: 'Iwi Governance Framework Redesign',
    summary:
      'Developing a transformational governance architecture for a major iwi organisation operating across multiple regions.',
    challenge:
      'The organisation faced significant complexity in aligning governance structures across multiple regional entities, each operating under different mandates and accountabilities. Strategic decision-making was fragmented, and the existing frameworks did not reflect the organisation's tikanga or long-term aspirations.',
    approach:
      'Working directly with the leadership team and key stakeholders, we undertook a deep listening process to understand the full landscape of the organisation's governance challenges. From this foundation, we designed a coherent, values-led framework that could operate across all entities while preserving regional autonomy and embedding mātauranga Māori at every level.',
    outcome:
      'A transformational governance architecture that aligned strategic decision-making, clarified accountability pathways, and embedded mātauranga Māori at every level of the organisation's operating model — with clear milestones and measurable performance frameworks.',
    pullQuote:
      'The work shifted how we think about governance — not as a compliance requirement, but as an expression of who we are and where we're going.',
    client: 'Confidential',
    sector: 'Iwi Governance',
    year: '2024',
    services: ['Strategic Design', 'Governance Advisory', 'Stakeholder Engagement'],
  },
  {
    slug: 'southern-ocean-strategy',
    category: 'Climate & Taiao',
    title: 'Southern Ocean Environmental Strategy',
    summary:
      'Embedding mātauranga Māori into Antarctic governance systems and environmental policy at an international level.',
    challenge:
      'Indigenous voices have historically been absent from the governance frameworks that determine how the Southern Ocean and Antarctic systems are managed. This creates significant gaps in both cultural integrity and environmental resilience — decisions about taiao that affect us all are being made without Indigenous knowledge or authority.',
    approach:
      'Through doctoral-level research and direct engagement with international governance bodies, we developed a strategic framework for positioning Kāi Tahu and broader Indigenous perspectives within the Antarctic Treaty System. This included developing policy briefs, building relationships with key decision-makers, and creating sustainable advocacy pathways.',
    outcome:
      'A recognised contribution to international environmental governance discourse, with Kāi Tahu perspectives formally acknowledged in multiple policy processes and a sustainable advocacy pathway established for ongoing Indigenous participation in Southern Ocean governance.',
    pullQuote:
      'Bringing Indigenous knowledge to the Antarctic Treaty System isn't just about representation — it's about better governance for all of humanity.',
    client: 'Confidential',
    sector: 'Environmental Governance',
    year: '2023–2024',
    services: ['Research & Policy', 'International Advocacy', 'Strategic Design'],
  },
  {
    slug: 'regional-economic-transformation',
    category: 'Indigenous Economies',
    title: 'Regional Economic Transformation',
    summary:
      'Positioning an iwi economy within national and international frameworks to drive long-term prosperity.',
    challenge:
      'The region held significant natural and cultural assets but lacked a coherent economic strategy that could translate these into durable prosperity for current and future generations. Existing frameworks did not reflect Indigenous values or the long-term, intergenerational thinking required for genuine transformation.',
    approach:
      'We developed an integrated economic strategy that mapped current assets, identified key opportunities within food and ocean economies, and designed transition pathways aligned with the iwi's tikanga and long-term aspirations. The strategy was co-designed with the community to ensure broad ownership and genuine accountability.',
    outcome:
      'A comprehensive economic transformation roadmap that positioned the iwi as a key player in national and international markets, with clear accountability frameworks and measurable milestones aligned to intergenerational prosperity.',
    pullQuote:
      'This strategy gave us a clear line of sight from where we are today to where our mokopuna need us to be.',
    client: 'Confidential',
    sector: 'Regional Development',
    year: '2024',
    services: ['Economic Strategy', 'Regional Development', 'Community Engagement'],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
