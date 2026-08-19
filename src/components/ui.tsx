import type { ButtonHTMLAttributes, ReactNode, ThHTMLAttributes, TdHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "gold";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <button
      className={cn("btn", `btn-${variant}`, `btn-${size}`, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className,
  padding = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { padding?: boolean }) {
  return (
    <div className={cn("card", padding && "card-padding", className)} {...props}>
      {children}
    </div>
  );
}

export function Badge({
  children,
  variant = "neutral",
  dot = false,
  className,
}: {
  children: ReactNode;
  variant?: "neutral" | "teal" | "gold" | "success" | "warning" | "error" | "info";
  dot?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("badge", `badge-${variant}`, className)}>
      {dot && <span className="badge-dot" />}
      {children}
    </span>
  );
}

export function Avatar({
  initials,
  size = "md",
  color = "teal",
  className,
}: {
  initials: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "teal" | "gold" | "cream" | "dark";
  className?: string;
}) {
  return (
    <span className={cn("avatar", `avatar-${size}`, `avatar-${color}`, className)}>
      {initials}
    </span>
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("divider", className)} />;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="page-description">{description}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </div>
  );
}

export function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  change,
  changeLabel = "vs last month",
  icon,
  accent = "teal",
  trend = "up",
}: {
  label: string;
  value: string;
  change?: string;
  changeLabel?: string;
  icon?: ReactNode;
  accent?: "teal" | "gold" | "dark" | "success";
  trend?: "up" | "down";
}) {
  return (
    <Card className={cn("stat-card", `stat-${accent}`)}>
      <div className="stat-top">
        <span className="stat-label">{label}</span>
        {icon && <span className="stat-icon">{icon}</span>}
      </div>
      <div className="stat-value">{value}</div>
      {change && (
        <div className="stat-bottom">
          <span className={cn("stat-change", trend === "down" ? "negative" : "positive")}>
            {change}
          </span>
          <span className="stat-change-label">{changeLabel}</span>
        </div>
      )}
    </Card>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="error-state">
      <div className="error-icon">!</div>
      <h3>Something went wrong</h3>
      <p>We couldn't load this data. Please try again.</p>
      {onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Try again</Button>}
    </div>
  );
}

export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="loading-state" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div className="skeleton loading-row" key={i} />
      ))}
    </div>
  );
}

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("table-wrap", className)}><table>{children}</table></div>;
}
export function THead({ children }: { children: ReactNode }) { return <thead><tr>{children}</tr></thead>; }
export function TH({ children, ...props }: ThHTMLAttributes<HTMLTableCellElement>) { return <th {...props}>{children}</th>; }
export function TBody({ children }: { children: ReactNode }) { return <tbody>{children}</tbody>; }
export function TR({ children, className }: { children: ReactNode; className?: string }) { return <tr className={className}>{children}</tr>; }
export function TD({ children, ...props }: TdHTMLAttributes<HTMLTableCellElement>) { return <td {...props}>{children}</td>; }

export function ProgressBar({ value, color = "teal" }: { value: number; color?: "teal" | "gold" | "success" | "error" }) {
  return <div className="progress-track"><div className={cn("progress-fill", `progress-${color}`)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>;
}

export function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  return <span className="tooltip-wrap">{children}<span className="tooltip">{text}</span></span>;
}
