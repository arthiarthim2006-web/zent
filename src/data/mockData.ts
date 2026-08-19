import type {
  Team,
  Lead,
  TeamMember,
  Contribution,
  CommissionEntry,
  RevenuePoint,
  AIInsight,
  User,
} from "@/types";

export const mockUsers: User[] = [
  {
    id: "u-admin",
    name: "Avery Quinn",
    email: "avery@meridian.io",
    role: "admin",
    avatarInitials: "AQ",
  },
  {
    id: "u-team-a",
    name: "Jordan Reyes",
    email: "jordan@meridian.io",
    role: "team",
    avatarInitials: "JR",
    teamId: "team-a",
  },
  {
    id: "u-team-b",
    name: "Priya Nair",
    email: "priya@meridian.io",
    role: "team",
    avatarInitials: "PN",
    teamId: "team-b",
  },
  {
    id: "u-team-c",
    name: "Marcus Lee",
    email: "marcus@meridian.io",
    role: "team",
    avatarInitials: "ML",
    teamId: "team-c",
  },
];

export const mockTeams: Team[] = [
  {
    id: "team-a",
    name: "Team Aurora",
    color: "#1F6F72",
    leadCount: 142,
    memberCount: 8,
    revenue: 486200,
    commission: 72930,
    conversionRate: 24.6,
    growth: 18.4,
  },
  {
    id: "team-b",
    name: "Team Horizon",
    color: "#D9A62E",
    leadCount: 98,
    memberCount: 6,
    revenue: 312800,
    commission: 46920,
    conversionRate: 19.2,
    growth: 12.1,
  },
  {
    id: "team-c",
    name: "Team Vertex",
    color: "#C9A96E",
    leadCount: 76,
    memberCount: 5,
    revenue: 258400,
    commission: 38760,
    conversionRate: 21.8,
    growth: -3.2,
  },
];

const stages: Lead["stage"][] = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Won",
  "Lost",
];
const sources = ["Website", "Referral", "Cold Outreach", "Event", "LinkedIn", "Partner"];
const companies = [
  "Northwind Co",
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella LLC",
  "Stark Industries",
  "Wayne Enterprises",
  "Cyberdyne",
  "Soylent Inc",
  "Hooli",
  "Pied Piper",
  "Vandelay",
  "Massive Dynamic",
  "Tyrell Corp",
  "Wonka Industries",
];
const firstNames = [
  "Olivia",
  "Liam",
  "Emma",
  "Noah",
  "Ava",
  "Ethan",
  "Sophia",
  "Mason",
  "Isabella",
  "Lucas",
  "Mia",
  "Henry",
  "Charlotte",
  "Alex",
  "Grace",
  "Daniel",
  "Zoe",
  "Sam",
];
const lastNames = [
  "Bennett",
  "Carter",
  "Davis",
  "Ellis",
  "Foster",
  "Graham",
  "Hayes",
  "Iverson",
  "Jenkins",
  "Klein",
  "Lambert",
  "Mitchell",
  "Nash",
  "Owens",
  "Patel",
  "Quinn",
  "Reyes",
  "Sullivan",
];

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

function dateOffset(days: number): string {
  const d = new Date(2026, 7, 19);
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function generateLeads(count: number, teamId: string): Lead[] {
  const leads: Lead[] = [];
  for (let i = 0; i < count; i++) {
    const fn = pick(firstNames, i * 3 + 1);
    const ln = pick(lastNames, i * 5 + 2);
    const stage = pick(stages, i * 2);
    const value = [2400, 5800, 12000, 18500, 32000, 4500][i % 6];
    leads.push({
      id: `${teamId}-lead-${i + 1}`,
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@${pick(
        companies,
        i
      ).toLowerCase().replace(/[^a-z]/g, "")}.com`,
      company: pick(companies, i),
      stage,
      value,
      source: pick(sources, i),
      owner: `${pick(firstNames, i + 2)} ${pick(lastNames, i + 3)}`,
      teamId,
      createdAt: dateOffset(i * 3 + 2),
      updatedAt: dateOffset(i),
    });
  }
  return leads;
}

export const mockLeads: Lead[] = [
  ...generateLeads(24, "team-a"),
  ...generateLeads(18, "team-b"),
  ...generateLeads(14, "team-c"),
];

function generateMembers(teamId: string, count: number): TeamMember[] {
  const roles = ["Lead Manager", "Sales Rep", "Account Exec", "SDR", "Team Lead"];
  const members: TeamMember[] = [];
  for (let i = 0; i < count; i++) {
    const fn = pick(firstNames, i * 4 + 3);
    const ln = pick(lastNames, i * 7 + 1);
    const status: TeamMember["status"] = (["active", "active", "active", "invited", "inactive"] as TeamMember["status"])[i % 5];
    members.push({
      id: `${teamId}-member-${i + 1}`,
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}@meridian.io`,
      role: pick(roles, i),
      status,
      avatarInitials: `${fn[0]}${ln[0]}`,
      teamId,
      leadsAssigned: 10 + (i * 7) % 25,
      leadsWon: 2 + (i * 3) % 12,
      revenue: 12000 + (i * 15000) % 90000,
      joinedAt: dateOffset(i * 20 + 30),
    });
  }
  return members;
}

export const mockMembers: TeamMember[] = [
  ...generateMembers("team-a", 8),
  ...generateMembers("team-b", 6),
  ...generateMembers("team-c", 5),
];

export const mockContributions: Contribution[] = mockMembers.map((m, i) => ({
  id: `contrib-${m.id}`,
  memberName: m.name,
  teamId: m.teamId,
  leadsGenerated: m.leadsAssigned,
  leadsClosed: m.leadsWon,
  revenueAttributed: m.revenue,
  commissionEarned: Math.round(m.revenue * 0.15),
  period: i % 2 === 0 ? "2026-08" : "2026-07",
}));

export const mockCommissions: CommissionEntry[] = mockMembers.map((m, i) => {
  const base = Math.round(m.revenue * 0.12);
  const bonus = Math.round(base * (0.1 + (i % 3) * 0.08));
  return {
    id: `comm-${m.id}`,
    memberName: m.name,
    teamId: m.teamId,
    baseAmount: base,
    bonusAmount: bonus,
    totalAmount: base + bonus,
    status: (["paid", "approved", "pending", "approved", "paid"] as CommissionEntry["status"])[i % 5],
    period: i % 2 === 0 ? "August 2026" : "July 2026",
  };
});

export const mockRevenue: RevenuePoint[] = [
  { month: "Jan", revenue: 78400, commission: 11760, target: 80000 },
  { month: "Feb", revenue: 82100, commission: 12315, target: 85000 },
  { month: "Mar", revenue: 91300, commission: 13695, target: 90000 },
  { month: "Apr", revenue: 88700, commission: 13305, target: 95000 },
  { month: "May", revenue: 102400, commission: 15360, target: 100000 },
  { month: "Jun", revenue: 118600, commission: 17790, target: 110000 },
  { month: "Jul", revenue: 124800, commission: 18720, target: 120000 },
  { month: "Aug", revenue: 131200, commission: 19680, target: 125000 },
];

export const mockTeamRevenue: Record<string, RevenuePoint[]> = {
  "team-a": [
    { month: "Jan", revenue: 38200, commission: 5730, target: 40000 },
    { month: "Feb", revenue: 41100, commission: 6165, target: 42000 },
    { month: "Mar", revenue: 45300, commission: 6795, target: 45000 },
    { month: "Apr", revenue: 43700, commission: 6555, target: 48000 },
    { month: "May", revenue: 52400, commission: 7860, target: 50000 },
    { month: "Jun", revenue: 58600, commission: 8790, target: 55000 },
    { month: "Jul", revenue: 61800, commission: 9270, target: 60000 },
    { month: "Aug", revenue: 65200, commission: 9780, target: 62000 },
  ],
  "team-b": [
    { month: "Jan", revenue: 24200, commission: 3630, target: 25000 },
    { month: "Feb", revenue: 26000, commission: 3900, target: 26000 },
    { month: "Mar", revenue: 28800, commission: 4320, target: 28000 },
    { month: "Apr", revenue: 27500, commission: 4125, target: 30000 },
    { month: "May", revenue: 32100, commission: 4815, target: 32000 },
    { month: "Jun", revenue: 36400, commission: 5460, target: 35000 },
    { month: "Jul", revenue: 38200, commission: 5730, target: 38000 },
    { month: "Aug", revenue: 39800, commission: 5970, target: 40000 },
  ],
  "team-c": [
    { month: "Jan", revenue: 16000, commission: 2400, target: 18000 },
    { month: "Feb", revenue: 15000, commission: 2250, target: 19000 },
    { month: "Mar", revenue: 17200, commission: 2580, target: 20000 },
    { month: "Apr", revenue: 17500, commission: 2625, target: 21000 },
    { month: "May", revenue: 17900, commission: 2685, target: 22000 },
    { month: "Jun", revenue: 23600, commission: 3540, target: 24000 },
    { month: "Jul", revenue: 24800, commission: 3720, target: 25000 },
    { month: "Aug", revenue: 26200, commission: 3930, target: 26000 },
  ],
};

export const mockAIInsights: AIInsight[] = [
  {
    id: "ai-1",
    type: "opportunity",
    title: "Team Aurora trending 18% above target",
    description:
      "Team Aurora's conversion rate has climbed from 19% to 24.6% over the last 8 weeks. Consider reallocating two reps from Team Vertex to scale this momentum further.",
    impact: "high",
    teamId: "team-a",
    metric: "+18.4% growth",
  },
  {
    id: "ai-2",
    type: "risk",
    title: "Team Vertex revenue declining 3 months straight",
    description:
      "Team Vertex has missed target for 3 consecutive months. Lead-to-won conversion dropped to 21.8%. Recommend a pipeline review and coaching session for the SDR cohort.",
    impact: "high",
    teamId: "team-c",
    metric: "-3.2% growth",
  },
  {
    id: "ai-3",
    type: "recommendation",
    title: "Reallocate $15K marketing budget to Referral channel",
    description:
      "Referral-sourced leads convert 2.3x higher than Cold Outreach across all teams. Shifting budget could yield an estimated $42K incremental revenue next quarter.",
    impact: "medium",
    metric: "+$42K projected",
  },
  {
    id: "ai-4",
    type: "trend",
    title: "Proposal stage is the org-wide bottleneck",
    description:
      "42% of all active leads are stuck in Proposal stage for 7+ days. Standardizing proposal templates could reduce cycle time by ~4 days.",
    impact: "medium",
    metric: "7+ days avg",
  },
  {
    id: "ai-5",
    type: "opportunity",
    title: "Team Horizon's event-sourced leads show highest value",
    description:
      "Event-sourced leads in Team Horizon average $18.5K deal size — 40% above the org average. Scaling event attendance could unlock significant revenue.",
    impact: "medium",
    teamId: "team-b",
    metric: "$18.5K avg deal",
  },
  {
    id: "ai-6",
    type: "recommendation",
    title: "Commission structure review suggested",
    description:
      "Current 15% flat commission may be under-rewarding high performers in Team Aurora. A tiered model (12%-18% by attainment) could improve retention.",
    impact: "low",
    metric: "Retention risk",
  },
];

export const stageOrder: Lead["stage"][] = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Won",
  "Lost",
];

export const stageColors: Record<Lead["stage"], string> = {
  New: "#3d8fb0",
  Contacted: "#6b6b6b",
  Qualified: "#c9a96e",
  Proposal: "#e0a93a",
  Negotiation: "#d9a62e",
  Won: "#2e9c6e",
  Lost: "#d4533a",
};
