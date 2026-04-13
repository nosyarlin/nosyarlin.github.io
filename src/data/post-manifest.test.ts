import { describe, expect, it } from "vitest";
import {
  collectMetaFromModules,
} from "@/data/post-manifest";

describe("post-manifest", () => {
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

  it("supports glob module shape with direct raw string", () => {
    const modules: Record<string, unknown> = {
      "/content/posts/plain.mdx": `---
title: Plain test post
slug: plain-test-post
date: "2024-12-01"
excerpt: plain source
tags:
  - Plain
---`,
    };
    const meta = collectMetaFromModules(modules);
    expect(meta).toHaveLength(1);
    expect(meta[0]?.slug).toBe("plain-test-post");
  });
});
