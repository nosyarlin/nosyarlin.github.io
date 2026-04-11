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
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl border border-neutral-200 bg-surface-muted px-3 py-2 shadow-inner dark:border-neutral-700 dark:bg-neutral-800/80",
          className,
        )}
      >
        {leftIcon ? (
          <span className="shrink-0 text-neutral-400 dark:text-neutral-500">
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          type="search"
          className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-50 dark:placeholder:text-neutral-500"
          {...props}
        />
      </div>
    );
  },
);
