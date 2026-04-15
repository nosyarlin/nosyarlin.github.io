import { Link } from "react-router-dom";
import { ArticleCard } from "@/components/ui/article-card";
import { TextBody, TextEyebrow, TextHeading, TextMuted } from "@/components/ui";
import { PageContainer } from "@/components/layout";
import { POST_MANIFEST } from "@/data/post-manifest";

export function HomePage() {
  const sorted = [...POST_MANIFEST].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  );
  const featured = sorted.find((p) => p.featured) ?? sorted[0];
  const recent = sorted.filter((p) => p.slug !== featured?.slug).slice(0, 6);

  return (
    <PageContainer>
      <TextEyebrow>Home</TextEyebrow>
      <TextHeading as="h1" className="mt-2">
        Records of my{" "}
        <TextHeading as="h1" className="text-primary inline">
          learnings
        </TextHeading>{" "}
        <br /> for the future me.
      </TextHeading>
      <TextBody className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400">
        Welcome to my personal site! I am using this space to document my side
        projects and experimentation so that I can <s>brag</s> look back on the
        things I have done next time. Of course, this will double as my
        portfolio page! Feel free to look around. It would make me very happy if
        my work happens to help someone :)
      </TextBody>

      {featured ? (
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <TextHeading as="h3">Featured entry</TextHeading>
            <Link
              to="/articles"
              className="link-accent text-sm font-medium underline-offset-4 hover:underline"
            >
              View all articles
            </Link>
          </div>
          <ArticleCard post={featured} layout="horizontal" />
        </section>
      ) : null}

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <TextHeading as="h3">Recent entries</TextHeading>
          <TextMuted>
            {sorted.length} published {sorted.length === 1 ? "post" : "posts"}
          </TextMuted>
        </div>

        {recent.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recent.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : featured ? (
          <TextMuted>Only one article is published right now.</TextMuted>
        ) : (
          <TextMuted>No published articles yet.</TextMuted>
        )}
      </section>
    </PageContainer>
  );
}
