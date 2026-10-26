import { getCollection, type CollectionEntry } from "astro:content";
import type { PostMeta } from "@/types/post";

export type PostEntry = CollectionEntry<"posts">;

function byDateDesc(a: PostEntry, b: PostEntry) {
  return a.data.date < b.data.date ? 1 : a.data.date > b.data.date ? -1 : 0;
}

/** Published posts, newest first: omits `draft: true` in production; dev includes drafts for preview. */
export async function getPublishedPosts(): Promise<PostEntry[]> {
  const entries = await getCollection(
    "posts",
    ({ data }) => !import.meta.env.PROD || !data.draft,
  );
  return entries.sort(byDateDesc);
}

export function toPostMeta(entry: PostEntry): PostMeta {
  const { data } = entry;
  return {
    title: data.title,
    slug: data.slug,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags,
    cover: data.cover,
    featured: data.featured,
    draft: data.draft,
    readMinutes: data.readMinutes,
  };
}
