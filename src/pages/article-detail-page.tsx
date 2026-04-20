import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ComponentType } from "react";
import {
  TagPill,
  TextBody,
  TextEyebrow,
  TextHeading,
  TextMuted,
} from "@/components/ui";
import { getPostBySlug, findPostComponentBySlug } from "@/data/post-manifest";
import { PageContainer } from "@/components/layout";

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
      const module = findPostComponentBySlug(slug);
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
      <PageContainer>
        <TextEyebrow>Article</TextEyebrow>
        <TextHeading as="h1" className="mt-2">
          Not found
        </TextHeading>
        <TextBody className="mt-3">
          We could not find that article. Return to{" "}
          <Link
            to="/articles"
            className="text-primary underline-offset-4 hover:underline"
          >
            all articles
          </Link>
          .
        </TextBody>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Link to="/articles" className="link-accent">
        ← Back to articles
      </Link>

      <header className="mt-6">
        <TextEyebrow>Article</TextEyebrow>
        <TextHeading as="h1" className="mt-2">
          {post.title}
        </TextHeading>
        <TextMuted className="mt-3">
          {formatDate(post.date)}
          {post.readMinutes != null ? ` · ${post.readMinutes} min read` : ""}
        </TextMuted>
        {post.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        ) : null}
      </header>

      {loading ? (
        <TextMuted className="mt-8">Loading article…</TextMuted>
      ) : PostBody ? (
        <div className="article-content">
          <PostBody />
        </div>
      ) : (
        <TextMuted className="mt-8">
          This article body could not be loaded.
        </TextMuted>
      )}
    </PageContainer>
  );
}
