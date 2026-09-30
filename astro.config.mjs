import { defineConfig } from 'astro/config';
import { readFileSync, writeFileSync } from 'node:fs';
import YAML from 'yaml';

// saahilmohal.com/ sends visitors to the theme set as defaultTheme in src/content/site.yaml
const site = YAML.parse(readFileSync(new URL('./src/content/site.yaml', import.meta.url), 'utf8'));
const def = site.defaultTheme === 's' ? 's' : 'r';

export default defineConfig({
  site: 'https://saahilmohal.com',
  trailingSlash: 'ignore',
  redirects: { '/': `/${def}/` },
  integrations: [{
    name: 'cloudflare-redirects',
    hooks: {
      'astro:build:done': ({ dir }) => {
        // Cloudflare reads this file and redirects before the page even loads.
        writeFileSync(new URL('_redirects', dir), `/  /${def}/  302\n`);
      },
    },
  }],
});
