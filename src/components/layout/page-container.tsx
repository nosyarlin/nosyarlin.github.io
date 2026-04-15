import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type PageContainerProps = HTMLAttributes<HTMLDivElement>;

export function PageContainer({ className, ...props }: PageContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full  max-w-6xl py-6 md:py-16 ", className)}
      {...props}
    />
  );
}
