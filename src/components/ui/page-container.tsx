import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type PageContainerSize = "3xl" | "5xl" | "6xl";

const sizeClasses: Record<PageContainerSize, string> = {
  "3xl": "max-w-3xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
};

export type PageContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: PageContainerSize;
};

export function PageContainer({
  className,
  size = "6xl",
  ...props
}: PageContainerProps) {
  return <div className={cn("mx-auto w-full", sizeClasses[size], className)} {...props} />;
}
