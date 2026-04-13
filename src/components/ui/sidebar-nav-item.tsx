import { type ReactNode } from "react";
import { Link, useMatch } from "react-router-dom";
import { cn } from "@/lib/cn";

export type SidebarNavItemProps = {
  to: string;
  icon?: ReactNode;
  children: React.ReactNode;
  end?: boolean;
  onNavigate?: () => void;
  /** Notion-style rail: no icon tile, uppercase labels. Default keeps icon chip for Storybook / dense UIs. */
  appearance?: "default" | "minimal";
};

export function SidebarNavItem({
  to,
  icon,
  children,
  end,
  onNavigate,
  appearance = "default",
}: SidebarNavItemProps) {
  const match = useMatch({ path: to, end: end ?? to === "/" });
  const active = !!match;
  const minimal = appearance === "minimal";

  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={cn(
        "flex items-center rounded-md px-3 py-2 font-medium transition-colors",
        minimal ? "gap-2.5 text-xs uppercase tracking-[0.12em]" : "gap-3 text-sm",
        minimal
          ? active
            ? "text-primary dark:text-primary-200"
            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          : active
            ? "bg-white text-primary shadow-sm dark:bg-neutral-700 dark:text-primary-200"
            : "text-neutral-600 hover:bg-white/70 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700/70 dark:hover:text-neutral-100",
      )}
    >
      {icon ? (
        minimal ? (
          <span
            className={cn(
              "shrink-0 [&_svg]:h-4 [&_svg]:w-4",
              active ? "text-primary dark:text-primary-200" : "text-neutral-400 dark:text-neutral-500",
            )}
            aria-hidden
          >
            {icon}
          </span>
        ) : (
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
        )
      ) : null}
      <span>{children}</span>
    </Link>
  );
}
