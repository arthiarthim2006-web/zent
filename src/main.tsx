import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AppLayout } from "@/components/Layout";
import { Login } from "@/pages/Login";
import { AdminDashboard, TeamDashboard } from "@/pages/Dashboards";
import {
  Organization,
  TeamDetail,
  LeadsPage,
  LeadJourney,
  ContributionsPage,
  CommissionPage,
  RevenuePage,
  ReportsPage,
  InsightsPage,
  MembersPage,
  GenericPage,
} from "@/pages/WorkspacePages";
import "@/styles/global.css";
import "@/styles/components.css";
import "@/styles/extra.css";

function RequireAuth({ children, role }: { children: React.ReactNode; role?: "admin" | "team" }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="login-page"><div className="login-form-side"><div className="skeleton" style={{ width: 240, height: 36 }} /></div></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={user.role === "admin" ? "/admin" : "/team"} replace />;
  return <>{children}</>;
}

function App() {
  return <AuthProvider><Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Navigate to="/admin" replace />} />
    <Route path="/admin" element={<RequireAuth role="admin"><AppLayout><AdminDashboard /></AppLayout></RequireAuth>} />
    <Route path="/admin/organization" element={<RequireAuth role="admin"><AppLayout><Organization /></AppLayout></RequireAuth>} />
    <Route path="/admin/teams/:teamId" element={<RequireAuth role="admin"><AppLayout><TeamDetail /></AppLayout></RequireAuth>} />
    <Route path="/admin/teams/:teamId/leads" element={<RequireAuth role="admin"><AppLayout><LeadsPage /></AppLayout></RequireAuth>} />
    <Route path="/admin/teams/:teamId/revenue" element={<RequireAuth role="admin"><AppLayout><RevenuePage /></AppLayout></RequireAuth>} />
    <Route path="/leads" element={<RequireAuth><AppLayout><LeadsPage /></AppLayout></RequireAuth>} />
    <Route path="/leads/:leadId" element={<RequireAuth><AppLayout><LeadJourney /></AppLayout></RequireAuth>} />
    <Route path="/contributions" element={<RequireAuth><AppLayout><ContributionsPage /></AppLayout></RequireAuth>} />
    <Route path="/commission" element={<RequireAuth><AppLayout><CommissionPage /></AppLayout></RequireAuth>} />
    <Route path="/revenue" element={<RequireAuth><AppLayout><RevenuePage /></AppLayout></RequireAuth>} />
    <Route path="/reports" element={<RequireAuth><AppLayout><ReportsPage /></AppLayout></RequireAuth>} />
    <Route path="/ai-insights" element={<RequireAuth role="admin"><AppLayout><InsightsPage /></AppLayout></RequireAuth>} />
    <Route path="/team" element={<RequireAuth role="team"><AppLayout><TeamDashboard /></AppLayout></RequireAuth>} />
    <Route path="/team/members" element={<RequireAuth role="team"><AppLayout><MembersPage /></AppLayout></RequireAuth>} />
    <Route path="/team/leads" element={<RequireAuth role="team"><AppLayout><LeadsPage scopedTeamId="team" /></AppLayout></RequireAuth>} />
    <Route path="/team/contributions" element={<RequireAuth role="team"><AppLayout><ContributionsPage teamId="team" /></AppLayout></RequireAuth>} />
    <Route path="/team/commission" element={<RequireAuth role="team"><AppLayout><CommissionPage teamId="team" /></AppLayout></RequireAuth>} />
    <Route path="/team/revenue" element={<RequireAuth role="team"><AppLayout><RevenuePage teamId="team" /></AppLayout></RequireAuth>} />
    <Route path="/team/reports" element={<RequireAuth role="team"><AppLayout><ReportsPage teamId="team" /></AppLayout></RequireAuth>} />
    <Route path="/settings" element={<RequireAuth><AppLayout><GenericPage title="Settings" description="Manage your workspace preferences and personal profile." /></AppLayout></RequireAuth>} />
    <Route path="/help" element={<RequireAuth><AppLayout><GenericPage title="Help center" description="Find answers and guidance for getting the most from Meridian." /></AppLayout></RequireAuth>} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes></AuthProvider>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>);
