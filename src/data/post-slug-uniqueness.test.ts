import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const postsDir = path.resolve(import.meta.dirname, "../../content/posts");

function readSlug(filePath: string): string | null {
  const source = readFileSync(filePath, "utf8");
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
  const slug = frontmatter.match(/^slug:\s*["']?(.+?)["']?\s*$/m)?.[1];
  return slug?.trim() || null;
}

describe("post slugs", () => {
  it("ensures every post has a unique slug", () => {
    const slugToFiles = new Map<string, string[]>();

    readdirSync(postsDir)
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => {
        const slug = readSlug(path.join(postsDir, file));
        if (!slug) return;

        const files = slugToFiles.get(slug) ?? [];
        files.push(file);
        slugToFiles.set(slug, files);
      });

    const duplicates = Array.from(slugToFiles.entries()).filter(
      ([, files]) => files.length > 1,
    );

    expect(duplicates).toEqual([]);
  });
});
