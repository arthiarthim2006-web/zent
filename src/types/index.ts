export type Role = "admin" | "team";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarInitials: string;
  teamId?: string;
}

export interface Team {
  id: string;
  name: string;
  color: string;
  leadCount: number;
  memberCount: number;
  revenue: number;
  commission: number;
  conversionRate: number;
  growth: number;
}

export type LeadStage =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal"
  | "Negotiation"
  | "Won"
  | "Lost";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  stage: LeadStage;
  value: number;
  source: string;
  owner: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "inactive";
  avatarInitials: string;
  teamId: string;
  leadsAssigned: number;
  leadsWon: number;
  revenue: number;
  joinedAt: string;
}

export interface Contribution {
  id: string;
  memberName: string;
  teamId: string;
  leadsGenerated: number;
  leadsClosed: number;
  revenueAttributed: number;
  commissionEarned: number;
  period: string;
}

export interface CommissionEntry {
  id: string;
  memberName: string;
  teamId: string;
  baseAmount: number;
  bonusAmount: number;
  totalAmount: number;
  status: "pending" | "approved" | "paid";
  period: string;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
  commission: number;
  target: number;
}

export interface AIInsight {
  id: string;
  type: "opportunity" | "risk" | "recommendation" | "trend";
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  teamId?: string;
  metric?: string;
}
