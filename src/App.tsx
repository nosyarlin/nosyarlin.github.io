import { Link, Route, Routes } from "react-router-dom";
import { Pencil, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { TextBody, TextEyebrow, TextHeading } from "@/components/ui/text";
import { ThemeToggle } from "@/components/ui/theme-toggle";

function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <TextEyebrow>RAY-43 — atomic UI components</TextEyebrow>
      <TextHeading as="h1" className="mt-2 text-primary">
        Design primitives
      </TextHeading>
      <TextBody className="mt-2 max-w-prose">
        Buttons, inputs, typography, and theme toggle live in{" "}
        <code className="rounded bg-neutral-200 px-1 dark:bg-neutral-800">src/components/ui</code>
        . Storybook will be added in RAY-44.
      </TextBody>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <ThemeToggle />
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="inverted">Inverted</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="primary" leftIcon={<Pencil className="h-4 w-4" />}>
          Label
        </Button>
        <Link
          to="/router-check"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Go to second route →
        </Link>
      </div>
      <div className="mt-6 max-w-md">
        <SearchInput
          leftIcon={<Search className="h-4 w-4" />}
          placeholder="Search"
          aria-label="Search demo"
        />
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
