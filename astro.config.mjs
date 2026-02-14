import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://basilwong.github.io',
  output: 'static',
  integrations: [tailwind()],
  redirects: {
    '/about': '/',
    '/about.html': '/',
    '/about-me/': '/blog/',
  },
});
