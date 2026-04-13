import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ComponentType } from "react";
import { TagPill, TextBody, TextEyebrow, TextHeading } from "@/components/ui";
import {
  getPostBySlug,
  loadPostComponentBySlug,
} from "@/data/post-manifest";

function formatDate(iso: string) {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export function ArticleDetailPage() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;
  const [PostBody, setPostBody] = useState<ComponentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!slug || !post) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const module = await loadPostComponentBySlug(slug);
      if (!cancelled) {
        setPostBody(() => module);
        setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [slug, post]);

  if (!post) {
    return (
      <div className="p-6 md:p-10">
        <div className="mx-auto w-full max-w-3xl">
          <TextEyebrow>Article</TextEyebrow>
          <TextHeading as="h1" className="mt-2">
            Not found
          </TextHeading>
          <TextBody className="mt-3">
            We could not find that article. Return to{" "}
            <Link to="/articles" className="text-primary underline-offset-4 hover:underline">
              all articles
            </Link>
            .
          </TextBody>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10">
      <article className="mx-auto w-full max-w-3xl">
        <Link
          to="/articles"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          ← Back to articles
        </Link>

        <header className="mt-6">
          <TextEyebrow>Article</TextEyebrow>
          <TextHeading as="h1" className="mt-2">
            {post.title}
          </TextHeading>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            {formatDate(post.date)}
            {post.readMinutes != null ? ` · ${post.readMinutes} min read` : ""}
          </p>
          {post.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          ) : null}
        </header>

        {loading ? (
          <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
            Loading article…
          </p>
        ) : PostBody ? (
          <div className="mt-8 space-y-4 text-base leading-relaxed text-neutral-700 dark:text-neutral-300 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:text-neutral-900 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-neutral-900 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-neutral-900 [&_a]:text-primary [&_a]:underline-offset-4 [&_a:hover]:underline [&_blockquote]:rounded-md [&_blockquote]:border-l-4 [&_blockquote]:border-neutral-300 [&_blockquote]:bg-neutral-100 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:italic [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-neutral-900 [&_pre]:p-4 [&_pre]:text-neutral-100 [&_ul]:list-disc [&_ul]:pl-6 dark:[&_h1]:text-neutral-50 dark:[&_h2]:text-neutral-50 dark:[&_h3]:text-neutral-100 dark:[&_blockquote]:border-neutral-600 dark:[&_blockquote]:bg-neutral-800">
            <PostBody />
          </div>
        ) : (
          <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
            This article body could not be loaded.
          </p>
        )}
      </article>
    </div>
  );
}
