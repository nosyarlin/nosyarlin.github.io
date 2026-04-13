import { Link } from "react-router-dom";
import { TextBody, TextEyebrow, TextHeading } from "@/components/ui/text";
import { POST_MANIFEST } from "@/data/post-manifest";

export function HomePage() {
  const count = POST_MANIFEST.length;
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
      <TextBody className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        Build-time manifest:{" "}
        <Link to="/articles" className="font-medium text-primary underline-offset-4 hover:underline">
          {count} published {count === 1 ? "post" : "posts"}
        </Link>{" "}
        (RAY-36).
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
