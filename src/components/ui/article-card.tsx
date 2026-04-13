import { Link } from "react-router-dom";
import { TagPill } from "@/components/ui/tag-pill";
import { cn } from "@/lib/cn";
import type { PostMeta } from "@/types/post";

/** Links: full primary in light mode; dark uses primary-400 with primary-300 on hover. */
const linkAccent =
  "text-primary hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300";

export type ArticleCardProps = {
  post: PostMeta;
  className?: string;
  layout?: "horizontal" | "vertical";
};

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function ArticleCard({
  post,
  className,
  layout = "vertical",
}: ArticleCardProps) {
  const href = `/articles/${post.slug}`;

  if (layout === "horizontal") {
    return (
      <article
        className={cn(
          "flex flex-col gap-4 overflow-hidden rounded-md border border-neutral-200/90 bg-white shadow-soft dark:border-neutral-700 dark:bg-neutral-800 md:flex-row",
          className,
        )}
      >
        {post.cover ? (
          <Link
            to={href}
            className="relative aspect-[16/10] w-full shrink-0 bg-neutral-100 md:aspect-auto md:w-[min(40%,320px)] dark:bg-neutral-700"
          >
            <img
              src={post.cover}
              alt=""
              className="h-full w-full object-cover"
            />
          </Link>
        ) : null}
        <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
          <time
            dateTime={post.date}
            className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400"
          >
            {formatDate(post.date)}
          </time>
          <h2 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            <Link to={href} className={cn(linkAccent)}>
              {post.title}
            </Link>
          </h2>
          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {post.excerpt}
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <TagPill key={t}>{t}</TagPill>
            ))}
          </div>
          <Link to={href} className={cn("text-sm font-medium underline-offset-4 hover:underline", linkAccent)}>
            Read the entry
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "rounded-md border border-neutral-200/90 bg-white p-5 shadow-soft dark:border-neutral-700 dark:bg-neutral-800",
        className,
      )}
    >
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        {formatDate(post.date)}
        {post.readMinutes != null ? ` · ${post.readMinutes} min read` : ""}
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
        <Link to={href} className={cn(linkAccent)}>
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-neutral-600 dark:text-neutral-400">
        {post.excerpt}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <TagPill key={t}>{t}</TagPill>
        ))}
      </div>
    </article>
  );
}
