# raysonlim.com (portfolio + blog)

Astro + React + TypeScript + Tailwind, statically generated and hosted on GitHub Pages.

Every route is pre-rendered to HTML at build time, with SEO/Open Graph tags, so crawlers
and link previews (daily.dev, Slack, X, LinkedIn) see real content. React is only shipped
for interactive islands: the theme toggle, the mobile nav drawer, and the `/articles` filters.

## Development

```bash
npm ci
npm run dev
```

Open [http://localhost:4321/](http://localhost:4321/) for the app.

## Writing posts

Add an `.mdx` file to `content/posts/` with front matter:

```yaml
---
title: My post
slug: my-post            # URL: /articles/my-post (must be unique)
date: "2026-10-26"
excerpt: |
  Used for the card, meta description, RSS, and link previews.
tags: [Programming]
readMinutes: 5           # optional
featured: true           # optional
draft: true              # optional; hidden in production builds
cover: /imgs/foo.png     # optional; overrides the generated OG image
---
```

Front matter is validated by the content collection schema in `src/content.config.ts`.
A 1200×630 preview image is generated for each post at `/og/<slug>.png` during the build
(`src/lib/og-image.tsx`).

## Storybook (design review)

```bash
npm run storybook
```

Open [http://localhost:6006/](http://localhost:6006/) to browse atomic UI components. Use the Storybook **theme** toolbar to switch light/dark (Tailwind `dark` class).

Static export:

```bash
npm run build-storybook
```

Output: `storybook-static/` (gitignored).

## Production build

```bash
npm run build
```

Output: `dist/` (one `.html` file per route, plus `rss.xml`, `sitemap-index.xml`, and `og/*.png`).

```bash
npm run preview
```

## Deploying to GitHub Pages

This repo deploys `dist/` with GitHub Actions using `.github/workflows/deploy.yml`.

### One-time repository setup

1. GitHub repo Settings -> Pages
2. Set **Source** to **GitHub Actions**
3. Ensure the custom domain is `raysonlim.com` and HTTPS is enabled

### URLs

`astro.config.mjs` uses `build.format: "file"` and `trailingSlash: "never"`, so
`/articles/my-post` is emitted as `articles/my-post.html` and GitHub Pages serves it
directly with a 200 (no trailing-slash redirect). Unknown routes get `404.html`.

### Domain config

- `public/CNAME` is included in the built site and set to `raysonlim.com`.
