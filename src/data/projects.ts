export interface Project {
  slug: string
  category: string
  title: string
  summary: string
  challenge: string
  approach: string
  outcome: string
  client: string
  sector: string
  year: string
  services: string[]
}

export const projects: Project[] = [
  {
    slug: "iwi-governance-framework",
    category: "Strategic Design",
    title: "Iwi Governance Framework Redesign",
    summary:
      "A new governance framework for an iwi organisation operating across several regions.",
    challenge:
      "Regional entities were working under different mandates and accountabilities. Decision-making was fragmented, and the existing frameworks didn't reflect the organisation's tikaka or long-term aspirations.",
    approach:
      "We worked with the leadership team and key stakeholders to understand how governance was working across the group. From there we designed a values-led framework that applies to every entity, keeps regional autonomy and embeds mātauraka Māori throughout.",
    outcome:
      "One governance framework with clear decision rights and accountability, mātauraka Māori embedded at every level, and milestones and measures to track performance.",
    client: "Confidential",
    sector: "Iwi Governance",
    year: "2024",
    services: ["Strategic Design", "Governance Advisory", "Stakeholder Engagement"],
  },
  {
    slug: "southern-ocean-strategy",
    category: "Climate & Taiao",
    title: "Southern Ocean Environmental Strategy",
    summary:
      "Bringing mātauraka Māori into Antarctic governance and international environmental policy.",
    challenge:
      "Indigenous voices have largely been absent from the frameworks that govern the Southern Ocean and Antarctica. Decisions about taiao that affect everyone are being made without Indigenous knowledge or authority.",
    approach:
      "Drawing on doctoral research and direct engagement with international governance bodies, we developed a strategy for positioning Kāi Tahu and wider Indigenous perspectives within the Antarctic Treaty System. This included policy briefs and building relationships with key decision-makers.",
    outcome:
      "Kāi Tahu perspectives acknowledged in several international policy processes, and an ongoing pathway for Indigenous participation in Southern Ocean governance.",
    client: "Confidential",
    sector: "Environmental Governance",
    year: "2023–2024",
    services: ["Research & Policy", "International Advocacy", "Strategic Design"],
  },
  {
    slug: "regional-economic-transformation",
    category: "Indigenous Economies",
    title: "Regional Economic Transformation",
    summary:
      "An economic strategy positioning an iwi economy for long-term prosperity.",
    challenge:
      "The region had significant natural and cultural assets but no clear strategy for turning them into lasting prosperity. Existing frameworks didn't reflect Indigenous values or intergenerational thinking.",
    approach:
      "We mapped current assets, identified opportunities in food and ocean economies, and designed transition pathways aligned with the iwi's tikaka. The strategy was co-designed with the community so it belongs to them.",
    outcome:
      "An economic roadmap with clear accountability and milestones, positioning the iwi in national and international markets.",
    client: "Confidential",
    sector: "Regional Development",
    year: "2024",
    services: ["Economic Strategy", "Regional Development", "Community Engagement"],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
