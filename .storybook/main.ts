import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  "stories": ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes"
  ],
  "framework": "@storybook/react-vite",
  // There's no root vite.config.ts since Astro owns the app build, so set the
  // `@` alias here. PostCSS (Tailwind) is picked up from postcss.config.js.
  async viteFinal(config) {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(dirname, "../src"),
    };
    return config;
  }
};
export default config;
