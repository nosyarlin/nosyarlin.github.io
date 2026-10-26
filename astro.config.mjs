// @ts-check
import { fileURLToPath } from "node:url";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeStarryNight from "rehype-starry-night";

export default defineConfig({
  site: "https://raysonlim.com",
  output: "static",
  // `file` emits /articles/slug.html, which GitHub Pages serves at
  // /articles/slug without a trailing-slash redirect.
  trailingSlash: "never",
  build: {
    format: "file",
  },
  markdown: {
    // Highlighting comes from starry-night (styles imported in index.css),
    // not Astro's built-in Shiki.
    syntaxHighlight: false,
    processor: unified({ rehypePlugins: [rehypeStarryNight] }),
  },
  integrations: [react(), mdx(), sitemap()],
  vite: {
    // resvg ships a native .node binary (used for OG images); load it from
    // node_modules instead of letting Vite try to bundle it.
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    ssr: {
      external: ["@resvg/resvg-js"],
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
