import { cn } from "@/lib/cn";

export type ProgressBarProps = {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
};

export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700",
        className,
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all", barClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
