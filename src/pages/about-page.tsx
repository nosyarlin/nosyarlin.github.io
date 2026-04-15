import { Button, TextBody, TextEyebrow, TextHeading } from "@/components/ui";
import { PageContainer } from "@/components/layout";

const socials = [
  { label: "GitHub", href: "https://github.com/nosyarlin" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rayson-lim/" },
  { label: "Email", href: "mailto:rayson.ljk@gmail.com" },
];

export function AboutPage() {
  return (
    <PageContainer>
      <TextEyebrow>About</TextEyebrow>
      <div className="mt-4 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <aside className="space-y-5">
          <picture>
            <source srcSet="/imgs/webp/profile.webp" type="image/webp" />
            <img
              src="/imgs/profile.png"
              alt="Portrait of Rayson Lim"
              className="aspect-square w-full rounded-lg border border-neutral-200 object-cover shadow-soft dark:border-neutral-700"
            />
          </picture>
        </aside>

        <section className="max-w-3xl">
          <TextEyebrow className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-primary dark:bg-primary/20 dark:text-primary-200">
            Software Engineer
          </TextEyebrow>
          <TextHeading as="h1" className="mt-4 text-3xl md:text-5xl">
            I'm Rayson Lim.
          </TextHeading>
          <TextBody className="mt-5 max-w-2xl text-md leading-6">
            I am a full-stack software engineer with a background in product
            engineering. I enjoy splitting my time between the frontend and the
            backend. Over my career, I have worked at companies of all sizes,
            ranging from two-person startups to FAANG.
          </TextBody>
          <TextBody className="mt-4 max-w-2xl text-md leading-6">
            My work has also given me the opportunity to live in the San
            Francisco Bay Area for a few years. I am currently residing in
            Singapore, where I grew up.
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

      <div className="mt-16 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="border-l-2 border-neutral-200 pl-5 dark:border-neutral-700">
          <TextEyebrow className="text-primary dark:text-primary-200">
            My Philosophy
          </TextEyebrow>
          <p className="mt-4 text-xl font-medium italic leading-relaxed text-neutral-700 dark:text-neutral-300">
            "Build with small and composable pieces."
          </p>
        </aside>

        <section className="max-w-3xl">
          <TextBody className="text-md leading-6">
            I started programming when I was 19 years old on a Samsung Galaxy
            S3. During my military service, evenings were relatively free, and
            the only forms of entertainment I had were my books and my phone.
            Out of boredom, I downloaded a Python interpreter on my phone.
            That's how I got started on my software engineering journey.
          </TextBody>
          <TextBody className="mt-5 text-md leading-6">
            My philosophy when building software is to start with small,
            composable pieces and build features by combining what I already
            have. Smaller pieces tend to be more reusable and can reduce future
            workload. Having composable building blocks also keeps things
            flexible and makes it easier to adapt to new requirements.
          </TextBody>
          <TextBody className="mt-5 text-md leading-6">
            In my free time, I enjoy being in nature, playing sports, and
            exercising. At the risk of sounding like every other software
            engineer in their 30s, I've recently gotten really into running and
            am currently training for a marathon. My younger self definitely
            wouldn't have seen this coming. 😂
          </TextBody>
        </section>
      </div>
    </PageContainer>
  );
}
