import { cn } from "@/lib/cn";

export type TagPillProps = {
  children: React.ReactNode;
  className?: string;
};

export function TagPill({ children, className }: TagPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-neutral-200/90 px-2.5 py-0.5 text-xs font-medium text-neutral-700 dark:bg-neutral-700/90 dark:text-neutral-200",
        className,
      )}
    >
      {children}
    </span>
  );
}
