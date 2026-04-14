import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type PageContainerProps = HTMLAttributes<HTMLDivElement>;

export function PageContainer({ className, ...props }: PageContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full py-12 md:py-16", className)}
      {...props}
    />
  );
}
