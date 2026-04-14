import type { ComponentType } from "react";
import type { PostMeta } from "@/types/post";
import type { MDXContent } from "mdx/types";

type MdxPostModule = {
  default: MDXContent;
  matter: Record<string, unknown>;
};

const mdxPostModulesPromises = import.meta.glob("../../content/posts/*.mdx");

async function resolveMdxPostModules(): Promise<Record<string, MdxPostModule>> {
  const modules = await Promise.all(
    Object.entries(mdxPostModulesPromises).map(async ([key, value]) => [
      key,
      await value(),
    ]),
  );
  return Object.fromEntries(modules);
}

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

function parseFrontmatter(
  filePath: string,
  matter: Record<string, unknown>,
): PostMeta | null {
  const title = typeof matter.title === "string" ? matter.title : null;
  const slug = typeof matter.slug === "string" ? matter.slug : null;
  const date = typeof matter.date === "string" ? matter.date : null;
  const excerpt = typeof matter.excerpt === "string" ? matter.excerpt : null;

  if (!title || !slug || !date || !excerpt) {
    console.warn(
      `[post-manifest] Skipping ${filePath}: missing title, slug, date, or excerpt`,
    );
    return null;
  }

  const readMinutes =
    typeof matter.readMinutes === "number"
      ? matter.readMinutes
      : typeof matter.readMinutes === "string"
        ? Number.parseInt(matter.readMinutes, 10)
        : undefined;

  return {
    title,
    slug,
    date,
    excerpt,
    tags: normalizeTags(matter.tags),
    cover: typeof matter.cover === "string" ? matter.cover : undefined,
    featured: toBool(matter.featured),
    draft: toBool(matter.draft),
    readMinutes: Number.isFinite(readMinutes) ? readMinutes : undefined,
  };
}

export function collectMetaFromModules(
  modules: Record<string, MdxPostModule>,
): PostMeta[] {
  const list: PostMeta[] = [];

  Object.entries(modules).forEach(([filePath, module]) => {
    const meta = parseFrontmatter(filePath, module.matter);
    if (meta) list.push(meta);
  });

  return list;
}

const mdxPostModules = await resolveMdxPostModules();
const allParsed = collectMetaFromModules(mdxPostModules);

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

export function findPostComponentBySlug(slug: string): ComponentType | null {
  const moduleEntry = Object.entries(mdxPostModules).find(([path]) =>
    path.endsWith(`/${slug}.mdx`),
  );
  if (!moduleEntry) return null;
  return moduleEntry[1].default ?? null;
}
