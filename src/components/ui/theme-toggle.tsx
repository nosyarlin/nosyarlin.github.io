import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, readDomTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/cn";

export type ThemeToggleProps = {
  className?: string;
  "aria-label"?: string;
};

export function ThemeToggle({
  className,
  "aria-label": ariaLabel = "Toggle color theme",
}: ThemeToggleProps) {
  // The server can't know the theme; the inline head script has already set
  // it on <html>, so sync from the DOM after hydration.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readDomTheme());
  }, []);

  function toggleTheme() {
    const next = readDomTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700",
        className,
      )}
    >
      {theme === null ? (
        <>
          <Sun className="hidden h-5 w-5 dark:block" aria-hidden />
          <Moon className="h-5 w-5 dark:hidden" aria-hidden />
        </>
      ) : theme === "dark" ? (
        <Sun className="h-5 w-5" aria-hidden />
      ) : (
        <Moon className="h-5 w-5" aria-hidden />
      )}
    </button>
  );
}
