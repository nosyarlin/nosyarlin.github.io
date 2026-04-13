import { cn } from "@/lib/cn";

export type TagPillVariant = "neutral" | "primary" | "secondary" | "tertiary";

const variantClass: Record<TagPillVariant, string> = {
  neutral:
    "bg-neutral-200/90 text-neutral-700 dark:bg-neutral-600/90 dark:text-neutral-100",
  primary:
    "bg-primary/15 text-primary-700 dark:bg-primary/20 dark:text-primary-200",
  secondary:
    "bg-secondary/15 text-secondary-700 dark:bg-secondary/20 dark:text-secondary-200",
  tertiary:
    "bg-tertiary/15 text-tertiary-700 dark:bg-tertiary/20 dark:text-tertiary-200",
};

export type TagPillProps = {
  children: React.ReactNode;
  className?: string;
  variant?: TagPillVariant;
};

export function TagPill({
  children,
  className,
  variant = "neutral",
}: TagPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
