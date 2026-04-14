import {
  Button,
  PageContainer,
  TextBody,
  TextEyebrow,
  TextHeading,
} from "@/components/ui";

const socials = [
  { label: "GitHub", href: "https://github.com/nosyarlin" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rayson-lim/" },
  { label: "Email", href: "mailto:rayson.ljk@gmail.com" },
];

export function AboutPage() {
  return (
    <PageContainer size="5xl">
      <TextEyebrow>About</TextEyebrow>
      <TextHeading as="h1" className="mt-2">
        Rayson Lim
      </TextHeading>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <img
            src="/imgs/profile.png"
            alt="Portrait of Rayson Lim"
            className="aspect-square w-full rounded-md border border-neutral-200 object-cover dark:border-neutral-700"
          />
          <span className="inline-flex rounded-md bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary dark:bg-primary/20 dark:text-primary-200">
            Software Engineer
          </span>
        </aside>

        <section>
          <TextBody className="max-w-2xl">
            I am a software engineer from Singapore focused on backend systems,
            product delivery, and developer tooling. I enjoy turning ambiguous
            ideas into maintainable products through disciplined iteration.
          </TextBody>
          <TextBody className="mt-4 max-w-2xl">
            My background spans backend development, Android, and data projects.
            I care about clean architecture, thoughtful user experience, and
            sustainable engineering practices that age well.
          </TextBody>
          <TextBody className="mt-4 max-w-2xl">
            This site is where I share notes on building software, document
            experiments, and publish projects that reflect how I think and work.
          </TextBody>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/rayson-lim-resume-2026.pdf" download>
              <Button>Download Resume</Button>
            </a>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline">{social.label}</Button>
              </a>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
