import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button, Badge } from "@/components/ui";
import { mockTeams } from "@/data/mockData";

export function Login() {
  const { login, loginAs } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("avery@meridian.io");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try { await login(email, password); navigate(email.startsWith("avery") ? "/admin" : "/team"); }
    catch { setError("That email is not recognized. Use one of the demo accounts below."); }
    finally { setLoading(false); }
  };
  const demo = async (role: "admin" | "team", teamId?: string) => { setLoading(true); await loginAs(role, teamId); navigate(role === "admin" ? "/admin" : "/team"); };

  return <div className="login-page">
    <div className="login-brand-side">
      <div className="login-brand-top"><div className="brand-mark">M</div><span className="brand-name">meridian</span><span className="brand-tag">HQ</span></div>
      <div className="login-quote"><h1>One clear view of <em>your growth.</em></h1><p>Meridian brings your teams, leads, and revenue into focus — so every decision moves the organization forward.</p></div>
      <div className="login-stats"><div><div className="login-stat-value">$1.06M</div><div className="login-stat-label">Revenue tracked</div></div><div><div className="login-stat-value">316</div><div className="login-stat-label">Active leads</div></div><div><div className="login-stat-value">19</div><div className="login-stat-label">Team members</div></div></div>
    </div>
    <div className="login-form-side"><div className="login-form-wrap">
      <div className="login-form-header"><h2>Welcome back</h2><p>Sign in to your Meridian workspace.</p></div>
      <form className="login-form" onSubmit={submit}>
        <div className="login-field"><label htmlFor="email">Email address</label><div className="search-wrap"><Mail size={15} /><input id="email" className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div></div>
        <div className="login-field"><label htmlFor="password">Password</label><div className="search-wrap"><LockKeyhole size={15} /><input id="password" className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div></div>
        {error && <p style={{ color: "var(--error-500)", fontSize: 11 }}>{error}</p>}
        <Button type="submit" size="lg" disabled={loading} className="login-submit">{loading ? "Signing in…" : "Sign in"}<ArrowRight size={16} /></Button>
      </form>
      <div className="login-divider">or try a demo account</div>
      <div className="demo-buttons">
        <button className="demo-button" onClick={() => demo("admin")}><strong>Avery Quinn <Badge variant="gold">ADMIN</Badge></strong><span>Organization-wide access</span></button>
        <button className="demo-button" onClick={() => demo("team", "team-a")}><strong>Jordan Reyes <Badge variant="teal">TEAM</Badge></strong><span>Team Aurora workspace</span></button>
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>{mockTeams.slice(1).map(t => <button key={t.id} className="demo-button" style={{ flex: 1 }} onClick={() => demo("team", t.id)}><strong>{t.name}</strong><span>Team demo</span></button>)}</div>
      <p className="login-footer">Demo environment · No real credentials required</p>
    </div></div>
  </div>;
}
