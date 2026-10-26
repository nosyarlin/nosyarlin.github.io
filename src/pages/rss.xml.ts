import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? "https://raysonlim.com",
    items: posts.map(({ data }) => ({
      title: data.title,
      description: data.excerpt.replace(/\s+/g, " ").trim(),
      pubDate: new Date(data.date),
      link: `/articles/${data.slug}`,
      categories: data.tags,
    })),
    customData: "<language>en</language>",
    // Match the site's trailingSlash: "never" URLs.
    trailingSlash: false,
  });
}
