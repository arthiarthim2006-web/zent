import {
  mockUsers,
  mockTeams,
  mockLeads,
  mockMembers,
  mockContributions,
  mockCommissions,
  mockRevenue,
  mockTeamRevenue,
  mockAIInsights,
} from "@/data/mockData";
import type {
  User,
  Team,
  Lead,
  TeamMember,
  Contribution,
  CommissionEntry,
  RevenuePoint,
  AIInsight,
  Role,
} from "@/types";

/**
 * Service layer — all data access goes through here.
 * Swap the mock implementations below for real fetch() calls
 * to a Node/Express backend with minimal component changes.
 */

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function withDelay<T>(data: T, ms = 280): Promise<T> {
  await delay(ms);
  return data;
}

export const api = {
  auth: {
    async login(email: string, _password: string): Promise<User> {
      const user = mockUsers.find((u) => u.email === email);
      if (!user) throw new Error("Invalid credentials");
      return withDelay(user, 400);
    },
    async loginAs(role: Role, teamId?: string): Promise<User> {
      const user =
        role === "admin"
          ? mockUsers[0]
          : mockUsers.find((u) => u.role === role && u.teamId === teamId) ??
            mockUsers.find((u) => u.role === role)!;
      return withDelay(user, 400);
    },
  },

  teams: {
    async list(): Promise<Team[]> {
      return withDelay(mockTeams);
    },
    async get(id: string): Promise<Team | undefined> {
      return withDelay(mockTeams.find((t) => t.id === id));
    },
  },

  leads: {
    async list(teamId?: string): Promise<Lead[]> {
      const data = teamId ? mockLeads.filter((l) => l.teamId === teamId) : mockLeads;
      return withDelay(data);
    },
    async get(id: string): Promise<Lead | undefined> {
      return withDelay(mockLeads.find((l) => l.id === id));
    },
  },

  members: {
    async list(teamId?: string): Promise<TeamMember[]> {
      const data = teamId ? mockMembers.filter((m) => m.teamId === teamId) : mockMembers;
      return withDelay(data);
    },
  },

  contributions: {
    async list(teamId?: string): Promise<Contribution[]> {
      const data = teamId
        ? mockContributions.filter((c) => c.teamId === teamId)
        : mockContributions;
      return withDelay(data);
    },
  },

  commissions: {
    async list(teamId?: string): Promise<CommissionEntry[]> {
      const data = teamId
        ? mockCommissions.filter((c) => c.teamId === teamId)
        : mockCommissions;
      return withDelay(data);
    },
  },

  revenue: {
    async org(): Promise<RevenuePoint[]> {
      return withDelay(mockRevenue);
    },
    async team(teamId: string): Promise<RevenuePoint[]> {
      return withDelay(mockTeamRevenue[teamId] ?? []);
    },
  },

  insights: {
    async list(teamId?: string): Promise<AIInsight[]> {
      const data = teamId
        ? mockAIInsights.filter((i) => i.teamId === teamId || !i.teamId)
        : mockAIInsights;
      return withDelay(data);
    },
  },
};
