import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TextEyebrowProps = HTMLAttributes<HTMLParagraphElement>;

export function TextEyebrow({ className, ...props }: TextEyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

export type TextHeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
};

export function TextHeading({
  as: Tag = "h2",
  className,
  children,
  ...props
}: TextHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-semibold tracking-tight text-neutral-900 dark:text-neutral-50",
        Tag === "h1" && "text-3xl md:text-4xl",
        Tag === "h2" && "text-2xl md:text-3xl",
        Tag === "h3" && "text-xl md:text-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export type TextBodyProps = HTMLAttributes<HTMLParagraphElement>;

export function TextBody({ className, ...props }: TextBodyProps) {
  return (
    <p
      className={cn(
        "text-base leading-relaxed text-neutral-600 dark:text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}

export type TextLabelProps = HTMLAttributes<HTMLSpanElement>;

export function TextLabel({ className, ...props }: TextLabelProps) {
  return (
    <span
      className={cn("text-sm text-neutral-600 dark:text-neutral-400", className)}
      {...props}
    />
  );
}
