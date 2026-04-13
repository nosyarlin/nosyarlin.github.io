import { describe, expect, it } from "vitest";
import {
  POST_MANIFEST,
  collectMetaFromModules,
  getPostBySlug,
} from "@/data/post-manifest";

describe("post-manifest", () => {
  it("loads seeded article metadata from MDX front matter", () => {
    expect(POST_MANIFEST.length).toBeGreaterThan(0);

    const slugs = POST_MANIFEST.map((p) => p.slug);
    expect(slugs).toContain("welcome-to-the-journal");
    expect(slugs).toContain("shipping-small");
  });

  it("resolves metadata by slug", () => {
    const post = getPostBySlug("welcome-to-the-journal");
    expect(post?.title).toBe("Welcome to the journal");
  });

  it("supports glob module shape with default raw string", () => {
    const modules: Record<string, unknown> = {
      "/content/posts/custom.mdx": {
        default: `---
title: Custom test post
slug: custom-test-post
date: "2024-12-24"
excerpt: test excerpt
tags:
  - Test
---`,
      },
    };
    const meta = collectMetaFromModules(modules);
    expect(meta).toHaveLength(1);
    expect(meta[0]?.slug).toBe("custom-test-post");
  });
});
