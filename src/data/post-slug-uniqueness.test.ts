import { describe, expect, it } from "vitest";

type PostMatter = {
  slug?: unknown;
};

const postMatters = import.meta.glob("../../content/posts/*.mdx", {
  eager: true,
  import: "matter",
}) as Record<string, PostMatter>;

describe("post slugs", () => {
  it("ensures every post has a unique slug", () => {
    const slugToFiles = new Map<string, string[]>();

    Object.entries(postMatters).forEach(([filePath, matter]) => {
      if (typeof matter.slug !== "string" || !matter.slug.trim()) return;

      const slug = matter.slug.trim();
      const files = slugToFiles.get(slug) ?? [];
      files.push(filePath);
      slugToFiles.set(slug, files);
    });

    const duplicates = Array.from(slugToFiles.entries()).filter(
      ([, files]) => files.length > 1,
    );

    expect(duplicates).toEqual([]);
  });
});
