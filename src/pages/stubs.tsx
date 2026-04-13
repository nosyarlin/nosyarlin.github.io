import { TextBody, TextEyebrow, TextHeading } from "@/components/ui/text";

export function HomePage() {
  return (
    <div className="p-6 md:p-10">
      <TextEyebrow>Home</TextEyebrow>
      <TextHeading as="h1" className="mt-2 text-primary">
        Rayson Lim
      </TextHeading>
      <TextBody className="mt-3 max-w-prose text-neutral-600 dark:text-neutral-400">
        Full home layout (featured post, recent entries) ships in RAY-39. The global shell
        (sidebar, search, theme) is live now — try the menu on small screens.
      </TextBody>
    </div>
  );
}

export function ArticlesPageStub() {
  return (
    <div className="p-6 md:p-10">
      <TextEyebrow>Articles</TextEyebrow>
      <TextHeading as="h1" className="mt-2">
        Coming soon
      </TextHeading>
      <TextBody className="mt-3 max-w-prose text-neutral-600 dark:text-neutral-400">
        Article list and metadata search will land with RAY-36 / RAY-37.
      </TextBody>
    </div>
  );
}

export function ProjectsPageStub() {
  return (
    <div className="p-6 md:p-10">
      <TextEyebrow>Projects</TextEyebrow>
      <TextHeading as="h1" className="mt-2">
        Coming soon
      </TextHeading>
      <TextBody className="mt-3 max-w-prose text-neutral-600 dark:text-neutral-400">
        Legacy portfolio cards migrate in RAY-40.
      </TextBody>
    </div>
  );
}

export function AboutPageStub() {
  return (
    <div className="p-6 md:p-10">
      <TextEyebrow>About</TextEyebrow>
      <TextHeading as="h1" className="mt-2">
        Coming soon
      </TextHeading>
      <TextBody className="mt-3 max-w-prose text-neutral-600 dark:text-neutral-400">
        About page content ships in RAY-41.
      </TextBody>
    </div>
  );
}
