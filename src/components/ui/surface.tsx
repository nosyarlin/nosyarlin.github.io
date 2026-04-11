import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SurfaceProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "muted" | "elevated";
};

export function Surface({
  className,
  variant = "default",
  ...props
}: SurfaceProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-neutral-200/80 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900/80",
        variant === "muted" &&
          "border-transparent bg-neutral-100/80 dark:bg-neutral-800/60",
        variant === "elevated" && "shadow-soft",
        className,
      )}
      {...props}
    />
  );
}
