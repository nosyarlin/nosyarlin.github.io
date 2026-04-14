# raysonlim.com (portfolio + blog)

Vite + React + TypeScript + Tailwind. Hosted on GitHub Pages.

## Development

```bash
npm ci
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) for the app.

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

Output: `dist/`.

## Deploying to GitHub Pages

This repo deploys `dist/` with GitHub Actions using `.github/workflows/deploy.yml`.

### One-time repository setup

1. GitHub repo Settings -> Pages
2. Set **Source** to **GitHub Actions**
3. Ensure the custom domain is `raysonlim.com` and HTTPS is enabled

### How deep-link refresh is supported

- `public/404.html` redirects unknown routes back to `/` while preserving path/query/hash.
- `index.html` restores that route before React Router mounts.
- This allows refresh/navigation on routes like `/articles/some-slug` to work on GitHub Pages.

### Domain config

- `public/CNAME` is included in the built site and set to `raysonlim.com`.
