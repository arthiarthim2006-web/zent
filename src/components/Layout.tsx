import { useState, type ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserRound,
  Target,
  WalletCards,
  CircleDollarSign,
  ChartNoAxesCombined,
  FileBarChart,
  Sparkles,
  Settings,
  HelpCircle,
  Bell,
  ChevronDown,
  ChevronRight,
  Menu,
  LogOut,
  Building2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { mockTeams } from "@/data/mockData";
import { Avatar, Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

interface NavItem { label: string; to: string; icon: typeof LayoutDashboard; end?: boolean; }

const adminMain: NavItem[] = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Organization", to: "/admin/organization", icon: Building2 },
];
const sharedNav: NavItem[] = [
  { label: "Leads", to: "/leads", icon: Target },
  { label: "Contributions", to: "/contributions", icon: CircleDollarSign },
  { label: "Commission", to: "/commission", icon: WalletCards },
  { label: "Revenue", to: "/revenue", icon: ChartNoAxesCombined },
  { label: "Reports", to: "/reports", icon: FileBarChart },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = user?.role === "admin";
  const team = mockTeams.find((t) => t.id === user?.teamId);

  const closeMobile = () => setOpen(false);
  const handleLogout = () => { logout(); navigate("/login"); };

  const pageName = location.pathname === "/admin" ? "Overview" : location.pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ?? "Overview";

  return (
    <div className="app-shell">
      <aside className={cn("sidebar", open && "open")}>
        <div className="brand">
          <div className="brand-mark">M</div><span className="brand-name">meridian</span><span className="brand-tag">HQ</span>
        </div>
        <div className="sidebar-content">
          {isAdmin ? (
            <>
              <div className="nav-label">Workspace</div>
              {adminMain.map((item) => <SidebarLink key={item.to} item={item} onClick={closeMobile} />)}
              <div className="nav-label">Teams</div>
              {mockTeams.map((t) => (
                <NavLink key={t.id} to={`/admin/teams/${t.id}`} className="team-nav-item" onClick={closeMobile}>
                  <span className="team-dot" style={{ background: t.color }} />{t.name}<ChevronRight size={12} style={{ marginLeft: "auto", opacity: .45 }} />
                </NavLink>
              ))}
              <div className="nav-label">Manage</div>
              {sharedNav.map((item) => <SidebarLink key={item.to} item={item} onClick={closeMobile} />)}
              <NavLink to="/ai-insights" className="nav-item" onClick={closeMobile}><span className="nav-icon"><Sparkles size={16} /></span>AI Insights<Badge variant="gold">BETA</Badge></NavLink>
            </>
          ) : (
            <>
              <div className="nav-label">My workspace</div>
              <SidebarLink item={{ label: "Dashboard", to: "/team", icon: LayoutDashboard, end: true }} onClick={closeMobile} />
              <SidebarLink item={{ label: "Team Members", to: "/team/members", icon: Users }} onClick={closeMobile} />
              <div className="nav-label">Performance</div>
              {sharedNav.map((item) => <SidebarLink key={item.to} item={{ ...item, to: `/team${item.to}` }} onClick={closeMobile} />)}
            </>
          )}
          <div className="nav-label">Support</div>
          <NavLink to="/settings" className="nav-item" onClick={closeMobile}><span className="nav-icon"><Settings size={16} /></span>Settings</NavLink>
          <NavLink to="/help" className="nav-item" onClick={closeMobile}><span className="nav-icon"><HelpCircle size={16} /></span>Help center</NavLink>
        </div>
        <div className="sidebar-footer">
          <div className="workspace-switch">
            <div className="workspace-mark">M</div>
            <div className="workspace-info"><div className="workspace-name">Meridian Inc.</div><div className="workspace-plan">Enterprise workspace</div></div>
            <ChevronDown size={14} className="workspace-chevron" />
          </div>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <button className="mobile-menu topbar-icon" onClick={() => setOpen(!open)}><Menu size={18} /></button>
            <span>Meridian</span><span className="breadcrumb-separator"><ChevronRight size={13} /></span><span className="breadcrumb-current capitalize">{pageName}</span>
          </div>
          <div className="topbar-right">
            <button className="topbar-icon"><Bell size={17} /><span className="notification-dot" /></button>
            <button className="user-menu" onClick={() => navigate("/settings")}>
              <div className="user-meta"><div className="user-name">{user?.name}</div><div className="user-role">{isAdmin ? "Organization admin" : team?.name}</div></div>
              <Avatar initials={user?.avatarInitials ?? ""} size="sm" color={isAdmin ? "gold" : "teal"} />
              <ChevronDown size={13} color="var(--text-subtle)" />
            </button>
            <button className="topbar-icon" onClick={handleLogout} title="Log out"><LogOut size={16} /></button>
          </div>
        </header>
        <div className="content"><div className="content-inner">{children}</div></div>
      </main>
    </div>
  );
}

function SidebarLink({ item, onClick }: { item: NavItem; onClick: () => void }) {
  const Icon = item.icon;
  return <NavLink to={item.to} end={item.end} className="nav-item" onClick={onClick}><span className="nav-icon"><Icon size={16} /></span>{item.label}</NavLink>;
}
