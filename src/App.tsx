import { Link, Route, Routes } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

function Home() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen bg-neutral-50 p-8 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
        RAY-34 — scaffold
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-primary">
        Vite + React + Tailwind
      </h1>
      <p className="mt-2 max-w-prose text-neutral-600 dark:text-neutral-400">
        Router is active. Design tokens (primary / neutral scales) are configured
        in <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-800">tailwind.config.js</code>
        . Dark mode uses <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-800">class</code>{" "}
        strategy on <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-800">document.documentElement</code>.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" aria-hidden />
          ) : (
            <Moon className="h-4 w-4" aria-hidden />
          )}
          Toggle theme (stub)
        </button>
        <Link
          to="/router-check"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Go to second route →
        </Link>
      </div>
    </div>
  );
}

function RouterCheck() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8 dark:bg-neutral-950 dark:text-neutral-50">
      <p className="text-primary">react-router-dom is working.</p>
      <Link to="/" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
        ← Back home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/router-check" element={<RouterCheck />} />
    </Routes>
  );
}
