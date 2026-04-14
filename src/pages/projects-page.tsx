import { ProjectCard, TextBody, TextEyebrow, TextHeading } from "@/components/ui";
import { PROJECTS } from "@/data/projects";

export function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <TextEyebrow>Projects</TextEyebrow>
      <TextHeading as="h1" className="mt-2">
        Selected projects
      </TextHeading>
      <TextBody className="mt-3 max-w-2xl">
        Legacy portfolio projects migrated from the previous site, preserved with
        original descriptions and technology stacks.
      </TextBody>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            image={project.image}
            imageAlt={project.imageAlt}
            tags={project.tags}
            href={project.href}
          />
        ))}
      </div>
    </div>
  );
}
