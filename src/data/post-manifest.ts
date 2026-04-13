import matter from "gray-matter";
import type { ComponentType } from "react";
import type { PostMeta } from "@/types/post";

const rawPostModules = import.meta.glob<string>("../../content/posts/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
});

const mdxPostModules = import.meta.glob("../../content/posts/*.mdx");

function normalizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) return tags.map(String);
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function toBool(v: unknown): boolean | undefined {
  if (typeof v === "boolean") return v;
  return undefined;
}

function parseFrontmatter(raw: string, filePath: string): PostMeta | null {
  const { data } = matter(raw);
  if (typeof data !== "object" || data === null) return null;

  const title = typeof data.title === "string" ? data.title : null;
  const slug = typeof data.slug === "string" ? data.slug : null;
  const date = typeof data.date === "string" ? data.date : null;
  const excerpt = typeof data.excerpt === "string" ? data.excerpt : null;

  if (!title || !slug || !date || !excerpt) {
    console.warn(`[post-manifest] Skipping ${filePath}: missing title, slug, date, or excerpt`);
    return null;
  }

  const readMinutes =
    typeof data.readMinutes === "number"
      ? data.readMinutes
      : typeof data.readMinutes === "string"
        ? Number.parseInt(data.readMinutes, 10)
        : undefined;

  return {
    title,
    slug,
    date,
    excerpt,
    tags: normalizeTags(data.tags),
    cover: typeof data.cover === "string" ? data.cover : undefined,
    featured: toBool(data.featured),
    draft: toBool(data.draft),
    readMinutes: Number.isFinite(readMinutes) ? readMinutes : undefined,
  };
}

function collectMeta(): PostMeta[] {
  const list: PostMeta[] = [];
  for (const filePath of Object.keys(rawPostModules)) {
    const raw = rawPostModules[filePath];
    if (typeof raw !== "string") continue;
    const meta = parseFrontmatter(raw, filePath);
    if (meta) list.push(meta);
  }
  return list;
}

const allParsed = collectMeta();

/** Every post with valid front matter (includes drafts). */
export const ALL_POST_META: PostMeta[] = [...allParsed].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
);

const prod = import.meta.env.PROD;

/** Published posts only: omits `draft: true` in production; dev includes drafts for preview. */
export const POST_MANIFEST: PostMeta[] = ALL_POST_META.filter(
  (p) => !prod || !p.draft,
);

export function getPostManifest(): PostMeta[] {
  return POST_MANIFEST;
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return POST_MANIFEST.find((p) => p.slug === slug);
}

export async function loadPostComponentBySlug(
  slug: string,
): Promise<ComponentType | null> {
  const moduleEntry = Object.entries(mdxPostModules).find(([path]) =>
    path.endsWith(`/${slug}.mdx`),
  );
  if (!moduleEntry) return null;
  const mod = (await moduleEntry[1]()) as { default?: ComponentType };
  return mod.default ?? null;
}
