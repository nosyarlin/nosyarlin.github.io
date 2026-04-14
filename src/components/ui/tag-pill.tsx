import { cn } from "@/lib/cn";

export type TagPillVariant = "neutral" | "primary" | "secondary" | "tertiary";

// Theme-backed accent choices for auto-colored tag pills.
const THEME_TAG_VARIANTS: Exclude<TagPillVariant, "neutral">[] = [
  "primary",
  "secondary",
  "tertiary",
];

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

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getAutoVariant(children: React.ReactNode): TagPillVariant {
  if (typeof children !== "string" && typeof children !== "number") {
    return "neutral";
  }
  const normalized = String(children).trim().toLowerCase();
  if (!normalized) return "neutral";
  const idx = hashString(normalized) % THEME_TAG_VARIANTS.length;
  return THEME_TAG_VARIANTS[idx];
}

export function TagPill({
  children,
  className,
  variant,
}: TagPillProps) {
  const resolvedVariant = variant ?? getAutoVariant(children);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium",
        variantClass[resolvedVariant],
        className,
      )}
    >
      {children}
    </span>
  );
}
