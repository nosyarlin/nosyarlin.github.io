import { TagPill } from "@/components/ui/tag-pill";
import { Card, CardBody } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  imageFallback?: string;
  imageAlt?: string;
  tags: string[];
  href?: string;
  className?: string;
};

export function ProjectCard({
  title,
  description,
  image,
  imageFallback,
  imageAlt = "",
  tags,
  href,
  className,
}: ProjectCardProps) {
  const imageIsWebp = image.toLowerCase().endsWith(".webp");
  const fallbackSrc = imageFallback ?? image;

  return (
    <Card className={cn("flex h-full flex-col", className)}>
      <picture>
        {imageIsWebp ? <source srcSet={image} type="image/webp" /> : null}
        <img
          src={fallbackSrc}
          alt={imageAlt}
          className="h-44 w-full object-cover"
          onError={(e) => {
            const el = e.currentTarget;
            el.style.display = "none";
          }}
        />
      </picture>
      <CardBody className="flex flex-1 flex-col gap-3">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <TagPill key={t}>{t}</TagPill>
          ))}
        </div>
        <p className="flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
        {href ? (
          <div className="mt-auto flex justify-end pt-2">
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700 dark:focus-visible:ring-offset-neutral-900",
              )}
            >
              View
            </a>
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
