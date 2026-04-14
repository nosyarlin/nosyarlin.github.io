import { ProjectCard, TextBody, TextHeading } from "@/components/ui";
import { PageContainer } from "@/components/layout";
import { PROJECTS } from "@/data/projects";

export function ProjectsPage() {
  return (
    <PageContainer>
      <TextHeading as="h1">Projects</TextHeading>
      <TextBody className="mt-3 max-w-2xl">
        A curated collection of my work in product design, creative engineering,
        and digital systems. Each entry reflects a commitment to clarity,
        function, and aesthetic precision.
      </TextBody>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            image={project.image}
            imageFallback={project.imageFallback}
            imageAlt={project.imageAlt}
            tags={project.tags}
            href={project.href}
          />
        ))}
      </div>
    </PageContainer>
  );
}
