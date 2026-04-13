import { type ReactNode } from "react";
import { Link, useMatch } from "react-router-dom";
import { cn } from "@/lib/cn";

export type SidebarNavItemProps = {
  to: string;
  icon?: ReactNode;
  children: React.ReactNode;
  end?: boolean;
  onNavigate?: () => void;
};

export function SidebarNavItem({
  to,
  icon,
  children,
  end,
  onNavigate,
}: SidebarNavItemProps) {
  const match = useMatch({ path: to, end: end ?? to === "/" });
  const active = !!match;

  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-white text-primary shadow-sm dark:bg-neutral-700 dark:text-primary-200"
          : "text-neutral-600 hover:bg-white/70 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700/70 dark:hover:text-neutral-100",
      )}
    >
      {icon ? (
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
            active
              ? "bg-primary text-white"
              : "bg-neutral-200/80 dark:bg-neutral-600",
          )}
        >
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </Link>
  );
}
