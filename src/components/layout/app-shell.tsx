import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FileText,
  Folder,
  Home,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarNavItem } from "@/components/ui/sidebar-nav-item";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/cn";

function Brand({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  return (
    <div className={cn("min-w-0 shrink", className)}>
      <Link
        to="/"
        onClick={onNavigate}
        className="block truncate font-semibold tracking-tight text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-neutral-50 dark:ring-offset-neutral-900"
      >
        Rayson Lim
      </Link>
      <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
        Portfolio & writing
      </p>
    </div>
  );
}

function SiteNav({
  onNavigate,
  className,
  appearance = "minimal",
}: {
  onNavigate?: () => void;
  className?: string;
  appearance?: "default" | "minimal";
}) {
  return (
    <nav className={cn("flex flex-col gap-1", className)} aria-label="Main">
      <SidebarNavItem
        to="/"
        end
        appearance={appearance}
        icon={<Home className="h-4 w-4" />}
        onNavigate={onNavigate}
      >
        Home
      </SidebarNavItem>
      <SidebarNavItem
        to="/articles"
        appearance={appearance}
        icon={<FileText className="h-4 w-4" />}
        onNavigate={onNavigate}
      >
        Articles
      </SidebarNavItem>
      <SidebarNavItem
        to="/projects"
        appearance={appearance}
        icon={<Folder className="h-4 w-4" />}
        onNavigate={onNavigate}
      >
        Projects
      </SidebarNavItem>
      <SidebarNavItem
        to="/about"
        appearance={appearance}
        icon={<User className="h-4 w-4" />}
        onNavigate={onNavigate}
      >
        About
      </SidebarNavItem>
    </nav>
  );
}

const topIconBtn =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-800 transition hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:ring-offset-neutral-900";

function TopBar({
  mobileNavOpen,
  onToggleMobileNav,
  desktopSidebarOpen,
  onToggleDesktopSidebar,
}: {
  mobileNavOpen: boolean;
  onToggleMobileNav: () => void;
  desktopSidebarOpen: boolean;
  onToggleDesktopSidebar: () => void;
}) {
  return (
    <header
      className="flex h-14 shrink-0 items-center gap-2 border-b border-neutral-200 bg-white px-3 dark:border-neutral-700 dark:bg-neutral-900 md:gap-3 md:px-4"
      role="banner"
    >
      <button
        type="button"
        className={cn(topIconBtn, "md:hidden")}
        aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileNavOpen}
        onClick={onToggleMobileNav}
      >
        {mobileNavOpen ? (
          <X className="h-5 w-5" aria-hidden />
        ) : (
          <Menu className="h-5 w-5" aria-hidden />
        )}
      </button>

      <Button
        type="button"
        variant="ghost"
        className="hidden h-11 w-11 shrink-0 p-0 md:inline-flex"
        aria-label={desktopSidebarOpen ? "Hide sidebar" : "Show sidebar"}
        aria-pressed={desktopSidebarOpen}
        onClick={onToggleDesktopSidebar}
      >
        {desktopSidebarOpen ? (
          <PanelLeftClose className="h-5 w-5" aria-hidden />
        ) : (
          <PanelLeftOpen className="h-5 w-5" aria-hidden />
        )}
      </Button>

      <Brand className="pr-1" />
      <div className="flex-1" />

      <ThemeToggle className="h-11 w-11 shrink-0" />
    </header>
  );
}

function AppShellInner() {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerTitleId = "site-mobile-nav-title";

  const closeMobile = useCallback(() => setMobileNavOpen(false), []);
  const toggleMobile = useCallback(() => setMobileNavOpen((o) => !o), []);
  const toggleDesktopSidebar = useCallback(() => {
    setDesktopSidebarOpen((o) => !o);
  }, []);

  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileNavOpen, closeMobile]);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  return (
    <div className="flex min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <aside
        className={cn(
          "hidden shrink-0 flex-col overflow-hidden border-neutral-200 bg-surface-sidebar transition-[width] duration-200 ease-out dark:border-neutral-700 dark:bg-neutral-800 md:flex",
          desktopSidebarOpen ? "w-64 border-r" : "w-0 border-transparent",
        )}
        aria-label="Site"
      >
        <div className="flex w-64 flex-1 flex-col gap-6 p-4 pt-6">
          <SiteNav />
        </div>
      </aside>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[1px]"
            aria-hidden
            onClick={closeMobile}
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
                onClick={closeMobile}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <SiteNav onNavigate={closeMobile} />
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          mobileNavOpen={mobileNavOpen}
          onToggleMobileNav={toggleMobile}
          desktopSidebarOpen={desktopSidebarOpen}
          onToggleDesktopSidebar={toggleDesktopSidebar}
        />
        <main className="flex-1 overflow-auto" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AppShell() {
  return <AppShellInner />;
}
