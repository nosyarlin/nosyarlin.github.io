import { useCallback, useEffect, useRef, useState } from "react";
import { FileText, Folder, Home, Menu, User, X } from "lucide-react";
import { SidebarNavItem } from "@/components/ui/sidebar-nav-item";
import { cn } from "@/lib/cn";
import { NAV_ITEMS, isNavActive } from "@/lib/site";

export const topIconBtn =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-800 transition hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:ring-offset-neutral-900";

const NAV_ICONS: Record<string, React.ReactNode> = {
  "/": <Home className="h-4 w-4" />,
  "/articles": <FileText className="h-4 w-4" />,
  "/projects": <Folder className="h-4 w-4" />,
  "/about": <User className="h-4 w-4" />,
};

export type MobileNavProps = {
  currentPath: string;
};

export function MobileNav({ currentPath }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerTitleId = "site-mobile-nav-title";

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={cn(topIconBtn, "md:hidden")}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-mobile-drawer"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden />
        ) : (
          <Menu className="h-5 w-5" aria-hidden />
        )}
      </button>

      {open ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[1px]"
            aria-hidden
            onClick={close}
          />
          <div
            id="site-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby={drawerTitleId}
            className="absolute left-0 top-0 flex h-full w-[min(288px,88vw)] flex-col border-r border-neutral-200 bg-surface-sidebar shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
          >
            <div className="flex items-center justify-end border-b border-neutral-200 p-3 dark:border-neutral-700">
              <h2 id={drawerTitleId} className="sr-only">
                Site navigation
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                className={cn(
                  topIconBtn,
                  "border-neutral-200 dark:border-neutral-600 dark:bg-neutral-800 dark:ring-offset-neutral-800",
                )}
                aria-label="Close menu"
                onClick={close}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <nav className="flex flex-col gap-1" aria-label="Main">
                {NAV_ITEMS.map((item) => (
                  <SidebarNavItem
                    key={item.href}
                    to={item.href}
                    active={isNavActive(currentPath, item.href, item.end)}
                    appearance="minimal"
                    icon={NAV_ICONS[item.href]}
                    onNavigate={close}
                  >
                    {item.label}
                  </SidebarNavItem>
                ))}
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
