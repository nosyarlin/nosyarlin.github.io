import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type SearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  leftIcon?: ReactNode;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ className, leftIcon, ...props }, ref) {
    return (
      <div className="relative w-full">
        {leftIcon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          type="search"
          className={cn(
            "input-base",
            leftIcon ? "pl-9" : undefined,
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
