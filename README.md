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
