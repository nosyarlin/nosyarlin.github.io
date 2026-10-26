import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const tags = z
  .union([z.array(z.string()), z.string()])
  .optional()
  .transform((value) => {
    if (Array.isArray(value)) return value.map(String);
    if (typeof value === "string") {
      return value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  });

const posts = defineCollection({
  loader: glob({
    pattern: "*.mdx",
    base: "./content/posts",
    generateId: ({ data }) => String(data.slug),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    excerpt: z.string(),
    tags,
    cover: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    readMinutes: z.coerce.number().int().positive().optional(),
  }),
});

export const collections = { posts };
