import type { APIRoute, GetStaticPaths } from "astro";
import { formatDate } from "@/lib/format-date";
import { renderOgImage } from "@/lib/og-image";
import { getPublishedPosts, type PostEntry } from "@/lib/posts";

export const getStaticPaths = (async () => {
  const posts = await getPublishedPosts();
  return [
    { params: { slug: "default" }, props: { post: undefined } },
    ...posts.map((post) => ({ params: { slug: post.id }, props: { post } })),
  ];
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ post: PostEntry | undefined }> = async ({
  props,
}) => {
  const { post } = props;
  const png = post
    ? await renderOgImage({
        title: post.data.title,
        eyebrow: formatDate(post.data.date),
        tags: post.data.tags,
      })
    : await renderOgImage({
        title: "Records of my learnings for the future me.",
        eyebrow: "Portfolio & writing",
        subtitle: "Side projects, programming languages, and lessons learned.",
      });

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
